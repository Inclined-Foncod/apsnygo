export type PropertyType =
  | 'apartment'
  | 'hotel'
  | 'guest_house'
  | 'villa'
  | 'cottage'
  | 'glamping';

export type Amenity =
  | 'wifi'
  | 'sea_view'
  | 'air_conditioning'
  | 'pool'
  | 'parking'
  | 'kitchen'
  | 'balcony'
  | 'mountain_view'
  | 'pet_friendly'
  | 'breakfast';

export interface Host {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
  responseRate: number;
  phone?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  type: PropertyType;
  city: string;
  address: string;
  distanceToSeaMeters: number;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  description: string;
  amenities: Amenity[];
  host: Host;
  featured?: boolean;
}
