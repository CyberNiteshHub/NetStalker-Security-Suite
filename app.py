# NetStalker v1.0 - Demo Mode + NEW Local Network Scanner
import os
import subprocess
import json
import re
import socket
from functools import wraps
from flask import Flask, render_template, jsonify, request 
from flask_socketio import SocketIO, emit
import nmap
from mac_vendor_lookup import MacLookup
# Scapy से ARP, Ether, srp को इम्पोर्ट किया गया
from scapy.all import sniff, IP, ARP, Ether, srp 
import psutil
import threading
from collections import defaultdict

# --- Configuration & Initialization ---
app = Flask(__name__)
app.config['SECRET_KEY'] = 'netstalker-secret-key'
socketio = SocketIO(app, async_mode='threading')

try:
    mac_lookup = MacLookup()
except Exception as e:
    print(f"Warning: Could not initialize MacLookup. Vendor info may be unavailable. Error: {e}")
    mac_lookup = None

# --- Live Traffic Analysis (No Change) ---
traffic_data = defaultdict(lambda: {'bytes': 0, 'packets': 0})
data_lock = threading.Lock()
sniffer_thread = None
is_sniffing = False

def packet_callback(packet):
    global traffic_data
    if IP in packet:
        src_ip, dst_ip, packet_size = packet[IP].src, packet[IP].dst, len(packet)
        local_ip = None
        if src_ip.startswith(('192.168.', '10.', '172.')): local_ip = src_ip
        elif dst_ip.startswith(('192.168.', '10.', '172.')): local_ip = dst_ip
        if local_ip:
            with data_lock:
                traffic_data[local_ip]['bytes'] += packet_size
                traffic_data[local_ip]['packets'] += 1

def start_packet_sniffer(interface):
    global is_sniffing
    is_sniffing = True
    print(f"Starting packet sniffer on interface {interface}...")
    sniff(iface=interface, prn=packet_callback, store=0, stop_filter=lambda p: not is_sniffing)
    print("Packet sniffer stopped.")

def traffic_data_emitter():
    while True:
        socketio.sleep(2)
        with data_lock:
            if not traffic_data: continue
            sorted_traffic = sorted(traffic_data.items(), key=lambda item: item[1]['bytes'], reverse=True)
            top_talkers = [{'ip': ip, 'bytes': data['bytes'], 'packets': data['packets']} for ip, data in sorted_traffic[:10]]
        socketio.emit('traffic_update', {'data': top_talkers})

