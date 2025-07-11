"use client";

import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";


interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  const navItems = [
    { key: 'howItWorks', href: `/${locale}/hoe-het-werkt` },
    { key: 'packages', href: `/${locale}/pakketten` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href={`/${locale}`} className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">YNS</span>
            </div>
            <span className="font-bold text-lg text-green-800 hidden sm:block">YourNextStadium</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-sm"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2 h-9 px-3">
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">{locale === 'nl' ? 'NL' : 'EN'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[120px]">
                <DropdownMenuItem 
                  onClick={() => changeLanguage('nl')}
                  className={`cursor-pointer ${locale === 'nl' ? 'bg-green-50 text-green-700' : ''}`}
                >
                  <span className="mr-2">🇳🇱</span>
                  Nederlands
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => changeLanguage('en')}
                  className={`cursor-pointer ${locale === 'en' ? 'bg-green-50 text-green-700' : ''}`}
                >
                  <span className="mr-2">🇬🇧</span>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <button
              onClick={onBookingClick}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-sm text-sm"
            >
              {t('bookNow')}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
              
              {/* Mobile Language Dropdown */}
              <div className="pt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 w-full justify-start h-10">
                      <Globe className="w-4 h-4" />
                      <span>{locale === 'nl' ? 'Nederlands' : 'English'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[140px]">
                    <DropdownMenuItem 
                      onClick={() => { changeLanguage('nl'); setIsMenuOpen(false); }}
                      className={`cursor-pointer ${locale === 'nl' ? 'bg-green-50 text-green-700' : ''}`}
                    >
                      <span className="mr-2">🇳🇱</span>
                      Nederlands
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => { changeLanguage('en'); setIsMenuOpen(false); }}
                      className={`cursor-pointer ${locale === 'en' ? 'bg-green-50 text-green-700' : ''}`}
                    >
                      <span className="mr-2">🇬🇧</span>
                      English
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}