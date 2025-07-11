"use client";

import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { ProcessSection } from '@/components/ProcessSection';
import { PackageSection } from '@/components/PackageSection';
import { MapSection } from '@/components/MapSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import { StatsSection } from '@/components/StatsSection';
import { BookingModal } from '@/components/BookingModal';
import { WaitlistSection } from '@/components/WaitlistSection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NotificationToast } from '@/components/NotificationToast';

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show random booking notifications
    const interval = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main>
        <Hero onBookingClick={() => setIsBookingModalOpen(true)} />
        <WaitlistSection />
        <ProcessSection />
        <PackageSection onBookingClick={() => setIsBookingModalOpen(true)} />
        <MapSection />
        <TestimonialSection />
        <StatsSection />
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />

      <NotificationToast 
        show={showNotification} 
        onClose={() => setShowNotification(false)} 
      />
    </div>
  );
}