"use client";

import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { ProcessSection } from '@/components/ProcessSection';
import { PackageSection } from '@/components/PackageSection';
import { MapSection } from '@/components/MapSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import { StatsSection } from '@/components/StatsSection';
import { WaitlistSection } from '@/components/WaitlistSection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookingClick = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={handleBookingClick} />
      
      <main>
        <Hero onBookingClick={handleBookingClick} />
        <WaitlistSection />
        <ProcessSection />
        <PackageSection onBookingClick={handleBookingClick} />
        <MapSection />
        <TestimonialSection />
        <StatsSection />
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}