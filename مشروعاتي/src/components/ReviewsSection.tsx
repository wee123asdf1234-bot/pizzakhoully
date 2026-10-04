import React, { useState, useMemo } from 'react';
import {
  Star,
  ThumbsUp,
  Share2,
  Filter,
  ArrowUpDown,
  Edit3,
  Check,
  Info,
  ChevronDown,
  User,
  ShieldAlert,
} from 'lucide-react';
import { RESTAURANT_INFO, REVIEWS_DATA, RATING_STATS } from '../data/restaurantData';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1' | 'positive' | 'critical'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest'>('newest');
  const [visibleCount, setVisibleCount] = useState(4);
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});

  // Editable summary
  const [editorialSummary, setEditorialSummary] = useState(RESTAURANT_INFO.editorialReviewSummary);
  const [isEditingSummary, setIsEditingSummary] = useState(false);

  // Copy/Share review
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleHelpful = (id: string) => {
    if (helpfulLiked[id]) return;
    setHelpfulLiked((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleShare = async (review: ReviewItem) => {
    const textToShare = `مراجعة ${review.author} عن مطعم بيتزا الخولي (${review.rating}/5 نجوم): "${review.text}"`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'مراجعة بيتزا الخولي',
          text: textToShare,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }
    navigator.clipboard?.writeText(textToShare);
    setCopiedId(review.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviews];

    // Filter
    if (selectedFilter === 'positive') {
      result = result.filter((r) => r.rating >= 4);
    } else if (selectedFilter === 'critical') {
      result = result.filter((r) => r.rating <= 2);
    } else if (selectedFilter !== 'all') {
      const star = parseInt(selectedFilter, 10);
      result = result.filter((r) => r.rating === star);
    }

    // Sort
    if (sortBy === 'highest') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      result.sort((a, b) => a.rating - b.rating);
    } else {
      // Default order: original newest
    }

    return result;
  }, [reviews, selectedFilter, sortBy]);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#141110] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>آراء وتقييمات حقيقية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            مراجعات زوار بيتزا الخولي
          </h2>
          <p className="mt-3 text-stone-400 text-sm sm:text-base">
            عرض شفاف ومتوازن لآراء العملاء في كفر الشيخ، نسلط الضوء على الإيجابيات والملاحظات بكل مصداقية.
          </p>
        </div>

        {/* Analytics Card (Rating Summary & Distribution) */}
        <div className="bg-[#1b1614] border border-stone-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Overall Score */}
            <div className="lg:col-span-4 text-center lg:border-l lg:border-stone-800 lg:pl-8">
              <div className="text-6xl sm:text-7xl font-black text-white tracking-tight">
                {RESTAURANT_INFO.rating}
              </div>
              <div className="flex items-center justify-center gap-1.5 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= 4
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-amber-400/30 text-amber-400/40'
                    }`}
                  />
                ))}
              </div>
              <div className="text-stone-300 font-bold text-sm">
                من أصل 5 نجوم
              </div>
              <div className="text-xs text-stone-500 mt-1">
                استناداً إلى {RESTAURANT_INFO.reviewCount.toLocaleString('ar-EG')} مراجعة موثقة
              </div>
            </div>

            {/* Rating Bars Breakdown */}
            <div className="lg:col-span-8 space-y-2.5">
              {RATING_STATS.breakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <div className="w-14 flex items-center gap-1 text-stone-300 font-bold justify-end">
                    <span>{item.stars}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                  </div>
                  <div className="flex-1 h-3 rounded-full bg-stone-900 overflow-hidden border border-stone-800/80">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-700"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-stone-400 text-left font-mono font-medium">
                    {item.percentage}%
                  </div>
                  <div className="w-14 text-stone-500 text-left text-[11px]">
                    ({item.count})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editable Editorial Review Summary */}
          <div className="mt-8 pt-6 border-t border-stone-800/80 bg-stone-900/40 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Info className="w-4 h-4 text-amber-500" />
                <span>ملخص تحليلي لآراء الزوار (قراءة موضوعية للمراجعات)</span>
              </div>
              <button
                onClick={() => setIsEditingSummary(!isEditingSummary)}
                className="text-stone-400 hover:text-white text-xs flex items-center gap-1 bg-stone-800 px-2 py-1 rounded"
                title="تعديل هذا الملخص"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditingSummary ? 'إلغاء التعديل' : 'تعديل الصياغة'}</span>
              </button>
            </div>

            {isEditingSummary ? (
              <div className="space-y-3">
                <textarea
                  value={editorialSummary}
                  onChange={(e) => setEditorialSummary(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-600/50 rounded-xl p-3 text-sm text-stone-200 focus:outline-none"
                  rows={2}
                />
                <button
                  onClick={() => setIsEditingSummary(false)}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>حفظ التعديل</span>
                </button>
              </div>
            ) : (
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic">
                "{editorialSummary}"
              </p>
            )}
            <p className="text-[11px] text-stone-500 mt-2">
              * هذا الملخص يمثل قراءة تحليلية لآراء العملاء المقدمة، وليس إعلاناً رسمياً أو تصريحاً مطلقاً من إدارة المطعم.
            </p>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Star Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-stone-400 ml-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              تصفية:
            </span>
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === 'all'
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
              }`}
            >
              الكل ({reviews.length})
            </button>
            <button
              onClick={() => setSelectedFilter('positive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === 'positive'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
              }`}
            >
              إيجابية (4-5 ★)
            </button>
            <button
              onClick={() => setSelectedFilter('critical')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === 'critical'
                  ? 'bg-red-700 text-white'
                  : 'bg-stone-900 text-stone-400 hover:bg-stone-800'
              }`}
            >
              ملاحظات وخدمة (1-2 ★)
            </button>
            <button
              onClick={() => setSelectedFilter('5')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                selectedFilter === '5' ? 'bg-amber-600 text-white' : 'bg-stone-900 text-stone-400'
              }`}
            >
              5 ★
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200 focus:outline-none"
            >
              <option value="newest">الأحدث تاريخاً</option>
              <option value="highest">الأعلى تقييماً</option>
              <option value="lowest">الأقل تقييماً</option>
            </select>
          </div>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAndSortedReviews.slice(0, visibleCount).map((review) => {
            const isLiked = !!helpfulLiked[review.id];
            const isCopied = copiedId === review.id;

            return (
              <div
                key={review.id}
                className="bg-[#1b1614] border border-stone-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-stone-700 transition-colors shadow-lg"
              >
                <div>
                  {/* Reviewer Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center font-bold text-amber-400 shrink-0">
                        {review.author[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{review.author}</h4>
                          {review.authorBadge && (
                            <span className="text-[10px] bg-amber-950/60 text-amber-400 border border-amber-800/40 px-1.5 py-0.2 rounded font-semibold">
                              {review.authorBadge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-stone-500">{review.date}</span>
                      </div>
                    </div>

                    {/* Star Rating Badges */}
                    <div className="flex items-center gap-0.5 bg-stone-900 px-2 py-1 rounded-lg border border-stone-800">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= review.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Highlights Tags */}
                  {review.highlights && review.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {review.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-stone-900 text-stone-400 px-2 py-0.5 rounded border border-stone-800"
                        >
                          #{h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Review Body */}
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    {review.text}
                  </p>
                </div>

                {/* Card Actions (Helpful & Share) */}
                <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                      isLiked
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-stone-900 border-stone-800 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-amber-400' : ''}`} />
                    <span>مفيد ({review.helpfulCount})</span>
                  </button>

                  <button
                    onClick={() => handleShare(review)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:text-white transition-colors"
                    title="مشاركة أو نسخ المراجعة"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isCopied ? 'تم النسخ!' : 'مشاركة'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredAndSortedReviews.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-800 font-bold text-xs sm:text-sm transition-colors"
            >
              <span>عرض المزيد من المراجعات</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
