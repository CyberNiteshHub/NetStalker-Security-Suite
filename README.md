NetStalker v1.0 - Network Security Suite

A comprehensive, web-based Network Security Suite designed for ethical hackers, students, and IT professionals. NetStalker provides a 3-in-1 dashboard to Scan, Analyze, and Monitor your network environment in real-time.

This prototype was built for a hackathon and features a "Demo Mode" for AI-powered features, allowing it to demonstrate advanced concepts without requiring live API keys.

📸 Dashboard Preview

![Wi-Fi Scanner](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/1%29%20Wi-Fi%20Scanner.png)

![My Network](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/2%29%20My%20Network.png)

![Live Traffic](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/3%29%20Live%20Traffic.png)

![AI Security Audit Report](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/4%29%20AI%20Security%20Audit%20Report.png)

![Network Vulnerability Scanner](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/5%29%20Network%20Vulnerability%20Scanner.png)

![Port Scan](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/6%29%20Port%20Scan.png)




🔥 Key Features

NetStalker is organized into three main modules:

1. Wi-Fi Scanner (Public Networks)

Scan for Networks: Discovers all nearby Wi-Fi networks using nmcli.

Detailed View: Shows SSID, BSSID, Signal Strength, Channel, Security type, and Hardware Vendor.

PDF Reporting: Instantly generate and download a professional PDF report of all scanned networks.

AI Security Audit (Demo): Simulates an AI analysis by using real scanned SSIDs to generate a mock security report, identifying the top 3 high-risk networks with actionable mitigation advice.

2. My Network (Local Network)

Host Device Info: Fetches and displays detailed, real-time information about your own machine, including:

IPv4 and IPv6 Addresses

Hardware MAC Address

Gateway (Router) IP

DNS Servers

Wireless Link Speed, Signal Strength, and Frequency.

Local Device Scanner: Runs a scapy-based ARP scan to discover all other devices (phones, laptops, smart TVs, etc.) currently connected to your local network.

Deep Analysis:

Nmap Port Scan: Run a real Nmap port scan on any discovered local device.

Exploit Search: Links the discovered service (e.g., Apache 2.4.52) directly to the Exploit-DB database to find real, published vulnerabilities. (This replaces the AI analyzer for a more practical, real-world tool).

3. Live Traffic Monitor

Real-time Sniffing: Uses scapy to capture network packets on your active interface.

Live Dashboard: Uses WebSockets to send data to the UI every 2 seconds without refreshing the page.

Top Talkers: Identifies which local IP addresses are sending or receiving the most data, helping to spot bandwidth hogs or suspicious activity.

🛠️ Tech Stack

Backend: Python, Flask, Flask-SocketIO

Scanning & Analysis: Scapy, python-nmap, subprocess (for nmcli, iwconfig, ip)

Frontend: JavaScript (ES6+), Socket.IO Client, Bootstrap 5

Reporting: jsPDF, jspdf-autotable

🚀 Setup and Installation

This tool is designed to run on Kali Linux or other Debian-based distributions.

1. Install System Prerequisites:

sudo apt update
sudo apt install nmap reaver python3-venv


2. Clone the Repository:

git clone https://github.com/CyberNiteshHub/NetStalker-Security-Suite.git
cd NetStalker-Security-Suite


3. Create and Activate Virtual Environment:

# We use 'myenv' as specified in start.sh
python3 -m venv myenv
source myenv/bin/activate


4. Install Python Dependencies:

# This will install flask, scapy, psutil, etc.
pip install -r requirements.txt


🏃 How to Run

After setup, just run the provided shell script. It handles permissions and starts the server.

# This script MUST be run with sudo for scanning to work
sudo ./start.sh


Now, open your web browser and navigate to http://127.0.0.1:5000.

📄 License

This project is distributed under the MIT License. See the LICENSE file for more information.
