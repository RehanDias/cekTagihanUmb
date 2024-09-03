<h1 align="center">🤖 UMB AutoBill Inspector 📊</h1>
<p align="center">
    <strong>Automation script to check and save billing data from Mercu Buana University's Academic Information System (SIA).</strong>
</p>
<p align="center">
    <a href="https://www.python.org/downloads/release/python-380/">
        <img src="https://img.shields.io/badge/Python-3.8%2B-blue.svg" alt="Python Version">
    </a>
    <a href="https://pandas.pydata.org/">
        <img src="https://img.shields.io/badge/pandas-2.2.2-green.svg" alt="Pandas Version">
    </a>
    <a href="https://pypi.org/project/pyppeteer/">
        <img src="https://img.shields.io/badge/pyppeteer-2.0.0-brightgreen.svg" alt="Pyppeteer Version">
    </a>
    <a href="https://pypi.org/project/Pillow/">
        <img src="https://img.shields.io/badge/Pillow-10.4.0-yellow.svg" alt="Pillow Version">
    </a>
</p>

## 🚀 Key Features
- **🔐 Automated Login:** Secure and automatic authentication to UMB's SIA.
- **🧩 CAPTCHA Verification:** Displays CAPTCHA for user input.
- **📊 Bill Data Extraction:** Retrieves development and education fee billing data.
- **💾 Excel Export:** Saves extracted data to a neatly formatted Excel file.

## 📋 Requirements
Ensure you have Python 3.8 or higher installed on your system. Additionally, install the required libraries:

```bash
pip install -r requirements.txt
```

### Dependencies:
- `pandas==2.2.2`
- `Pillow==10.4.0`
- `pyppeteer==2.0.0`

## 🛠️ Installation
1. **Clone** this repository:
    ```bash
    git clone https://github.com/RehanDias/cekTagihanUmb.git
    cd cekTagihanUmb
    ```

2. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Configure Chrome Path**:
    Edit the `CHROME_EXECUTABLE_PATH` variable in `main.py` to match your Chrome installation:
    ```python
    CHROME_EXECUTABLE_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe"
    ```

## ⚙️ Usage
1. Run the script:
    ```bash
    python main.py
    ```

2. Follow the prompts in the terminal:
   - Enter your UMB SIA **username** and **password**.
   - Input the displayed **CAPTCHA**.
   - Billing data will be saved to an Excel file named `[username]_Billing.xlsx`.

## 📂 Project Structure
```plaintext
cekTagihanUmb/
├── main.py               # Main script for running the automation
├── requirements.txt      # List of dependencies
└── README.md             # This project documentation
```

## 📄 License
This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this project in accordance with the license terms.

## 🤝 Contributing
Contributions are warmly welcomed! Please fork this repository and submit a pull request. You can also open an issue for feature discussions or bug reports.

<p align="center">
    <a href="https://github.com/RehanDias/cekTagihanUmb/issues">Report Bug</a> •
    <a href="https://github.com/RehanDias/cekTagihanUmb/pulls">Submit Pull Request</a>
</p>

## 🔒 Security
This script handles sensitive login information. Always use it responsibly and avoid sharing your credentials.

## 📞 Support
If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

<p align="center">
    Created with ❤️ by <a href="https://github.com/RehanDias">RehanDias</a>
</p>

