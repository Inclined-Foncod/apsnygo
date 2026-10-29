import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'cyrillic-ext'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'ApsnyGO — Агрегатор жилья и отдыха в Абхазии',
  description:
    'Бронирование проверенных отелей, гостевых домов, апартаментов и коттеджей в Гагре, Пицунде, Сухуме и Новом Афоне без посредников.',
  keywords: [
    'Абхазия',
    'жилье в Абхазии',
    'Гагра',
    'Пицунда',
    'Сухум',
    'Новый Афон',
    'аренда квартир',
    'отели Абхазии',
    'ApsnyGO',
  ],
  authors: [{ name: 'ApsnyGO Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${plusJakarta.variable} ${outfit.variable}`}>
      <head>
        {/* Прямой коннект к Google Fonts для максимальной совместимости */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-stone-gray-900 font-sans flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
