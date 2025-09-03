'use client';

import { useState } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import { useNotifications } from '@/hooks/useNotifications';

export default function BottomNavDemoPage() {
  const { unreadCount, addNotification, markAllAsRead } = useNotifications();
  const [currentPage, setCurrentPage] = useState('demo');

  const pages = {
    home: {
      title: 'Accueil',
      content: 'Page d\'accueil de French Tech Barcelona Offices',
      icon: '🏠'
    },
    offices: {
      title: 'Rechercher',
      content: 'Page de recherche et filtrage des bureaux',
      icon: '🔍'
    },
    create: {
      title: 'Annonces',
      content: 'Page de création d\'annonce de bureau',
      icon: '➕'
    },
    messages: {
      title: 'Contact',
      content: 'Page des messages et notifications',
      icon: '✉️'
    }
  };

  const currentPageData = pages[currentPage as keyof typeof pages] || pages.home;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Bottom Navigation Demo</h1>
        <p className="text-gray-600 mt-2">Testez la navigation bottom avec état actif et notifications</p>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informations sur la navigation */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Fonctionnalités</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Navigation automatique avec Next.js Link
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    État actif basé sur usePathname()
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Indicateur visuel de la page active
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Animations Framer Motion
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Badge de notifications dynamique
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                    Prefetch automatique des liens
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Routes de navigation</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accueil:</span>
                    <span className="font-medium">/</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rechercher:</span>
                    <span className="font-medium">/offices</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annonces:</span>
                    <span className="font-medium">/offices/create</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">/messages</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">État des notifications</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Messages non lus:</span>
                    <span className="font-medium text-french-tech-red">{unreadCount}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addNotification({
                        type: 'message',
                        title: 'Nouveau message',
                        content: 'Test de notification',
                        read: false
                      })}
                      className="btn-french-tech-blue text-sm"
                    >
                      Ajouter notification
                    </button>
                    <button
                      onClick={markAllAsRead}
                      className="btn-french-tech-red text-sm"
                    >
                      Tout marquer lu
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation de pages */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Simulation de pages</h2>
                <div className="space-y-4">
                  {Object.entries(pages).map(([key, page]) => (
                    <button
                      key={key}
                      onClick={() => setCurrentPage(key)}
                      className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                        currentPage === key
                          ? 'border-french-tech-blue bg-french-tech-blue/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{page.icon}</span>
                        <div>
                          <h3 className={`font-medium ${
                            currentPage === key ? 'text-french-tech-blue' : 'text-gray-900'
                          }`}>
                            {page.title}
                          </h3>
                          <p className="text-sm text-gray-600">{page.content}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Page actuelle</h2>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-3xl">{currentPageData.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{currentPageData.title}</h3>
                  </div>
                  <p className="text-gray-700">{currentPageData.content}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    URL simulée: /{currentPage === 'home' ? '' : currentPage}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Animations Framer Motion</h2>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• <strong>Hover:</strong> Scale 1.05 sur les icônes</div>
                  <div>• <strong>Tap:</strong> Scale 0.95 sur les icônes</div>
                  <div>• <strong>Badge:</strong> Scale animation d'apparition</div>
                  <div>• <strong>Indicateur actif:</strong> Spring animation avec layoutId</div>
                  <div>• <strong>Transitions:</strong> Couleurs et font-weight</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bottom */}
      <BottomNav />
    </div>
  );
}
