'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function SeasonBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full',
        'bg-white/90 backdrop-blur-md border border-emerald-200/90 shadow-[0_2px_10px_-2px_rgba(5,150,105,0.12)]',
        'hover:border-emerald-300 hover:shadow-[0_4px_14px_-2px_rgba(5,150,105,0.2)] transition-all select-none',
        className
      )}
    >
      {/* Анимированное 8-битное пиксельное солнце */}
      <div className="flex items-center justify-center shrink-0">
        <svg
          className="w-4 h-4 text-amber-500 animate-pulse"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
        >
          {/* Лучи */}
          <rect x="7" y="0" width="2" height="2" />
          <rect x="7" y="14" width="2" height="2" />
          <rect x="0" y="7" width="2" height="2" />
          <rect x="14" y="7" width="2" height="2" />
          <rect x="2" y="2" width="2" height="2" />
          <rect x="12" y="2" width="2" height="2" />
          <rect x="2" y="12" width="2" height="2" />
          <rect x="12" y="12" width="2" height="2" />
          {/* Диск солнца */}
          <rect x="5" y="4" width="6" height="8" fill="#F59E0B" />
          <rect x="4" y="5" width="8" height="6" fill="#F59E0B" />
          {/* Блик */}
          <rect x="6" y="5" width="2" height="2" fill="#FEF3C7" />
        </svg>
      </div>

      {/* Пиксельный тег сезона в шрифте Press Start 2P */}
      <span className="font-pixel text-[8px] sm:text-[9px] text-emerald-700 tracking-wider uppercase font-bold shrink-0">
        СЕЗОН 2026
      </span>

      <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />

      {/* Основной текст бейджа */}
      <span className="text-xs font-semibold text-stone-gray-700">
        Лучшее жилье в Абхазии без посредников
      </span>
    </div>
  );
}
