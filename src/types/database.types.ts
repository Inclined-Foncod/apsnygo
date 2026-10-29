export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string;
          avatar_url: string | null;
          phone: string | null;
          telegram: string | null;
          role: 'guest' | 'host' | 'admin';
          is_superhost: boolean;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name: string;
          avatar_url?: string | null;
          phone?: string | null;
          telegram?: string | null;
          role?: 'guest' | 'host' | 'admin';
          is_superhost?: boolean;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string | null;
          full_name?: string;
          avatar_url?: string | null;
          phone?: string | null;
          telegram?: string | null;
          role?: 'guest' | 'host' | 'admin';
          is_superhost?: boolean;
          bio?: string | null;
          updated_at?: string;
        };
      };
      destinations: {
        Row: {
          id: string;
          slug: string;
          name: string;
          region: string;
          description: string | null;
          cover_image: string;
          map_x: number;
          map_y: number;
          latitude: number | null;
          longitude: number | null;
          category: string;
          starting_price: number;
          is_popular: boolean;
          created_at: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          type: 'apartment' | 'hotel' | 'guest_house' | 'villa' | 'cottage' | 'glamping';
          destination_id: string | null;
          host_id: string;
          address: string;
          distance_to_sea_meters: number;
          price_per_night: number;
          max_guests: number;
          bedrooms: number;
          bathrooms: number;
          amenities: string[];
          images: string[];
          rating: number;
          review_count: number;
          is_featured: boolean;
          is_verified: boolean;
          latitude: number | null;
          longitude: number | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}
