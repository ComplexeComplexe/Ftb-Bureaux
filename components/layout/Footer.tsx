import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-french-tech-blue rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">FT</span>
              </div>
              <h3 className="text-xl font-bold text-french-tech-blue">French Tech Barcelona</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Rejoignez la communauté French Tech de Barcelone et trouvez votre espace de travail idéal.
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Liens utiles</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/offices" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Espaces disponibles
                </Link>
              </li>
              <li>
                <Link href="/offices/create" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Poster une annonce
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-300">info@frenchtechbarcelona.com</li>
              <li className="text-gray-300">+34 123 456 789</li>
              <li className="text-gray-300">Barcelone, Espagne</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 French Tech Barcelona. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
