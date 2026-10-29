import React from 'react';
import { cn } from '@/lib/utils';

export interface BackgroundPatternProps {
  variant?: 'dots' | 'topo' | 'pine-watermark' | 'mountains-watermark';
  className?: string;
  opacity?: string;
}

export function BackgroundPattern({
  variant = 'dots',
  className,
  opacity,
}: BackgroundPatternProps) {
  if (variant === 'dots') {
    return (
      <div
        className={cn(
          'absolute inset-0 -z-10 pointer-events-none select-none',
          'bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]',
          opacity || 'opacity-[0.07]',
          '[mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,#000_70%,transparent_100%)]',
          className
        )}
        aria-hidden="true"
      />
    );
  }

  if (variant === 'topo') {
    return (
      <div
        className={cn(
          'absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden',
          opacity || 'opacity-[0.25]',
          className
        )}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full min-w-[1200px] stroke-stone-300/60 dark:stroke-stone-600/30"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Плавные изолинии горного рельефа Кавказа (изогипсы) */}
          <path
            d="M -100 120 C 200 40, 480 180, 800 90 C 1120 0, 1340 130, 1540 80"
            strokeWidth="1"
            strokeDasharray="6 4"
          />
          <path
            d="M -100 180 C 220 100, 440 230, 780 150 C 1100 70, 1320 200, 1540 140"
            strokeWidth="1"
          />
          <path
            d="M -100 240 C 180 170, 500 300, 840 210 C 1140 130, 1360 270, 1540 200"
            strokeWidth="1"
          />
          <path
            d="M -100 310 C 240 230, 460 360, 820 270 C 1110 190, 1300 330, 1540 260"
            strokeWidth="1.2"
          />
          <path
            d="M -100 380 C 200 300, 520 420, 860 330 C 1150 250, 1340 400, 1540 330"
            strokeWidth="1"
            strokeDasharray="8 6"
          />
          <path
            d="M -100 450 C 260 380, 480 490, 800 400 C 1120 320, 1380 470, 1540 400"
            strokeWidth="1"
          />
          <path
            d="M -100 520 C 180 440, 500 550, 840 460 C 1180 380, 1350 530, 1540 480"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'pine-watermark') {
    return (
      <div
        className={cn(
          'absolute right-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none overflow-hidden',
          opacity || 'opacity-[0.035]',
          className
        )}
        aria-hidden="true"
      >
        {/* Контур реликтовой сосны Пицунды (Pinus pithyusa) */}
        <svg
          className="w-[480px] h-[640px] text-emerald-700"
          viewBox="0 0 400 540"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ствол и ветви */}
          <path d="M195 540 L205 540 L203 260 L212 180 L200 60 L188 180 L197 260 Z" />
          {/* Ярусы реликтовой кроны сосны */}
          <path d="M200 20 C180 40 160 70 170 90 C185 95 215 95 230 90 C240 70 220 40 200 20 Z" />
          <path d="M200 70 C160 100 130 140 150 165 C175 170 225 170 250 165 C270 140 240 100 200 70 Z" />
          <path d="M200 130 C150 170 100 220 130 255 C165 260 235 260 270 255 C300 220 250 170 200 130 Z" />
          <path d="M200 200 C130 250 70 310 110 350 C155 355 245 355 290 350 C330 310 270 250 200 200 Z" />
          <path d="M200 270 C110 330 40 400 90 445 C145 450 255 450 310 445 C360 400 290 330 200 270 Z" />
          {/* Характерные длинные пучки хвои */}
          <circle cx="95" cy="430" r="14" />
          <circle cx="305" cy="430" r="14" />
          <circle cx="115" cy="335" r="12" />
          <circle cx="285" cy="335" r="12" />
          <circle cx="135" cy="245" r="10" />
          <circle cx="265" cy="245" r="10" />
        </svg>
      </div>
    );
  }

  if (variant === 'mountains-watermark') {
    return (
      <div
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none overflow-hidden',
          opacity || 'opacity-[0.035]',
          className
        )}
        aria-hidden="true"
      >
        {/* Контур горных хребтов Кавказа */}
        <svg
          className="w-[580px] h-[400px] text-emerald-800"
          viewBox="0 0 600 400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 380 L120 220 L200 280 L340 140 L440 260 L520 180 L600 310" />
          <path d="M60 380 L160 270 L260 340 L380 210 L480 300 L560 240 L600 320" strokeDasharray="6 6" />
          <path d="M120 220 L150 260 M340 140 L370 200 M520 180 L545 220" />
        </svg>
      </div>
    );
  }

  return null;
}
