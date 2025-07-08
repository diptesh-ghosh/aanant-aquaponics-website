import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/auth-context';
import { CartProvider } from '@/contexts/cart-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Aanant Aquaponics Academy - Transform Your Life Through Clean Air Science',
  description: 'Learn from Dr. Peter Singh\'s 26-year research journey. Master aquaponics, achieve AQI 15, and generate ₹25,000+ monthly income. 750+ success stories.',
  keywords: 'aquaponics courses, clean air training, AQI improvement, sustainable farming education, environmental science, Delhi pollution solution',
  authors: [{ name: 'Dr. Peter Singh' }],
  openGraph: {
    title: 'Aanant Aquaponics Academy - Clean Air & Income Generation Courses',
    description: 'Master the science of clean air and sustainable income through aquaponics',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn Aquaponics - Achieve AQI 15 & Generate Income',
    description: 'Transform your health and wealth with scientifically-proven aquaponics methods',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}