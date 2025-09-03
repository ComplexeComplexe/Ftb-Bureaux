'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import UserMenu from '@/components/auth/UserMenu';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-french-tech-blue rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">FT</span>
            </div>
            <span className="text-xl font-bold text-gray-900">French Tech Barcelona</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/offices"
              className="text-gray-700 hover:text-french-tech-blue transition-colors font-medium"
            >
              Espaces
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-french-tech-blue transition-colors font-medium"
            >
              À propos
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-french-tech-blue transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Menu utilisateur et bouton mobile */}
          <div className="flex items-center space-x-4">
            <UserMenu />
            
            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Ouvrir le menu mobile"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
