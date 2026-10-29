import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import {
  Star,
  MapPin,
  Waves,
  ShieldCheck,
  Check,
  Heart,
  Share2,
  Calendar,
  Users,
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
  const listing = MOCK_LISTINGS.find((item) => item.id === params.id) || MOCK_LISTINGS[0];

  if (!listing) {
    notFound();
  }

  return (
    <div className="py-8 bg-white">
      <Container>
        {/* Заголовок и локация */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-gray-900">
              {listing.title}
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" /> Поделиться
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 text-red-500" /> В избранное
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-gray-600">
            <div className="flex items-center gap-1 font-semibold text-stone-gray-900">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{listing.rating}</span>
              <span className="text-stone-gray-400">({listing.reviewCount} отзывов)</span>
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
              <h3 className="text-lg font-bold text-stone-gray-900 mb-3">О жилье</h3>
              <p className="text-stone-gray-600 leading-relaxed text-base">
                {listing.description}
              </p>
            </div>

            {/* Удобства */}
            <div className="pt-6 border-t border-stone-gray-200">
              <h3 className="text-lg font-bold text-stone-gray-900 mb-4">Удобства</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {listing.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-sm text-stone-gray-700 bg-stone-gray-50 p-2.5 rounded-xl border border-stone-gray-200"
                  >
                    <Check className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Плавающий виджет бронирования */}
          <div>
            <div className="sticky top-28 bg-white rounded-3xl border border-stone-gray-200 p-6 shadow-soft-lg">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="text-2xl font-extrabold text-stone-gray-900">
                    {formatPrice(listing.pricePerNight)}
                  </span>
                  <span className="text-xs text-stone-gray-500 ml-1">/ сутки</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-stone-gray-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{listing.rating}</span>
                </div>
              </div>

              {/* Форма дат и гостей */}
              <div className="border border-stone-gray-200 rounded-2xl overflow-hidden mb-4 divide-y divide-stone-gray-200">
                <div className="grid grid-cols-2 divide-x divide-stone-gray-200">
                  <div className="p-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-moss-700 block">
                      Заезд
                    </label>
                    <input
                      type="date"
                      defaultValue="2026-07-01"
                      className="w-full text-xs font-semibold text-stone-gray-900 bg-transparent focus:outline-none cursor-pointer mt-1"
                    />
                  </div>
                  <div className="p-3">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-moss-700 block">
                      Выезд
                    </label>
                    <input
                      type="date"
                      defaultValue="2026-07-08"
                      className="w-full text-xs font-semibold text-stone-gray-900 bg-transparent focus:outline-none cursor-pointer mt-1"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-moss-700 block">
                    Гости
                  </label>
                  <select className="w-full text-xs font-semibold text-stone-gray-900 bg-transparent focus:outline-none cursor-pointer mt-1">
                    <option>2 гостей</option>
                    <option>3 гостей</option>
                    <option>4 гостей</option>
                  </select>
                </div>
              </div>

              <Button variant="primary" size="lg" className="w-full justify-center shadow-green-glow mb-4">
                Забронировать
              </Button>

              <div className="text-center text-xs text-stone-gray-500 space-y-1">
                <p>Вы пока ни за что не платите</p>
                <p className="flex items-center justify-center gap-1 text-moss-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Безопасная сделка ApsnyGO
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
