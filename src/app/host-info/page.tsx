'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { AppButton } from '@/components/ui/AppButton';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { PixelDivider } from '@/components/ui/PixelDivider';
import {
  ShieldCheck,
  Calendar,
  Camera,
  Coins,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  Sparkles,
  Lock,
  MessageSquare,
} from 'lucide-react';

export default function HostInfoPage() {
  const faqs = [
    {
      q: 'Сколько стоит размещение объекта на ApsnyGO?',
      a: 'Размещение в каталоге абсолютно бесплатное. Мы не берем плату за регистрацию, публикацию фотографий или обслуживание профиля.',
    },
    {
      q: 'Как работает синхронизация календаря с Avito и Суточно?',
      a: 'Мы поддерживаем стандартный протокол iCal. Вы просто вставляете ссылку из личного кабинета другого сервиса в ApsnyGO — и занятые даты блокируются автоматически, исключая двойные бронирования.',
    },
    {
      q: 'Кто принимает оплату от гостя?',
      a: 'Гость связывается с вами напрямую, и вы получаете оплату согласованным удобным способом (на карту российского банка, СБП или наличными при заселении).',
    },
    {
      q: 'Как заказать бесплатную фотосъемку?',
      a: 'После одобрения заявки ваш персональный куратор согласует удобное время визита нашего мобильного фотографа в Гагре, Пицунде, Сухуме или Новом Афоне.',
    },
    {
      q: 'Могу ли я сдавать жилье только в определенные месяцы?',
      a: 'Да! Вы полностью контролируете доступность дат в личном календаре и можете открывать или закрывать бронирование на любые периоды.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFBF9] via-[#F5F8F5] to-[#FFFFFF] text-stone-gray-900 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden">
      <BackgroundPattern variant="dots" />
      <BackgroundPattern variant="mountains-watermark" opacity="opacity-[0.035]" />

      {/* Шапка страницы */}
      <section className="pt-14 pb-16 relative z-10">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              База знаний для партнеров
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-gray-900 tracking-tight leading-tight">
              Правила и условия сотрудничества с ApsnyGO
            </h1>
            <p className="mt-4 text-base text-stone-gray-600 leading-relaxed max-w-2xl mx-auto">
              Все, что нужно знать о работе нашей платформы, защите интересов хозяев, синхронизации и привлечении туристов в Абхазию.
            </p>
          </div>
        </Container>
      </section>

      <PixelDivider variant="pine" />

      {/* 4 ключевых принципа */}
      <section className="py-12 relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200/60">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-stone-gray-900 mb-2">
                1. Прямая связь и безопасность
              </h3>
              <p className="text-sm text-stone-gray-600 leading-relaxed">
                Вы общаетесь с гостями напрямую через проверенный чат или WhatsApp. Никаких искусственных барьеров — вы заранее знаете, кто и когда к вам приезжает.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 border border-teal-200/60">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-stone-gray-900 mb-2">
                2. Защита от двойных броней
              </h3>
              <p className="text-sm text-stone-gray-600 leading-relaxed">
                Двусторонняя iCal-синхронизация мгновенно блокирует занятые даты на всех ваших площадках. Вы управляете всеми бронями из одного места.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 border border-amber-200/60">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-stone-gray-900 mb-2">
                3. Знак «Проверено ApsnyGO»
              </h3>
              <p className="text-sm text-stone-gray-600 leading-relaxed">
                Объекты с верификацией модератором получают в 3 раза больше бронирований. Мы бесплатно фотографируем объект и отмечаем его как проверенный.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4 border border-sky-200/60">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-stone-gray-900 mb-2">
                4. Поддержка 24/7 в Абхазии
              </h3>
              <p className="text-sm text-stone-gray-600 leading-relaxed">
                Наша команда находится непосредственно в Абхазии. В отличие от зарубежных платформ, мы всегда на связи и можем оперативно помочь на месте.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <PixelDivider variant="mountain" />

      {/* Вопросы и ответы (FAQ) */}
      <section className="py-14 relative z-10">
        <Container size="narrow">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-gray-900">
              Часто задаваемые вопросы
            </h2>
            <p className="text-sm text-stone-gray-600 mt-1">
              Ответы на главные вопросы собственников перед стартом
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-soft-sm"
              >
                <h4 className="font-heading font-bold text-base text-stone-gray-900 mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-sm text-stone-gray-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Финальный призыв к действию */}
          <div className="mt-12 text-center p-8 bg-gradient-to-r from-emerald-900 via-stone-gray-900 to-emerald-950 text-white rounded-3xl shadow-soft-lg">
            <h3 className="text-2xl font-extrabold text-white mb-2">
              Готовы начать принимать гостей?
            </h3>
            <p className="text-sm text-stone-300 max-w-md mx-auto mb-6">
              Заполните простую заявку — подключение займет не более одного дня!
            </p>
            <Link href="/host#host-form">
              <AppButton variant="glow" size="lg">
                <span>Подать заявку на подключение</span>
                <ArrowRight className="w-4 h-4" />
              </AppButton>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
