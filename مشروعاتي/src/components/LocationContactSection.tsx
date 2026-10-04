import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Share2,
  Navigation,
  Clock,
  Copy,
  Check,
  Calendar,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { PhoneNumber, OFFICIAL_PHONE_NUMBER, OFFICIAL_TEL_HREF } from './PhoneNumber';

interface LocationContactProps {
  onOpenReservation: () => void;
}

export const LocationContactSection: React.FC<LocationContactProps> = ({ onOpenReservation }) => {
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [shared, setShared] = useState(false);

  // Exact provided location string & Plus Code
  const mapsSearchQuery = encodeURIComponent(
    `بيتزا الخولي ${RESTAURANT_INFO.plusCode} كفر الشيخ`
  );
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsSearchQuery}`;

  const copyPlusCode = () => {
    navigator.clipboard?.writeText(RESTAURANT_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard?.writeText(OFFICIAL_PHONE_NUMBER);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'موقع مطعم بيتزا الخولي',
      text: `مطعم بيتزا الخولي في كفر الشيخ - ${RESTAURANT_INFO.location}. هاتف: ${OFFICIAL_PHONE_NUMBER}، بلس كود: ${RESTAURANT_INFO.plusCode}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback
      }
    }
    navigator.clipboard?.writeText(
      `${shareData.title}\n${shareData.text}\n${shareData.url}`
    );
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#161211] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>الموقع وساعات العمل والاتصال</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            تفضل بزيارتنا في كفر الشيخ
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            موقع مركزي يسهل الوصول إليه، جاهزون لاستقبالكم وتقديم أشهى الفطائر والبيتزا الساخنة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Column: Contact Details & Info Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Restaurant Primary Address Card */}
            <div className="bg-[#1b1614] border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div>
                  <h3 className="text-2xl font-black text-white">{RESTAURANT_INFO.name}</h3>
                  <p className="text-xs text-amber-500 font-semibold mt-0.5">
                    {RESTAURANT_INFO.category} • كفر الشيخ
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center font-black text-amber-400 text-xs">
                    الخولي
                  </div>
                </div>
              </div>

              <div className="py-6 space-y-5">
                {/* Full Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-800/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 block mb-0.5">العنوان الرسمي:</span>
                    <p className="text-sm sm:text-base text-stone-200 font-medium leading-relaxed">
                      {RESTAURANT_INFO.location}
                    </p>
                  </div>
                </div>

                {/* Plus Code */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-center shrink-0">
                    <Navigation className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-stone-400 block mb-0.5">الرمز الجغرافي (Plus Code):</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs sm:text-sm font-mono font-bold bg-stone-900 px-2.5 py-1 rounded border border-stone-800 text-amber-400">
                        {RESTAURANT_INFO.plusCode}
                      </code>
                      <button
                        onClick={copyPlusCode}
                        className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs flex items-center gap-1 transition-colors"
                        title="نسخ الرمز الجغرافي"
                      >
                        {copiedPlusCode ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">تم النسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>نسخ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div id="contact" className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-stone-400 block mb-0.5">رقم الهاتف:</span>
                    <div className="flex items-center gap-3">
                      <a
                        href={OFFICIAL_TEL_HREF}
                        dir="ltr"
                        className="text-lg sm:text-xl font-black text-white hover:text-emerald-400 transition-colors tracking-wider"
                      >
                        <PhoneNumber />
                      </a>
                      <button
                        onClick={copyPhone}
                        className="p-1 bg-stone-800 text-stone-400 hover:text-white rounded text-xs"
                        title="نسخ الرقم"
                      >
                        {copiedPhone ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-400 block mb-0.5">ساعات العمل:</span>
                    <p className="text-sm font-bold text-emerald-400">
                      {RESTAURANT_INFO.openingStatus} (24 ساعة يومياً)
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons Strip */}
              <div className="pt-4 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Directions Button */}
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>الاتجاهات</span>
                </a>

                {/* Call Button */}
                <a
                  href={OFFICIAL_TEL_HREF}
                  dir="ltr"
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>اتصال</span>
                </a>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs border border-stone-700 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shared ? 'تم النسخ!' : 'مشاركة الموقع'}</span>
                </button>

                {/* Reservation CTA */}
                <button
                  onClick={onOpenReservation}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>حجز طاولة</span>
                </button>
              </div>
            </div>
          </div>

          {/* Left Column: Map Integration Container */}
          <div className="lg:col-span-6">
            <div className="bg-[#1b1614] border border-stone-800 rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold text-white">معاينة موقع المطعم على الخريطة</span>
                </div>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>فتح في خرائط Google</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Preview Embed Frame */}
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-stone-800 bg-stone-900">
                <iframe
                  title="موقع بيتزا الخولي على خريطة كفر الشيخ"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05)' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${mapsSearchQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                />
              </div>

              {/* Map Location Helper Badge */}
              <div className="mt-4 p-3 bg-stone-900/80 rounded-xl border border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>الموقع موثق بالبلس كود: 4W7V+2F كفر الشيخ</span>
                </span>
                <span className="text-amber-400 font-semibold">مواقف سيارات مجانية متوفرة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
