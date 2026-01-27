"use client";
import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 border border-red-700 text-red-700 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-4">
            Our Legacy
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
            Cerita <span className="text-red-700">Waruwu</span>
          </h1>
          <div className="h-1.5 w-32 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative group">
            <div className="absolute -inset-4 bg-yellow-400/20 rounded-[3rem] blur-2xl group-hover:bg-red-700/10 transition-colors duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop" 
              alt="Sejarah Bakmie Waruwu" 
              className="relative rounded-[3rem] shadow-2xl object-cover h-[500px] w-full transform -rotate-2 group-hover:rotate-0 transition-transform duration-700"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-black leading-none uppercase tracking-tighter text-gray-900">
              Lebih dari <br/><span className="text-red-700 underline decoration-yellow-400">Sekadar Mie</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Dimulai dari sebuah dapur kecil di sudut kota pada tahun 2017-an, **Bakmie Waruwu** lahir dari kecintaan keluarga kami terhadap hidangan mi autentik. Kami percaya bahwa mi yang sempurna dimulai dari dedikasi.
            </p>
            <p className="text-gray-600 leading-relaxed italic">
              "Resep kami tidak tertulis di atas kertas, melainkan diwariskan melalui rasa dan perasaan di setiap mangkuknya."
            </p>
            <div className="pt-6 grid grid-cols-2 gap-8 border-t border-gray-100">
              <div>
                <p className="text-3xl font-black text-red-700 italic">40+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tahun Tradisi</p>
              </div>
              <div>
                <p className="text-3xl font-black text-yellow-500 italic">100%</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bahan Alami</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="bg-gray-950 text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/20 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-4xl">🍜</div>
              <h3 className="text-xl font-black uppercase text-yellow-400">Kualitas Mie</h3>
              <p className="text-gray-400 text-sm leading-loose">
                Mie kami dibuat segar setiap hari tanpa bahan pengawet, menggunakan tepung protein tinggi pilihan.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🍗</div>
              <h3 className="text-xl font-black uppercase text-yellow-400">Ayam Kampung</h3>
              <p className="text-gray-400 text-sm leading-loose">
                Hanya menggunakan ayam kampung pilihan untuk menghasilkan kaldu yang gurih dan daging yang lembut.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🏠</div>
              <h3 className="text-xl font-black uppercase text-yellow-400">Rasa Rumah</h3>
              <p className="text-gray-400 text-sm leading-loose">
                Setiap suapan dirancang untuk membawa Anda kembali ke hangatnya meja makan keluarga.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-black uppercase mb-8">Siap Mencicipi <span className="text-red-700 italic">Legenda</span>?</h2>
          <a 
            href="/#menu" 
            className="inline-block bg-red-700 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-yellow-400 hover:text-red-900 transition-all shadow-2xl active:scale-95"
          >
            Pesan Sekarang
          </a>
        </div>

      </div>
    </main>
  );
}