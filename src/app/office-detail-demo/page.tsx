'use client';

import { useState } from 'react';
import Link from 'next/link';

const demoOffices = [
  {
    id: '1',
    title: 'Tech Hub Barcelona',
    neighborhood: 'Gràcia',
    price: 250,
    verified: true
  },
  {
    id: '2',
    title: 'Innovation Center',
    neighborhood: 'Eixample',
    price: 300,
    verified: true
  },
  {
    id: '3',
    title: 'Startup Garage',
    neighborhood: 'Poblenou',
    price: 200,
    verified: false
  },
  {
    id: '4',
    title: 'Digital Nomad Nest',
    neighborhood: 'Gothic Quarter',
    price: 280,
    verified: true
  }
];

export default function OfficeDetailDemoPage() {
  const [selectedOffice, setSelectedOffice] = useState(demoOffices[0]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Office Detail Page Demo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations sur la page détail */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Fonctionnalités de la page détail</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Gallery photos avec thumbnails et fullscreen
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Informations principales avec badge vérifié
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Détails complets (surface, capacité, type, disponibilité)
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Équipements avec icônes et labels
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Description avec "Voir plus/Voir moins"
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Localisation avec carte et transports
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Contact avec boutons d'action
                </li>
                <li className="flex items-center">
                  <span className="material-symbols-outlined text-green-500 mr-2">check_circle</span>
                  Espaces similaires en horizontal scroll
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Sélectionner un espace</h2>
              <div className="space-y-3">
                {demoOffices.map((office) => (
                  <button
                    key={office.id}
                    onClick={() => setSelectedOffice(office)}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                      selectedOffice.id === office.id
                        ? 'border-french-tech-blue bg-french-tech-blue/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-medium ${
                          selectedOffice.id === office.id ? 'text-french-tech-blue' : 'text-gray-900'
                        }`}>
                          {office.title}
                        </h3>
                        <p className="text-sm text-gray-600">{office.neighborhood}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-french-tech-blue">{office.price}€ / mois</p>
                        {office.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Vérifié
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p>1. Sélectionnez un espace ci-dessus</p>
                <p>2. Cliquez sur "Voir les détails" pour accéder à la page complète</p>
                <p>3. Testez la galerie photos et le mode fullscreen</p>
                <p>4. Explorez toutes les sections de la page détail</p>
                <p>5. Testez les boutons de contact et de réservation</p>
              </div>
            </div>
          </div>

          {/* Aperçu de l'espace sélectionné */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Aperçu de l'espace</h2>
              <div className="space-y-4">
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">apartment</span>
                    <p className="text-gray-500">Image de l'espace</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedOffice.title}</h3>
                  <p className="text-gray-600">{selectedOffice.neighborhood}</p>
                  <p className="text-xl font-bold text-french-tech-blue mt-2">{selectedOffice.price}€ / mois</p>
                  {selectedOffice.verified && (
                    <div className="flex items-center mt-2">
                      <span className="material-symbols-outlined text-green-500 text-sm mr-1">verified</span>
                      <span className="text-sm text-green-700">Vérifié French Tech</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-gray-400">square_foot</span>
                    <span>120 m²</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-gray-400">chair</span>
                    <span>15 postes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-gray-400">business</span>
                    <span>Bureau partagé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-gray-400">event_available</span>
                    <span>Disponible</span>
                  </div>
                </div>

                <Link
                  href={`/offices/${selectedOffice.id}`}
                  className="w-full btn-french-tech-blue text-center"
                >
                  Voir les détails complets
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Données mock disponibles</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <div><strong>Images:</strong> 3-4 images par espace</div>
                <div><strong>Description:</strong> Texte détaillé avec paragraphes</div>
                <div><strong>Équipements:</strong> 5-6 équipements avec icônes</div>
                <div><strong>Contact:</strong> Nom, téléphone, email</div>
                <div><strong>Transports:</strong> Métro, bus, autres options</div>
                <div><strong>Espaces similaires:</strong> 3 suggestions</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Animations et interactions</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <div>• <strong>Gallery:</strong> Navigation entre images, fullscreen</div>
                <div>• <strong>Description:</strong> Toggle "Voir plus/Voir moins"</div>
                <div>• <strong>Thumbnails:</strong> Sélection avec bordure colorée</div>
                <div>• <strong>Boutons:</strong> Hover effects et transitions</div>
                <div>• <strong>Modal:</strong> Fullscreen avec Framer Motion</div>
                <div>• <strong>Scroll:</strong> Horizontal pour espaces similaires</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
