/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

export default function CheckoutPage() {
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState({ alamat: '', kota: '', catatan: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Proteksi Halaman: Cek status login saat komponen dimuat
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Ups! Anda harus login terlebih dahulu untuk melakukan checkout.");
      router.push('/login');
    }
  }, [router]);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Keamanan tambahan: Cek login kembali sebelum memproses transaksi
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Sesi Anda berakhir, silakan login kembali.");
      router.push('/login');
      return;
    }

    if (cart.length === 0) return alert("Keranjang belanja kosong!");
    
    setLoading(true);
    try {
      // 1. Ambil Snap Token dari Backend Go Anda
      const res = await fetch('http://localhost:8080/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1, // Bisa diganti dengan ID dari localStorage jika tersedia
          amount: totalPrice,
          items: cart,
          address: address
        }),
      });

      const data = await res.json();

      // 2. Munculkan Popup Pembayaran Midtrans Snap
      if (data.token && (window as any).snap) {
        (window as any).snap.pay(data.token, {
          onSuccess: function (result: any) {
            console.log(result);
            alert("Pembayaran Berhasil! Pesanan Anda segera diproses.");
            clearCart();
            router.push('/');
          },
          onPending: function (result: any) {
            console.log(result);
            alert("Mohon selesaikan pembayaran Anda.");
          },
          onError: function (result: any) {
            console.log(result);
            alert("Pembayaran gagal, silakan coba lagi.");
          },
          onClose: function () {
            alert("Anda menutup halaman pembayaran sebelum selesai.");
          }
        });
      } else {
        alert("Gagal mendapatkan token pembayaran dari server.");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi ke server pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Script Midtrans Sandbox */}
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js" 
        data-client-key="Mid-client-VEW0Z9FpZI7HAXC4" 
      />

      <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-black">
              PROSES <span className="text-red-700">PEMBAYARAN</span>
            </h1>
            <div className="h-1.5 w-24 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* SISI KIRI: Daftar Belanja */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 text-black">
                <h2 className="text-xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                  <span className="bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">01</span>
                  Daftar Pesanan
                </h2>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400 font-medium mb-6">Keranjang Anda masih kosong.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center group">
                        <div className="flex gap-6 items-center">
                          <div className="w-20 h-20 bg-gray-100 rounded-[1.5rem] overflow-hidden flex-shrink-0">
                            <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-black uppercase text-sm tracking-tight">{item.nama}</h4>
                            <p className="text-xs text-gray-400 font-bold uppercase">{item.quantity} Porsi</p>
                            <button 
                              onClick={() => removeFromCart(item.id)} 
                              className="text-[10px] text-red-500 hover:text-red-700 mt-2 font-black uppercase transition-colors"
                            >
                              ✕ Batalkan
                            </button>
                          </div>
                        </div>
                        <span className="font-black text-red-700 italic">
                          Rp {(item.harga * item.quantity).toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                    
                    <div className="mt-10 pt-8 border-t-2 border-dashed border-gray-100">
                      <div className="flex justify-between items-center text-black">
                        <div>
                          <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Total Pembayaran</p>
                          <p className="text-3xl font-black text-red-700 italic">Rp {totalPrice.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SISI KANAN: Form Pengiriman */}
            <div className="lg:col-span-5">
              <form onSubmit={handleOrder} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
                <h2 className="text-xl font-black text-black uppercase tracking-widest mb-8 flex items-center gap-3">
                  <span className="bg-yellow-400 text-red-900 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">02</span>
                  Data Pengiriman
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2 mb-1 block">Kota Tujuan</label>
                    <input 
                      type="text" placeholder="Contoh: Medan" required
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-700 text-black font-medium transition-all"
                      onChange={(e) => setAddress({...address, kota: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2 mb-1 block">Alamat Lengkap</label>
                    <textarea 
                      placeholder="Nama Jalan, No. Rumah, RT/RW" required
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-700 text-black font-medium h-32 resize-none transition-all"
                      onChange={(e) => setAddress({...address, alamat: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-2 mb-1 block">Instruksi Khusus (Opsional)</label>
                    <input 
                      type="text" placeholder="Contoh: Titip di satpam"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-700 text-black font-medium transition-all"
                      onChange={(e) => setAddress({...address, catatan: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 text-center italic">
                    Keamanan Terjamin oleh Midtrans
                  </p>
                  <button 
                    type="submit" disabled={loading || cart.length === 0}
                    className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl active:scale-95 ${
                      loading || cart.length === 0 
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                      : "bg-red-700 text-white hover:bg-black shadow-red-700/30"
                    }`}
                  >
                    {loading ? "PROSES TRANSAKSI..." : "KONFIRMASI & BAYAR"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}