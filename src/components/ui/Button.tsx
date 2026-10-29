import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'moss' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variantStyles = {
      primary:
        'bg-green-600 hover:bg-green-700 text-white shadow-soft-sm hover:shadow-green-glow active:scale-[0.98]',
      moss:
        'bg-moss-600 hover:bg-moss-700 text-white shadow-soft-sm hover:shadow-moss-glow active:scale-[0.98]',
      secondary:
        'bg-moss-100 text-moss-900 hover:bg-moss-200 active:scale-[0.98]',
      outline:
        'border border-stone-gray-300 text-stone-gray-700 hover:border-moss-600 hover:text-moss-700 bg-white active:scale-[0.98]',
      ghost:
        'text-stone-gray-700 hover:bg-stone-gray-100 active:scale-[0.98]',
    };

    const sizeStyles = {
      sm: 'h-9 px-3 text-xs rounded-lg font-medium',
      md: 'h-11 px-5 text-sm rounded-xl font-semibold',
      lg: 'h-13 px-7 text-base rounded-2xl font-semibold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none select-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
