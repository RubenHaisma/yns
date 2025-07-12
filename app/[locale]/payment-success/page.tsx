"use client";

import { useEffect, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PaymentSuccess() {
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    // Extract payment intent from URL if needed
    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntent = urlParams.get('payment_intent');
    
    if (paymentIntent) {
      // You could fetch booking details using the payment intent ID
      // For now, we'll show a generic success message
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => {}} />
      
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Payment Successful! 🎉
            </h1>
            
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Your mystery football trip has been booked successfully!
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">What happens next?</h3>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold">Confirmation Email</p>
                    <p className="text-green-200 text-sm">You'll receive a booking confirmation within minutes</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold">Mystery Updates</p>
                    <p className="text-green-200 text-sm">Receive hints and updates about your destination</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold">Destination Reveal</p>
                    <p className="text-green-200 text-sm">Your mystery destination revealed 1-2 weeks before travel</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/nl/dashboard"
                className="bg-white text-green-800 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <a
                href="/"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}