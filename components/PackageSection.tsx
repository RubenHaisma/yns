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
    <section id="packages" className="py-32 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500/10 to-green-500/10 rounded-full px-8 py-4 border border-orange-200/50 mb-12"
          >
            <Star className="w-6 h-6 text-orange-500" />
            <span className="text-orange-600 font-bold">Choose Your Adventure</span>
            <Zap className="w-6 h-6 text-green-500" />
          </motion.div>

          <h2 className="text-5xl lg:text-7xl font-black text-gray-800 mb-8">
            {t('packages.title')}
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex flex-col bg-white rounded-3xl border-2 transition-all duration-500 h-full min-h-[700px] shadow-xl hover:shadow-2xl ${
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
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full font-bold text-sm shadow-lg z-20 ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                      : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                  }`}
                >
                  {pkg.badge}
                </motion.div>
              )}

              {/* Package Header */}
              <div className={`bg-gradient-to-br ${pkg.bgColor} rounded-t-3xl p-8 text-center border-b-2 ${pkg.borderColor}`}> 
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 5 }}
                >
                  <pkg.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4">{pkg.name}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{pkg.subtitle}</p>
              </div>

              {/* Package Content */}
              <div className="flex flex-col flex-1 p-8">
                {/* Price */}
                <div className="text-center mb-8">
                  <div className="text-4xl lg:text-5xl font-black text-gray-800 mb-2">{pkg.price}</div>
                  <div className="text-gray-500 font-medium">per person</div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-1">
                  {Array.isArray(pkg.features) && pkg.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className={`w-6 h-6 bg-gradient-to-br ${pkg.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-lg leading-relaxed font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto pt-4">
                  <motion.button
                    onClick={onBookingClick}
                    className={`w-full rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 border-2 border-transparent group-hover:scale-105 group-hover:-translate-y-1 py-4 px-6 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 border-orange-400'
                        : `bg-gradient-to-r ${pkg.color} text-white hover:shadow-2xl`
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center space-x-3">
                      <span>{t('packages.choosePackage')}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: 'Money Back Guarantee', desc: '100% satisfaction or full refund' },
              { icon: Zap, title: 'Instant Confirmation', desc: 'Book now, travel worry-free' },
              { icon: Star, title: '4.9/5 Rating', desc: 'Loved by 500+ travelers' }
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