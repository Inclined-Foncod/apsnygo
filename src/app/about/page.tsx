'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { AppButton } from '@/components/ui/AppButton';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { PixelDivider } from '@/components/ui/PixelDivider';
import {
  Compass,
  ShieldCheck,
  Heart,
  Trees,
  Waves,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Users,
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Проверенных объектов', value: '480+' },
    { label: 'Курортов и направлений', value: '7' },
    { label: 'Довольных гостей в 2025–2026', value: '12 000+' },
    { label: 'Локальная поддержка', value: '24/7' },
  ];

  const values = [
    {
      title: '100% проверенные хозяева',
      desc: 'Каждый гостевой дом, апартаменты или коттедж лично проверяются нашими кураторами в Абхазии. Никаких фейковых адресов и фото из интернета.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-200/70',
    },
    {
      title: 'Без скрытых переплат',
      desc: 'Честные цены от собственников без накруток посредников. Вы видите реальную стоимость суток и связываетесь с хозяевами напрямую.',
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      bg: 'bg-amber-50 border-amber-200/70',
    },
    {
      title: 'Любовь к природе Апсны',
      desc: 'Мы бережно относимся к реликтовой экологии: сосновым рощам Пицунды, чистоте вод Рицы и аутентичной культуре Страны Души.',
      icon: <Trees className="w-6 h-6 text-teal-600" />,
      bg: 'bg-teal-50 border-teal-200/70',
    },
    {
      title: 'Свои люди на месте',
      desc: 'Мы находимся прямо в республике. Если вам потребуется совет, трансфер или помощь во время отдыха — мы всегда рядом в WhatsApp и по телефону.',
      icon: <Users className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-50 border-sky-200/70',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFBF9] via-[#F5F8F5] to-[#FFFFFF] text-stone-gray-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden">
      <BackgroundPattern variant="dots" />
      <BackgroundPattern variant="pine-watermark" opacity="opacity-[0.03]" />

      {/* ========================================================= */}
      {/* 1. HERO СЕКЦИЯ: О ПРОЕКТЕ                                 */}
      {/* ========================================================= */}
      <section className="pt-14 pb-16 md:pt-20 md:pb-24 relative z-10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            {/* Гербовый значок ApsnyGO */}
            <div className="relative w-20 h-20 mx-auto mb-6 drop-shadow-md">
              <Image
                src="/icon.png"
                alt="ApsnyGO Emblem"
                fill
                className="object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              О проекте ApsnyGO
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-gray-900 tracking-tight leading-[1.14]">
              Создано с любовью к{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-moss-600">
                Стране Души
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-stone-gray-600 leading-relaxed max-w-2xl mx-auto">
              ApsnyGO — главный онлайн-сервис прямого бронирования проверенного жилья и авторских маршрутов по Республике Абхазия. Без посредников, скрытых комиссий и с гарантией безопасности.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/listings">
                <AppButton variant="primary" size="lg">
                  <span>Перейти в каталог жилья</span>
                  <ArrowRight className="w-4 h-4" />
                </AppButton>
              </Link>
              <Link href="/host">
                <AppButton variant="glass" size="lg">
                  <span>Для владельцев жилья</span>
                </AppButton>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <PixelDivider variant="pine" />

      {/* ========================================================= */}
      {/* 2. ЦИФРЫ И СТАТИСТИКА                                     */}
      {/* ========================================================= */}
      <section className="py-12 relative z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 text-center border border-stone-200/90 shadow-soft"
              >
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-emerald-700">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-stone-gray-600 mt-1.5 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PixelDivider variant="mountain" />

      {/* ========================================================= */}
      {/* 3. НАША МИССИЯ И ИСТОРИЯ                                  */}
      {/* ========================================================= */}
      <section className="py-16 relative z-10">
        <Container size="narrow">
          <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 shadow-[0_20px_50px_-10px_rgba(20,40,30,0.06)] space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-2">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              Наша философия
            </div>

            <h2 className="text-3xl font-extrabold text-stone-gray-900 tracking-tight">
              Зачем мы создали ApsnyGO?
            </h2>

            <p className="text-base text-stone-gray-700 leading-relaxed">
              Абхазия — одно из самых живописных и гостеприимных мест на Черном море. Здесь субтропические пальмы Старой Гагры соседствуют со столетними реликтовыми соснами Пицунды, а кристальные реки ущелий спускаются к широким галечным и песчаным пляжам.
            </p>

            <p className="text-base text-stone-gray-700 leading-relaxed">
              Долгие годы самостоятельный турист сталкивался со сложностями: неактуальные телефоны на досках объявлений, завышенные цены посредников, риск приехать в несуществующий номер.
            </p>

            <p className="text-base text-stone-gray-700 leading-relaxed">
              Мы объединили современный цифровой сервис, интерактивную карту курортов, календарь занятости и личную проверку каждого объекта командой в республике. На ApsnyGO вы бронируете проверенное жилье с уверенностью, что вас встретят как дорогого гостя.
            </p>

            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-28">
                  <Image
                    src="/logo.png"
                    alt="ApsnyGO"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <span className="text-xs text-stone-gray-500 font-medium">
                  Официальный сервис посуточного жилья в Абхазии
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PixelDivider variant="spark" />

      {/* ========================================================= */}
      {/* 4. ПРИНЦИПЫ И ЦЕННОСТИ                                    */}
      {/* ========================================================= */}
      <section className="py-16 relative z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-gray-900 tracking-tight">
              Наши главные принципы
            </h2>
            <p className="mt-2 text-sm text-stone-gray-600">
              На чем строится доверие между гостями и хозяевами на ApsnyGO
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${v.bg}`}>
                  {v.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-stone-gray-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-stone-gray-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PixelDivider variant="pine" />

      {/* ========================================================= */}
      {/* 5. ФИНАЛЬНЫЙ БАННЕР                                       */}
      {/* ========================================================= */}
      <section className="py-16 relative z-10">
        <Container size="narrow">
          <div className="text-center p-8 sm:p-12 bg-gradient-to-r from-emerald-900 via-stone-gray-900 to-emerald-950 text-white rounded-3xl border border-stone-800 shadow-soft-lg">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3">
              Готовы открыть для себя настоящую Абхазию?
            </h3>
            <p className="text-sm text-stone-300 max-w-md mx-auto mb-8 leading-relaxed">
              Выбирайте жилье на первой линии моря, в горах или в сосновом бору Пицунды прямо сейчас.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/listings">
                <AppButton variant="glow" size="lg">
                  <span>Смотреть каталог жилья</span>
                  <ArrowRight className="w-4 h-4" />
                </AppButton>
              </Link>
              <Link href="/destinations">
                <AppButton
                  variant="glass"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
                >
                  <span>Курорты Абхазии</span>
                </AppButton>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
