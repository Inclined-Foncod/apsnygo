'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Waves,
  Mountain,
  Landmark,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export interface Hotspot {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  pctX: number; // Положение по горизонтали в %
  pctY: number; // Положение по вертикали в %
  category: 'beach' | 'mountain' | 'history';
  staysCount: number;
  startingPrice: number;
  distanceToSea: string;
  description: string;
  highlights: string[];
  image: string;
  isPopular?: boolean;
}

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'tsandripsh',
    name: 'Цандрипш',
    subtitle: 'Белые скалы и граница',
    badge: 'Белые скалы',
    pctX: 14.8,
    pctY: 30.3,
    category: 'beach',
    staysCount: 28,
    startingPrice: 2000,
    distanceToSea: '50-150 м до моря',
    description: 'Живописный поселок на границе с РФ, знаменитый мраморными Белыми скалами, чистейшей водой и спокойной атмосферой без суеты.',
    highlights: ['Белые скалы', 'Малолюдные пляжи', '5 мин от границы РФ', 'Дача Сталина «Холодная речка»'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'gagra',
    name: 'Гагра',
    subtitle: 'Старая и Новая Гагра',
    badge: 'Топ курорт',
    pctX: 20.2,
    pctY: 39.7,
    category: 'beach',
    staysCount: 185,
    startingPrice: 3000,
    distanceToSea: '1-я линия от моря',
    description: 'Самый популярный курорт Абхазии: Гагрская колоннада, замок принца Ольденбургского, Приморский парк и гора Мамдзышха, вплотную подходящая к лазурному морю.',
    highlights: ['Гагрская колоннада', 'Замок принца Ольденбургского', 'Приморский парк', 'Гора Мамдзышха (2100м)'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    isPopular: true,
  },
  {
    id: 'ritsa',
    name: 'Озеро Рица',
    subtitle: 'Высокогорный заповедник',
    badge: 'Жемчужина гор',
    pctX: 30.0,
    pctY: 18.4,
    category: 'mountain',
    staysCount: 15,
    startingPrice: 4500,
    distanceToSea: '950 м над уровнем моря',
    description: 'Легендарное бирюзовое озеро на высоте 950 м в кольце заснеженных вершин Кавказа. Рядом — Юпшарский каньон («Каменный мешок»), Голубое озеро и Гегский водопад.',
    highlights: ['Озеро Рица (950м)', 'Юпшарский каньон', 'Гегский водопад', 'Голубое озеро', 'Озеро Мзы'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80',
    isPopular: true,
  },
  {
    id: 'pitsunda',
    name: 'Пицунда',
    subtitle: 'Знаменитый сосновый мыс',
    badge: 'Реликтовые сосны',
    pctX: 23.0,
    pctY: 54.4,
    category: 'beach',
    staysCount: 112,
    startingPrice: 3500,
    distanceToSea: '100-300 м до моря',
    description: 'Заповедный мыс, глубоко вдающийся в Черное море. Роща реликтовой пицундской сосны, целебный воздух, самая прозрачная и спокойная вода в Пицундской бухте и песчаные пляжи.',
    highlights: ['Пицундская сосновая роща', 'Песчано-галечные пляжи', 'Пицундский маяк', 'Патриарший собор X века'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=80',
    isPopular: true,
  },
  {
    id: 'gudauta',
    name: 'Гудаута',
    subtitle: 'Сады, пляжи и форель',
    badge: 'Тихий отдых',
    pctX: 33.0,
    pctY: 59.5,
    category: 'beach',
    staysCount: 32,
    startingPrice: 2200,
    distanceToSea: '200 м до моря',
    description: 'Уютный курорт на широкой прибрежной равнине. Цитрусовые сады, просторные пляжи, форелевые хозяйства на горных реках и древний храм села Лыхны.',
    highlights: ['Храм в Лыхны (X век)', 'Широкие пляжи', 'Чернореченское форелевое хозяйство', 'Тихий семейный отдых'],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'new-athos',
    name: 'Новый Афон',
    subtitle: 'Монастырь и пещеры',
    badge: 'Святые места',
    pctX: 39.7,
    pctY: 61.3,
    category: 'history',
    staysCount: 64,
    startingPrice: 3200,
    distanceToSea: '300-500 м до моря',
    description: 'Духовный и культурный центр Абхазии: грандиозный Новоафонский монастырь с золотыми куполами, гигантская Новоафонская карстовая пещера, рукотворный водопад и цитадель Анакопии.',
    highlights: ['Новоафонский монастырь', 'Новоафонская пещера', 'Анакопийская крепость', 'Искусственный водопад', 'Лебединое озеро'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
    isPopular: true,
  },
  {
    id: 'sukhum',
    name: 'Сухум',
    subtitle: 'Столица Республики',
    badge: 'Столица',
    pctX: 46.8,
    pctY: 70.8,
    category: 'beach',
    staysCount: 98,
    startingPrice: 2800,
    distanceToSea: 'Набережная и море',
    description: 'Древняя столица на берегу просторной Сухумской бухты. Знаменитая Набережная Махаджиров, фонтан с грифонами, легендарная кофейня «Брехаловка», пальмовые аллеи и Ботанический сад.',
    highlights: ['Набережная Махаджиров', 'Кофейня «Брехаловка»', 'Сухумский ботанический сад', 'Театральная площадь с грифонами'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80',
    isPopular: true,
  },
  {
    id: 'kyndyg',
    name: 'Кындыг & Очамчыра',
    subtitle: 'Горячие термальные источники',
    badge: 'Термальные воды',
    pctX: 57.2,
    pctY: 88.4,
    category: 'mountain',
    staysCount: 22,
    startingPrice: 2000,
    distanceToSea: '100-300 м до моря',
    description: 'Уникальный термальный комплекс под открытым небом: каскады горячей целебной минеральной воды, природный гидромассаж, лечебные грязи и эвкалиптовые рощи.',
    highlights: ['Термальный источник Кындыг', 'Природный гидромассаж', 'Лечебные грязевые ванны', 'Эвкалиптовые рощи'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'tkuarchal',
    name: 'Ткуарчал & Акармара',
    subtitle: 'Город-призрак и водопады',
    badge: 'Экспедиции',
    pctX: 70.0,
    pctY: 77.7,
    category: 'mountain',
    staysCount: 12,
    startingPrice: 2500,
    distanceToSea: 'Горное ущелье реки Аалдзга',
    description: 'Живописный город в горном амфитеатре и шахтерский поселок Акармара с ампирной архитектурой. Рядом грохочут высочайшие водопады Абхазии: Великан (100м), Ирина и Святой.',
    highlights: ['Водопад Великан (100м)', 'Акармара', 'Водопады Ирина и Святой', 'Пещера Абрскила в Отапе'],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80',
  },
];

export function AbkhaziaMap() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'beach' | 'mountain' | 'history'>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(HOTSPOTS[1]); // По умолчанию Гагра
  const [is3DMode, setIs3DMode] = useState<boolean>(true);

  const filteredHotspots = HOTSPOTS.filter(
    (h) => activeCategory === 'all' || h.category === activeCategory
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* ========================================================= */}
      {/* ВЕРХНЯЯ ПАНЕЛЬ: ФИЛЬТРЫ И ПЕРЕКЛЮЧАТЕЛЬ 3D                */}
      {/* ========================================================= */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Badge variant="moss" className="px-3.5 py-1.5 font-semibold text-xs gap-1.5 bg-moss-50 border-moss-200 text-moss-800">
            <Compass className="w-3.5 h-3.5 text-moss-600" />
            Точная географическая карта Абхазии
          </Badge>
          <span className="text-xs text-stone-gray-500 hidden sm:inline">
            Береговая линия от р. Псоу до р. Ингур
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Категории */}
          <div className="flex items-center bg-stone-gray-100 p-1 rounded-2xl border border-stone-gray-200 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-white text-stone-gray-900 shadow-soft-sm'
                  : 'text-stone-gray-600 hover:text-stone-gray-900'
              }`}
            >
              Все места ({HOTSPOTS.length})
            </button>
            <button
              onClick={() => setActiveCategory('beach')}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1 transition-all ${
                activeCategory === 'beach'
                  ? 'bg-white text-green-700 shadow-soft-sm'
                  : 'text-stone-gray-600 hover:text-green-700'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-green-600" />
              Пляжи
            </button>
            <button
              onClick={() => setActiveCategory('mountain')}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1 transition-all ${
                activeCategory === 'mountain'
                  ? 'bg-white text-moss-700 shadow-soft-sm'
                  : 'text-stone-gray-600 hover:text-moss-700'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-moss-600" />
              Горы и озера
            </button>
            <button
              onClick={() => setActiveCategory('history')}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1 transition-all ${
                activeCategory === 'history'
                  ? 'bg-white text-amber-800 shadow-soft-sm'
                  : 'text-stone-gray-600 hover:text-amber-800'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-amber-700" />
              История
            </button>
          </div>

          {/* Переключатель 3D Рельефа */}
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              is3DMode
                ? 'bg-moss-700 text-white border-moss-700 shadow-soft-sm'
                : 'bg-white text-stone-gray-700 border-stone-gray-200 hover:border-moss-400'
            }`}
            title="Переключить 3D изометрический наклон"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3D Рельеф</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* КАРТА: SVG ГЕОГРАФИЯ С 3D-ОБЪЕМОМ И ИЗОМЕТРИЕЙ           */}
      {/* ========================================================= */}
      <div className="relative bg-gradient-to-b from-[#FAFBF9] via-white to-[#F2F5F0] rounded-3xl border-2 border-stone-gray-200/90 shadow-soft-lg p-3 sm:p-6 overflow-hidden">
        {/* Фоновая текстура */}
        <div className="absolute inset-0 bg-[radial-gradient(#586f3e_0.75px,transparent_0.75px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        {/* Географические надписи */}
        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 select-none pointer-events-none">
          <Waves className="w-5 h-5 text-sky-500 animate-pulse" />
          <div>
            <span className="font-heading uppercase tracking-widest text-xs font-extrabold text-sky-800/80 block">
              Чёрное море (Амшын Еиқәа)
            </span>
            <span className="text-[10px] text-sky-600/70 font-medium">
              Побережье Абхазии • 214 км береговой линии
            </span>
          </div>
        </div>

        <div className="absolute top-6 right-8 z-10 select-none pointer-events-none text-right">
          <span className="font-heading uppercase tracking-widest text-[11px] font-bold text-stone-gray-500 block">
            Главный Кавказский Хребет
          </span>
          <span className="text-[10px] text-stone-gray-400 font-medium">
            Северная граница • Горы до 4 046 м
          </span>
        </div>

        {/* Интерактивный видовой контейнер (с полу-3D перспективой) */}
        <div
          className={`relative w-full aspect-[1000/650] min-h-[460px] sm:min-h-[540px] max-h-[640px] transition-transform duration-700 ease-out ${
            is3DMode
              ? '[perspective:1200px] [transform-style:preserve-3d] hover:[transform:rotateX(6deg)_translateY(-4px)]'
              : ''
          }`}
        >
          <svg
            viewBox="0 0 1000 650"
            className="w-full h-full select-none overflow-visible drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Градиент шельфовых прибрежных вод */}
              <linearGradient id="black-sea-shelf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#7DD3FC" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.25" />
              </linearGradient>

              {/* Градиент территории Абхазии */}
              <linearGradient id="abkhazia-land-grad" x1="20%" y1="90%" x2="70%" y2="10%">
                <stop offset="0%" stopColor="#E2F2D9" />
                <stop offset="35%" stopColor="#CDE7C1" />
                <stop offset="70%" stopColor="#B3DAA2" />
                <stop offset="100%" stopColor="#8DAF77" />
              </linearGradient>

              {/* 3D тень подложки */}
              <filter id="abkhazia-3d-shadow" x="-5%" y="-5%" width="120%" height="125%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#223315" floodOpacity="0.22" />
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1a2610" floodOpacity="0.3" />
              </filter>

              {/* Градиенты граней гор */}
              <linearGradient id="mountain-lit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#E6EDE1" />
                <stop offset="100%" stopColor="#BDCEB2" />
              </linearGradient>

              <linearGradient id="mountain-shade-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9BB58B" />
                <stop offset="100%" stopColor="#51693D" />
              </linearGradient>

              {/* Озеро Рица */}
              <radialGradient id="ritsa-lake-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="60%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </radialGradient>
            </defs>

            {/* Шельфовая морская зона */}
            <path
              d="M 120,180 C 160,220 190,260 215,280 C 230,300 220,380 250,400 C 300,420 340,430 380,440 C 440,450 460,455 510,500 C 550,540 580,620 620,630 C 680,640 730,680 770,720 L 770,750 L 100,750 L 100,180 Z"
              fill="url(#black-sea-shelf)"
              opacity="0.6"
            />

            {/* Мягкие концентрические волны */}
            <path
              d="M 130,210 Q 180,270 210,320 T 240,400 T 350,445 T 480,515 T 600,645"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="3"
              strokeDasharray="8 12"
              opacity="0.8"
            />

            {/* 3D ПОДЛОЖКА (БОКОВОЙ СРЕЗ ЗЕМЛИ) */}
            <g transform="translate(0, 8)" opacity="0.65">
              <path
                d="M 202.6 35 L 216.5 38.5 L 220 43.7 L 227.7 38.5 L 236.4 47.1 L 262.4 51.4 L 264.1 57.5 L 266.7 51.4 L 277.1 54.9 L 294.4 53.2 L 295.3 58.4 L 285.7 59.2 L 293.5 62.7 L 286.6 67.9 L 286.6 72.2 L 291.8 76.6 L 297.9 73.1 L 297.9 66.2 L 317.8 69.6 L 329.9 61.8 L 332.5 54.9 L 342.9 54 L 352.4 46.3 L 359.3 54 L 363.7 54 L 361.9 60.1 L 380.1 63.6 L 394 76.6 L 404.3 78.3 L 413.9 84.3 L 426.9 83.5 L 430.3 86.1 L 434.6 82.6 L 436.4 93 L 441.6 98.2 L 437.2 99.1 L 446.8 102.5 L 447.6 113.8 L 453.7 114.6 L 455.4 118.1 L 456.3 114.6 L 462.3 116.4 L 474.5 110.3 L 489.2 129.4 L 492.6 127.6 L 497 132 L 507.4 133.7 L 511.7 131.1 L 509.1 128.5 L 511.7 125 L 517.7 128.5 L 528.1 124.2 L 531.6 134.6 L 550.6 135.4 L 561 147.5 L 566.2 143.2 L 571.4 144.9 L 575.7 157.1 L 588.7 156.2 L 588.7 151.9 L 594.8 153.6 L 601.7 147.5 L 605.2 137.1 L 606 141.5 L 610.4 138.9 L 610.4 144.1 L 617.3 138.9 L 626.8 170.9 L 632 173.5 L 638.9 170.9 L 650.2 184.8 L 654.5 183.9 L 655.4 188.2 L 668.4 190 L 673.6 200.3 L 681.4 200.3 L 681.4 206.4 L 691.7 209.9 L 694.3 215.1 L 696.1 212.5 L 700.4 215.1 L 709.9 205.5 L 716.9 215.1 L 722 216.8 L 734.2 202.9 L 748.9 215.9 L 754.9 214.2 L 761 223.7 L 769.7 216.8 L 772.3 219.4 L 779.2 217.7 L 783.5 209 L 781.8 204.7 L 792.2 199.5 L 795.6 210.7 L 809.5 212.5 L 817.3 222.9 L 820.7 217.7 L 832.9 218.5 L 837.2 215.1 L 845.8 227.2 L 849.3 226.3 L 848.4 229.8 L 857.1 226.3 L 858.8 222 L 870.1 222.9 L 875.3 228.9 L 880.5 227.2 L 877.9 235.8 L 880.5 238.4 L 881.3 234.1 L 881.3 240.2 L 875.3 259.2 L 850.2 297.3 L 841.5 304.2 L 796.5 319.8 L 791.3 331.9 L 786.1 331.1 L 800 338.9 L 800 359.6 L 803.4 366.6 L 800.8 364.8 L 799.1 368.3 L 812.9 372.6 L 810.3 374.3 L 810.3 384.7 L 801.7 384.7 L 800.8 381.3 L 793.9 385.6 L 795.6 391.7 L 787.8 389.9 L 782.6 392.5 L 790.4 393.4 L 786.1 396.9 L 787.8 402.9 L 793 402 L 793.9 415.9 L 798.2 422 L 795.6 428 L 800 430.6 L 794.8 440.1 L 807.7 467 L 806 465.2 L 804.3 468.7 L 809.5 470.4 L 808.6 476.5 L 812.1 477.4 L 813.8 495.5 L 812.1 491.2 L 810.3 495.5 L 813.8 499 L 806.9 500.7 L 813.8 501.6 L 812.9 504.2 L 783.5 529.3 L 772.3 547.5 L 743.7 565.7 L 717.7 575.2 L 711.7 583 L 710.8 592.5 L 708.2 585.6 L 705.6 589 L 708.2 591.6 L 705.6 600.3 L 710.8 599.4 L 707.3 604.6 L 679.6 615 L 671.8 615 L 677 609.8 L 669.2 608.9 L 663.2 545.7 L 659.7 540.6 L 661.4 536.2 L 658.9 536.2 L 658.9 522.4 L 657.1 519.8 L 656.3 522.4 L 652.8 511.1 L 656.3 506.8 L 651.1 503.3 L 652.8 500.7 L 647.6 492.1 L 645.9 478.2 L 640.7 472.2 L 649.3 467 L 650.2 459.2 L 637.2 455.7 L 632.9 461.8 L 623.4 447.9 L 621.6 452.3 L 613 445.3 L 570.6 430.6 L 580.1 428 L 577.5 422 L 592.2 422.8 L 590.5 421.1 L 593.9 420.2 L 587 410.7 L 583.5 410.7 L 579.2 417.6 L 574 417.6 L 580.1 420.2 L 568 422.8 L 556.7 418.5 L 548 422 L 548.9 417.6 L 545.4 421.1 L 536.8 419.4 L 535.9 422.8 L 529 422.8 L 514.3 403.8 L 509.1 390.8 L 508.2 370.9 L 505.6 370.9 L 506.5 363.1 L 502.2 354.4 L 504.8 348.4 L 488.3 325 L 486.6 315.5 L 480.5 312 L 474.5 313.7 L 469.3 325 L 472.7 325.9 L 468.4 327.6 L 467.5 316.3 L 462.3 319.8 L 449.4 317.2 L 449.4 312 L 445.9 310.3 L 445.9 314.6 L 440.7 308.6 L 445 306.8 L 434.6 298.2 L 435.5 293.8 L 457.1 293 L 470.1 297.3 L 475.3 293 L 490.9 293.8 L 490.9 284.3 L 474.5 285.2 L 471 281.7 L 465.8 286 L 461.5 281.7 L 457.1 289.5 L 454.6 281.7 L 444.2 285.2 L 435.5 282.6 L 425.1 284.3 L 413.9 280 L 413.9 273.9 L 408.7 270.5 L 399.1 273.9 L 396.6 279.1 L 399.1 285.2 L 370.6 283.4 L 375.8 282.6 L 369.7 280 L 373.2 278.3 L 368 271.3 L 362.8 270.5 L 354.1 274.8 L 358.5 276.5 L 355 280 L 343.7 278.3 L 344.6 275.7 L 336 278.3 L 331.6 281.7 L 331.6 286.9 L 326.4 286.9 L 326.4 280.9 L 329.9 279.1 L 325.6 276.5 L 322.1 277.4 L 324.7 280 L 323 286.9 L 318.6 281.7 L 315.2 289.5 L 312.6 282.6 L 311.7 286.9 L 297.9 288.6 L 297.9 280.9 L 292.7 289.5 L 290.1 280 L 285.7 286.9 L 286.6 278.3 L 290.9 278.3 L 294.4 283.4 L 296.1 279.1 L 303.9 279.1 L 304.8 285.2 L 307.4 279.1 L 313.4 279.1 L 315.2 283.4 L 322.1 278.3 L 309.1 258.3 L 308.3 262.7 L 298.7 256.6 L 284 254.9 L 278 247.1 L 270.2 247.1 L 263.2 239.3 L 260.6 241 L 263.2 244.5 L 253.7 241.9 L 245.9 245.4 L 239 237.6 L 229.5 238.4 L 229.5 241 L 221.7 234.1 L 220 235.8 L 216.5 228.9 L 214.8 231.5 L 211.3 210.7 L 213 200.3 L 210.4 202.1 L 212.2 192.6 L 209.6 189.1 L 211.3 183 L 213.9 183.9 L 213.9 173.5 L 207 166.6 L 207 169.2 L 201.8 168.3 L 197.4 164 L 192.3 162.3 L 190.5 164.9 L 181.9 161.4 L 183.6 158.8 L 169.7 155.3 L 157.6 146.7 L 162 145.8 L 147.2 128.5 L 136.9 131.1 L 133.4 138 L 131.7 132 L 136 131.1 L 127.3 125 L 119.5 124.2 L 122.1 116.4 L 118.7 114.6 L 129.1 105.1 L 129.1 92.1 L 129.9 94.7 L 132.5 93 L 137.7 74.8 L 149 65.3 L 149 48 L 153.3 43.7 L 164.6 46.3 L 170.6 41.1 L 193.1 41.1 L 202.6 35 Z"
                fill="#3F522C"
                filter="url(#abkhazia-3d-shadow)"
              />
            </g>

            {/* ОСНОВНАЯ ТЕРРИТОРИЯ АБХАЗИИ (РЕАЛЬНЫЙ SVG-КОНТУР) */}
            <path
              d="M 202.6 35 L 216.5 38.5 L 220 43.7 L 227.7 38.5 L 236.4 47.1 L 262.4 51.4 L 264.1 57.5 L 266.7 51.4 L 277.1 54.9 L 294.4 53.2 L 295.3 58.4 L 285.7 59.2 L 293.5 62.7 L 286.6 67.9 L 286.6 72.2 L 291.8 76.6 L 297.9 73.1 L 297.9 66.2 L 317.8 69.6 L 329.9 61.8 L 332.5 54.9 L 342.9 54 L 352.4 46.3 L 359.3 54 L 363.7 54 L 361.9 60.1 L 380.1 63.6 L 394 76.6 L 404.3 78.3 L 413.9 84.3 L 426.9 83.5 L 430.3 86.1 L 434.6 82.6 L 436.4 93 L 441.6 98.2 L 437.2 99.1 L 446.8 102.5 L 447.6 113.8 L 453.7 114.6 L 455.4 118.1 L 456.3 114.6 L 462.3 116.4 L 474.5 110.3 L 489.2 129.4 L 492.6 127.6 L 497 132 L 507.4 133.7 L 511.7 131.1 L 509.1 128.5 L 511.7 125 L 517.7 128.5 L 528.1 124.2 L 531.6 134.6 L 550.6 135.4 L 561 147.5 L 566.2 143.2 L 571.4 144.9 L 575.7 157.1 L 588.7 156.2 L 588.7 151.9 L 594.8 153.6 L 601.7 147.5 L 605.2 137.1 L 606 141.5 L 610.4 138.9 L 610.4 144.1 L 617.3 138.9 L 626.8 170.9 L 632 173.5 L 638.9 170.9 L 650.2 184.8 L 654.5 183.9 L 655.4 188.2 L 668.4 190 L 673.6 200.3 L 681.4 200.3 L 681.4 206.4 L 691.7 209.9 L 694.3 215.1 L 696.1 212.5 L 700.4 215.1 L 709.9 205.5 L 716.9 215.1 L 722 216.8 L 734.2 202.9 L 748.9 215.9 L 754.9 214.2 L 761 223.7 L 769.7 216.8 L 772.3 219.4 L 779.2 217.7 L 783.5 209 L 781.8 204.7 L 792.2 199.5 L 795.6 210.7 L 809.5 212.5 L 817.3 222.9 L 820.7 217.7 L 832.9 218.5 L 837.2 215.1 L 845.8 227.2 L 849.3 226.3 L 848.4 229.8 L 857.1 226.3 L 858.8 222 L 870.1 222.9 L 875.3 228.9 L 880.5 227.2 L 877.9 235.8 L 880.5 238.4 L 881.3 234.1 L 881.3 240.2 L 875.3 259.2 L 850.2 297.3 L 841.5 304.2 L 796.5 319.8 L 791.3 331.9 L 786.1 331.1 L 800 338.9 L 800 359.6 L 803.4 366.6 L 800.8 364.8 L 799.1 368.3 L 812.9 372.6 L 810.3 374.3 L 810.3 384.7 L 801.7 384.7 L 800.8 381.3 L 793.9 385.6 L 795.6 391.7 L 787.8 389.9 L 782.6 392.5 L 790.4 393.4 L 786.1 396.9 L 787.8 402.9 L 793 402 L 793.9 415.9 L 798.2 422 L 795.6 428 L 800 430.6 L 794.8 440.1 L 807.7 467 L 806 465.2 L 804.3 468.7 L 809.5 470.4 L 808.6 476.5 L 812.1 477.4 L 813.8 495.5 L 812.1 491.2 L 810.3 495.5 L 813.8 499 L 806.9 500.7 L 813.8 501.6 L 812.9 504.2 L 783.5 529.3 L 772.3 547.5 L 743.7 565.7 L 717.7 575.2 L 711.7 583 L 710.8 592.5 L 708.2 585.6 L 705.6 589 L 708.2 591.6 L 705.6 600.3 L 710.8 599.4 L 707.3 604.6 L 679.6 615 L 671.8 615 L 677 609.8 L 669.2 608.9 L 663.2 545.7 L 659.7 540.6 L 661.4 536.2 L 658.9 536.2 L 658.9 522.4 L 657.1 519.8 L 656.3 522.4 L 652.8 511.1 L 656.3 506.8 L 651.1 503.3 L 652.8 500.7 L 647.6 492.1 L 645.9 478.2 L 640.7 472.2 L 649.3 467 L 650.2 459.2 L 637.2 455.7 L 632.9 461.8 L 623.4 447.9 L 621.6 452.3 L 613 445.3 L 570.6 430.6 L 580.1 428 L 577.5 422 L 592.2 422.8 L 590.5 421.1 L 593.9 420.2 L 587 410.7 L 583.5 410.7 L 579.2 417.6 L 574 417.6 L 580.1 420.2 L 568 422.8 L 556.7 418.5 L 548 422 L 548.9 417.6 L 545.4 421.1 L 536.8 419.4 L 535.9 422.8 L 529 422.8 L 514.3 403.8 L 509.1 390.8 L 508.2 370.9 L 505.6 370.9 L 506.5 363.1 L 502.2 354.4 L 504.8 348.4 L 488.3 325 L 486.6 315.5 L 480.5 312 L 474.5 313.7 L 469.3 325 L 472.7 325.9 L 468.4 327.6 L 467.5 316.3 L 462.3 319.8 L 449.4 317.2 L 449.4 312 L 445.9 310.3 L 445.9 314.6 L 440.7 308.6 L 445 306.8 L 434.6 298.2 L 435.5 293.8 L 457.1 293 L 470.1 297.3 L 475.3 293 L 490.9 293.8 L 490.9 284.3 L 474.5 285.2 L 471 281.7 L 465.8 286 L 461.5 281.7 L 457.1 289.5 L 454.6 281.7 L 444.2 285.2 L 435.5 282.6 L 425.1 284.3 L 413.9 280 L 413.9 273.9 L 408.7 270.5 L 399.1 273.9 L 396.6 279.1 L 399.1 285.2 L 370.6 283.4 L 375.8 282.6 L 369.7 280 L 373.2 278.3 L 368 271.3 L 362.8 270.5 L 354.1 274.8 L 358.5 276.5 L 355 280 L 343.7 278.3 L 344.6 275.7 L 336 278.3 L 331.6 281.7 L 331.6 286.9 L 326.4 286.9 L 326.4 280.9 L 329.9 279.1 L 325.6 276.5 L 322.1 277.4 L 324.7 280 L 323 286.9 L 318.6 281.7 L 315.2 289.5 L 312.6 282.6 L 311.7 286.9 L 297.9 288.6 L 297.9 280.9 L 292.7 289.5 L 290.1 280 L 285.7 286.9 L 286.6 278.3 L 290.9 278.3 L 294.4 283.4 L 296.1 279.1 L 303.9 279.1 L 304.8 285.2 L 307.4 279.1 L 313.4 279.1 L 315.2 283.4 L 322.1 278.3 L 309.1 258.3 L 308.3 262.7 L 298.7 256.6 L 284 254.9 L 278 247.1 L 270.2 247.1 L 263.2 239.3 L 260.6 241 L 263.2 244.5 L 253.7 241.9 L 245.9 245.4 L 239 237.6 L 229.5 238.4 L 229.5 241 L 221.7 234.1 L 220 235.8 L 216.5 228.9 L 214.8 231.5 L 211.3 210.7 L 213 200.3 L 210.4 202.1 L 212.2 192.6 L 209.6 189.1 L 211.3 183 L 213.9 183.9 L 213.9 173.5 L 207 166.6 L 207 169.2 L 201.8 168.3 L 197.4 164 L 192.3 162.3 L 190.5 164.9 L 181.9 161.4 L 183.6 158.8 L 169.7 155.3 L 157.6 146.7 L 162 145.8 L 147.2 128.5 L 136.9 131.1 L 133.4 138 L 131.7 132 L 136 131.1 L 127.3 125 L 119.5 124.2 L 122.1 116.4 L 118.7 114.6 L 129.1 105.1 L 129.1 92.1 L 129.9 94.7 L 132.5 93 L 137.7 74.8 L 149 65.3 L 149 48 L 153.3 43.7 L 164.6 46.3 L 170.6 41.1 L 193.1 41.1 L 202.6 35 Z"
              fill="url(#abkhazia-land-grad)"
              stroke="#5D7C45"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Лесной холмистый пояс */}
            <path
              d="M 195,140 Q 240,110 320,130 T 480,170 T 640,240 T 780,310 T 870,410"
              fill="none"
              stroke="#6F9254"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* 3D ГОРНЫЕ ВЕРШИНЫ КАВКАЗА С БЕЛЫМИ ШАПКАМИ */}
            <g id="caucasus-mountains-3d" className="pointer-events-none select-none">
              {/* Мамдзышха (2100м над Гагрой) */}
              <g transform="translate(230, 215)">
                <polygon points="12,0 24,24 12,24" fill="url(#mountain-shade-grad)" />
                <polygon points="12,0 0,24 12,24" fill="url(#mountain-lit-grad)" />
                <polygon points="12,0 16,8 12,9 8,8" fill="#FFFFFF" />
              </g>

              {/* Арабика (2656м) */}
              <g transform="translate(270, 155)">
                <polygon points="16,0 32,32 16,32" fill="url(#mountain-shade-grad)" />
                <polygon points="16,0 0,32 16,32" fill="url(#mountain-lit-grad)" />
                <polygon points="16,0 22,11 16,12 10,11" fill="#FFFFFF" />
              </g>

              {/* Агепста (3256м) над Рицей */}
              <g transform="translate(315, 80)">
                <polygon points="20,0 40,38 20,38" fill="url(#mountain-shade-grad)" />
                <polygon points="20,0 0,38 20,38" fill="url(#mountain-lit-grad)" />
                <polygon points="20,0 27,13 20,15 13,13" fill="#FFFFFF" />
              </g>

              {/* Пшегишхва */}
              <g transform="translate(345, 95)">
                <polygon points="15,0 30,28 15,28" fill="url(#mountain-shade-grad)" />
                <polygon points="15,0 0,28 15,28" fill="url(#mountain-lit-grad)" />
                <polygon points="15,0 20,10 15,11 10,10" fill="#FFFFFF" />
              </g>

              {/* Бзыбский хребет */}
              <g transform="translate(385, 175)">
                <polygon points="14,0 28,26 14,26" fill="url(#mountain-shade-grad)" />
                <polygon points="14,0 0,26 14,26" fill="url(#mountain-lit-grad)" />
                <polygon points="14,0 19,9 14,10 9,9" fill="#FFFFFF" />
              </g>

              {/* Центральный Кавказ (Чха / Авадхара) */}
              <g transform="translate(450, 130)">
                <polygon points="22,0 44,40 22,40" fill="url(#mountain-shade-grad)" />
                <polygon points="22,0 0,40 22,40" fill="url(#mountain-lit-grad)" />
                <polygon points="22,0 30,14 22,16 14,14" fill="#FFFFFF" />
              </g>

              {/* Анакопийская гора */}
              <g transform="translate(420, 320)">
                <polygon points="10,0 20,18 10,18" fill="url(#mountain-shade-grad)" />
                <polygon points="10,0 0,18 10,18" fill="url(#mountain-lit-grad)" />
              </g>

              {/* Кодорский хребет */}
              <g transform="translate(560, 220)">
                <polygon points="18,0 36,34 18,34" fill="url(#mountain-shade-grad)" />
                <polygon points="18,0 0,34 18,34" fill="url(#mountain-lit-grad)" />
                <polygon points="18,0 24,12 18,13 12,12" fill="#FFFFFF" />
              </g>

              <g transform="translate(615, 250)">
                <polygon points="20,0 40,36 20,36" fill="url(#mountain-shade-grad)" />
                <polygon points="20,0 0,36 20,36" fill="url(#mountain-lit-grad)" />
                <polygon points="20,0 27,13 20,14 13,13" fill="#FFFFFF" />
              </g>

              {/* Горы Ткуарчала и Акармары */}
              <g transform="translate(730, 410)">
                <polygon points="16,0 32,30 16,30" fill="url(#mountain-shade-grad)" />
                <polygon points="16,0 0,30 16,30" fill="url(#mountain-lit-grad)" />
                <polygon points="16,0 22,10 16,11 10,10" fill="#FFFFFF" />
              </g>
            </g>

            {/* РЕКИ И ОЗЕРА */}
            {/* Озеро Рица */}
            <g transform="translate(296, 116)" className="animate-pulse">
              <ellipse cx="6" cy="4" rx="10" ry="5" fill="url(#ritsa-lake-grad)" stroke="#E0F2FE" strokeWidth="1.5" />
            </g>

            {/* Озеро Мзы */}
            <ellipse cx="282" cy="98" rx="4" ry="2.5" fill="#0284C7" opacity="0.85" />

            {/* Река Бзыбь */}
            <path
              d="M 390,140 Q 340,150 300,160 T 260,240 T 235,320 T 228,348"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Река Кодор */}
            <path
              d="M 720,290 Q 640,330 580,410 T 520,490 T 505,530"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Река Гумиста */}
            <path
              d="M 470,360 Q 460,400 455,445"
              fill="none"
              stroke="#0284C7"
              strokeWidth="1.5"
              opacity="0.7"
            />

            {/* Река Ингур */}
            <path
              d="M 870,480 Q 820,560 780,610"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              opacity="0.8"
            />

            {/* Сухумское шоссе */}
            <path
              d="M 148,197 C 175,225 195,250 202,258 C 215,275 224,320 228,350 C 255,360 295,375 330,386 C 365,390 385,395 397,399 C 435,425 455,445 468,460 C 490,485 540,540 572,574 C 600,580 625,582 631,583 C 670,550 690,520 700,505"
              fill="none"
              stroke="#EAB308"
              strokeWidth="1.8"
              strokeDasharray="4 3"
              opacity="0.75"
            />
          </svg>

          {/* ИНТЕРАКТИВНЫЕ HOTSPOTS */}
          {filteredHotspots.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;

            return (
              <div
                key={hotspot.id}
                style={{
                  left: `${hotspot.pctX}%`,
                  top: `${hotspot.pctY}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                onClick={() => setSelectedHotspot(hotspot)}
                onMouseEnter={() => setSelectedHotspot(hotspot)}
              >
                {/* Пульсирующая волна радарного сигнала */}
                <span
                  className={`absolute -inset-3.5 rounded-full opacity-70 animate-ping transition-all ${
                    isSelected
                      ? 'bg-green-500 duration-1000'
                      : 'bg-moss-500 group-hover:bg-green-500 duration-1000'
                  }`}
                />

                {/* Внешний объемный 3D-маркер */}
                <div
                  className={`relative flex items-center justify-center transition-all duration-300 rounded-full select-none ${
                    isSelected
                      ? 'w-8 h-8 bg-white shadow-green-glow ring-4 ring-green-600/35 scale-110'
                      : 'w-6 h-6 bg-white shadow-soft group-hover:scale-125 border-2 border-moss-700'
                  }`}
                >
                  <div
                    className={`rounded-full transition-all ${
                      isSelected
                        ? 'w-4 h-4 bg-green-600 animate-pulse'
                        : 'w-3 h-3 bg-moss-700 group-hover:bg-green-600'
                    }`}
                  />
                </div>

                {/* Информационный чип-плашка с ценой */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap transition-all duration-200 pointer-events-none ${
                    isSelected
                      ? 'opacity-100 translate-y-0 scale-105 z-30'
                      : 'opacity-90 group-hover:opacity-100 translate-y-0.5'
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border shadow-soft-sm transition-all ${
                      isSelected
                        ? 'bg-stone-gray-950 text-white border-stone-gray-900 shadow-moss-glow'
                        : 'bg-white/95 backdrop-blur-md text-stone-gray-900 border-stone-gray-200 group-hover:border-moss-500'
                    }`}
                  >
                    <span>{hotspot.name}</span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-lg ${
                        isSelected
                          ? 'bg-green-600 text-white'
                          : 'bg-stone-gray-100 text-stone-gray-700'
                      }`}
                    >
                      от {hotspot.startingPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ДЕТАЛЬНАЯ ПРЕВЬЮ-КАРТОЧКА ВЫБРАННОГО КУРОРТА */}
        <div className="mt-6 pt-6 border-t border-stone-gray-200">
          <div className="bg-white rounded-3xl border border-stone-gray-200/90 p-5 sm:p-6 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6 transition-all">
            {/* Фото курорта */}
            <div className="relative w-full md:w-64 h-44 rounded-2xl overflow-hidden shrink-0 bg-stone-gray-100 border border-stone-gray-200">
              <Image
                src={selectedHotspot.image}
                alt={selectedHotspot.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="moss" className="bg-moss-900/90 text-white border-none text-[11px] font-bold backdrop-blur-md">
                  {selectedHotspot.badge}
                </Badge>
              </div>

              {selectedHotspot.isPopular && (
                <div className="absolute bottom-3 left-3">
                  <Badge variant="green" className="bg-green-600/90 text-white border-none text-[10px] font-semibold backdrop-blur-md">
                    Популярное направление
                  </Badge>
                </div>
              )}
            </div>

            {/* Описание */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="flex items-center gap-1 text-xs font-bold text-moss-700">
                  <MapPin className="w-3.5 h-3.5 text-moss-600" />
                  {selectedHotspot.distanceToSea}
                </span>
                <span className="text-stone-gray-300">•</span>
                <span className="text-xs font-semibold text-stone-gray-500">
                  {selectedHotspot.staysCount} проверенных объектов
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-stone-gray-900">
                  {selectedHotspot.name}
                </h3>
                <span className="text-xs text-stone-gray-400 font-medium">
                  ({selectedHotspot.subtitle})
                </span>
              </div>

              <p className="text-sm text-stone-gray-600 mb-4 leading-relaxed">
                {selectedHotspot.description}
              </p>

              {/* Теги фишек */}
              <div className="flex flex-wrap gap-2">
                {selectedHotspot.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-gray-700 bg-stone-gray-50 px-3 py-1.5 rounded-xl border border-stone-gray-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Цена и кнопка */}
            <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-stone-gray-100">
              <div className="text-left md:text-right">
                <span className="text-[11px] uppercase tracking-wider text-stone-gray-400 block font-bold">
                  Жилье от
                </span>
                <span className="font-heading font-extrabold text-3xl text-stone-gray-900">
                  {selectedHotspot.startingPrice.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-xs text-stone-gray-500 block">/ сутки</span>
              </div>

              <Link href={`/listings?city=${encodeURIComponent(selectedHotspot.name.split(' ')[0])}`}>
                <Button variant="primary" size="lg" className="gap-2 shadow-green-glow">
                  <span>Смотреть жилье</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
