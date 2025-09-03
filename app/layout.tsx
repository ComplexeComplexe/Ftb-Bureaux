import type { Metadata } from 'next';
import { Manrope, Noto_Sans } from 'next/font/google';
import './globals.css';

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
      <body className={`${manrope.variable} ${notoSans.variable} font-sans bg-gray-50 text-gray-900 antialiased`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-french-tech-blue">French Tech Barcelona</h1>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200">
                  Accueil
                </a>
                <a href="/offices" className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200">
                  Espaces
                </a>
                <a href="/offices/create" className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200">
                  Poster une annonce
                </a>
                <a href="/login" className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200">
                  Connexion
                </a>
              </nav>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-gray-700 hover:text-french-tech-blue">
                  <span className="material-symbols-outlined text-2xl">menu</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo et description */}
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-bold text-french-tech-blue mb-4">French Tech Barcelona</h3>
                <p className="text-gray-300 mb-4">
                  Rejoignez la communauté French Tech de Barcelone et trouvez votre espace de travail idéal.
                </p>
              </div>

              {/* Liens utiles */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
                <ul className="space-y-2">
                  <li><a href="/offices" className="text-gray-300 hover:text-white transition-colors duration-200">Espaces disponibles</a></li>
                  <li><a href="/offices/create" className="text-gray-300 hover:text-white transition-colors duration-200">Poster une annonce</a></li>
                  <li><a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">À propos</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-gray-300">info@frenchtechbarcelona.com</li>
                  <li className="text-gray-300">+34 123 456 789</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 French Tech Barcelona. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
