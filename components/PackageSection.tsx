"use client";

import { useState } from 'react';
import { Check, Plane, Hotel, Ticket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from './ui/button';

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
      color: "border-green-200 bg-green-50",
      features: basicFeatures,
      popular: false
    },
    {
      id: 'comfort',
      name: t('packages.comfort.name'),
      subtitle: t('packages.comfort.subtitle'),
      price: t('packages.comfort.price'),
      icon: Plane,
      color: "border-orange-200 bg-orange-50",
      features: comfortFeatures,
      popular: true
    },
    {
      id: 'premium',
      name: t('packages.premium.name'),
      subtitle: t('packages.premium.subtitle'),
      price: t('packages.premium.price'),
      icon: Hotel,
      color: "border-green-200 bg-green-50",
      features: premiumFeatures,
      popular: false
    }
  ];

  return (
    <section id="packages" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-green-800 mb-6">
            {t('packages.title')}
          </h2>
          <p className="text-lg lg:text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
            {t('packages.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative flex flex-col bg-white rounded-2xl border transition-all duration-300 h-full min-h-[600px] ${
                pkg.popular 
                  ? 'border-orange-300 shadow-xl scale-[1.03]' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-lg'
              } ${hoveredPackage === index ? 'shadow-2xl scale-105 z-10' : 'shadow-md'} group`}
              onMouseEnter={() => setHoveredPackage(index)}
              onMouseLeave={() => setHoveredPackage(null)}
              style={{ transition: 'box-shadow 0.3s, transform 0.3s' }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full font-semibold text-sm shadow-lg z-20">
                  POPULAIR
                </div>
              )}

              {/* Package Header */}
              <div className={`${pkg.color} rounded-t-2xl p-8 text-center border-b`}> 
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mb-6 mx-auto shadow-sm">
                  <pkg.icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">{pkg.name}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{pkg.subtitle}</p>
              </div>

              {/* Package Content */}
              <div className="flex flex-col flex-1 p-8">
                {/* Price */}
                <div className="text-center mb-8">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{pkg.price}</div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-1">
                  {Array.isArray(pkg.features) && pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-auto pt-2">
                  <Button
                    onClick={onBookingClick}
                    size="lg"
                    className={`w-full rounded-xl font-bold text-lg shadow-lg transition-all duration-200 border-2 border-transparent group-hover:scale-105 group-hover:-translate-y-1 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 border-orange-400'
                        : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 border-green-400'
                    }`}
                  >
                    {t('packages.choosePackage')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}