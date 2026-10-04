import React, { useState } from 'react';
import { Download, X, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface InstallBannerProps {
  onOpenIOSGuide: () => void;
}

export const InstallAppBanner: React.FC<InstallBannerProps> = ({ onOpenIOSGuide }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  // If already installed or user dismissed banner for this session, hide
  if (isInstalled || isDismissed) {
    return null;
  }

  // If browser doesn't support install prompt and isn't iOS, hide banner
  if (!isInstallable && !isIOS) {
    return null;
  }

  const handleInstall = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      onOpenIOSGuide();
    }
  };

  return (
    <section className="py-6 bg-gradient-to-r from-stone-900 via-[#231b18] to-stone-900 border-y border-amber-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-l from-amber-950/40 via-stone-900/90 to-red-950/40 border border-amber-500/30 p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-3 left-3 p-1.5 text-stone-500 hover:text-white rounded-lg transition-colors"
            title="إخفاء الإشعار"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon & App Description */}
          <div className="flex items-center gap-4 text-right">
            <div className="w-14 h-14 rounded-2xl bg-stone-950 p-1 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-lg">
              <img
                src="/pwa-192x192.png"
                alt="تطبيق بيتزا الخولي"
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/40">
                  تطبيق الويب الرسمي
                </span>
                <span className="text-stone-400 text-xs">سريع وبدون استهلاك للذاكرة</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                ثبّت تطبيق {RESTAURANT_INFO.name} على شاشة هاتفك
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                تصفح القائمة بدون اتصال، اطلب بنقرة واحدة، واستمتع بتجربة أسرع كأي تطبيق أصيل.
              </p>
            </div>
          </div>

          {/* Install CTA Button */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={handleInstall}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-amber-950/50 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isIOS ? 'طريقة التثبيت على iPhone' : 'تثبيت التطبيق الآن'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
