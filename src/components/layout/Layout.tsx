import { Inter } from 'next/font/google';
import Header from './Header';
import Footer from './Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
      <Header />
      
      {/* Main content with top padding for fixed header */}
      <main className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
