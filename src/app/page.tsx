import { Container } from '@/components/layout/Container';
import { SearchBar } from '@/components/home/SearchBar';
import { AbkhaziaMap } from '@/components/home/AbkhaziaMap';
import { PopularDestinations } from '@/components/home/PopularDestinations';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { AppButton } from '@/components/ui/AppButton';
import { SeasonBadge } from '@/components/ui/SeasonBadge';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { PixelDivider } from '@/components/ui/PixelDivider';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Compass,
  Palmtree,
  CheckCircle2,
  Waves,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFBF9] via-[#F5F8F5] to-[#FFFFFF] text-stone-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* ========================================================= */}
      {/* 1. HERO СЕКЦИЯ: ПОИСК И ПРИВЕТСТВИЕ                       */}
      {/* ========================================================= */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-20 overflow-visible z-20">
        {/* Точечная микро-сетка (dot grid) за формой поиска */}
        <BackgroundPattern variant="dots" />

        {/* Мягкие природные световые ауры на фоне */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[840px] h-[380px] bg-gradient-to-r from-emerald-100/35 via-moss-100/30 to-stone-100/25 blur-3xl rounded-full" />
        </div>

        <Container className="relative overflow-visible">
          <div className="text-center max-w-3xl mx-auto mb-8">
            {/* Стильный бейдж сезона 2026 с 8-битным пиксельным солнцем и шрифтом Press Start 2P */}
            <div className="inline-flex items-center justify-center mb-5">
              <SeasonBadge />
            </div>

            {/* Главный заголовок */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-gray-900 leading-[1.12]">
              Отдых и жилье в{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-moss-600">
                Стране Души
              </span>
            </h1>

            {/* Подзаголовок */}
            <p className="mt-4 text-base sm:text-lg text-stone-gray-600 max-w-2xl mx-auto leading-relaxed">
              Квартиры на первой линии, уютные эко-коттеджи в реликтовых соснах Пицунды и аутентичные гостевые дома в горах и на побережье.
            </p>

            {/* Компактные гарантии */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-stone-gray-500">
              <span className="flex items-center gap-1.5 text-stone-gray-700 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-stone-200/60 shadow-soft-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% проверенные хозяева
              </span>
              <span className="flex items-center gap-1.5 text-stone-gray-700 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-stone-200/60 shadow-soft-sm">
                <Waves className="w-4 h-4 text-teal-600" /> Близко к морю
              </span>
              <span className="flex items-center gap-1.5 text-stone-gray-700 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-stone-200/60 shadow-soft-sm">
                <Sparkles className="w-4 h-4 text-amber-500" /> Без скрытых комиссий
              </span>
            </div>
          </div>

          {/* Панель быстрого поиска */}
          <SearchBar />
        </Container>
      </section>

      {/* Декоративный пиксельный разделитель (сосна) */}
      <PixelDivider variant="pine" />

      {/* ========================================================= */}
      {/* 2. ЦЕНТРАЛЬНЫЙ БЛОК: ИНТЕРАКТИВНАЯ КАРТА АБХАЗИИ С ТОЧКАМИ */}
      {/* ========================================================= */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        {/* Топографический рельеф Кавказского хребта (векторные изогипсы) */}
        <BackgroundPattern variant="topo" opacity="opacity-[0.22]" />

        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              Навигатор по побережью
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-gray-900 tracking-tight">
              Интерактивная карта курортов
            </h2>
            <p className="mt-2 text-sm text-stone-gray-600 leading-relaxed">
              Нажмите на горячую точку любого курорта Абхазии, чтобы увидеть стартовые цены, особенности локации и доступное жилье.
            </p>
          </div>

          {/* Компонент стилизованной карты с анимированными хотспотами */}
          <AbkhaziaMap />
        </Container>
      </section>

      {/* Декоративный пиксельный разделитель (горная вершина) */}
      <PixelDivider variant="mountain" />

      {/* ========================================================= */}
      {/* 3. РЕКОМЕНДУЕМЫЕ ОБЪЕКТЫ ЖИЛЬЯ                            */}
      {/* ========================================================= */}
      <FeaturedListings />

      {/* Декоративный пиксельный разделитель (искра) */}
      <PixelDivider variant="spark" />

      {/* ========================================================= */}
      {/* 4. КУРОРТЫ АБХАЗИИ                                        */}
      {/* ========================================================= */}
      <PopularDestinations />

      {/* Декоративный пиксельный разделитель (сосна) */}
      <PixelDivider variant="pine" />

      {/* ========================================================= */}
      {/* 5. БАННЕР ДЛЯ ХОЗЯЕВ И ВЛАДЕЛЬЦЕВ НЕДВИЖИМОСТИ            */}
      {/* ========================================================= */}
      <section className="py-20 relative">
        <Container>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-gray-900 via-moss-900 to-stone-gray-900 text-white p-8 md:p-14 border border-stone-800 shadow-[0_20px_50px_-10px_rgba(20,40,30,0.35)]">
            <div className="max-w-xl relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/35 text-emerald-200 text-xs font-semibold mb-4 border border-emerald-500/30 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" /> Для владельцев жилья в Абхазии
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                Сдавайте жилье гостям со всей страны на ApsnyGO
              </h2>
              <p className="text-stone-gray-300 text-sm md:text-base mb-8 leading-relaxed">
                Размещайте ваши апартаменты, номера или коттеджи в Гагре, Пицунде, Новом Афоне и Сухуме. Прямая связь с туристами и удобный календарь занятости.
              </p>

              <div className="space-y-2.5 mb-8 text-sm text-stone-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Прямой чат с гостями и прозрачные условия
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Автоматическая синхронизация дат заезда
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Бесплатная фотосъемка для объектов с рейтингом 4.9+
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/host">
                  <AppButton variant="glow" size="lg">
                    <span>Стать хозяином жилья</span>
                    <ArrowRight className="w-4 h-4" />
                  </AppButton>
                </Link>
                <Link href="/host-info">
                  <AppButton
                    variant="glass"
                    size="lg"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
                  >
                    <span>Узнать больше</span>
                  </AppButton>
                </Link>
              </div>
            </div>

            {/* Фоновые декорации: пальмовый силуэт */}
            <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none select-none">
              <Palmtree className="w-96 h-96 text-emerald-200" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
