"use client";
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  nama: string;
  harga: number;
  gambar: string;
  deskripsi: string;
  is_best_seller: boolean;
  kategori: string;
}

export default function HomePage() {
  const { addToCart } = useCart();
  const router = useRouter();
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
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
    return () => clearInterval(interval);
  }, []);

  const handleProtectedAction = (action: () => void) => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Ups! Silakan LOGIN terlebih dahulu untuk memesan menu favorit Anda.");
      router.push('/login');
    } else {
      action();
    }
  };

  const bestSellers = products.filter(p => p.is_best_seller).slice(0, 3);
  const otherProducts = products.filter(p => !bestSellers.find(b => b.id === p.id));

  return (
    <main className="min-h-screen bg-white overflow-x-hidden text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {backgrounds.map((bg, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentBg ? "opacity-100 scale-105" : "opacity-0"}`}
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url(${bg})`, 
              transition: "opacity 1.5s ease-in-out, transform 8s linear" 
            }} 
          />
        ))}
        
        <div className="relative z-10 text-center px-4 animate-in fade-in zoom-in duration-1000">
          <p className="text-yellow-400 font-bold uppercase tracking-[0.4em] text-xs mb-4">Authentic Handmade Noodles</p>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter drop-shadow-2xl leading-none text-white">
            LEGACY OF <span className="text-yellow-400">FLAVOR</span>
          </h1>
          <div className="flex justify-center">
            <button 
              onClick={() => handleProtectedAction(() => router.push('/menu'))}
              className="bg-yellow-400 text-red-900 px-12 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-2xl active:scale-95"
            >
              Order Menu
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu-section" className="container mx-auto py-32 px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-red-700 font-bold text-xs uppercase tracking-[0.3em] mb-2">Customer Favorites</span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
            Menu <span className="text-red-700 italic underline decoration-yellow-400">Andalan</span>
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">Menyiapkan Kelezatan...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {bestSellers.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(185,28,28,0.15)] hover:-translate-y-4 transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col p-4"
              >
                <div className="h-72 bg-gray-200 relative overflow-hidden rounded-[2rem]">
                  <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-red-900 px-5 py-2 rounded-xl text-[10px] font-black shadow-lg">
                    BEST SELLER
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow text-black">
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-tight group-hover:text-red-700 transition-colors">{item.nama}</h3>
                  
                  {/* Deskripsi untuk Best Seller */}
                  <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8">
                    {item.deskripsi || "Kelezatan autentik dari dapur Waruwu."}
                  </p>

                  <div className="flex items-center justify-between mt-auto bg-gray-50 p-4 rounded-2xl">
                    <span className="text-2xl font-black text-red-600 italic">Rp{item.harga.toLocaleString('id-ID')}</span>
                    <button 
                      onClick={() => handleProtectedAction(() => {
                        addToCart(item);
                        alert(`Berhasil menambah ${item.nama} ke keranjang!`);
                      })} 
                      className="bg-red-700 text-white p-4 rounded-xl hover:bg-black hover:rotate-12 transition-all shadow-lg active:scale-90"
                    >
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && otherProducts.length > 0 && (
          <div className="mt-20 text-center">
            <button 
              onClick={() => setShowOthers(!showOthers)} 
              className={`px-10 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all border-2 ${
                showOthers ? "bg-gray-100 border-gray-200 text-gray-500" : "bg-red-700 border-red-700 text-white shadow-xl"
              }`}
            >
              {showOthers ? "Tutup Katalog" : "Lihat Menu Lainnya"}
            </button>
            
            {showOthers && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 animate-in slide-in-from-bottom-10 duration-700">
                {otherProducts.map(item => (
                  <div key={item.id} className="bg-white p-5 rounded-[2rem] shadow-xl border border-gray-50 text-black flex flex-col">
                    <div className="h-44 w-full overflow-hidden rounded-2xl mb-5">
                      <img src={item.gambar} className="w-full h-full object-cover" alt={item.nama} />
                    </div>
                    <h4 className="font-black text-sm uppercase truncate mb-2">{item.nama}</h4>
                    
                    {/* Deskripsi untuk Menu Lainnya */}
                    <p className="text-gray-400 text-[10px] mb-4 line-clamp-2">
                      {item.deskripsi || "Kelezatan khas menu Waruwu."}
                    </p>

                    <p className="text-red-600 font-bold text-xs mb-4 italic">Rp{item.harga.toLocaleString('id-ID')}</p>
                    <button 
                      onClick={() => handleProtectedAction(() => {
                        addToCart(item);
                        alert(`Berhasil menambah ${item.nama} ke keranjang!`);
                      })} 
                      className="w-full bg-gray-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all"
                    >
                      + ADD TO CART
                    </button>
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