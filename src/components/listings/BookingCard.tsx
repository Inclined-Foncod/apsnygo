'use client';

import { useState } from 'react';
import { Star, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  DateRangePicker,
  DateRange,
} from '@/components/ui/DateRangePicker';
import {
  GuestSelector,
  GuestCount,
  DEFAULT_GUESTS,
} from '@/components/ui/GuestSelector';
import { formatPrice } from '@/lib/utils';

export interface BookingCardProps {
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  maxGuests?: number;
}

export function BookingCard({
  pricePerNight,
  rating,
  reviewCount,
  maxGuests = 4,
}: BookingCardProps) {
  // Начальные даты: завтра + 7 дней
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return { startDate: start, endDate: end };
  });

  const [guests, setGuests] = useState<GuestCount>(DEFAULT_GUESTS);
  const [isBooked, setIsBooked] = useState(false);

  // Вычисление количества ночей
  const nights = (() => {
    if (!dateRange.startDate || !dateRange.endDate) return 1;
    const diff = Math.abs(
      dateRange.endDate.getTime() - dateRange.startDate.getTime()
    );
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const subtotal = pricePerNight * nights;

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 3000);
  };

  return (
    <div className="sticky top-28 bg-white rounded-3xl border border-stone-gray-200/90 p-5 sm:p-6 shadow-soft-xl relative z-20">
      {/* Цена и рейтинг */}
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-stone-gray-900">
            {formatPrice(pricePerNight)}
          </span>
          <span className="text-xs text-stone-gray-500 ml-1">/ сутки</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-gray-900 bg-stone-gray-50 px-2.5 py-1 rounded-xl border border-stone-gray-200">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
          <span className="text-stone-gray-400 font-normal">
            ({reviewCount})
          </span>
        </div>
      </div>

      {/* Интерактивный блок выбора дат и гостей */}
      <div className="space-y-2 mb-5">
        {/* Календарь дат поездки */}
        <div className="bg-[#FAF9F5] rounded-2xl border border-stone-gray-200/90 p-1 hover:border-moss-400 transition-colors">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            variant="compact"
          />
        </div>

        {/* Селектор гостей с инкрементами */}
        <div className="bg-[#FAF9F5] rounded-2xl border border-stone-gray-200/90 p-1 hover:border-moss-400 transition-colors">
          <GuestSelector
            value={guests}
            onChange={setGuests}
            variant="compact"
          />
        </div>
      </div>

      {/* Расчет стоимости бронирования */}
      <div className="space-y-2.5 text-xs text-stone-gray-600 mb-5 pb-5 border-b border-stone-gray-100">
        <div className="flex justify-between items-center">
          <span className="underline decoration-dotted underline-offset-4">
            {formatPrice(pricePerNight)} × {nights} {nights === 1 ? 'ночь' : nights >= 2 && nights <= 4 ? 'ночи' : 'ночей'}
          </span>
          <span className="font-semibold text-stone-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Комиссия ApsnyGO
          </span>
          <span className="font-bold text-emerald-700">0 ₽ (0%)</span>
        </div>

        <div className="flex justify-between items-center pt-2 text-sm font-bold text-stone-gray-900 border-t border-stone-gray-100">
          <span>Итого</span>
          <span className="text-lg font-extrabold text-stone-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>

      {/* Кнопка бронирования */}
      <Button
        type="button"
        onClick={handleBook}
        variant="primary"
        size="lg"
        className="w-full justify-center shadow-green-glow mb-4 h-12 text-sm font-bold"
      >
        {isBooked ? (
          <span className="flex items-center gap-1.5 text-white">
            <CheckCircle2 className="w-4 h-4 text-white" />
            Запрос отправлен!
          </span>
        ) : (
          'Забронировать'
        )}
      </Button>

      {/* Гарантии */}
      <div className="text-center text-xs text-stone-gray-500 space-y-1">
        <p>Вы пока ни за что не платите</p>
        <p className="flex items-center justify-center gap-1.5 text-moss-700 font-semibold pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Безопасная сделка ApsnyGO
        </p>
      </div>
    </div>
  );
}
