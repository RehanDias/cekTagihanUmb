
<h1 align="center">💻 Cek Tagihan UMB 🏫</h1>

<p align="center">
    <strong>Skrip otomatisasi untuk mengecek dan menyimpan data tagihan dari SIA Universitas Mercu Buana.</strong>
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

## 🚀 Fitur Utama
- **🔐 Login Otomatis:** Otentikasi ke SIA UMB dengan aman dan otomatis.
- **🧩 Verifikasi CAPTCHA:** Menampilkan CAPTCHA untuk diisi oleh pengguna.
- **📊 Ekstraksi Data Tagihan:** Mengambil data tagihan biaya pengembangan dan pendidikan.
- **💾 Penyimpanan ke Excel:** Menyimpan data yang diambil ke dalam file Excel dengan format yang rapi.

## 📋 Prasyarat
Pastikan Anda memiliki Python 3.8 atau lebih tinggi terinstal pada sistem Anda. Selain itu, instal pustaka yang diperlukan:
```bash
pip install -r requirements.txt
```
### Dependencies:
- `pandas==2.2.2`
- `Pillow==10.4.0`
- `pyppeteer==2.0.0`

## 🛠️ Instalasi
1. **Clone** repositori ini:
    ```bash
    git clone https://github.com/RehanDias/cek-tagihan-umb.git
    cd cek-tagihan-umb
    ```
2. **Instal Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3. **Konfigurasi Path Chrome**:
    Edit variabel `CHROME_EXECUTABLE_PATH` di `main.py` sesuai dengan lokasi Chrome Anda:
    ```python
    CHROME_EXECUTABLE_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe"
    ```

## ⚙️ Penggunaan
1. Jalankan skrip:
    ```bash
    python main.py
    ```
2. Ikuti petunjuk yang muncul di terminal:
   - Masukkan **username** dan **password** SIA UMB Anda.
   - Masukkan **CAPTCHA** yang ditampilkan.
   - Data tagihan akan disimpan dalam file Excel dengan nama `[username]_Tagihan.xlsx`.

## 📂 Struktur Proyek
```plaintext
cek-tagihan-umb/
├── main.py               # Skrip utama untuk menjalankan otomatisasi
├── requirements.txt      # Daftar dependencies
└── README.md             # Dokumentasi proyek ini
```

## 📄 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE). Anda bebas untuk menggunakan, memodifikasi, dan mendistribusikan proyek ini dengan syarat sesuai dengan ketentuan lisensi.

## 🤝 Kontribusi
Kontribusi sangat diterima! Silakan fork repositori ini dan kirimkan pull request. Anda juga dapat membuka issue untuk diskusi fitur atau bug.

<p align="center">
    <a href="https://github.com/RehanDias/cek-tagihan-umb/issues">Laporkan Bug</a> •
    <a href="https://github.com/RehanDias/cek-tagihan-umb/pulls">Kirim Pull Request</a>
</p>

---

<p align="center">
    Dibuat dengan ❤️ oleh <a href="https://github.com/RehanDias">RehanDias</a>
</p>
