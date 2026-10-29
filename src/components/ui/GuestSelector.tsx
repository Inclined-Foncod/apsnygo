'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Minus, Plus, Dog, Baby, UserCheck } from 'lucide-react';

export interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface GuestSelectorProps {
  value?: GuestCount;
  onChange?: (guests: GuestCount) => void;
  className?: string;
  variant?: 'compact' | 'hero';
}

export const DEFAULT_GUESTS: GuestCount = {
  adults: 2,
  children: 0,
  infants: 0,
  pets: 0,
};

export function formatGuestSummary(guests: GuestCount): string {
  const parts: string[] = [];

  const totalPeople = guests.adults + guests.children;
  if (totalPeople === 1) {
    parts.push('1 гость');
  } else if (totalPeople >= 2 && totalPeople <= 4) {
    parts.push(`${totalPeople} гостя`);
  } else {
    parts.push(`${totalPeople} гостей`);
  }

  if (guests.infants > 0) {
    const infText =
      guests.infants === 1 ? '1 младенец' : `${guests.infants} младенца`;
    parts.push(infText);
  }

  if (guests.pets > 0) {
    parts.push('с питомцем');
  }

  return parts.join(', ');
}

export function GuestSelector({
  value = DEFAULT_GUESTS,
  onChange,
  className = '',
  variant = 'hero',
}: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике снаружи
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const updateCount = (key: keyof GuestCount, delta: number) => {
    const limits: Record<keyof GuestCount, { min: number; max: number }> = {
      adults: { min: 1, max: 12 },
      children: { min: 0, max: 8 },
      infants: { min: 0, max: 5 },
      pets: { min: 0, max: 3 },
    };

    const current = value[key];
    const next = Math.max(
      limits[key].min,
      Math.min(limits[key].max, current + delta)
    );

    if (next !== current && onChange) {
      onChange({
        ...value,
        [key]: next,
      });
    }
  };

  const resetGuests = () => {
    if (onChange) {
      onChange({
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0,
      });
    }
  };

  const isHero = variant === 'hero';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Кнопка-триггер селектора */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left transition-all ${
          isHero
            ? 'p-3 rounded-2xl hover:bg-stone-gray-50 border border-transparent hover:border-stone-gray-200'
            : 'px-4 py-2.5 bg-white border border-stone-gray-200 rounded-xl hover:border-moss-500'
        }`}
      >
        <span className="text-[11px] font-bold uppercase tracking-wider text-moss-700 flex items-center gap-1.5 mb-1">
          <Users className="w-3.5 h-3.5 text-moss-600" />
          Гости
        </span>
        <div className="flex items-center justify-between">
          <span className="font-heading font-semibold text-stone-gray-900 text-sm truncate">
            {formatGuestSummary(value)}
          </span>
          <span
            className={`text-xs text-stone-gray-400 ml-2 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            ▼
          </span>
        </div>
      </button>

      {/* Выпадающий поповер со счетчиками (Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 z-50 w-80 sm:w-88 bg-[#FDFCF9] border border-stone-gray-200 rounded-3xl p-5 shadow-2xl backdrop-blur-md"
          >
            {/* Заголовок поповера */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-gray-200/80">
              <span className="font-heading font-extrabold text-sm text-stone-gray-900">
                Количество гостей
              </span>
              <span className="text-[11px] font-semibold text-moss-700 bg-moss-50 px-2 py-0.5 rounded-lg border border-moss-200">
                Всего: {value.adults + value.children}
              </span>
            </div>

            {/* Строка 1: Взрослые */}
            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-moss-50 flex items-center justify-center text-moss-700">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-stone-gray-900">
                    Взрослые
                  </div>
                  <div className="text-[11px] text-stone-gray-400">
                    От 13 лет и старше
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={value.adults <= 1}
                  onClick={() => updateCount('adults', -1)}
                  className="w-8 h-8 rounded-full border border-stone-gray-300 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:text-moss-700 hover:bg-moss-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-heading font-bold text-stone-gray-900 text-sm">
                  {value.adults}
                </span>
                <button
                  type="button"
                  disabled={value.adults >= 12}
                  onClick={() => updateCount('adults', 1)}
                  className="w-8 h-8 rounded-full border border-stone-gray-300 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:text-moss-700 hover:bg-moss-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Строка 2: Дети */}
            <div className="flex items-center justify-between py-2.5 border-t border-stone-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-stone-gray-900">
                    Дети
                  </div>
                  <div className="text-[11px] text-stone-gray-400">
                    От 2 до 12 лет (со спальным местом)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={value.children <= 0}
                  onClick={() => updateCount('children', -1)}
                  className="w-8 h-8 rounded-full border border-stone-gray-300 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:text-moss-700 hover:bg-moss-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-heading font-bold text-stone-gray-900 text-sm">
                  {value.children}
                </span>
                <button
                  type="button"
                  disabled={value.children >= 8}
                  onClick={() => updateCount('children', 1)}
                  className="w-8 h-8 rounded-full border border-stone-gray-300 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:text-moss-700 hover:bg-moss-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Строка 3: Младенцы */}
            <div className="flex items-center justify-between py-2.5 border-t border-stone-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700">
                  <Baby className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-stone-gray-900">
                    Младенцы
                  </div>
                  <div className="text-[11px] text-stone-gray-400">
                    До 2 лет (без отдельного места)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={value.infants <= 0}
                  onClick={() => updateCount('infants', -1)}
                  className="w-8 h-8 rounded-full border border-stone-gray-300 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:text-moss-700 hover:bg-moss-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-heading font-bold text-stone-gray-900 text-sm">
                  {value.infants}
                </span>
                <button
                  type="button"
                  disabled={value.infants >= 5}
                  onClick={() => updateCount('infants', 1)}
                  className="w-8 h-8 rounded-full border border-stone-gray-300 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:text-moss-700 hover:bg-moss-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Строка 4: Питомцы */}
            <div className="flex items-center justify-between py-2.5 border-t border-stone-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-700">
                  <Dog className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-stone-gray-900">
                    С питомцем
                  </div>
                  <div className="text-[11px] text-stone-gray-400">
                    Собака или кошка
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={value.pets <= 0}
                  onClick={() => updateCount('pets', -1)}
                  className="w-8 h-8 rounded-full border border-stone-gray-300 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:text-moss-700 hover:bg-moss-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-heading font-bold text-stone-gray-900 text-sm">
                  {value.pets}
                </span>
                <button
                  type="button"
                  disabled={value.pets >= 3}
                  onClick={() => updateCount('pets', 1)}
                  className="w-8 h-8 rounded-full border border-stone-gray-300 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:text-moss-700 hover:bg-moss-50 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Подвал с кнопками сброса и подтверждения */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-stone-gray-200/80">
              <button
                type="button"
                onClick={resetGuests}
                className="text-xs font-semibold text-stone-gray-500 hover:text-stone-gray-900 transition-colors underline underline-offset-4"
              >
                Сбросить
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-soft transition-all active:scale-95"
              >
                Готово
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
