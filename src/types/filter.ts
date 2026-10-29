import { Amenity, PropertyType } from './listing';

export interface SearchFilters {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  propertyTypes?: PropertyType[];
  amenities?: Amenity[];
  sortBy?: 'popular' | 'price_asc' | 'price_desc' | 'rating' | 'sea_distance';
}
