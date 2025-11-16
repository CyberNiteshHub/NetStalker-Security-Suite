#!/bin/bash

# --- NetStalker v1.0 Final Start Script (DEMO MODE) ---

# 1. Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Error: This script requires root privileges. Please run it with sudo."
  echo "Example: sudo ./start.sh"
  exit
fi

# 2. (API Key वाली लाइन हटा दी गई है, क्योंकि हम डेमो मोड का उपयोग कर रहे हैं)

# 3. Define the virtual environment name
VENV_NAME="myenv"
VENV_PYTHON="$VENV_NAME/bin/python"

# 4. Check if the venv python executable exists
if [ ! -f "$VENV_PYTHON" ]; then
    echo "Error: Virtual environment '$VENV_NAME' not found."
    echo "Please create it first by running: python3 -m venv $VENV_NAME"
    exit
fi

# 5. Run the application
echo "Starting NetStalker v1.0 (Demo Mode) using Python from '$VENV_NAME'..."
"$VENV_PYTHON" app.py