document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Socket.IO connection ---
    const socket = io();

    // --- Element Selectors ---
    const alertContainer = document.getElementById('alert-toast');
    const alertToastBody = document.getElementById('alert-toast-body');
    
    // Tab 1: Wi-Fi Scan
    const scanWifiBtn = document.getElementById('scan-wifi-btn');
    const wifiListContainer = document.getElementById('wifi-list-container');
    const scanActionsSection = document.getElementById('scan-actions-section');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    
    // Tab 2: My Network (NEW)
    const refreshHostDetailsBtn = document.getElementById('refresh-host-details-btn');
    const hostDetailsLoader = document.getElementById('host-details-loader');
    const hostDetailsContent = document.getElementById('host-details-content');
    const scanLocalNetworkBtn = document.getElementById('scan-local-network-btn');
    const localDeviceListContainer = document.getElementById('local-device-list-container');
    const localDeviceModal = new bootstrap.Modal(document.getElementById('localDeviceModal'));
    const localModalContentArea = document.getElementById('local-modal-content-area');
    const localDeviceModalLabel = document.getElementById('localDeviceModalLabel');

    // Tab 3: Live Traffic
    const startSniffBtn = document.getElementById('start-sniff-btn');
    const stopSniffBtn = document.getElementById('stop-sniff-btn');
    const sniffingStatusMsg = document.getElementById('sniffing-status-msg');
    const trafficListContainer = document.getElementById('traffic-list-container');
    
    // Modals
    const detailsModalElement = document.getElementById('detailsModal');
    const detailsModal = new bootstrap.Modal(detailsModalElement);
    const modalLoader = document.getElementById('modal-loader');
    const modalContentArea = document.getElementById('modal-content-area');
    const modalTitle = document.getElementById('detailsModalLabel');
    const aiSecurityAuditBtn = document.getElementById('ai-security-audit-btn');
    const aiAuditModalElement = document.getElementById('aiAuditModal');
    const aiAuditModal = new bootstrap.Modal(aiAuditModalElement);
    const aiAuditModalLoader = document.getElementById('ai-audit-modal-loader');
    const aiAuditModalContentArea = document.getElementById('ai-audit-modal-content-area');

    // Variable to store the last scan results
    let lastScannedNetworks = [];

    // --- Helper Functions ---
    const toggleSpinner = (button, show) => {
        if (!button) return;
        const spinner = button.querySelector('.fa-spin') || button.querySelector('.fa-sync-alt');
        button.disabled = show;
        if (spinner) spinner.classList.toggle('d-none', !show);
    };

    const showAlert = (message, type = 'danger') => {
        alertToastBody.textContent = message;
        const toastHeader = alertToastBody.parentElement.previousElementSibling;
        toastHeader.classList.remove('bg-danger', 'bg-success');
        toastHeader.classList.add(type === 'danger' ? 'bg-danger' : 'bg-success');
        const toast = new bootstrap.Toast(alertContainer);
        toast.show();
    };

    const getSignalBars = (rssi) => {
        let level = 0;
        if (rssi >= 85) level = 4;
        else if (rssi >= 65) level = 3;
        else if (rssi >= 45) level = 2;
        else if (rssi >= 25) level = 1;
        let barsHtml = '';
        const barHeights = [8, 13, 18, 23];
        for (let i = 0; i < 4; i++) {
            barsHtml += `<div class="bar ${i < level ? 'active' : ''}" style="height: ${barHeights[i]}px;"></div>`;
        }
        return `<div class="signal-bars">${barsHtml}</div>`;
    };
    
    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    const fakeAIDelay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

    // --- Mock AI Database (Feature #1 - AI Audit) ---
    // (We will only use the "reason" part)
    const MOCK_AI_AUDIT_REASONS = [
        { risk: "HIGH RISK", reason: "This is an Open (unencrypted) network. Anyone can intercept traffic. MITIGATION: Secure this network with WPA3/WPA2 immediately." },
        { risk: "MEDIUM RISK", reason: "Uses WPA/WPA2, which is good, but WPS is 'Unlocked'. Vulnerable to Pixie-Dust. MITIGATION: Disable WPS in router settings." },
        { risk: "MEDIUM RISK", reason: "Security is WPA, not WPA2/3. This is an obsolete protocol. MITIGATION: Upgrade router settings to WPA3/WPA2." },
        { risk: "HIGH RISK", reason: "Uses WEP encryption. This is extremely old and can be cracked in minutes. MITIGATION: Replace this router immediately." }
    ];

    // --- Helper function to get random elements from an array ---
    function getRandomElements(arr, n) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    // --- ================================== ---
    // --- TAB 1: Wi-Fi Scanner Functionality ---
    // --- ================================== ---
    scanWifiBtn.addEventListener('click', async () => {
        toggleSpinner(scanWifiBtn, true);
        scanActionsSection.classList.add('d-none');
        wifiListContainer.innerHTML = '<p class="text-secondary text-center mt-3">Scanning... This may take a moment.</p>';
        try {
            const response = await fetch('/api/scan_wifi');
            const networks = await response.json();
            if (networks.error) {
                showAlert(networks.error);
                wifiListContainer.innerHTML = `<p class="text-danger text-center mt-3">${networks.error}</p>`;
                lastScannedNetworks = []; return;
            }
            if (networks.length === 0) {
                wifiListContainer.innerHTML = '<p class="text-secondary text-center mt-3">No Wi-Fi networks found.</p>';
                lastScannedNetworks = []; return;
            }
            lastScannedNetworks = networks;
            scanActionsSection.classList.remove('d-none');
            wifiListContainer.innerHTML = '';
            networks.forEach((net, index) => {
                const item = document.createElement('div');
                item.className = 'wifi-item';
                item.style.animationDelay = `${index * 80}ms`;
                item.innerHTML = `
                    <div class="d-flex align-items-start">
                        <span class="index">(${index + 1})</span>
                        <div class="wifi-info">
                            <strong class="ssid">${net.ssid}</strong>
                            <span class="mac-vendor">${net.bssid} (${net.vendor})</span>
                        </div>
                    </div>
                    <div class="wifi-stats">
                        <span class="signal-text">${net.signal}%</span>
                        ${getSignalBars(net.signal)}
                        <button class="btn btn-scan-details" data-bssid="${net.bssid}" data-ssid="${net.ssid}" data-channel="${net.channel}" data-signal="${net.signal}" data-security="${net.security}" data-vendor="${net.vendor}">Details</button>
                    </div>
                `;
                wifiListContainer.appendChild(item);
            });
        } catch (error) {
            showAlert('Failed to fetch Wi-Fi data from the server.');
            console.error(error);
        } finally {
            toggleSpinner(scanWifiBtn, false);
        }
    });

    // --- PDF Download Functionality (No Change) ---
    downloadPdfBtn.addEventListener('click', () => {
        if (lastScannedNetworks.length === 0) {
            showAlert("No data available to download. Please scan first.");
            return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(18); doc.text("NetStalker v1.0 - Wi-Fi Scan Report", 14, 22);
        doc.setFontSize(11); doc.setTextColor(100);
        doc.text(`Report generated on: ${new Date().toLocaleString()}`, 14, 30);
        const tableColumns = ["#", "SSID", "BSSID (MAC Address)", "Signal (%)", "Channel", "Security", "Vendor"];
        const tableRows = lastScannedNetworks.map((net, index) => [index + 1, net.ssid, net.bssid, net.signal, net.channel, net.security, net.vendor]);
        doc.autoTable({ head: [tableColumns], body: tableRows, startY: 35, theme: 'striped', headStyles: { fillColor: [10, 47, 105] } });
        const date = new Date();
        const fileName = `NetStalker_Report_${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}.pdf`;
        doc.save(fileName);
    });

    // --- UPDATED: AI Security Audit (DEMO MODE) (Feature #1) ---
    aiSecurityAuditBtn.addEventListener('click', async () => {
        if (lastScannedNetworks.length === 0) {
            showAlert("No network data to audit. Please scan first.");
            return;
        }
        aiAuditModalLoader.classList.remove('d-none');
        aiAuditModalContentArea.innerHTML = '';
        aiAuditModal.show();
        
        try {
            await fakeAIDelay(2500); // 1. Fake AI thinking time

            // 2. Pick 3 random networks from the *real* scan
            const networksToAudit = getRandomElements(lastScannedNetworks, 3);
            
            // 3. Build the HTML table with REAL SSIDs and MOCKED reasons
            let tableHtml = `
                <p class="text-secondary">AI has analyzed the ${lastScannedNetworks.length} scanned networks and identified the top ${networksToAudit.length} highest-risk targets.</p>
                <table class="table table-dark table-striped">
                    <thead><tr><th>Rank</th><th>SSID</th><th>Risk Analysis & Mitigation</th></tr></thead>
                    <tbody>
            `;
            networksToAudit.forEach((target, index) => {
                // Get a random mock reason
                const mockReason = MOCK_AI_AUDIT_REASONS[Math.floor(Math.random() * MOCK_AI_AUDIT_REASONS.length)];
                tableHtml += `
                    <tr>
                        <td><span class="rank-${index + 1}">${index + 1}</span></td>
                        <td>${target.ssid}</td>
                        <td><strong>${mockReason.risk}:</strong> ${mockReason.reason}</td>
                    </tr>
                `;
            });
            tableHtml += `</tbody></table>`;
            aiAuditModalContentArea.innerHTML = tableHtml;

        } catch (error) {
            showAlert('Failed to generate AI analysis.');
            console.error(error);
        } finally {
            aiAuditModalLoader.classList.add('d-none');
        }
    });

    // --- Details Modal Functionality (for Wi-Fi Scan) ---
    wifiListContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-scan-details')) {
            const button = event.target;
            const net = button.dataset;
            modalTitle.innerHTML = `<i class="fas fa-wifi"></i> ${net.ssid}`;
            modalLoader.classList.remove('d-none');
            modalContentArea.innerHTML = '';
            detailsModal.show();

            try {
                const response = await fetch(`/api/network_details/${net.bssid}`);
                const deepDetails = await response.json();
                if (deepDetails.error) {
                    showAlert(deepDetails.error);
                    modalContentArea.innerHTML = `<p class="text-danger">${deepDetails.error}</p>`;
                    return;
                }
                
                let connectedHtml = deepDetails.is_connected ? `<span class="badge bg-success">You are CONNECTED to this network</span>` : `<span class="badge bg-secondary">You are NOT connected to this network</span>`;
                
                // UPDATED: AI-Powered Analyzer is replaced with Exploit Search
                let nmapScanHtml = `
                    <h5 class="mt-4">Vulnerability Scanner</h5>
                    <p class="text-secondary">Run a basic Nmap scan on the router to find open ports. (Only enabled if you are connected).</p>
                    <button class="btn btn-success" id="run-basic-scan-btn" data-ip="${deepDetails.connected_ip}" ${!deepDetails.is_connected ? 'disabled' : ''}>
                        <i class="fas fa-search"></i> Run Basic Nmap Scan
                    </button>
                    <div id="nmap-scan-results" class="mt-3"></div>
                `;

                modalContentArea.innerHTML = `
                    <p class="mb-3">${connectedHtml}</p>
                    <table class="table table-dark table-borderless"><tbody>
                        <tr><td><strong>BSSID (MAC)</strong></td><td>${net.bssid}</td></tr>
                        <tr><td><strong>Vendor</strong></td><td>${net.vendor}</td></tr>
                        <tr><td><strong>Signal</strong></td><td>${net.signal}%</td></tr>
                        <tr><td><strong>Channel</strong></td><td>${net.channel}</td></tr>
                        <tr><td><strong>Security</strong></td><td>${net.security}</td></tr>
                        <tr><td><strong>WPS Status</strong></td><td>${deepDetails.wps}</td></tr>
                        <tr><td><strong>Your IP</strong></td><td>${deepDetails.is_connected ? deepDetails.connected_ip : 'N/A'}</td></tr>
                    </tbody></table>
                    ${nmapScanHtml}
                `;
            } catch (error) {
                showAlert('Failed to fetch deep details.');
                console.error(error);
            } finally {
                modalLoader.classList.add('d-none');
            }
        }
    });
    
    // --- UPDATED: Nmap "Search for Exploits" Listeners (Feature #2) ---
    detailsModalElement.addEventListener('click', async (event) => {
        const target = event.target;
        const ip = target.dataset.ip;
        const resultsContainer = document.getElementById('nmap-scan-results');
        
        if (!ip) return;

        // --- 1. User clicks "Run Basic Nmap Scan" ---
        if (target.id === 'run-basic-scan-btn') {
            resultsContainer.innerHTML = `<div class="d-flex align-items-center justify-content-center py-3"><div class="spinner-border spinner-border-sm text-info me-2"></div><span class="text-secondary">Running basic scan on ${ip}...</span></div>`;
            try {
                const response = await fetch('/api/run_nmap_scan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ip: ip, scan_args: "-sV --top-ports 20" }) 
                });
                const data = await response.json();
                if (data.error) throw new Error(data.error);

                let portsHtml = '';
                if (data.ports && data.ports.length > 0) {
                    portsHtml = data.ports.map(p => {
                        // Create the search query for Exploit-DB
                        const query = encodeURIComponent(`${p.product} ${p.version}`.trim());
                        const exploitDBLink = `https://www.exploit-db.com/search?q=${query}`;
                        return `
                        <tr>
                            <td>${p.port}</td>
                            <td>${p.service}</td>
                            <td>${p.product} ${p.version}</td>
                            <td>
                                <!-- UPDATED: "Analyze (AI)" button is now "Search for Exploits" -->
                                <a href="${exploitDBLink}" target="_blank" class="btn btn-exploit-search btn-sm">
                                    <i class="fas fa-bug"></i> Search Exploits
                                </a>
                            </td>
                        </tr>
                    `}).join('');
                } else {
                    portsHtml = '<tr><td colspan="4" class="text-secondary text-center">No open ports found in top 20.</td></tr>';
                }
                resultsContainer.innerHTML = `
                    <h6>Basic Scan Results:</h6>
                    <table class="table table-dark table-striped">
                        <thead><tr><th>Port</th><th>Service</th><th>Version</th><th>Action</th></tr></thead>
                        <tbody>${portsHtml}</tbody>
                    </table>
                `;
            } catch (error) {
                resultsContainer.innerHTML = `<pre class="text-danger">Basic scan failed: ${error.message}</pre>`;
            }
        }
    });

    // --- ================================== ---
    // --- TAB 2: "My Network" Functionality (NEW) ---
    // --- ================================== ---

    // --- 1. Load Host Device Details ---
    refreshHostDetailsBtn.addEventListener('click', async () => {
        toggleSpinner(refreshHostDetailsBtn, true);
        hostDetailsLoader.classList.remove('d-none');
        hostDetailsContent.innerHTML = '';
        try {
            const response = await fetch('/api/get_host_details');
            const data = await response.json();
            if (data.error) throw new Error(data.error);

            // Format data into a nice list
            hostDetailsContent.innerHTML = `
                <ul class="list-group host-details-list">
                    <li class="list-group-item"><strong>IPv4 Address:</strong> <span>${data.ipv4}</span></li>
                    <li class="list-group-item"><strong>Hardware MAC:</strong> <span>${data.hardware_address}</span></li>
                    <li class="list-group-item"><strong>Gateway (Router):</strong> <span>${data.default_route}</span></li>
                    <li class="list-group-item"><strong>DNS Servers:</strong> <span>${data.dns4.join(', ')}</span></li>
                    <li class="list-group-item"><strong>Link Speed:</strong> <span>${data.link_speed}</span></li>
                    <li class="list-group-item"><strong>Signal Strength:</strong> <span>${data.signal_strength}</span></li>
                    <li class="list-group-item"><strong>Frequency:</strong> <span>${data.frequency}</span></li>
                    <li class="list-group-item"><strong>Security:</strong> <span>${data.security}</span></li>
                    <li class="list-group-item"><strong>Interface:</strong> <span>${data.interface_name}</span></li>
                    <li class="list-group-item"><strong>IPv6 Address:</strong> <span>${data.ipv6.join('<br>')}</span></li>
                </ul>
            `;

        } catch (error) {
            showAlert(`Failed to get host details: ${error.message}`);
            hostDetailsContent.innerHTML = `<p class="text-danger text-center">Could not load host details.</p>`;
        } finally {
            toggleSpinner(refreshHostDetailsBtn, false);
            hostDetailsLoader.classList.add('d-none');
        }
    });

    // --- 2. Scan for Other Devices on Network ---
    scanLocalNetworkBtn.addEventListener('click', async () => {
        toggleSpinner(scanLocalNetworkBtn, true);
        localDeviceListContainer.innerHTML = '<p class="text-secondary text-center mt-3">Running ARP scan... This may take a minute.</p>';
        try {
            const response = await fetch('/api/scan_local_network');
            const devices = await response.json();
            if (devices.error) throw new Error(devices.error);
            if (devices.length === 0) {
                localDeviceListContainer.innerHTML = '<p class="text-secondary text-center mt-3">No other devices found.</p>';
                return;
            }

            localDeviceListContainer.innerHTML = '';
            devices.forEach(device => {
                const item = document.createElement('div');
                item.className = 'local-device-item';
                item.innerHTML = `
                    <div class="device-info">
                        <span class="device-ip">${device.ip}</span>
                        <span class="device-mac d-block">${device.mac}</span>
                        <span class="device-vendor d-block">${device.vendor}</span>
                    </div>
                    <div class="device-actions">
                        <button class="btn btn-sm btn-info btn-run-local-nmap" data-ip="${device.ip}">
                            <i class="fas fa-search"></i> Port Scan
                        </button>
                    </div>
                `;
                localDeviceListContainer.appendChild(item);
            });
        } catch (error) {
            showAlert(`Failed to scan local network: ${error.message}`);
            localDeviceListContainer.innerHTML = `<p class="text-danger text-center">Scan failed.</p>`;
        } finally {
            toggleSpinner(scanLocalNetworkBtn, false);
        }
    });

    // --- 3. Run Nmap Scan on a Local Device ---
    localDeviceListContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('btn-run-local-nmap')) {
            const ip = event.target.dataset.ip;
            localDeviceModalLabel.innerHTML = `<i class="fas fa-laptop-house"></i> Scan Results for ${ip}`;
            localModalContentArea.innerHTML = `<div class="d-flex align-items-center justify-content-center py-3"><div class="spinner-border spinner-border-sm text-info me-2"></div><span class="text-secondary">Running Nmap scan on ${ip}...</span></div>`;
            localDeviceModal.show();
            
            try {
                const response = await fetch('/api/run_nmap_scan', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ip: ip, scan_args: "-sV -O --top-ports 20" }) 
                });
                const data = await response.json();
                if (data.error) throw new Error(data.error);

                let portsHtml = '';
                if (data.ports && data.ports.length > 0) {
                    portsHtml = data.ports.map(p => {
                        const query = encodeURIComponent(`${p.product} ${p.version}`.trim());
                        const exploitDBLink = `https://www.exploit-db.com/search?q=${query}`;
                        return `
                        <tr>
                            <td>${p.port}</td>
                            <td>${p.service}</td>
                            <td>${p.product} ${p.version}</td>
                            <td>
                                <a href="${exploitDBLink}" target="_blank" class="btn btn-exploit-search btn-sm">
                                    <i class="fas fa-bug"></i> Search Exploits
                                </a>
                            </td>
                        </tr>
                    `}).join('');
                } else {
                    portsHtml = '<tr><td colspan="4" class="text-secondary text-center">No open ports found in top 20.</td></tr>';
                }
                
                localModalContentArea.innerHTML = `
                    <p><strong>Operating System Guess:</strong> ${data.os || 'Unknown'}</p>
                    <h6>Open Ports:</h6>
                    <table class="table table-dark table-striped">
                        <thead><tr><th>Port</th><th>Service</th><th>Version</th><th>Action</th></tr></thead>
                        <tbody>${portsHtml}</tbody>
                    </table>
                `;
            } catch(error) {
                localModalContentArea.innerHTML = `<pre class="text-danger">Nmap scan failed: ${error.message}</pre>`;
            }
        }
    });

    // --- ================================== ---
    // --- TAB 3: Live Traffic Functionality ---
    // --- ================================== ---
    startSniffBtn.addEventListener('click', () => {
        socket.emit('start_sniffing');
        sniffingStatusMsg.textContent = "Attempting to start sniffer...";
        trafficListContainer.innerHTML = '';
    });

    stopSniffBtn.addEventListener('click', () => {
        socket.emit('stop_sniffing');
        sniffingStatusMsg.textContent = "Attempting to stop sniffer...";
    });

    socket.on('sniffing_status', (data) => {
        if (data.status === 'started') {
            sniffingStatusMsg.innerHTML = `Monitoring on interface: <strong style="color: var(--signal-bar-active);">${data.interface}</strong>`;
            startSniffBtn.disabled = true;
            stopSniffBtn.disabled = false;
        } else if (data.status === 'stopped') {
            sniffingStatusMsg.textContent = "Monitoring is stopped.";
            startSniffBtn.disabled = false;
            stopSniffBtn.disabled = true;
        } else if (data.status === 'error') {
            sniffingStatusMsg.innerHTML = `<strong style="color: var(--danger-color);">${data.message}</strong>`;
            startSniffBtn.disabled = false;
            stopSniffBtn.disabled = true;
        }
    });

    socket.on('traffic_update', (update) => {
        if (!startSniffBtn.disabled) return;
        trafficListContainer.innerHTML = '';
        if (update.data.length === 0) {
            trafficListContainer.innerHTML = '<p class="text-secondary text-center">Listening for traffic...</p>';
            return;
        }
        update.data.forEach(talker => {
            const item = document.createElement('div');
            item.className = 'wifi-item';
            item.innerHTML = `
                <div class="wifi-info">
                    <strong class="ssid"><i class="fas fa-desktop"></i> ${talker.ip}</strong>
                    <span class="mac-vendor">Total Packets: ${talker.packets}</span>
                </div>
                <div class="wifi-stats">
                    <span class="signal-text">${formatBytes(talker.bytes)}</span>
                </div>
            `;
            trafficListContainer.appendChild(item);
        });
    });
});