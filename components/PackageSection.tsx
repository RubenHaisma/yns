"use client";

import { useState } from 'react';
import { Check, Plane, Hotel, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PackageSectionProps {
  onBookingClick: () => void;
}

export function PackageSection({ onBookingClick }: PackageSectionProps) {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);
  const t = useTranslations('packages');

  const packages = [
    {
      id: 'basic',
      name: t('basic.name'),
      subtitle: t('basic.subtitle'),
      price: t('basic.price'),
      icon: Ticket,
      gradient: "from-green-500 to-green-600",
      features: t('basic.features'),
      popular: false
    },
    {
      id: 'comfort',
      name: t('comfort.name'),
      subtitle: t('comfort.subtitle'),
      price: t('comfort.price'),
      icon: Plane,
      gradient: "from-orange-500 to-orange-600",
      features: t('comfort.features'),
      popular: true
    },
    {
      id: 'premium',
      name: t('premium.name'),
      subtitle: t('premium.subtitle'),
      price: t('premium.price'),
      icon: Hotel,
      gradient: "from-purple-500 to-purple-600",
      features: t('premium.features'),
      popular: false
    }
  ];

  return (
    <section id="packages" className="py-16 lg:py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-green-800 mb-6">
            Kies Je Avontuur
          </h2>
          <p className="text-lg lg:text-xl text-green-600 max-w-3xl mx-auto">
            Van een simpel match bezoek tot een compleet luxury weekend
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                pkg.popular 
                  ? 'border-orange-400 shadow-orange-200' 
                  : 'border-green-100 hover:border-green-200'
              } ${hoveredPackage === index ? 'shadow-2xl' : ''}`}
              onMouseEnter={() => setHoveredPackage(index)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                  POPULAIR
                </div>
              )}

              {/* Package Header */}
              <div className={`bg-gradient-to-r ${pkg.gradient} rounded-t-2xl p-6 text-white text-center`}>
                <pkg.icon className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-3" />
                <h3 className="text-xl lg:text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-opacity-90 text-sm lg:text-base">{pkg.subtitle}</p>
              </div>

              {/* Package Content */}
              <div className="p-4 lg:p-6">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-2xl lg:text-3xl font-bold text-green-800 mb-1">{pkg.price}</div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 lg:mb-8">
                  {Array.isArray(pkg.features) && pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-green-700 text-sm lg:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={onBookingClick}
                  className={`w-full py-3 lg:py-4 rounded-full font-bold text-sm lg:text-lg transition-all transform hover:scale-105 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg'
                  }`}
                >
                  Boek Nu
                </button>
              </div>

              {/* Hover Animation */}
              {hoveredPackage === index && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}