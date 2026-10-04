import React, { useState, useEffect } from 'react';
import {
  Menu as MenuIcon,
  X,
  Phone,
  ShoppingBag,
  Download,
  Clock,
  Sparkles,
  ChevronLeft,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PhoneNumber, OFFICIAL_TEL_HREF, OFFICIAL_PHONE_NUMBER } from './PhoneNumber';

interface HeaderProps {
  onOpenReservation: () => void;
  onOpenIOSGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation, onOpenIOSGuide }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'الرئيسية' },
    { href: '#menu', label: 'القائمة' },
    { href: '#featured', label: 'الأطباق' },
    { href: '#reviews', label: 'المراجعات' },
    { href: '#gallery', label: 'الصور' },
    { href: '#services', label: 'الخدمات' },
    { href: '#about', label: 'عن المطعم' },
    { href: '#location', label: 'الموقع' },
    { href: '#contact', label: 'تواصل معنا' },
  ];

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      onOpenIOSGuide();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#141110]/95 backdrop-blur-md border-b border-[#2d2522] py-2.5 shadow-xl'
            : 'bg-gradient-to-b from-[#141110]/90 via-[#141110]/60 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Name */}
            <a href="#home" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#b91c1c] p-0.5 shadow-lg shadow-orange-950/40 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-[#181413] rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img
                    src="/pwa-192x192.png"
                    alt="شعار بيتزا الخولي"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="font-black text-amber-400 text-sm tracking-tighter">الخولي</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-white tracking-wide group-hover:text-amber-400 transition-colors">
                  {RESTAURANT_INFO.name}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-amber-500/90 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{RESTAURANT_INFO.openingStatus}</span>
                  <span className="text-stone-500">•</span>
                  <span>{RESTAURANT_INFO.city}</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-semibold text-stone-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop & Mobile Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* PWA Install Button */}
              {!isInstalled && (isInstallable || isIOS) && (
                <button
                  onClick={handleInstallClick}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-950/40 border border-amber-600/40 rounded-lg hover:bg-amber-900/50 hover:border-amber-500 transition-all shadow-sm"
                  title="تثبيت تطبيق بيتزا الخولي"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تثبيت التطبيق</span>
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-stone-900/80 border border-stone-800 text-stone-200 hover:text-white hover:border-amber-600/50 hover:bg-stone-800 transition-all"
                aria-label="عرض سلة الطلبات"
              >
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale-in">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Order Now CTA (Calls phone or opens menu) */}
              <a
                href="#menu"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-sm font-bold shadow-lg shadow-red-950/40 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>اطلب الآن</span>
              </a>

              {/* Quick Call Button */}
              <a
                href={OFFICIAL_TEL_HREF}
                dir="ltr"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-950/60 border border-emerald-600/50 text-emerald-400 hover:bg-emerald-900/70 hover:text-emerald-300 transition-all"
                title={`اتصل بنا: ${OFFICIAL_PHONE_NUMBER}`}
                aria-label="اتصل بالمطعم"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
                aria-label="فتح القائمة الرئيسية"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#161211] border-l border-stone-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              {/* Header in Drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 p-0.5">
                    <div className="w-full h-full bg-stone-900 rounded-md flex items-center justify-center font-black text-amber-400 text-xs">
                      الخولي
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{RESTAURANT_INFO.name}</h3>
                    <p className="text-xs text-amber-500">{RESTAURANT_INFO.openingStatus}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-stone-400 hover:text-white rounded-lg bg-stone-900"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="py-6 space-y-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800/80 font-medium transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronLeft className="w-4 h-4 text-stone-500" />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="pt-6 border-t border-stone-800 space-y-3">
              {!isInstalled && (isInstallable || isIOS) && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleInstallClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>تثبيت التطبيق على هاتفك</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm transition-colors"
              >
                طلب حجز طاولة
              </button>

              <a
                href={OFFICIAL_TEL_HREF}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-sm shadow-lg shadow-red-950/40"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="flex items-center gap-1">
                  <span>اتصل الآن</span>
                  <span>(</span>
                  <PhoneNumber />
                  <span>)</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
