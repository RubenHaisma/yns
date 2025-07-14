"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Check, Star, Plane, Hotel, Ticket, Crown, Shield, Clock } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';
import { PackageSection } from '@/components/PackageSection';

export default function Packages() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
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
      originalPrice: t('packages.basic.originalPrice'),
      category: t('packages.basic.category'),
      icon: Ticket,
      color: "border-green-200 bg-green-50",
      features: basicFeatures,
      popular: false,
      savings: t('packages.basic.savings')
    },
    {
      id: 'comfort',
      name: t('packages.comfort.name'),
      subtitle: t('packages.comfort.subtitle'),
      price: t('packages.comfort.price'),
      originalPrice: t('packages.comfort.originalPrice'),
      category: t('packages.comfort.category'),
      icon: Plane,
      color: "border-orange-200 bg-orange-50",
      features: comfortFeatures,
      popular: true,
      savings: t('packages.comfort.savings')
    },
    {
      id: 'premium',
      name: t('packages.premium.name'),
      subtitle: t('packages.premium.subtitle'),
      price: t('packages.premium.price'),
      originalPrice: t('packages.premium.originalPrice'),
      category: t('packages.premium.category'),
      icon: Crown,
      color: "border-green-200 bg-green-50",
      features: premiumFeatures,
      popular: false,
      savings: t('packages.premium.savings')
    }
  ];

  const addOns = [
    {
      name: "Extra Nacht",
      price: "€89",
      description: "Verleng je verblijf met een extra nacht"
    },
    {
      name: "Upgrade naar Business Class",
      price: "€199",
      description: "Vlieg in stijl naar je bestemming"
    },
    {
      name: "Fotoshoot Package",
      price: "€149",
      description: "Professionele foto's van je stadium ervaring"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 lg:py-24 bg-green-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-8">
              {t('packages.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              {t('packages.subtitle')}
            </p>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PackageSection onBookingClick={() => setIsBookingModalOpen(true)} />

            {/* Add-ons Section */}
            {/* <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 lg:p-12 mb-20">
              <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
                {t('packages.extrasTitle')}
              </h3>
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {addOns.map((addon, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{addon.name}</h4>
                      <span className="text-orange-600 font-semibold">{addon.price}</span>
                    </div>
                    <p className="text-gray-600 text-base leading-relaxed">{addon.description}</p>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Comparison Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-green-800 p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-semibold text-white text-center">
                  {t('packages.comparisonTitle')}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-6 font-semibold text-gray-900">{t('packages.feature')}</th>
                      <th className="text-center p-6 font-semibold text-green-600">{t('packages.basic.name')}</th>
                      <th className="text-center p-6 font-semibold text-orange-600">{t('packages.comfort.name')}</th>
                      <th className="text-center p-6 font-semibold text-purple-600">{t('packages.premium.name')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-6 text-gray-700">{t('packages.matchTicket')}</td>
                      <td className="p-6 text-center">{t('packages.basic.category')}</td>
                      <td className="p-6 text-center">{t('packages.comfort.category')}</td>
                      <td className="p-6 text-center">VIP</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-6 text-gray-700">{t('packages.transport')}</td>
                      <td className="p-6 text-center">-</td>
                      <td className="p-6 text-center">✓</td>
                      <td className="p-6 text-center">✓ {t('packages.premium.name')}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-6 text-gray-700">{t('packages.accommodation')}</td>
                      <td className="p-6 text-center">-</td>
                      <td className="p-6 text-center">-</td>
                      <td className="p-6 text-center">✓ {t('packages.nights')}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-6 text-gray-700">{t('packages.meals')}</td>
                      <td className="p-6 text-center">-</td>
                      <td className="p-6 text-center">-</td>
                      <td className="p-6 text-center">✓ {t('packages.breakfastDinner')}</td>
                    </tr>
                    <tr>
                      <td className="p-6 text-gray-700">{t('packages.support')}</td>
                      <td className="p-6 text-center">✓</td>
                      <td className="p-6 text-center">✓</td>
                      <td className="p-6 text-center">✓ {t('packages.premium.name')}</td>
                    </tr> 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section
        <section className="py-20 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('packages.moneyBackGuarantee')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('packages.moneyBackDesc')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('packages.freeRebooking')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('packages.freeRebookingDesc')}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mb-6">
                  <Star className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('packages.rating')}</h3>
                <p className="text-gray-600 leading-relaxed">{t('packages.ratingDesc')}</p>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer onBookingClick={() => setIsBookingModalOpen(true)} />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        selectedPackage={selectedPackage}
      />
    </div>
  );
}