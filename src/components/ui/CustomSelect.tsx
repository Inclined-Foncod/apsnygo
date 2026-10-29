'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Search, MapPin } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  subtitle?: string;
  count?: number;
  icon?: React.ReactNode;
  badge?: string;
}

export interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  searchable?: boolean;
  className?: string;
  variant?: 'compact' | 'hero';
}

export function CustomSelect({
  options,
  value,
  onChange,
  label = 'Курорт',
  placeholder = 'Все курорты Абхазии',
  icon = <MapPin className="w-3.5 h-3.5 text-moss-600" />,
  searchable = true,
  className = '',
  variant = 'hero',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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

  // Фокус на инпут поиска при открытии
  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen, searchable]);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (opt.subtitle &&
        opt.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
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
          {icon}
          {label}
        </span>
        <div className="flex items-center justify-between">
          <span className="font-heading font-semibold text-stone-gray-900 text-sm truncate">
            {selectedOption ? selectedOption.label : placeholder}
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

      {/* Выпадающий поповер (Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 z-50 w-80 sm:w-88 bg-[#FDFCF9] border border-stone-gray-200 rounded-3xl p-3 shadow-2xl backdrop-blur-md"
          >
            {/* Поисковая строка внутри селектора */}
            {searchable && (
              <div className="relative mb-2 px-1">
                <Search className="w-4 h-4 text-stone-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Найти курорт..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-gray-100/80 rounded-xl text-xs font-medium text-stone-gray-900 placeholder:text-stone-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
                />
              </div>
            )}

            {/* Список вариантов */}
            <div className="max-h-68 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/80'
                          : 'hover:bg-stone-gray-100/70 text-stone-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {opt.icon && (
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-gray-100 text-stone-gray-600'
                            }`}
                          >
                            {opt.icon}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-heading font-bold text-sm truncate flex items-center gap-1.5">
                            <span>{opt.label}</span>
                            {opt.badge && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-stone-gray-100 text-stone-gray-600 border border-stone-gray-200">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          {opt.subtitle && (
                            <div className="text-[11px] text-stone-gray-400 truncate">
                              {opt.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        {opt.count !== undefined && (
                          <span className="text-[11px] font-semibold text-stone-gray-500 bg-white px-2 py-0.5 rounded-lg border border-stone-gray-200/80 shadow-soft-sm">
                            {opt.count}
                          </span>
                        )}
                        {isSelected && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-6 text-center text-xs text-stone-gray-400">
                  Курорт не найден
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
