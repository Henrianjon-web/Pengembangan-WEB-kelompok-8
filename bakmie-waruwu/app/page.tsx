"use client";
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number; nama: string; harga: number; gambar: string; is_best_seller: boolean; kategori: string;
}

export default function HomePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOthers, setShowOthers] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=1920&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentBg((prev) => (prev + 1) % backgrounds.length), 5000);
    fetch('http://localhost:8080/api/products').then(res => res.json()).then(data => {
      setProducts(data); setLoading(false);
    });
    return () => clearInterval(interval);
  }, []);

  const bestSellers = products.filter(p => p.is_best_seller).slice(0, 3);
  const otherProducts = products.filter(p => !bestSellers.find(b => b.id === p.id));

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {backgrounds.map((bg, index) => (
          <div key={index} className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentBg ? "opacity-100 scale-105" : "opacity-0"}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${bg})`, transition: "opacity 1.5s ease-in-out, transform 8s linear" }} />
        ))}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter drop-shadow-2xl">LEGACY OF <span className="text-yellow-400">FLAVOR</span></h1>
          <a href="#menu" className="bg-yellow-400 text-red-900 px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl">Order Menu</a>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto py-24 px-6">
        <h2 className="text-5xl font-black text-gray-900 text-center mb-16 uppercase tracking-tighter">Menu <span className="text-red-700 italic">Andalan</span></h2>
        {loading ? (
          <div className="text-center py-20 animate-pulse font-bold text-red-700 uppercase tracking-widest">Menyiapkan Kelezatan...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {bestSellers.map((item) => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col p-4">
                <div className="h-72 bg-gray-200 relative overflow-hidden rounded-[2rem]">
                  <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-red-900 px-5 py-2 rounded-full text-[10px] font-black shadow-lg">BEST SELLER</div>
                </div>
                <div className="p-8 flex flex-col flex-grow text-black">
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-tight group-hover:text-red-700 transition-colors">{item.nama}</h3>
                  <p className="text-gray-400 text-xs font-medium mb-6">Resep spesial Waruwu yang paling dicari pelanggan.</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-red-600 italic">Rp{item.harga.toLocaleString('id-ID')}</span>
                    <button onClick={() => addToCart(item)} className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-yellow-400 hover:text-red-900 transition-all shadow-xl">🛒</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Tombol Menu Lainnya */}
        {!loading && otherProducts.length > 0 && (
          <div className="mt-12 text-center">
            <button onClick={() => setShowOthers(!showOthers)} className="bg-red-700 text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest">
              {showOthers ? "Tutup" : "Lihat Menu Lainnya"}
            </button>
            {showOthers && (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-in fade-in slide-in-from-top-5 duration-500">
                  {otherProducts.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 text-black">
                      <img src={item.gambar} className="h-40 w-full object-cover rounded-xl mb-4" />
                      <h4 className="font-black text-sm uppercase truncate">{item.nama}</h4>
                      <p className="text-red-600 font-black text-xs">Rp{item.harga.toLocaleString('id-ID')}</p>
                      <button onClick={() => addToCart(item)} className="mt-4 w-full bg-gray-100 py-2 rounded-xl text-[10px] font-black hover:bg-black hover:text-white transition-all">+ ADD</button>
                    </div>
                  ))}
               </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}