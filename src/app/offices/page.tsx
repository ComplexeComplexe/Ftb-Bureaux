'use client';

import { useState } from 'react';
import OfficeCard from '@/components/office/OfficeCard';
import Header from '@/components/office/Header';
import BottomNav from '@/components/layout/BottomNav';
import FloatingFilterButton from '@/components/office/FloatingFilterButton';
import FilterModal from '@/components/office/FilterModal';
import { useOfficeFilters } from '@/hooks/useOfficeFilters';

// Interface simplifiée pour les données mock
interface Office {
  id: string;
  title: string;
  neighborhood: string;
  price: number;
  imageUrl: string;
  createdAt?: string;
  rating?: number;
  popularity?: number;
  officeType?: 'shared' | 'private';
  amenities?: string[];
  availableFrom?: string;
}

// Données mock pour les bureaux avec la nouvelle interface
const mockOffices: Office[] = [
  {
    id: '1',
    title: 'Tech Hub Barcelona',
    neighborhood: 'Gràcia',
    price: 250,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkymoCDZSfKDXoOLfpH-SF5xL4ow_P0m-G0DuACY7KVNm5LVwaotWQp_jJ9kvUZ7pK2qIz26b96_J-USBDBbrf0qzVMWImLoXRPH1OUIvNCi5g3_xb1DGc8DkSb5YRvy4_DRNdzPUwJ7k_RkzsKdbwjSkwSz-nzQIR1boHlaBCNLm9P-2rw74RYceRR_YGUnjwWb3DcMN8_6RxWHX8GUIknqEFqB4vRmQIBwSVCTlwF9hmY7xZDRAnc5-wfbOsK12GGDoRAVh43yM',
    createdAt: '2024-12-01',
    rating: 4.8,
    popularity: 95,
    officeType: 'shared',
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
    officeType: 'private',
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
    officeType: 'shared',
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
    officeType: 'private',
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
    officeType: 'private',
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
    officeType: 'shared',
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
    officeType: 'shared',
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
    officeType: 'private',
    amenities: ['WiFi', 'Parking', 'Salle réunion', 'Climatisation', 'Cuisine', 'Terrasse', 'Sécurité 24h'],
    availableFrom: '2024-10-01'
  }
];

export default function OfficesPage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const {
    filters,
    advancedFilters,
    filteredOffices,
    updateFilters,
    updateAdvancedFilters,
    clearAllFilters,
    totalOffices,
    filteredCount,
    getActiveFiltersCount,
  } = useOfficeFilters(mockOffices);

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
    <div className="relative flex size-full min-h-screen flex-col justify-between group/design-root overflow-x-hidden bg-gray-50" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="flex flex-col">
        {/* Header avec filtres */}
        <Header
          totalOffices={totalOffices}
          filteredCount={filteredCount}
          onFilterChange={updateFilters}
          currentFilters={filters}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          {/* Indicateur de filtres actifs */}
          {(filters.priceSort || filters.relevanceSort || advancedFilters.neighborhoods.length > 0 || 
            advancedFilters.priceRange[0] !== 100 || advancedFilters.priceRange[1] !== 500 ||
            advancedFilters.officeType || advancedFilters.amenities.length > 0 || advancedFilters.availableFrom) ? (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-blue-600 text-sm">filter_list</span>
                  <span className="text-sm text-blue-800">
                    {filteredCount} résultat{filteredCount > 1 ? 's' : ''} trouvé{filteredCount > 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Effacer tous les filtres
                </button>
              </div>
            </div>
          ) : null}

          {/* Liste des bureaux */}
          <div className="space-y-6">
            {filteredOffices.length > 0 ? (
              filteredOffices.map((office) => (
                <OfficeCard key={office.id} office={office} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-gray-400 text-2xl">search_off</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Aucun espace ne correspond à vos critères de recherche.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-french-tech-blue"
                >
                  Effacer les filtres
                </button>
              </div>
            )}
          </div>
        </main>
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

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
