"use client";

import { Instagram, Facebook, Twitter, Mail, Shield, MapPin, Trophy, Users, Calendar, Phone, Globe, Heart } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import React from 'react';
import { SiTiktok } from 'react-icons/si';
import { motion } from 'framer-motion';

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
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold text-lg">{t('brandShort')}</span>
              </motion.div>
              <div>
                <span className="font-black text-xl">{t('brandFull')}</span>
                <div className="text-gray-400 text-sm font-medium">{t('brandTagline')}</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              {t('description')}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Trophy, label: t('statStadiums'), color: 'text-orange-400' },
                { icon: MapPin, label: t('statCountries'), color: 'text-green-400' },
                { icon: Users, label: t('statFans'), color: 'text-blue-400' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-xs text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <motion.a
                href="https://www.tiktok.com/@yournextstadium?_t=ZG-8y1oCSTjW2y&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <SiTiktok className="w-5 h-5 group-hover:text-orange-400 transition-colors" />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5 group-hover:text-pink-400 transition-colors" />
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-black text-xl mb-8 text-white">{t('quickLinks')}</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{t(link.key)}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-black text-xl mb-8 text-white">{t('destinations')}</h3>
            <ul className="space-y-4">
              {destinations.slice(0, 6).map((destination, index) => (
                <motion.li
                  key={destination}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm">{destination}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-black text-xl mb-8 text-white">{t('contact')}</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-300 text-sm mb-1">{t('email')}</div>
                  <a
                    href="mailto:info@yournextstadium.com"
                    className="text-white hover:text-orange-400 transition-colors font-medium"
                  >
                    info@yournextstadium.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-gray-300 text-sm mb-1">{t('emergencyLine')}</div>
                  <a
                    href="tel:+31201234567"
                    className="text-white hover:text-green-400 transition-colors font-medium"
                  >
                    +31 20 123 4567
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 to-green-500/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-white font-semibold text-sm">{t('certified')}</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {t('certifiedDesc')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700/50 mt-16 pt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-400" />
              <span>{t('copyright')}</span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-8 text-gray-400 text-sm">
              <a
                href={`/${locale}/privacy`}
                className="hover:text-white transition-colors"
              >
                {t('privacy')}
              </a>
              <a
                href={`/${locale}/terms`}
                className="hover:text-white transition-colors"
              >
                {t('terms')}
              </a>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>{t('madeIn')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SEO Footer - Hidden but crawlable */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 text-xs text-gray-500 opacity-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {seoColumns.map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-3 text-gray-400">{col.title}</h4>
                <ul className="space-y-1">
                  {col.keywords.slice(0, 8).map((kw) => (
                    <li key={kw}>
                      <button
                        type="button"
                        onClick={onBookingClick}
                        className="hover:text-gray-300 focus:outline-none bg-transparent text-left p-0 m-0 text-inherit transition-colors"
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