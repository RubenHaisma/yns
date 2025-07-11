"use client";

import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const quickLinks = [
    { key: 'howItWorks', href: `/${locale}/hoe-het-werkt` },
    { key: 'packages', href: `/${locale}/pakketten` },
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'faq', href: `/${locale}/veelgestelde-vragen` },
    { key: 'dashboard', href: `/${locale}/dashboard` },
  ];

  const destinations = [
    'Premier League',
    'La Liga', 
    'Bundesliga',
    'Serie A',
    'Ligue 1'
  ];

  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">YNS</span>
              </div>
              <span className="font-bold text-lg">YourNextStadium</span>
            </div>
            <p className="text-green-200 mb-6 text-sm leading-relaxed">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-green-200">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="hover:text-white transition-colors text-sm">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('destinations')}</h3>
            <ul className="space-y-2 text-green-200">
              {destinations.map((destination) => (
                <li key={destination}>
                  <a href="#" className="hover:text-white transition-colors text-sm">
                    {destination}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('contact')}</h3>
            <div className="space-y-3 text-green-200 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+31 30 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@yournextstadium.nl</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Utrecht, Nederland</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <div className="text-sm font-medium mb-1">{t('emergencyLine')}</div>
              <div className="text-orange-300 font-bold">+31 30 987 6543</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-green-200 text-sm text-center md:text-left">
            {t('copyright')}
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-green-200 text-sm">
            <a href={`/${locale}/privacy`} className="hover:text-white transition-colors">
              {t('privacy')}
            </a>
            <a href={`/${locale}/algemene-voorwaarden`} className="hover:text-white transition-colors">
              {t('terms')}
            </a>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>{t('sgr')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}