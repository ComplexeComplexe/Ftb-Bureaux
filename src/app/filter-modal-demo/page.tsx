'use client';

import { useState } from 'react';
import FloatingFilterButton from '@/components/office/FloatingFilterButton';
import FilterModal from '@/components/office/FilterModal';
import { useOfficeFilters } from '@/hooks/useOfficeFilters';

// Données de test pour le modal de filtres
const demoOffices = [
  {
    id: '1',
    title: 'Tech Hub Barcelona',
    neighborhood: 'Gràcia',
    price: 250,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkymoCDZSfKDXoOLfpH-SF5xL4ow_P0m-G0DuACY7KVNm5LVwaotWQp_jJ9kvUZ7pK2qIz26b96_J-USBDBbrf0qzVMWImLoXRPH1OUIvNCi5g3_xb1DGc8DkSb5YRvy4_DRNdzPUwJ7k_RkzsKdbwjSkwSz-nzQIR1boHlaBCNLm9P-2rw74RYceRR_YGUnjwWb3DcMN8_6RxWHX8GUIknqEFqB4vRmQIBwSVCTlwF9hmY7xZDRAnc5-wfbOsK12GGDoRAVh43yM',
    createdAt: '2024-12-01',
    rating: 4.8,
    popularity: 95,
    officeType: 'shared' as const,
    amenities: ['WiFi', 'Climatisation', 'Salle réunion'],
    availableFrom: '2024-12-15'
  },
  {
    id: '2',
    title: 'Innovation Center',
    neighborhood: 'Eixample',
    price: 300,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCorAg_zr3eA9BCZIbWRoDAneMChZJfSVbtW1KWFO-lXRKpkT7RGAuXH1vcYf_cwjf1sIJP_n_YdGBa6920MZpnKxW2AnB5LJyT9V1NId_cFrbUyeJbb1v2asJ3T9yQ7mrWRYPWPda2TXF0RA2WO-b09rTtbq6nNoCrs_cWU2xwYWER3M0420seuXgHbRMNjJXG5Ao7Z8Xle1OgfDRgSXq3pTMBQY2YI-IwJiB1JauOJBgpQU8NmjXAOlMb7LiQVNBB4jTOH3vKBhE',
    createdAt: '2024-11-15',
    rating: 4.6,
    popularity: 87,
    officeType: 'private' as const,
    amenities: ['WiFi', 'Parking', 'Climatisation'],
    availableFrom: '2024-12-01'
  },
  {
    id: '3',
    title: 'Startup Garage',
    neighborhood: 'Poblenou',
    price: 200,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGo3VUNY8ETKqXc74B45mqKueWAGiBYJcrmQ05KldW9OoMgABmOQXHs5rUENImKadzB7gHkVD4Mu-xMl3ckwKEXQpuwmHLgPBxtoJvKb79mpYE0N5zDCFHBO5q_oYLcU0wjom5LWdM0IjKSv3U01u_UzfBpWgP53yIfY7sHGVHrvnfghIT9DBOZM-ZQYfwu-7gAxX6xK0Eo4qroCScdui6ijsXu1Y68nkX5w4_OAVJPePsOWWxpbX1D0LUZht7VAXaiylveYQuLOk',
    createdAt: '2024-12-05',
    rating: 4.9,
    popularity: 92,
    officeType: 'shared' as const,
    amenities: ['WiFi', 'Cuisine', 'Terrasse'],
    availableFrom: '2024-12-20'
  },
  {
    id: '4',
    title: 'Digital Nomad Nest',
    neighborhood: 'Gothic Quarter',
    price: 280,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgwzxyglzwpZxceMDAO5eTBjhDMrNkQieitoPyYZcEBZgmPec38K9J_ZlhtBILevqpvmkQE4XZfWImnWy5HhKcuukucR0BZF6jQdvtxSCsyumgY7HFJFj5HDahJLBi6TGrz7Hqyj2X7v3rdplMZhe5XTvwFBWi13ZGG0F4kNslKxHNiyGGnKRbZzwD2YMnGW3epkLILDkwYsR4pz-Eo',
    createdAt: '2024-11-20',
    rating: 4.7,
    popularity: 89,
    officeType: 'private' as const,
    amenities: ['WiFi', 'Terrasse', 'Sécurité 24h'],
    availableFrom: '2024-12-10'
  },
  {
    id: '5',
    title: 'Premium Office Space',
    neighborhood: 'Sant Antoni',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    createdAt: '2024-10-10',
    rating: 4.5,
    popularity: 78,
    officeType: 'private' as const,
    amenities: ['WiFi', 'Parking', 'Salle réunion', 'Climatisation', 'Cuisine'],
    availableFrom: '2024-11-01'
  },
  {
    id: '6',
    title: 'Cozy Workspace',
    neighborhood: 'Born',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    createdAt: '2024-12-10',
    rating: 4.4,
    popularity: 82,
    officeType: 'shared' as const,
    amenities: ['WiFi', 'Climatisation', 'Cuisine'],
    availableFrom: '2024-12-25'
  },
  {
    id: '7',
    title: 'Budget Office',
    neighborhood: 'Sants',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    createdAt: '2024-11-25',
    rating: 4.2,
    popularity: 75,
    officeType: 'shared' as const,
    amenities: ['WiFi'],
    availableFrom: '2024-12-05'
  },
  {
    id: '8',
    title: 'Luxury Suite',
    neighborhood: 'Sarrià',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    createdAt: '2024-09-15',
    rating: 4.9,
    popularity: 96,
    officeType: 'private' as const,
    amenities: ['WiFi', 'Parking', 'Salle réunion', 'Climatisation', 'Cuisine', 'Terrasse', 'Sécurité 24h'],
    availableFrom: '2024-10-01'
  }
];

