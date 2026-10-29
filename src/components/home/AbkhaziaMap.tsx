'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { AppButton } from '@/components/ui/AppButton';
import {
  MapPin,
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export interface Hotspot {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  pctX: number; // Положение X в % (viewBox 0..1024)
  pctY: number; // Положение Y в % (viewBox 0..571)
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
    subtitle: 'Белые скалы и граница РФ',
    badge: 'Белые скалы',
    pctX: 13.0,
    pctY: 24.2,
    category: 'beach',
    staysCount: 28,
    startingPrice: 2000,
    distanceToSea: '50-100 м до моря',
    description: 'Уютный приморский поселок всего в 5 км от границы с Россией. Главная визитная карточка — уникальный природный пляж «Белые скалы» с белыми известняковыми утесами и чистейшей лазурной морской водой.',
    highlights: ['Пляж «Белые скалы»', 'Малолюдные чистые пляжи', '5 минут от границы', 'Дача Сталина «Холодная речка»'],
    image: '/images/destinations/tsandripsh.jpg',
  },
  {
    id: 'gagra',
    name: 'Гагра',
    subtitle: 'Старая и Новая Гагра',
    badge: 'Топ курорт',
    pctX: 18.5,
    pctY: 29.5,
    category: 'beach',
    staysCount: 185,
    startingPrice: 3000,
    distanceToSea: '1-я линия у моря',
    description: 'Жемчужина абхазского побережья. Знаменитая Гагрская колоннада, ресторан Гагрипш с легендарными часами, замок принца Ольденбургского, Приморский парк и гора Мамдзышха.',
    highlights: ['Ресторан «Гагрипш»', 'Гагрская колоннада', 'Замок принца Ольденбургского', 'Гора Мамдзышха (2100м)'],
    image: '/images/destinations/gagra.jpg',
    isPopular: true,
  },
  {
    id: 'ritsa',
    name: 'Озеро Рица',
    subtitle: 'Высокогорный реликтовый заповедник',
    badge: 'Горная жемчужина',
    pctX: 29.5,
    pctY: 24.2,
    category: 'mountain',
    staysCount: 19,
    startingPrice: 4500,
    distanceToSea: '950 м над уровнем моря',
    description: 'Легендарное высокогорное озеро в окружении вековых реликтовых пихт и заснеженных вершин Кавказа. По дороге — Голубое озеро, Юпшарский каньон («Каменный мешок») и Гегский водопад.',
    highlights: ['Озеро Рица (950 м)', 'Юпшарский каньон', 'Голубое озеро', 'Гегский водопад'],
    image: '/images/destinations/ritsa.jpg',
    isPopular: true,
  },
  {
    id: 'pitsunda',
    name: 'Пицунда',
    subtitle: 'Мыс реликтовых сосен',
    badge: 'Заповедный мыс',
    pctX: 22.2,
    pctY: 40.5,
    category: 'beach',
    staysCount: 114,
    startingPrice: 3500,
    distanceToSea: 'Среди сосен у моря',
    description: 'Знаменитый далеко выступающий в Черное море мыс с реликтовой сосновой рощей и озером Инкит. Самое спокойное, прозрачное и теплое море на всем побережье благодаря закрытой бухте.',
    highlights: ['Реликтовая сосновая роща', 'Пицундский мыс и маяк', 'Озеро Инкит', 'Патриарший собор X века'],
    image: '/images/destinations/pitsunda.jpg',
    isPopular: true,
  },
  {
    id: 'gudauta',
    name: 'Гудаута',
    subtitle: 'Цитрусовый рай и тихие пляжи',
    badge: 'Семейный отдых',
    pctX: 32.5,
    pctY: 41.5,
    category: 'beach',
    staysCount: 48,
    startingPrice: 2200,
    distanceToSea: '100 м до моря',
    description: 'Солнечный и спокойный приморский курорт на широкой равнине. Огромные просторные пляжи, теплое море, историческая часовая башня, мандариновые сады и средневековый храм в Лыхны.',
    highlights: ['Широкие пляжи без толп', 'Храм Успения Богородицы в Лыхны', 'Сероводородные источники Приморское'],
    image: '/images/destinations/gudauta.jpg',
  },
  {
    id: 'new-athos',
    name: 'Новый Афон',
    subtitle: 'Монастырь и станция Псырцха',
    badge: 'История и святыни',
    pctX: 40.5,
    pctY: 45.5,
    category: 'history',
    staysCount: 92,
    startingPrice: 3200,
    distanceToSea: '200 м до моря',
    description: 'Один из красивейших уголков Абхазии: златоглавый Симоно-Кананитский монастырь, бирюзовый павильон станции Псырцха с водопадом, гигантская Новоафонская карстовая пещера и Анакопийская крепость.',
    highlights: ['Станция Псырцха и водопад', 'Новоафонский монастырь', 'Новоафонская пещера', 'Анакопийская крепость'],
    image: '/images/destinations/new-athos.jpg',
    isPopular: true,
  },
  {
    id: 'sukhum',
    name: 'Сухум',
    subtitle: 'Столица республики с 2500-летней историей',
    badge: 'Столица',
    pctX: 48.5,
    pctY: 50.8,
    category: 'history',
    staysCount: 168,
    startingPrice: 2800,
    distanceToSea: 'Набережная Махаджиров',
    description: 'Сердце Абхазии с колоритной набережной Махаджиров, белоснежной Колоннадой, знаменитой «Брехаловкой», вековым Ботаническим садом и великолепными ресторанами национальной кухни апацха.',
    highlights: ['Белоснежная Колоннада', 'Набережная Махаджиров', 'Ботанический сад', 'Театральная площадь с грифонами'],
    image: '/images/destinations/sukhum.jpg',
    isPopular: true,
  },
  {
    id: 'kyndyg',
    name: 'Кындыг & Очамчыра',
    subtitle: 'Целебные термальные гейзеры',
    badge: 'Термальные источники',
    pctX: 57.5,
    pctY: 65.5,
    category: 'mountain',
    staysCount: 38,
    startingPrice: 2000,
    distanceToSea: '150-300 м до моря',
    description: 'Природный СПА-курорт под открытым небом: каскады горячих минеральных сероводородных гейзеров, естественный природный гидромассаж, бассейны с лечебной грязью, эвкалиптовые рощи и просторные пляжи Очамчыры.',
    highlights: ['Термальный комплекс Кындыг', 'Природный гидромассаж', 'Грязевые ванны', 'Эвкалиптовые рощи', 'Пляжи Очамчыры'],
    image: '/images/destinations/kyndyg.jpg',
  },
  {
    id: 'tkuarchal',
    name: 'Ткуарчал & Акармара',
    subtitle: 'Город в горах и водопад Великан',
    badge: 'Экспедиции',
    pctX: 69.5,
    pctY: 63.2,
    category: 'mountain',
    staysCount: 16,
    startingPrice: 2500,
    distanceToSea: 'Горное ущелье реки Галидзга',
    description: 'Атмосферный город в горном ущелье и поселок Акармара. Рядом низвергаются грандиозные водопады Кавказа: 100-метровый Великан (Адау), Ирина и Святой, а также термальные радоновые источники.',
    highlights: ['Водопад Великан (100 м)', 'Акармара', 'Водопады Ирина и Святой', 'Радоновые источники'],
    image: '/images/destinations/tkuarchal.jpg',
  },
];

