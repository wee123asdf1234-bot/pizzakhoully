import React, { useState } from 'react';
import {
  Heart,
  Plus,
  Check,
  Flame,
  Star,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { MenuItem } from '../types';
import { KNOWN_DISHES } from '../data/restaurantData';
import { useCart } from '../context/CartContext';

export const FeaturedDishes: React.FC = () => {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  // Highlight primarily the 3 known supplied dishes, followed by documented specialties
  const featured = KNOWN_DISHES.slice(0, 4);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedAnimation((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="featured" className="py-16 sm:py-20 bg-[#161211] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-xs font-bold text-red-400 mb-3">
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>الأطباق الأكثر طلباً وشهرة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              العروض والأطباق المميزة
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-xl">
              أصناف موثقة يشتهر بها مطعم بيتزا الخولي في كفر الشيخ، محضرة من مكونات طازجة مخبوزة على مدار الساعة.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-500 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-lg">
              متوسط الأسعار: ١–٢٠٠ ج.م للشخص
            </span>
          </div>
        </div>

        {/* Dishes Grid & Mobile Horizontal Scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((dish) => {
            const isFav = !!favorites[dish.id];
            const isAdded = !!addedAnimation[dish.id];

            return (
              <div
                key={dish.id}
                className="group relative bg-[#1c1715] rounded-2xl border border-stone-800 hover:border-amber-600/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1"
              >
                {/* Dish Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1715] via-transparent to-black/30" />

                  {/* Badges on Top */}
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
                    {dish.isKnownSupplied ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/90 text-emerald-400 border border-emerald-600/40 text-[11px] font-bold shadow">
                        <Check className="w-3 h-3" />
                        صنف موثق
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-900/90 text-stone-300 border border-stone-700 text-[11px] font-medium">
                        صنف مميز
                      </span>
                    )}

                    <button
                      onClick={() => toggleFavorite(dish.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                        isFav
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-black/40 text-stone-300 hover:text-red-400 hover:bg-black/60'
                      }`}
                      aria-label="إضافة للمفضلة"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Known Dish Highlight Name */}
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs font-semibold text-amber-300 bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded border border-white/10">
                      {dish.category === 'pastries' ? 'فطائر شرقية' : 'بيتزا إيطالية'}
                    </span>
                  </div>
                </div>

                {/* Dish Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="mt-2 text-stone-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[11px] text-stone-500 font-medium">
                        {dish.price ? 'السعر التقديري' : 'السعر'}
                      </span>
                      <span className="text-base font-black text-amber-400">
                        {dish.price ? `${dish.price} جنيه` : dish.priceFormatted}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(dish)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تمت الإضافة</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>إضافة للطلب</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Menu Prompt Strip */}
        <div className="mt-10 p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xs sm:text-sm text-stone-300">
              لدينا تشكيلة واسعة من البيتزا، الفطائر، والساندويتشات والوجبات السريعة. يمكنك طلب وتخصيص أي صنف عبر الاتصال المباشر.
            </p>
          </div>
          <a
            href="#menu"
            className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold shrink-0 transition-colors"
          >
            تصفح القائمة الكاملة
          </a>
        </div>
      </div>
    </section>
  );
};
