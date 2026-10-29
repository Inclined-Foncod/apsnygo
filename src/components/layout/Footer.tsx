import Link from 'next/link';
import { Container } from './Container';
import { Trees, ShieldCheck, Headphones, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-gray-50 border-t border-stone-gray-200 mt-20">
      <Container className="py-14">
        {/* Преимущества ApsnyGO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-stone-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-stone-gray-900 mb-1">
                Проверенное жилье
              </h4>
              <p className="text-sm text-stone-gray-600">
                Каждый объект проверяется нашими модераторами в Абхазии. Реальные фото и отзывы.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-moss-100 text-moss-700 flex items-center justify-center shrink-0">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-stone-gray-900 mb-1">
                Локальный сервис
              </h4>
              <p className="text-sm text-stone-gray-600">
                Создано с любовью к Стране Души. Знаем каждый курорт, пляж и тропу.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-stone-gray-200 text-stone-gray-700 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-stone-gray-900 mb-1">
                Поддержка 24/7
              </h4>
              <p className="text-sm text-stone-gray-600">
                Помощь в WhatsApp и Telegram на всех этапах бронирования и отдыха.
              </p>
            </div>
          </div>
        </div>

        {/* Ссылки футера */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white">
                <Trees className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-xl text-stone-gray-900">
                Apsny<span className="text-green-600">GO</span>
              </span>
            </div>
            <p className="text-xs text-stone-gray-500 leading-relaxed">
              Главный онлайн-агрегатор посуточного жилья и комфортного отдыха в Республике Абхазия.
            </p>
          </div>

          <div>
            <h5 className="font-heading font-bold text-sm text-stone-gray-900 mb-4 uppercase tracking-wider">
              Курорты Абхазии
            </h5>
            <ul className="space-y-2.5 text-sm text-stone-gray-600">
              <li><Link href="/listings?city=Гагра" className="hover:text-green-700">Гагра</Link></li>
              <li><Link href="/listings?city=Пицунда" className="hover:text-green-700">Пицунда</Link></li>
              <li><Link href="/listings?city=Сухум" className="hover:text-green-700">Сухум</Link></li>
              <li><Link href="/listings?city=Новый Афон" className="hover:text-green-700">Новый Афон</Link></li>
              <li><Link href="/listings?city=Гудаута" className="hover:text-green-700">Гудаута</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-sm text-stone-gray-900 mb-4 uppercase tracking-wider">
              Типы жилья
            </h5>
            <ul className="space-y-2.5 text-sm text-stone-gray-600">
              <li><Link href="/listings?type=apartment" className="hover:text-green-700">Квартиры и апартаменты</Link></li>
              <li><Link href="/listings?type=cottage" className="hover:text-green-700">Коттеджи у моря</Link></li>
              <li><Link href="/listings?type=guest_house" className="hover:text-green-700">Гостевые дома</Link></li>
              <li><Link href="/listings?type=hotel" className="hover:text-green-700">Отели и пансионаты</Link></li>
              <li><Link href="/listings?type=villa" className="hover:text-green-700">Виллы с бассейном</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-heading font-bold text-sm text-stone-gray-900 mb-4 uppercase tracking-wider">
              Владельцам
            </h5>
            <ul className="space-y-2.5 text-sm text-stone-gray-600">
              <li><Link href="/host" className="hover:text-green-700">Разместить жилье</Link></li>
              <li><Link href="/host-rules" className="hover:text-green-700">Правила для хозяев</Link></li>
              <li><Link href="/tariffs" className="hover:text-green-700">Тарифы сервиса</Link></li>
              <li><Link href="/safety" className="hover:text-green-700">Гарантия безопасности</Link></li>
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-gray-500">
          <p>© {new Date().getFullYear()} ApsnyGO. Все права защищены.</p>
          <p className="flex items-center gap-1 text-moss-700">
            Сделано для комфортного отдыха в Абхазии <Heart className="w-3.5 h-3.5 fill-moss-600 text-moss-600" />
          </p>
        </div>
      </Container>
    </footer>
  );
}
