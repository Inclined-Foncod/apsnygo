import { Container } from '@/components/layout/Container';
import { SearchBar } from './SearchBar';
import { Badge } from '@/components/ui/Badge';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-moss-50/50 via-white to-white overflow-hidden">
      {/* Мягкие декоративные фоновые элементы в фирменных оттенках */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-green-100/40 via-moss-100/30 to-stone-gray-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Бейдж */}
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="moss" className="px-3.5 py-1.5 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-moss-600" />
              Открой для себя Страну Души
            </Badge>
          </div>

          {/* Главный заголовок */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-stone-gray-900 leading-[1.15]">
            Аренда проверенного жилья в{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-moss-600">
              Абхазии
            </span>
          </h1>

          {/* Подзаголовок */}
          <p className="mt-5 text-lg md:text-xl text-stone-gray-600 leading-relaxed font-normal">
            Квартиры, частные виллы и уютные эко-коттеджи у Черного моря. Прямое бронирование без скрытых комиссий и наценок.
          </p>

          {/* Быстрые факты */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-stone-gray-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" /> 100% реальные фото
            </span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-moss-600" /> 500+ вариантов на побережье
            </span>
          </div>
        </div>

        {/* Поисковая плашка */}
        <SearchBar />
      </Container>
    </section>
  );
}
