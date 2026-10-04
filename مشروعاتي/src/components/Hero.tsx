import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Flame,
  Clock,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  Edit3,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { PhoneNumber, OFFICIAL_TEL_HREF } from './PhoneNumber';
import imgPizzaHero from '../assets/images/pizza_tony_1791146513789.jpg';
import imgFeteerHero from '../assets/images/feteer_el_kholy_1791146502060.jpg';

export const Hero: React.FC = () => {
  const [slogan, setSlogan] = useState(RESTAURANT_INFO.sloganEditable);
  const [isEditingSlogan, setIsEditingSlogan] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState<'pizza' | 'feteer'>('pizza');

  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 flex items-center overflow-hidden">
      {/* Background Decorative Gradients & Accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#261d1a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Right Column (Arabic RTL: Leading Content) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Status & Category Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/30 text-xs font-bold text-amber-400 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{RESTAURANT_INFO.category} في كفر الشيخ</span>
              <span className="text-stone-600">|</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {RESTAURANT_INFO.openingStatus}
              </span>
            </div>

            {/* Main Title & Editable Slogan */}
            <div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.15]">
                {RESTAURANT_INFO.name}
              </h1>

              {/* Editable Slogan Box */}
              <div className="mt-3 flex items-center gap-2 group">
                {isEditingSlogan ? (
                  <div className="flex items-center gap-2 w-full max-w-md">
                    <input
                      type="text"
                      value={slogan}
                      onChange={(e) => setSlogan(e.target.value)}
                      className="bg-stone-900 border border-amber-500/60 rounded-lg px-3 py-1.5 text-base text-amber-300 font-semibold focus:outline-none w-full"
                      autoFocus
                    />
                    <button
                      onClick={() => setIsEditingSlogan(false)}
                      className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
                      title="حفظ الشعار"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                      "{slogan}"
                    </p>
                    <button
                      onClick={() => setIsEditingSlogan(true)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-stone-400 hover:text-amber-400 text-xs flex items-center gap-1 rounded bg-stone-800/80 px-2 py-0.5 border border-stone-700"
                      title="تعديل الشعار التجريبي"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>تعديل</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Credibility & Verified Listing Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-stone-800/80">
              {/* Rating */}
              <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-base font-black text-white">{RESTAURANT_INFO.rating}</span>
                  <span className="text-xs text-stone-400">/ 5</span>
                </div>
                <p className="text-xs text-stone-400">تقييم موثق</p>
              </div>

              {/* Review Count */}
              <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800">
                <div className="text-base font-black text-white mb-1">
                  {RESTAURANT_INFO.reviewCount}{' '}
                  <span className="text-xs font-normal text-stone-400">مراجعة</span>
                </div>
                <p className="text-xs text-stone-400">تقييمات الزوار</p>
              </div>

              {/* Price Per Person */}
              <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800">
                <div className="text-base font-black text-amber-400 mb-1">١–٢٠٠ ج.م</div>
                <p className="text-xs text-stone-400">للشخص الواحد</p>
              </div>

              {/* Location */}
              <div className="bg-stone-900/60 rounded-xl p-3 border border-stone-800">
                <div className="flex items-center gap-1 text-white font-black text-base mb-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{RESTAURANT_INFO.city}</span>
                </div>
                <p className="text-xs text-stone-400 truncate">الخليفة المأمون</p>
              </div>
            </div>

            {/* Paragraph Description */}
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              وجهتكم الأولى في كفر الشيخ للبيتزا الإيطالية والشرقية، وفطائر مشلتت ساخنة على مدار الساعة.
              نقدم لكم تشكيلة متنوعة بأجواء عائلية مريحة وأسعار مناسبة تلائم الجميع.
            </p>

            {/* Powerful CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Menu CTA */}
              <a
                href="#menu"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-base shadow-xl shadow-red-950/50 hover:shadow-red-900/60 transition-all active:scale-98"
              >
                <BookOpen className="w-5 h-5" />
                <span>عرض قائمة الطعام</span>
              </a>

              {/* Order Now CTA */}
              <a
                href="#featured"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-amber-300 border border-amber-600/40 font-bold text-base transition-all"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>اطلب الآن</span>
              </a>

              {/* Directions CTA */}
              <a
                href="#location"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-red-400" />
                <span>الاتجاهات</span>
              </a>

              {/* Call CTA */}
              <a
                href={OFFICIAL_TEL_HREF}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-600/40 font-bold text-sm transition-all"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="flex items-center gap-1">
                  <span>اتصل بنا</span>
                  <span>(</span>
                  <PhoneNumber />
                  <span>)</span>
                </span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                معلومات معتمدة ومحدثة
              </span>
              <span>•</span>
              <span>جلسات عائلية وخارجية</span>
              <span>•</span>
              <span>توصيل وتيك أواي</span>
            </div>
          </div>

          {/* Left Column (Visual Presentation) */}
          <div className="lg:col-span-5 relative">
            {/* Visual Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/30 to-amber-500/30 rounded-3xl blur-xl" />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-[#1c1715] border border-stone-800 overflow-hidden shadow-2xl">
                {/* Image Switcher Tabs */}
                <div className="p-3 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setActiveHeroTab('pizza')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeHeroTab === 'pizza'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      بيتزا توني (Pizza Tony)
                    </button>
                    <button
                      onClick={() => setActiveHeroTab('feteer')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeHeroTab === 'feteer'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      فطيره الخولي ك
                    </button>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/30">
                    أطباق مميزة
                  </span>
                </div>

                {/* Hero Dish Image */}
                <div className="relative h-72 sm:h-96 w-full overflow-hidden group">
                  <img
                    src={activeHeroTab === 'pizza' ? imgPizzaHero : imgFeteerHero}
                    alt={activeHeroTab === 'pizza' ? 'Pizza Tony' : 'فطيره الخولي ك'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161211] via-transparent to-black/20" />

                  {/* Floating Price & Badge */}
                  <div className="absolute bottom-4 right-4 left-4 flex items-end justify-between">
                    <div className="bg-stone-950/85 backdrop-blur-md border border-stone-700/60 rounded-xl p-3 shadow-lg max-w-[70%]">
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-0.5">
                        <Flame className="w-3.5 h-3.5" />
                        <span>الأكثر طلباً</span>
                      </div>
                      <h4 className="text-white font-bold text-base truncate">
                        {activeHeroTab === 'pizza' ? 'Pizza Tony - بيتزا توني' : 'فطيره الخولي ك'}
                      </h4>
                      <p className="text-stone-300 text-xs">
                        {activeHeroTab === 'pizza'
                          ? 'بخلطة الخولي والجبن الفاخر'
                          : 'فطيرة شرقية مورقة بالسمن والجبن'}
                      </p>
                    </div>

                    <a
                      href="#menu"
                      className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg transition-transform active:scale-95"
                      title="اطلب هذا الصنف"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Floating Highlights Badges */}
                <div className="p-4 grid grid-cols-3 gap-2 bg-stone-950/60 text-center text-xs border-t border-stone-800">
                  <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                    <span className="block font-bold text-amber-400">عجينة طازجة</span>
                    <span className="text-[11px] text-stone-400">تُعجن يومياً</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                    <span className="block font-bold text-amber-400">فرن بلدي</span>
                    <span className="text-[11px] text-stone-400">تسوية مقرمشة</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
                    <span className="block font-bold text-amber-400">خدمة 24 س</span>
                    <span className="text-[11px] text-stone-400">طوال الأسبوع</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
