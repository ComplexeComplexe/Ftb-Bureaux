'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FilterState {
  priceSort: 'asc' | 'desc' | 'under200' | '200-300' | 'over300' | null;
  relevanceSort: 'recent' | 'rated' | 'popular' | null;
}

interface HeaderProps {
  totalOffices: number;
  filteredCount: number;
  onFilterChange: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export default function Header({ 
  totalOffices, 
  filteredCount, 
  onFilterChange, 
  currentFilters 
}: HeaderProps) {
  const router = useRouter();
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [relevanceDropdownOpen, setRelevanceDropdownOpen] = useState(false);
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const relevanceDropdownRef = useRef<HTMLDivElement>(null);

  // Fermer les dropdowns quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
        setPriceDropdownOpen(false);
      }
      if (relevanceDropdownRef.current && !relevanceDropdownRef.current.contains(event.target as Node)) {
        setRelevanceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fermer les dropdowns avec la touche Échap
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPriceDropdownOpen(false);
        setRelevanceDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  const handlePriceFilter = (filter: FilterState['priceSort']) => {
    onFilterChange({
      ...currentFilters,
      priceSort: filter,
      relevanceSort: null // Réinitialiser l'autre filtre
    });
    setPriceDropdownOpen(false);
  };

  const handleRelevanceFilter = (filter: FilterState['relevanceSort']) => {
    onFilterChange({
      ...currentFilters,
      relevanceSort: filter,
      priceSort: null // Réinitialiser l'autre filtre
    });
    setRelevanceDropdownOpen(false);
  };

  const getPriceButtonText = () => {
    if (!currentFilters.priceSort) return 'Prix';
    switch (currentFilters.priceSort) {
      case 'asc': return 'Prix ↑';
      case 'desc': return 'Prix ↓';
      case 'under200': return '< 200€';
      case '200-300': return '200-300€';
      case 'over300': return '> 300€';
      default: return 'Prix';
    }
  };

  const getRelevanceButtonText = () => {
    if (!currentFilters.relevanceSort) return 'Pertinence';
    switch (currentFilters.relevanceSort) {
      case 'recent': return 'Plus récent';
      case 'rated': return 'Mieux noté';
      case 'popular': return 'Plus populaire';
      default: return 'Pertinence';
    }
  };

  const isPriceActive = currentFilters.priceSort !== null;
  const isRelevanceActive = currentFilters.relevanceSort !== null;

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      {/* Top bar with back button and title */}
      <div className="flex items-center p-4">
        <button 
          onClick={handleBackClick}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100"
          aria-label="Retour"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">Barcelone</h1>
        <div className="w-8"></div>
      </div>

      {/* Count section */}
      <div className="px-4 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {filteredCount}+ espaces
          {filteredCount !== totalOffices && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              sur {totalOffices}
            </span>
          )}
        </h2>
      </div>

      {/* Filters section */}
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex gap-2">
          {/* Price Filter Dropdown */}
          <div className="relative" ref={priceDropdownRef}>
            <button
              onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
              className={`flex items-center justify-center gap-x-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isPriceActive
                  ? 'border-french-tech-blue bg-french-tech-blue text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Filtrer par prix"
            >
              {getPriceButtonText()}
              <span className={`material-symbols-outlined text-base transition-transform duration-200 ${
                priceDropdownOpen ? 'rotate-180' : ''
              }`}>
                expand_more
              </span>
            </button>

            {/* Price Dropdown Menu */}
            {priceDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 animate-fade-in">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Trier par prix
                </div>
                <button
                  onClick={() => handlePriceFilter('asc')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  Croissant
                  {currentFilters.priceSort === 'asc' && (
                    <span className="material-symbols-outlined text-french-tech-blue text-sm">check</span>
                  )}
                </button>
                <button
                  onClick={() => handlePriceFilter('desc')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  Décroissant
                  {currentFilters.priceSort === 'desc' && (
                    <span className="material-symbols-outlined text-french-tech-blue text-sm">check</span>
                  )}
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Filtrer par gamme
                </div>
                <button
                  onClick={() => handlePriceFilter('under200')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  Moins de 200€
                  {currentFilters.priceSort === 'under200' && (
                    <span className="material-symbols-outlined text-french-tech-blue text-sm">check</span>
                  )}
                </button>
                <button
                  onClick={() => handlePriceFilter('200-300')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  200€ - 300€
                  {currentFilters.priceSort === '200-300' && (
                    <span className="material-symbols-outlined text-french-tech-blue text-sm">check</span>
                  )}
                </button>
                <button
                  onClick={() => handlePriceFilter('over300')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  Plus de 300€
                  {currentFilters.priceSort === 'over300' && (
                    <span className="material-symbols-outlined text-french-tech-blue text-sm">check</span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Relevance Filter Dropdown */}
          <div className="relative" ref={relevanceDropdownRef}>
            <button
              onClick={() => setRelevanceDropdownOpen(!relevanceDropdownOpen)}
              className={`flex items-center justify-center gap-x-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isRelevanceActive
                  ? 'border-french-tech-blue bg-french-tech-blue text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Filtrer par pertinence"
            >
              {getRelevanceButtonText()}
              <span className={`material-symbols-outlined text-base transition-transform duration-200 ${
                relevanceDropdownOpen ? 'rotate-180' : ''
              }`}>
                expand_more
              </span>
            </button>

            {/* Relevance Dropdown Menu */}
            {relevanceDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 animate-fade-in">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Trier par pertinence
                </div>
                <button
                  onClick={() => handleRelevanceFilter('recent')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  Plus récent
                  {currentFilters.relevanceSort === 'recent' && (
                    <span className="material-symbols-outlined text-french-tech-blue text-sm">check</span>
                  )}
                </button>
                <button
                  onClick={() => handleRelevanceFilter('rated')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  Mieux noté
                  {currentFilters.relevanceSort === 'rated' && (
                    <span className="material-symbols-outlined text-french-tech-blue text-sm">check</span>
                  )}
                </button>
                <button
                  onClick={() => handleRelevanceFilter('popular')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                >
                  Plus populaire
                  {currentFilters.relevanceSort === 'popular' && (
                    <span className="material-symbols-outlined text-french-tech-blue text-sm">check</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Clear filters button */}
        {(isPriceActive || isRelevanceActive) && (
          <button
            onClick={() => onFilterChange({ priceSort: null, relevanceSort: null })}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Effacer les filtres
          </button>
        )}
      </div>
    </header>
  );
}
