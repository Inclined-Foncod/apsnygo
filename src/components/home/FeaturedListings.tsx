import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { ListingCard } from '@/components/listings/ListingCard';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';

export function FeaturedListings() {
  return (
    <section className="py-16 bg-stone-gray-50/60 border-y border-stone-gray-200">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700">
              Выбор путешественников
            </span>
            <h2 className="text-3xl font-bold text-stone-gray-900 mt-1">
              Рекомендуемое жилье
            </h2>
          </div>
          <Link
            href="/listings"
            className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-moss-700 hover:text-green-700 transition-colors"
          >
            Смотреть весь каталог
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Container>
    </section>
  );
}