# --- Permission Handling & Helper Functions ---
def check_root(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if os.name != 'nt' and os.geteuid() != 0:
            return jsonify({"error": "This action requires root/sudo privileges."}), 403
        return f(*args, **kwargs)
    return decorated_function

# (get_wireless_interface, parse_nmcli_terse_output, get_gateway_ip - No Change)
def get_wireless_interface():
    try:
        result = subprocess.check_output("iwconfig", shell=True, text=True, stderr=subprocess.DEVNULL)
        for line in result.split("\n"):
            if "IEEE 802.11" in line: return line.split()[0]
        result = subprocess.check_output("ip -o link show | awk -F': ' '{print $2}'", shell=True, text=True)
        for interface in result.split("\n"):
            if interface.startswith('wl'): return interface
        
        # अगर wlan0 नहीं मिला, तो eth0 (वायर्ड) को चेक करें
        result = subprocess.check_output("ip -o link show | awk -F': ' '{print $2}'", shell=True, text=True)
        for interface in result.split("\n"):
            if interface.startswith('eth'): return interface
        return None
    except Exception: return None

def parse_nmcli_terse_output(output):
    # (No Change)
    networks = []
    lines = output.strip().split('\n')
    for line in lines:
        parts = re.split(r'(?<!\\):', line)
        if len(parts) >= 5:
            try:
                bssid, ssid, channel, signal, security = parts[0].replace('\\:', ':'), parts[1] if parts[1] else "Hidden Network", parts[2], int(parts[3]), ':'.join(parts[4:])
                if not security: security = "Open"
                vendor = "Unknown"
                if mac_lookup:
                    try: vendor = mac_lookup.lookup(bssid)
                    except Exception: pass
                networks.append({"ssid": ssid, "bssid": bssid, "channel": channel, "signal": signal, "security": security, "vendor": vendor})
            except (ValueError, IndexError) as e:
                print(f"Skipping malformed line: '{line}'. Error: {e}")
                continue
    return sorted(networks, key=lambda x: x['signal'], reverse=True)

def get_gateway_ip():
    # (No Change)
    try:
        if os.name == 'nt':
            host_ip = socket.gethostbyname(socket.gethostname())
            return ".".join(host_ip.split('.')[:-1]) + ".1"
        else:
            result = subprocess.check_output("ip r | grep default", shell=True).decode()
            return result.split(' ')[2]
    except Exception: return None

# --- Standard API Routes ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/scan_wifi')
@check_root
def scan_wifi_networks():
    # (No Change)
    try:
        command = "nmcli -t -f BSSID,SSID,CHAN,SIGNAL,SECURITY dev wifi list --rescan yes"
        result = subprocess.check_output(command, shell=True, text=True, stderr=subprocess.DEVNULL)
        networks = parse_nmcli_terse_output(result)
        return jsonify(networks)
    except Exception as e: return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    
@app.route('/api/network_details/<bssid>')
@check_root
def get_network_details(bssid):
    # (No Change)
    details, interface = {}, get_wireless_interface()
    if not interface: details['wps'] = "N/A (No wireless interface found)"
    else:
        try:
            wash_cmd, wps_info = f"timeout 10s wash -i {interface} -C -j", "Not Found"
            wash_output = subprocess.check_output(wash_cmd, shell=True, text=True, stderr=subprocess.DEVNULL)
            for ap in json.loads(wash_output).get('aps', []):
                if ap.get('mac').upper() == bssid.upper():
                    wps_version, wps_locked = ap.get('wps_version', 'N/A'), "Yes" if ap.get('is_locked') else "No"
                    wps_info = f"Version: {wps_version}, Locked: {wps_locked}"
                    break
            details['wps'] = wps_info
        except Exception as e: details['wps'] = f"Scan Failed ({type(e).__name__})"
    
    is_connected, connected_ip = False, "N/A"
    try:
        active_bssid_cmd = f"nmcli -t -f active,bssid dev wifi list | grep -E '^yes:{bssid.replace(':', '\\\\:')}'"
        if subprocess.check_output(active_bssid_cmd, shell=True, text=True).strip() and interface:
            is_connected = True
            ip_cmd = f"ip -o -4 addr show {interface} | awk '{{print $4}}' | cut -d'/' -f1"
            connected_ip_output = subprocess.check_output(ip_cmd, shell=True, text=True).strip()
            connected_ip = connected_ip_output.split('\n')[0] if connected_ip_output else "N/A"
    except Exception: pass
    details['is_connected'], details['connected_ip'] = is_connected, connected_ip
    return jsonify(details)

@app.route('/api/run_nmap_scan', methods=['POST'])
@check_root
def run_nmap_scan(ip=None, scan_args=None):
    # (Slightly modified to be callable internally)
    try:
        if request.is_json:
            data = request.json
            ip = data.get('ip')
            scan_args = data.get('scan_args', '-sV --top-ports 20')
        
        if not ip:
            return jsonify({"error": "IP address is required"}), 400

        nm = nmap.PortScanner()
        print(f"Running Nmap scan on {ip} with args: {scan_args}")
        nm.scan(hosts=ip, arguments=scan_args)
        
        if ip not in nm.all_hosts():
            return jsonify({"error": f"Nmap scan failed. Host {ip} may be blocking scans.", "scan_args": scan_args})

        scan_result = nm[ip]
        ports = []
        if 'tcp' in scan_result:
            for port, data in scan_result['tcp'].items():
                ports.append({"port": port, "state": data['state'], "service": data['name'], "product": data.get('product', ''), "version": data.get('version', '')})
        
        # Nmap OS detection (nmap -O)
        os_match = scan_result.get('osmatch', [])
        os_name = os_match[0]['name'] if os_match else 'Unknown'

        # This part is for the internal call, to return data directly
        if not request.is_json:
            return {"ip": ip, "os": os_name, "ports": ports}

        return jsonify({
            "ip": ip, 
            "scan_args": scan_args,
            "ports": sorted(ports, key=lambda x: x['port']),
            "os": os_name,
            "raw_output": nm.csv() 
        })
    except Exception as e:
        if not request.is_json:
            return {"ip": ip, "error": str(e)}
        return jsonify({"error": f"Nmap scan failed: {str(e)}", "scan_args": scan_args}), 500


# --- ===== NEW API ROUTES FOR FEATURE #3 ("My Network") ===== ---

def parse_linux_host_details(interface):
    """
    Linux कमांड्स चलाकर होस्ट मशीन की जानकारी निकालता है।
    यह आपके दिए गए डेमो से मेल खाने के लिए बनाया गया है।
    """
    details = {
        "ipv4": "N/A", "ipv6": "N/A", "hardware_address": "N/A",
        "default_route": "N/A", "dns4": [], "dns6": [],
        "signal_strength": "N/A", "link_speed": "N/A",
        "frequency": "N/A", "security": "N/A"
    }
    try:
        # IPs and MAC
        ip_addr_output = subprocess.check_output(f"ip addr show {interface}", shell=True).decode()
        details['ipv4'] = re.search(r'inet ([\d\.]+)/', ip_addr_output).group(1)
        ipv6_matches = re.findall(r'inet6 ([a-f0-9\:]+)/', ip_addr_output)
        details['ipv6'] = [ip for ip in ipv6_matches if not ip.startswith('fe80')]
        details['hardware_address'] = re.search(r'link/ether ([a-f0-9\:]+)', ip_addr_output).group(1).upper()
    except Exception as e: print(f"Error parsing IP/MAC: {e}")
    
    try:
        # Gateway / Default Route
        route_output = subprocess.check_output("ip r", shell=True).decode()
        details['default_route'] = re.search(r'default via ([\d\.]+)', route_output).group(1)
    except Exception as e: print(f"Error parsing Gateway: {e}")
        
    try:
        # DNS Servers
        dns_output = subprocess.check_output("cat /etc/resolv.conf", shell=True).decode()
        dns_matches = re.findall(r'nameserver ([\da-f\:\.]+)', dns_output)
        details['dns4'] = [dns for dns in dns_matches if '.' in dns]
        details['dns6'] = [dns for dns in dns_matches if ':' in dns]
    except Exception as e: print(f"Error parsing DNS: {e}")
        
    try:
        # Wireless Info (यह सिर्फ wlan पर चलेगा)
        iw_output = subprocess.check_output(f"iwconfig {interface}", shell=True).decode()
        details['security'] = re.search(r'Encryption key:(on|off)', iw_output).group(1)
        details['link_speed'] = re.search(r'Bit Rate=([\d\.]+ Mb/s)', iw_output).group(1)
        details['signal_strength'] = re.search(r'Signal level=(-\d+ dBm)', iw_output).group(1)
        details['frequency'] = re.search(r'Frequency:([\d\.]+ GHz)', iw_output).group(1)
    except Exception as e:
        print(f"Could not get wireless info for {interface} (maybe wired?): {e}")
        details['security'] = "Wired Connection"
        
    return details

@app.route('/api/get_host_details')
@check_root
def get_host_details():
    """होस्ट मशीन (आपकी अपनी मशीन) की जानकारी देता है।"""
    interface = get_wireless_interface() # एक्टिव इंटरफ़ेस का पता लगाता है
    if not interface:
        return jsonify({"error": "No active network interface found (wlan0, eth0, etc.)"}), 500
    
    try:
        if os.name == 'nt':
            # Windows के लिए सरलीकृत जानकारी
            details = {"error": "Windows host details not fully implemented. Use Kali."}
        else:
            # Linux के लिए पूरी जानकारी
            details = parse_linux_host_details(interface)
        
        details["interface_name"] = interface
        return jsonify(details)
    except Exception as e:
        return jsonify({"error": f"Failed to get host details: {str(e)}"}), 500

@app.route('/api/scan_local_network')
@check_root
def scan_local_network():
    """
    लोकल नेटवर्क पर जुड़े सभी डिवाइस को स्कैन करता है (ARP स्कैन)।
    """
    gateway_ip = get_gateway_ip()
    if not gateway_ip:
        return jsonify({"error": "Could not determine local network gateway."}), 500
    
    # गेटवे IP से नेटवर्क रेंज बनाएं (e.g., "192.168.1.1" -> "192.168.1.0/24")
    network_range = ".".join(gateway_ip.split('.')[:-1]) + ".0/24"
    print(f"Starting ARP scan on network: {network_range}")

    try:
        # Scapy का उपयोग करके ARP स्कैन
        arp_request = ARP(pdst=network_range)
        broadcast = Ether(dst="ff:ff:ff:ff:ff:ff")
        arp_request_broadcast = broadcast / arp_request
        
        answered_list = srp(arp_request_broadcast, timeout=3, verbose=False)[0]
        
        devices = []
        for sent, received in answered_list:
            mac = received.hwsrc
            ip = received.psrc
            vendor = "Unknown"
            try:
                vendor = mac_lookup.lookup(mac)
            except Exception:
                pass
            devices.append({'ip': ip, 'mac': mac, 'vendor': vendor})
        
        # होस्ट डिवाइस (आपका) का IP भी जोड़ दें
        host_ip = socket.gethostbyname(socket.gethostname())
        if not any(d['ip'] == host_ip for d in devices):
             devices.append({'ip': host_ip, 'mac': 'You', 'vendor': 'This Device'})

        return jsonify(sorted(devices, key=lambda x: [int(part) for part in x['ip'].split('.')]))
    
    except Exception as e:
        print(f"ARP Scan Error: {e}")
        return jsonify({"error": f"Failed to scan local network: {str(e)}"}), 500

# --- SocketIO Event Handlers (No Change) ---
@socketio.on('connect')
def handle_connect():
    print('Client connected to WebSocket')
    if not hasattr(app, 'traffic_emitter_started') or not app.traffic_emitter_started:
        socketio.start_background_task(traffic_data_emitter)
        app.traffic_emitter_started = True

@socketio.on('start_sniffing')
@check_root
def handle_start_sniffing():
    global sniffer_thread, is_sniffing, traffic_data
    if not is_sniffing:
        interface = get_wireless_interface() # एक्टिव इंटरफ़ेस चुनें
        if not interface:
            emit('sniffing_status', {'status': 'error', 'message': 'No active network interface found.'})
            return
        
        with data_lock:
            traffic_data.clear()
        sniffer_thread = socketio.start_background_task(start_packet_sniffer, interface)
        emit('sniffing_status', {'status': 'started', 'interface': interface})
    else:
        emit('sniffing_status', {'status': 'error', 'message': 'Sniffer already running.'})

@socketio.on('stop_sniffing')
def handle_stop_sniffing():
    global is_sniffing
    if is_sniffing:
        is_sniffing = False
        emit('sniffing_status', {'status': 'stopped'})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)