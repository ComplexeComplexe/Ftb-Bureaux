export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Design System - French Tech Barcelona</h1>
        
        {/* Couleurs French Tech */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Couleurs French Tech</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* French Tech Blue */}
            <div>
              <h3 className="text-lg font-semibold mb-4">French Tech Blue (#000091)</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-french-tech-blue rounded-lg"></div>
                  <div>
                    <p className="font-medium">bg-french-tech-blue</p>
                    <p className="text-sm text-gray-600">#000091</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 border-2 border-french-tech-blue rounded-lg"></div>
                  <div>
                    <p className="font-medium">border-french-tech-blue</p>
                    <p className="text-sm text-gray-600">#000091</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <span className="text-french-tech-blue text-lg font-bold">Aa</span>
                  </div>
                  <div>
                    <p className="font-medium">text-french-tech-blue</p>
                    <p className="text-sm text-gray-600">#000091</p>
                  </div>
                </div>
              </div>
            </div>

            {/* French Tech Red */}
            <div>
              <h3 className="text-lg font-semibold mb-4">French Tech Red (#E1000F)</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-french-tech-red rounded-lg"></div>
                  <div>
                    <p className="font-medium">bg-french-tech-red</p>
                    <p className="text-sm text-gray-600">#E1000F</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 border-2 border-french-tech-red rounded-lg"></div>
                  <div>
                    <p className="font-medium">border-french-tech-red</p>
                    <p className="text-sm text-gray-600">#E1000F</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <span className="text-french-tech-red text-lg font-bold">Aa</span>
                  </div>
                  <div>
                    <p className="font-medium">text-french-tech-red</p>
                    <p className="text-sm text-gray-600">#E1000F</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Polices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Polices</h2>
          
          <div className="space-y-6">
            {/* Manrope */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Manrope</h3>
              <div className="space-y-2">
                <p className="font-manrope font-normal text-xl">Manrope Normal (400) - The quick brown fox jumps over the lazy dog</p>
                <p className="font-manrope font-medium text-xl">Manrope Medium (500) - The quick brown fox jumps over the lazy dog</p>
                <p className="font-manrope font-bold text-xl">Manrope Bold (700) - The quick brown fox jumps over the lazy dog</p>
                <p className="font-manrope font-extrabold text-xl">Manrope Extra Bold (800) - The quick brown fox jumps over the lazy dog</p>
              </div>
            </div>

            {/* Noto Sans */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Noto Sans</h3>
              <div className="space-y-2">
                <p className="font-noto-sans font-normal text-xl">Noto Sans Normal (400) - The quick brown fox jumps over the lazy dog</p>
                <p className="font-noto-sans font-medium text-xl">Noto Sans Medium (500) - The quick brown fox jumps over the lazy dog</p>
                <p className="font-noto-sans font-bold text-xl">Noto Sans Bold (700) - The quick brown fox jumps over the lazy dog</p>
                <p className="font-noto-sans font-black text-xl">Noto Sans Black (900) - The quick brown fox jumps over the lazy dog</p>
              </div>
            </div>
          </div>
        </section>

        {/* Boutons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Boutons</h2>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button className="btn-french-tech-blue">Bouton French Tech Blue</button>
              <button className="btn-french-tech-red">Bouton French Tech Red</button>
              <button className="btn-primary">Bouton Primary</button>
              <button className="btn-secondary">Bouton Secondary</button>
              <button className="btn-outline">Bouton Outline</button>
            </div>
          </div>
        </section>

        {/* Liens */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Liens</h2>
          
          <div className="space-y-4">
            <a href="#" className="link-french-tech-blue block">Lien French Tech Blue</a>
            <a href="#" className="link-french-tech-red block">Lien French Tech Red</a>
            <a href="#" className="link-primary block">Lien Primary</a>
            <a href="#" className="link-secondary block">Lien Secondary</a>
          </div>
        </section>

        {/* Container Queries Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Container Queries</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="@container">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="@lg:text-xl @md:text-lg text-base font-bold text-gray-900 mb-2">
                  Container Query Card
                </h3>
                <p className="@lg:text-base @md:text-sm text-xs text-gray-600">
                  Cette carte s'adapte à la taille de son conteneur grâce aux container queries.
                </p>
                <button className="@lg:px-4 @lg:py-2 @md:px-3 @md:py-1 px-2 py-1 mt-4 bg-french-tech-blue text-white rounded text-sm">
                  Bouton adaptatif
                </button>
              </div>
            </div>
            
            <div className="@container">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="@lg:text-xl @md:text-lg text-base font-bold text-gray-900 mb-2">
                  Responsive Design
                </h3>
                <p className="@lg:text-base @md:text-sm text-xs text-gray-600">
                  Les container queries permettent un design plus flexible que les media queries.
                </p>
                <button className="@lg:px-4 @lg:py-2 @md:px-3 @md:py-1 px-2 py-1 mt-4 bg-french-tech-red text-white rounded text-sm">
                  Bouton adaptatif
                </button>
              </div>
            </div>
            
            <div className="@container">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="@lg:text-xl @md:text-lg text-base font-bold text-gray-900 mb-2">
                  French Tech Style
                </h3>
                <p className="@lg:text-base @md:text-sm text-xs text-gray-600">
                  Utilisation des couleurs French Tech avec les container queries.
                </p>
                <button className="@lg:px-4 @lg:py-2 @md:px-3 @md:py-1 px-2 py-1 mt-4 bg-french-tech-blue text-white rounded text-sm">
                  Bouton adaptatif
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
