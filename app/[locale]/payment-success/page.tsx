"use client";

import { useEffect, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function PaymentSuccess() {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);
  const router = useRouter();
  const testTriggered = useRef(false);

  useEffect(() => {
    // Extract payment intent from URL if needed
    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntent = urlParams.get('payment_intent');
    if (paymentIntent) {
      setLoading(true);
      fetch(`/api/bookings?paymentIntentId=${paymentIntent}`)
        .then(res => res.json())
        .then(async data => {
          if (data.booking && data.booking.bookingId) {
            setBookingId(data.booking.bookingId);
            // Try to infer locale from path
            const locale = window.location.pathname.split('/')[1] || 'nl';
            setDashboardUrl(`/${locale}/dashboard?bookingId=${data.booking.bookingId}`);
          } else {
            // If in dev, try to trigger the test webhook endpoint
            if (process.env.NODE_ENV !== 'production' && !testTriggered.current) {
              testTriggered.current = true;
              fetch('/api/test-booking-webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payment_intent: paymentIntent })
              })
                .then(() => {
                  // Refetch booking after test webhook
                  return fetch(`/api/bookings?paymentIntentId=${paymentIntent}`);
                })
                .then(res => res.json())
                .then(data2 => {
                  if (data2.booking && data2.booking.bookingId) {
                    setBookingId(data2.booking.bookingId);
                    const locale = window.location.pathname.split('/')[1] || 'nl';
                    setDashboardUrl(`/${locale}/dashboard?bookingId=${data2.booking.bookingId}`);
                    setError(null);
                  } else {
                    setError('Booking not found.');
                  }
                })
                .catch(() => setError('Could not fetch booking.'))
                .finally(() => setLoading(false));
            } else {
              setError('Booking not found.');
              setLoading(false);
            }
          }
        })
        .catch(() => setError('Could not fetch booking.'))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => {}} />
      <main>
        <section className="relative py-20 pt-20 bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden">
          <div className="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              Payment Successful! 🎉
            </h1>
            <p className="text-base lg:text-lg text-green-100 max-w-2xl mx-auto mb-6">
              Your mystery football trip has been booked successfully!
            </p>
            {loading && <div className="text-white mb-4">Loading your booking...</div>}
            {error && <div className="text-red-200 mb-4">{error}</div>}
            {bookingId && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">Your Booking Number</h3>
                <div className="text-2xl font-mono font-bold text-orange-200 mb-4">{bookingId}</div>
                {dashboardUrl && (
                  <a
                    href={dashboardUrl}
                    className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-base hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg mb-2"
                  >
                    View your dashboard &rarr;
                  </a>
                )}
              </div>
            )}
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">What happens next?</h3>
              <div className="space-y-4 text-left max-w-xl mx-auto">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-base">Confirmation Email</p>
                    <p className="text-green-200 text-xs">You&apos;ll receive a booking confirmation within minutes</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-base">Mystery Updates</p>
                    <p className="text-green-200 text-xs">Receive hints and updates about your destination</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-base">Destination Reveal</p>
                    <p className="text-green-200 text-xs">Your mystery destination revealed 1-2 weeks before travel</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/nl/dashboard"
                className="bg-white text-green-800 px-6 py-3 rounded-2xl font-bold text-base hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-base hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
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