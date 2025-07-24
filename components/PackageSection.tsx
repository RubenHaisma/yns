"use client";

import { useState } from 'react';
import { Check, Plane, Hotel, Ticket, Crown, Star, Zap, Shield, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface PackageSectionProps {
  onBookingClick: () => void;
}

export function PackageSection({ onBookingClick }: PackageSectionProps) {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);
  const t = useTranslations();

  // Get features arrays directly from the translation files
  const basicFeatures = t.raw('packages.basic.features');
  const comfortFeatures = t.raw('packages.comfort.features');
  const premiumFeatures = t.raw('packages.premium.features');

  const packages = [
    {
      id: 'basic',
      name: t('packages.basic.name'),
      subtitle: t('packages.basic.subtitle'),
      price: t('packages.basic.price'),
      icon: Ticket,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      features: basicFeatures,
      popular: false,
      badge: null
    },
    {
      id: 'comfort',
      name: t('packages.comfort.name'),
      subtitle: t('packages.comfort.subtitle'),
      price: t('packages.comfort.price'),
      icon: Plane,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      features: comfortFeatures,
      popular: true,
      badge: "MOST POPULAR"
    },
    {
      id: 'premium',
      name: t('packages.premium.name'),
      subtitle: t('packages.premium.subtitle'),
      price: t('packages.premium.price'),
      icon: Crown,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      features: premiumFeatures,
      popular: false,
      badge: "LUXURY"
    }
  ];

  return (
    <section id="packages" className="py-10 sm:py-16 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-3 sm:mb-4">
            {t('packages.title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('packages.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex flex-col bg-white rounded-3xl border-2 transition-all duration-500 h-full min-h-[400px] shadow-xl hover:shadow-2xl ${
                pkg.popular 
                  ? 'border-orange-300 scale-105 z-10' 
                  : `${pkg.borderColor} hover:border-gray-300`
              } ${hoveredPackage === index ? 'scale-105 z-20' : ''} group`}
              onMouseEnter={() => setHoveredPackage(index)}
              onMouseLeave={() => setHoveredPackage(null)}
              whileHover={{ y: -10 }}
            >
              {/* Popular/Luxury Badge */}
              {pkg.badge && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-3 py-1.5 text-xs sm:px-6 sm:py-2 sm:text-sm rounded-full font-bold shadow-lg z-20 whitespace-nowrap
                    ${pkg.popular 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    }`
                  }
                  style={{ minWidth: 'fit-content' }}
                >
                  {pkg.popular ? t('packages.comfort.popularLabel') : t('packages.premium.badge') || pkg.badge}
                </motion.div>
              )}
              {/* Package Header */}
              <div className={`bg-gradient-to-br ${pkg.bgColor} rounded-t-3xl p-5 sm:p-8 text-center border-b-2 ${pkg.borderColor}`}> 
                <motion.div
                  className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto shadow-xl group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 5 }}
                >
                  <pkg.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-800 mb-1 sm:mb-2">{pkg.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{pkg.subtitle}</p>
              </div>
              {/* Package Content */}
              <div className="flex flex-col flex-1 p-5 sm:p-8">
                {/* Price */}
                <div className="text-center mb-6 sm:mb-8">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-800 mb-1">{pkg.price}</div>
                  <div className="text-gray-500 font-medium text-xs sm:text-sm">{t('packages.perPerson') || 'per person'}</div>
                </div>
                {/* Features */}
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
                  {Array.isArray(pkg.features) && pkg.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 sm:space-x-4"
                    >
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br ${pkg.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                {/* CTA Button */}
                <div className="mt-auto pt-2 sm:pt-4">
                  <motion.button
                    onClick={onBookingClick}
                    className={`w-full rounded-2xl font-bold text-sm sm:text-base shadow-xl transition-all duration-300 border-2 border-transparent group-hover:scale-105 group-hover:-translate-y-1 py-2 px-3 sm:px-4 sm:py-2.5
                      ${pkg.popular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 border-orange-400'
                        : `bg-gradient-to-r ${pkg.color} text-white hover:shadow-2xl`
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center space-x-1.5 sm:space-x-2">
                      <span>{t('packages.choosePackage')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </div>
              </div>
              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={false}
              />
            </motion.div>
          ))}
        </div>
        {/* Extras & Upgrades Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-16 max-w-3xl mx-auto"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
            {t('packages.extrasTitle') || 'Extras & upgrades'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Football Tier */}
            <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
              <div className="flex items-center mb-2">
                <Ticket className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-bold text-gray-800">Voetbal Tier</span>
              </div>
              <ul className="text-gray-700 text-sm space-y-1">
                <li><span className="font-semibold">Tier A</span>: Dortmund, Liverpool, PSG, etc. <span className="text-gray-500">(+€100 p.p.)</span></li>
                <li><span className="font-semibold">Tier B</span>: Eintracht, Schalke 04, Sunderland, AS Roma, etc. <span className="text-gray-500">(+€50 p.p.)</span></li>
                <li><span className="font-semibold">Tier C</span>: Düsseldorf, Southampton, Lens, etc. <span className="text-gray-500">(inbegrepen)</span></li>
              </ul>
            </div>
            {/* Seat Upgrade */}
            <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
              <div className="flex items-center mb-2">
                <Star className="w-5 h-5 text-orange-500 mr-2" />
                <span className="font-bold text-gray-800">Stoel Upgrade</span>
              </div>
              <ul className="text-gray-700 text-sm space-y-1">
                <li><span className="font-semibold">Basis</span>: inbegrepen</li>
                <li><span className="font-semibold">Categorie 1</span>: <span className="text-gray-500">+€50 p.p.</span></li>
                <li><span className="font-semibold">Categorie 2</span>: <span className="text-gray-500">+€100 p.p.</span></li>
              </ul>
            </div>
            {/* Hotel Nights (Premium only) */}
            <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
              <div className="flex items-center mb-2">
                <Hotel className="w-5 h-5 text-purple-500 mr-2" />
                <span className="font-bold text-gray-800">Hotelnachten (Premium)</span>
              </div>
              <ul className="text-gray-700 text-sm space-y-1">
                <li><span className="font-semibold">1 nacht</span>: inbegrepen</li>
                <li><span className="font-semibold">Extra nachten</span>: <span className="text-gray-500">+€150 p.p. per nacht</span></li>
              </ul>
            </div>
            {/* Insurance */}
            <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
              <div className="flex items-center mb-2">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-bold text-gray-800">Verzekering</span>
              </div>
              <ul className="text-gray-700 text-sm space-y-1">
                <li><span className="font-semibold">Standaard</span>: inbegrepen</li>
                <li><span className="font-semibold">Goud</span>: <span className="text-gray-500">+€15 p.p.</span></li>
              </ul>
            </div>
          </div>
        </motion.div>
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-20 text-center"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: t('trust.moneyBack'), desc: t('trust.moneyBackDesc') },
              { icon: Zap, title: t('trust.support'), desc: t('trust.supportDesc') },
              { icon: Star, title: t('packages.rating'), desc: t('packages.ratingDesc') }
            ].map((trust, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                  <trust.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{trust.title}</h4>
                <p className="text-gray-600 text-center leading-relaxed">{trust.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}