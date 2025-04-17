# 📊 Cek Tagihan UMB (Universitas Mercu Buana)

Aplikasi scraper otomatis untuk mengecek tagihan pembayaran Universitas Mercu Buana. Memudahkan mahasiswa dalam memantau status pembayaran SPP dan Sumbangan Pengembangan Universitas.

## 📋 Prasyarat

Sebelum menginstall aplikasi, pastikan sistem Anda memiliki:

-   [Node.js](https://nodejs.org/) (versi 14.x atau lebih baru)
-   [npm](https://www.npmjs.com/) (biasanya terinstall otomatis dengan Node.js)
-   [Git](https://git-scm.com/) (untuk clone repository)
-   Koneksi internet yang stabil
-   Akun SSO Mercu Buana yang aktif

## 🚀 Instalasi

1. Buka terminal atau command prompt

2. Clone repository ini:

```bash
git clone https://github.com/RehanDias/cekTagihanUmb.git
```

3. Masuk ke direktori project:

```bash
cd cekTagihanUmb
```

4. Install dependencies yang dibutuhkan:

```bash
npm install
# atau
npm ci  # Untuk instalasi yang lebih konsisten menggunakan package-lock.json
```

5. Setup environment variables:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

6. Edit file `.env` dengan kredensial SSO Anda:

```env
MERCUBUANA_USERNAME=your_username
MERCUBUANA_PASSWORD=your_password
```

## 💻 Cara Menggunakan

1. Jalankan aplikasi:

```bash
npm start
```

2. Aplikasi akan otomatis:
    - Login ke SSO Mercu Buana
    - Mengambil data tagihan
    - Menampilkan ringkasan tagihan

## 🎯 Fitur Utama

-   🔐 Login otomatis ke SSO Mercu Buana
-   📑 Scraping data tagihan secara real-time
-   💰 Menampilkan:
    -   Total tagihan keseluruhan
    -   Rincian pembayaran yang sudah dilakukan
    -   Sisa tagihan yang belum dilunasi
    -   Status pembayaran per semester
-   ⏰ Notifikasi tagihan yang mendekati jatuh tempo
-   🎨 Interface yang informatif dan mudah dibaca

## 🔍 Troubleshooting

Jika mengalami masalah:

1. **Error saat npm install:**

```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json
# Install ulang dependencies
npm install
```

2. **Login gagal:**

-   Pastikan kredensial di file `.env` benar
-   Periksa koneksi internet Anda
-   Pastikan SSO Mercu Buana dapat diakses

## ⚠️ Penting Diperhatikan

-   Jangan pernah membagikan file `.env` Anda
-   Aplikasi ini hanya untuk monitoring personal
-   Gunakan dengan bijak dan sesuai ketentuan universitas
-   Hindari request berlebihan ke server universitas

## 🛠️ Tech Stack

-   Node.js - Runtime environment
-   Puppeteer - Web scraping dan automasi
-   dotenv - Environment variables management
-   npm - Package management

## 📝 Lisensi

MIT License - Lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 👨‍💻 Pembuat

-   [Rehan Dias](https://github.com/RehanDias)

## 🤝 Kontribusi

Kontribusi selalu diterima!

1. Fork repository
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -am 'Menambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📮 Kontak

Untuk pertanyaan dan saran:

-   GitHub Issues: [Buat issue baru](https://github.com/RehanDias/cekTagihanUmb/issues)
-   Email: [rehanpratama282@gmail.com]

## ⭐ Support Project

Jika project ini membantu, berikan ⭐️ di GitHub!

### 💖 Dukungan Finansial

-   PayPal: [paypal.me/rehandiasp](https://paypal.me/rehandiasp)
-   Saweria: [saweria.co/Arcan1st](https://saweria.co/Arcan1st)

Setiap dukungan sangat berarti untuk pengembangan project ini lebih lanjut. Terima kasih! 🙏
