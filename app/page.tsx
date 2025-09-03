export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-french-tech-blue to-french-tech-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Trouvez votre espace de travail idéal à Barcelone
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Rejoignez la communauté French Tech Barcelona et découvrez des bureaux exceptionnels
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher par quartier, type de bureau..."
                className="w-full px-6 py-4 text-gray-900 rounded-xl text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
              />
              <button className="absolute right-2 top-2 bg-french-tech-red text-white p-2 rounded-lg hover:bg-french-tech-red-600 transition-colors duration-200">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/offices" className="btn-primary text-lg px-8 py-4">
              Chercher un espace
            </a>
            <a href="/offices/create" className="btn-secondary text-lg px-8 py-4">
              Poster une annonce
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-french-tech-blue mb-2">24</div>
              <div className="text-gray-600">Espaces disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-french-tech-blue mb-2">156</div>
              <div className="text-gray-600">Entreprises membres</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-french-tech-blue mb-2">8</div>
              <div className="text-gray-600">Quartiers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-french-tech-blue mb-2">98%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Derniers Espaces */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Derniers espaces ajoutés
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les nouveaux espaces de travail disponibles dans la communauté French Tech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Office Card 1 */}
            <div className="card-hover">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bureau partagé Gràcia</h3>
              <p className="text-gray-600 mb-3">Espace moderne avec vue sur la ville</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-french-tech-blue">450€</span>
                <span className="text-sm text-gray-500">/mois</span>
              </div>
            </div>

            {/* Office Card 2 */}
            <div className="card-hover">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bureau privé Eixample</h3>
              <p className="text-gray-600 mb-3">Bureau fermé avec équipements complets</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-french-tech-blue">750€</span>
                <span className="text-sm text-gray-500">/mois</span>
              </div>
            </div>

            {/* Office Card 3 */}
            <div className="card-hover">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Espace Poblenou</h3>
              <p className="text-gray-600 mb-3">Coworking dans un quartier innovant</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-french-tech-blue">380€</span>
                <span className="text-sm text-gray-500">/mois</span>
              </div>
            </div>

            {/* Office Card 4 */}
            <div className="card-hover">
              <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bureau Gothic Quarter</h3>
              <p className="text-gray-600 mb-3">Charme historique au cœur de Barcelone</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-french-tech-blue">620€</span>
                <span className="text-sm text-gray-500">/mois</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="/offices" className="btn-primary text-lg px-8 py-4">
              Voir tous les espaces
            </a>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de nos membres French Tech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Témoignage 1 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Marie Dubois</h3>
              <p className="text-gray-600 mb-3">CEO, TechStart Barcelona</p>
              <p className="text-gray-700 italic">
                "Grâce à French Tech Barcelona, j'ai trouvé l'espace parfait pour développer mon entreprise. La communauté est incroyable !"
              </p>
            </div>

            {/* Témoignage 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Thomas Martin</h3>
              <p className="text-gray-600 mb-3">CTO, InnovationLab</p>
              <p className="text-gray-700 italic">
                "Un réseau professionnel exceptionnel et des espaces de travail de qualité. Je recommande vivement !"
              </p>
            </div>

            {/* Témoignage 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sophie Bernard</h3>
              <p className="text-gray-600 mb-3">Founder, GreenTech Solutions</p>
              <p className="text-gray-700 italic">
                "L'écosystème French Tech de Barcelone est unique. J'ai rencontré des partenaires incroyables ici."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-french-tech-blue to-french-tech-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à rejoindre la communauté ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez des centaines d'entrepreneurs français à Barcelone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="btn-primary text-lg px-8 py-4">
              Créer mon compte
            </a>
            <a href="/offices" className="btn-secondary text-lg px-8 py-4">
              Découvrir les espaces
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
