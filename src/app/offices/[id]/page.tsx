'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OfficeCard from '@/components/office/OfficeCard';

interface OfficeDetail {
  id: string;
  title: string;
  neighborhood: string;
  price: number;
  images: string[];
  description: string;
  surface: number;
  capacity: number;
  officeType: 'shared' | 'private';
  availableFrom: string;
  address: string;
  amenities: string[];
  verified: boolean;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  transport: string[];
}

// Données détaillées pour les espaces
const officeDetails: Record<string, OfficeDetail> = {
  '1': {
    id: '1',
    title: 'Tech Hub Barcelona',
    neighborhood: 'Gràcia',
    price: 250,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkymoCDZSfKDXoOLfpH-SF5xL4ow_P0m-G0DuACY7KVNm5LVwaotWQp_jJ9kvUZ7pK2qIz26b96_J-USBDBbrf0qzVMWImLoXRPH1OUIvNCi5g3_xb1DGc8DkSb5YRvy4_DRNdzPUwJ7k_RkzsKdbwjSkwSz-nzQIR1boHlaBCNLm9P-2rw74RYceRR_YGUnjwWb3DcMN8_6RxWHX8GUIknqEFqB4vRmQIBwSVCTlwF9hmY7xZDRAnc5-wfbOsK12GGDoRAVh43yM',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    ],
    description: `Espace moderne et dynamique situé au cœur du quartier de Gràcia, Tech Hub Barcelona offre un environnement de travail collaboratif idéal pour les startups et entrepreneurs de la French Tech.

L'espace dispose d'une grande salle commune avec des postes de travail flexibles, des salles de réunion équipées, et une terrasse avec vue sur la ville. L'ambiance est conviviale et propice aux échanges entre membres de la communauté French Tech.

Le quartier de Gràcia est connu pour son charme bohème, ses nombreux cafés et restaurants, et sa proximité avec le centre-ville. Les transports en commun sont excellents avec plusieurs lignes de métro et bus à proximité.`,
    surface: 120,
    capacity: 15,
    officeType: 'shared',
    availableFrom: '2024-12-15',
    address: 'Carrer de Verdi, 45, 08012 Gràcia, Barcelona',
    amenities: ['WiFi', 'Climatisation', 'Salle réunion', 'Cuisine', 'Terrasse', 'Imprimante'],
    verified: true,
    contact: {
      name: 'Marie Dubois',
      phone: '+34 612 345 678',
      email: 'marie@techhub-bcn.com'
    },
    transport: ['Métro L3 (Fontana)', 'Bus 22, 24, 39', 'Vélib\' à 100m']
  },
  '2': {
    id: '2',
    title: 'Innovation Center',
    neighborhood: 'Eixample',
    price: 300,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCorAg_zr3eA9BCZIbWRoDAneMChZJfSVbtW1KWFO-lXRKpkT7RGAuXH1vcYf_cwjf1sIJP_n_YdGBa6920MZpnKxW2AnB5LJyT9V1NId_cFrbUyeJbb1v2asJ3T9yQ7mrWRYPWPda2TXF0RA2WO-b09rTtbq6nNoCrs_cWU2xwYWER3M0420seuXgHbRMNjJXG5Ao7Z8Xle1OgfDRgSXq3pTMBQY2YI-IwJiB1JauOJBgpQU8NmjXAOlMb7LiQVNBB4jTOH3vKBhE',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    ],
    description: `L'Innovation Center d'Eixample est un espace premium dédié aux entreprises en croissance et aux équipes qui recherchent un environnement professionnel de qualité.

L'espace propose des bureaux privés et semi-privés, des salles de conférence équipées, et des espaces de détente. Le design est moderne et épuré, avec une attention particulière portée au confort et à la productivité.

Situé dans le quartier d'Eixample, vous bénéficiez d'une excellente accessibilité et d'une multitude de services à proximité.`,
    surface: 85,
    capacity: 8,
    officeType: 'private',
    availableFrom: '2024-12-01',
    address: 'Carrer de València, 123, 08011 Eixample, Barcelona',
    amenities: ['WiFi', 'Parking', 'Climatisation', 'Salle réunion', 'Sécurité 24h'],
    verified: true,
    contact: {
      name: 'Pierre Martin',
      phone: '+34 623 456 789',
      email: 'pierre@innovation-center.com'
    },
    transport: ['Métro L1, L2 (Universitat)', 'Bus 7, 24, 41', 'Parking public à 50m']
  },
  '3': {
    id: '3',
    title: 'Startup Garage',
    neighborhood: 'Poblenou',
    price: 200,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGo3VUNY8ETKqXc74B45mqKueWAGiBYJcrmQ05KldW9OoMgABmOQXHs5rUENImKadzB7gHkVD4Mu-xMl3ckwKEXQpuwmHLgPBxtoJvKb79mpYE0N5zDCFHBO5q_oYLcU0wjom5LWdM0IjKSv3U01u_UzfBpWgP53yIfY7sHGVHrvnfghIT9DBOZM-ZQYfwu-7gAxX6xK0Eo4qroCScdui6ijsXu1Y68nkX5w4_OAVJPePsOWWxpbX1D0LUZht7VAXaiylveYQuLOk',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    ],
    description: `Le Startup Garage de Poblenou est l'endroit idéal pour les entrepreneurs qui débutent leur aventure. L'ambiance est décontractée et créative, parfaite pour développer de nouvelles idées.

L'espace dispose d'un open space collaboratif, d'une cuisine équipée, et d'une terrasse pour les pauses. Le quartier de Poblenou, ancien district industriel reconverti, est devenu le hub technologique de Barcelone.

Vous serez entourés d'autres startups et entreprises tech, créant un écosystème dynamique et stimulant.`,
    surface: 95,
    capacity: 12,
    officeType: 'shared',
    availableFrom: '2024-12-20',
    address: 'Carrer de Llacuna, 78, 08005 Poblenou, Barcelona',
    amenities: ['WiFi', 'Cuisine', 'Terrasse', 'Imprimante', 'Café gratuit'],
    verified: false,
    contact: {
      name: 'Sophie Bernard',
      phone: '+34 634 567 890',
      email: 'sophie@startup-garage.com'
    },
    transport: ['Métro L4 (Poblenou)', 'Tram T4', 'Bus 6, 36, 92']
  },
  '4': {
    id: '4',
    title: 'Digital Nomad Nest',
    neighborhood: 'Gothic Quarter',
    price: 280,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgwzxyglzwpZxceMDAO5eTBjhDMrNkQieitoPyYZcEBZgmPec38K9J_ZlhtBILevqpvmkQE4XZfWImnWy5HhKcuukucR0BZF6jQdvtxSCsyumgY7HFJFj5HDahJLBi6TGrz7Hqyj2X7v3rdplMZhe5XTvwFBWi13ZGG0F4kNslKxHNiyGGnKRbZzwD2YMnGW3epkLILDkwYsR4pz-Eo',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    ],
    description: `Le Digital Nomad Nest est spécialement conçu pour les nomades digitaux et les travailleurs à distance. L'espace combine le charme historique du Gothic Quarter avec le confort moderne.

L'espace propose des postes de travail flexibles, des salles de réunion, et une terrasse avec vue sur les toits de Barcelone. L'ambiance est internationale et accueillante.

Le Gothic Quarter, cœur historique de Barcelone, offre un cadre unique avec ses ruelles médiévales, ses places animées, et ses nombreux cafés et restaurants.`,
    surface: 75,
    capacity: 10,
    officeType: 'shared',
    availableFrom: '2024-12-10',
    address: 'Carrer de l\'Argenteria, 56, 08003 Gothic Quarter, Barcelona',
    amenities: ['WiFi', 'Terrasse', 'Sécurité 24h', 'Cuisine', 'Salle réunion'],
    verified: true,
    contact: {
      name: 'Lucas Rodriguez',
      phone: '+34 645 678 901',
      email: 'lucas@digital-nomad-nest.com'
    },
    transport: ['Métro L4 (Jaume I)', 'Bus 45, 120', 'À pied du centre-ville']
  }
};

