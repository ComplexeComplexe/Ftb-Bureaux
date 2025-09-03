'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Se connecter
        </Link>
        <Link
          href="/signup"
          className="bg-french-tech-blue text-white px-4 py-2 rounded-lg hover:bg-french-tech-blue-600 transition-colors"
        >
          S'inscrire
        </Link>
      </div>
    );
  }

  const userInitials = user.name?.[0] || user.email?.[0] || 'U';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="Menu utilisateur"
      >
        <div className="w-8 h-8 bg-french-tech-blue text-white rounded-full flex items-center justify-center text-sm font-medium">
          {userInitials.toUpperCase()}
        </div>
        <span className="hidden md:block text-sm font-medium">
          {user.name || user.email}
        </span>
        <span className="material-symbols-outlined text-sm">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.name}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          
          <div className="py-1">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="material-symbols-outlined text-sm mr-2">person</span>
              Mon profil
            </Link>
            <Link
              href="/offices"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="material-symbols-outlined text-sm mr-2">business</span>
              Mes espaces
            </Link>
            <Link
              href="/bookings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="material-symbols-outlined text-sm mr-2">event</span>
              Mes réservations
            </Link>
          </div>
          
          <div className="border-t border-gray-100 pt-1">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="material-symbols-outlined text-sm mr-2">logout</span>
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
