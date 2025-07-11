"use client";

import { useState } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'nl' ? 'en' : 'nl';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'book', href: `/${locale}/boeken` },
    { key: 'howItWorks', href: `/${locale}/hoe-het-werkt` },
    { key: 'packages', href: `/${locale}/pakketten` },
    { key: 'stories', href: `/${locale}/verhalen` },
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'dashboard', href: `/${locale}/dashboard` },
  ];

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
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-green-800 hover:text-orange-500 transition-colors font-medium"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Emergency Contact */}
            <div className="hidden lg:flex items-center space-x-2 text-green-800">
              <Phone className="w-4 h-4" />
              <span className="font-medium">{t('emergency')}</span>
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1 rounded-full border border-green-200 hover:bg-green-50 transition-colors"
            >
              <Globe className="w-4 h-4 text-green-800" />
              <span className="text-green-800 font-medium">{locale.toUpperCase()}</span>
            </button>

            {/* CTA Button */}
            <button
              onClick={onBookingClick}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-bold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {t('bookNow')}
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
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-green-800 hover:text-orange-500 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="pt-3 border-t border-green-100">
                <div className="flex items-center space-x-2 text-green-800">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">{t('emergency')}</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}