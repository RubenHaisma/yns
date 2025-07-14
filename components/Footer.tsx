"use client";

import { Instagram, Facebook, Twitter, Mail, Shield, MapPin, Trophy, Users, Calendar } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import React from 'react';
import { SiTiktok } from 'react-icons/si';

interface FooterProps {
  onBookingClick?: () => void;
}

export function Footer({ onBookingClick = () => {} }: FooterProps) {
  const t = useTranslations('footer');
  const locale = useLocale();

  const quickLinks = [
    { key: 'howItWorks', href: `/${locale}/how-it-works` },
    { key: 'packages', href: `/${locale}/packages` },
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

  // SEO Soccer Columns (all links trigger booking popup)
  const seoColumns = [
    {
      title: 'Top Football Clubs',
      keywords: [
        'Liverpool FC Tickets',
        'Arsenal Tickets',
        'Manchester United Tickets',
        'Chelsea Tickets',
        'AC Milan Tickets',
        'AFC Ajax Tickets',
        'AS Roma Tickets',
        'Atletico Madrid Tickets',
        'Bayer Leverkusen Tickets',
        'Bayern Munich Tickets',
        'Borussia Dortmund Tickets',
        'FC Barcelona Tickets',
        'Inter Milan Tickets',
        'Juventus Tickets',
        'Manchester City Tickets',
        'Paris Saint-Germain (PSG) Tickets',
        'Real Madrid Tickets',
        'Sevilla FC Tickets',
        'Tottenham Hotspur Tickets',
        'West Ham Tickets',
      ],
    },
    {
      title: 'Top Football Matches',
      keywords: [
        'Emirates Cup Tickets',
        'FA Community Shield 2025 Tickets',
        'UEFA Super Cup Tickets',
        'Manchester United vs Arsenal Tickets',
        'Liverpool vs Crystal Palace Tickets',
        'Champions League Final 2026 Tickets',
        'Championship Play Off Final Tickets',
        'Paris Saint Germain (PSG) vs Arsenal Tickets',
        'FC Barcelona vs Real Madrid Tickets',
        'Real Madrid vs Arsenal Tickets',
        'Atletico Madrid vs Real Madrid Tickets',
        'Manchester United vs Liverpool Tickets',
        'Chelsea vs Liverpool Tickets',
        'Bayern Munich vs Borussia Dortmund Tickets',
        'Arsenal vs Tottenham Hotspur Tickets',
        'AC Milan vs Inter Milan Tickets',
      ],
    },
    {
      title: 'Top Competitions',  
      keywords: [
        'English Premier League Tickets',
        'Champions League Tickets',
        'FA Community Shield 2025 Tickets',
        'La Liga Tickets',
        'Italian Serie A Tickets',
        'Europa League Tickets',
        'FA Cup Tickets',
        'Carabao Cup - EFL Cup Tickets',
        'French Ligue 1 Tickets',
        'Bundesliga Tickets',
        'Dutch Eredivisie Tickets',
      ],
    },
    {
      title: 'Top Cities',
      keywords: [
        'London Tickets',
        'Berlin Tickets',
        'Manchester Tickets',
        'Liverpool Tickets',
        'Glasgow Tickets',
        'Barcelona Tickets',
        'Madrid Tickets',
        'Amsterdam Tickets',
        'Munich Tickets',
        'Hamburg Tickets',
        'Cologne Tickets',
        'Milan Tickets',
        'Paris Tickets',
        'Lyon Tickets',
        'Budapest Tickets',
        'Rome Tickets',
        'Lisbon Tickets',
        'Copenhagen Tickets',
        'Zurich Tickets',
        'Helsinki Tickets',
      ],
    },
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
                <div className="text-xs text-green-200">5+ Landen</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <Users className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                <div className="text-xs text-green-200">500+ Fans</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="https://www.tiktok.com/@yournextstadium?_t=ZG-8y1oCSTjW2y&_r=1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <SiTiktok className="w-5 h-5" />
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
                <a href="mailto:info@yournextstadium.com" className="hover:underline">
                  info@yournextstadium.com
                </a>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <div className="text-sm font-medium mb-1">{t('emergencyLine')}</div>
              <a href="mailto:info@yournextstadium.com" className="text-orange-300 font-bold hover:underline">
                info@yournextstadium.com
              </a>
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
              <span>{t('certified')}</span>
            </div>
          </div>
        </div>

        {/* SEO Footer - Hidden but crawlable */}
        <div className="mt-8 pt-8 border-t border-green-700 text-xs text-green-300 opacity-60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seoColumns.map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-2">{col.title}</h4>
                <ul className="space-y-1">
                  {col.keywords.map((kw) => (
                    <li key={kw}>
                      <button
                        type="button"
                        onClick={onBookingClick}
                        className="hover:underline hover:text-green-100 focus:outline-none bg-transparent text-left p-0 m-0 text-inherit"
                        tabIndex={0}
                        aria-label={kw}
                      >
                        • {kw}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}