import React from 'react';
import { cn } from '@/lib/utils';

export interface PixelDividerProps {
  variant?: 'pine' | 'mountain' | 'spark';
  className?: string;
}

export function PixelDivider({
  variant = 'pine',
  className,
}: PixelDividerProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center w-full max-w-5xl mx-auto my-8 sm:my-12 px-4 select-none pointer-events-none',
        className
      )}
      aria-hidden="true"
    >
      {/* Тонкая градиентная разделительная линия */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-stone-300/80 to-transparent" />
      </div>

      {/* Центральный пиксельный маркер 16x16 в цвете бархатистого мха #4A6B53 */}
      <div className="relative px-3 py-1 bg-stone-50/90 backdrop-blur-sm border border-stone-200/80 rounded-full flex items-center justify-center shadow-soft-sm">
        {variant === 'pine' && (
          <svg
            className="w-4 h-4 text-[#4A6B53]"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
          >
            {/* 16x16 пиксельная реликтовая сосна */}
            <rect x="7" y="1" width="2" height="2" />
            <rect x="6" y="3" width="4" height="2" />
            <rect x="5" y="5" width="6" height="2" />
            <rect x="4" y="7" width="8" height="2" />
            <rect x="3" y="9" width="10" height="2" />
            <rect x="2" y="11" width="12" height="2" />
            <rect x="7" y="13" width="2" height="3" fill="#6B4B32" />
          </svg>
        )}

        {variant === 'mountain' && (
          <svg
            className="w-4 h-4 text-[#4A6B53]"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
          >
            {/* 16x16 пиксельная вершина Кавказского хребта */}
            <rect x="7" y="2" width="2" height="2" />
            <rect x="6" y="4" width="4" height="2" />
            <rect x="5" y="6" width="6" height="2" />
            <rect x="4" y="8" width="8" height="2" />
            <rect x="3" y="10" width="10" height="2" />
            <rect x="2" y="12" width="12" height="2" />
            <rect x="1" y="14" width="14" height="2" />
            {/* Заснеженная вершина */}
            <rect x="7" y="4" width="2" height="2" fill="#E6EDE7" />
          </svg>
        )}

        {variant === 'spark' && (
          <svg
            className="w-4 h-4 text-[#4A6B53]"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
          >
            {/* 16x16 пиксельная искра */}
            <rect x="7" y="1" width="2" height="4" />
            <rect x="7" y="11" width="2" height="4" />
            <rect x="1" y="7" width="4" height="2" />
            <rect x="11" y="7" width="4" height="2" />
            <rect x="5" y="5" width="6" height="6" fill="#15803D" />
            <rect x="7" y="7" width="2" height="2" fill="#FEF08A" />
          </svg>
        )}
      </div>
    </div>
  );
}
