import { useState, useMemo } from 'react';

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

interface FilterState {
  priceSort: 'asc' | 'desc' | 'under200' | '200-300' | 'over300' | null;
  relevanceSort: 'recent' | 'rated' | 'popular' | null;
}

interface AdvancedFilters {
  neighborhoods: string[];
  priceRange: [number, number];
  officeType: 'shared' | 'private' | null;
  amenities: string[];
  availableFrom: Date | null;
}

export function useOfficeFilters(offices: Office[]) {
  const [filters, setFilters] = useState<FilterState>({
    priceSort: null,
    relevanceSort: null,
  });

  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    neighborhoods: [],
    priceRange: [100, 500],
    officeType: null,
    amenities: [],
    availableFrom: null,
  });

  const filteredAndSortedOffices = useMemo(() => {
    let result = [...offices];

    // Appliquer les filtres avancés
    if (advancedFilters.neighborhoods.length > 0) {
      result = result.filter(office => 
        advancedFilters.neighborhoods.includes(office.neighborhood)
      );
    }

    if (advancedFilters.priceRange[0] !== 100 || advancedFilters.priceRange[1] !== 500) {
      result = result.filter(office => 
        office.price >= advancedFilters.priceRange[0] && 
        office.price <= advancedFilters.priceRange[1]
      );
    }

    if (advancedFilters.officeType) {
      result = result.filter(office => 
        office.officeType === advancedFilters.officeType
      );
    }

    if (advancedFilters.amenities.length > 0) {
      result = result.filter(office => 
        advancedFilters.amenities.every(amenity => 
          office.amenities?.includes(amenity)
        )
      );
    }

    if (advancedFilters.availableFrom) {
      result = result.filter(office => {
        if (!office.availableFrom) return false;
        const officeDate = new Date(office.availableFrom);
        return officeDate >= advancedFilters.availableFrom!;
      });
    }

    // Appliquer les filtres de tri
    if (filters.priceSort) {
      switch (filters.priceSort) {
        case 'asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'under200':
          result = result.filter(office => office.price < 200);
          break;
        case '200-300':
          result = result.filter(office => office.price >= 200 && office.price <= 300);
          break;
        case 'over300':
          result = result.filter(office => office.price > 300);
          break;
      }
    }

    if (filters.relevanceSort) {
      switch (filters.relevanceSort) {
        case 'recent':
          result.sort((a, b) => {
            const dateA = new Date(a.createdAt || '2024-01-01').getTime();
            const dateB = new Date(b.createdAt || '2024-01-01').getTime();
            return dateB - dateA;
          });
          break;
        case 'rated':
          result.sort((a, b) => {
            const ratingA = a.rating || 0;
            const ratingB = b.rating || 0;
            return ratingB - ratingA;
          });
          break;
        case 'popular':
          result.sort((a, b) => {
            const popularityA = a.popularity || 0;
            const popularityB = b.popularity || 0;
            return popularityB - popularityA;
          });
          break;
      }
    }

    return result;
  }, [offices, filters, advancedFilters]);

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const updateAdvancedFilters = (newAdvancedFilters: AdvancedFilters) => {
    setAdvancedFilters(newAdvancedFilters);
  };

  const clearFilters = () => {
    setFilters({
      priceSort: null,
      relevanceSort: null,
    });
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      neighborhoods: [],
      priceRange: [100, 500],
      officeType: null,
      amenities: [],
      availableFrom: null,
    });
  };

  const clearAllFilters = () => {
    clearFilters();
    clearAdvancedFilters();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priceSort) count++;
    if (filters.relevanceSort) count++;
    if (advancedFilters.neighborhoods.length > 0) count++;
    if (advancedFilters.priceRange[0] !== 100 || advancedFilters.priceRange[1] !== 500) count++;
    if (advancedFilters.officeType) count++;
    if (advancedFilters.amenities.length > 0) count++;
    if (advancedFilters.availableFrom) count++;
    return count;
  };

  const hasActiveAdvancedFilters = () => {
    return (
      advancedFilters.neighborhoods.length > 0 ||
      advancedFilters.priceRange[0] !== 100 ||
      advancedFilters.priceRange[1] !== 500 ||
      advancedFilters.officeType !== null ||
      advancedFilters.amenities.length > 0 ||
      advancedFilters.availableFrom !== null
    );
  };

  return {
    filters,
    advancedFilters,
    filteredOffices: filteredAndSortedOffices,
    updateFilters,
    updateAdvancedFilters,
    clearFilters,
    clearAdvancedFilters,
    clearAllFilters,
    getActiveFiltersCount,
    hasActiveAdvancedFilters,
    totalOffices: offices.length,
    filteredCount: filteredAndSortedOffices.length,
  };
}
