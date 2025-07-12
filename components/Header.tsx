"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState(locale);

  const changeLanguage = (newLocale: string) => {
    // Get the current path without the locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Create the new URL with the selected locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Update local state immediately for UI feedback
    setCurrentLocale(newLocale);
    
    // Use Next.js router for client-side navigation
    window.location.href = newPath;
  };

  const navItems = [
    { key: 'howItWorks', href: `/${locale}/how-it-works` },
    { key: 'packages', href: `/${locale}/packages` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.a 
            href={`/${locale}`} 
            className="flex items-center space-x-2 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white font-bold text-sm">YNS</span>
            </motion.div>
            <span className="font-bold text-lg text-green-800 hidden sm:block">YourNextStadium</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <motion.a
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium text-sm relative pb-2 block"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {t(item.key)}
                </motion.a>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full transform origin-left transition-transform duration-300 ease-out scale-x-0 group-hover:scale-x-100"
                />
              </motion.div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* CTA Button */}
            <motion.button
              onClick={onBookingClick}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-sm text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {t('bookNow')}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="lg:hidden py-4 border-t border-gray-100 bg-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="flex flex-col space-y-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    className="text-gray-700 hover:text-green-600 transition-colors font-medium py-2 relative"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {t(item.key)}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-green-600"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.a>
                ))}
                
                {/* Mobile Language Switcher */}
                <motion.div 
                  className="pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <LanguageSwitcher isMobile={true} onLanguageChange={() => setIsMenuOpen(false)} />
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}