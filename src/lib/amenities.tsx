import React from 'react';
import {
  Wifi,
  Waves,
  Wind,
  Droplets,
  Car,
  UtensilsCrossed,
  Sun,
  Mountain,
  Dog,
  Coffee,
  Tv,
  Shirt,
  ShieldCheck,
  Check,
} from 'lucide-react';

export interface AmenityInfo {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const AMENITIES_MAP: Record<string, { label: string; icon: React.ReactNode }> = {
  wifi: {
    label: 'Wi-Fi',
    icon: <Wifi className="w-4 h-4 text-emerald-600 shrink-0" />,
  },
  sea_view: {
    label: 'Вид на море',
    icon: <Waves className="w-4 h-4 text-sky-600 shrink-0" />,
  },
  air_conditioning: {
    label: 'Кондиционер',
    icon: <Wind className="w-4 h-4 text-cyan-600 shrink-0" />,
  },
  pool: {
    label: 'Бассейн',
    icon: <Droplets className="w-4 h-4 text-blue-600 shrink-0" />,
  },
  parking: {
    label: 'Парковка',
    icon: <Car className="w-4 h-4 text-stone-gray-700 shrink-0" />,
  },
  kitchen: {
    label: 'Оборудованная кухня',
    icon: <UtensilsCrossed className="w-4 h-4 text-amber-600 shrink-0" />,
  },
  balcony: {
    label: 'Балкон / Терраса',
    icon: <Sun className="w-4 h-4 text-amber-500 shrink-0" />,
  },
  mountain_view: {
    label: 'Вид на горы',
    icon: <Mountain className="w-4 h-4 text-emerald-700 shrink-0" />,
  },
  pet_friendly: {
    label: 'Можно с питомцами',
    icon: <Dog className="w-4 h-4 text-orange-600 shrink-0" />,
  },
  breakfast: {
    label: 'Завтрак включен',
    icon: <Coffee className="w-4 h-4 text-amber-700 shrink-0" />,
  },
  tv: {
    label: 'Телевизор / Smart TV',
    icon: <Tv className="w-4 h-4 text-stone-gray-700 shrink-0" />,
  },
  washing_machine: {
    label: 'Стиральная машина',
    icon: <Shirt className="w-4 h-4 text-blue-500 shrink-0" />,
  },
};

export function getAmenityInfo(id: string): { label: string; icon: React.ReactNode } {
  if (AMENITIES_MAP[id]) {
    return AMENITIES_MAP[id];
  }
  // Запасной вариант для неизвестного ключа
  const formatted = id
    .replace(/_/g, ' ')
    .replace(/^./, (str) => str.toUpperCase());
  return {
    label: formatted,
    icon: <Check className="w-4 h-4 text-emerald-600 shrink-0" />,
  };
}
