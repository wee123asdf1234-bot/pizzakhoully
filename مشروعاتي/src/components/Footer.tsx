import React from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Download,
  Share2,
  Navigation,
  Globe,
  Heart,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PhoneNumber, OFFICIAL_TEL_HREF } from './PhoneNumber';

interface FooterProps {
  onOpenIOSGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenIOSGuide }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      onOpenIOSGuide();
    }
  };

  return (
    <footer className="bg-[#0f0c0b] border-t border-stone-800/80 pt-16 pb-24 lg:pb-16 text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#181413] rounded-[10px] flex items-center justify-center font-black text-amber-400 text-sm">
                  الخولي
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{RESTAURANT_INFO.name}</h3>
                <p className="text-xs text-amber-500 font-semibold">{RESTAURANT_INFO.category} في كفر الشيخ</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md">
              نقدم أشهى أنواع البيتزا الإيطالية والشرقية، وفطائر مشلتت ساخنة على مدار الساعة بأجواء عائلية مريحة
              وأسعار تناسب الجميع في قلب مدينة كفر الشيخ.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {RESTAURANT_INFO.openingStatus} (24/7)
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-stone-300">تقييم موثق {RESTAURANT_INFO.rating} / 5</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-base mb-2">أقسام الموقع</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">الرئيسية</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">قائمة الطعام</a>
              </li>
              <li>
                <a href="#featured" className="hover:text-amber-400 transition-colors">الأطباق المميزة</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">آراء الزوار</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">معرض الصور</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">عن المطعم</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">المميزات والمرافق</a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-base mb-2">بيانات التواصل</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{RESTAURANT_INFO.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Navigation className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono text-stone-300">{RESTAURANT_INFO.plusCode}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={OFFICIAL_TEL_HREF}
                  dir="ltr"
                  className="font-bold text-white hover:text-emerald-400 transition-colors text-sm"
                >
                  <PhoneNumber />
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-emerald-400 font-bold">{RESTAURANT_INFO.openingStatus}</span>
              </li>
            </ul>
          </div>

          {/* PWA & Digital Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-base mb-2">تطبيق المطعم</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              ثبّت الموقع كتطبيق خفيف على هاتفك بدون الحاجة لمتجر التطبيقات.
            </p>
            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 font-bold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تثبيت التطبيق (PWA)</span>
              </button>
            )}

            {/* Social media placeholder (not inventing fake URLs) */}
            <div className="pt-2">
              <span className="block text-[11px] text-stone-500 mb-2">حسابات التواصل الاجتماعي:</span>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-400 text-xs" title="صفحة فيسبوك الرسمية (قيد التحديث)">
                  فيسبوك
                </span>
                <span className="p-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-400 text-xs" title="صفحة إنستغرام الرسمية (قيد التحديث)">
                  إنستغرام
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-right">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {RESTAURANT_INFO.name} — كفر الشيخ، مصر.
          </div>
          <div className="text-[11px] text-stone-600">
            البيانات والأسعار والتقييمات مستندة إلى المعلومات الموثقة والمراجعات المعتمدة.
          </div>
        </div>
      </div>
    </footer>
  );
};
