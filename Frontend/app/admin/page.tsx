"use client";
import { useState, useEffect } from 'react';

// Interface untuk sinkronisasi data dengan Backend Go
interface Product {
  id: number;
  nama: string;
  harga: number;
  deskripsi: string;
  kategori: string;
  gambar: string;
  is_best_seller: boolean;
}

export default function AdminPage() {
  const [menu, setMenu] = useState({ 
    nama: '', 
    harga: '' as string | number,
    deskripsi: '',
    kategori: 'makanan', 
    gambar: '', 
    is_best_seller: false 
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const fetchProducts = () => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(err => console.error("Gagal memuat produk:", err));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gunakan URL dinamis berdasarkan status editing
    const url = isEditing 
      ? `http://localhost:8080/api/products/${currentId}` 
      : 'http://localhost:8080/api/products';
    
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...menu, 
        harga: typeof menu.harga === 'string' ? parseInt(menu.harga) : menu.harga 
      }),
    });
    
    if (res.ok) {
      alert(isEditing ? "Menu Berhasil Diperbarui!" : "Menu Berhasil Ditambah!");
      resetForm();
      fetchProducts();
    }
  };

  const handleEdit = (p: Product) => {
    setIsEditing(true);
    setCurrentId(p.id);
    setMenu({
      nama: p.nama,
      harga: p.harga,
      deskripsi: p.deskripsi,
      kategori: p.kategori,
      gambar: p.gambar,
      is_best_seller: p.is_best_seller
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setMenu({ nama: '', harga: '', deskripsi: '', kategori: 'makanan', gambar: '', is_best_seller: false });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus menu ini?")) {
      await fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-red-700 uppercase tracking-tighter">Admin Dashboard - Bakmie Waruwu</h1>
        {isEditing && (
          <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-black transition-colors">Batal Edit</button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form Tambah/Edit Menu */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit border-t-4 border-red-700">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {isEditing ? "Mode Edit: Update Produk" : "Tambah Menu Baru"}
          </h2>
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <input 
              type="text" placeholder="Nama Makanan/Minuman" value={menu.nama}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 outline-none" 
              onChange={(e) => setMenu({...menu, nama: e.target.value})} required 
            />
            <input 
              type="number" placeholder="Harga (Contoh: 25000)" value={menu.harga}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 outline-none" 
              onChange={(e) => setMenu({...menu, harga: e.target.value})} required 
            />
            <textarea 
              placeholder="Deskripsi Detail Produk (Muncul di bawah nama produk)" 
              value={menu.deskripsi}
              className="w-full p-2 border rounded h-24 focus:ring-2 focus:ring-red-200 outline-none" 
              onChange={(e) => setMenu({...menu, deskripsi: e.target.value})} required 
            />
            
            {/* Perbaikan Aksesibilitas: Tambahkan Label untuk Select */}
            <div className="space-y-1">
              <label htmlFor="kategori-select" className="block text-xs font-bold text-gray-500 uppercase">Kategori</label>
              <select 
                id="kategori-select"
                className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-red-200 outline-none" 
                value={menu.kategori}
                onChange={(e) => setMenu({...menu, kategori: e.target.value})}
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
              </select>
            </div>

            <input 
              type="text" placeholder="URL Gambar (Contoh: /images/mie.jpg)" value={menu.gambar}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-200 outline-none" 
              onChange={(e) => setMenu({...menu, gambar: e.target.value})} required 
            />
            <label className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
              <input 
                type="checkbox" checked={menu.is_best_seller}
                onChange={(e) => setMenu({...menu, is_best_seller: e.target.checked})} 
              /> Best Seller?
            </label>
            <button 
              type="submit" 
              className={`w-full py-3 rounded font-bold text-white transition shadow-lg ${isEditing ? "bg-blue-600 hover:bg-blue-800" : "bg-red-700 hover:bg-red-900"}`}
            >
              {isEditing ? "UPDATE PRODUK" : "SIMPAN MENU BARU"}
            </button>
          </form>
        </div>

        {/* Daftar Menu */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-tight">Daftar Menu Saat Ini</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {products.length === 0 ? (
              <p className="text-gray-400 italic">Belum ada menu yang terdaftar di database.</p>
            ) : (
              products.map((p) => (
                <div key={p.id} className="flex justify-between items-center border-b pb-3 hover:bg-gray-50 transition p-2 rounded-lg">
                  <div className="flex gap-3 items-center">
                    <img src={p.gambar} className="w-12 h-12 rounded-lg object-cover bg-gray-200 shadow-sm" alt={p.nama} />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm uppercase">{p.nama}</span>
                      <span className="text-[10px] text-gray-400 italic line-clamp-1 max-w-[200px]">
                        {p.deskripsi || "Tidak ada deskripsi."}
                      </span>
                      <span className="text-xs text-red-600 font-bold">Rp {p.harga.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(p)} 
                      className="text-blue-600 px-3 py-1 rounded-lg font-bold text-[10px] border border-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      EDIT
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)} 
                      className="text-red-600 px-3 py-1 rounded-lg font-bold text-[10px] border border-red-600 hover:bg-red-600 hover:text-white transition-all"
                    >
                      HAPUS
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}