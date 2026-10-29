import { Container } from '@/components/layout/Container';
import { AppButton } from '@/components/ui/AppButton';
import Link from 'next/link';
import { Heart, Search } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="py-20 bg-gradient-to-b from-[#FAFBF9] via-[#F6F8F5] to-[#FFFFFF] min-h-[calc(100vh-200px)] flex items-center">
      <Container size="narrow">
        <div className="text-center bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/90 p-12 shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-soft-sm">
            <Heart className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-gray-900 mb-2">
            В избранном пока пусто
          </h1>
          <p className="text-stone-gray-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Нажимайте на сердечко на карточке любого отеля, гостевого дома или коттеджа, чтобы сохранить его для поездки в Абхазию.
          </p>
          <Link href="/listings">
            <AppButton variant="primary" size="lg">
              <Search className="w-4 h-4" />
              <span>Перейти в каталог жилья</span>
            </AppButton>
          </Link>
        </div>
      </Container>
    </div>
  );
}
