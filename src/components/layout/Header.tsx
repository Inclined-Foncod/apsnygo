'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Container } from './Container';
import { NAV_LINKS } from '@/lib/constants';
import { AppButton } from '@/components/ui/AppButton';
import { Heart, Menu, X, PlusCircle, Sparkles } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-stone-200/80 shadow-[0_2px_12px_-4px_rgba(20,40,30,0.04)]">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Логотип ApsnyGO: 'Apsny' обычным шрифтом, 'GO' - стилизованная пиксельная кнопка */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="flex items-center tracking-tight">
              {/* Слово Apsny обычным элегантным шрифтом */}
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-stone-gray-900 group-hover:text-stone-gray-800 transition-colors">
                Apsny
              </span>

              {/* Стилизованная пиксельная кнопка GO */}
              <span className="ml-1.5 inline-flex items-center justify-center bg-green-600 text-white font-mono font-black text-xs sm:text-sm tracking-wider px-2 py-0.5 rounded-[3px] border-2 border-stone-gray-900 shadow-[2px_2px_0px_0px_#14532d] group-hover:shadow-[1px_1px_0px_0px_#14532d] group-hover:translate-x-[1px] group-hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
                GO
                <span className="inline-block w-1.5 h-1.5 ml-1 bg-green-200 animate-pulse rounded-full" />
              </span>
            </div>

            {/* Мягкий бейдж региона */}
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide text-moss-700 bg-moss-50 px-2 py-0.5 rounded-full border border-moss-200">
              <Sparkles className="w-3 h-3 text-moss-600" />
              Абхазия
            </span>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-stone-gray-600 hover:text-green-700 transition-colors relative py-1"
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

            <AppButton variant="primary" size="sm">
              <span>Войти</span>
            </AppButton>
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
              <AppButton variant="primary" className="w-full justify-center">
                <span>Войти в аккаунт</span>
              </AppButton>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
