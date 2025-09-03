'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { auth } from '@/lib/supabase';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, isAuthenticated, logout } = useStore();
  const [isClosing, setIsClosing] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    await auth.signOut();
    logout();
    onClose();
  };

  // Handle close animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Menu */}
      <div 
        className={`fixed top-16 lg:top-20 right-0 w-80 h-full bg-surface shadow-2xl z-50 transform transition-transform duration-200 ease-out ${
          isClosing ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <Link 
              href="/" 
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors duration-200"
              onClick={handleClose}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Accueil
            </Link>
            <Link 
              href="/offices" 
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors duration-200"
              onClick={handleClose}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Bureaux
            </Link>
            <Link 
              href="/offices/create" 
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors duration-200"
              onClick={handleClose}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Poster une annonce
            </Link>
          </nav>

          <hr className="border-gray-200 my-6" />

          {/* User Section */}
          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="px-4 py-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Connecté en tant que</p>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Mon Compte
                </h3>
                <Link 
                  href="/profile" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors duration-200"
                  onClick={handleClose}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mon Profil
                </Link>
                <Link 
                  href="/profile/offices" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors duration-200"
                  onClick={handleClose}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Mes Annonces
                </Link>
                <Link 
                  href="/profile/bookings" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors duration-200"
                  onClick={handleClose}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Mes Réservations
                </Link>
              </div>

              <hr className="border-gray-200 my-6" />

              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Connexion
              </h3>
              <Link 
                href="/login" 
                className="block w-full text-center px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors duration-200"
                onClick={handleClose}
              >
                Connexion
              </Link>
              <Link 
                href="/signup" 
                className="block w-full text-center px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                onClick={handleClose}
              >
                Inscription
              </Link>
            </div>
          )}

          {/* Footer Links */}
          <div className="mt-auto pt-8 border-t border-gray-200">
            <div className="space-y-2">
              <Link 
                href="/about" 
                className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={handleClose}
              >
                À propos
              </Link>
              <Link 
                href="/contact" 
                className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={handleClose}
              >
                Contact
              </Link>
              <Link 
                href="/legal/terms" 
                className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={handleClose}
              >
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
