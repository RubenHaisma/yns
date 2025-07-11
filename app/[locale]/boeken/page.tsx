"use client";

import { useState, useEffect } from 'react';
import { Calendar, Users, CreditCard, Clock, MapPin, Star, Shield, Gift, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';

export default function BookingPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [countdownTime, setCountdownTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const t = useTranslations();

  // Calculate next Friday countdown
  useEffect(() => {
    const calculateNextFriday = () => {
      const now = new Date();
      const nextFriday = new Date();
      
      // Find next Friday
      const daysUntilFriday = (5 - now.getDay() + 7) % 7;
      if (daysUntilFriday === 0 && now.getHours() >= 18) {
        // If it's Friday after 6 PM, go to next Friday
        nextFriday.setDate(now.getDate() + 7);
      } else {
        nextFriday.setDate(now.getDate() + (daysUntilFriday || 7));
      }
      
      nextFriday.setHours(18, 0, 0, 0); // 6 PM on Friday
      
      return nextFriday;
    };

    const updateCountdown = () => {
      const nextFriday = calculateNextFriday();
      const now = new Date().getTime();
      const distance = nextFriday.getTime() - now;

      if (distance > 0) {
        setCountdownTime({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const packages = [
    {
      id: 'basic',
      name: t('packages.basic.name'),
      subtitle: t('packages.basic.subtitle'),
      price: t('packages.basic.price'),
      originalPrice: t('packages.basic.originalPrice'),
      category: t('packages.basic.category'),
      icon: Gift,
      gradient: "from-green-500 to-green-600",
      features: t('packages.basic.features'),
      popular: false,
      savings: t('packages.basic.savings')
    },
    {
      id: 'comfort',
      name: t('packages.comfort.name'),
      subtitle: t('packages.comfort.subtitle'),
      price: t('packages.comfort.price'),
      originalPrice: t('packages.comfort.originalPrice'),
      category: t('packages.comfort.category'),
      icon: MapPin,
      gradient: "from-orange-500 to-orange-600",
      features: t('packages.comfort.features'),
      popular: true,
      savings: t('packages.comfort.savings')
    },
    {
      id: 'premium',
      name: t('packages.premium.name'),
      subtitle: t('packages.premium.subtitle'),
      price: t('packages.premium.price'),
      originalPrice: t('packages.premium.originalPrice'),
      category: t('packages.premium.category'),
      icon: Star,
      gradient: "from-purple-500 to-purple-600",
      features: t('packages.premium.features'),
      popular: false,
      savings: t('packages.premium.savings')
    }
  ];

  const upcomingDates = [
    { date: "15 Feb 2024", spots: 12, price: "€299" },
    { date: "22 Feb 2024", spots: 8, price: "€329" },
    { date: "1 Mar 2024", spots: 15, price: "€299" },
    { date: "8 Mar 2024", spots: 6, price: "€349" },
    { date: "15 Mar 2024", spots: 20, price: "€279" },
    { date: "22 Mar 2024", spots: 3, price: "€399" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main className="pt-16">
        {/* Hero Section with Countdown */}
        <section className="py-20 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/50 to-green-900/90"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>{t('booking.newDestinations')}</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                {t('booking.title')}
              </h1>
              
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
                {t('booking.subtitle')}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 flex items-center justify-center">
                <Clock className="w-6 h-6 mr-2" />
                {t('booking.nextReveal')}
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-orange-500 rounded-lg p-4">
                  <div className="text-3xl md:text-4xl font-bold">{countdownTime.days}</div>
                  <div className="text-sm opacity-90">{t('booking.days')}</div>
                </div>
                <div className="bg-orange-500 rounded-lg p-4">
                  <div className="text-3xl md:text-4xl font-bold">{countdownTime.hours}</div>
                  <div className="text-sm opacity-90">{t('booking.hours')}</div>
                </div>
                <div className="bg-orange-500 rounded-lg p-4">
                  <div className="text-3xl md:text-4xl font-bold">{countdownTime.minutes}</div>
                  <div className="text-sm opacity-90">{t('booking.minutes')}</div>
                </div>
                <div className="bg-orange-500 rounded-lg p-4">
                  <div className="text-3xl md:text-4xl font-bold">{countdownTime.seconds}</div>
                  <div className="text-sm opacity-90">{t('booking.seconds')}</div>
                </div>
              </div>
              <p className="text-green-200 mt-4">
                {t('booking.revealSchedule')}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">500+</div>
                <div className="text-green-200">{t('stats.travelers')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">50+</div>
                <div className="text-green-200">{t('stats.stadiums')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">15+</div>
                <div className="text-green-200">{t('stats.countries')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Package Selection */}
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
                {t('booking.chooseAdventure')}
              </h2>
              <p className="text-xl text-green-600 max-w-3xl mx-auto">
                {t('booking.chooseSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    pkg.popular 
                      ? 'border-orange-400 shadow-orange-200' 
                      : 'border-green-100 hover:border-green-200'
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      <Star className="w-4 h-4 inline mr-1" />
                      POPULAIR
                    </div>
                  )}

                  {/* Savings Badge */}
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {pkg.savings}
                  </div>

                  {/* Package Header */}
                  <div className={`bg-gradient-to-r ${pkg.gradient} rounded-t-2xl p-6 text-white text-center`}>
                    <pkg.icon className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-opacity-90">{pkg.subtitle}</p>
                  </div>

                  {/* Package Content */}
                  <div className="p-6">
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-green-800 mb-1">{pkg.price}</div>
                      <div className="text-sm text-gray-500 line-through mb-2">{pkg.originalPrice}</div>
                      <div className="inline-flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          pkg.category === 'VIP' 
                            ? 'bg-purple-100 text-purple-800'
                            : pkg.category === 'A'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          Categorie {pkg.category}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {Array.isArray(pkg.features) && pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-green-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        setSelectedPackage(pkg.id);
                        setIsBookingModalOpen(true);
                      }}
                      className={`w-full py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg'
                          : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg'
                      }`}
                    >
                      {t('nav.bookNow')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Dates */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                {t('booking.availableDates')}
              </h2>
              <p className="text-green-600">
                {t('booking.availableSubtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {upcomingDates.map((date, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-6 border border-green-200 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-lg font-bold text-green-800">{date.date}</div>
                      <div className="text-green-600">{t('booking.from')} {date.price}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                      date.spots <= 5 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {date.spots} {t('booking.spots')}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    {t('booking.selectDate')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">{t('trust.moneyBack')}</h3>
                <p className="text-green-600">{t('trust.moneyBackDesc')}</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">{t('trust.support')}</h3>
                <p className="text-green-600">{t('trust.supportDesc')}</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">{t('trust.certified')}</h3>
                <p className="text-green-600">{t('trust.certifiedDesc')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        selectedPackage={selectedPackage}
      />
    </div>
  );
}