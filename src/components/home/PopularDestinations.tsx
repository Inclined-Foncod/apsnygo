import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { ABKHAZIA_CITIES } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';

export function PopularDestinations() {
  const cities = ABKHAZIA_CITIES.filter((c) => c.id !== 'all');

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-moss-600">
              Популярные направления
            </span>
            <h2 className="text-3xl font-bold text-stone-gray-900 mt-1">
              Курорты Абхазии
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-stone-gray-500 max-w-md">
            От оживленной Старой Гагры до реликтовых сосновых рощ Пицунды и древних святынь Нового Афона.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/listings?city=${encodeURIComponent(city.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-stone-gray-100 shadow-soft-sm hover:shadow-soft-lg transition-all"
            >
              <Image
                src={city.image}
                alt={city.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-gray-950/80 via-stone-gray-950/20 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-base">{city.name}</h3>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-green-300" />
                </div>
                <p className="text-[11px] text-stone-gray-300 mt-0.5">
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
