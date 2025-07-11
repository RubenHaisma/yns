"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Shield, Clock, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface HeroProps {
  onBookingClick: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const t = useTranslations('hero');

  const words = ['Amsterdam', 'Barcelona', 'München', 'Madrid', 'Milano', 'London'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentWord((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }, 500);
    }, 3000);

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
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Football Icon */}
        <div className="mb-8">
          <div className="inline-block relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full transform animate-pulse shadow-2xl flex items-center justify-center">
              <div className="text-white text-2xl sm:text-3xl">⚽</div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {t('title')}
          </h1>
          <div className="text-lg sm:text-2xl lg:text-3xl font-medium text-orange-400 mb-4">
            <span className="inline-block">{t('subtitle')}</span>
            {' '}
            <span className={`inline-block border-r-2 border-orange-400 transition-all duration-500 ${isTyping ? 'opacity-100' : 'opacity-50'}`}>
              {words[currentWord]}
            </span>
          </div>
          <p className="text-lg sm:text-xl text-green-100 font-light max-w-2xl mx-auto">
            {t('mystery')}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
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
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white opacity-70" />
      </div>
    </section>
  );
}