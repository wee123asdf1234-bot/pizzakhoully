import React, { useState } from 'react';
import {
  Accessibility,
  ConciergeBell,
  Sparkles,
  Award,
  Utensils,
  Coffee,
  Wifi,
  Sun,
  Users,
  CalendarCheck,
  CreditCard,
  Baby,
  Car,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/restaurantData';

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  // Mapping string to Lucide icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Accessibility':
        return Accessibility;
      case 'ConciergeBell':
        return ConciergeBell;
      case 'Sparkles':
        return Sparkles;
      case 'Award':
        return Award;
      case 'Utensils':
        return Utensils;
      case 'Coffee':
        return Coffee;
      case 'Wifi':
        return Wifi;
      case 'Sun':
        return Sun;
      case 'Users':
        return Users;
      case 'CalendarCheck':
        return CalendarCheck;
      case 'CreditCard':
        return CreditCard;
      case 'Baby':
        return Baby;
      case 'Car':
        return Car;
      default:
        return Sparkles;
    }
  };

  const filteredCategories =
    activeTab === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((c) => c.id === activeTab);

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#141110] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <ConciergeBell className="w-3.5 h-3.5" />
            <span>المرافق والخدمات والتسهيلات</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            خدمات ومميزات بيتزا الخولي
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            كل ما يلزم لتجربة طعام مريحة ومتكاملة، من إمكانية الوصول ووسائل الدفع إلى الجلسات العائلية والمواقف المجانية.
          </p>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
            }`}
          >
            جميع المميزات ({SERVICES_DATA.length})
          </button>
          {SERVICES_DATA.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === cat.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Services Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = getIcon(category.iconName);
            return (
              <div
                key={category.id}
                className="bg-[#1b1614] border border-stone-800 rounded-2xl p-6 hover:border-amber-600/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-stone-800/80">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {category.title}
                      </h3>
                      <span className="text-[11px] text-stone-500">
                        {category.items.length} سمات موثقة
                      </span>
                    </div>
                  </div>

                  {/* Feature items */}
                  <ul className="space-y-2.5">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span>خدمة موثقة بالفرع</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
