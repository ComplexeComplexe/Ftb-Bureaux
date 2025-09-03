import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Créer le client Supabase seulement si les variables d'environnement sont définies
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Constantes pour les noms de tables
export const TABLES = {
  PROFILES: 'profiles',
  OFFICES: 'offices',
  MESSAGES: 'messages',
  BOOKINGS: 'bookings',
} as const;

// Helpers pour l'authentification
export const auth = {
  signIn: async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.auth.signInWithPassword({ email, password });
  },
  
  signUp: async (email: string, password: string, metadata?: any) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.auth.signUp({ email, password, options: { data: metadata } });
  },
  
  signOut: async () => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.auth.signOut();
  },
  
  resetPassword: async (email: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.auth.resetPasswordForEmail(email);
  },
  
  onAuthStateChange: (callback: any) => {
    if (!supabase) return { data: { subscription: null } };
    return supabase.auth.onAuthStateChange(callback);
  },
  
  getSession: async () => {
    if (!supabase) return { data: { session: null }, error: null };
    return supabase.auth.getSession();
  },
};

// Helpers pour la base de données
export const db = {
  // Profiles
  getProfile: async (userId: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.PROFILES).select('*').eq('id', userId).single();
  },
  
  createProfile: async (profile: any) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.PROFILES).insert(profile);
  },
  
  updateProfile: async (userId: string, updates: any) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.PROFILES).update(updates).eq('id', userId);
  },
  
  // Offices
  getOffices: async () => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.OFFICES).select('*').order('created_at', { ascending: false });
  },
  
  getOfficeById: async (id: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.OFFICES).select('*').eq('id', id).single();
  },
  
  createOffice: async (office: any) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.OFFICES).insert(office);
  },
  
  updateOffice: async (id: string, updates: any) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.OFFICES).update(updates).eq('id', id);
  },
  
  deleteOffice: async (id: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.OFFICES).delete().eq('id', id);
  },
  
  // Messages
  getMessages: async (userId: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.MESSAGES).select('*').or(`sender_id.eq.${userId},receiver_id.eq.${userId}`).order('created_at', { ascending: false });
  },
  
  createMessage: async (message: any) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.MESSAGES).insert(message);
  },
  
  // Bookings
  getBookings: async (userId: string) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.BOOKINGS).select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },
  
  createBooking: async (booking: any) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.BOOKINGS).insert(booking);
  },
  
  updateBooking: async (id: string, updates: any) => {
    if (!supabase) throw new Error('Supabase not configured');
    return supabase.from(TABLES.BOOKINGS).update(updates).eq('id', id);
  },
};
