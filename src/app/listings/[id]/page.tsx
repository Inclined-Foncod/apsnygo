import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { BookingCard } from '@/components/listings/BookingCard';
import { getAmenityInfo } from '@/lib/amenities';
import {
  Star,
  MapPin,
  Waves,
  Heart,
  Share2,
} from 'lucide-react';

interface ListingDetailPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return MOCK_LISTINGS.map((listing) => ({
    id: listing.id,
  }));
}

export default function ListingDetailPage({ params }: ListingDetailPageProps) {
  const listing =
    MOCK_LISTINGS.find((item) => item.id === params.id) || MOCK_LISTINGS[0];

  if (!listing) {
    notFound();
  }

  return (
    <div className="py-8 bg-white min-h-screen">
      <Container>
        {/* Хлебные крошки и заголовок */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-gray-900">
              {listing.title}
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Share2 className="w-4 h-4" /> Поделиться
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Heart className="w-4 h-4 text-red-500" /> В избранное
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-gray-600">
            <div className="flex items-center gap-1 font-semibold text-stone-gray-900">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{listing.rating}</span>
              <span className="text-stone-gray-400">
                ({listing.reviewCount} отзывов)
              </span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-moss-600" />
              {listing.city}, {listing.address}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-moss-700 font-medium">
              <Waves className="w-4 h-4" />
              {listing.distanceToSeaMeters} м до моря
            </span>
          </div>
        </div>

        {/* Галерея фотографий */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 rounded-3xl overflow-hidden aspect-[16/9] max-h-[500px]">
          <div className="relative h-full min-h-[300px]">
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative hidden md:block h-full">
            <Image
              src={listing.images[1] || listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Основной контент: описание + правый блок бронирования */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Хозяин */}
            <div className="flex items-center justify-between pb-6 border-b border-stone-gray-200">
              <div>
                <h2 className="text-xl font-bold text-stone-gray-900">
                  Хозяин жилья: {listing.host.name}
                </h2>
                <p className="text-sm text-stone-gray-500 mt-0.5">
                  Скорость ответа: {listing.host.responseRate}%
                </p>
              </div>
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-moss-200">
                <Image
                  src={listing.host.avatar}
                  alt={listing.host.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Описание */}
            <div>
              <h3 className="text-lg font-bold text-stone-gray-900 mb-3">
                О жилье
              </h3>
              <p className="text-stone-gray-600 leading-relaxed text-base">
                {listing.description}
              </p>
            </div>

            {/* Стилизованные удобства на русском языке с иконками */}
            <div className="pt-6 border-t border-stone-gray-200">
              <h3 className="text-lg font-bold text-stone-gray-900 mb-4">
                Удобства
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {listing.amenities.map((amenityKey) => {
                  const info = getAmenityInfo(amenityKey);
                  return (
                    <div
                      key={amenityKey}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF9F5] border border-stone-gray-200/80 hover:border-moss-300 hover:bg-moss-50/40 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center border border-stone-gray-200/80 shadow-soft-sm">
                        {info.icon}
                      </div>
                      <span className="text-sm font-semibold text-stone-gray-800">
                        {info.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Плавающий виджет бронирования с кастомными датами и гостями */}
          <div>
            <BookingCard
              pricePerNight={listing.pricePerNight}
              rating={listing.rating}
              reviewCount={listing.reviewCount}
              maxGuests={listing.maxGuests}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
