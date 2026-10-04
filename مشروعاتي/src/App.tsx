import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfoBar } from './components/InfoBar';
import { InstallAppBanner } from './components/InstallAppBanner';
import { FeaturedDishes } from './components/FeaturedDishes';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { ServicesSection } from './components/ServicesSection';
import { LocationContactSection } from './components/LocationContactSection';
import { ReservationModal } from './components/ReservationModal';
import { CartDrawer } from './components/CartDrawer';
import { IOSInstallGuideModal } from './components/IOSInstallGuideModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isIOSGuideOpen, setIsIOSGuideOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#141110] text-[#f7f4ef] selection:bg-[#e63920] selection:text-white">
        {/* Offline Connectivity Notification */}
        <OfflineIndicator />

        {/* Sticky Header with Navigation, Brand, Cart & Call */}
        <Header
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenIOSGuide={() => setIsIOSGuideOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero />

          {/* Quick Information Bar */}
          <InfoBar />

          {/* PWA Install Promo Strip */}
          <InstallAppBanner onOpenIOSGuide={() => setIsIOSGuideOpen(true)} />

          {/* Featured Dishes (فطيره الخولي ك, Pizza Tony, Beef) */}
          <FeaturedDishes />

          {/* Menu Section with Search, Categories & Add to Cart */}
          <MenuSection />

          {/* About the Restaurant */}
          <AboutSection />

          {/* Reviews & Customer Rating Analytics */}
          <ReviewsSection />

          {/* Photo & Video Gallery with Fullscreen Lightbox */}
          <GallerySection />

          {/* Services & Facilities (13 Dedicated Categorized Cards) */}
          <ServicesSection />

          {/* Location & Contact Section */}
          <LocationContactSection
            onOpenReservation={() => setIsReservationOpen(true)}
          />
        </main>

        {/* Footer */}
        <Footer onOpenIOSGuide={() => setIsIOSGuideOpen(true)} />

        {/* Mobile One-Handed Bottom Navigation */}
        <BottomNav />

        {/* Slide-over Cart Drawer */}
        <CartDrawer />

        {/* Table Reservation Dialog Modal */}
        <ReservationModal
          isOpen={isReservationOpen}
          onClose={() => setIsReservationOpen(false)}
        />

        {/* iOS PWA Safari Install Guide Modal */}
        <IOSInstallGuideModal
          isOpen={isIOSGuideOpen}
          onClose={() => setIsIOSGuideOpen(false)}
        />
      </div>
    </CartProvider>
  );
}
