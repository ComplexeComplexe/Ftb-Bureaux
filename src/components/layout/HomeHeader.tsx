'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HomeHeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function HomeHeader({ onScrollToSection }: HomeHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-md' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-french-tech-blue rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">FT</span>
            </div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              French Tech Barcelona
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onScrollToSection('offices')}
              className={`transition-colors font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:text-french-tech-blue' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Espaces
            </button>
            <Link
              href="/offices/create"
              className={`transition-colors font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:text-french-tech-blue' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Poster une annonce
            </Link>
            <Link
              href="/login"
              className={`transition-colors font-medium ${
                isScrolled 
                  ? 'text-gray-700 hover:text-french-tech-blue' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Connexion
            </Link>
          </nav>

          {/* Bouton mobile */}
          <div className="md:hidden">
            <Link
              href="/offices"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isScrolled
                  ? 'bg-french-tech-blue text-white hover:bg-french-tech-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              Voir les espaces
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
