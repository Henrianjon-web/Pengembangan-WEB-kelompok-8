"use client";
import { useState, useEffect } from 'react';

// 1. Definisikan interface Product agar TypeScript mengenal struktur data Anda
interface Product {
  id: number;
  nama: string;
  harga: number;
  kategori: string;
  gambar: string;
  is_best_seller: boolean;
}

export default function AdminPage() {
  // 2. Tentukan tipe data awal untuk menu
  const [menu, setMenu] = useState({ 
    nama: '', 
    harga: '' as string | number, // Menghindari konflik tipe saat input kosong
    kategori: 'makanan', 
    gambar: '', 
    is_best_seller: false 
  });

  // 3. Beritahu TypeScript bahwa state products adalah array dari Product
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(err => console.error("Gagal memuat produk:", err));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...menu, 
        harga: typeof menu.harga === 'string' ? parseInt(menu.harga) : menu.harga 
      }),
    });
    
    if (res.ok) {
      alert("Menu Berhasil Ditambah!");
      // Reset form setelah sukses
      setMenu({ nama: '', harga: '', kategori: 'makanan', gambar: '', is_best_seller: false });
      fetchProducts();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus menu ini?")) {
      await fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-red-700 mb-8">Admin Dashboard - Bakmie Waruwu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-black">
        {/* Form Tambah Menu */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Tambah Menu Baru</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input 
              type="text" placeholder="Nama Makanan/Minuman" value={menu.nama}
              className="w-full p-2 border rounded" 
              onChange={(e) => setMenu({...menu, nama: e.target.value})} required 
            />
            <input 
              type="number" placeholder="Harga (Contoh: 25000)" value={menu.harga}
              className="w-full p-2 border rounded" 
              onChange={(e) => setMenu({...menu, harga: e.target.value})} required 
            />
            <select 
              className="w-full p-2 border rounded" value={menu.kategori}
              onChange={(e) => setMenu({...menu, kategori: e.target.value})}
            >
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
            </select>
            <input 
              type="text" placeholder="URL Gambar (Contoh: /images/mie.jpg)" value={menu.gambar}
              className="w-full p-2 border rounded" 
              onChange={(e) => setMenu({...menu, gambar: e.target.value})} required 
            />
            <label className="flex items-center gap-2 text-gray-700">
              <input 
                type="checkbox" checked={menu.is_best_seller}
                onChange={(e) => setMenu({...menu, is_best_seller: e.target.checked})} 
              /> Best Seller?
            </label>
            <button type="submit" className="w-full bg-red-700 text-white py-2 rounded font-bold hover:bg-red-800 transition">
              Simpan Menu
            </button>
          </form>
        </div>

        {/* Daftar Menu Saat Ini */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Daftar Menu</h2>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {products.length === 0 ? (
              <p className="text-gray-400 italic">Belum ada menu.</p>
            ) : (
              products.map((p: Product) => ( // Garis merah di (p: any) sekarang hilang
                <div key={p.id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{p.nama}</span>
                    <span className="text-sm text-gray-500">Rp {p.harga.toLocaleString('id-ID')}</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(p.id)} 
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-lg font-bold text-xs hover:bg-red-200 transition"
                  >
                    Hapus
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}