import { Container } from '@/components/layout/Container';
import { SearchBar } from '@/components/home/SearchBar';
import { AbkhaziaMap } from '@/components/home/AbkhaziaMap';
import { PopularDestinations } from '@/components/home/PopularDestinations';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Compass,
  Palmtree,
  CheckCircle2,
  Waves,
  SunMedium,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* ========================================================= */}
      {/* 1. HERO СЕКЦИЯ: ПОИСК И ПРИВЕТСТВИЕ                       */}
      {/* ========================================================= */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-moss-50/40 via-white to-white overflow-visible z-20">
        {/* Мягкие световые градиенты на фоне (изолированный оверфлоу) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-r from-green-100/30 via-moss-100/30 to-stone-gray-100/20 blur-3xl rounded-full" />
        </div>

        <Container className="relative overflow-visible">
          <div className="text-center max-w-3xl mx-auto mb-8">
            {/* Верхний бейдж */}
            <div className="inline-flex items-center gap-2 mb-4">
              <Badge variant="moss" className="px-3.5 py-1 text-xs font-semibold">
                <SunMedium className="w-3.5 h-3.5 text-amber-600" />
                Сезон 2026: лучшее жилье в Абхазии без посредников
              </Badge>
            </div>

            {/* Главный заголовок */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-gray-900 leading-[1.12]">
              Отдых и жилье в{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-moss-600">
                Стране Души
              </span>
            </h1>

            {/* Подзаголовок */}
            <p className="mt-4 text-base sm:text-lg text-stone-gray-600 max-w-2xl mx-auto leading-relaxed">
              Квартиры на первой линии, уютные эко-коттеджи в реликтовых соснах Пицунды и аутентичные гостевые дома в горах и на побережье.
            </p>

            {/* Компактные гарантии */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-stone-gray-500">
              <span className="flex items-center gap-1.5 text-stone-gray-700">
                <ShieldCheck className="w-4 h-4 text-green-600" /> 100% проверенные хозяева
              </span>
              <span className="flex items-center gap-1.5 text-stone-gray-700">
                <Waves className="w-4 h-4 text-moss-600" /> Близко к морю
              </span>
              <span className="flex items-center gap-1.5 text-stone-gray-700">
                <Sparkles className="w-4 h-4 text-amber-500" /> Без скрытых комиссий
              </span>
            </div>
          </div>

          {/* Панель быстрого поиска */}
          <SearchBar />
        </Container>
      </section>

      {/* ========================================================= */}
      {/* 2. ЦЕНТРАЛЬНЫЙ БЛОК: ИНТЕРАКТИВНАЯ КАРТА АБХАЗИИ С ТОЧКАМИ */}
      {/* ========================================================= */}
      <section className="py-12 md:py-16 bg-white relative">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-moss-700 block mb-1">
              Навигатор по побережью
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-gray-900 tracking-tight">
              Интерактивная карта курортов
            </h2>
            <p className="mt-2 text-sm text-stone-gray-600">
              Нажмите на горячую точку любого курорта Абхазии, чтобы увидеть стартовые цены, особенности локации и доступное жилье.
            </p>
          </div>

          {/* Компонент стилизованной карты с анимированными хотспотами */}
          <AbkhaziaMap />
        </Container>
      </section>

      {/* ========================================================= */}
      {/* 3. РЕКОМЕНДУЕМЫЕ ОБЪЕКТЫ ЖИЛЬЯ                            */}
      {/* ========================================================= */}
      <FeaturedListings />

      {/* ========================================================= */}
      {/* 4. КУРОРТЫ АБХАЗИИ                                        */}
      {/* ========================================================= */}
      <PopularDestinations />

      {/* ========================================================= */}
      {/* 5. БАННЕР ДЛЯ ХОЗЯЕВ И ВЛАДЕЛЬЦЕВ НЕДВИЖИМОСТИ            */}
      {/* ========================================================= */}
      <section className="py-20 bg-white">
        <Container>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-gray-900 via-moss-900 to-stone-gray-900 text-white p-8 md:p-14 shadow-soft-lg">
            <div className="max-w-xl relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moss-600/40 text-moss-200 text-xs font-semibold mb-4 border border-moss-500/30">
                <Sparkles className="w-3.5 h-3.5 text-green-300" /> Для владельцев жилья в Абхазии
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Сдавайте жилье гостям со всей страны на ApsnyGO
              </h2>
              <p className="text-stone-gray-300 text-sm md:text-base mb-8 leading-relaxed">
                Размещайте ваши апартаменты, номера или коттеджи в Гагре, Пицунде, Новом Афоне и Сухуме. Прямая связь с туристами и удобный календарь занятости.
              </p>

              <div className="space-y-2.5 mb-8 text-sm text-stone-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  Прямой чат с гостями и прозрачные условия
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  Автоматическая синхронизация дат заезда
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  Бесплатная фотосъемка для объектов с рейтингом 4.9+
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/host">
                  <Button variant="primary" size="lg" className="bg-green-600 hover:bg-green-500 text-white shadow-green-glow">
                    Стать хозяином жилья
                  </Button>
                </Link>
                <Link href="/host-info">
                  <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Узнать больше
                  </Button>
                </Link>
              </div>
            </div>

            {/* Фоновые декорации */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <Palmtree className="w-96 h-96 text-white" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
