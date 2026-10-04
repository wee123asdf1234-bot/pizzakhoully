import React from 'react';
import { Home, UtensilsCrossed, ShoppingBag, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { OFFICIAL_TEL_HREF, OFFICIAL_PHONE_NUMBER } from './PhoneNumber';

export const BottomNav: React.FC = () => {
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#161211]/95 backdrop-blur-lg border-t border-stone-800 lg:hidden px-3 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        {/* Home */}
        <a
          href="#home"
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-white py-1 px-2 text-[10px] font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>الرئيسية</span>
        </a>

        {/* Menu */}
        <a
          href="#menu"
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-white py-1 px-2 text-[10px] font-medium transition-colors"
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span>القائمة</span>
        </a>

        {/* Center CTA: Order Now / Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative -top-5 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-xl shadow-red-950/70 active:scale-95 border-2 border-[#161211] transition-transform"
          aria-label="سلة الطلبات"
        >
          <ShoppingBag className="w-6 h-6 text-white" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-red-600 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {totalCount}
            </span>
          )}
        </button>

        {/* Location */}
        <a
          href="#location"
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-white py-1 px-2 text-[10px] font-medium transition-colors"
        >
          <MapPin className="w-5 h-5" />
          <span>الموقع</span>
        </a>

        {/* Call Direct */}
        <a
          href={OFFICIAL_TEL_HREF}
          dir="ltr"
          className="flex flex-col items-center gap-1 text-emerald-400 hover:text-emerald-300 py-1 px-2 text-[10px] font-bold transition-colors"
          title={`اتصال: ${OFFICIAL_PHONE_NUMBER}`}
        >
          <Phone className="w-5 h-5" />
          <span dir="rtl">اتصال</span>
        </a>
      </div>
    </nav>
  );
};
