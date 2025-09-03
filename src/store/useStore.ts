import { create } from 'zustand';
import { Profile, Office, Booking, OfficeFilters } from '@/lib/types';

interface AppState {
  // Auth state
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Offices state
  offices: Office[];
  filteredOffices: Office[];
  selectedOffice: Office | null;
  
  // Bookings state
  userBookings: Booking[];
  
  // UI state
  filters: OfficeFilters;
  
  // Actions
  setUser: (user: Profile | null) => void;
  setOffices: (offices: Office[]) => void;
  setFilteredOffices: (offices: Office[]) => void;
  setSelectedOffice: (office: Office | null) => void;
  setUserBookings: (bookings: Booking[]) => void;
  setFilters: (filters: OfficeFilters) => void;
  clearFilters: () => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  offices: [],
  filteredOffices: [],
  selectedOffice: null,
  userBookings: [],
  filters: {},

  // Actions
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user 
  }),
  
  setOffices: (offices) => set({ offices }),
  
  setFilteredOffices: (filteredOffices) => set({ filteredOffices }),
  
  setSelectedOffice: (selectedOffice) => set({ selectedOffice }),
  
  setUserBookings: (userBookings) => set({ userBookings }),
  
  setFilters: (filters) => set({ filters }),
  
  clearFilters: () => set({ 
    filters: {},
    filteredOffices: []
  }),
  
  logout: () => set({
    user: null,
    isAuthenticated: false,
    offices: [],
    filteredOffices: [],
    selectedOffice: null,
    userBookings: [],
    filters: {}
  }),
}));
