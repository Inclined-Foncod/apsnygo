-- ==============================================================================
-- СХЕМА БАЗЫ ДАННЫХ ДЛЯ ПРОЕКТА APSNYGO (SUPABASE / POSTGRESQL)
-- ==============================================================================
-- Примените этот SQL-код в Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Включаем расширение для генерации UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Пользовательские типы данных (Enums)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('guest', 'host', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE property_type AS ENUM (
        'apartment',
        'hotel',
        'guest_house',
        'villa',
        'cottage',
        'glamping'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM (
        'pending',
        'confirmed',
        'cancelled',
        'completed'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- ТАБЛИЦА: Профили пользователей (связана с auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    telegram TEXT,
    role user_role DEFAULT 'guest'::user_role,
    is_superhost BOOLEAN DEFAULT false,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ТАБЛИЦА: Города и курорты Абхазии (для карты и горячих точек)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    region TEXT DEFAULT 'Республика Абхазия',
    description TEXT,
    cover_image TEXT NOT NULL,
    -- Координаты для карты (процентное смещение X и Y на интерактивной карте)
    map_x NUMERIC(5, 2) NOT NULL, -- Координата X в % (0 - 100)
    map_y NUMERIC(5, 2) NOT NULL, -- Координата Y в % (0 - 100)
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    category TEXT DEFAULT 'beach', -- 'beach', 'mountain', 'history'
    starting_price INT DEFAULT 2000,
    is_popular BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ТАБЛИЦА: Объекты жилья (Listings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    type property_type NOT NULL,
    destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
    host_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    address TEXT NOT NULL,
    distance_to_sea_meters INT DEFAULT 0,
    price_per_night NUMERIC(10, 2) NOT NULL,
    max_guests INT NOT NULL DEFAULT 2,
    bedrooms INT NOT NULL DEFAULT 1,
    bathrooms INT NOT NULL DEFAULT 1,
    amenities TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT true,
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ТАБЛИЦА: Бронирования (Bookings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    guest_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests_count INT NOT NULL DEFAULT 1,
    total_price NUMERIC(10, 2) NOT NULL,
    status booking_status DEFAULT 'pending'::booking_status,
    contact_phone TEXT NOT NULL,
    guest_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_dates CHECK (check_out > check_in)
);

-- ==============================================================================
-- ТАБЛИЦА: Отзывы (Reviews)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ТАБЛИЦА: Избранное (Favorites)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.favorites (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, property_id)
);

-- ==============================================================================
-- НАСТРОЙКА ROW LEVEL SECURITY (RLS) ДЛЯ БЕЗОПАСНОСТИ
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Политики чтения (публичный доступ для каталога):
CREATE POLICY "Публичный просмотр курортов" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Публичный просмотр объектов жилья" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Публичный просмотр отзывов" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Публичный просмотр профилей хостов" ON public.profiles FOR SELECT USING (true);

-- Политики для профилей:
CREATE POLICY "Пользователь может редактировать свой профиль" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Политики для избранного:
CREATE POLICY "Пользователь видит только свое избранное" 
ON public.favorites FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Пользователь может добавлять в избранное" 
ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Пользователь может удалять из избранного" 
ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Политики для бронирований:
CREATE POLICY "Гость видит свои бронирования" 
ON public.bookings FOR SELECT USING (auth.uid() = guest_id);

CREATE POLICY "Гость может создавать бронь" 
ON public.bookings FOR INSERT WITH CHECK (auth.uid() = guest_id);

-- ==============================================================================
-- НАЧАЛЬНЫЕ ДАННЫЕ (SEED DATA): КУРОРТЫ И ГОРЯЧИЕ ТОЧКИ НА КАРТЕ АБХАЗИИ
-- ==============================================================================
INSERT INTO public.destinations (slug, name, description, cover_image, map_x, map_y, category, starting_price)
VALUES
('tsandripsh', 'Цандрипш', 'Белые скалы, чистейшие малолюдные пляжи и близость к границе.', 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80', 12.5, 34.0, 'beach', 2000),
('gagra', 'Гагра', 'Знаменитая Колоннада, Старая Гагра, теплое море и величественные горы.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 22.0, 42.0, 'beach', 3000),
('pitsunda', 'Пицунда', 'Реликтовые сосновые рощи, целебный морской воздух и спокойный отдых.', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80', 36.5, 62.0, 'beach', 3500),
('ritsa', 'Озеро Рица', 'Изумрудное высокогорное озеро, Юпшарский каньон и альпийские луга.', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', 43.0, 22.0, 'mountain', 4500),
('gudauta', 'Гудаута', 'Уютный равнинный курорт, фруктовые сады и форелевые хозяйства.', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80', 48.0, 53.0, 'beach', 2200),
('new-athos', 'Новый Афон', 'Новоафонский монастырь, знаменитая пещера, водопад и лебединое озеро.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 60.5, 59.0, 'history', 3200),
('sukhum', 'Сухум', 'Столица Абхазии, знаменитая Набережная Махаджиров и Ботанический сад.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80', 74.0, 68.0, 'beach', 2800),
('ochamchira', 'Очамчыра и Кындыг', 'Горячие целебные сероводородные источники, эвкалиптовые рощи и покой.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', 88.0, 80.0, 'mountain', 2000)
ON CONFLICT (slug) DO NOTHING;

-- Триггер для автоматического создания профиля при регистрации через Supabase Auth:
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Гость ApsnyGO'),
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
