**🍜 Bakmie - Aplikasi Pemesanan Online**

Selamat datang di repositori Bakmie Waruwu! Proyek ini adalah sebuah platform digital yang dirancang untuk mempermudah pelanggan dalam melihat katalog menu dan melakukan pemesanan bakmie autentik secara praktis.


**👥 Kontribusi & Tanggung Jawab Tim**

| No | Nama | NIM | Peran Utama | Tugas Utama | Persentase Tugas tanggung jawab |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Yoga Barus | 2403310212 | Leader | Mengoordinasi seluruh anggota, menyusun timeline kerja, dan memastikan visi proyek tercapai, Memantau integrasi antara Frontend dan Backend, melakukan pengecekan kualitas fitur, dan memimpin diskusi arah pengembangan aplikasi. | 90% | 
| 2 | Henrianjon Waruwu | 2403311649 | Backend | Membangun infrastruktur server menggunakan Golang dan mengelola basis data MySQL, Membuat API untuk manajemen produk (CRUD), mengatur sistem autentikasi login, dan memastikan data dari database tampil dengan benar | 100% |
| 3 | Juwita Fransiska Br Tarigan | 2403310106 | frontend | Mengembangkan antarmuka pengguna (UI) yang responsif menggunakan Next.js, Membangun halaman katalog menu, sistem keranjang belanja (Context API), serta mengimplementasikan fitur manajemen produk di Dashboard Admin | 90% |
| 4 | Putri Natahsya Amelia | 2403310231 | UI/UX Designer | Merancang alur navigasi dan tampilan visual aplikasi agar intuitif dan modern,  Membuat desain mockup untuk halaman menu dan admin, serta memastikan pengalaman pengguna tetap nyaman meskipun tanpa fitur pembayaran langsung| 80% |
| 5 | Saut Ronaldo Limbong | 2403310228 | Data Analyst | Mengolah data stok dan preferensi menu untuk memberikan wawasan operasional, Menganalisis data menu yang paling sering dimasukkan ke keranjang dan memberikan rekomendasi menu "Best Seller" berdasarkan data yang ada | 80% |
| 6 |Joel Felix Situmorang | 2403310201 | User Tester |Melakukan pengujian fungsionalitas aplikasi dari sudut pandang pengguna akhir, Mengidentifikasi bug pada fitur keranjang dan admin, serta memastikan alur pemesanan berjalan lancar hingga tahap akhir | 90% |


**🚀 Fitur Utama**

Katalog Menu Dinamis: Menampilkan daftar makanan dan minuman lengkap dengan foto dan deskripsi detail langsung dari database.

Sistem Keranjang (Cart): Pelanggan dapat memilih menu favorit dan mengelola jumlah pesanan sebelum melakukan checkout.

Dashboard Admin Terpadu: Memudahkan pemilik untuk menambah, memperbarui, atau menghapus menu tanpa perlu menyentuh database secara manual.

Label Best Seller: Fitur untuk menonjolkan menu andalan agar lebih mudah ditemukan oleh pelanggan.


**🛠️ Teknologi yang Digunakan**

Frontend: Next.js(App Router) dan Tailwind CSS.

Backend: Golang & Gin Gonic.

Database: MySQL .


**📁 Struktur Folder**

/Frontend: Berisi antarmuka pengguna, sistem keranjang, dan dashboard admin.

/Backend: Berisi logika server, pengaturan database, dan endpoint API.

**Jalankan Backend (Golang)**

cd Backend

go mod tidy

go run .


**Jalankan Frontend (Next.js)**

cd Frontend

npm install

npm run dev
