'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedFilters {
  neighborhoods: string[];
  priceRange: [number, number];
  officeType: 'shared' | 'private' | null;
  amenities: string[];
  availableFrom: Date | null;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: AdvancedFilters) => void;
  currentFilters: AdvancedFilters;
  totalResults: number;
}

const NEIGHBORHOODS = ['Gràcia', 'Eixample', 'Poblenou', 'Gothic Quarter', 'Sant Antoni', 'Born', 'Sants', 'Sarrià'];
const AMENITIES = ['WiFi', 'Parking', 'Salle réunion', 'Climatisation', 'Cuisine', 'Terrasse', 'Sécurité 24h'];

export default function FilterModal({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters, 
  totalResults 
}: FilterModalProps) {
  const [filters, setFilters] = useState<AdvancedFilters>(currentFilters);
  const [expandedSections, setExpandedSections] = useState({
    neighborhoods: true,
    price: true,
    type: true,
    amenities: true,
    availability: true,
  });

  // Réinitialiser les filtres quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  // Fermer avec Échap
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNeighborhoodToggle = (neighborhood: string) => {
    setFilters(prev => ({
      ...prev,
      neighborhoods: prev.neighborhoods.includes(neighborhood)
        ? prev.neighborhoods.filter(n => n !== neighborhood)
        : [...prev.neighborhoods, neighborhood]
    }));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  const handleOfficeTypeChange = (type: 'shared' | 'private' | null) => {
    setFilters(prev => ({
      ...prev,
      officeType: prev.officeType === type ? null : type
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleDateChange = (date: string) => {
    setFilters(prev => ({
      ...prev,
      availableFrom: date ? new Date(date) : null
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      neighborhoods: [],
      priceRange: [100, 500],
      officeType: null,
      amenities: [],
      availableFrom: null,
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.neighborhoods.length > 0) count++;
    if (filters.priceRange[0] !== 100 || filters.priceRange[1] !== 500) count++;
    if (filters.officeType) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.availableFrom) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined text-gray-600">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-6">
                {/* Quartiers */}
                <div className="border-b border-gray-100 pb-6">
                  <button
                    onClick={() => toggleSection('neighborhoods')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Quartiers</h3>
                    <span className={`material-symbols-outlined transition-transform ${
                      expandedSections.neighborhoods ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  
                  {expandedSections.neighborhoods && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 space-y-3"
                    >
                      {NEIGHBORHOODS.map((neighborhood) => (
                        <label key={neighborhood} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.neighborhoods.includes(neighborhood)}
                            onChange={() => handleNeighborhoodToggle(neighborhood)}
                            className="w-4 h-4 text-french-tech-blue border-gray-300 rounded focus:ring-french-tech-blue"
                          />
                          <span className="text-gray-700">{neighborhood}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Prix */}
                <div className="border-b border-gray-100 pb-6">
                  <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Prix</h3>
                    <span className={`material-symbols-outlined transition-transform ${
                      expandedSections.price ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  
                  {expandedSections.price && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{filters.priceRange[0]}€</span>
                          <span>{filters.priceRange[1]}€</span>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            min="100"
                            max="500"
                            value={filters.priceRange[0]}
                            onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), filters.priceRange[1])}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <input
                            type="range"
                            min="100"
                            max="500"
                            value={filters.priceRange[1]}
                            onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider absolute top-0"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Type de bureau */}
                <div className="border-b border-gray-100 pb-6">
                  <button
                    onClick={() => toggleSection('type')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Type de bureau</h3>
                    <span className={`material-symbols-outlined transition-transform ${
                      expandedSections.type ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  
                  {expandedSections.type && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 space-y-3"
                    >
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="officeType"
                          checked={filters.officeType === 'shared'}
                          onChange={() => handleOfficeTypeChange('shared')}
                          className="w-4 h-4 text-french-tech-blue border-gray-300 focus:ring-french-tech-blue"
                        />
                        <span className="text-gray-700">Bureau partagé</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="officeType"
                          checked={filters.officeType === 'private'}
                          onChange={() => handleOfficeTypeChange('private')}
                          className="w-4 h-4 text-french-tech-blue border-gray-300 focus:ring-french-tech-blue"
                        />
                        <span className="text-gray-700">Bureau privé</span>
                      </label>
                    </motion.div>
                  )}
                </div>

                {/* Équipements */}
                <div className="border-b border-gray-100 pb-6">
                  <button
                    onClick={() => toggleSection('amenities')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Équipements</h3>
                    <span className={`material-symbols-outlined transition-transform ${
                      expandedSections.amenities ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  
                  {expandedSections.amenities && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 space-y-3"
                    >
                      {AMENITIES.map((amenity) => (
                        <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="w-4 h-4 text-french-tech-blue border-gray-300 rounded focus:ring-french-tech-blue"
                          />
                          <span className="text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Disponibilité */}
                <div className="border-b border-gray-100 pb-6">
                  <button
                    onClick={() => toggleSection('availability')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Disponibilité</h3>
                    <span className={`material-symbols-outlined transition-transform ${
                      expandedSections.availability ? 'rotate-180' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  
                  {expandedSections.availability && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4"
                    >
                      <input
                        type="date"
                        value={filters.availableFrom ? filters.availableFrom.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-french-tech-blue/20 focus:border-french-tech-blue"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Effacer tout
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 px-4 py-3 bg-french-tech-blue text-white rounded-lg hover:bg-french-tech-blue-600 transition-colors"
                >
                  Appliquer ({totalResults} résultats)
                </button>
              </div>
              {activeFiltersCount > 0 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
