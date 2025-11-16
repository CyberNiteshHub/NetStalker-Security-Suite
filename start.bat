@echo off
REM Activate virtual environment if it exists
IF EXIST venv\Scripts\activate.bat (
    echo "Activating virtual environment..."
    call venv\Scripts\activate.bat
) ELSE (
    echo "Warning: Virtual environment not found."
)

echo "Starting NetStalker v2.0..."
python app.py

pause