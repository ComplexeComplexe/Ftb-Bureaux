import { Office } from '@/lib/types';

export const mockOffices: Office[] = [
  {
    id: '1',
    title: 'Tech Hub Barcelona',
    description: 'Espace de travail moderne au cœur de Gràcia, parfait pour les startups tech. WiFi haut débit, salle de réunion, cuisine équipée.',
    neighborhood: 'Gràcia',
    price: 250,
    size: 120,
    amenities: ['WiFi', 'Climatisation', 'Salle réunion', 'Cuisine'],
    images: ['/placeholder-office.jpg'],
    imageUrl: '/placeholder-office.jpg',
    officeType: 'shared',
    rating: 4.8,
    popularity: 95,
    availableFrom: '2024-12-15',
    createdAt: '2024-12-01',
    status: 'available',
    available: true,
    address: 'Carrer de Verdi, 123, Gràcia, Barcelona',
    user_id: 'user1',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Innovation Center',
    description: 'Bureau privé spacieux dans l\'Eixample, idéal pour les équipes en croissance. Parking privé inclus.',
    neighborhood: 'Eixample',
    price: 300,
    size: 150,
    amenities: ['WiFi', 'Parking', 'Climatisation', 'Sécurité 24h'],
    images: ['/placeholder-office.jpg'],
    imageUrl: '/placeholder-office.jpg',
    officeType: 'private',
    rating: 4.6,
    popularity: 87,
    availableFrom: '2024-12-01',
    createdAt: '2024-11-15',
    status: 'available',
    available: true,
    address: 'Carrer de Provença, 456, Eixample, Barcelona',
    user_id: 'user2',
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2024-11-15T10:00:00Z'
  },
  {
    id: '3',
    title: 'Startup Garage',
    description: 'Espace collaboratif dans Poblenou, la Silicon Valley de Barcelone. Terrasse avec vue sur la mer.',
    neighborhood: 'Poblenou',
    price: 200,
    size: 100,
    amenities: ['WiFi', 'Cuisine', 'Terrasse', 'Salle réunion'],
    images: ['/placeholder-office.jpg'],
    imageUrl: '/placeholder-office.jpg',
    officeType: 'shared',
    rating: 4.9,
    popularity: 92,
    availableFrom: '2024-12-20',
    createdAt: '2024-12-05',
    status: 'available',
    available: true,
    address: 'Carrer de Llacuna, 789, Poblenou, Barcelona',
    user_id: 'user3',
    created_at: '2024-12-05T10:00:00Z',
    updated_at: '2024-12-05T10:00:00Z'
  },
  {
    id: '4',
    title: 'Digital Nomad Nest',
    description: 'Bureau privé dans le quartier gothique, ambiance historique et moderne. Sécurité 24h/24.',
    neighborhood: 'Gothic Quarter',
    price: 280,
    size: 80,
    amenities: ['WiFi', 'Terrasse', 'Sécurité 24h', 'Climatisation'],
    images: ['/placeholder-office.jpg'],
    imageUrl: '/placeholder-office.jpg',
    officeType: 'private',
    rating: 4.7,
    popularity: 89,
    availableFrom: '2024-12-10',
    createdAt: '2024-11-20',
    status: 'available',
    available: true,
    address: 'Carrer de la Boqueria, 321, Gothic Quarter, Barcelona',
    user_id: 'user4',
    created_at: '2024-11-20T10:00:00Z',
    updated_at: '2024-11-20T10:00:00Z'
  },
  {
    id: '5',
    title: 'Premium Office Space',
    description: 'Suite de luxe dans Sant Antoni, services premium et équipements haut de gamme.',
    neighborhood: 'Sant Antoni',
    price: 1200,
    size: 200,
    amenities: ['WiFi', 'Parking', 'Salle réunion', 'Climatisation', 'Cuisine', 'Conciergerie'],
    images: ['/placeholder-office.jpg'],
    imageUrl: '/placeholder-office.jpg',
    officeType: 'private',
    rating: 4.5,
    popularity: 78,
    availableFrom: '2024-11-01',
    createdAt: '2024-10-10',
    status: 'available',
    available: true,
    address: 'Carrer de Manso, 654, Sant Antoni, Barcelona',
    user_id: 'user5',
    created_at: '2024-10-10T10:00:00Z',
    updated_at: '2024-10-10T10:00:00Z'
  },
  {
    id: '6',
    title: 'Cozy Workspace',
    description: 'Espace chaleureux dans le Born, parfait pour les créatifs et les petites équipes.',
    neighborhood: 'Born',
    price: 450,
    size: 90,
    amenities: ['WiFi', 'Climatisation', 'Cuisine', 'Terrasse'],
    images: ['/placeholder-office.jpg'],
    imageUrl: '/placeholder-office.jpg',
    officeType: 'shared',
    rating: 4.4,
    popularity: 82,
    availableFrom: '2024-12-25',
    createdAt: '2024-12-10',
    status: 'available',
    available: true,
    address: 'Carrer de l\'Argenteria, 987, Born, Barcelona',
    user_id: 'user6',
    created_at: '2024-12-10T10:00:00Z',
    updated_at: '2024-12-10T10:00:00Z'
  }
];

export const getOffices = (): Office[] => {
  return mockOffices;
};

export const getOfficeById = (id: string): Office | undefined => {
  return mockOffices.find(office => office.id === id);
};

export const getOfficesByNeighborhood = (neighborhood: string): Office[] => {
  return mockOffices.filter(office => 
    office.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
  );
};
