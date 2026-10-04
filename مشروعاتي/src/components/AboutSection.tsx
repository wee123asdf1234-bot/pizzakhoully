import React from 'react';
import {
  Clock,
  MapPin,
  Users,
  Award,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { PhoneNumber, OFFICIAL_TEL_HREF } from './PhoneNumber';
import imgAmbiance from '../assets/images/restaurant_ambiance_1791146536912.jpg';
import imgExterior from '../assets/images/restaurant_exterior_1791146550903.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#161211] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Right Column: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Image */}
              <div className="rounded-3xl overflow-hidden border border-stone-800 shadow-2xl shadow-black/60 relative">
                <img
                  src={imgAmbiance}
                  alt="جلسات مطعم بيتزا الخولي"
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161211] via-transparent to-transparent" />
              </div>

              {/* Overlapping Secondary Card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-[#1f1917] border border-amber-600/40 p-4 sm:p-5 rounded-2xl shadow-2xl max-w-xs backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm">مفتوح على مدار الساعة</h4>
                    <p className="text-stone-400 text-xs mt-0.5">جاهزون لخدمتكم 24/7 طوال أيام الأسبوع</p>
                  </div>
                </div>
              </div>

              {/* Small Tag on top */}
              <div className="absolute -top-4 -left-2 sm:-left-4 bg-stone-900 border border-stone-700 px-3.5 py-1.5 rounded-full shadow-lg text-xs font-bold text-stone-200 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>أجواء عائلية ومجموعات</span>
              </div>
            </div>
          </div>

          {/* Left Column: Authentic Brand Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>عن بيتزا الخولي</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                تاريخ من العراقة في صناعة البيتزا والفطائر بكفر الشيخ
              </h2>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              يُعد مطعم <strong className="text-white font-bold">{RESTAURANT_INFO.name}</strong> من العلامات
              المحلية المعروفة في محافظة كفر الشيخ، حيث يقع في قلب شارع الخليفة المأمون. يتميز المطعم بتقديم
              أشهى أنواع الفطائر الشرقية المشلتت والبيتزا الإيطالية ذات العجينة الطازجة والمكونات المختارة بعناية.
            </p>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              حرصنا على توفير بيئة عائلية مضيافة تتسع للمجموعات والأسر والطلاب والسياح، مع أسعار مناسبة تتراوح
              بين <span className="text-amber-400 font-bold">١ و ٢٠٠ جنيه للشخص</span>، بالإضافة إلى خدمات
              التوصيل السريع والطلبات الخارجية في أي وقت ليلاً أو نهاراً بفضل تشغيلنا على مدار الساعة.
            </p>

            {/* Highlights Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">عجين وخبز يومي طازج</h4>
                  <p className="text-stone-400 text-xs mt-0.5">مخبوزات وتتبيلات تحضر فور طلبك في الفرن</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">مفتوح 24 ساعة</h4>
                  <p className="text-stone-400 text-xs mt-0.5">وجبات متأخرة وسريعة طوال ساعات الليل</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">جلسات متعددة ومريحة</h4>
                  <p className="text-stone-400 text-xs mt-0.5">جلسات صالة داخلية، خارجية ومجهزة للجميع</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">موقع مميز وسهل الوصول</h4>
                  <p className="text-stone-400 text-xs mt-0.5">شارع الخليفة المأمون، كفر الشيخ</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#location"
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm border border-stone-700 transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-red-400" />
                <span>عرض موقع المطعم على الخريطة</span>
              </a>
              <a
                href={OFFICIAL_TEL_HREF}
                className="px-5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 hover:bg-emerald-900/70 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="flex items-center gap-1">
                  <span>اتصل بالإدارة:</span>
                  <PhoneNumber />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
