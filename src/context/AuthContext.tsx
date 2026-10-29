'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: Error | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function translateAuthError(error: any): string {
  if (!error) return 'Произошла непредвиденная ошибка';
  const msg = typeof error === 'string' ? error : error.message || '';

  if (msg.includes('Invalid login credentials')) {
    return 'Неверный email или пароль. Проверьте введенные данные';
  }
  if (
    msg.includes('User already registered') ||
    msg.includes('already exists') ||
    msg.includes('identity_already_exists')
  ) {
    return 'Пользователь с таким email уже зарегистрирован. Пожалуйста, выполните вход';
  }
  if (msg.includes('Password should be at least')) {
    return 'Пароль должен содержать не менее 6 символов';
  }
  if (msg.includes('Email not confirmed')) {
    return 'Email не подтвержден. Проверьте почтовый ящик';
  }
  if (msg.includes('Invalid email') || msg.includes('valid email')) {
    return 'Пожалуйста, введите корректный адрес электронной почты';
  }
  if (
    msg.includes('rate limit') ||
    msg.includes('Too many requests') ||
    msg.includes('over_email_send_rate_limit')
  ) {
    return 'Слишком много попыток входа. Пожалуйста, подождите минуту перед повтором';
  }
  if (msg.includes('network') || msg.includes('Failed to fetch')) {
    return 'Ошибка соединения с сервером. Проверьте интернет-соединение';
  }
  return msg || 'Ошибка авторизации. Попробуйте еще раз';
}

export function getUserDisplayName(user: User | null): string {
  if (!user) return '';
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Гость'
  );
}

export function getUserInitials(user: User | null): string {
  if (!user) return '?';
  const name = getUserDisplayName(user).trim();
  const parts = name.split(/\s+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || '?';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Управление модальным окном
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const openAuthModal = useCallback((mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  // Инициализация сессии и слушатель изменений
  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Supabase getSession notice:', error.message);
        }
        if (isMounted) {
          setSession(data?.session ?? null);
          setUser(data?.session?.user ?? null);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    // Слушатель событий изменения состояния авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Регистрация нового пользователя
  const signUp = async (name: string, email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });

      if (error) {
        return { user: null, error };
      }

      // Если в Supabase отключено подтверждение почты, session и user создаются сразу
      if (data?.user) {
        setUser(data.user);
        if (data.session) {
          setSession(data.session);
        }
      }

      return { user: data.user, error: null };
    } catch (err: any) {
      return { user: null, error: err };
    }
  };

  // Вход пользователя
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { user: null, error };
      }

      if (data?.user) {
        setUser(data.user);
        setSession(data.session);
      }

      return { user: data.user, error: null };
    } catch (err: any) {
      return { user: null, error: err };
    }
  };

  // Выход пользователя
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      return { error };
    } catch (err: any) {
      setUser(null);
      setSession(null);
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
