"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, MapPin, Users, CreditCard, Clock, Eye, Gift, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';

export default function Dashboard() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const t = useTranslations();
  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchBooking = async () => {
    if (!bookingId && !email) {
      setError(t('dashboard.fillBookingOrEmail'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (bookingId) params.append('bookingId', bookingId);
      if (email) params.append('email', email);

      const response = await fetch(`/api/bookings?${params}`);
      const data = await response.json();

      if (response.ok) {
        setBooking(data.booking);
      } else {
        setError(data.error || t('dashboard.notFound'));
        setBooking(null);
      }
    } catch (error) {
      setError(t('common.error'));
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return t('dashboard.confirmed');
      case 'pending': return t('dashboard.pending');
      case 'cancelled': return t('dashboard.cancelled');
      default: return status;
    }
  };

  const daysUntilTrip = booking ? Math.ceil((new Date(booking.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('dashboard.title')}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              {t('dashboard.subtitle')}
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
                {t('dashboard.searchBooking')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('dashboard.bookingNumber')}
                  </label>
                  <input
                    type="text"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    placeholder="YNS-1234567890-ABC"
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('dashboard.emailAddress')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="je@email.com"
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
                  {error}
                </div>
              )}

              <button
                onClick={searchBooking}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t('dashboard.searching')}</span>
                  </>
                ) : (
                  <span>{t('dashboard.search')}</span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Booking Details */}
        {booking && (
          <section className="py-20 bg-gradient-to-b from-white to-green-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Booking Header */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-green-800 mb-2">
                      {t('dashboard.bookingDetails', { bookingId: booking.bookingId })}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      <span className="text-green-600">
                        {t('dashboard.bookedOn')} {new Date(booking.createdAt).toLocaleDateString('nl-NL')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <div className="text-2xl font-bold text-green-800">{booking.totalPrice}</div>
                    <div className="text-green-600">{t('dashboard.totalPrice')}</div>
                  </div>
                </div>

                {/* Countdown */}
                {daysUntilTrip > 0 && (
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg text-center">
                    <h3 className="text-xl font-bold mb-2">{t('dashboard.countdownTitle')}</h3>
                    <div className="text-4xl font-bold">{daysUntilTrip}</div>
                    <div>{t('dashboard.daysToGo')}</div>
                  </div>
                )}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Trip Details */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">{t('dashboard.tripDetails')}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-green-800">{t('dashboard.departureDate')}</div>
                        <div className="text-green-600">{new Date(booking.date).toLocaleDateString('nl-NL')}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-green-800">{t('dashboard.travelers')}</div>
                        <div className="text-green-600">{booking.travelers} {booking.travelers === 1 ? t('dashboard.person') : t('dashboard.people')}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Gift className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-green-800">{t('dashboard.package')}</div>
                        <div className="text-green-600 capitalize">{booking.package}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-semibold text-green-800">{t('dashboard.paymentStatus')}</div>
                        <div className="text-green-600">
                          {booking.paymentStatus === 'paid' ? t('dashboard.paid') : t('dashboard.pending')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mystery Status */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">{t('dashboard.mysteryStatus')}</h3>
                  
                  {booking.destination ? (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Eye className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-green-800 mb-2">{t('dashboard.destinationRevealed')}</h4>
                      <div className="text-2xl font-bold text-orange-600 mb-4">{booking.destination}</div>
                      <p className="text-green-600">
                        {t('dashboard.revealedOn')} {new Date(booking.revealedAt).toLocaleDateString('nl-NL')}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-3xl">?</span>
                      </div>
                      <h4 className="text-xl font-bold text-green-800 mb-2">{t('dashboard.mysteryOngoing')}</h4>
                      <p className="text-green-600 mb-4">
                        {t('dashboard.revealTiming')}
                      </p>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-purple-700 text-sm">
                          💡 <strong>Hint:</strong> {t('dashboard.hint')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact & Support */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
                <h3 className="text-2xl font-bold text-green-800 mb-6">{t('dashboard.needHelp')}</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <Phone className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-semibold text-green-800">{t('dashboard.emergencyLine')}</div>
                      <div className="text-green-600">+31 20 987 6543</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <Mail className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-semibold text-green-800">{t('dashboard.emailSupport')}</div>
                      <div className="text-green-600">support@yournextstadium.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}