'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Listing } from '@/types/listing';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { Star, MapPin, Waves, Heart } from 'lucide-react';
import { useState } from 'react';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card hoverEffect className="group flex flex-col h-full bg-white">
      {/* Контейнер изображения */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-gray-100">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Бейдж суперхоста или фичера */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {listing.host.isSuperhost && (
            <Badge variant="moss" className="bg-moss-700/90 text-white backdrop-blur-sm border-none">
              Суперхозяин
            </Badge>
          )}
          {listing.featured && (
            <Badge variant="green" className="bg-green-600/90 text-white backdrop-blur-sm border-none">
              Топ выбор
            </Badge>
          )}
        </div>

        {/* Кнопка в избранное */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-stone-gray-700 hover:text-red-500 hover:bg-white transition-colors"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>

        {/* Расстояние до моря */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-medium text-stone-gray-800 flex items-center gap-1.5 shadow-soft-sm">
          <Waves className="w-3.5 h-3.5 text-moss-600" />
          <span>{listing.distanceToSeaMeters} м до моря</span>
        </div>
      </div>

      {/* Описание объекта */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Локация и рейтинг */}
          <div className="flex items-center justify-between text-xs text-stone-gray-500 mb-2">
            <span className="flex items-center gap-1 font-medium text-stone-gray-600">
              <MapPin className="w-3.5 h-3.5 text-moss-600" />
              {listing.city}
            </span>
            <div className="flex items-center gap-1 font-semibold text-stone-gray-900">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{listing.rating}</span>
              <span className="text-stone-gray-400">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Заголовок */}
          <Link href={`/listings/${listing.id}`}>
            <h3 className="font-heading font-semibold text-stone-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 text-base leading-snug">
              {listing.title}
            </h3>
          </Link>

          {/* Параметры вместимости */}
          <p className="mt-2 text-xs text-stone-gray-500">
            {listing.bedrooms} сп. · до {listing.maxGuests} гостей
          </p>
        </div>

        {/* Цена за сутки */}
        <div className="mt-4 pt-3 border-t border-stone-gray-100 flex items-baseline justify-between">
          <div>
            <span className="font-heading font-bold text-lg text-stone-gray-900">
              {formatPrice(listing.pricePerNight)}
            </span>
            <span className="text-xs text-stone-gray-500 ml-1">/ сутки</span>
          </div>

          <Link
            href={`/listings/${listing.id}`}
            className="text-xs font-semibold text-moss-700 hover:text-green-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
          >
            Подробнее →
          </Link>
        </div>
      </div>
    </Card>
  );
}
