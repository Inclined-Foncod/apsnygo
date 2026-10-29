'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface PixelMeadowProps {
  className?: string;
  showWaterfall?: boolean;
}

export function PixelMeadow({
  className,
  showWaterfall = true,
}: PixelMeadowProps) {
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
        @keyframes waterfallDrop {
          0% {
            transform: translateY(0);
            opacity: 0.9;
          }
          100% {
            transform: translateY(32px);
            opacity: 0.2;
          }
        }
        @keyframes foamSplash {
          0%, 100% {
            transform: scale(0.9) translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2) translateY(-2px);
            opacity: 1;
          }
        }
        @keyframes graze1 {
          0% {
            transform: translateX(0) scaleX(1);
          }
          45% {
            transform: translateX(110px) scaleX(1);
          }
          50% {
            transform: translateX(110px) scaleX(-1);
          }
          95% {
            transform: translateX(0) scaleX(-1);
          }
          100% {
            transform: translateX(0) scaleX(1);
          }
        }
        @keyframes graze2 {
          0% {
            transform: translateX(0) scaleX(-1);
          }
          45% {
            transform: translateX(-90px) scaleX(-1);
          }
          50% {
            transform: translateX(-90px) scaleX(1);
          }
          95% {
            transform: translateX(0) scaleX(1);
          }
          100% {
            transform: translateX(0) scaleX(-1);
          }
        }
        @keyframes graze3 {
          0% {
            transform: translateX(0) scaleX(1);
          }
          40% {
            transform: translateX(70px) scaleX(1);
          }
          48% {
            transform: translateX(70px) scaleX(-1);
          }
          92% {
            transform: translateX(0) scaleX(-1);
          }
          100% {
            transform: translateX(0) scaleX(1);
          }
        }
        .flow-river {
          stroke-dasharray: 8 6;
          animation: flowWater 1.8s linear infinite;
        }
        .flow-waterfall {
          animation: waterfallDrop 0.9s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .splash-particle {
          animation: foamSplash 0.8s ease-in-out infinite;
        }
        .sheep-roam-1 {
          animation: graze1 22s ease-in-out infinite;
        }
        .sheep-roam-2 {
          animation: graze2 18s ease-in-out infinite;
        }
        .sheep-roam-3 {
          animation: graze3 26s ease-in-out infinite;
        }
      `}</style>

      {/* Контейнер интерактивной пиксельной диорамы гор, реки и альпийских лугов */}
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
          {/* Дальний план (мягкий сизо-зеленый оттенок) */}
          <polygon
            points="0,110 80,60 140,85 220,40 300,90 380,45 460,85 540,30 640,95 720,40 800,80 900,35 1000,85 1100,50 1200,105 1200,160 0,160"
            fill="#B5D6B8"
          />
          {/* Снежные пиксельные шапки вершин */}
          <polygon points="210,48 220,40 230,48 225,52 220,50 215,53" fill="#F4F8F4" />
          <polygon points="370,52 380,45 390,52 385,55 380,54 375,56" fill="#F4F8F4" />
          <polygon points="530,38 540,30 550,38 545,42 540,40 535,43" fill="#F4F8F4" />
          <polygon points="710,48 720,40 730,48 725,52 720,50 715,53" fill="#F4F8F4" />
          <polygon points="890,43 900,35 910,43 905,47 900,45 895,48" fill="#F4F8F4" />

          {/* Средний план (реликтовые лесистые холмы) */}
          <polygon
            points="0,125 100,95 240,120 380,90 520,115 680,85 820,110 980,85 1120,110 1200,95 1200,160 0,160"
            fill="#9AC59F"
          />

          {/* Ближний склон альпийского луга с сочной травой */}
          <polygon
            points="0,140 160,125 340,135 520,120 700,135 880,122 1060,135 1200,125 1200,160 0,160"
            fill="#80B486"
          />

          {/* ======================================================= */}
          {/* 2. ПИКСЕЛЬНЫЙ ВОДОПАД (ГЕГСКИЙ / ВЕЛИКАН)               */}
          {/* ======================================================= */}
          {showWaterfall && (
            <g transform="translate(180, 50)">
              {/* Горная скала ущелья */}
              <rect x="-14" y="0" width="36" height="85" fill="#6E8E72" />
              <rect x="-8" y="10" width="24" height="75" fill="#58735C" />

              {/* Поток водопада */}
              <rect x="0" y="5" width="8" height="70" fill="#68A5CA" />
              <rect x="2" y="8" width="4" height="65" fill="#A7D4EF" />
              <rect x="3" y="12" width="2" height="58" fill="#FFFFFF" opacity="0.8" />

              {/* Анимированные падающие струи */}
              <g className="flow-waterfall">
                <rect x="1" y="8" width="2" height="12" fill="#EBF6FD" />
                <rect x="5" y="24" width="2" height="14" fill="#EBF6FD" />
                <rect x="2" y="42" width="3" height="16" fill="#EBF6FD" />
              </g>

              {/* Брызги и водяная пена у подножия */}
              <g className="splash-particle" transform="translate(-6, 72)">
                <rect x="0" y="0" width="20" height="6" fill="#FFFFFF" opacity="0.9" />
                <rect x="2" y="-3" width="5" height="4" fill="#E0F2FE" />
                <rect x="12" y="-4" width="6" height="4" fill="#E0F2FE" />
                <rect x="-2" y="2" width="4" height="3" fill="#FFFFFF" />
                <rect x="18" y="1" width="4" height="3" fill="#FFFFFF" />
              </g>
            </g>
          )}

          {/* ======================================================= */}
          {/* 3. АНИМИРОВАННАЯ ГОРНАЯ РЕКА (БЗЫБЬ / КОДОР)            */}
          {/* ======================================================= */}
          {/* Русло реки */}
          <path
            d="M 184,125 Q 260,135 380,132 T 580,138 T 780,134 T 980,140 T 1200,135 L 1200,155 Q 980,160 780,154 T 580,158 T 380,152 T 184,145 Z"
            fill="#5293B8"
          />
          {/* Течение и блики горной воды */}
          <path
            d="M 188,132 Q 260,138 380,135 T 580,142 T 780,137 T 980,144 T 1200,139"
            fill="none"
            stroke="#A7D4EF"
            strokeWidth="3"
            className="flow-river"
          />
          <path
            d="M 194,139 Q 270,144 390,141 T 590,148 T 790,143 T 990,150 T 1200,145"
            fill="none"
            stroke="#EBF6FD"
            strokeWidth="1.5"
            className="flow-river"
            style={{ animationDuration: '1.4s' }}
          />

          {/* ======================================================= */}
          {/* 4. ПИКСЕЛЬНЫЕ РЕЛИКТОВЫЕ СОСНЫ И ЦВЕТЫ                   */}
          {/* ======================================================= */}
          {/* Сосны на лугу */}
          <g transform="translate(100, 95)">
            <rect x="3" y="14" width="2" height="6" fill="#4E3629" />
            <polygon points="4,2 0,9 8,9" fill="#2D5A37" />
            <polygon points="4,7 -2,15 10,15" fill="#234B2C" />
          </g>
          <g transform="translate(130, 105)">
            <rect x="2" y="10" width="2" height="5" fill="#4E3629" />
            <polygon points="3,0 0,6 6,6" fill="#3B6E4A" />
            <polygon points="3,4 -1,11 7,11" fill="#2D5A37" />
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

          {/* Альпийские цветы на поляне (маленькие пиксели) */}
          <rect x="290" y="124" width="2" height="2" fill="#FEF08A" />
          <rect x="305" y="128" width="2" height="2" fill="#F472B6" />
          <rect x="470" y="120" width="2" height="2" fill="#FEF08A" />
          <rect x="520" y="126" width="2" height="2" fill="#93C5FD" />
          <rect x="740" y="122" width="2" height="2" fill="#F472B6" />
          <rect x="850" y="120" width="2" height="2" fill="#FEF08A" />
        </svg>

        {/* ======================================================= */}
        {/* 5. АНИМИРОВАННЫЕ ПИКСЕЛЬНЫЕ ОВЕЧКИ НА ЛУГУ              */}
        {/* ======================================================= */}
        {/* Овечка 1: гуляет на поляне слева */}
        <div
          className="absolute left-[26%] top-[60%] sm:top-[64%] cursor-pointer group"
          onClick={() => handleSheepClick(1)}
          title="Нажмите на овечку!"
        >
          <div className="sheep-roam-1 relative">
            {clickedSheep === 1 && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded-md border border-stone-300 text-[10px] font-bold text-emerald-800 shadow-sm animate-bounce whitespace-nowrap">
                Бе-е! 🌿
              </div>
            )}
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
              <rect x="10" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="13" y="9" width="1.5" height="3" fill="#1C1E1B" />
              {/* Тело (пушистая шерсть) */}
              <rect x="2" y="3" width="13" height="6" fill="#FFFFFF" />
              <rect x="3" y="2" width="11" height="8" fill="#F1F5F1" />
              {/* Голова и ушки */}
              <rect x="0" y="3" width="4" height="4" fill="#232622" />
              <rect x="1" y="2" width="2" height="2" fill="#3B3F39" />
              {/* Глазик */}
              <rect x="1" y="4" width="1" height="1" fill="#FFFFFF" />
              {/* Хвостик */}
              <rect x="15" y="4" width="1" height="2" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* Овечка 2: пасется в центре */}
        <div
          className="absolute left-[54%] top-[54%] sm:top-[58%] cursor-pointer group"
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
              <rect x="10" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="13" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="2" y="3" width="13" height="6" fill="#FFFFFF" />
              <rect x="3" y="2" width="11" height="8" fill="#F1F5F1" />
              <rect x="0" y="3" width="4" height="4" fill="#232622" />
              <rect x="1" y="2" width="2" height="2" fill="#3B3F39" />
              <rect x="1" y="4" width="1" height="1" fill="#FFFFFF" />
              <rect x="15" y="4" width="1" height="2" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* Овечка 3: маленькая овечка на холме справа */}
        <div
          className="absolute left-[78%] top-[50%] sm:top-[54%] cursor-pointer group"
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
              <rect x="10" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="13" y="9" width="1.5" height="3" fill="#1C1E1B" />
              <rect x="2" y="3" width="13" height="6" fill="#FFFFFF" />
              <rect x="3" y="2" width="11" height="8" fill="#F1F5F1" />
              <rect x="0" y="3" width="4" height="4" fill="#232622" />
              <rect x="1" y="2" width="2" height="2" fill="#3B3F39" />
              <rect x="1" y="4" width="1" height="1" fill="#FFFFFF" />
              <rect x="15" y="4" width="1" height="2" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* Тонкий бейдж ландшафта */}
        <div className="absolute bottom-2.5 right-4 bg-white/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-stone-200/70 text-[10px] font-semibold text-emerald-800 flex items-center gap-1 shadow-soft-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Кавказские горы, Гегский водопад и альпийские луга Рицы</span>
        </div>
      </div>
    </div>
  );
}
