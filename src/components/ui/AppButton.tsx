'use client';

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AppButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'glass' | 'glow' | 'moss' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  shimmer?: boolean;
  children: React.ReactNode;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      shimmer = variant === 'primary' || variant === 'glow',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      // Сочный изумрудный градиент с внутренним свечением и шиммером
      primary:
        'group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-semibold shadow-[0_10px_25px_-5px_rgba(5,150,105,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(5,150,105,0.5)] border border-emerald-400/30',

      // Glassmorphism: белая полупрозрачная основа с деликатной зеленой подсветкой
      glass:
        'group relative bg-white/80 backdrop-blur-md border border-stone-200/90 text-stone-gray-800 hover:border-emerald-500/50 hover:bg-emerald-50/50 hover:text-emerald-800 shadow-soft-sm transition-colors',

      // Пульсирующий изумрудный ареол (glow effect) для темных баннеров
      glow:
        'group relative bg-emerald-600 hover:bg-emerald-500 text-white font-semibold before:absolute before:inset-0 before:bg-emerald-500 before:rounded-2xl before:blur-lg before:opacity-40 before:-z-10 hover:before:opacity-75 before:transition-opacity border border-emerald-400/40',

      // Моховый благородный оттенок лесов Абхазии
      moss:
        'group relative bg-moss-700 hover:bg-moss-800 text-white font-semibold shadow-soft-sm hover:shadow-moss-glow border border-moss-600/30',

      // Легкий контурный стиль с теплым камнем
      outline:
        'group relative border border-stone-200 text-stone-gray-700 hover:border-emerald-600/60 hover:text-emerald-700 bg-white/90 backdrop-blur-sm shadow-soft-sm',

      // Призрачная кнопка
      ghost:
        'group relative text-stone-gray-700 hover:bg-stone-gray-100/80 hover:text-stone-gray-900',
    };

    const sizeStyles = {
      sm: 'h-9 px-3.5 text-xs rounded-xl font-medium gap-1.5',
      md: 'h-11 px-5 text-sm rounded-xl font-semibold gap-2',
      lg: 'h-14 px-7 text-base rounded-2xl font-semibold gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={disabled ? undefined : { scale: 1.02, y: -1 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center select-none cursor-pointer',
          'transition-all duration-300',
          'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Эффект бегущего светового блика (Shimmer) */}
        {shimmer && (
          <span
            className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}
        {children}
      </motion.button>
    );
  }
);

AppButton.displayName = 'AppButton';
