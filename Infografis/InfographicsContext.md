# Konteks dan Instruksi untuk Agen AI: Pembuatan Infografis Portofolio A3

## Tujuan Utama
Membuat sebuah halaman HTML statis yang didesain khusus sebagai infografis/poster berukuran A3. Halaman ini akan digunakan untuk merangkum karya-karya terbaik (maksimal 10 karya) untuk dicetak (Print to PDF) tanpa mengubah struktur web portofolio yang sudah ada.

## Aturan Ketat (Strict Rules)
1. **JANGAN MENGUBAH ATAU MENGHAPUS** file apapun yang sudah ada di repository web portofolio ini.
2. Buat folder baru di root directory dengan nama `a3-print-poster`.
3. Semua pengerjaan untuk tugas ini HANYA boleh dilakukan di dalam folder `a3-print-poster` (buat file `index.html` dan `style.css` di dalamnya).
4. Hasil akhir harus dioptimalkan untuk dicetak di kertas A3 (297mm x 420mm) menggunakan fitur "Save as PDF" pada browser.

## Langkah-langkah yang Harus Dilakukan AI
1. **Analisis Data:** Baca dan pindai seluruh file di dalam repository ini, khususnya folder/file yang menyimpan data *project*, *lomba*, atau *portfolio* (misalnya file `.json`, `.md`, atau komponen React/HTML yang berisi deskripsi proyek).
2. **Ekstraksi Karya:** Pilih karya/proyek terbaik berdasarkan kelengkapan datanya. Ambil atribut berikut dari masing-masing proyek:
   - Judul Proyek / Lomba
   - Deskripsi Singkat
   - Gambar / Thumbnail (gunakan path gambar yang ada)
   - Teknologi/Tools yang digunakan (Stack)
3. **Pembuatan Desain A3 (HTML/CSS):**
   - Buat `index.html` di dalam folder `a3-print-poster`.
   - Gunakan CSS Grid atau Flexbox untuk menyusun ke-10 karya tersebut dalam bentuk infografis/katalog yang rapi, profesional, dan mudah dibaca.
   - Atur ukuran halaman di CSS secara hardcode untuk ukuran A3:
     
```css
     @page {
       size: A3 portrait; /* atau landscape, sesuaikan dengan tata letak terbaik */
       margin: 0;
     }
     body {
       width: 297mm;
       height: 420mm;
       margin: 0 auto;
       background: white;
       /* Pastikan warna teks dan background kontras untuk tinta printer */
     }

Tambahkan header di bagian atas poster (Misal: "Portofolio Karya Mahasiswa - [Nama Saya]" / atau aggota kelompok). 

Print Optimization: Gunakan @media print untuk menghilangkan elemen yang tidak perlu (jika ada) dan memastikan gambar (background graphics) ikut tercetak (-webkit-print-color-adjust: exact; print-color-adjust: exact;).

Output yang Diharapkan
Sebuah folder a3-print-poster yang berisi web HTML mandiri. Saat file index.html tersebut dibuka di browser dan ditekan Ctrl+P (Print), preview print-nya harus pas 1 halaman A3 dan siap di-save ke PDF.
