export const ABKHAZIA_CITIES = [
  { id: 'all', name: 'Вся Абхазия', count: 480 },
  { id: 'gagra', name: 'Гагра', count: 185, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { id: 'pitsunda', name: 'Пицунда', count: 112, image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80' },
  { id: 'sukhum', name: 'Сухум', count: 98, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80' },
  { id: 'new-athos', name: 'Новый Афон', count: 64, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' },
  { id: 'gudauta', name: 'Гудаута', count: 32, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'tsandripsh', name: 'Цандрипш', count: 28, image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80' },
] as const;

export const PROPERTY_TYPES = [
  { id: 'all', label: 'Все варианты' },
  { id: 'apartment', label: 'Квартиры и апартаменты' },
  { id: 'guest_house', label: 'Гостевые дома' },
  { id: 'hotel', label: 'Отели и гостиницы' },
  { id: 'cottage', label: 'Коттеджи и домики' },
  { id: 'villa', label: 'Виллы' },
] as const;

export const AMENITIES_LIST = [
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'sea_view', label: 'Вид на море' },
  { id: 'air_conditioning', label: 'Кондиционер' },
  { id: 'pool', label: 'Бассейн' },
  { id: 'parking', label: 'Парковка' },
  { id: 'kitchen', label: 'Кухня' },
  { id: 'balcony', label: 'Балкон / Терраса' },
  { id: 'mountain_view', label: 'Вид на горы' },
  { id: 'pet_friendly', label: 'Можно с питомцами' },
  { id: 'breakfast', label: 'Завтрак включен' },
] as const;

export const NAV_LINKS = [
  { label: 'Каталог жилья', href: '/listings' },
  { label: 'Курорты', href: '/destinations' },
  { label: 'Избранное', href: '/favorites' },
  { label: 'Сдать жилье', href: '/host' },
  { label: 'О проекте', href: '/about' },
];
