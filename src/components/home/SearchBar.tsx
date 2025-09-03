'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const NEIGHBORHOODS = [
  'Gràcia', 'Eixample', 'Poblenou', 'Gothic Quarter', 
  'Born', 'Sant Antoni', 'Sants', 'Sarrià'
];

const OFFICE_TYPES = [
  'Bureau partagé', 'Bureau privé', 'Coworking', 'Salle de réunion'
];

export default function SearchBar({ placeholder = "Rechercher par quartier, type d'espace...", className = '' }: SearchBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const allSuggestions = [...NEIGHBORHOODS, ...OFFICE_TYPES];
      const filtered = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/offices?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    router.push(`/offices?search=${encodeURIComponent(suggestion)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionSelect(filteredSuggestions[selectedIndex]);
        } else {
          handleSearchSubmit(e as any);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-6 py-4 text-gray-900 rounded-lg text-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-french-tech-blue"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bg-french-tech-blue text-white p-2 rounded-lg hover:bg-french-tech-blue-600 transition-colors"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>

      {/* Suggestions d'autocomplete */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 mt-1 z-10 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionSelect(suggestion)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-900 border-b border-gray-100 last:border-b-0 transition-colors ${
                index === selectedIndex ? 'bg-french-tech-blue text-white hover:bg-french-tech-blue-600' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-sm">
                  {NEIGHBORHOODS.includes(suggestion) ? 'location_on' : 'business'}
                </span>
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Indicateur de recherche rapide */}
      {searchQuery.length > 0 && (
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <span className="text-sm text-blue-100">
            Appuyez sur Entrée pour rechercher
          </span>
        </div>
      )}
    </div>
  );
}
