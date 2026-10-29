import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { ABKHAZIA_CITIES } from '@/lib/constants';
import { ArrowRight, MapPin, Compass } from 'lucide-react';

export default function DestinationsPage() {
  const cities = ABKHAZIA_CITIES.filter((c) => c.id !== 'all');

  return (
    <div className="py-14 bg-gradient-to-b from-[#FAFBF9] via-[#F6F8F5] to-[#FFFFFF] min-h-screen relative overflow-hidden">
      <BackgroundPattern variant="mountains-watermark" opacity="opacity-[0.035]" />

      <Container className="relative z-10">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            Гид по Абхазии
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-gray-900 mt-2">
            Курорты и города Страны Души
          </h1>
          <p className="text-stone-gray-600 mt-3 text-base leading-relaxed">
            Узнайте особенности каждого региона Абхазии, выберите идеальный курорт для пляжного отдыха, экскурсий по горам или оздоровления.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <div
              key={city.id}
              className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-soft hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-gray-100">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-moss-800">
                  {city.count} объектов
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-moss-700 font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" /> Республика Абхазия
                </div>
                <h3 className="text-2xl font-bold text-stone-gray-900 mb-2">
                  {city.name}
                </h3>
                <p className="text-sm text-stone-gray-600 line-clamp-2 mb-4">
                  Живописный курорт на побережье Черного моря с чистейшей водой, реликтовой природой и кавказским гостеприимством.
                </p>
                <Link
                  href={`/listings?city=${encodeURIComponent(city.name)}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800"
                >
                  Смотреть жилье в {city.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
