import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Check,
  Filter,
  Sparkles,
  Phone,
  Flame,
  Info,
  UtensilsCrossed,
} from 'lucide-react';
import { MenuItem } from '../types';
import { KNOWN_DISHES, MENU_CATEGORIES, RESTAURANT_INFO } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { PhoneNumber, OFFICIAL_TEL_HREF } from './PhoneNumber';

export const MenuSection: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    return KNOWN_DISHES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedAnimation((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#141110] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>قائمة طعام بيتزا الخولي</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            تصفح القائمة والطلبات
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            اختر أشهى أنواع البيتزا الإيطالية والفطائر الشرقية المخبوزة طازجة.
            الأسعار تتراوح بين ١–٢٠٠ جنيه للشخص مع إمكانية التخصيص.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-[#1b1614] border border-stone-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="ابحث عن بيتزا، فطيرة، صنف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700/80 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white text-xs"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md'
                        : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAdded = !!addedAnimation[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-[#1c1715] rounded-2xl border border-stone-800 hover:border-amber-600/40 p-4 flex gap-4 items-center justify-between group transition-all hover:bg-[#201a18]"
                >
                  {/* Dish Thumbnail */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-stone-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {item.isKnownSupplied && (
                      <span className="absolute bottom-1 right-1 bg-emerald-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded shadow">
                        موثق
                      </span>
                    )}
                  </div>

                  {/* Dish Info & Add */}
                  <div className="flex-1 min-w-0 pr-2 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-bold text-white text-base truncate group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                        {item.isPopular && (
                          <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-1.5 py-0.2 rounded border border-red-800/40 shrink-0">
                            شائع
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-stone-800/80">
                      <div>
                        <span className="text-xs font-black text-amber-400">
                          {item.price ? `${item.price} ج.م` : item.priceFormatted}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 shadow ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 hover:border-amber-500'
                        }`}
                        title="إضافة إلى سلة الطلب"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>تمت الإضافة</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-amber-400" />
                            <span>إضافة</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#1a1614] rounded-2xl border border-stone-800">
            <UtensilsCrossed className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">لم يتم العثور على نتائج</h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto mb-4">
              لم نعثر على أصناف تطابق بحثك. تتوفر أصناف إضافية يومياً داخل المطعم.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-stone-800 text-amber-400 text-xs font-bold rounded-lg hover:bg-stone-700"
            >
              إعادة تعيين البحث
            </button>
          </div>
        )}

        {/* Ordering Notice Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-[#1f1917] to-stone-900 border border-amber-600/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-bold">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>طلب مباشر ومتاح 24 ساعة في كفر الشيخ</span>
            </div>
            <h4 className="text-lg font-black text-white">
              تريد صنفاً مخصصاً أو إضافة حشوة خاصة في الفطيرة والبيتزا؟
            </h4>
            <p className="text-xs text-stone-400 max-w-xl">
              يمكنك الاتصال بفرع بيتزا الخولي على الرقم <strong className="text-white"><PhoneNumber /></strong> وطلب أي صنف بمكوناتك المفضلة وسنحضره لك في الحال.
            </p>
          </div>

          <a
            href={OFFICIAL_TEL_HREF}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-950/40 shrink-0 transition-transform active:scale-95"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span className="flex items-center gap-1">
              <span>اتصل واطلب:</span>
              <PhoneNumber />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
