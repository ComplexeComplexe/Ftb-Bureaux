import Link from 'next/link';
import { Manrope, Noto_Sans } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-manrope',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${manrope.variable} ${notoSans.variable}`}>
      {/* Header simple avec logo */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-french-tech-blue rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">FT</span>
              </div>
              <span className="text-xl font-bold text-gray-900">French Tech Barcelona</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Contenu principal centré */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; 2024 French Tech Barcelona. Tous droits réservés.</p>
            <div className="mt-2 space-x-4">
              <Link href="/mentions-legales" className="hover:text-gray-700 transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-gray-700 transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
