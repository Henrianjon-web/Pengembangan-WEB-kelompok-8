"use client";
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  // Fungsi untuk menambah item ke keranjang
  const addToCart = (product: any) => {
    setCart((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.nama} masuk ke keranjang!`);
  };

  // --- FUNGSI BARU: MENGHAPUS ITEM DARI KERANJANG ---
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // --- FUNGSI BARU: MENGOSONGKAN KERANJANG (SETELAH CHECKOUT) ---
  const clearCart = () => {
    setCart([]);
  };

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