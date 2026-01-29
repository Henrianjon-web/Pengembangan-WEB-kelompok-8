import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // Pastikan Anda sudah membuat Footer.tsx juga
import { CartProvider } from '@/context/CartContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}