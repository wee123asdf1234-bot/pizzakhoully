import React from 'react';
import {
  Star,
  MessageSquare,
  Coins,
  Clock,
  Pizza,
  MapPin,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const InfoBar: React.FC = () => {
  const items = [
    {
      icon: Star,
      iconColor: 'text-amber-400 fill-amber-400',
      title: '★ 3.8',
      subtitle: 'التقييم العام للمطعم',
    },
    {
      icon: MessageSquare,
      iconColor: 'text-blue-400',
      title: '968 مراجعة',
      subtitle: 'آراء وتقييمات العملاء',
    },
    {
      icon: Coins,
      iconColor: 'text-emerald-400',
      title: '١–٢٠٠ جنيه',
      subtitle: 'متوسط الفرد الواحد',
    },
    {
      icon: Clock,
      iconColor: 'text-amber-500',
      title: 'مفتوح على مدار الساعة',
      subtitle: 'خدمة 24/7 طوال الأسبوع',
    },
    {
      icon: Pizza,
      iconColor: 'text-orange-400',
      title: 'بيتزا وفطائر',
      subtitle: 'شرقي وإيطالي طازج',
    },
    {
      icon: MapPin,
      iconColor: 'text-red-400',
      title: 'كفر الشيخ',
      subtitle: 'الخليفة المأمون',
    },
  ];

  return (
    <section className="relative z-20 -mt-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1b1614] border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-stone-800/80">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3.5 ${
                    index > 1 ? 'pt-3 lg:pt-0' : ''
                  } ${index !== 0 ? 'lg:pr-4' : ''}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 shadow-inner">
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="text-right min-w-0">
                    <div className="text-sm sm:text-base font-black text-white truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] sm:text-xs text-stone-400 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
