"use client";

import { useState } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';

interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('NL');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-800 to-green-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">YNS</span>
            </div>
            <span className="font-bold text-xl text-green-800">YourNextStadium</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
              Home
            </a>
            <a href="/nl/hoe-het-werkt" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
              Hoe Het Werkt
            </a>
            <a href="/nl/pakketten" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
              Pakketten
            </a>
            <a href="/nl/verhalen" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
              Verhalen
            </a>
            <a href="/nl/contact" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
              Contact
            </a>
            <a href="/nl/dashboard" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
              Dashboard
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Emergency Contact */}
            <div className="hidden lg:flex items-center space-x-2 text-green-800">
              <Phone className="w-4 h-4" />
              <span className="font-medium">24/7: +31 20 123 4567</span>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'NL' ? 'EN' : 'NL')}
              className="flex items-center space-x-1 px-3 py-1 rounded-full border border-green-200 hover:bg-green-50 transition-colors"
            >
              <Globe className="w-4 h-4 text-green-800" />
              <span className="text-green-800 font-medium">{language}</span>
            </button>

            {/* CTA Button */}
            <button
              onClick={onBookingClick}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-bold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Boek Nu
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            <nav className="flex flex-col space-y-3">
              <a href="/" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
                Home
              </a>
              <a href="/nl/hoe-het-werkt" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
                Hoe Het Werkt
              </a>
              <a href="/nl/pakketten" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
                Pakketten
              </a>
              <a href="/nl/verhalen" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
                Verhalen
              </a>
              <a href="/nl/contact" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
                Contact
              </a>
              <a href="/nl/dashboard" className="text-green-800 hover:text-orange-500 transition-colors font-medium">
                Dashboard
              </a>
              <div className="pt-3 border-t border-green-100">
                <div className="flex items-center space-x-2 text-green-800">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">24/7: +31 20 123 4567</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}