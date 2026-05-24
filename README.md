<div align="center">

<!-- Animated Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,40:001a00,100:003300&height=220&section=header&text=NetStalker%20v1.0&fontSize=58&fontColor=00ff41&animation=fadeIn&fontAlignY=38&desc=Network%20Security%20Suite%20%7C%20Scan%20%E2%80%A2%20Analyze%20%E2%80%A2%20Monitor&descAlignY=62&descSize=18&descColor=39ff14" width="100%"/>

<!-- Typing Animation -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=2500&pause=800&color=00FF41&center=true&vCenter=true&width=700&lines=🛰️+Scan+Wi-Fi+Networks+in+Real-Time;🏠+Map+Every+Device+on+Your+Local+Network;📡+Monitor+Live+Traffic+via+WebSockets;🤖+AI-Powered+Security+Audit+%28Demo+Mode%29;🔍+Nmap+Port+Scan+%2B+Exploit-DB+Integration;🛡️+Built+for+Ethical+Hackers+%26+IT+Pros" alt="Typing SVG" />
</a>

<br/>

<!-- Badges -->
![Version](https://img.shields.io/badge/Version-v1.0-00ff41?style=for-the-badge&logo=github&logoColor=black)
![Python](https://img.shields.io/badge/Python-23.6%25-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-39.4%25-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-18.2%25-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-17.1%25-E34F26?style=for-the-badge&logo=html5&logoColor=white)

<br/>

![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=flat-square&logo=flask&logoColor=white)
![SocketIO](https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=flat-square&logo=socket.io&logoColor=white)
![Scapy](https://img.shields.io/badge/Scapy-Packet%20Sniffing-00ff41?style=flat-square)
![Bootstrap](https://img.shields.io/badge/Bootstrap%205-Frontend-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Nmap](https://img.shields.io/badge/Nmap-Port%20Scanning-4EAA25?style=flat-square&logo=linux&logoColor=white)
![Kali Linux](https://img.shields.io/badge/Kali%20Linux-Platform-557C94?style=flat-square&logo=kalilinux&logoColor=white)

<br/>

![Profile Views](https://komarev.com/ghpvc/?username=CyberNiteshHub&color=00ff41&style=flat-square&label=Profile+Views)
&nbsp;
[![GitHub followers](https://img.shields.io/github/followers/CyberNiteshHub?label=Follow&style=social)](https://github.com/CyberNiteshHub)
&nbsp;
[![Stars](https://img.shields.io/github/stars/CyberNiteshHub/NetStalker-Security-Suite?style=social)](https://github.com/CyberNiteshHub/NetStalker-Security-Suite)

</div>

---

<div align="center">

## 🛡️ What is NetStalker?

</div>

> **NetStalker v1.0** is a comprehensive, web-based **3-in-1 Network Security Suite** built for ethical hackers, security students, and IT professionals. It brings together Wi-Fi scanning, local network mapping, live packet sniffing, AI-powered security auditing, and CVE exploit discovery — all inside a single real-time browser dashboard.
>
> 🏆 **Originally built for a Hackathon** — featuring a smart "Demo Mode" for AI-powered features so the full prototype can run without live API keys.

<table>
<tr>
<td>🌐 <b>Type</b></td><td>Web-Based Security Dashboard</td>
<td>🎯 <b>Built For</b></td><td>Hackathon</td>
</tr>
<tr>
<td>👤 <b>Author</b></td><td>Nitesh Verma (Cyber Nitesh)</td>
<td>🖥️ <b>Interface</b></td><td>Browser at localhost:5000</td>
</tr>
<tr>
<td>⚡ <b>Real-Time</b></td><td>WebSocket (Socket.IO) Updates</td>
<td>🤖 <b>AI Mode</b></td><td>Demo Mode (no API key needed)</td>
</tr>
<tr>
<td>🐍 <b>Backend</b></td><td>Python + Flask + Scapy</td>
<td>🎨 <b>Frontend</b></td><td>Bootstrap 5 + JS ES6+</td>
</tr>
</table>

---

## 🗺️ System Overview

<div align="center">

```
┌─────────────────────────────────────────────────────────────────────┐
│                      NetStalker v1.0                                │
│                   Web-Based Security Suite                          │
├───────────────────┬──────────────────────┬──────────────────────────┤
│  MODULE 1         │  MODULE 2            │  MODULE 3                │
│  📡 Wi-Fi Scanner │  🏠 My Network       │  🔴 Live Traffic         │
│                   │                      │                          │
│  • nmcli scan     │  • Host device info  │  • Scapy packet sniff    │
│  • SSID/BSSID     │  • ARP scan (Scapy)  │  • WebSocket updates     │
│  • Signal/Channel │  • Nmap port scan    │  • Top Talkers view      │
│  • Vendor detect  │  • Exploit-DB link   │  • Protocol breakdown    │
│  • PDF Report     │  • IPv4/IPv6/MAC/GW  │  • Live dashboard        │
│  • AI Audit 🤖    │  • DNS/Link speed    │  • No page refresh!      │
└───────────────────┴──────────────────────┴──────────────────────────┘
         │                    │                        │
         ▼                    ▼                        ▼
   Flask Backend ◄──────── app.py ──────────► Flask-SocketIO
         │
         ▼
   Browser Dashboard → http://127.0.0.1:5000
```

</div>

---

## 📸 Dashboard Preview

> All 6 screenshots are from the actual working tool:

### 📡 Wi-Fi Scanner
> Discovers all nearby Wi-Fi networks — SSID, BSSID, Signal Strength, Channel, Security Type & Hardware Vendor

![Wi-Fi Scanner](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/1%29%20Wi-Fi%20Scanner.png)

---

### 🏠 My Network
> Displays real-time host device info (IPv4, IPv6, MAC, Gateway, DNS, Link Speed) + ARP-scans all devices on your LAN

![My Network](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/2%29%20My%20Network.png)

---

### 🔴 Live Traffic Monitor
> WebSocket-powered real-time packet sniffer — updates every 2 seconds, identifies Top Talkers without refreshing the page

![Live Traffic](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/3%29%20Live%20Traffic.png)

---

### 🤖 AI Security Audit Report
> Demo Mode — AI simulates a security audit using real scanned SSIDs, flags top 3 high-risk networks with mitigation advice

![AI Security Audit Report](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/4%29%20AI%20Security%20Audit%20Report.png)

---

### 🔍 Network Vulnerability Scanner
> Runs Nmap on discovered devices and links found services directly to Exploit-DB for real published CVEs

![Network Vulnerability Scanner](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/5%29%20Network%20Vulnerability%20Scanner.png)

---

### 🚪 Port Scan Results
> Deep-dive port scanning with service version detection on any device found on your local network

![Port Scan](https://raw.githubusercontent.com/CyberNiteshHub/NetStalker-Security-Suite/main/6%29%20Port%20Scan.png)

---

## 🔥 Features Deep Dive

<details>
<summary><h3>📡 Module 1 — Wi-Fi Scanner (Public Networks)</h3></summary>

<br/>

![nmcli](https://img.shields.io/badge/Tool-nmcli-00ff41?style=flat-square&logo=linux)
![jsPDF](https://img.shields.io/badge/Report-jsPDF-red?style=flat-square)

**Discover every Wi-Fi network around you in seconds.**

| What It Shows | Details |
|--------------|---------|
| 📶 **SSID** | Network name |
| 🔒 **BSSID** | Access point MAC address |
| 📊 **Signal Strength** | dBm signal level |
| 📻 **Channel** | Operating frequency channel |
| 🔐 **Security Type** | WPA2, WPA3, Open, etc. |
| 🏭 **Hardware Vendor** | Manufacturer of the AP |

**🤖 AI Security Audit (Demo Mode):**
```
Real SSIDs → AI Simulation Engine
     │
     ▼
Identifies Top 3 High-Risk Networks
     │
     ├── Risk: Open network detected (no encryption)
     ├── Risk: WPS enabled (vulnerable to Reaver)
     └── Risk: Default SSID (vendor-exposed)
     │
     ▼
Actionable Mitigation Advice per Network
```

**📄 PDF Report:** One-click download of full scan results as a professional PDF via jsPDF + jspdf-autotable.

</details>

---

<details>
<summary><h3>🏠 Module 2 — My Network (Local Network Analysis)</h3></summary>

<br/>

![Scapy](https://img.shields.io/badge/Scanner-Scapy%20ARP-00ff41?style=flat-square)
![Nmap](https://img.shields.io/badge/Ports-Nmap-4EAA25?style=flat-square&logo=linux)
![Exploit-DB](https://img.shields.io/badge/CVEs-Exploit--DB-red?style=flat-square)

**Complete visibility into your local network — your device AND every device connected.**

**🖥️ Your Host Device Info (real-time fetch):**
```
IPv4 Address        → 192.168.x.x
IPv6 Address        → fe80::xxxx
MAC Address         → Hardware address
Gateway (Router) IP → 192.168.x.1
DNS Servers         → Primary & Secondary
Wi-Fi Link Speed    → Mbps
Signal Strength     → dBm / %
Frequency           → 2.4 GHz / 5 GHz
```

**🔍 Local Device Scanner (ARP Scan via Scapy):**
- Discovers ALL devices: phones, laptops, smart TVs, IoT, printers
- Shows IP, MAC address, and Vendor for each device

**🔬 Deep Analysis on any device:**

```
Select Device
     │
     ├──► Nmap Port Scan → Open ports + service versions
     │                           │
     │                           ▼
     └──► Exploit-DB Search → Real CVEs for found services
                               (e.g., Apache 2.4.52 → known exploits)
```

> **Why Exploit-DB instead of AI?** This is more practical — it gives you **real, published vulnerabilities** from the actual security community database.

</details>

---

<details>
<summary><h3>🔴 Module 3 — Live Traffic Monitor (Real-Time)</h3></summary>

<br/>

![Scapy](https://img.shields.io/badge/Sniffer-Scapy-00ff41?style=flat-square)
![WebSocket](https://img.shields.io/badge/Live-WebSocket%20%2F%20Socket.IO-010101?style=flat-square&logo=socket.io)

**Real-time packet capture with live browser dashboard updates — no page refresh needed.**

**How It Works:**
```
Network Interface
     │
     ▼  (Scapy sniffing thread)
Packet Capture (raw packets)
     │
     ▼  (every 2 seconds)
Flask-SocketIO → emit('traffic_update', data)
     │
     ▼  (Socket.IO client in browser)
Live Dashboard Update — no refresh!
```

**What You See:**
| Metric | Description |
|--------|-------------|
| 📦 **Packets/sec** | Real-time packet rate |
| 🌐 **Top Talkers** | IPs sending/receiving most data |
| 📊 **Protocol Mix** | TCP / UDP / ICMP breakdown |
| 🔁 **Bandwidth Hogs** | Spot heavy users instantly |
| 🕵️ **Suspicious Activity** | Unusual traffic pattern detection |

> **Use case:** Instantly spot who is hogging bandwidth, detect ARP spoofing attempts, or monitor your own device's traffic patterns.

</details>

---

## 🛠️ Tech Stack

<div align="center">

### 🐍 Backend
![Python](https://img.shields.io/badge/Python_3-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Flask-SocketIO](https://img.shields.io/badge/Flask--SocketIO-WebSockets-010101?style=for-the-badge&logo=socket.io&logoColor=white)

### 🔍 Scanning & Analysis
![Scapy](https://img.shields.io/badge/Scapy-Packet%20Sniffing-00ff41?style=for-the-badge)
![Nmap](https://img.shields.io/badge/python--nmap-Port%20Scanning-4EAA25?style=for-the-badge&logo=linux&logoColor=white)
![subprocess](https://img.shields.io/badge/subprocess-nmcli%20%2F%20iwconfig%20%2F%20ip-grey?style=for-the-badge)

### 🎨 Frontend
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![SocketIO Client](https://img.shields.io/badge/Socket.IO_Client-Real--Time_UI-010101?style=for-the-badge&logo=socket.io)

### 📄 Reporting
![jsPDF](https://img.shields.io/badge/jsPDF-PDF%20Generation-red?style=for-the-badge)
![autotable](https://img.shields.io/badge/jspdf--autotable-Table%20Reports-ff6600?style=for-the-badge)

### 🖥️ Platform
![Kali Linux](https://img.shields.io/badge/Kali_Linux-557C94?style=for-the-badge&logo=kalilinux&logoColor=white)
![Shell](https://img.shields.io/badge/Shell_Script-start.sh-4EAA25?style=for-the-badge&logo=gnubash&logoColor=white)

</div>

<br/>

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | Python + Flask | REST API + Server |
| **Real-Time** | Flask-SocketIO | WebSocket events |
| **Wi-Fi Scan** | subprocess + nmcli | Discover nearby networks |
| **ARP Scan** | Scapy | Find local devices |
| **Port Scan** | python-nmap | Service detection |
| **Packet Sniff** | Scapy | Live traffic capture |
| **Net Info** | subprocess (iwconfig, ip) | Host device details |
| **Frontend** | Bootstrap 5 + JS ES6+ | Responsive dashboard |
| **Live UI** | Socket.IO Client | No-refresh updates |
| **PDF Export** | jsPDF + autotable | Report download |

</div>

---

## 📂 Project Structure

```
NetStalker-Security-Suite/
│
├── 🐍 app.py                          ← Flask backend (main application)
├── 📋 requirements.txt                ← Python dependencies
├── 🟢 start.sh                        ← Linux startup script (sudo required)
├── 🪟 start.bat                       ← Windows startup script
├── 🚫 .gitignore File                 ← Git ignore rules
├── 📄 LICENSE File                    ← MIT License
│
├── 📂 static/                         ← Frontend assets
│   ├── 🎨 CSS files                   ← Custom styling
│   └── 📜 JS files                    ← Client-side logic + Socket.IO
│
├── 📂 templates/                      ← Jinja2 HTML templates
│   └── 🌐 index.html (+ others)       ← Dashboard pages
│
├── 📸 1) Wi-Fi Scanner.png            ← Screenshot
├── 📸 2) My Network.png               ← Screenshot
├── 📸 3) Live Traffic.png             ← Screenshot
├── 📸 4) AI Security Audit Report.png ← Screenshot
├── 📸 5) Network Vulnerability Scanner.png ← Screenshot
└── 📸 6) Port Scan.png                ← Screenshot
```

---

## 🚀 Setup & Installation

> ⚠️ Designed for **Kali Linux** or Debian-based distributions. Root/sudo access required for packet sniffing and ARP scanning.

### Step 1 — Install System Prerequisites
```bash
sudo apt update
sudo apt install nmap reaver python3-venv -y
```

### Step 2 — Clone the Repository
```bash
git clone https://github.com/CyberNiteshHub/NetStalker-Security-Suite.git
cd NetStalker-Security-Suite
```

### Step 3 — Create Virtual Environment
```bash
python3 -m venv myenv
source myenv/bin/activate       # Linux / Mac
# myenv\Scripts\activate        # Windows
```

### Step 4 — Install Python Dependencies
```bash
pip install -r requirements.txt
# Installs: flask, flask-socketio, scapy, python-nmap, psutil, etc.
```

### Step 5 — Run NetStalker
```bash
# ⚡ One command to rule them all:
sudo ./start.sh
```

```
✅ Server started at → http://127.0.0.1:5000
```

> Open your browser and navigate to **http://127.0.0.1:5000** — the dashboard loads instantly!

---

## ⚙️ How It Works — Architecture

<div align="center">

```
┌──────────────────────────────────────────────────────────────────┐
│                    NetStalker Architecture                        │
│                                                                  │
│  Browser (Bootstrap 5 + Socket.IO Client)                        │
│       │  HTTP Requests              │ WebSocket Events           │
│       │  (REST API calls)           │ (real-time push)           │
│       ▼                             ▼                            │
│  Flask Routes  ◄─────────  Flask-SocketIO Server                 │
│       │                             │                            │
│       ├── /wifi-scan ──► subprocess(nmcli) ──► Wi-Fi list        │
│       │                                                          │
│       ├── /my-network ──► Scapy ARP + iwconfig ──► device list  │
│       │                                                          │
│       ├── /port-scan ──► python-nmap ──► open ports             │
│       │                                                          │
│       └── /traffic ──► Scapy sniffer thread                     │
│                               │                                  │
│                          every 2s emit()                         │
│                               │                                  │
│                          Browser updates LIVE 🟢                 │
└──────────────────────────────────────────────────────────────────┘
```

</div>

---

## 🔐 Security Best Practices in This Tool

| Principle | Implementation |
|-----------|---------------|
| ⚖️ **Ethical by Design** | Only scans your own network / authorized devices |
| 🔒 **Local Only** | Server binds to localhost (127.0.0.1), not public |
| 🧑‍💻 **Sudo Required** | Scapy sniffing requires root — script is explicit about this |
| 🏷️ **Demo Mode** | AI features simulate without sending data to external APIs |
| 📋 **Transparent Reporting** | All findings logged and exportable as PDF |
| 🔗 **No Exploit Execution** | Exploit-DB links only — viewing, never launching |

---

## 💡 Use Cases

<div align="center">

```
Who Should Use NetStalker?

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  🎓 Students     │  │  🔐 Ethical     │  │  💼 IT Admins    │
│                  │  │     Hackers     │  │                  │
│  Learn network   │  │  Real-world     │  │  Monitor your    │
│  security        │  │  recon tool     │  │  corporate LAN   │
│  concepts live   │  │  for CTFs       │  │  for anomalies   │
└─────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  🏠 Home Users  │  │  🔬 Researchers  │  │  🏆 Hackathon    │
│                  │  │                  │  │     Teams        │
│  See who's on   │  │  Study network   │  │  Full demo-able  │
│  your Wi-Fi     │  │  traffic         │  │  security suite  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

</div>

---

## 📊 Language Breakdown

<div align="center">

```
┌─────────────────────────────────────────────────────────┐
│               CODEBASE COMPOSITION                      │
│                                                         │
│  JavaScript  ████████████████░░░░░░░░░░  39.4% 📜      │
│  Python      ████████░░░░░░░░░░░░░░░░░░  23.6% 🐍      │
│  CSS         ██████░░░░░░░░░░░░░░░░░░░░  18.2% 🎨      │
│  HTML        █████░░░░░░░░░░░░░░░░░░░░░  17.1% 🌐      │
│  Shell       ░░░░░░░░░░░░░░░░░░░░░░░░░░   1.3% 🟢      │
│  Batchfile   ░░░░░░░░░░░░░░░░░░░░░░░░░░   0.4% 🪟      │
└─────────────────────────────────────────────────────────┘
```

</div>

---

## 🔗 Useful References

<div align="center">

[![Flask](https://img.shields.io/badge/Flask-Docs-000000?style=flat-square&logo=flask)](https://flask.palletsprojects.com/)
[![Scapy](https://img.shields.io/badge/Scapy-Documentation-00ff41?style=flat-square)](https://scapy.readthedocs.io/)
[![Nmap](https://img.shields.io/badge/Nmap-Reference-4EAA25?style=flat-square&logo=linux)](https://nmap.org/book/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Docs-010101?style=flat-square&logo=socket.io)](https://socket.io/docs/)
[![Exploit-DB](https://img.shields.io/badge/Exploit--DB-CVE%20Database-red?style=flat-square)](https://www.exploit-db.com/)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-Docs-7952B3?style=flat-square&logo=bootstrap)](https://getbootstrap.com/docs/5.0/)
[![jsPDF](https://img.shields.io/badge/jsPDF-Library-orange?style=flat-square)](https://github.com/parallax/jsPDF)

</div>

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/CyberNiteshHub.png" width="100" style="border-radius:50%"/>

### Nitesh Verma — *Cyber Nitesh*
**Cyber Security Enthusiast | Ethical Hacker | Python Developer**

[![GitHub](https://img.shields.io/badge/GitHub-CyberNiteshHub-181717?style=for-the-badge&logo=github)](https://github.com/CyberNiteshHub)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nitesh%20Verma-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nitesh-verma-4ba443363)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Site-00ff41?style=for-the-badge&logo=netlify)](https://cyberniteshportfolio.netlify.app)
[![Email](https://img.shields.io/badge/Email-Contact%20Me-D14836?style=for-the-badge&logo=gmail)](mailto:niteshkumar3133845@gmail.com)

</div>

---

## ⚠️ Ethical Use Disclaimer

<div align="center">

> 🛡️ **NetStalker is built for authorized and educational use only.**
>
> This tool performs **active network scanning** — only run it on networks and devices **you own or have explicit permission to test.**
>
> Unauthorized scanning of networks is **illegal** under the Computer Fraud and Abuse Act (CFAA) and equivalent laws worldwide.
>
> **The Exploit-DB integration is read-only** — NetStalker shows vulnerability links, it does not execute any exploits.

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:003300,50:001a00,100:000000&height=130&section=footer&text=Stalk%20the%20Network.%20Ethically.%20%F0%9F%9B%A1%EF%B8%8F&fontSize=20&fontColor=00ff41&animation=fadeIn" width="100%"/>

**⭐ Star this repo if NetStalker impressed you!**

![Built with](https://img.shields.io/badge/Built%20with-Python%20%2B%20Flask%20%2B%20Scapy-00ff41?style=flat-square)
![Hackathon](https://img.shields.io/badge/🏆%20Hackathon-Project-FFD700?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Last Updated](https://img.shields.io/badge/Last%20Updated-May%202026-00ff41?style=flat-square)

</div>
