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
} from 'lucide-react';

export interface Hotspot {
  id: string;
  name: string;
  badge: string;
  x: number; // Координата X в % (0-100)
  y: number; // Координата Y в % (0-100)
  category: 'beach' | 'mountain' | 'history';
  staysCount: number;
  startingPrice: number;
  description: string;
  highlights: string[];
  image: string;
}

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'tsandripsh',
    name: 'Цандрипш',
    badge: 'Белые скалы',
    x: 13,
    y: 35,
    category: 'beach',
    staysCount: 28,
    startingPrice: 2000,
    description: 'Уединенные галечные пляжи у живописных мраморно-белых скал прямо у границы.',
    highlights: ['Белые скалы', 'Мало людей', 'Быстрый заезд'],
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gagra',
    name: 'Гагра',
    badge: 'Топ курорт',
    x: 23,
    y: 45,
    category: 'beach',
    staysCount: 185,
    startingPrice: 3000,
    description: 'Легендарная Колоннада, замок принца Ольденбургского, пальмы и теплое море у подножия гор.',
    highlights: ['Старая Гагра', 'Приморский парк', 'Колоннада', 'Аквапарк'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ritsa',
    name: 'Озеро Рица',
    badge: 'Сердце гор',
    x: 40,
    y: 20,
    category: 'mountain',
    staysCount: 15,
    startingPrice: 4500,
    description: 'Высокогорное бирюзовое озеро на высоте 950 м, Юпшарский каньон и альпийские луга.',
    highlights: ['Озеро Рица', 'Юпшарский каньон', 'Голубое озеро', 'Эко-домики'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pitsunda',
    name: 'Пицунда',
    badge: 'Реликтовые сосны',
    x: 35,
    y: 68,
    category: 'beach',
    staysCount: 112,
    startingPrice: 3500,
    description: 'Заповедный сосновый бор, мыс Пицунда и самая чистая и спокойная морская вода на побережье.',
    highlights: ['Сосновая роща', 'Песчаный пляж', 'Дельфины', 'Мыс Пицунда'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gudauta',
    name: 'Гудаута',
    badge: 'Сады и покой',
    x: 48,
    y: 54,
    category: 'beach',
    staysCount: 32,
    startingPrice: 2200,
    description: 'Спокойный равнинный курорт с просторными пляжами, цитрусовыми садами и форелевыми хозяйствами.',
    highlights: ['Широкие пляжи', 'Мандариновые сады', 'Форелевые реки'],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'new-athos',
    name: 'Новый Афон',
    badge: 'Святые места',
    x: 62,
    y: 61,
    category: 'history',
    staysCount: 64,
    startingPrice: 3200,
    description: 'Новоафонский Симоно-Кананитский монастырь, грандиозная карстовая пещера и рукотворный водопад.',
    highlights: ['Монастырь', 'Пещера', 'Анакопийская крепость', 'Водопад'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sukhum',
    name: 'Сухум',
    badge: 'Столица',
    x: 75,
    y: 70,
    category: 'beach',
    staysCount: 98,
    startingPrice: 2800,
    description: 'Столица Абхазии с исторической Набережной Махаджиров, знаменитой Брехаловкой и Ботаническим садом.',
    highlights: ['Набережная Махаджиров', 'Ботанический сад', 'Колоннада', 'Кафе и рестораны'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ochamchira',
    name: 'Кындыг / Очамчыра',
    badge: 'Термальные источники',
    x: 88,
    y: 83,
    category: 'mountain',
    staysCount: 22,
    startingPrice: 2000,
    description: 'Знаменитые целебные сероводородные термальные источники, гидромассаж под открытым небом и эвкалипты.',
    highlights: ['Термальный источник', 'Лечебные грязи', 'Эвкалиптовые рощи'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
];

export function AbkhaziaMap() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'beach' | 'mountain' | 'history'>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(HOTSPOTS[1]); // По умолчанию Гагра

  const filteredHotspots = HOTSPOTS.filter(
    (h) => activeCategory === 'all' || h.category === activeCategory
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Верхняя плашка фильтров категорий */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="moss" className="px-3 py-1 font-semibold text-xs">
            <Compass className="w-3.5 h-3.5 text-moss-600" />
            Интерактивная карта курортов
          </Badge>
          <span className="text-xs text-stone-gray-500 hidden md:inline">
            Кликните на горячую точку для просмотра жилья
          </span>
        </div>

        {/* Табы категорий */}
        <div className="flex items-center bg-stone-gray-100 p-1 rounded-2xl border border-stone-gray-200">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-white text-stone-gray-900 shadow-soft-sm'
                : 'text-stone-gray-600 hover:text-stone-gray-900'
            }`}
          >
            Все курорты ({HOTSPOTS.length})
          </button>
          <button
            onClick={() => setActiveCategory('beach')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeCategory === 'history'
                ? 'bg-white text-amber-800 shadow-soft-sm'
                : 'text-stone-gray-600 hover:text-amber-800'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-amber-700" />
            История
          </button>
        </div>
      </div>

      {/* Основной контейнер карты */}
      <div className="relative bg-gradient-to-b from-stone-gray-50/80 via-white to-stone-gray-50/50 rounded-3xl border-2 border-stone-gray-200 shadow-soft-lg p-4 sm:p-8 overflow-hidden">
        {/* Фоновая декоративная сетка и рельеф */}
        <div className="absolute inset-0 bg-[radial-gradient(#586f3e_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* Индикатор Черного моря */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-stone-gray-400 select-none">
          <Waves className="w-5 h-5 text-moss-400" />
          <span className="font-heading uppercase tracking-widest text-xs font-bold text-moss-700/60">
            Чёрное море (Амшын Еиқәа)
          </span>
        </div>

        {/* Индикатор Главного Кавказского хребта */}
        <div className="absolute top-6 right-8 flex items-center gap-2 text-stone-gray-400 select-none">
          <Mountain className="w-4 h-4 text-stone-gray-400" />
          <span className="font-heading uppercase tracking-widest text-[11px] font-bold text-stone-gray-400">
            Кавказские горы
          </span>
        </div>

        {/* Стилизованная векторная географическая карта Абхазии */}
        <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] max-h-[560px] flex items-center justify-center">
          <svg
            viewBox="0 0 1000 550"
            className="w-full h-full drop-shadow-sm select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Градиент рельефа Абхазии */}
              <linearGradient id="abkhazia-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F4F7F2" />
                <stop offset="30%" stopColor="#E6EFE0" />
                <stop offset="65%" stopColor="#DCEDD2" />
                <stop offset="100%" stopColor="#EFF4EB" />
              </linearGradient>

              {/* Градиент горного хребта */}
              <linearGradient id="mountains-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B3C4A5" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#8DA37B" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#C6D3BB" stopOpacity="0.4" />
              </linearGradient>

              {/* Градиент морской полосы */}
              <linearGradient id="sea-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Береговая шельфовая вода Черного моря */}
            <path
              d="M 50,220 C 120,250 180,290 240,320 C 300,350 340,430 380,450 C 430,470 510,400 560,400 C 630,400 700,440 760,460 C 830,480 890,520 950,540 L 950,550 L 50,550 Z"
              fill="url(#sea-gradient)"
            />

            {/* Контур территории Абхазии (стилизованная географическая форма) */}
            <path
              d="M 80,170 
                 C 140,110 240,70 360,60 
                 C 440,55 520,70 600,90 
                 C 680,110 770,160 840,220 
                 C 910,280 940,360 930,460 
                 C 890,480 840,470 790,440 
                 C 730,410 670,390 610,380 
                 C 550,370 490,400 440,390 
                 C 380,380 340,440 330,430 
                 C 300,400 270,320 220,280 
                 C 180,250 120,220 80,170 Z"
              fill="url(#abkhazia-gradient)"
              stroke="#A8BD99"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Кавказский горный рельеф (гористые контуры на севере) */}
            <path
              d="M 180,140 Q 260,95 340,110 T 480,90 T 630,120 T 780,180 T 870,260"
              fill="none"
              stroke="url(#mountains-gradient)"
              strokeWidth="12"
              strokeLinecap="round"
            />

            <path
              d="M 230,170 Q 320,120 410,135 T 570,125 T 710,165 T 820,230"
              fill="none"
              stroke="#586F3E"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.35"
            />

            {/* Горные вершины (стилизованные треугольники) */}
            {/* Мамзышха */}
            <polygon points="270,140 282,160 258,160" fill="#748D54" opacity="0.4" />
            {/* Арабика */}
            <polygon points="340,105 354,130 326,130" fill="#748D54" opacity="0.5" />
            {/* Рица / Пшегишхва */}
            <polygon points="430,90 446,120 414,120" fill="#586F3E" opacity="0.6" />
            {/* Кодорский хребет */}
            <polygon points="760,170 778,205 742,205" fill="#748D54" opacity="0.4" />

            {/* Озеро Рица на карте (бирюзовый эллипс) */}
            <ellipse
              cx="400"
              cy="115"
              rx="16"
              ry="8"
              fill="#0284C7"
              stroke="#38BDF8"
              strokeWidth="2"
              opacity="0.85"
            />

            {/* Дорожная артерия (Сухумское шоссе вдоль побережья) */}
            <path
              d="M 120,195 
                 C 170,235 220,250 250,265 
                 C 290,285 330,345 355,370 
                 C 400,360 470,335 520,330 
                 C 590,325 650,350 710,370 
                 C 770,390 830,420 880,450"
              fill="none"
              stroke="#D4DEC9"
              strokeWidth="2"
              strokeDasharray="3 4"
            />
          </svg>

          {/* ========================================================= */}
          {/* АНИМИРОВАННЫЕ ГОРЯЧИЕ ТОЧКИ (HOTSPOTS) */}
          {/* ========================================================= */}
          {filteredHotspots.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;

            return (
              <div
                key={hotspot.id}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                onClick={() => setSelectedHotspot(hotspot)}
                onMouseEnter={() => setSelectedHotspot(hotspot)}
              >
                {/* Анимированный пульсирующий ореол (Radar Wave) */}
                <span
                  className={`absolute -inset-3 rounded-full opacity-75 animate-ping transition-all ${
                    isSelected
                      ? 'bg-green-500 duration-1000'
                      : 'bg-moss-500 group-hover:bg-green-500 duration-1000'
                  }`}
                />

                {/* Внешний светящийся диск */}
                <div
                  className={`relative flex items-center justify-center transition-all duration-300 rounded-full ${
                    isSelected
                      ? 'w-7 h-7 bg-white shadow-green-glow ring-4 ring-green-600/30 scale-110'
                      : 'w-5 h-5 bg-white shadow-soft group-hover:scale-125 border-2 border-moss-600'
                  }`}
                >
                  {/* Центральная точка */}
                  <div
                    className={`rounded-full transition-all ${
                      isSelected
                        ? 'w-3.5 h-3.5 bg-green-600 animate-pulse'
                        : 'w-2.5 h-2.5 bg-moss-700 group-hover:bg-green-600'
                    }`}
                  />
                </div>

                {/* Текстовая плашка-чип над точкой */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap transition-all duration-200 pointer-events-none ${
                    isSelected
                      ? 'opacity-100 translate-y-0 scale-105 z-30'
                      : 'opacity-85 group-hover:opacity-100 translate-y-0.5'
                  }`}
                >
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border shadow-soft-sm transition-colors ${
                      isSelected
                        ? 'bg-stone-gray-900 text-white border-stone-gray-900'
                        : 'bg-white/95 backdrop-blur-sm text-stone-gray-800 border-stone-gray-200 group-hover:border-moss-500'
                    }`}
                  >
                    {hotspot.name}
                    <span
                      className={`text-[9px] font-medium px-1 rounded ${
                        isSelected
                          ? 'bg-green-600 text-white'
                          : 'bg-stone-gray-100 text-stone-gray-600'
                      }`}
                    >
                      {hotspot.staysCount}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* ИНТЕРАКТИВНАЯ КАРТОЧКА ВЫБРАННОЙ ТОЧКИ (DETAIL POPUP)     */}
        {/* ========================================================= */}
        <div className="mt-8 pt-6 border-t border-stone-gray-200">
          <div className="bg-white rounded-2xl border border-stone-gray-200 p-4 sm:p-6 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Превью-фото курорта */}
            <div className="relative w-full md:w-56 h-36 rounded-xl overflow-hidden shrink-0 bg-stone-gray-100 border border-stone-gray-200">
              <Image
                src={selectedHotspot.image}
                alt={selectedHotspot.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-2 left-2">
                <Badge variant="moss" className="bg-moss-800/90 text-white border-none text-[10px]">
                  {selectedHotspot.badge}
                </Badge>
              </div>
            </div>

            {/* Описание выбранного места */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="flex items-center gap-1 text-xs font-semibold text-moss-700">
                  <MapPin className="w-3.5 h-3.5" />
                  Республика Абхазия
                </span>
                <span className="text-stone-gray-300">•</span>
                <span className="text-xs font-medium text-stone-gray-500">
                  {selectedHotspot.staysCount} проверенных объектов
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-2xl text-stone-gray-900 mb-1.5">
                {selectedHotspot.name}
              </h3>

              <p className="text-sm text-stone-gray-600 mb-3 leading-relaxed">
                {selectedHotspot.description}
              </p>

              {/* Теги достопримечательностей */}
              <div className="flex flex-wrap gap-1.5">
                {selectedHotspot.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-gray-600 bg-stone-gray-50 px-2.5 py-1 rounded-lg border border-stone-gray-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Цена и кнопка перехода в каталог */}
            <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-stone-gray-100">
              <div className="text-left md:text-right">
                <span className="text-[11px] uppercase tracking-wider text-stone-gray-400 block font-bold">
                  Жилье от
                </span>
                <span className="font-heading font-extrabold text-2xl text-stone-gray-900">
                  {selectedHotspot.startingPrice.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-xs text-stone-gray-500 block">/ сутки</span>
              </div>

              <Link href={`/listings?city=${encodeURIComponent(selectedHotspot.name)}`}>
                <Button variant="primary" size="md" className="gap-2 shadow-green-glow">
                  <span>Смотреть варианты</span>
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
