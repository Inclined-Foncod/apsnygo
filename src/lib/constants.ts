export const ABKHAZIA_CITIES = [
  { id: 'all', name: 'Вся Абхазия', count: 480 },
  { id: 'gagra', name: 'Гагра', count: 185, image: '/images/destinations/gagra.jpg' },
  { id: 'pitsunda', name: 'Пицунда', count: 112, image: '/images/destinations/pitsunda.jpg' },
  { id: 'sukhum', name: 'Сухум', count: 98, image: '/images/destinations/sukhum.jpg' },
  { id: 'new-athos', name: 'Новый Афон', count: 64, image: '/images/destinations/new-athos.jpg' },
  { id: 'gudauta', name: 'Гудаута', count: 32, image: '/images/destinations/gudauta.jpg' },
  { id: 'tsandripsh', name: 'Цандрипш', count: 28, image: '/images/destinations/tsandripsh.jpg' },
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
