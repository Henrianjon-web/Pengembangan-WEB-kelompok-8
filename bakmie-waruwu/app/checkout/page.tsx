"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState({ alamat: '', kota: '', catatan: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Keranjang belanja kosong!");
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1, // ID sementara, bisa disesuaikan dengan session
          alamat: address.alamat,
          kota: address.kota,
          catatan: address.catatan
        }),
      });

      if (res.ok) {
        alert("Pesanan BAKMIE WARUWU Berhasil Diterima! Mohon tunggu kurir kami.");
        clearCart(); // Mengosongkan keranjang setelah sukses
        router.push('/');
      } else {
        alert("Gagal menyimpan alamat pengiriman.");
      }
    } catch (err) {
      alert("Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-black">
            PROSES <span className="text-red-700">CHECKOUT</span>
          </h1>
          <div className="h-1.5 w-24 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* SISI KIRI: Ringkasan Pesanan (7 Kolom) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h2 className="text-xl font-black text-black uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs">01</span>
                Daftar Pesanan
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 font-medium mb-6">Belum ada menu yang dipilih.</p>
                  <button onClick={() => router.push('/menu')} className="bg-gray-900 text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all">
                    Lihat Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center group">
                      <div className="flex gap-6 items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-[1.5rem] overflow-hidden flex-shrink-0">
                          <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="text-black">
                          <h4 className="font-black uppercase text-sm tracking-tight">{item.nama}</h4>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.quantity} Porsi</p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] text-red-500 hover:text-red-700 mt-2 font-black uppercase tracking-tighter"
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
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Total Pembayaran</p>
                      <p className="text-3xl font-black text-red-700 italic">Rp {totalPrice.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SISI KANAN: Form Pengiriman (5 Kolom) */}
          <div className="lg:col-span-5">
            <form onSubmit={handleOrder} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-32">
              <h2 className="text-xl font-black text-black uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="bg-yellow-400 text-red-900 w-8 h-8 rounded-full flex items-center justify-center text-xs">02</span>
                Pengiriman
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Kota Tujuan</label>
                  <input 
                    type="text" placeholder="Contoh: Medan" required
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-700 text-black font-medium"
                    onChange={(e) => setAddress({...address, kota: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Alamat Lengkap</label>
                  <textarea 
                    placeholder="Nama jalan, nomor rumah, atau gedung" required
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-700 text-black font-medium h-32"
                    onChange={(e) => setAddress({...address, alamat: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Catatan Tambahan</label>
                  <input 
                    type="text" placeholder="Contoh: Pagar merah, samping laundry"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-700 text-black font-medium"
                    onChange={(e) => setAddress({...address, catatan: e.target.value})}
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4">Metode Pembayaran</h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer border-2 border-red-700 bg-red-50 p-4 rounded-2xl text-center block">
                    <input type="radio" name="pay" defaultChecked className="hidden" />
                    <span className="font-black text-red-700 text-[10px] uppercase">Transfer</span>
                  </label>
                  <label className="cursor-pointer border-2 border-gray-100 p-4 rounded-2xl text-center block hover:bg-gray-50 transition-all">
                    <input type="radio" name="pay" className="hidden" />
                    <span className="font-black text-gray-400 text-[10px] uppercase">COD</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" disabled={loading || cart.length === 0}
                className={`w-full mt-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl active:scale-95 ${
                  loading || cart.length === 0 
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                  : "bg-red-700 text-white hover:bg-black shadow-red-700/30"
                }`}
              >
                {loading ? "PROSES..." : "KONFIRMASI PESANAN"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}