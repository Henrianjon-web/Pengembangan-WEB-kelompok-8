/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

// 1. Definisikan Interface Lengkap agar sinkron dengan Database & Admin
interface Product {
  id: number;
  nama: string;
  harga: number;
  gambar: string;
  deskripsi: string; // Tambahkan deskripsi detail
  is_best_seller: boolean;
  kategori: string;
}

export default function MenuPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pastikan Backend Go sudah jalan dengan 'go run .'
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil data menu:", err);
        setLoading(false);
      });
  }, []);

  // Pisahkan kategori (Case-insensitive agar lebih aman)
  const makanan = products.filter(p => p.kategori?.toLowerCase() === 'makanan');
  const minuman = products.filter(p => p.kategori?.toLowerCase() === 'minuman');

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Seksi */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-black">
            KATALOG <span className="text-red-700">MENU</span>
          </h1>
          <div className="h-1.5 w-32 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Section Makanan */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10 text-black">
            <h2 className="text-3xl font-black uppercase tracking-tighter">🍜 Makanan</h2>
            <div className="h-[2px] flex-grow bg-gray-100"></div>
          </div>

          {loading ? (
            <div className="text-center py-10 flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-red-700 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Menyiapkan Makanan...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {makanan.map((item) => (
                <MenuCard key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          )}
        </section>

        {/* Section Minuman */}
        <section>
          <div className="flex items-center gap-4 mb-10 text-black">
            <h2 className="text-3xl font-black uppercase tracking-tighter">🍹 Minuman</h2>
            <div className="h-[2px] flex-grow bg-gray-100"></div>
          </div>

          {loading ? (
            <div className="text-center text-gray-400 uppercase text-xs tracking-widest">Memuat Minuman...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {minuman.map((item) => (
                <MenuCard key={item.id} item={item} addToCart={addToCart} />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

// Sub-Komponen Card dengan Tampilan Deskripsi Detail
function MenuCard({ item, addToCart }: { item: Product, addToCart: (product: Product) => void }) {
  return (
    <div className="group bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col p-4">
      <div className="h-48 bg-gray-100 relative overflow-hidden rounded-[1.5rem]">
        <img 
          src={item.gambar || 'https://via.placeholder.com/400x300?text=Bakmie+Waruwu'} 
          alt={item.nama} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {item.is_best_seller && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-[8px] font-black shadow-md">
            ⭐ BEST SELLER
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow text-black">
        <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-red-700 transition-colors truncate">
          {item.nama}
        </h3>
        
        {/* Tampilan Deskripsi Detail (Mirip Referensi Anda) */}
        <p className="text-gray-400 text-[10px] font-medium leading-relaxed mt-1 mb-4 line-clamp-2 italic">
          {item.deskripsi || "Resep rahasia Waruwu dengan cita rasa autentik yang memanjakan lidah."}
        </p>

        <div className="mt-auto">
          <p className="text-red-600 font-black text-xl italic">
            Rp{item.harga.toLocaleString('id-ID')}
          </p>
          <button 
            onClick={() => {
              addToCart(item);
              alert(`${item.nama} telah ditambahkan ke keranjang!`);
            }}
            className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95 shadow-lg"
          >
            + ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}