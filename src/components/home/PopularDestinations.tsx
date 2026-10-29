import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { ABKHAZIA_CITIES } from '@/lib/constants';
import { ArrowUpRight, Compass } from 'lucide-react';

export function PopularDestinations() {
  const cities = ABKHAZIA_CITIES.filter((c) => c.id !== 'all');

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Водяной знак природы: контур горных хребтов */}
      <BackgroundPattern variant="mountains-watermark" opacity="opacity-[0.035]" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              Популярные направления
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-gray-900 tracking-tight">
              Курорты Абхазии
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-stone-gray-600 max-w-md leading-relaxed">
            От оживленной Старой Гагры до реликтовых сосновых рощ Пицунды и древних святынь Нового Афона.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/listings?city=${encodeURIComponent(city.name)}`}
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-stone-gray-100 border border-stone-200/80 shadow-soft hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300"
            >
              <Image
                src={city.image}
                alt={city.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-gray-950/85 via-stone-gray-950/25 to-transparent" />

              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base group-hover:text-emerald-200 transition-colors">
                    {city.name}
                  </h3>
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                </div>
                <p className="text-[11px] text-stone-gray-300 mt-0.5 font-medium">
                  {city.count} вариантов
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
