import React, { useState, useMemo } from 'react';
import {
  Image as ImageIcon,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Play,
  Film,
  Sparkles,
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'food', label: 'الأطعمة' },
    { id: 'pizza', label: 'البيتزا' },
    { id: 'ambiance', label: 'الأجواء' },
    { id: 'menu', label: 'قائمة الطعام' },
    { id: 'video', label: 'الفيديوهات' },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) =>
        prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
      );
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#161211] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>معرض الصور والأجواء</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            صور من بيتزا الخولي
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            لقطات توثق تشكيلة الأطباق، الفطائر، البيتزا، والجلسات العائلية في فرع كفر الشيخ.
          </p>
        </div>

        {/* Gallery Filter Categories */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
                    : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 cursor-pointer shadow-lg hover:shadow-2xl hover:border-amber-500/50 transition-all duration-300 h-64 sm:h-72"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Hover Maximize Icon */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Caption on Card Bottom */}
                <div className="absolute bottom-4 right-4 left-4 text-right">
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-700/40 px-2 py-0.5 rounded inline-block mb-1.5">
                    {item.category === 'pizza'
                      ? 'بيتزا'
                      : item.category === 'food'
                      ? 'أطعمة وفطائر'
                      : item.category === 'ambiance'
                      ? 'أجواء المكان'
                      : 'قائمة'}
                  </span>
                  <h3 className="text-white font-bold text-base leading-snug truncate">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-stone-300 text-xs line-clamp-1 mt-0.5">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-900/40 border border-stone-800 rounded-2xl p-6">
            <Film className="w-12 h-12 text-stone-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">قسم الفيديوهات</h3>
            <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto">
              فيديوهات التغطيات الميدانية وجولات إعداد البيتزا والفطائر سيتم ربطها قريباً مع حسابات المطعم الرسمية.
            </p>
          </div>
        )}

        {/* Fullscreen Lightbox Modal */}
        {activeImageIndex !== null && filteredItems[activeImageIndex] && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 p-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded-full transition-colors"
              aria-label="إغلاق المعاينة"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Next / Previous Controls */}
            <button
              onClick={handlePrev}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-stone-900/80 hover:bg-stone-800 text-white rounded-full border border-stone-700 transition-colors"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-stone-900/80 hover:bg-stone-800 text-white rounded-full border border-stone-700 transition-colors"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl max-h-[70vh] flex items-center justify-center bg-black">
                <img
                  src={filteredItems[activeImageIndex].image}
                  alt={filteredItems[activeImageIndex].title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption and Info */}
              <div className="mt-4 text-center">
                <h4 className="text-white text-lg font-bold">
                  {filteredItems[activeImageIndex].title}
                </h4>
                {filteredItems[activeImageIndex].caption && (
                  <p className="text-stone-300 text-xs sm:text-sm mt-1">
                    {filteredItems[activeImageIndex].caption}
                  </p>
                )}
                <span className="text-stone-500 text-xs mt-2 inline-block font-mono">
                  {activeImageIndex + 1} من {filteredItems.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
