import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  Clock,
  Phone,
  User,
  FileText,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationData } from '../types';
import { PhoneNumber, OFFICIAL_TEL_HREF } from './PhoneNumber';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ReservationData>({
    fullName: '',
    phone: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'يرجى إدخال اسمك الكريم';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف للتواصل';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح';
    }
    if (formData.guests < 1 || formData.guests > 30) {
      newErrors.guests = 'عدد الأفراد يجب أن يكون بين 1 و 30';
    }
    if (!formData.date) {
      newErrors.date = 'يرجى اختيار تاريخ الحجز';
    }
    if (!formData.time) {
      newErrors.time = 'يرجى اختيار الوقت';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  const reservationWhatsAppMessage = encodeURIComponent(
    `السلام عليكم، أود حجز طاولة في مطعم بيتزا الخولي:\n` +
      `- الاسم: ${formData.fullName}\n` +
      `- رقم الهاتف: ${formData.phone}\n` +
      `- عدد الأفراد: ${formData.guests}\n` +
      `- التاريخ: ${formData.date}\n` +
      `- الوقت: ${formData.time}\n` +
      (formData.notes ? `- ملاحظات: ${formData.notes}\n` : '')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#1a1614] border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-white border border-stone-800 transition-colors"
          aria-label="إغلاق نافذة الحجز"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>حجز طاولة مسبقاً</span>
              </div>
              <h3 className="text-2xl font-black text-white">حجز طاولة في بيتزا الخولي</h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                ينصح بإجراء الحجوزات لتناول الغداء والعشاء لتفادي أوقات الانتظار.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  الاسم بالكامل *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: أحمد محمد"
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  رقم الهاتف للتأكيد *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="tel"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01xxxxxxxxx"
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white text-right placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Guests, Date, Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Guests */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    عدد الأفراد *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({ ...formData, guests: parseInt(e.target.value, 10) || 1 })
                      }
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl pr-10 pl-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 text-center"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    التاريخ *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    الوقت *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  ملاحظات إضافية (كراسي أطفال، جلسات عائلية خاصة...)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute right-3.5 top-3 text-stone-500" />
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="أي رغبات خاصة لطلبك..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Notice */}
              <div className="p-3 bg-stone-900/60 rounded-xl border border-stone-800/80 text-[11px] text-stone-400">
                * ملاحظة: يتم تجهيز طلب الحجز وتأكيده هاتفياً من قبل طاقم المطعم فور إرساله.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-red-950/40 transition-all active:scale-98"
              >
                تأكيد وتجهيز طلب الحجز
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success Dialogue */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">تم تجهيز طلب الحجز بنجاح!</h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-sm mx-auto">
              شكراً لك يا <strong>{formData.fullName}</strong>. تم تسجيل حجزك لـ{' '}
              <span className="text-amber-400 font-bold">{formData.guests} أفراد</span> بتاريخ{' '}
              <span className="text-amber-400 font-bold">{formData.date}</span> الساعة{' '}
              <span className="text-amber-400 font-bold">{formData.time}</span>.
            </p>

            <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800 text-right text-xs text-stone-400 space-y-1.5">
              <div>
                <strong className="text-white">الاسم:</strong> {formData.fullName}
              </div>
              <div>
                <strong className="text-white">الهاتف:</strong> {formData.phone}
              </div>
              <div>
                <strong className="text-white">الفرع:</strong> الخليفة المأمون، كفر الشيخ
              </div>
              {formData.notes && (
                <div>
                  <strong className="text-white">ملاحظات:</strong> {formData.notes}
                </div>
              )}
            </div>

            {/* Confirmation CTAs */}
            <div className="space-y-2 pt-2">
              <a
                href={OFFICIAL_TEL_HREF}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="flex items-center gap-1">
                  <span>الاتصال بالمطعم للتأكيد المباشر</span>
                  <span>(</span>
                  <PhoneNumber />
                  <span>)</span>
                </span>
              </a>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
