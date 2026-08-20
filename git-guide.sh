# 1. Inisialisasi Git di folder proyekmu
git init

# 2. Tambahkan semua file ke dalam "staging area" Git
git add .

# 3. Simpan perubahan pertama dengan pesan commit
git commit -m "feat: initial commit portfolio Next.js"

# 4. Ubah nama branch utama menjadi 'main' (standar modern)
git branch -M main

# 5. Hubungkan proyek lokalmu dengan repository GitHub yang baru dibuat
# (GANTI URL DI BAWAH dengan URL repository GitHub-mu yang asli)
git remote add origin https://github.com/RussellReece/Portofolio.git

# 6. Unggah (push) kodemu ke GitHub
git push -u origin main