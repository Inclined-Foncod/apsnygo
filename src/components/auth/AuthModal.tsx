'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, translateAuthError } from '@/context/AuthContext';
import { AppButton } from '@/components/ui/AppButton';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';

export function AuthModal() {
  const {
    authModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    signIn,
    signUp,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Сброс полей при переключении режима или открытии
  useEffect(() => {
    if (authModalOpen) {
      setError(null);
      setSuccessMessage(null);
      setPassword('');
    }
  }, [authModalOpen, authModalMode]);

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && authModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [authModalOpen, closeAuthModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (authModalMode === 'signup' && !name.trim()) {
      setError('Пожалуйста, укажите ваше имя');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов');
      return;
    }

    setLoading(true);

    try {
      if (authModalMode === 'signup') {
        const { user, error: signUpError } = await signUp(name, email, password);
        if (signUpError) {
          setError(translateAuthError(signUpError));
          setLoading(false);
          return;
        }
        setSuccessMessage('Регистрация прошла успешно! Добро пожаловать в ApsnyGO.');
        setTimeout(() => {
          closeAuthModal();
        }, 1200);
      } else {
        const { user, error: signInError } = await signIn(email, password);
        if (signInError) {
          setError(translateAuthError(signInError));
          setLoading(false);
          return;
        }
        setSuccessMessage('Успешный вход! Рады видеть вас снова.');
        setTimeout(() => {
          closeAuthModal();
        }, 800);
      }
    } catch (err: any) {
      setError(translateAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Полупрозрачный оверлей с мягким размытием */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeAuthModal}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm -z-10"
            aria-hidden="true"
          />

          {/* Карточка модального окна */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-white rounded-3xl border border-stone-200/90 shadow-2xl p-6 sm:p-8 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={closeAuthModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-stone-gray-400 hover:text-stone-gray-700 hover:bg-stone-100 transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Заголовок с фирменным стилем */}
            <div className="text-center mb-6">
              <div className="relative h-10 w-28 mx-auto mb-2">
                <Image
                  src="/logo.png"
                  alt="ApsnyGO"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-stone-gray-900 tracking-tight">
                {authModalMode === 'signin' ? 'Вход в аккаунт' : 'Создание аккаунта'}
              </h2>
              <p className="text-xs text-stone-gray-500 mt-1">
                {authModalMode === 'signin'
                  ? 'Управляйте бронированиями и избранным жильем'
                  : 'Бронируйте жилье в Абхазии напрямую от хозяев'}
              </p>
            </div>

            {/* Вкладки: Вход / Регистрация с плавной анимацией */}
            <div className="relative flex p-1 mb-6 rounded-2xl bg-stone-100/80 border border-stone-200/70">
              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('signin');
                  setError(null);
                }}
                className={`relative flex-1 py-2 text-xs font-bold rounded-xl transition-colors z-10 ${
                  authModalMode === 'signin'
                    ? 'text-emerald-900'
                    : 'text-stone-gray-600 hover:text-stone-gray-900'
                }`}
              >
                {authModalMode === 'signin' && (
                  <motion.div
                    layoutId="auth-tab-pill"
                    className="absolute inset-0 bg-white rounded-xl shadow-soft-sm border border-stone-200/60 -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                Вход
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthModalMode('signup');
                  setError(null);
                }}
                className={`relative flex-1 py-2 text-xs font-bold rounded-xl transition-colors z-10 ${
                  authModalMode === 'signup'
                    ? 'text-emerald-900'
                    : 'text-stone-gray-600 hover:text-stone-gray-900'
                }`}
              >
                {authModalMode === 'signup' && (
                  <motion.div
                    layoutId="auth-tab-pill"
                    className="absolute inset-0 bg-white rounded-xl shadow-soft-sm border border-stone-200/60 -z-10"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                Регистрация
              </button>
            </div>

            {/* Сообщение об ошибке */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-700 flex items-start gap-2.5 text-xs font-medium"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </motion.div>
            )}

            {/* Сообщение об успехе */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 flex items-start gap-2.5 text-xs font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{successMessage}</span>
              </motion.div>
            )}

            {/* Форма */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Поле Имя (только при регистрации) */}
              {authModalMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider mb-1.5">
                    Ваше имя
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Аслан Бения"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border border-stone-200/90 bg-stone-50/70 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-stone-gray-900 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Поле Email */}
              <div>
                <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider mb-1.5">
                  Электронная почта
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-stone-200/90 bg-stone-50/70 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-stone-gray-900 transition-all"
                  />
                </div>
              </div>

              {/* Поле Пароль */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider">
                    Пароль
                  </label>
                  {authModalMode === 'signin' && (
                    <span className="text-[11px] text-emerald-700 font-semibold cursor-pointer hover:underline">
                      Забыли пароль?
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Не менее 6 символов"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-11 py-3 rounded-2xl border border-stone-200/90 bg-stone-50/70 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-stone-gray-900 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-gray-400 hover:text-stone-gray-600 focus:outline-none"
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Кнопка отправки */}
              <div className="pt-2">
                <AppButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full justify-center shadow-md font-semibold text-sm"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {authModalMode === 'signin' ? 'Выполняется вход...' : 'Создание аккаунта...'}
                      </span>
                    </span>
                  ) : (
                    <span>
                      {authModalMode === 'signin' ? 'Войти в аккаунт' : 'Зарегистрироваться'}
                    </span>
                  )}
                </AppButton>
              </div>
            </form>

            {/* Подвал модалки */}
            <div className="mt-6 pt-4 border-t border-stone-100 text-center">
              <p className="text-xs text-stone-gray-500">
                {authModalMode === 'signin' ? (
                  <>
                    Впервые на ApsnyGO?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthModalMode('signup')}
                      className="font-bold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300"
                    >
                      Создать аккаунт
                    </button>
                  </>
                ) : (
                  <>
                    Уже есть аккаунт?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthModalMode('signin')}
                      className="font-bold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300"
                    >
                      Войти
                    </button>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
