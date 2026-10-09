# 🐱 Cat Clicker — Acceptance Criteria

> *Dokumen ini berisi daftar kriteria kelayakan (Acceptance Criteria) untuk aplikasi **Cat Clicker Web App**.*
> Setiap fitur harus memenuhi semua kriteria di bawah ini sebelum dinyatakan **DONE** ✅

---

## 🗂️ Daftar Isi

1. [Tampilan & Estetika](#1--tampilan--estetika)
2. [Gambar Kucing](#2--gambar-kucing)
3. [Sistem Klik & Counter](#3--sistem-klik--counter)
4. [Animasi Klik](#4--animasi-klik)
5. [Combo System](#5--combo-system)
6. [Milestone & Toast Notifikasi](#6--milestone--toast-notifikasi)
7. [CPS (Clicks Per Second)](#7--cps-clicks-per-second)
8. [Tombol Aksi](#8--tombol-aksi)
9. [Keyboard Support](#9--keyboard-support)
10. [Responsivitas](#10--responsivitas)

---

## 1. 🎨 Tampilan & Estetika

| # | Kriteria | Status |
|---|----------|--------|
| 1.1 | Halaman menggunakan **Glassmorphism** — kartu dengan `backdrop-filter: blur`, border transparan, dan box-shadow | ✅ |
| 1.2 | Background berupa gradasi gelap (ungu tua → biru tua) | ✅ |
| 1.3 | Terdapat **3 animated background blobs** berwarna ungu, pink, dan oranye yang melayang-layang | ✅ |
| 1.4 | Judul aplikasi ditampilkan dengan teks bergradasi warna-warni | ✅ |
| 1.5 | Semua elemen kartu menggunakan desain konsisten (glass card) | ✅ |

---

## 2. 🐱 Gambar Kucing

| # | Kriteria | Status |
|---|----------|--------|
| 2.1 | Gambar kucing **tampil saat halaman pertama kali dibuka** | ✅ |
| 2.2 | Gambar kucing berbentuk **lingkaran** dengan border transparan | ✅ |
| 2.3 | Terdapat **cincin glow berputar** (conic-gradient) di sekeliling gambar kucing | ✅ |
| 2.4 | Gambar kucing diambil dari API eksternal (`cataas.com`) dengan **seed random** | ✅ |
| 2.5 | Jika gambar gagal dimuat, sistem otomatis menggunakan **fallback URL** | ✅ |
| 2.6 | Saat gambar sedang dimuat, ditampilkan efek **blur + loading state** | ✅ |

---

## 3. 🖱️ Sistem Klik & Counter

| # | Kriteria | Status |
|---|----------|--------|
| 3.1 | Setiap klik pada gambar kucing **menambah counter Total Klik sebesar +1** | ✅ |
| 3.2 | **Total Klik** ditampilkan secara real-time di score board | ✅ |
| 3.3 | **Rekor tertinggi** dicatat dan ditampilkan — tidak ikut terhapus saat reset | ✅ |
| 3.4 | Angka score menggunakan **format singkat**: 1.5K, 2.3M, dll | ✅ |
| 3.5 | Angka Total Klik menampilkan **animasi "pop"** setiap kali bertambah | ✅ |

---

## 4. ✨ Animasi Klik

| # | Kriteria | Status |
|---|----------|--------|
| 4.1 | Gambar kucing menampilkan **efek bounce** (scale down → scale up) saat diklik | ✅ |
| 4.2 | **Ripple effect** muncul menyebar dari titik klik pada gambar kucing | ✅ |
| 4.3 | **Floating label** (`+1`, `😸`, `🐾`, dll) muncul dan melayang ke atas dari posisi kursor | ✅ |
| 4.4 | Floating label memiliki **warna yang bervariasi** berdasarkan combo | ✅ |
| 4.5 | Floating label **lebih besar** saat combo tinggi (≥ 10) | ✅ |
| 4.6 | Saat hover, gambar kucing **sedikit membesar** dan bertambah cerah | ✅ |

---

## 5. 🔥 Combo System

| # | Kriteria | Status |
|---|----------|--------|
| 5.1 | Combo **bertambah 1** setiap kali kucing diklik | ✅ |
| 5.2 | Combo **otomatis reset ke 0** jika tidak ada klik selama **2 detik** | ✅ |
| 5.3 | **Combo bar** terisi secara proporsional (penuh di combo ke-50) | ✅ |
| 5.4 | Teks combo berubah emoji sesuai level: ⚡(1-9) → 🔥(10-19) → 💥(20-29) → 🚀(30+) | ✅ |
| 5.5 | Warna teks combo berubah: default → pink (≥10) → kuning (≥20) | ✅ |

---

## 6. 🎉 Milestone & Toast Notifikasi

| # | Kriteria | Status |
|---|----------|--------|
| 6.1 | Toast notifikasi muncul saat mencapai milestone: **10, 25, 50, 100, 250, 500, 1K, 2.5K, 5K, 10K** klik | ✅ |
| 6.2 | Toast **animasi slide-in dari atas** dan otomatis menghilang setelah 2.5 detik | ✅ |
| 6.3 | Setiap milestone **hanya muncul sekali** per sesi (tidak berulang) | ✅ |
| 6.4 | Toast reset muncul saat tombol **Reset** ditekan | ✅ |

---

## 7. ⚡ CPS (Clicks Per Second)

| # | Kriteria | Status |
|---|----------|--------|
| 7.1 | Nilai **Klik/Detik (CPS)** dihitung berdasarkan klik dalam **1 detik terakhir** | ✅ |
| 7.2 | CPS **diperbarui setiap 200ms** (5 kali per detik) | ✅ |
| 7.3 | CPS ditampilkan di score board secara real-time | ✅ |
| 7.4 | CPS **kembali ke 0** saat tidak ada klik dalam 1 detik | ✅ |

---

## 8. 🔘 Tombol Aksi

| # | Kriteria | Status |
|---|----------|--------|
| 8.1 | Tombol **"🔄 Kucing Baru"** mengganti gambar kucing dengan foto baru dari API | ✅ |
| 8.2 | Tombol **"🗑️ Reset"** mereset Total Klik, Combo, dan CPS ke 0 | ✅ |
| 8.3 | Reset **tidak menghapus** nilai Rekor tertinggi | ✅ |
| 8.4 | Kedua tombol menggunakan **desain glass** dengan efek hover naik & glow | ✅ |
| 8.5 | Tombol memiliki efek **scale down** saat ditekan (active state) | ✅ |

---

## 9. ⌨️ Keyboard Support

| # | Kriteria | Status |
|---|----------|--------|
| 9.1 | Menekan tombol **`Space`** memicu klik pada kucing | ✅ |
| 9.2 | Menekan tombol **`Enter`** memicu klik pada kucing | ✅ |
| 9.3 | Floating label tetap **muncul di tengah kucing** saat klik via keyboard | ✅ |
| 9.4 | Default scroll behavior **dicegah** saat Space ditekan | ✅ |

---

## 10. 📱 Responsivitas

| # | Kriteria | Status |
|---|----------|--------|
| 10.1 | Layout tampil baik di layar **desktop** (≥ 768px) | ✅ |
| 10.2 | Layout tampil baik di layar **tablet dan mobile** (< 768px) | ✅ |
| 10.3 | Ukuran gambar kucing **mengecil** di layar kecil (190px → 220px) | ✅ |
| 10.4 | Di layar sangat kecil (< 480px), **navbar berubah layout vertikal** | ✅ |
| 10.5 | Teks dan tombol tetap **mudah dibaca dan diklik** di semua ukuran layar | ✅ |

---

## 📋 Ringkasan Status

```
Total Kriteria  : 45
✅ Terpenuhi    : 45
❌ Belum        : 0
📊 Progress     : 100% — SIAP RILIS 🚀
```

---

> 🐾 *Dibuat dengan cinta untuk kucing-kucing di seluruh dunia.*
> *Dokumen ini dibuat otomatis berdasarkan implementasi Cat Clicker Web App.*
