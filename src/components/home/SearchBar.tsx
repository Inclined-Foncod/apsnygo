'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ABKHAZIA_CITIES } from '@/lib/constants';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city && city !== 'all') params.append('city', city);
    if (guests) params.append('guests', guests);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-3xl p-3 md:p-4 shadow-soft-lg border border-stone-gray-200 max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        {/* Город / Курорт */}
        <div className="p-3 rounded-2xl hover:bg-stone-gray-50 transition-colors border border-transparent hover:border-stone-gray-200">
          <label className="text-[11px] font-bold uppercase tracking-wider text-moss-700 flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5 text-moss-600" />
            Курорт
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-transparent font-heading font-semibold text-stone-gray-900 text-sm focus:outline-none cursor-pointer"
          >
            <option value="">Все курорты Абхазии</option>
            {ABKHAZIA_CITIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Даты заезда */}
        <div className="p-3 rounded-2xl hover:bg-stone-gray-50 transition-colors border border-transparent hover:border-stone-gray-200">
          <label className="text-[11px] font-bold uppercase tracking-wider text-moss-700 flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-moss-600" />
            Даты
          </label>
          <input
            type="text"
            placeholder="Когда планируете?"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = 'text';
            }}
            className="w-full bg-transparent font-heading font-semibold text-stone-gray-900 text-sm focus:outline-none placeholder:text-stone-gray-400 cursor-pointer"
          />
        </div>

        {/* Количество гостей */}
        <div className="p-3 rounded-2xl hover:bg-stone-gray-50 transition-colors border border-transparent hover:border-stone-gray-200">
          <label className="text-[11px] font-bold uppercase tracking-wider text-moss-700 flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-moss-600" />
            Гости
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-transparent font-heading font-semibold text-stone-gray-900 text-sm focus:outline-none cursor-pointer"
          >
            <option value="1">1 гость</option>
            <option value="2">2 гостей</option>
            <option value="3">3 гостей</option>
            <option value="4">4+ гостей</option>
            <option value="family">Семья с детьми</option>
          </select>
        </div>

        {/* Кнопка поиска */}
        <div className="p-1">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 shadow-green-glow"
          >
            <Search className="w-5 h-5" />
            <span>Найти жилье</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
