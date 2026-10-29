'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { AppButton } from '@/components/ui/AppButton';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { PixelDivider } from '@/components/ui/PixelDivider';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  Camera,
  Coins,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  MapPin,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const CITIES = [
  { id: 'gagra', name: 'Гагра', avgPrice: 4200 },
  { id: 'pitsunda', name: 'Пицунда', avgPrice: 4500 },
  { id: 'sukhum', name: 'Сухум', avgPrice: 3500 },
  { id: 'athos', name: 'Новый Афон', avgPrice: 3800 },
  { id: 'gudauta', name: 'Гудаута', avgPrice: 2800 },
  { id: 'tsandripsh', name: 'Цандрипш', avgPrice: 2600 },
];

const TYPES = [
  { id: 'apartment', name: 'Квартира / Апартаменты', multiplier: 1 },
  { id: 'cottage', name: 'Эко-коттедж у моря', multiplier: 1.4 },
  { id: 'guesthouse', name: 'Гостевой дом / Номер', multiplier: 0.85 },
  { id: 'villa', name: 'Вилла с бассейном', multiplier: 2.2 },
];

export default function HostPage() {
  // Калькулятор дохода
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [selectedType, setSelectedType] = useState(TYPES[0]);
  const [bookedDays, setBookedDays] = useState(24);

  // Форма заявки
  const [form, setForm] = useState({
    name: '',
    phone: '',
    resort: 'Гагра',
    propertyType: 'Квартира',
    address: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const estimatedMonthlyIncome = Math.round(
    selectedCity.avgPrice * selectedType.multiplier * bookedDays
  );
  const estimatedSeasonIncome = Math.round(estimatedMonthlyIncome * 3.8); // 4 месяца высокого сезона

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFBF9] via-[#F5F8F5] to-[#FFFFFF] text-stone-gray-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden">
      {/* Фоновые природные текстуры */}
      <BackgroundPattern variant="dots" />
      <BackgroundPattern variant="pine-watermark" opacity="opacity-[0.035]" />

      {/* ========================================================= */}
      {/* 1. HERO: СДАВАЙТЕ ЖИЛЬЕ В АБХАЗИИ                         */}
      {/* ========================================================= */}
      <section className="pt-12 pb-16 md:pt-18 md:pb-22 relative z-10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-soft-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Для собственников и управляющих жильем в Абхазии
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-gray-900 leading-[1.14]">
              Сдавайте жилье на{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-moss-600">
                ApsnyGO
              </span>{' '}
              и зарабатывайте больше
            </h1>

            <p className="mt-5 text-base sm:text-lg text-stone-gray-600 max-w-2xl mx-auto leading-relaxed">
              Прямой поток туристов со всей России, календарь занятости без овербукинга, нулевая комиссия за подключение и локальная поддержка прямо в Абхазии.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#host-form">
                <AppButton variant="primary" size="lg">
                  <span>Разместить объект бесплатно</span>
                  <ArrowRight className="w-4 h-4" />
                </AppButton>
              </a>
              <Link href="/host-info">
                <AppButton variant="glass" size="lg">
                  <span>Условия и правила</span>
                </AppButton>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <PixelDivider variant="pine" />

      {/* ========================================================= */}
      {/* 2. ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР ДОХОДА                      */}
      {/* ========================================================= */}
      <section className="py-12 relative z-10">
        <Container size="narrow">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-[0_16px_40px_-8px_rgba(20,40,30,0.08)]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Калькулятор дохода
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-gray-900">
                Сколько вы сможете заработать?
              </h2>
              <p className="text-xs sm:text-sm text-stone-gray-500 mt-1">
                Расчет основан на средней заполняемости проверенных объектов в сезон 2025–2026
              </p>
            </div>

            {/* Выбор курорта */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider mb-2">
                1. Выберите курорт
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CITIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCity(c)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      selectedCity.id === c.id
                        ? 'bg-emerald-50 border-emerald-500/80 text-emerald-950 font-bold shadow-soft-sm'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200/70 text-stone-gray-700'
                    }`}
                  >
                    <div className="text-sm">{c.name}</div>
                    <div className="text-[11px] text-stone-gray-400">от {c.avgPrice} ₽/сутки</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор типа жилья */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider mb-2">
                2. Тип объекта
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      selectedType.id === t.id
                        ? 'bg-emerald-50 border-emerald-500/80 text-emerald-950 font-bold shadow-soft-sm'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200/70 text-stone-gray-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{t.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Загрузка дней в месяц */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-gray-700 uppercase tracking-wider">
                  3. Дней бронирования в месяц
                </label>
                <span className="text-sm font-extrabold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-lg">
                  {bookedDays} дн.
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={bookedDays}
                onChange={(e) => setBookedDays(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Итоговый доход */}
            <div className="rounded-2xl bg-gradient-to-r from-emerald-900 via-stone-gray-900 to-emerald-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-lg">
              <div>
                <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">
                  Ориентировочный доход
                </span>
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-1">
                  ~{estimatedMonthlyIncome.toLocaleString('ru-RU')} ₽ <span className="text-sm text-stone-300 font-normal">/ месяц</span>
                </div>
                <div className="text-xs text-emerald-200/80 mt-1">
                  до {estimatedSeasonIncome.toLocaleString('ru-RU')} ₽ за сезон май–октябрь
                </div>
              </div>

              <a href="#host-form" className="shrink-0 w-full sm:w-auto">
                <AppButton variant="glow" size="md" className="w-full">
                  <span>Начать сдавать</span>
                  <ArrowRight className="w-4 h-4" />
                </AppButton>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <PixelDivider variant="mountain" />

      {/* ========================================================= */}
      {/* 3. ПОЧЕМУ ХОЗЯЕВА ВЫБИРАЮТ APSNYGO                         */}
      {/* ========================================================= */}
      <section className="py-14 relative z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-gray-900">
              Преимущества работы с нами
            </h2>
            <p className="mt-2 text-sm text-stone-gray-600">
              Мы создали сервис, который действительно понимает специфику отдыха и аренды в Абхазии
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-stone-gray-900 mb-2">
                0% комиссия за размещение
              </h3>
              <p className="text-sm text-stone-gray-600 leading-relaxed">
                Добавление объекта в каталог абсолютно бесплатно. Никаких абонентских плат или скрытых платежей.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-stone-gray-900 mb-2">
                Синхронизация календаря
              </h3>
              <p className="text-sm text-stone-gray-600 leading-relaxed">
                Синхронизируйте даты бронирования через iCal с Avito, Суточно и другими сервисами в один клик.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-stone-gray-900 mb-2">
                Профессиональная фотосъемка
              </h3>
              <p className="text-sm text-stone-gray-600 leading-relaxed">
                Наш мобильный фотограф в Абхазии бесплатно приедет и сделает продающие кадры вашего жилья.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <PixelDivider variant="spark" />

      {/* ========================================================= */}
      {/* 4. ФОРМА ЗАЯВКИ НА РАЗМЕЩЕНИЕ                             */}
      {/* ========================================================= */}
      <section id="host-form" className="py-16 relative z-10">
        <Container size="narrow">
          <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 shadow-[0_20px_50px_-10px_rgba(20,40,30,0.1)]">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-stone-gray-900 mb-2">
                  Заявка успешно отправлена!
                </h3>
                <p className="text-stone-gray-600 text-sm max-w-md mx-auto mb-6">
                  Наш локальный куратор свяжется с вами в WhatsApp или по телефону в течение 30 минут для согласования деталей и добавления жилья.
                </p>
                <AppButton
                  variant="primary"
                  onClick={() => setIsSubmitted(false)}
                >
                  Отправить еще одну заявку
                </AppButton>
              </div>
            ) : (
              <div>
                <div className="text-center max-w-md mx-auto mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-2">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    Быстрый старт за 1 день
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-gray-900">
                    Подайте заявку на размещение
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-gray-500 mt-1">
                    Оставьте контактные данные — мы поможем правильно оформить объект и настроить первые бронирования
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                  <div>
                    <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider mb-1">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Например: Аслан или Анна"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-stone-200/90 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm bg-stone-50/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider mb-1">
                      Номер телефона / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (940) 000-00-00 или +7 (999) 000-00-00"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-stone-200/90 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm bg-stone-50/60"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider mb-1">
                        Курорт
                      </label>
                      <select
                        value={form.resort}
                        onChange={(e) => setForm({ ...form, resort: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200/90 focus:outline-none focus:border-emerald-500 text-sm bg-stone-50/60"
                      >
                        <option value="Гагра">Гагра</option>
                        <option value="Пицунда">Пицунда</option>
                        <option value="Сухум">Сухум</option>
                        <option value="Новый Афон">Новый Афон</option>
                        <option value="Гудаута">Гудаута</option>
                        <option value="Цандрипш">Цандрипш</option>
                        <option value="Очамчыра">Очамчыра / Кындыг</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider mb-1">
                        Тип жилья
                      </label>
                      <select
                        value={form.propertyType}
                        onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200/90 focus:outline-none focus:border-emerald-500 text-sm bg-stone-50/60"
                      >
                        <option value="Квартира">Квартира</option>
                        <option value="Коттедж">Коттедж у моря</option>
                        <option value="Гостевой дом">Гостевой дом</option>
                        <option value="Отель">Отель / Номера</option>
                        <option value="Вилла">Вилла</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-gray-700 uppercase tracking-wider mb-1">
                      Ориентировочный адрес или ориентир (необязательно)
                    </label>
                    <input
                      type="text"
                      placeholder="Например: Старая Гагра, ул. Нартаа, 300м до моря"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-stone-200/90 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-sm bg-stone-50/60"
                    />
                  </div>

                  <div className="pt-2">
                    <AppButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full justify-center"
                    >
                      <span>Отправить заявку куратору</span>
                      <ArrowRight className="w-4 h-4" />
                    </AppButton>
                    <p className="text-[11px] text-stone-gray-400 text-center mt-2">
                      Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
