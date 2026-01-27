"use client";
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { cart } = useCart();
  const pathname = usePathname(); // Untuk memicu pengecekan ulang saat pindah halaman
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const totalItems = cart ? cart.reduce((acc: number, item: any) => acc + item.quantity, 0) : 0;

  // Fungsi untuk mengambil data user dari storage
  const checkUserStatus = () => {
    const storedUser = localStorage.getItem('user');
    setUserName(storedUser);
  };

  useEffect(() => {
    // Jalankan saat pertama kali muat
    checkUserStatus();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Dengarkan perubahan storage (agar sinkron antar tab jika perlu)
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', checkUserStatus);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUserStatus);
    };
  }, [pathname]); // Cek ulang setiap kali user berpindah halaman

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem('user');
      setUserName(null);
      window.location.reload(); // Refresh untuk membersihkan semua state login
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${
      isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-md py-3" 
        : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className={`text-2xl font-black tracking-tighter transition-colors ${
          isScrolled ? "text-red-700" : "text-white"
        }`}>
          BAKMIE <span className="text-yellow-400">WARUWU</span>
        </Link>
        
        {/* Navigasi */}
        <div className={`flex items-center gap-6 font-bold uppercase text-[10px] md:text-xs tracking-widest ${
          isScrolled ? "text-gray-800" : "text-white"
        }`}>
          <Link href="/" className="hover:text-yellow-400 transition-colors hidden md:block">Home</Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors hidden md:block text-black">About</Link>
          <Link href="/menu" className="hover:text-yellow-400 transition-colors hidden md:block">Menu</Link>
          
          {/* Ikon Keranjang */}
          <Link href="/checkout" className="relative p-2 bg-red-700 rounded-full text-white hover:scale-110 transition-transform shadow-lg">
            🛒 
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-900 text-[10px] rounded-full px-1.5 font-black border-2 border-red-700">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Kondisi Login/User */}
          {userName ? (
            <div className="flex items-center gap-4">
              <span className={`font-black italic ${isScrolled ? 'text-red-700' : 'text-yellow-400'}`}>
                Halo, {userName}!
              </span>
              <button 
                onClick={handleLogout}
                className="text-[8px] bg-gray-200 text-gray-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className={`px-5 py-2 rounded-xl transition-all font-black border-2 ${
                isScrolled 
                  ? "border-red-700 bg-red-700 text-white hover:bg-white hover:text-red-700" 
                  : "border-yellow-400 bg-yellow-400 text-red-900 hover:bg-transparent hover:text-yellow-400"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}