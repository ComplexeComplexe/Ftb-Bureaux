'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-french-tech-blue rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">FT</span>
                </div>
                <h1 className="text-xl font-bold text-french-tech-blue hidden sm:block">
                  French Tech Barcelona
                </h1>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200 font-medium"
            >
              Accueil
            </Link>
            <Link 
              href="/offices" 
              className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200 font-medium"
            >
              Espaces
            </Link>
            <Link 
              href="/offices/create" 
              className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200 font-medium"
            >
              Créer une annonce
            </Link>
          </nav>

          {/* User Menu Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200 font-medium"
            >
              Connexion
            </Link>
            <Link 
              href="/signup" 
              className="btn-primary px-4 py-2"
            >
              Inscription
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={toggleUserMenu}
              className="p-2 text-gray-700 hover:text-french-tech-blue transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-xl">account_circle</span>
            </button>
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-french-tech-blue transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200 font-medium px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                href="/offices" 
                className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200 font-medium px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Espaces
              </Link>
              <Link 
                href="/offices/create" 
                className="text-gray-700 hover:text-french-tech-blue transition-colors duration-200 font-medium px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Créer une annonce
              </Link>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link 
                  href="/login" 
                  className="block text-gray-700 hover:text-french-tech-blue transition-colors duration-200 font-medium px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  href="/signup" 
                  className="block btn-primary mx-4 mt-2 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* User Menu Mobile */}
        {isUserMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]">
            <Link 
              href="/login" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Connexion
            </Link>
            <Link 
              href="/signup" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsUserMenuOpen(false)}
            >
              Inscription
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
