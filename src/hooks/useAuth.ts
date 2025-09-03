'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/supabase';
import { Profile } from '@/lib/types';

interface AuthState {
  user: Profile | null;
  session: any;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    // Vérifier si Supabase est configuré
    if (!auth) {
      setAuthState({
        user: null,
        session: null,
        loading: false,
        error: 'Supabase not configured',
      });
      return;
    }

    // Récupérer la session initiale
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await auth.getSession();
        if (error) {
          setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        } else if (session) {
          setAuthState(prev => ({
            ...prev,
            session,
            user: session.user ? {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || '',
              company: session.user.user_metadata?.company || '',
              french_tech_member: session.user.user_metadata?.french_tech_member || false,
              created_at: session.user.created_at || '',
              updated_at: session.user.updated_at || '',
            } : null,
            loading: false,
          }));
        } else {
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        setAuthState(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error.message : 'Unknown error', 
          loading: false 
        }));
      }
    };

    getInitialSession();

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = auth.onAuthStateChange(async (event: string, session: any) => {
      if (event === 'SIGNED_IN' && session) {
        setAuthState({
          user: session.user ? {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || '',
            company: session.user.user_metadata?.company || '',
            french_tech_member: session.user.user_metadata?.french_tech_member || false,
            created_at: session.user.created_at || '',
            updated_at: session.user.updated_at || '',
          } : null,
          session,
          loading: false,
          error: null,
        });
      } else if (event === 'SIGNED_OUT') {
        setAuthState({
          user: null,
          session: null,
          loading: false,
          error: null,
        });
        router.push('/login');
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    if (!auth) {
      setAuthState(prev => ({ ...prev, error: 'Supabase not configured' }));
      return { error: 'Supabase not configured' };
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await auth.signIn(email, password);
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        return { error: error.message };
      }
      
      if (data?.user) {
        router.push('/offices');
      }
      
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { error: errorMessage };
    }
  };

  const signup = async (email: string, password: string, userData: Partial<Profile>) => {
    if (!auth) {
      setAuthState(prev => ({ ...prev, error: 'Supabase not configured' }));
      return { error: 'Supabase not configured' };
    }

    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await auth.signUp(email, password, {
        name: userData.name,
        company: userData.company,
        french_tech_member: userData.french_tech_member,
      });
      
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }));
        return { error: error.message };
      }
      
      if (data?.user) {
        // Créer le profil utilisateur
        // Note: En production, vous voudriez probablement utiliser un webhook ou une fonction Edge
        setAuthState(prev => ({
          ...prev,
          user: {
            id: data.user!.id,
            email: data.user!.email || '',
            name: userData.name || '',
            company: userData.company || '',
            french_tech_member: userData.french_tech_member || false,
            created_at: data.user!.created_at || '',
            updated_at: data.user!.updated_at || '',
          },
          loading: false,
        }));
        
        router.push('/offices');
      }
      
      return { data, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      return { error: errorMessage };
    }
  };

  const logout = async () => {
    if (!auth) {
      setAuthState(prev => ({ ...prev, error: 'Supabase not configured' }));
      return { error: 'Supabase not configured' };
    }

    try {
      const { error } = await auth.signOut();
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message }));
        return { error: error.message };
      }
      
      setAuthState({
        user: null,
        session: null,
        loading: false,
        error: null,
      });
      
      router.push('/login');
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setAuthState(prev => ({ ...prev, error: errorMessage }));
      return { error: errorMessage };
    }
  };

  const resetPassword = async (email: string) => {
    if (!auth) {
      setAuthState(prev => ({ ...prev, error: 'Supabase not configured' }));
      return { error: 'Supabase not configured' };
    }

    try {
      const { error } = await auth.resetPassword(email);
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message }));
        return { error: error.message };
      }
      
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setAuthState(prev => ({ ...prev, error: errorMessage }));
      return { error: errorMessage };
    }
  };

  return {
    ...authState,
    login,
    signup,
    logout,
    resetPassword,
  };
}
