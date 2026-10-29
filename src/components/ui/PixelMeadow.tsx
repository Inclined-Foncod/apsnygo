'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface PixelMeadowProps {
  className?: string;
}

export function PixelMeadow({ className }: PixelMeadowProps) {
  const [clickedSheep, setClickedSheep] = useState<number | null>(null);

  const handleSheepClick = (index: number) => {
    setClickedSheep(index);
    setTimeout(() => setClickedSheep(null), 2500);
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden select-none my-6 pointer-events-auto',
        className
      )}
    >
      <style jsx>{`
        @keyframes flowWater {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -40;
          }
        }
        /* Медленная, естественная походка овечек головой вперед */
        @keyframes graze1 {
          0%, 5% {
            transform: translateX(0) scaleX(1);
          }
          45% {
            transform: translateX(110px) scaleX(1);
          }
          48%, 52% {
            transform: translateX(110px) scaleX(-1);
          }
          92% {
            transform: translateX(0) scaleX(-1);
          }
          96%, 100% {
            transform: translateX(0) scaleX(1);
          }
        }
        @keyframes graze2 {
          0%, 6% {
            transform: translateX(0) scaleX(1);
          }
          44% {
            transform: translateX(95px) scaleX(1);
          }
          48%, 53% {
            transform: translateX(95px) scaleX(-1);
          }
          91% {
            transform: translateX(0) scaleX(-1);
          }
          95%, 100% {
            transform: translateX(0) scaleX(1);
          }
        }
        @keyframes graze3 {
          0%, 5% {
            transform: translateX(0) scaleX(-1);
          }
          45% {
            transform: translateX(-80px) scaleX(-1);
          }
          49%, 54% {
            transform: translateX(-80px) scaleX(1);
          }
          92% {
            transform: translateX(0) scaleX(1);
          }
          96%, 100% {
            transform: translateX(0) scaleX(-1);
          }
        }
        .flow-river {
          stroke-dasharray: 8 6;
          animation: flowWater 2.4s linear infinite;
        }
        .sheep-roam-1 {
          animation: graze1 38s ease-in-out infinite;
        }
        .sheep-roam-2 {
          animation: graze2 44s ease-in-out infinite;
        }
        .sheep-roam-3 {
          animation: graze3 48s ease-in-out infinite;
        }
      `}</style>

      {/* Контейнер интерактивной пиксельной диорамы гор, реки от края до края и лугов */}
      <div className="relative max-w-6xl mx-auto h-36 sm:h-44 rounded-3xl bg-gradient-to-b from-[#E7F3E7]/70 via-[#DBECDB]/60 to-[#CEE6CE]/70 border border-stone-200/90 shadow-soft-sm overflow-hidden">
        <svg
          viewBox="0 0 1200 160"
          className="w-full h-full"
          preserveAspectRatio="none"
          shapeRendering="crispEdges"
        >
          {/* ======================================================= */}
          {/* 1. ДАЛЬНИЕ ПИКСЕЛЬНЫЕ ГОРЫ (КАВКАЗСКИЙ ХРЕБЕТ)          */}
          {/* ======================================================= */}
          {/* Дальний горный план */}
          <polygon
            points="0,110 80,60 140,85 220,40 300,90 380,45 460,85 540,30 640,95 720,40 800,80 900,35 1000,85 1100,50 1200,105 1200,160 0,160"
            fill="#B5D6B8"
          />
          {/* Снежные пиксельные шапки вершин */}
          <polygon points="70,68 80,60 90,68 85,71 80,69 75,72" fill="#F4F8F4" />
          <polygon points="210,48 220,40 230,48 225,52 220,50 215,53" fill="#F4F8F4" />
          <polygon points="370,52 380,45 390,52 385,55 380,54 375,56" fill="#F4F8F4" />
          <polygon points="530,38 540,30 550,38 545,42 540,40 535,43" fill="#F4F8F4" />
          <polygon points="710,48 720,40 730,48 725,52 720,50 715,53" fill="#F4F8F4" />
          <polygon points="890,43 900,35 910,43 905,47 900,45 895,48" fill="#F4F8F4" />

          {/* Средний план: лесистые реликтовые холмы */}
          <polygon
            points="0,125 100,95 240,120 380,90 520,115 680,85 820,110 980,85 1120,110 1200,95 1200,160 0,160"
            fill="#9AC59F"
          />

          {/* Ближний склон альпийского луга с сочной травой */}
          <polygon
            points="0,138 160,124 340,134 520,118 700,132 880,120 1060,133 1200,124 1200,160 0,160"
            fill="#80B486"
          />

          {/* ======================================================= */}
          {/* 2. АНИМИРОВАННАЯ ГОРНАЯ РЕКА (ОТ КРАЯ ДО КРАЯ 0..1200)  */}
          {/* ======================================================= */}
          {/* Русло реки */}
          <path
            d="M 0,132 Q 180,126 360,133 T 720,137 T 980,132 T 1200,136 L 1200,160 L 0,160 Z"
            fill="#4B8BAC"
          />
          {/* Верхняя кромка / берег реки */}
          <path
            d="M 0,132 Q 180,126 360,133 T 720,137 T 980,132 T 1200,136"
            fill="none"
            stroke="#68A5CA"
            strokeWidth="1.5"
          />
          {/* Течение и блики горной реки */}
          <path
            d="M 0,138 Q 180,132 360,139 T 720,143 T 980,138 T 1200,142"
            fill="none"
            stroke="#A7D4EF"
            strokeWidth="3.2"
            className="flow-river"
          />
          <path
            d="M 0,146 Q 180,140 360,147 T 720,151 T 980,146 T 1200,150"
            fill="none"
            stroke="#EBF6FD"
            strokeWidth="1.6"
            className="flow-river"
            style={{ animationDuration: '2.8s' }}
          />

          {/* ======================================================= */}
          {/* 3. ПИКСЕЛЬНЫЕ РЕЛИКТОВЫЕ СОСНЫ И ЦВЕТЫ                   */}
          {/* ======================================================= */}
          {/* Сосны на лугу */}
          <g transform="translate(60, 100)">
            <rect x="3" y="14" width="2" height="6" fill="#4E3629" />
            <polygon points="4,2 0,9 8,9" fill="#2D5A37" />
            <polygon points="4,7 -2,15 10,15" fill="#234B2C" />
          </g>
          <g transform="translate(100, 105)">
            <rect x="2" y="10" width="2" height="5" fill="#4E3629" />
            <polygon points="3,0 0,6 6,6" fill="#3B6E4A" />
            <polygon points="3,4 -1,11 7,11" fill="#2D5A37" />
          </g>
          <g transform="translate(200, 96)">
            <rect x="3" y="14" width="2" height="6" fill="#4E3629" />
            <polygon points="4,2 0,9 8,9" fill="#2D5A37" />
            <polygon points="4,7 -2,15 10,15" fill="#234B2C" />
          </g>
          <g transform="translate(680, 95)">
            <rect x="3" y="14" width="2" height="6" fill="#4E3629" />
            <polygon points="4,2 0,9 8,9" fill="#2D5A37" />
            <polygon points="4,7 -2,15 10,15" fill="#234B2C" />
          </g>
          <g transform="translate(920, 90)">
            <rect x="3" y="14" width="2" height="6" fill="#4E3629" />
            <polygon points="4,2 0,9 8,9" fill="#2D5A37" />
            <polygon points="4,7 -2,15 10,15" fill="#234B2C" />
          </g>

          {/* Альпийские цветы на поляне */}
          <rect x="150" y="120" width="2" height="2" fill="#FEF08A" />
          <rect x="290" y="122" width="2" height="2" fill="#FEF08A" />
          <rect x="305" y="126" width="2" height="2" fill="#F472B6" />
          <rect x="470" y="116" width="2" height="2" fill="#FEF08A" />
          <rect x="520" y="122" width="2" height="2" fill="#93C5FD" />
          <rect x="740" y="118" width="2" height="2" fill="#F472B6" />
          <rect x="850" y="117" width="2" height="2" fill="#FEF08A" />
        </svg>

        {/* ======================================================= */}
        {/* 4. АНИМИРОВАННЫЕ ПИКСЕЛЬНЫЕ ОВЕЧКИ (ГОЛОВОЙ ВПЕРЕД)      */}
        {/* ======================================================= */}
        {/* Овечка 1: гуляет на поляне слева */}
        <div
          className="absolute left-[24%] top-[58%] sm:top-[62%] cursor-pointer group"
          onClick={() => handleSheepClick(1)}
          title="Нажмите на овечку!"
        >
          <div className="sheep-roam-1 relative">
            {clickedSheep === 1 && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded-md border border-stone-300 text-[10px] font-bold text-emerald-800 shadow-sm animate-bounce whitespace-nowrap">
                Бе-е! 🌿
              </div>
            )}
            {/* Овечка по умолчанию нарисована лицом вправо (голова справа x=12..16) */}
            <svg
              width="24"
              height="18"
              viewBox="0 0 16 12"
              className="drop-shadow-sm group-hover:scale-125 transition-transform"
              shapeRendering="crispEdges"
            >
              {/* Ножки */}
              <rect x="3" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="6" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="9" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="12" y="9" width="1.5" height="3" fill="#1C1E1B" />
              {/* Хвостик (слева) */}
              <rect x="0" y="4" width="2" height="2" fill="#FFFFFF" />
              {/* Тело (пушистая шерсть) */}
              <rect x="1" y="3" width="12" height="6" fill="#FFFFFF" />
              <rect x="2" y="2" width="10" height="8" fill="#F1F5F1" />
              {/* Голова (справа) */}
              <rect x="12" y="3" width="4" height="4" fill="#232622" />
              {/* Ушко */}
              <rect x="13" y="2" width="2" height="2" fill="#3B3F39" />
              {/* Глазик */}
              <rect x="14" y="4" width="1" height="1" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* Овечка 2: пасется в центре */}
        <div
          className="absolute left-[52%] top-[52%] sm:top-[56%] cursor-pointer group"
          onClick={() => handleSheepClick(2)}
          title="Нажмите на овечку!"
        >
          <div className="sheep-roam-2 relative">
            {clickedSheep === 2 && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded-md border border-stone-300 text-[10px] font-bold text-emerald-800 shadow-sm animate-bounce whitespace-nowrap">
                ❤️ Апсны
              </div>
            )}
            <svg
              width="22"
              height="16"
              viewBox="0 0 16 12"
              className="drop-shadow-sm group-hover:scale-125 transition-transform"
              shapeRendering="crispEdges"
            >
              <rect x="3" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="6" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="9" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="12" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="0" y="4" width="2" height="2" fill="#FFFFFF" />
              <rect x="1" y="3" width="12" height="6" fill="#FFFFFF" />
              <rect x="2" y="2" width="10" height="8" fill="#F1F5F1" />
              <rect x="12" y="3" width="4" height="4" fill="#232622" />
              <rect x="13" y="2" width="2" height="2" fill="#3B3F39" />
              <rect x="14" y="4" width="1" height="1" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* Овечка 3: маленькая овечка на холме справа */}
        <div
          className="absolute left-[78%] top-[48%] sm:top-[52%] cursor-pointer group"
          onClick={() => handleSheepClick(3)}
          title="Нажмите на овечку!"
        >
          <div className="sheep-roam-3 relative">
            {clickedSheep === 3 && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded-md border border-stone-300 text-[10px] font-bold text-emerald-800 shadow-sm animate-bounce whitespace-nowrap">
                ✨ Ме-е!
              </div>
            )}
            <svg
              width="18"
              height="14"
              viewBox="0 0 16 12"
              className="drop-shadow-sm group-hover:scale-125 transition-transform"
              shapeRendering="crispEdges"
            >
              <rect x="3" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="6" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="9" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="12" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="0" y="4" width="2" height="2" fill="#FFFFFF" />
              <rect x="1" y="3" width="12" height="6" fill="#FFFFFF" />
              <rect x="2" y="2" width="10" height="8" fill="#F1F5F1" />
              <rect x="12" y="3" width="4" height="4" fill="#232622" />
              <rect x="13" y="2" width="2" height="2" fill="#3B3F39" />
              <rect x="14" y="4" width="1" height="1" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* Тонкий бейдж ландшафта */}
        <div className="absolute bottom-2.5 right-4 bg-white/85 backdrop-blur-md px-3 py-1 rounded-full border border-stone-200/80 text-[10px] font-semibold text-emerald-800 flex items-center gap-1.5 shadow-soft-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Кавказские горы, река Бзыбь и альпийские луга Рицы</span>
        </div>
      </div>
    </div>
  );
}
