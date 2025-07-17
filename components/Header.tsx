"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  // Detect if mobile (tailwind md: 768px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setScrolled(false); // Always white on mobile
    }
  }, [isMobile]);

  const navItems = [
    { 
      key: 'howItWorks', 
      href: `/${locale}/how-it-works`,
      hasDropdown: false
    },
    { 
      key: 'packages', 
      href: `/${locale}/packages`,
      hasDropdown: false,
    },
    { 
      key: 'contact', 
      href: `/${locale}/contact`,
      hasDropdown: false
    },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700
        ${isMobile
          ? 'bg-white border-b border-green-100/50 shadow-lg'
          : scrolled 
            ? 'bg-white/90 backdrop-blur-2xl shadow-xl border-b border-green-100/50' 
            : 'bg-transparent'}
      `}
      style={{ willChange: 'transform' }}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isMobile ? 'max-w-full' : 'max-w-7xl'}`}>
        <div className={`flex justify-between items-center ${isMobile ? 'h-16 py-0' : 'h-20'}`}>
          {/* Website title always visible */}
          <a 
            href={`/${locale}`} 
            className={`flex items-center group ${isMobile ? 'space-x-2' : 'space-x-4'}`}
            tabIndex={0}
          >
            <span className={`font-bold ${isMobile ? 'text-base text-green-800' : 'text-lg'} transition-colors duration-500 ${
              !isMobile && scrolled ? 'text-green-800' : !isMobile ? 'text-white' : ''
            }`}>
              YourNextStadium
            </span>
            {!isMobile && (
              <span className={`text-xs font-medium transition-colors duration-500 ${
                scrolled ? 'text-green-600' : 'text-green-200'
              }`}>
                Mystery Football Adventures
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.a
                    href={item.href}
                    className={`relative flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      scrolled 
                        ? 'text-green-700 hover:text-green-900 hover:bg-green-50/80' 
                        : 'text-white hover:text-green-200 hover:bg-white/10'
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <span>{t(item.key)}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.key ? 'rotate-180' : ''
                      }`} />
                    )}
                    <motion.div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                        scrolled ? 'bg-green-600' : 'bg-orange-400'
                      }`}
                      initial={{ width: 0 }}
                      whileHover={{ width: '70%' }}
                    />
                  </motion.a>
                </motion.div>
              ))}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>  
            {/* Booking button always visible */}
            <motion.button
              onClick={onBookingClick}
              className={`relative overflow-hidden px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-500 group
                ${isMobile
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                  : scrolled 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-white/15 backdrop-blur-xl text-white border border-white/20 hover:bg-white/25'}
              `}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{t('bookNow')}</span>
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="group-hover:translate-x-1 transition-transform"
                >
                  →
                </motion.div>
              </span>
            </motion.button>

            {/* Hamburger menu only on mobile */}
            {isMobile && (
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-3 rounded-2xl transition-all duration-300 text-green-700 hover:bg-green-50/80`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                aria-label="Open menu"
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
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Language switcher only on desktop */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <LanguageSwitcher />
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div 
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-green-100/50 shadow-2xl z-[101]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="px-2 py-6 space-y-2 flex flex-col">
                {/* Logo in mobile menu */}
                <a href={`/${locale}`} className="flex items-center space-x-2 mb-2">
                  <span className="font-bold text-base text-green-800">YourNextStadium</span>
                </a>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    className="block px-4 py-3 text-green-700 hover:text-green-900 hover:bg-green-50/80 rounded-xl font-semibold text-base transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    {t(item.key)}
                  </motion.a>
                ))}
                <motion.div 
                  className="pt-4 border-t border-green-100/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <LanguageSwitcher isMobile={true} onLanguageChange={() => setIsMenuOpen(false)} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}