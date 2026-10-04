import React from 'react';
import { X, Share, PlusSquare, Smartphone, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface IOSInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSInstallGuideModal: React.FC<IOSInstallGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-[#1c1715] border border-stone-800 rounded-3xl p-6 shadow-2xl text-right">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-stone-400 hover:text-white rounded-lg bg-stone-900 border border-stone-800"
          aria-label="إغلاق الإرشادات"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-stone-900 border border-amber-500/40 p-1 flex items-center justify-center">
            <img src="/apple-touch-icon.png" alt="أيقونة التطبيق" className="w-full h-full rounded-lg" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">تثبيت التطبيق على iOS</h3>
            <p className="text-xs text-amber-500 font-semibold">{RESTAURANT_INFO.name}</p>
          </div>
        </div>

        <p className="text-xs text-stone-300 leading-relaxed mb-4">
          يمكنك تثبيت تطبيق المطعم على جهاز iPhone أو iPad بسهولة عبر متصفح Safari:
        </p>

        {/* Steps */}
        <div className="space-y-3 bg-stone-900/80 rounded-2xl p-4 border border-stone-800 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <p className="text-stone-200">
                اضغط على زر <strong>المشاركة</strong> (Share{' '}
                <Share className="inline w-3.5 h-3.5 text-blue-400" />) في شريط أدوات Safari بالأسفل.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <p className="text-stone-200">
                مرر القائمة لأسفل ثم اختر <strong>إضافة إلى الشاشة الرئيسية</strong> (Add to Home Screen{' '}
                <PlusSquare className="inline w-3.5 h-3.5 text-emerald-400" />).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <p className="text-stone-200">
                اضغط على <strong>إضافة</strong> (Add) في أعلى الزاوية. سيظهر رمز بيتزا الخولي فوراً على شاشتك!
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-colors"
        >
          فهمت ذلك
        </button>
      </div>
    </div>
  );
};
