'use client';

import Link from 'next/link';

export default function CreateHeader() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/offices"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
            aria-label="Retour aux espaces"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Créer une annonce</h1>
            <p className="text-sm text-gray-600">Publiez votre espace de travail</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Brouillon
          </span>
        </div>
      </div>
    </header>
  );
}
