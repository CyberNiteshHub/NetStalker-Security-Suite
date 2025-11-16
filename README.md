NetStalker v1.0 - Advanced Web-Based Network Scanner
A comprehensive, web-based network analysis toolkit built with Python, Flask, and Scapy. It allows you to scan for nearby Wi-Fi networks, perform deep analysis on connected devices, and monitor network traffic in real-time through a modern, responsive web interface.

Dashboard Screenshot
(Please add a screenshot of your project running to the docs folder and name it netstalker-dashboard.png. It will appear here automatically.)

🔥 Key Features
Wi-Fi Scanner: Scans for all nearby Wi-Fi networks, detailing their SSID, BSSID, signal strength, channel, and security protocols.

Deep Network Analysis: Gathers in-depth information on any scanned network, including the router's hardware vendor and WPS status.

Live Traffic Monitor: Captures and displays live network traffic on your connected interface, identifying the "top talkers" (devices consuming the most bandwidth) in real-time.

Interactive Scans: For the network you are connected to, you can find the router's IP address, perform a live Ping check, and run an Nmap scan to detect OS and open ports/services.

PDF Reporting: With a single click, generate and download a professional PDF report summarizing the results of the Wi-Fi scan.

Modern Web UI: A clean, real-time user interface powered by Flask and WebSockets, designed to be both functional and aesthetically pleasing.

🛠️ Tech Stack
Backend:

Python

Flask (Web Framework)

Flask-SocketIO (for real-time WebSockets)

Scapy (for packet capturing and analysis)

python-nmap (for Nmap integration)

psutil (for system and network information)

Frontend:

HTML5 & CSS3

JavaScript (ES6+)

Socket.IO Client

Bootstrap 5

jsPDF & jspdf-autotable (for PDF report generation)

🚀 Setup and Installation
This tool is designed to run on Kali Linux or other Debian-based distributions.

1. Install System Prerequisites:

sudo apt update
sudo apt install nmap reaver python3-venv

2. Clone the Repository:

git clone [YOUR-GITHUB-REPOSITORY-LINK-HERE]
cd NetStalker_v1

3. Create and Activate Virtual Environment:

python3 -m venv myenv
source myenv/bin/activate

4. Install Python Dependencies:

pip install -r requirements.txt

🏃 How to Run
After completing the setup, run the application using the provided shell script. This is necessary as packet capturing requires root privileges.

sudo ./start.sh

Now, open your web browser and navigate to http://127.0.0.1:5000.