export default function FilterModalDemoPage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const {
    advancedFilters,
    filteredOffices,
    updateAdvancedFilters,
    clearAllFilters,
    totalOffices,
    filteredCount,
    getActiveFiltersCount,
  } = useOfficeFilters(demoOffices);

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyAdvancedFilters = (newAdvancedFilters: any) => {
    updateAdvancedFilters(newAdvancedFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Filter Modal Demo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Informations sur le modal */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Fonctionnalités du Modal</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Modal overlay avec backdrop blur
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Slide-up animation depuis le bas
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Sections collapsibles pour chaque filtre
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Range slider pour les prix
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Checkboxes pour quartiers et équipements
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Radio buttons pour le type de bureau
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Date picker pour la disponibilité
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Fermeture avec clic extérieur et Échap
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">État des filtres avancés</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quartiers:</span>
                  <span className="font-medium">
                    {advancedFilters.neighborhoods.length > 0 
                      ? advancedFilters.neighborhoods.join(', ') 
                      : 'Tous'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix:</span>
                  <span className="font-medium">
                    {advancedFilters.priceRange[0]}€ - {advancedFilters.priceRange[1]}€
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">
                    {advancedFilters.officeType || 'Tous'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Équipements:</span>
                  <span className="font-medium">
                    {advancedFilters.amenities.length > 0 
                      ? advancedFilters.amenities.join(', ') 
                      : 'Aucun'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Disponible dès:</span>
                  <span className="font-medium">
                    {advancedFilters.availableFrom 
                      ? advancedFilters.availableFrom.toLocaleDateString('fr-FR')
                      : 'Toutes dates'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Résultats:</span>
                  <span className="font-medium text-french-tech-blue">
                    {filteredCount} / {totalOffices}
                  </span>
                </div>
              </div>
              <button
                onClick={clearAllFilters}
                className="mt-4 w-full bg-french-tech-red text-white px-4 py-2 rounded-lg hover:bg-french-tech-red-600 transition-colors"
              >
                Effacer tous les filtres
              </button>
            </div>
          </div>

          {/* Instructions et données */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p>1. Cliquez sur le bouton flottant en bas à droite</p>
                <p>2. Testez les différentes sections de filtres</p>
                <p>3. Vérifiez les animations et transitions</p>
                <p>4. Testez la fermeture avec clic extérieur ou Échap</p>
                <p>5. Observez le badge sur le bouton flottant</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Données de test</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <div><strong>Quartiers:</strong> Gràcia, Eixample, Poblenou, Gothic Quarter, Sant Antoni, Born, Sants, Sarrià</div>
                <div><strong>Prix:</strong> 150€ - 1200€</div>
                <div><strong>Types:</strong> Bureau partagé, Bureau privé</div>
                <div><strong>Équipements:</strong> WiFi, Parking, Salle réunion, Climatisation, Cuisine, Terrasse, Sécurité 24h</div>
                <div><strong>Disponibilité:</strong> Octobre 2024 - Décembre 2024</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Animations Framer Motion</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <div>• <strong>Backdrop:</strong> Fade in/out</div>
                <div>• <strong>Modal:</strong> Slide-up depuis le bas</div>
                <div>• <strong>Sections:</strong> Height animation avec opacity</div>
                <div>• <strong>Bouton flottant:</strong> Scale et hover effects</div>
                <div>• <strong>Badge:</strong> Scale animation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats filtrés */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
                  Type: {office.officeType} • Équipements: {office.amenities?.length || 0}
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

      {/* Bouton flottant de filtres */}
      <FloatingFilterButton
        onClick={handleOpenFilterModal}
        activeFiltersCount={getActiveFiltersCount()}
      />

      {/* Modal de filtres avancés */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyAdvancedFilters}
        currentFilters={advancedFilters}
        totalResults={filteredCount}
      />
    </div>
  );
}
