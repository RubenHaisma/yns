"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onBookingClick: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-green-900/40"></div>
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
        {/* Mystery Box Animation */}
        <div className="mb-8 relative">
          <div className="inline-block relative">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg transform rotate-45 animate-pulse shadow-2xl">
              <div className="absolute inset-2 bg-white rounded-md transform -rotate-45 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Animated Headline */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            Waar ga jij naartoe?
          </h1>
          <div className="text-2xl md:text-3xl lg:text-4xl font-medium text-orange-400 mb-4">
            <span className="inline-block">Misschien wel naar:  </span>
            <span className={`inline-block border-r-2 border-orange-400 transition-all duration-500 ${isTyping ? 'opacity-100' : 'opacity-50'}`}>
              {words[currentWord]}
            </span>
          </div>
          <p className="text-xl md:text-2xl text-green-100 font-light">
            Het blijft een verrassing.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={onBookingClick}
            className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-2xl"
          >
            <span className="relative z-10">Find Your Next Stadium</span>
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          </button>
          <button className="text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-800 transition-all transform hover:scale-105">
            Meer Informatie
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-green-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
            <span className="text-sm">500+ Gelukkige Reizigers</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
            <span className="text-sm">Geld Terug Garantie</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">✓</span>
            </div>
            <span className="text-sm">24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
}