// Données pour les espaces similaires
const similarOffices = [
  {
    id: '5',
    title: 'Premium Office Space',
    neighborhood: 'Sant Antoni',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'Cozy Workspace',
    neighborhood: 'Born',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
  },
  {
    id: '7',
    title: 'Budget Office',
    neighborhood: 'Sants',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
  }
];

const amenityIcons: Record<string, string> = {
  'WiFi': 'wifi',
  'Parking': 'local_parking',
  'Salle réunion': 'meeting_room',
  'Climatisation': 'ac_unit',
  'Cuisine': 'kitchen',
  'Terrasse': 'deck',
  'Sécurité 24h': 'security',
  'Imprimante': 'print',
  'Café gratuit': 'local_cafe'
};

export default function OfficeDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const office = officeDetails[params.id];

  if (!office) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Espace non trouvé</h1>
          <Link href="/offices" className="btn-french-tech-blue">
            Retour aux espaces
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR');
  };

  const truncatedDescription = office.description.length > 300 
    ? office.description.substring(0, 300) + '...' 
    : office.description;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec bouton retour */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center p-4">
          <Link href="/offices" className="text-gray-600 hover:text-gray-800 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">Détails de l'espace</h1>
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            <span className="material-symbols-outlined">favorite_border</span>
          </button>
        </div>
      </div>

      <div className="pb-20">
        {/* Gallery Photos */}
        <div className="relative">
          <div className="h-64 w-full relative overflow-hidden">
            <Image
              src={office.images[selectedImage]}
              alt={office.title}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <span className="material-symbols-outlined">fullscreen</span>
            </button>
          </div>
          
          {/* Thumbnails */}
          <div className="bg-white p-4">
            <div className="flex space-x-2 overflow-x-auto">
              {office.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-french-tech-blue' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${office.title} - Image ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Informations principales */}
        <div className="bg-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{office.title}</h1>
              <p className="text-lg text-gray-600 mb-2">{office.neighborhood}</p>
              <p className="text-2xl font-bold text-french-tech-blue">{formatPrice(office.price)}€ / mois</p>
            </div>
            {office.verified && (
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <span className="material-symbols-outlined text-sm mr-1">verified</span>
                Vérifié French Tech
              </div>
            )}
          </div>

          {/* Détails */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-gray-400">square_foot</span>
              <span className="text-gray-700">{office.surface} m²</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-gray-400">chair</span>
              <span className="text-gray-700">{office.capacity} postes</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-gray-400">business</span>
              <span className="text-gray-700">
                {office.officeType === 'shared' ? 'Bureau partagé' : 'Bureau privé'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-gray-400">event_available</span>
              <span className="text-gray-700">
                Disponible le {new Date(office.availableFrom).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>

          {/* Équipements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Équipements</h3>
            <div className="grid grid-cols-3 gap-3">
              {office.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                  <span className="material-symbols-outlined text-french-tech-blue text-sm">
                    {amenityIcons[amenity] || 'check'}
                  </span>
                  <span className="text-sm text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <div className="text-gray-700 leading-relaxed">
              {showFullDescription ? office.description : truncatedDescription}
              {office.description.length > 300 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-french-tech-blue hover:text-french-tech-blue-600 font-medium ml-2"
                >
                  {showFullDescription ? 'Voir moins' : 'Voir plus'}
                </button>
              )}
            </div>
          </div>

          {/* Localisation */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Localisation</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="material-symbols-outlined text-gray-400 mt-1">location_on</span>
                <span className="text-gray-700">{office.address}</span>
              </div>
              
              {/* Carte placeholder */}
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">map</span>
                  <p className="text-gray-500">Carte interactive</p>
                </div>
              </div>

              {/* Transports */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Transports à proximité</h4>
                <div className="flex flex-wrap gap-2">
                  {office.transport.map((transport, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {transport}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-gray-400">person</span>
                <span className="text-gray-700">{office.contact.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-gray-400">phone</span>
                <span className="text-gray-700">{office.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-gray-400">email</span>
                <span className="text-gray-700">{office.contact.email}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 btn-french-tech-blue">
                Contacter le propriétaire
              </button>
              <button className="flex-1 btn-french-tech-red">
                Réserver une visite
              </button>
            </div>
          </div>
        </div>

        {/* Espaces similaires */}
        <div className="bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Espaces similaires à {office.neighborhood}
            </h3>
            <Link href="/offices" className="text-french-tech-blue hover:text-french-tech-blue-600 font-medium">
              Voir tous
            </Link>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {similarOffices.map((similarOffice) => (
              <div key={similarOffice.id} className="flex-shrink-0 w-64">
                <OfficeCard office={similarOffice} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Fullscreen */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <Image
              src={office.images[selectedImage]}
              alt={office.title}
              width={800}
              height={600}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
