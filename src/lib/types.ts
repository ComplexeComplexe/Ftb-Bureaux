export interface Profile {
  id: string;
  email: string;
  name: string;
  company: string;
  french_tech_member: boolean;
  created_at: string;
  updated_at: string;
}

export interface Office {
  id: string;
  title: string;
  description?: string;
  neighborhood: string;
  price: number;
  size?: number; // in m²
  amenities: string[];
  images?: string[];
  imageUrl?: string; // Pour la compatibilité avec les composants existants
  user_id?: string;
  status?: 'available' | 'rented' | 'maintenance';
  address?: string;
  available?: boolean;
  created_at?: string;
  updated_at?: string;
  // Propriétés additionnelles pour les composants
  officeType?: 'shared' | 'private';
  rating?: number;
  popularity?: number;
  availableFrom?: string;
  createdAt?: string; // Alias pour created_at
}

export interface Message {
  id: string;
  office_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  office_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: Profile | null;
  isLoading: boolean;
  error: string | null;
}

export interface OfficeFilters {
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  amenities?: string[];
  status?: 'available' | 'rented' | 'maintenance';
}

// Database table names
export const TABLES = {
  PROFILES: 'profiles',
  OFFICES: 'offices',
  MESSAGES: 'messages',
  BOOKINGS: 'bookings',
} as const;

// Extended types for forms and API
export interface CreateOfficeData {
  title: string;
  description: string;
  neighborhood: string;
  price: number;
  size: number;
  amenities: string[];
  images: string[];
  address: string;
}

export interface CreateBookingData {
  office_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
}

export interface CreateMessageData {
  office_id: string;
  receiver_id: string;
  content: string;
}

export interface UpdateProfileData {
  name?: string;
  company?: string;
  french_tech_member?: boolean;
}
