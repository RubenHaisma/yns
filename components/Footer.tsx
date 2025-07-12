"use client";

import { Instagram, Facebook, Twitter, Mail, Shield, MapPin, Trophy, Users, Calendar } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const quickLinks = [
    { key: 'howItWorks', href: `/${locale}/how-it-works` },
    { key: 'packages', href: `/${locale}/packages` },
    { key: 'stories', href: `/${locale}/stories` },
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'faq', href: `/${locale}/faq` },
    { key: 'dashboard', href: `/${locale}/dashboard` },
  ];

  // Authentic Dutch football terms and destinations
  const destinations = locale === 'nl' ? [
    'Premier League - Engeland',
    'La Liga - Spanje', 
    'Bundesliga - Duitsland',
    'Serie A - Italië',
    'Ligue 1 - Frankrijk',
    'Eredivisie - Nederland',
    'Champions League',
    'Europa League',
    'Conference League'
  ] : [
    'Premier League',
    'La Liga', 
    'Bundesliga',
    'Serie A',
    'Ligue 1',
    'Eredivisie',
    'Champions League',
    'Europa League',
    'Conference League'
  ];

  // Dutch football-specific terms for footer
  const footballTerms = locale === 'nl' ? [
    'Mystery Voetbalreizen',
    'Stadium Avonturen',
    'Europese Competities',
    'Top Voetbal',
    'Stadium Tours',
    'Voetbal Vakanties',
    'Match Tickets',
    'Voetbal Ervaringen',
    'Stadium Beleving'
  ] : [
    'Mystery Football Trips',
    'Stadium Adventures',
    'European Competitions',
    'Top Football',
    'Stadium Tours',
    'Football Vacations',
    'Match Tickets',
    'Football Experiences',
    'Stadium Experiences'
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
            
            {/* Football-specific stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <Trophy className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                <div className="text-xs text-green-200">50+ Stadions</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <MapPin className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                <div className="text-xs text-green-200">15+ Landen</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <Users className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                <div className="text-xs text-green-200">1000+ Fans</div>
              </div>
            </div>

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
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@yournextstadium.com</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <div className="text-sm font-medium mb-1">{t('emergencyLine')}</div>
              <div className="text-orange-300 font-bold">info@yournextstadium.com</div>
            </div>

            {/* Football terms for SEO */}
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-green-300 mb-2">Populaire zoektermen:</div>
              <div className="flex flex-wrap gap-1">
                {footballTerms.slice(0, 6).map((term, index) => (
                  <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded text-green-200">
                    {term}
                  </span>
                ))}
              </div>
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
            <a href={`/${locale}/terms`} className="hover:text-white transition-colors">
              {t('terms')}
            </a>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>{t('sgr')}</span>
            </div>
          </div>
        </div>

        {/* SEO Footer - Hidden but crawlable */}
        <div className="mt-8 pt-8 border-t border-green-700 text-xs text-green-300 opacity-60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Mystery Voetbalreizen</h4>
              <ul className="space-y-1">
                <li>• Mystery Football Trips</li>
                <li>• Stadium Adventures</li>
                <li>• European Football</li>
                <li>• Match Tickets</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Voetbal Bestemmingen</h4>
              <ul className="space-y-1">
                <li>• Premier League</li>
                <li>• La Liga</li>
                <li>• Bundesliga</li>
                <li>• Serie A</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Stadium Ervaringen</h4>
              <ul className="space-y-1">
                <li>• Stadium Tours</li>
                <li>• Football Vacations</li>
                <li>• Match Experiences</li>
                <li>• European Competitions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Voetbal Vakanties</h4>
              <ul className="space-y-1">
                <li>• Mystery Travel</li>
                <li>• Football Trips</li>
                <li>• Stadium Visits</li>
                <li>• European Football</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}