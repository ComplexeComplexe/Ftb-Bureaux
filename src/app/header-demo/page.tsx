'use client';

import { useState } from 'react';
import Header from '@/components/office/Header';
import { useOfficeFilters } from '@/hooks/useOfficeFilters';

// Données de test pour le composant Header
const demoOffices = [
  {
    id: '1',
    title: 'Tech Hub Barcelona',
    neighborhood: 'Gràcia',
    price: 250,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkymoCDZSfKDXoOLfpH-SF5xL4ow_P0m-G0DuACY7KVNm5LVwaotWQp_jJ9kvUZ7pK2qIz26b96_J-USBDBbrf0qzVMWImLoXRPH1OUIvNCi5g3_xb1DGc8DkSb5YRvy4_DRNdzPUwJ7k_RkzsKdbwjSkwSz-nzQIR1boHlaBCNLm9P-2rw74RYceRR_YGUnjwWb3DcMN8_6RxWHX8GUIknqEFqB4vRmQIBwSVCTlwF9hmY7xZDRAnc5-wfbOsK12GGDoRAVh43yM',
    createdAt: '2024-12-01',
    rating: 4.8,
    popularity: 95
  },
  {
    id: '2',
    title: 'Innovation Center',
    neighborhood: 'Eixample',
    price: 300,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCorAg_zr3eA9BCZIbWRoDAneMChZJfSVbtW1KWFO-lXRKpkT7RGAuXH1vcYf_cwjf1sIJP_n_YdGBa6920MZpnKxW2AnB5LJyT9V1NId_cFrbUyeJbb1v2asJ3T9yQ7mrWRYPWPda2TXF0RA2WO-b09rTtbq6nNoCrs_cWU2xwYWER3M0420seuXgHbRMNjJXG5Ao7Z8Xle1OgfDRgSXq3pTMBQY2YI-IwJiB1JauOJBgpQU8NmjXAOlMb7LiQVNBB4jTOH3vKBhE',
    createdAt: '2024-11-15',
    rating: 4.6,
    popularity: 87
  },
  {
    id: '3',
    title: 'Startup Garage',
    neighborhood: 'Poblenou',
    price: 200,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGo3VUNY8ETKqXc74B45mqKueWAGiBYJcrmQ05KldW9OoMgABmOQXHs5rUENImKadzB7gHkVD4Mu-xMl3ckwKEXQpuwmHLgPBxtoJvKb79mpYE0N5zDCFHBO5q_oYLcU0wjom5LWdM0IjKSv3U01u_UzfBpWgP53yIfY7sHGVHrvnfghIT9DBOZM-ZQYfwu-7gAxX6xK0Eo4qroCScdui6ijsXu1Y68nkX5w4_OAVJPePsOWWxpbX1D0LUZht7VAXaiylveYQuLOk',
    createdAt: '2024-12-05',
    rating: 4.9,
    popularity: 92
  },
  {
    id: '4',
    title: 'Digital Nomad Nest',
    neighborhood: 'Gothic Quarter',
    price: 280,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgwzxyglzwpZxceMDAO5eTBjhDMrNkQieitoPyYZcEBZgmPec38K9J_ZlhtBILevqpvmkQE4XZfWImnWy5HhKcuukucR0BZF6jQdvtxSCsyumgY7HFJFj5HDahJLBi6TGrz7Hqyj2X7v3rdplMZhe5XTvwFBWi13ZGG0F4kNslKxHNiyGGnKRbZzwD2YMnGW3epkLILDkwYsR4pz-Eo',
    createdAt: '2024-11-20',
    rating: 4.7,
    popularity: 89
  },
  {
    id: '5',
    title: 'Premium Office Space',
    neighborhood: 'Sant Antoni',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    createdAt: '2024-10-10',
    rating: 4.5,
    popularity: 78
  },
  {
    id: '6',
    title: 'Cozy Workspace',
    neighborhood: 'Born',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    createdAt: '2024-12-10',
    rating: 4.4,
    popularity: 82
  },
  {
    id: '7',
    title: 'Budget Office',
    neighborhood: 'Sants',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    createdAt: '2024-11-25',
    rating: 4.2,
    popularity: 75
  },
  {
    id: '8',
    title: 'Luxury Suite',
    neighborhood: 'Sarrià',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    createdAt: '2024-09-15',
    rating: 4.9,
    popularity: 96
  }
];

export default function HeaderDemoPage() {
  const {
    filters,
    filteredOffices,
    updateFilters,
    clearFilters,
    totalOffices,
    filteredCount,
  } = useOfficeFilters(demoOffices);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec filtres */}
      <Header
        totalOffices={totalOffices}
        filteredCount={filteredCount}
        onFilterChange={updateFilters}
        currentFilters={filters}
      />

      {/* Contenu de démonstration */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Header Component Demo</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informations sur les filtres */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Fonctionnalités du Header</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Bouton retour fonctionnel (router.back())
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Compteur d'espaces dynamique
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Dropdown Prix avec 5 options
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Dropdown Pertinence avec 3 options
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Animation des dropdowns
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Indicateur visuel des filtres actifs
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Fermeture avec clic extérieur et Échap
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">État actuel des filtres</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Filtre Prix:</span>
                    <span className="font-medium">
                      {filters.priceSort ? filters.priceSort : 'Aucun'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Filtre Pertinence:</span>
                    <span className="font-medium">
                      {filters.relevanceSort ? filters.relevanceSort : 'Aucun'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Résultats:</span>
                    <span className="font-medium text-french-tech-blue">
                      {filteredCount} / {totalOffices}
                    </span>
                  </div>
                </div>
                {filters.priceSort || filters.relevanceSort ? (
                  <button
                    onClick={clearFilters}
                    className="mt-4 w-full btn-french-tech-red"
                  >
                    Effacer tous les filtres
                  </button>
                ) : null}
              </div>
            </div>

            {/* Options de filtres disponibles */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Options de filtres Prix</h2>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Trier par prix</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>• Croissant (asc)</div>
                      <div>• Décroissant (desc)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Filtrer par gamme</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>• Moins de 200€ (under200)</div>
                      <div>• 200€ - 300€ (200-300)</div>
                      <div>• Plus de 300€ (over300)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Options de filtres Pertinence</h2>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• Plus récent (recent)</div>
                  <div>• Mieux noté (rated)</div>
                  <div>• Plus populaire (popular)</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Données de test</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• 8 bureaux avec prix variés (150€ - 1200€)</div>
                  <div>• Dates de création différentes</div>
                  <div>• Notes et popularité variées</div>
                  <div>• Testez les filtres pour voir les résultats</div>
                </div>
              </div>
            </div>
          </div>

          {/* Résultats filtrés */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Résultats filtrés ({filteredCount} bureaux)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOffices.map((office) => (
                <div key={office.id} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{office.title}</h3>
                  <p className="text-sm text-gray-600">{office.neighborhood}</p>
                  <p className="text-french-tech-blue font-medium">{office.price}€ / mois</p>
                  <div className="text-xs text-gray-500 mt-1">
                    Note: {office.rating} • Popularité: {office.popularity}
                  </div>
                </div>
              ))}
            </div>
            {filteredOffices.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun résultat trouvé avec les filtres actuels
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
