'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Container } from './Container';
import { NAV_LINKS } from '@/lib/constants';
import { AppButton } from '@/components/ui/AppButton';
import {
  useAuth,
  getUserDisplayName,
  getUserInitials,
} from '@/context/AuthContext';
import {
  Heart,
  Menu,
  X,
  PlusCircle,
  Sparkles,
  ChevronDown,
  User,
  Calendar,
  LogOut,
  Building,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const { user, signOut, openAuthModal } = useAuth();

  const displayName = getUserDisplayName(user);
  const initials = getUserInitials(user);

  // Закрытие выпадающего меню при клике снаружи
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-stone-200/80 shadow-[0_2px_12px_-4px_rgba(20,40,30,0.04)]">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Новый фирменный пиксельный логотип ApsnyGO */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="relative h-11 w-32 sm:h-12 sm:w-36 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="ApsnyGO"
                fill
                priority
                className="object-contain object-left"
              />
            </div>

            {/* Мягкий бейдж региона */}
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 shadow-soft-sm">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Абхазия
            </span>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-stone-gray-600 hover:text-emerald-700 transition-colors relative py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Действия справа */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/favorites"
              className="p-2.5 text-stone-gray-600 hover:text-rose-600 hover:bg-stone-100/80 rounded-xl transition-all relative hover:scale-105 active:scale-95"
              title="Избранное"
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
            </Link>

            <Link href="/host">
              <AppButton variant="glass" size="sm" className="hidden lg:inline-flex">
                <PlusCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform duration-200" />
                <span>Сдать жилье</span>
              </AppButton>
            </Link>

            {/* Авторизация / Профиль пользователя */}
            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500/50 hover:bg-stone-50/80 shadow-soft-sm transition-all focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {initials}
                  </div>
                  <span className="text-xs font-bold text-stone-gray-800 max-w-[120px] truncate">
                    {displayName}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-stone-gray-400 transition-transform duration-200 ${
                      profileDropdownOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {/* Выпадающее меню профиля */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-stone-200 shadow-xl py-2 z-50 overflow-hidden"
                    >
                      {/* Шапка меню с именем и почтой */}
                      <div className="px-4 py-3 border-b border-stone-100 bg-stone-50/60">
                        <div className="font-heading font-bold text-sm text-stone-gray-900 truncate">
                          {displayName}
                        </div>
                        <div className="text-[11px] text-stone-gray-500 truncate mt-0.5">
                          {user.email}
                        </div>
                      </div>

                      {/* Пункты меню */}
                      <div className="py-1">
                        <Link
                          href="/favorites"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-stone-gray-700 hover:text-emerald-800 hover:bg-stone-50 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-stone-gray-400" />
                          <span>Избранное</span>
                        </Link>

                        <Link
                          href="/listings"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-stone-gray-700 hover:text-emerald-800 hover:bg-stone-50 transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-stone-gray-400" />
                          <span>Мои бронирования</span>
                        </Link>

                        <Link
                          href="/host"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-stone-gray-700 hover:text-emerald-800 hover:bg-stone-50 transition-colors"
                        >
                          <Building className="w-4 h-4 text-stone-gray-400" />
                          <span>Сдать жилье</span>
                        </Link>
                      </div>

                      {/* Кнопка выхода */}
                      <div className="pt-1 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Выйти</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <AppButton
                variant="primary"
                size="sm"
                onClick={() => openAuthModal('signin')}
              >
                <span>Войти</span>
              </AppButton>
            )}
          </div>

          {/* Мобильная кнопка меню */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/favorites"
              className="p-2 text-stone-gray-600 hover:text-moss-700"
            >
              <Heart className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-gray-700 hover:text-stone-gray-950 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Выпадающее мобильное меню */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-gray-200 space-y-3 animate-in fade-in duration-200">
            {/* Блок пользователя в мобильном меню */}
            {user ? (
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-gray-900 truncate">
                      {displayName}
                    </div>
                    <div className="text-[11px] text-stone-gray-500 truncate">
                      {user.email}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                  title="Выйти"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-stone-gray-700 hover:text-green-600 hover:bg-stone-gray-50 rounded-lg"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-stone-200/80 flex flex-col gap-2">
              <Link href="/host" onClick={() => setMobileMenuOpen(false)}>
                <AppButton variant="glass" className="w-full justify-center">
                  <PlusCircle className="w-4 h-4 text-emerald-600" />
                  <span>Сдать жилье</span>
                </AppButton>
              </Link>

              {!user && (
                <AppButton
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signin');
                  }}
                >
                  <span>Войти в аккаунт</span>
                </AppButton>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