export function AbkhaziaMap() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(HOTSPOTS[1]); // Гагра по умолчанию
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Плавный скролл карты к выбранному курорту на смартфонах
  const handleSelectHotspot = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const targetX = (hotspot.pctX / 100) * scrollWidth;
      const scrollTarget = Math.max(0, targetX - clientWidth / 2);

      container.scrollTo({
        left: scrollTarget,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Мягкая естественная пульсация маркеров */}
      <style jsx>{`
        @keyframes calmWave {
          0% {
            transform: scale(0.95);
            opacity: 0.45;
          }
          65% {
            transform: scale(1.6);
            opacity: 0.12;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .calm-ping {
          animation: calmWave 3.5s cubic-bezier(0.1, 0.4, 0.2, 1) infinite;
        }
      `}</style>

      {/* ========================================================= */}
      {/* ВЕРХНЯЯ ПАНЕЛЬ: ЗАГОЛОВОК И ЛЕГЕНДА ТРАССЫ                 */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Badge variant="moss" className="px-3.5 py-1.5 font-semibold text-xs gap-1.5 bg-moss-50 border-moss-200 text-moss-800">
            <Compass className="w-3.5 h-3.5 text-moss-600" />
            Интерактивная карта курортов
          </Badge>
          <span className="text-xs text-stone-gray-500 hidden sm:inline">
            Точная береговая линия, курорты и сеть шоссе
          </span>
        </div>

        {/* Легенда дорог */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-stone-gray-200 rounded-xl text-xs text-stone-gray-600 font-medium shadow-soft-sm">
          <span className="w-4 h-1 bg-[#D99B59] rounded-full border border-[#B37838]" />
          <span>Сухумское шоссе & Ткуарчал</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* БЫСТРЫЙ СЕЛЕКТОР КУРОРТОВ (УДОБНО НА МОБИЛЬНЫХ УСТРОЙСТВАХ)*/}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-3 -mx-1 px-1">
        {HOTSPOTS.map((hotspot) => {
          const isSelected = selectedHotspot.id === hotspot.id;
          return (
            <button
              key={hotspot.id}
              onClick={() => handleSelectHotspot(hotspot)}
              className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all duration-200 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-moss-800 text-white border-moss-800 shadow-soft-sm'
                  : 'bg-white text-stone-gray-700 border-stone-200 hover:bg-stone-50 hover:border-moss-300'
              }`}
            >
              <span>{hotspot.name}</span>
              {hotspot.isPopular && (
                <Sparkles className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-amber-500'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* ОСНОВНОЙ КОНТЕЙНЕР КАРТЫ: БЕЗ РАМОК, С ЗАПОЛНЕННЫМИ КРАЯМИ  */}
      {/* НА МОБИЛЬНЫХ: ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ БЕЗ СЖАТИЯ И ПЕРЕКОСА */}
      {/* ========================================================= */}
      <div
        ref={scrollContainerRef}
        className="relative rounded-3xl border border-stone-200/90 shadow-soft-lg overflow-x-auto overflow-y-hidden scrollbar-none touch-pan-x bg-[#347298]"
      >
        {/* Внутренняя видовая область SVG строго в пропорции 1024:571 без перекоса координат */}
        <div className="relative min-w-[760px] lg:min-w-full w-full aspect-[1024/571] select-none">
          <svg
            viewBox="0 0 1024 571"
            className="w-full h-full select-none block drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Морская гладь Черного моря */}
              <linearGradient id="ref-sea-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B7CA4" />
                <stop offset="60%" stopColor="#347298" />
                <stop offset="100%" stopColor="#2A5F82" />
              </linearGradient>

              {/* Россия: приятный лазурно-циан тон под референс */}
              <linearGradient id="ref-russia-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4E4EE" />
                <stop offset="100%" stopColor="#AED6E2" />
              </linearGradient>

              {/* Грузия: пастельно-розоватый оттенок под референс */}
              <linearGradient id="ref-georgia-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9DFE6" />
                <stop offset="100%" stopColor="#F0C8D3" />
              </linearGradient>

              {/* Суша Абхазии: естественный свежий зеленый массив */}
              <linearGradient id="ref-abkhazia-grad" x1="15%" y1="85%" x2="80%" y2="15%">
                <stop offset="0%" stopColor="#DCF0E2" />
                <stop offset="35%" stopColor="#CEE9D6" />
                <stop offset="70%" stopColor="#C4E5CE" />
                <stop offset="100%" stopColor="#B6DEC2" />
              </linearGradient>

              {/* Мягкая природная тень береговой линии суши */}
              <filter id="ref-land-shadow" x="-3%" y="-3%" width="110%" height="110%">
                <feDropShadow dx="1" dy="4" stdDeviation="4" floodColor="#1a3545" floodOpacity="0.4" />
              </filter>

              {/* Озеро Инкит и Озеро Рица */}
              <radialGradient id="ref-lake-blue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4A8FBA" />
                <stop offset="100%" stopColor="#2A6389" />
              </radialGradient>
            </defs>

            {/* ======================================================= */}
            {/* 1. ЧЁРНОЕ МОРЕ: ЗАПОЛНЯЕТ ВСЮ АКВАТОРИЮ ДО КРАЕВ         */}
            {/* ======================================================= */}
            <rect width="1024" height="571" fill="url(#ref-sea-grad)" />

            {/* Надпись «ЧЁРНОЕ МОРЕ» на акватории */}
            <g opacity="0.35" className="select-none pointer-events-none">
              <text
                x="120"
                y="480"
                fill="#FFFFFF"
                fontSize="24"
                fontWeight="800"
                letterSpacing="0.25em"
                className="font-heading uppercase"
              >
                ЧЁРНОЕ МОРЕ
              </text>
              <text
                x="122"
                y="502"
                fill="#E0F2FE"
                fontSize="11"
                fontWeight="600"
                letterSpacing="0.1em"
              >
                Амшын Еиқәа
              </text>
            </g>

            {/* ======================================================= */}
            {/* 2. РОССИЯ (СЕВЕР И СЕВЕРО-ЗАПАД: БЕЗ АРТЕФАКТОВ ДО КРАЕВ) */}
            {/* ======================================================= */}
            <path
              d="M 0,0 L 0,45 Q 25,75 55,100 T 98,125 L 100,121 L 107,116 L 108,106 L 111,101 L 112,92 L 117,85 L 118,79 L 120,77 L 125,77 L 128,75 L 129,69 L 132,65 L 133,55 L 136,52 L 141,51 L 141,50 L 157,49 L 166,43 L 171,46 L 177,47 L 183,42 L 194,40 L 194,39 L 203,39 L 209,44 L 215,47 L 219,47 L 219,48 L 225,48 L 225,49 L 238,48 L 247,54 L 256,54 L 256,53 L 274,51 L 280,56 L 289,57 L 288,65 L 298,65 L 298,66 L 324,64 L 333,58 L 336,51 L 350,50 L 350,49 L 355,48 L 359,43 L 361,43 L 362,46 L 365,48 L 365,50 L 371,56 L 381,57 L 383,59 L 391,61 L 395,65 L 397,65 L 399,68 L 401,68 L 402,70 L 406,72 L 413,73 L 413,74 L 421,74 L 421,75 L 431,74 L 438,78 L 446,77 L 447,80 L 445,84 L 445,89 L 446,91 L 450,91 L 450,92 L 457,94 L 455,100 L 459,100 L 466,104 L 473,103 L 477,100 L 481,100 L 485,96 L 488,97 L 490,100 L 494,100 L 500,107 L 504,108 L 507,111 L 510,117 L 512,117 L 516,121 L 534,120 L 535,118 L 539,116 L 541,112 L 544,112 L 547,114 L 555,114 L 551,114 L 552,117 L 559,115 L 560,117 L 566,120 L 569,120 L 573,123 L 580,123 L 583,121 L 583,122 L 586,122 L 590,127 L 598,129 L 601,137 L 604,140 L 608,140 L 614,136 L 624,136 L 630,128 L 636,127 L 636,126 L 643,126 L 643,127 L 654,129 L 658,137 L 659,146 L 664,154 L 669,153 L 671,155 L 681,156 L 688,162 L 688,164 L 694,170 L 700,170 L 702,173 L 711,175 L 715,184 L 725,188 L 726,190 L 730,190 L 730,191 L 736,190 L 738,187 L 740,187 L 743,184 L 748,184 L 753,188 L 760,188 L 760,187 L 763,187 L 768,181 L 771,181 L 771,180 L 771,181 L 775,181 L 780,187 L 785,187 L 785,188 L 794,190 L 798,196 L 805,196 L 809,191 L 820,191 L 820,192 L 825,191 L 827,187 L 827,177 L 831,174 L 836,174 L 842,178 L 842,180 L 845,182 L 846,185 L 856,185 L 858,189 L 861,191 L 867,191 L 871,189 L 877,189 L 879,187 L 884,187 L 887,189 L 889,196 L 893,200 L 898,200 L 901,197 L 903,197 L 909,190 L 928,191 L 928,189 L 932,186 L 955,185 L 957,179 L 966,181 L 972,178 L 977,182 L 979,186 L 987,187 L 992,182 L 1004,181 L 1004,174 L 1006,172 L 1016,172 L 1020,169 L 1024,169 L 1024,0 Z"
              fill="url(#ref-russia-grad)"
              stroke="#7FA7BC"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <text
              x="590"
              y="52"
              fill="#FFFFFF"
              fontSize="17"
              fontWeight="900"
              letterSpacing="0.32em"
              style={{ filter: 'drop-shadow(0px 1px 3px rgba(15, 60, 80, 0.45))' }}
              className="select-none pointer-events-none uppercase font-heading"
            >
              РОССИЯ
            </text>

            {/* ======================================================= */}
            {/* 3. ГРУЗИЯ (ЮГО-ВОСТОК: БЕЗ РАЗРЫВОВ И СГЛАЖЕННАЯ)       */}
            {/* ======================================================= */}
            <path
              d="M 1024,169 L 1018,170 L 1013,173 L 1006,172 L 1005,179 L 1003,182 L 993,182 L 993,183 L 990,183 L 987,187 L 980,187 L 974,179 L 969,179 L 967,181 L 962,181 L 960,179 L 957,179 L 956,184 L 953,186 L 930,187 L 928,189 L 928,199 L 932,199 L 934,201 L 934,205 L 930,213 L 926,216 L 925,227 L 923,231 L 917,236 L 916,246 L 912,248 L 911,250 L 909,250 L 908,252 L 906,252 L 905,257 L 904,257 L 904,262 L 901,265 L 892,266 L 890,268 L 887,268 L 887,269 L 884,269 L 878,272 L 872,280 L 854,281 L 853,283 L 850,284 L 849,289 L 845,291 L 838,298 L 837,302 L 841,306 L 852,307 L 856,309 L 857,311 L 851,321 L 852,329 L 854,331 L 856,338 L 866,339 L 869,341 L 869,344 L 870,344 L 867,349 L 861,350 L 858,353 L 853,354 L 850,357 L 846,365 L 846,368 L 851,373 L 852,378 L 853,378 L 851,385 L 853,386 L 856,394 L 860,397 L 860,401 L 857,405 L 857,415 L 858,415 L 860,423 L 864,427 L 864,433 L 865,433 L 866,438 L 868,439 L 868,448 L 871,453 L 867,455 L 859,455 L 855,457 L 848,465 L 846,465 L 846,467 L 852,467 L 852,466 L 856,466 L 862,461 L 858,465 L 848,468 L 847,471 L 844,472 L 841,484 L 834,492 L 820,496 L 805,504 L 788,516 L 772,528 L 756,542 L 742,552 L 730,560 Q 736,566 746,571 L 1024,571 L 1024,169 Z"
              fill="url(#ref-georgia-grad)"
              stroke="#D69FAF"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <text
              x="875"
              y="480"
              fill="#FFFFFF"
              fontSize="17"
              fontWeight="900"
              letterSpacing="0.32em"
              style={{ filter: 'drop-shadow(0px 1px 3px rgba(90, 20, 45, 0.45))' }}
              className="select-none pointer-events-none uppercase font-heading"
            >
              ГРУЗИЯ
            </text>

            {/* ======================================================= */}
            {/* 4. МЯГКАЯ ТЕНЬ МАССИВА СУШИ АБХАЗИИ                     */}
            {/* ======================================================= */}
            <path
              d="M 98,125 L 100,121 L 107,116 L 108,106 L 111,101 L 112,92 L 117,85 L 118,79 L 120,77 L 125,77 L 128,75 L 129,69 L 132,65 L 133,55 L 136,52 L 141,51 L 141,50 L 157,49 L 166,43 L 171,46 L 177,47 L 183,42 L 194,40 L 194,39 L 203,39 L 209,44 L 215,47 L 219,47 L 219,48 L 225,48 L 225,49 L 238,48 L 247,54 L 256,54 L 256,53 L 274,51 L 280,56 L 289,57 L 288,65 L 298,65 L 298,66 L 324,64 L 333,58 L 336,51 L 350,50 L 350,49 L 355,48 L 359,43 L 361,43 L 362,46 L 365,48 L 365,50 L 371,56 L 381,57 L 383,59 L 391,61 L 395,65 L 397,65 L 399,68 L 401,68 L 402,70 L 406,72 L 413,73 L 413,74 L 421,74 L 421,75 L 431,74 L 438,78 L 446,77 L 447,80 L 445,84 L 445,89 L 446,91 L 450,91 L 450,92 L 457,94 L 455,100 L 459,100 L 466,104 L 473,103 L 477,100 L 481,100 L 485,96 L 488,97 L 490,100 L 494,100 L 500,107 L 504,108 L 507,111 L 510,117 L 512,117 L 516,121 L 534,120 L 535,118 L 539,116 L 541,112 L 544,112 L 547,114 L 555,114 L 551,114 L 552,117 L 559,115 L 560,117 L 566,120 L 569,120 L 573,123 L 580,123 L 583,121 L 583,122 L 586,122 L 590,127 L 598,129 L 601,137 L 604,140 L 608,140 L 614,136 L 624,136 L 630,128 L 636,127 L 636,126 L 643,126 L 643,127 L 654,129 L 658,137 L 659,146 L 664,154 L 669,153 L 671,155 L 681,156 L 688,162 L 688,164 L 694,170 L 700,170 L 702,173 L 711,175 L 715,184 L 725,188 L 726,190 L 730,190 L 730,191 L 736,190 L 738,187 L 740,187 L 743,184 L 748,184 L 753,188 L 760,188 L 760,187 L 763,187 L 768,181 L 771,181 L 771,180 L 771,181 L 775,181 L 780,187 L 785,187 L 785,188 L 794,190 L 798,196 L 805,196 L 809,191 L 820,191 L 820,192 L 825,191 L 827,187 L 827,177 L 831,174 L 836,174 L 842,178 L 842,180 L 845,182 L 846,185 L 856,185 L 858,189 L 861,191 L 867,191 L 871,189 L 877,189 L 879,187 L 884,187 L 887,189 L 889,196 L 893,200 L 898,200 L 901,197 L 903,197 L 909,190 L 928,191 L 928,189 L 932,186 L 955,185 L 957,179 L 966,181 L 972,178 L 977,182 L 979,186 L 987,187 L 992,182 L 1004,181 L 1004,174 L 1006,172 L 1016,172 L 1020,169 L 1024,169 L 1018,170 L 1013,173 L 1006,172 L 1005,179 L 1003,182 L 993,182 L 993,183 L 990,183 L 987,187 L 980,187 L 974,179 L 969,179 L 967,181 L 962,181 L 960,179 L 957,179 L 956,184 L 953,186 L 930,187 L 928,189 L 928,199 L 932,199 L 934,201 L 934,205 L 930,213 L 926,216 L 925,227 L 923,231 L 917,236 L 916,246 L 912,248 L 911,250 L 909,250 L 908,252 L 906,252 L 905,257 L 904,257 L 904,262 L 901,265 L 892,266 L 890,268 L 887,268 L 887,269 L 884,269 L 878,272 L 872,280 L 854,281 L 853,283 L 850,284 L 849,289 L 845,291 L 838,298 L 837,302 L 841,306 L 852,307 L 856,309 L 857,311 L 851,321 L 852,329 L 854,331 L 856,338 L 866,339 L 869,341 L 869,344 L 870,344 L 867,349 L 861,350 L 858,353 L 853,354 L 850,357 L 846,365 L 846,368 L 851,373 L 852,378 L 853,378 L 851,385 L 853,386 L 856,394 L 860,397 L 860,401 L 857,405 L 857,415 L 858,415 L 860,423 L 864,427 L 864,433 L 865,433 L 866,438 L 868,439 L 868,448 L 871,453 L 867,455 L 859,455 L 855,457 L 848,465 L 846,465 L 846,467 L 852,467 L 852,466 L 856,466 L 862,461 L 858,465 L 848,468 L 847,471 L 844,472 L 841,484 L 834,492 L 820,496 L 805,504 L 788,516 L 772,528 L 756,542 L 742,552 L 730,560 Q 724,545 720,520 T 714,485 T 700,455 Q 675,430 640,405 Q 565,360 495,290 L 412,260 L 330,237 Q 260,240 224,232 L 186,167 L 128,137 Z"
              fill="#1C3849"
              filter="url(#ref-land-shadow)"
              opacity="0.55"
            />

            {/* ======================================================= */}
            {/* 5. ИСТИННАЯ ТЕРРИТОРИЯ АБХАЗИИ ПО РЕФЕРЕНСУ             */}
            {/* ======================================================= */}
            <path
              d="M 98,125 L 100,121 L 107,116 L 108,106 L 111,101 L 112,92 L 117,85 L 118,79 L 120,77 L 125,77 L 128,75 L 129,69 L 132,65 L 133,55 L 136,52 L 141,51 L 141,50 L 157,49 L 166,43 L 171,46 L 177,47 L 183,42 L 194,40 L 194,39 L 203,39 L 209,44 L 215,47 L 219,47 L 219,48 L 225,48 L 225,49 L 238,48 L 247,54 L 256,54 L 256,53 L 274,51 L 280,56 L 289,57 L 288,65 L 298,65 L 298,66 L 324,64 L 333,58 L 336,51 L 350,50 L 350,49 L 355,48 L 359,43 L 361,43 L 362,46 L 365,48 L 365,50 L 371,56 L 381,57 L 383,59 L 391,61 L 395,65 L 397,65 L 399,68 L 401,68 L 402,70 L 406,72 L 413,73 L 413,74 L 421,74 L 421,75 L 431,74 L 438,78 L 446,77 L 447,80 L 445,84 L 445,89 L 446,91 L 450,91 L 450,92 L 457,94 L 455,100 L 459,100 L 466,104 L 473,103 L 477,100 L 481,100 L 485,96 L 488,97 L 490,100 L 494,100 L 500,107 L 504,108 L 507,111 L 510,117 L 512,117 L 516,121 L 534,120 L 535,118 L 539,116 L 541,112 L 544,112 L 547,114 L 555,114 L 551,114 L 552,117 L 559,115 L 560,117 L 566,120 L 569,120 L 573,123 L 580,123 L 583,121 L 583,122 L 586,122 L 590,127 L 598,129 L 601,137 L 604,140 L 608,140 L 614,136 L 624,136 L 630,128 L 636,127 L 636,126 L 643,126 L 643,127 L 654,129 L 658,137 L 659,146 L 664,154 L 669,153 L 671,155 L 681,156 L 688,162 L 688,164 L 694,170 L 700,170 L 702,173 L 711,175 L 715,184 L 725,188 L 726,190 L 730,190 L 730,191 L 736,190 L 738,187 L 740,187 L 743,184 L 748,184 L 753,188 L 760,188 L 760,187 L 763,187 L 768,181 L 771,181 L 771,180 L 771,181 L 775,181 L 780,187 L 785,187 L 785,188 L 794,190 L 798,196 L 805,196 L 809,191 L 820,191 L 820,192 L 825,191 L 827,187 L 827,177 L 831,174 L 836,174 L 842,178 L 842,180 L 845,182 L 846,185 L 856,185 L 858,189 L 861,191 L 867,191 L 871,189 L 877,189 L 879,187 L 884,187 L 887,189 L 889,196 L 893,200 L 898,200 L 901,197 L 903,197 L 909,190 L 928,191 L 928,189 L 932,186 L 955,185 L 957,179 L 966,181 L 972,178 L 977,182 L 979,186 L 987,187 L 992,182 L 1004,181 L 1004,174 L 1006,172 L 1016,172 L 1020,169 L 1024,169 L 1018,170 L 1013,173 L 1006,172 L 1005,179 L 1003,182 L 993,182 L 993,183 L 990,183 L 987,187 L 980,187 L 974,179 L 969,179 L 967,181 L 962,181 L 960,179 L 957,179 L 956,184 L 953,186 L 930,187 L 928,189 L 928,199 L 932,199 L 934,201 L 934,205 L 930,213 L 926,216 L 925,227 L 923,231 L 917,236 L 916,246 L 912,248 L 911,250 L 909,250 L 908,252 L 906,252 L 905,257 L 904,257 L 904,262 L 901,265 L 892,266 L 890,268 L 887,268 L 887,269 L 884,269 L 878,272 L 872,280 L 854,281 L 853,283 L 850,284 L 849,289 L 845,291 L 838,298 L 837,302 L 841,306 L 852,307 L 856,309 L 857,311 L 851,321 L 852,329 L 854,331 L 856,338 L 866,339 L 869,341 L 869,344 L 870,344 L 867,349 L 861,350 L 858,353 L 853,354 L 850,357 L 846,365 L 846,368 L 851,373 L 852,378 L 853,378 L 851,385 L 853,386 L 856,394 L 860,397 L 860,401 L 857,405 L 857,415 L 858,415 L 860,423 L 864,427 L 864,433 L 865,433 L 866,438 L 868,439 L 868,448 L 871,453 L 867,455 L 859,455 L 855,457 L 848,465 L 846,465 L 846,467 L 852,467 L 852,466 L 856,466 L 862,461 L 858,465 L 848,468 L 847,471 L 844,472 L 841,484 L 834,492 L 820,496 L 805,504 L 788,516 L 772,528 L 756,542 L 742,552 L 730,560 Q 724,545 720,520 T 714,485 T 700,455 Q 675,430 640,405 Q 565,360 495,290 L 412,260 L 330,237 Q 260,240 224,232 L 186,167 L 128,137 Z"
              fill="url(#ref-abkhazia-grad)"
              stroke="#2E6B48"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />

            {/* ======================================================= */}
            {/* 6. РЕКИ И ОЗЕРА                                         */}
            {/* ======================================================= */}
            <g stroke="#5382A4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85">
              <path d="M 98,125 Q 115,105 125,85 T 140,68" />
              <path d="M 220,195 Q 230,170 245,150 T 285,130 T 325,120" />
              <path d="M 470,295 Q 475,270 480,240 T 490,210" />
              <path d="M 540,335 Q 560,295 585,255 T 635,215 T 690,195" />
              <path d="M 605,395 Q 635,378 675,365 T 725,355" />
              <path d="M 730,560 Q 756,542 772,528 T 805,504 T 845,455" />
            </g>

            {/* Озеро Инкит на мысе Пицунда */}
            <ellipse
              cx="224"
              cy="212"
              rx="4.5"
              ry="3"
              fill="url(#ref-lake-blue)"
              stroke="#2E6B48"
              strokeWidth="0.8"
            />

            {/* Высокогорное Озеро Рица */}
            <g>
              <ellipse
                cx="300"
                cy="138"
                rx="6"
                ry="4"
                fill="url(#ref-lake-blue)"
                stroke="#2E6B48"
                strokeWidth="0.8"
                transform="rotate(-15 300 138)"
              />
              <text
                x="312"
                y="140"
                fill="#1E5434"
                fontSize="9"
                fontWeight="700"
                className="select-none pointer-events-none"
              >
                оз. Рица
              </text>
            </g>

            {/* Подписи пограничных рек */}
            <text
              x="165"
              y="245"
              fill="#FFFFFF"
              fontSize="9"
              fontWeight="700"
              fontStyle="italic"
              transform="rotate(-28 165 245)"
              style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))' }}
              className="select-none pointer-events-none"
            >
              Psou
            </text>
            <text
              x="755"
              y="560"
              fill="#FFFFFF"
              fontSize="9"
              fontWeight="700"
              fontStyle="italic"
              transform="rotate(32 755 560)"
              style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.5))' }}
              className="select-none pointer-events-none"
            >
              Ingur
            </text>

            {/* ======================================================= */}
            {/* 7. АВТОДОРОГИ ПО РЕФЕРЕНСУ (СУХУМСКОЕ ШОССЕ & ВЕТКИ)   */}
            {/* ======================================================= */}
            {/* Подложка шоссе для четкого контраста */}
            <g stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
              <path d="M 98,125 L 128,137 L 155,152 L 186,167 L 215,192 L 248,201 L 280,218 L 310,230 L 330,237 L 365,246 L 390,253 L 412,260 L 445,275 L 470,285 L 495,290 L 520,312 L 550,345 L 585,375 L 640,402 L 680,430 L 710,470 L 730,560" />
              <path d="M 215,192 L 222,208 L 224,228" />
              <path d="M 215,192 Q 235,165 265,150 T 300,138" />
              <path d="M 640,402 Q 675,385 715,362" />
            </g>

            {/* Основная линия шоссе (янтарно-золотая как в референсе) */}
            <g stroke="#D99B59" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 98,125 L 128,137 L 155,152 L 186,167 L 215,192 L 248,201 L 280,218 L 310,230 L 330,237 L 365,246 L 390,253 L 412,260 L 445,275 L 470,285 L 495,290 L 520,312 L 550,345 L 585,375 L 640,402 L 680,430 L 710,470 L 730,560" />
              <path d="M 215,192 L 222,208 L 224,228" />
              <path d="M 215,192 Q 235,165 265,150 T 300,138" strokeDasharray="4 2" />
              <path d="M 640,402 Q 675,385 715,362" />
            </g>

            {/* Тонкий сердечник дороги */}
            <g stroke="#B37838" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M 98,125 L 128,137 L 155,152 L 186,167 L 215,192 L 248,201 L 280,218 L 310,230 L 330,237 L 365,246 L 390,253 L 412,260 L 445,275 L 470,285 L 495,290 L 520,312 L 550,345 L 585,375 L 640,402 L 680,430 L 710,470 L 730,560" />
            </g>
          </svg>

          {/* ======================================================= */}
          {/* 8. ИНТЕРАКТИВНЫЕ ТОЧКИ КУРОРТОВ (HOTSPOTS)              */}
          {/* ======================================================= */}
          {HOTSPOTS.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;

            return (
              <div
                key={hotspot.id}
                style={{
                  left: `${hotspot.pctX}%`,
                  top: `${hotspot.pctY}%`,
                }}
                onClick={() => handleSelectHotspot(hotspot)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20 p-2"
              >
                {/* Мягкая неторопливая пульсация */}
                <span className="absolute inset-0 rounded-full bg-emerald-400/40 calm-ping pointer-events-none" />

                {/* Основной пин-кружок */}
                <div
                  className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'w-7 h-7 bg-white shadow-green-glow ring-4 ring-green-600/40 scale-110'
                      : 'w-5 h-5 bg-white shadow-soft group-hover:scale-125 border-2 border-emerald-700'
                  }`}
                >
                  <div
                    className={`rounded-full transition-all ${
                      isSelected
                        ? 'w-3.5 h-3.5 bg-green-600'
                        : 'w-2.5 h-2.5 bg-emerald-700 group-hover:bg-green-600'
                    }`}
                  />
                </div>

                {/* Плашка с названием курорта и стартовой ценой */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap transition-all duration-200 pointer-events-none ${
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
      </div>

      {/* Подсказка для мобильных устройств */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2 text-stone-gray-400 text-[11px] font-medium">
        <span>👈</span>
        <span>Проведите пальцем для перемещения по карте</span>
        <span>👉</span>
      </div>

      {/* ======================================================= */}
      {/* 9. ДЕТАЛЬНАЯ КАРТОЧКА ВЫБРАННОГО КУРОРТА С РЕАЛЬНЫМ ФОТО */}
      {/* ======================================================= */}
      <div className="mt-5">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-[0_12px_36px_-6px_rgba(20,40,30,0.08)] flex flex-col md:flex-row items-center justify-between gap-6 transition-all">
          {/* Реальное фото курорта с бейджем */}
          <div className="relative w-full md:w-72 h-48 rounded-2xl overflow-hidden shrink-0 bg-stone-gray-100 border border-stone-200/80 shadow-soft-sm">
            <Image
              src={selectedHotspot.image}
              alt={selectedHotspot.name}
              fill
              sizes="(max-width: 768px) 100vw, 288px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <Badge variant="moss" className="bg-moss-900/90 text-white border-none text-[11px] font-bold backdrop-blur-md shadow-soft-sm">
                {selectedHotspot.badge}
              </Badge>
            </div>

            {selectedHotspot.isPopular && (
              <div className="absolute bottom-3 left-3">
                <Badge variant="green" className="bg-emerald-600/95 text-white border-none text-[10px] font-semibold backdrop-blur-md shadow-soft-sm">
                  Популярное направление
                </Badge>
              </div>
            )}
          </div>

          {/* Описание и особенности */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
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

            {/* Теги фишек курорта */}
            <div className="flex flex-wrap gap-2">
              {selectedHotspot.highlights.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-gray-700 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200/80"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Стартовая цена и переход в каталог */}
          <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-stone-100">
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
              <AppButton variant="primary" size="lg" className="group shadow-moss-glow">
                <span>Смотреть варианты</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </AppButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
