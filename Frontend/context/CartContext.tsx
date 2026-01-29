"use client";
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  // --- FUNGSI DIPERBAHARUI: MENERIMA CATATAN ---
  const addToCart = (product: any, catatan: string = "") => {
    setCart((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      
      if (isExist) {
        // Jika item sudah ada, update quantity dan timpa catatan lamanya
        return prev.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1, catatan: catatan || item.catatan } 
            : item
        );
      }
      
      // Jika item baru, masukkan ke array dengan quantity 1 dan catatan
      return [...prev, { ...product, quantity: 1, catatan }];
    });

    // Notifikasi sederhana (Bisa diganti dengan Toast nantinya)
    alert(`${product.nama} masuk ke keranjang!`);
  };

  // --- FUNGSI: MENGHAPUS ITEM DARI KERANJANG ---
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // --- FUNGSI: MENGOSONGKAN KERANJANG (SETELAH CHECKOUT) ---
  const clearCart = () => {
    setCart([]);
  };

  // Kalkulasi total harga
  const totalPrice = cart.reduce((acc, item) => acc + item.harga * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};