'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Listing } from '@/types/listing';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { Star, MapPin, Waves, Heart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card hoverEffect className="group flex flex-col h-full bg-white">
      {/* Контейнер изображения с плавным зумом при ховере */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-gray-100">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Бейджи с эффектом матового стекла */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {listing.host.isSuperhost && (
            <Badge variant="moss" className="bg-moss-900/80 text-white backdrop-blur-md border border-white/20 shadow-soft-sm">
              Суперхозяин
            </Badge>
          )}
          {listing.featured && (
            <Badge variant="green" className="bg-emerald-600/90 text-white backdrop-blur-md border border-emerald-300/30 shadow-soft-sm">
              Топ выбор
            </Badge>
          )}
        </div>

        {/* Кнопка в избранное с тактильной анимацией Framer Motion */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.82 }}
          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-colors shadow-soft z-10 ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 border border-rose-200'
              : 'bg-white/85 text-stone-gray-700 hover:text-rose-500 hover:bg-white border border-stone-200/60'
          }`}
          aria-label="В избранное"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
        </motion.button>

        {/* Расстояние до моря в стеклянной плашке */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-semibold text-stone-gray-800 flex items-center gap-1.5 border border-stone-200/60 shadow-soft-sm z-10">
          <Waves className="w-3.5 h-3.5 text-emerald-600" />
          <span>{listing.distanceToSeaMeters} м до моря</span>
        </div>
      </div>

      {/* Описание объекта */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Локация и рейтинг */}
          <div className="flex items-center justify-between text-xs text-stone-gray-500 mb-2">
            <span className="flex items-center gap-1 font-semibold text-stone-gray-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {listing.city}
            </span>
            <div className="flex items-center gap-1 font-bold text-stone-gray-900 bg-amber-50/80 px-2 py-0.5 rounded-lg border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{listing.rating}</span>
              <span className="text-stone-gray-400 font-normal">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Заголовок */}
          <Link href={`/listings/${listing.id}`}>
            <h3 className="font-heading font-bold text-stone-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 text-base leading-snug">
              {listing.title}
            </h3>
          </Link>

          {/* Параметры вместимости */}
          <p className="mt-2 text-xs text-stone-gray-500">
            {listing.bedrooms} сп. · до {listing.maxGuests} гостей
          </p>
        </div>

        {/* Цена за сутки */}
        <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-baseline justify-between">
          <div>
            <span className="font-heading font-extrabold text-xl text-stone-gray-900">
              {formatPrice(listing.pricePerNight)}
            </span>
            <span className="text-xs text-stone-gray-500 ml-1 font-medium">/ сутки</span>
          </div>

          <Link
            href={`/listings/${listing.id}`}
            className="text-xs font-bold text-emerald-700 group-hover:text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-all"
          >
            Подробнее →
          </Link>
        </div>
      </div>
    </Card>
  );
}
