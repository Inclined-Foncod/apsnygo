'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  CustomSelect,
  SelectOption,
} from '@/components/ui/CustomSelect';
import {
  DateRangePicker,
  DateRange,
} from '@/components/ui/DateRangePicker';
import {
  GuestSelector,
  GuestCount,
  DEFAULT_GUESTS,
} from '@/components/ui/GuestSelector';
import {
  Search,
  MapPin,
  Waves,
  Mountain,
  Landmark,
  Sparkles,
} from 'lucide-react';

const RESORT_OPTIONS: SelectOption[] = [
  {
    value: '',
    label: 'Все курорты Абхазии',
    subtitle: 'По всей республике от Псоу до Ингура',
    count: 480,
    icon: <Sparkles className="w-4 h-4 text-amber-500" />,
  },
  {
    value: 'Гагра',
    label: 'Гагра',
    subtitle: 'Знаменитая Колоннада и субтропики',
    count: 185,
    icon: <Waves className="w-4 h-4 text-sky-500" />,
    badge: 'Топ',
  },
  {
    value: 'Пицунда',
    label: 'Пицунда',
    subtitle: 'Реликтовые сосновые рощи и мыс',
    count: 112,
    icon: <Waves className="w-4 h-4 text-emerald-500" />,
    badge: 'Заповедник',
  },
  {
    value: 'Сухум',
    label: 'Сухум',
    subtitle: 'Столица республики, набережная Махаджиров',
    count: 98,
    icon: <Landmark className="w-4 h-4 text-amber-600" />,
    badge: 'Столица',
  },
  {
    value: 'Новый Афон',
    label: 'Новый Афон',
    subtitle: 'Златоглавый монастырь и гигантские пещеры',
    count: 64,
    icon: <Landmark className="w-4 h-4 text-purple-500" />,
  },
  {
    value: 'Гудаута',
    label: 'Гудаута',
    subtitle: 'Широкие песчано-галечные пляжи и сады',
    count: 32,
    icon: <Waves className="w-4 h-4 text-teal-500" />,
  },
  {
    value: 'Цандрипш',
    label: 'Цандрипш',
    subtitle: 'Пляж «Белые скалы» в 5 км от границы РФ',
    count: 28,
    icon: <Waves className="w-4 h-4 text-blue-500" />,
  },
  {
    value: 'Кындыг',
    label: 'Кындыг & Очамчыра',
    subtitle: 'Горячие целебные сероводородные гейзеры',
    count: 38,
    icon: <Sparkles className="w-4 h-4 text-rose-500" />,
    badge: 'Термы',
  },
  {
    value: 'Ткуарчал',
    label: 'Ткуарчал & Акармара',
    subtitle: 'Город в ущелье и водопад Великан (100 м)',
    count: 16,
    icon: <Mountain className="w-4 h-4 text-emerald-600" />,
    badge: 'Горы',
  },
];

export function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [guests, setGuests] = useState<GuestCount>(DEFAULT_GUESTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (city && city !== 'all') {
      params.append('city', city);
    }

    if (dateRange.startDate) {
      params.append(
        'checkIn',
        dateRange.startDate.toISOString().split('T')[0]
      );
    }
    if (dateRange.endDate) {
      params.append(
        'checkOut',
        dateRange.endDate.toISOString().split('T')[0]
      );
    }

    const totalGuests = guests.adults + guests.children;
    if (totalGuests > 0) {
      params.append('guests', totalGuests.toString());
    }

    if (guests.pets > 0) {
      params.append('pets', 'true');
    }

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-3xl p-2.5 md:p-3.5 shadow-soft-lg border border-stone-gray-200/90 max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
        {/* 1. Блок «Курорт» (Кастомный поповер с иконками и счетчиком) */}
        <CustomSelect
          options={RESORT_OPTIONS}
          value={city}
          onChange={setCity}
          label="Курорт"
          placeholder="Все курорты Абхазии"
          icon={<MapPin className="w-3.5 h-3.5 text-moss-600" />}
        />

        {/* 2. Блок «Даты» (Кастомный календарь в единой светлой гамме) */}
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
        />

        {/* 3. Блок «Гости» (Кастомный селектор с плюс/минус инкрементами) */}
        <GuestSelector
          value={guests}
          onChange={setGuests}
        />

        {/* 4. Кнопка поиска */}
        <div className="p-1">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 shadow-green-glow"
          >
            <Search className="w-5 h-5" />
            <span className="font-heading font-bold text-base">
              Найти жилье
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
}
