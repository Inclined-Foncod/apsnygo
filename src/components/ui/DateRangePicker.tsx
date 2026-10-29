'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Moon, X } from 'lucide-react';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  className?: string;
  variant?: 'compact' | 'hero';
}

const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function formatShortDate(date: Date): string {
  const day = date.getDate();
  const monthsShort = [
    'янв',
    'фев',
    'мар',
    'апр',
    'мая',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
  return `${day} ${monthsShort[date.getMonth()]}`;
}

export function formatDateRangeSummary(range: DateRange): string {
  if (!range.startDate && !range.endDate) {
    return 'Когда планируете?';
  }
  if (range.startDate && !range.endDate) {
    return `${formatShortDate(range.startDate)} — выезд?`;
  }
  if (range.startDate && range.endDate) {
    const diffTime = Math.abs(range.endDate.getTime() - range.startDate.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nightLabel =
      nights === 1 ? 'ночь' : nights >= 2 && nights <= 4 ? 'ночи' : 'ночей';
    return `${formatShortDate(range.startDate)} — ${formatShortDate(range.endDate)} (${nights} ${nightLabel})`;
  }
  return 'Когда планируете?';
}

export function DateRangePicker({
  value = { startDate: null, endDate: null },
  onChange,
  className = '',
  variant = 'hero',
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Текущий отображаемый месяц в календаре
  const [currentMonth, setCurrentMonth] = useState(() => {
    return value.startDate || new Date();
  });

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

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Генерация дней месяца
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // День недели первого дня (0 - вс, переводим в 0 - пн ... 6 - вс)
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days: (Date | null)[] = [];

    // Пустые ячейки до первого дня месяца
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Дни месяца
    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  }, [year, month]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isBetween = (d: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false;
    const t = d.getTime();
    return t > start.getTime() && t < end.getTime();
  };

  const handleDayClick = (day: Date) => {
    if (day < today) return; // Нельзя выбрать прошедшую дату

    if (!value.startDate || (value.startDate && value.endDate)) {
      // Первый клик: установка даты заезда
      if (onChange) {
        onChange({ startDate: day, endDate: null });
      }
    } else if (value.startDate && !value.endDate) {
      // Второй клик: установка даты выезда
      if (day < value.startDate) {
        // Если кликнули раньше даты заезда, делаем её новым заездом
        if (onChange) {
          onChange({ startDate: day, endDate: null });
        }
      } else {
        if (onChange) {
          onChange({ startDate: value.startDate, endDate: day });
          // Небольшая задержка перед закрытием для комфорта
          setTimeout(() => setIsOpen(false), 250);
        }
      }
    }
  };

  // Быстрые пресеты дат
  const applyPreset = (daysCount: number) => {
    const start = new Date(today);
    // Начиная с завтра или ближайшей пятницы
    start.setDate(today.getDate() + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + daysCount);

    if (onChange) {
      onChange({ startDate: start, endDate: end });
      setTimeout(() => setIsOpen(false), 200);
    }
  };

  const clearDates = () => {
    if (onChange) {
      onChange({ startDate: null, endDate: null });
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev);
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
          <Calendar className="w-3.5 h-3.5 text-moss-600" />
          Даты поездки
        </span>
        <div className="flex items-center justify-between">
          <span className="font-heading font-semibold text-stone-gray-900 text-sm truncate">
            {formatDateRangeSummary(value)}
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

      {/* Выпадающий поповер-календарь (Framer Motion) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute top-full left-0 md:left-1/2 md:-translate-x-1/2 mt-2 z-50 w-84 sm:w-96 bg-[#FDFCF9] border border-stone-gray-200 rounded-3xl p-5 shadow-2xl backdrop-blur-md"
          >
            {/* Навигация по месяцам */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-gray-200/80">
              <button
                type="button"
                onClick={prevMonth}
                disabled={
                  year === today.getFullYear() && month === today.getMonth()
                }
                className="w-8 h-8 rounded-full border border-stone-gray-200 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:bg-moss-50 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-heading font-extrabold text-sm text-stone-gray-900">
                {MONTH_NAMES[month]} {year}
              </span>

              <button
                type="button"
                onClick={nextMonth}
                className="w-8 h-8 rounded-full border border-stone-gray-200 flex items-center justify-center text-stone-gray-700 hover:border-moss-600 hover:bg-moss-50 transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Дни недели */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {WEEKDAYS.map((wd) => (
                <span
                  key={wd}
                  className="text-[11px] font-bold text-stone-gray-400 py-1"
                >
                  {wd}
                </span>
              ))}
            </div>

            {/* Сетка дней месяца */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => {
                if (!day) {
                  return <div key={`empty-${idx}`} className="h-9 w-full" />;
                }

                const isPast = day < today;
                const isStart = isSameDay(day, value.startDate);
                const isEnd = isSameDay(day, value.endDate);
                const isInSelectedRange = isBetween(
                  day,
                  value.startDate,
                  value.endDate
                );
                const isInHoverRange =
                  value.startDate &&
                  !value.endDate &&
                  hoverDate &&
                  hoverDate > value.startDate &&
                  isBetween(day, value.startDate, hoverDate);

                let cellClass =
                  'h-9 w-full rounded-xl flex items-center justify-center text-xs font-semibold transition-all relative ';

                if (isPast) {
                  cellClass += 'text-stone-gray-300 pointer-events-none';
                } else if (isStart || isEnd) {
                  cellClass +=
                    'bg-emerald-600 text-white font-bold shadow-soft scale-105 z-10';
                } else if (isInSelectedRange || isInHoverRange) {
                  cellClass +=
                    'bg-emerald-100/70 text-emerald-950 font-bold rounded-none';
                } else {
                  cellClass +=
                    'text-stone-gray-800 hover:bg-moss-100/60 hover:text-moss-900 cursor-pointer active:scale-95';
                }

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleDayClick(day)}
                    onMouseEnter={() => setHoverDate(day)}
                    className={cellClass}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Быстрые пресеты */}
            <div className="mt-4 pt-3 border-t border-stone-gray-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-gray-400 block mb-2">
                Быстрый выбор
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => applyPreset(3)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-stone-gray-100 hover:bg-moss-100 text-stone-gray-700 hover:text-moss-800 transition-colors"
                >
                  Выходные (3 дня)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(7)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-stone-gray-100 hover:bg-moss-100 text-stone-gray-700 hover:text-moss-800 transition-colors"
                >
                  Неделя (7 дней)
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(10)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-stone-gray-100 hover:bg-moss-100 text-stone-gray-700 hover:text-moss-800 transition-colors"
                >
                  10 дней
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(14)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-stone-gray-100 hover:bg-moss-100 text-stone-gray-700 hover:text-moss-800 transition-colors"
                >
                  2 недели
                </button>
              </div>
            </div>

            {/* Подвал с кнопками */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-gray-200/80">
              <button
                type="button"
                onClick={clearDates}
                className="text-xs font-semibold text-stone-gray-500 hover:text-stone-gray-900 transition-colors underline underline-offset-4"
              >
                Сбросить
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-soft transition-all active:scale-95"
              >
                Применить
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
