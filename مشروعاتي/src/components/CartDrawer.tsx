import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Phone,
  MessageCircle,
  FileText,
  Sparkles,
  Info,
  Check,
  ChevronLeft,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { PhoneNumber, OFFICIAL_TEL_HREF, OFFICIAL_PHONE_NUMBER } from './PhoneNumber';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalCount,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isCopiedOrder, setIsCopiedOrder] = useState(false);

  if (!isCartOpen) return null;

  // Format order summary for WhatsApp / Phone
  const formattedOrderText =
    `طلب جديد من موقع بيتزا الخولي:\n` +
    (customerName ? `- اسم العميل: ${customerName}\n` : '') +
    (customerPhone ? `- رقم الهاتف: ${customerPhone}\n` : '') +
    (customerAddress ? `- العنوان: ${customerAddress}\n` : '') +
    `\nالأصناف المطلوبة:\n` +
    cartItems
      .map(
        (ci, idx) =>
          `${idx + 1}. ${ci.item.name} × ${ci.quantity} (${
            ci.item.price ? ci.item.price * ci.quantity + ' ج.م' : 'السعر عند الطلب'
          })`
      )
      .join('\n') +
    `\n\nإجمالي تقديري: ${subtotal} جنيه مصري` +
    (orderNotes ? `\nملاحظات: ${orderNotes}` : '') +
    `\n(ملاحظة: السعر الفعلي يؤكد هاتفياً حسب الحجم والمكونات)`;

  const handleCopyOrder = () => {
    navigator.clipboard?.writeText(formattedOrderText);
    setIsCopiedOrder(true);
    setTimeout(() => setIsCopiedOrder(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#161211] border-r border-stone-800 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">سلة الطلبات</h3>
                <span className="text-xs text-stone-400">
                  {totalCount} {totalCount === 1 ? 'صنف' : 'أصناف'} في السلة
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-white rounded-xl bg-stone-900 border border-stone-800 transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length > 0 ? (
              <>
                <div className="space-y-3">
                  {cartItems.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="bg-[#1c1715] rounded-xl p-3 border border-stone-800 flex gap-3 items-center justify-between"
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0 bg-stone-900"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {cartItem.item.name}
                        </h4>
                        <div className="text-xs text-amber-400 font-semibold mt-0.5">
                          {cartItem.item.price
                            ? `${cartItem.item.price * cartItem.quantity} ج.م`
                            : 'السعر عند الطلب'}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-stone-900 rounded-lg p-1 border border-stone-800">
                        <button
                          onClick={() => updateQuantity(cartItem.item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800"
                          aria-label="إنقاص الكمية"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-800"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(cartItem.item.id)}
                        className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                        aria-label="حذف الصنف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Quick Delivery Info Form (Frontend Order Prep) */}
                <div className="mt-6 pt-4 border-t border-stone-800/80 space-y-3">
                  <span className="text-xs font-bold text-stone-300 block">
                    بيانات التوصيل لتجهيز الطلب:
                  </span>
                  <input
                    type="text"
                    placeholder="الاسم"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 text-right"
                  />
                  <input
                    type="text"
                    placeholder="العنوان في كفر الشيخ بالتفصيل"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                  <textarea
                    rows={2}
                    placeholder="ملاحظات على الطلب (حشوات إضافية، توابل...)"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Transparency Notice */}
                <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-800 text-[11px] text-stone-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    تجربة الطلب هذه واجهة مجهزة لتسهيل تجهيز طلبك وحسابه. لتأكيد وتوصيل الطلب فوراً اتصل مباشرة برقم المطعم الموحد.
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-stone-500 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-stone-700" />
                <h4 className="text-white font-bold text-base">سلتك فارغة</h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  تصفح قائمة الطعام واختر ما يناسبك من البيتزا والفطائر والوجبات الشهية.
                </p>
                <a
                  href="#menu"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block mt-2 px-4 py-2 rounded-lg bg-stone-800 text-amber-400 text-xs font-bold hover:bg-stone-700"
                >
                  الذهاب للقائمة
                </a>
              </div>
            )}
          </div>

          {/* Drawer Footer: Total & Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950/60 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-400">الإجمالي التقديري:</span>
                <span className="text-xl font-black text-amber-400">
                  {subtotal > 0 ? `${subtotal} جنيه مصري` : 'حسب الاختيارات'}
                </span>
              </div>

              {/* Direct Call to Order Button */}
              <a
                href={OFFICIAL_TEL_HREF}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/40 transition-transform active:scale-98"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="flex items-center gap-1">
                  <span>اتصل واطلب فوراً</span>
                  <span>(</span>
                  <PhoneNumber />
                  <span>)</span>
                </span>
              </a>

              {/* Copy Order Text Button */}
              <button
                onClick={handleCopyOrder}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 transition-colors"
              >
                {isCopiedOrder ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم نسخ تفاصيل الطلب!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-3.5 h-3.5" />
                    <span>نسخ ملخص الطلب للمشاركة</span>
                  </>
                )}
              </button>

              {/* Clear Cart */}
              <div className="text-center pt-1">
                <button
                  onClick={clearCart}
                  className="text-stone-500 hover:text-red-400 text-xs transition-colors"
                >
                  إفراغ السلة
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
