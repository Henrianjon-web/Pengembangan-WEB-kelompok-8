"use client";
import React from 'react';
import { MessageCircle, Instagram, MapPin, Clock, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-950 text-white pt-24 pb-12 rounded-t-[4rem] md:rounded-t-[6rem] shadow-2xl-top">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-white/10 pb-16">
        
        {/* Kolom 1: Brand & Moto */}
        <div className="space-y-6">
          <h2 className="text-4xl font-black tracking-tighter text-yellow-400 italic uppercase">
            WARUWU.
          </h2>
          <p className="text-gray-400 text-sm leading-loose max-w-sm">
            Menyajikan kebahagiaan dalam semangkuk bakmie sejak dulu. Kami menggunakan bahan segar dan bumbu pilihan untuk menciptakan rasa yang tiada tandingan.
          </p>
          <div className="flex gap-4">
             <div className="p-3 bg-white/5 rounded-full text-red-600"><Award size={20} /></div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2">Certified Authentic Taste</p>
          </div>
        </div>

        {/* Kolom 2: Lokasi & Maps */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-red-600 flex items-center gap-2">
            <MapPin size={16} /> Lokasi Utama
          </h3>
          <div className="space-y-4">
            <p className="text-gray-400 text-sm font-medium hover:text-white transition-colors">
              Jl. Lembaga Permasyarakatan No. 200,<br />
              Tanjung Gusta, Medan, Indonesia
            </p>
            
            {/* Google Maps Embed */}
            <div className="w-full h-44 rounded-3xl overflow-hidden border border-white/10 shadow-2xl grayscale-[0.6] hover:grayscale-0 transition-all duration-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.933221974128!2d98.61436157594392!3d3.6028122963713024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312e816cf844dd%3A0xa64b71d9865118cb!2sLembaga%20Pemasyarakatan%20Kelas%201%20Medan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="inline-block px-4 py-2 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                <Clock size={10} /> Jam Operasional
              </p>
              <p className="text-white font-bold">17:00 — 23:00 WIB</p>
            </div>
          </div>
        </div>

        {/* Kolom 3: Kontak Sosial Media */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
            Hubungi Kami
          </h3>
          <div className="space-y-4">
            <a 
              href="https://wa.me/6283171847939" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500 transition-all duration-300">
                <MessageCircle size={24} className="text-green-500 group-hover:text-white" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">WhatsApp</p>
                <p className="text-white font-bold group-hover:text-yellow-400 transition-colors">0831-7184-7939</p>
              </div>
            </a>
            
            <a 
              href="https://instagram.com/henriannn_" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center group-hover:bg-pink-500 transition-all duration-300">
                <Instagram size={24} className="text-pink-500 group-hover:text-white" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Instagram</p>
                <p className="text-white font-bold group-hover:text-yellow-400 transition-colors">@henriannn_</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
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