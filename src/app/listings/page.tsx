'use client';

import { Container } from '@/components/layout/Container';
import { ListingCard } from '@/components/listings/ListingCard';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { ABKHAZIA_CITIES } from '@/lib/constants';
import { MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function ListingsContent() {
  const searchParams = useSearchParams();
  const selectedCity = searchParams.get('city') || '';
  const selectedType = searchParams.get('type') || '';

  const filteredListings = MOCK_LISTINGS.filter((item) => {
    if (selectedCity && item.city !== selectedCity) return false;
    if (selectedType && item.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="py-8 bg-white min-h-[calc(100vh-80px)]">
      <Container>
        {/* Хлебные крошки и заголовок */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-moss-700">
            Поиск жилья в Абхазии
          </span>
          <h1 className="text-3xl font-extrabold text-stone-gray-900 mt-1">
            {selectedCity ? `Жилье в г. ${selectedCity}` : 'Каталог жилья в Абхазии'}
          </h1>
          <p className="text-sm text-stone-gray-500 mt-1">
            Найдено вариантов: {filteredListings.length}
          </p>
        </div>

        {/* Быстрые фильтры по курортам */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {ABKHAZIA_CITIES.map((city) => {
            const isActive =
              (!selectedCity && city.id === 'all') || selectedCity === city.name;
            return (
              <Link
                key={city.id}
                href={city.id === 'all' ? '/listings' : `/listings?city=${encodeURIComponent(city.name)}`}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-moss-700 text-white border-moss-700 shadow-soft-sm'
                    : 'bg-stone-gray-50 text-stone-gray-700 border-stone-gray-200 hover:border-moss-400'
                }`}
              >
                {city.name}
              </Link>
            );
          })}
        </div>

        {/* Сетка объявлений */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-stone-gray-50 rounded-3xl border border-stone-gray-200 p-8">
            <MapPin className="w-12 h-12 text-moss-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-gray-800">
              По вашему запросу ничего не найдено
            </h3>
            <p className="text-sm text-stone-gray-500 mt-1">
              Попробуйте сбросить фильтры или выбрать другой курорт Абхазии.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-stone-gray-500">Загрузка каталога...</div>}>
      <ListingsContent />
    </Suspense>
  );
}
