"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Pendaftaran Berhasil di BAKMIE WARUWU!");
        router.push('/login'); // Menggunakan router.push untuk navigasi yang lebih mulus
      } else {
        alert("Gagal: " + data.error);
      }
    } catch (err) {
      alert("Koneksi ke server backend gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-20 relative overflow-hidden">
      {/* Elemen Dekoratif Latar Belakang */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-700/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-400/10 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-md">
        {/* Identitas Brand */}
        <div className="text-center mb-10">
          <Link href="/" className="text-4xl font-black tracking-tighter text-red-700 italic hover:text-yellow-500 transition-colors">
            WARUWU.
          </Link>
          <div className="h-1 w-12 bg-yellow-400 mx-auto mt-2 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-800 mt-6 uppercase tracking-widest text-black">Daftar Akun Baru</h2>
          <p className="text-gray-400 text-xs mt-2 font-medium">Bergabunglah untuk menikmati kelezatan warisan keluarga</p>
        </div>

        {/* Kartu Registrasi */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
                Username
              </label>
              <input 
                type="text" 
                placeholder="Pilih nama pengguna"
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-700 transition-all text-black font-medium placeholder:text-gray-300"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="nama@email.com"
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-700 transition-all text-black font-medium placeholder:text-gray-300"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                required
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-700 transition-all text-black font-medium placeholder:text-gray-300"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl transition-all active:scale-95 flex justify-center items-center mt-4 ${
                loading 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-red-700 text-white hover:bg-black hover:shadow-red-700/20 shadow-red-700/30'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                  Mendaftar...
                </span>
              ) : 'Daftar Sekarang'}
            </button>
          </form>

          {/* Footer Kartu */}
          <div className="mt-10 text-center border-t border-gray-50 pt-8">
            <p className="text-xs text-gray-500 font-medium">
              Sudah memiliki akun? {" "}
              <Link href="/login" className="text-red-700 font-black hover:text-yellow-500 transition-colors underline-offset-4 decoration-2">
                MASUK DI SINI
              </Link>
            </p>
          </div>
        </div>

        {/* Aksi Sekunder */}
        <div className="text-center mt-8">
          <Link href="/" className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-red-700 transition-colors flex items-center justify-center gap-2">
            <span>←</span> Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}