'use client';

import { Container } from '@/components/layout/Container';
import { ListingCard } from '@/components/listings/ListingCard';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { ABKHAZIA_CITIES } from '@/lib/constants';
import { MapPin, Sparkles } from 'lucide-react';
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
    <div className="py-10 bg-gradient-to-b from-[#FAFBF9] via-[#F6F8F5] to-[#FFFFFF] min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Водяной знак природы для каталога */}
      <BackgroundPattern variant="pine-watermark" opacity="opacity-[0.03]" />

      <Container className="relative z-10">
        {/* Хлебные крошки и заголовок */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Поиск жилья в Абхазии
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-gray-900 mt-1">
            {selectedCity ? `Жилье в г. ${selectedCity}` : 'Каталог жилья в Абхазии'}
          </h1>
          <p className="text-sm text-stone-gray-600 mt-1.5">
            Найдено проверенных вариантов: <span className="font-bold text-emerald-800">{filteredListings.length}</span>
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
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-soft-sm'
                    : 'bg-white text-stone-gray-700 border-stone-200/90 hover:border-emerald-500/50 hover:bg-emerald-50/40 shadow-soft-sm'
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
