import type { Metadata } from 'next';
import { Manrope, Noto_Sans } from 'next/font/google';
import './globals.css';
import Layout from '@/components/layout/Layout';

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoSans = Noto_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'French Tech Barcelona Offices - Location de Bureaux',
  description: 'Plateforme de location de bureaux pour la communauté French Tech de Barcelone. Trouvez votre espace de travail idéal ou louez votre bureau disponible.',
  keywords: 'bureaux, location, French Tech, Barcelone, coworking, espaces de travail',
  authors: [{ name: 'French Tech Barcelona' }],
  openGraph: {
    title: 'French Tech Barcelona Offices',
    description: 'Plateforme de location de bureaux pour la communauté French Tech de Barcelone',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${manrope.variable} ${notoSans.variable} font-sans bg-background text-gray-900 antialiased`}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
// Force Vercel complete rebuild - Wed Sep  3 16:14:17 CEST 2025
