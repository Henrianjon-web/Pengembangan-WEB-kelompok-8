"use client";
import React from 'react';
import { Star, Award, Utensils, Heart } from "lucide-react";

export default function AboutPage() {
  // PILIHAN GAMBAR:
  // 1. Bakmie Premium (Dark Mood): https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1200&auto=format&fit=crop
  // 2. Bakmie Tradisional: https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop

  return (
    <main className="min-h-screen bg-white">
      {/* --- HERO ABOUT --- */}
      <section className="pt-32 pb-20 px-6 bg-gray-50 text-black">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-1 border border-red-700 text-red-700 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-6">
            Our Story
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic">
            KUALITAS <span className="text-red-700">WARISAN</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-lg font-medium leading-relaxed">
            Menjaga cita rasa autentik Bakmie Waruwu sejak generasi pertama dengan dedikasi penuh pada bahan baku alami dan proses pembuatan manual.
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-24 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          {/* Gambar Baru: Fokus pada Kelezatan Produk Bakmie */}
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-700 group">
            {/* Overlay gradasi halus agar gambar lebih 'pop' */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1200&auto=format&fit=crop" 
              alt="Delicious Bakmie Waruwu Signature" 
              className="w-full h-[600px] object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            
            {/* Label Badge Melayang di atas Gambar */}
            <div className="absolute bottom-8 right-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-red-700 font-black italic text-xl">Rasa yang Tak Terlupakan.</p>
            </div>
          </div>
          
          <div className="space-y-10 text-black">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-tight">
                Misi Kami: <br/>
                <span className="text-red-700">Cita Rasa Tanpa Kompromi</span>
              </h2>
              <p className="text-gray-600 leading-relaxed italic border-l-4 border-yellow-400 pl-4">
                Bukan hanya sekadar mengenyangkan, tapi memberikan kebahagiaan di setiap mangkuknya melalui proses yang jujur.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6 items-center group">
                <div className="w-14 h-14 bg-red-700 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform shadow-lg shadow-red-700/20">
                  <Utensils size={24} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm tracking-widest">Resep Otentik</h4>
                  <p className="text-gray-500 text-[10px] font-bold uppercase">Tanpa bahan kimia dan pengawet buatan.</p>
                </div>
              </div>

              <div className="flex gap-6 items-center group">
                <div className="w-14 h-14 bg-yellow-400 text-red-900 rounded-2xl flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform shadow-lg shadow-yellow-400/20">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm tracking-widest">Pelayanan Hati</h4>
                  <p className="text-gray-500 text-[10px] font-bold uppercase">Setiap pelanggan adalah bagian dari keluarga Waruwu.</p>
                </div>
              </div>

              <div className="flex gap-6 items-center group">
                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform shadow-lg shadow-black/20">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm tracking-widest">Bahan Premium</h4>
                  <p className="text-gray-500 text-[10px] font-bold uppercase">Menggunakan tepung dan bumbu kualitas terbaik.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}