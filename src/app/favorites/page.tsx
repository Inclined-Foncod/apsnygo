import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Heart, Search } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <div className="py-16 bg-white min-h-[calc(100vh-200px)] flex items-center">
      <Container size="narrow">
        <div className="text-center bg-stone-gray-50 rounded-3xl border border-stone-gray-200 p-12">
          <div className="w-16 h-16 rounded-2xl bg-white border border-stone-gray-200 text-stone-gray-400 flex items-center justify-center mx-auto mb-4 shadow-soft-sm">
            <Heart className="w-8 h-8 text-moss-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-gray-900 mb-2">
            В избранном пока пусто
          </h1>
          <p className="text-stone-gray-500 text-sm max-w-md mx-auto mb-6">
            Нажимайте на сердечко на карточке любого отеля, гостевого дома или коттеджа, чтобы сохранить его для поездки в Абхазию.
          </p>
          <Link href="/listings">
            <Button variant="primary">
              <Search className="w-4 h-4" />
              Перейти в каталог жилья
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
