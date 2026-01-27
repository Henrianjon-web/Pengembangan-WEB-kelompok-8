export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-950 text-white pt-24 pb-12 rounded-t-[4rem] md:rounded-t-[6rem] shadow-2xl-top">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-white/10 pb-16">
        
        {/* Kolom Brand */}
        <div className="space-y-6">
          <h2 className="text-4xl font-black tracking-tighter text-yellow-400 italic">
            WARUWU.
          </h2>
          <p className="text-gray-400 text-sm leading-loose max-w-sm">
            Menyajikan kebahagiaan dalam semangkuk bakmie sejak dulu. Kami menggunakan bahan segar dan bumbu pilihan untuk menciptakan rasa yang tiada tandingan di setiap helainya.
          </p>
          <div className="flex gap-4">
            <span className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">📱</span>
            <span className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">📸</span>
          </div>
        </div>

        {/* Kolom Lokasi */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
            Lokasi Utama
          </h3>
          <div className="space-y-4 text-gray-400 text-sm font-medium leading-relaxed">
            <p className="hover:text-white transition-colors">
              Jl. Lembaga Permasyarakatan No. 200,<br />
              Tanjung Gusta, Medan, Indonesia
            </p>
            <div className="inline-block px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest mb-1">Jam Operasional</p>
              <p className="text-white font-bold">10:00 — 22:00 WIB</p>
            </div>
          </div>
        </div>

        {/* Kolom Kontak */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
            Hubungi Kami
          </h3>
          <div className="space-y-4">
            <a 
              href="https://wa.me/6283171847939" 
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-red-700/10 rounded-2xl flex items-center justify-center group-hover:bg-red-700 transition-all duration-300">
                💬
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">WhatsApp</p>
                <p className="text-white font-bold group-hover:text-yellow-400 transition-colors">0831-7184-7939</p>
              </div>
            </a>
            
            <a 
              href="https://instagram.com/henriannn_" 
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-red-700/10 rounded-2xl flex items-center justify-center group-hover:bg-red-700 transition-all duration-300">
                📸
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Instagram</p>
                <p className="text-white font-bold group-hover:text-yellow-400 transition-colors">@henriannn_</p>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="container mx-auto px-6 mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
        <p>© 2026 BAKMIE WARUWU. CRAFTED WITH LOVE FOR FOODIES.</p>
        <div className="flex gap-8 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}