import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { ListingCard } from '@/components/listings/ListingCard';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FeaturedListings() {
  return (
    <section className="py-20 bg-[#F6F8F5]/80 border-y border-stone-200/80 relative overflow-hidden">
      {/* Водяной знак природы: контур реликтовой сосны Пицунды */}
      <BackgroundPattern variant="pine-watermark" opacity="opacity-[0.035]" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Выбор путешественников
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-gray-900 tracking-tight">
              Рекомендуемое жилье
            </h2>
          </div>
          <Link
            href="/listings"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
          >
            <span>Смотреть весь каталог</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
