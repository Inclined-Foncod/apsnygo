import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'green' | 'moss' | 'stone' | 'outline';
  className?: string;
}

export function Badge({
  children,
  variant = 'moss',
  className,
}: BadgeProps) {
  const variantStyles = {
    green: 'bg-green-50 text-green-700 border-green-200',
    moss: 'bg-moss-50 text-moss-700 border-moss-200',
    stone: 'bg-stone-gray-100 text-stone-gray-700 border-stone-gray-200',
    outline: 'bg-white text-stone-gray-700 border-stone-gray-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
