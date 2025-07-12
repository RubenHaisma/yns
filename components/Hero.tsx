"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Shield, Clock, Star } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface HeroProps {
  onBookingClick: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const t = useTranslations('hero');
  const locale = useLocale();

    const words = [
    'Amsterdam', 'Barcelona', 'München', 'Madrid', 'Milano', 'London',
    'Sevilla', 'Valencia', 'Bilbao', 'San Sebastián', 'Málaga',
    'Paris', 'Lyon', 'Marseille', 'Nice', 'Toulouse', 'Bordeaux',
    'Berlin', 'Dortmund', 'Hamburg', 'Stuttgart', 'Frankfurt', 'Köln',
    'Bruxelles', 'Anvers', 'Gand', 'Liège', 'Charleroi',
    'Torino', 'Genova', 'Bologna', 'Firenze', 'Verona', 'Bergamo'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }, 250);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-green-800">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/50 to-green-900/70"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-0"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              animation: `pulse 3s ease-in-out infinite, fadeInOut 8s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {t('title')}
          </h1>
          <div className="text-lg sm:text-2xl lg: text-3xl font-medium text-orange-400 mb-4">
            <span className="inline-block">{t('subtitle')}</span>
            {' '}
            <span className={`inline-block border-r-2 border-orange-400 transition-all duration-500 ${isTyping ? 'opacity-100' : 'opacity-50'}`}>
              {words[currentWord]}
            </span>
          </div>
          
          {/* Football-specific highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full text-white">
              Premier League
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-white">
              Champions League
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-white">
              La Liga
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-white">
              Bundesliga
            </span>
          </div>
          <p className="text-lg sm:text-xl text-green-100 font-light max-w-2xl mx-auto">
            {t('mystery')}
          </p>
          
          {/* Football-specific description */}
          <p className="text-base sm:text-lg text-green-200 font-light max-w-3xl mx-auto mt-4">
            {locale === 'nl' 
              ? "Ervaar de spanning van Europese topvoetbal. Van Premier League tot Champions League - ontdek je volgende stadium."
              : "Experience the excitement of European top football. From Premier League to Champions League - discover your next stadium."
            }
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 max-w-md mx-auto">
          <button
            onClick={onBookingClick}
            className="w-full sm:w-auto group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-2xl"
          >
            <span className="relative z-10">{t('findStadium')}</span>
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          </button>
        </div>

        {/* Trust Indicators */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-green-100">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-center sm:text-left">{t('guarantee1')}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-green-100">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-center sm:text-left">{t('guarantee2')}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-green-100">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-center sm:text-left">{t('guarantee3')}</span>
          </div>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white opacity-70" />
      </div>
    </section>
  );
}