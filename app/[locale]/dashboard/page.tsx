"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, MapPin, Users, CreditCard, Clock, Eye, Gift, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

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
        <section className="relative py-32 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20 mb-12"
              >
                <MapPin className="w-8 h-8 text-orange-400" />
                <span className="text-white font-bold text-lg">{t('dashboard.heroBadge')}</span>
                <Users className="w-8 h-8 text-green-400" />
              </motion.div>

              <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {t('dashboard.title')}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                {t('dashboard.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <section className="relative py-20 bg-green-50 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-green-200/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${40 + Math.random() * 60}px`,
                  height: `${40 + Math.random() * 60}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.08, 0.18, 0.08],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 7 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
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

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={searchBooking}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>{t('dashboard.searching')}</span>
                  </>
                ) : (
                  <span>{t('dashboard.search')}</span>
                )}
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Booking Details */}
        {booking && (
          <section className="relative py-32 bg-gradient-to-b from-white to-green-50 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-orange-200/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${40 + Math.random() * 60}px`,
                    height: `${40 + Math.random() * 60}px`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    opacity: [0.08, 0.18, 0.08],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Booking Header */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8 mb-8"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-green-800 mb-2">
                      {t('dashboard.bookingDetails', { bookingId: booking.bookingId })}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <motion.span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                      >
                        {getStatusText(booking.status)}
                      </motion.span>
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
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg text-center shadow-lg"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5 text-white/80" />
                      {t('dashboard.countdownTitle')}
                    </h3>
                    <div className="text-4xl font-bold tracking-tight">{daysUntilTrip}</div>
                    <div>{t('dashboard.daysToGo')}</div>
                  </motion.div>
                )}
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Trip Details */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                    <Gift className="w-6 h-6 text-orange-400" />
                    {t('dashboard.tripDetails')}
                  </h3>
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
                </motion.div>

                {/* Mystery Status */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                    <Eye className="w-6 h-6 text-orange-400" />
                    {t('dashboard.mysteryStatus')}
                  </h3>
                  {booking.destination ? (
                    <div className="text-center">
                      <motion.div
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Eye className="w-10 h-10 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-green-800 mb-2">{t('dashboard.destinationRevealed')}</h4>
                      <div className="text-2xl font-bold text-orange-600 mb-4">{booking.destination}</div>
                      <p className="text-green-600">
                        {t('dashboard.revealedOn')} {new Date(booking.revealedAt).toLocaleDateString('nl-NL')}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-white text-3xl">?</span>
                      </motion.div>
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
                </motion.div>
              </div>

              {/* Contact & Support */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8 mt-8"
              >
                <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
                  <Phone className="w-6 h-6 text-orange-400" />
                  {t('dashboard.needHelp')}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg shadow group"
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone className="w-8 h-8 text-green-600 group-hover:text-orange-500 transition-colors" />
                    <div>
                      <div className="font-semibold text-green-800">{t('dashboard.emergencyLine')}</div>
                      <div className="text-green-600">+31 20 987 6543</div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg shadow group"
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className="w-8 h-8 text-green-600 group-hover:text-orange-500 transition-colors" />
                    <div>
                      <div className="font-semibold text-green-800">{t('dashboard.emailSupport')}</div>
                      <div className="text-green-600">support@yournextstadium.com</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <Footer onBookingClick={() => setIsBookingModalOpen(true)} />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}