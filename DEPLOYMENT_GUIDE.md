# Panduan Deployment WebSchooll App

Berikut adalah langkah-langkah untuk meng-online-kan (deploy) website **WebSchooll App** Anda menggunakan Vercel (Platform terbaik untuk Next.js).

## Prasyarat
1.  Pastikan Anda memiliki akun [GitHub](https://github.com/).
2.  Pastikan Anda memiliki akun [Vercel](https://vercel.com/) (Daftar menggunakan akun GitHub Anda).

## Langkah 1: Simpan Perubahan ke Git (Commit)

Saat ini banyak file baru yang belum disimpan ke Git. Jalankan perintah berikut di terminal:

```bash
git add .
git commit -m "Update proyek: Fitur Admin, Siswa, Notifikasi, dan Rebranding"
```

## Langkah 2: Upload ke GitHub (Push)

1.  Buat **New Repository** di GitHub (kosongkan saja, jangan centang README).
2.  Salin URL repository baru Anda (contoh: `https://github.com/username/webschooll-app.git`).
3.  Hubungkan folder lokal Anda ke GitHub:

```bash
git remote add origin https://github.com/USERNAME/REPO_NAME.git 
git branch -M main
git push -u origin main
```
*(Ganti URL dengan URL repository Anda sendiri)*

> **Catatan:** Jika `origin` sudah ada (error "remote origin already exists"), gunakan `git remote set-url origin URL_BARU`.

## Langkah 3: Deploy ke Vercel

1.  Buka dashboard [Vercel](https://vercel.com/dashboard).
2.  Klik tombol **"Add New..."** > **"Project"**.
3.  Pilih repository **webschooll-app** yang baru Anda upload dari daftar "Import Git Repository".
4.  Klik **Import**.
5.  Di halaman konfigurasi "Configure Project":
    *   **Framework Preset**: Next.js (Otomatis terdeteksi).
    *   **Environment Variables**: Masukkan variabel yang ada di file `.env.local` Anda (seperti `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, dll) jika ada.
6.  Klik **Deploy**.

## Langkah 4: Selesai!

Vercel akan memproses build project Anda. Tunggu beberapa menit hingga muncul tulisan "Congratulations!".
Anda akan mendapatkan link domain (contoh: `webschooll-app.vercel.app`) yang bisa diakses oleh siapa saja.
