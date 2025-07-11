"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Check, Star, Plane, Hotel, Ticket, Crown, Shield, Clock } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';

export default function Packages() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'basic',
      name: "Alleen de Match",
      subtitle: "Voor de pure voetballiefhebber",
      price: "€149-299",
      originalPrice: "€199-399",
      category: "C",
      icon: Ticket,
      gradient: "from-green-500 to-green-600",
      features: [
        "Match ticket (Category C)",
        "Mysterie bestemming onthulling",
        "24/7 support tijdens reis",
        "Digitale reisguide met tips",
        "Geld terug garantie",
        "Gratis omboeken tot 14 dagen"
      ],
      popular: false,
      savings: "Bespaar tot €100"
    },
    {
      id: 'comfort',
      name: "Match + Reis",
      subtitle: "De complete ervaring",
      price: "€299-599",
      originalPrice: "€399-799",
      category: "A",
      icon: Plane,
      gradient: "from-orange-500 to-orange-600",
      features: [
        "Match ticket (Category A - betere plaatsen)",
        "Retour transport (trein/bus/vliegtuig)",
        "Mysterie bestemming onthulling",
        "Stadion tour (indien beschikbaar)",
        "24/7 support tijdens reis",
        "Digitale reisguide met insider tips",
        "Lokale restaurant aanbevelingen",
        "Geld terug garantie"
      ],
      popular: true,
      savings: "Bespaar tot €200"
    },
    {
      id: 'premium',
      name: "Alles Inclusief",
      subtitle: "Luxe mystery weekend",
      price: "€599-999",
      originalPrice: "€799-1299",
      category: "VIP",
      icon: Crown,
      gradient: "from-purple-500 to-purple-600",
      features: [
        "VIP match ticket (beste plaatsen)",
        "Retour transport (premium opties)",
        "2 nachten hotel (4-5 sterren)",
        "Ontbijt & welkomstdiner",
        "Exclusieve stadion tour",
        "Lokale gids voor stadstour",
        "Souvenirs pakket",
        "24/7 premium support",
        "Airport transfers",
        "Geld terug garantie"
      ],
      popular: false,
      savings: "Bespaar tot €300"
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
        <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Onze Pakketten
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Van een simpel match bezoek tot een compleet luxury weekend - kies het pakket dat bij jou past
            </p>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    pkg.popular 
                      ? 'border-orange-400 shadow-orange-200' 
                      : 'border-green-100 hover:border-green-200'
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                      <Star className="w-4 h-4 inline mr-1" />
                      POPULAIR
                    </div>
                  )}

                  {/* Savings Badge */}
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {pkg.savings}
                  </div>

                  {/* Package Header */}
                  <div className={`bg-gradient-to-r ${pkg.gradient} rounded-t-2xl p-6 text-white text-center`}>
                    <pkg.icon className="w-12 h-12 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-opacity-90">{pkg.subtitle}</p>
                  </div>

                  {/* Package Content */}
                  <div className="p-6">
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-green-800 mb-1">{pkg.price}</div>
                      <div className="text-sm text-gray-500 line-through mb-2">{pkg.originalPrice}</div>
                      <div className="inline-flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          pkg.category === 'VIP' 
                            ? 'bg-purple-100 text-purple-800'
                            : pkg.category === 'A'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          Categorie {pkg.category}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-green-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        setSelectedPackage(pkg.id);
                        setIsBookingModalOpen(true);
                      }}
                      className={`w-full py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg'
                          : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg'
                      }`}
                    >
                      Kies Dit Pakket
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add-ons Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 mb-16">
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
                Extra's & Upgrades
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {addOns.map((addon, index) => (
                  <div key={index} className="border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-green-800">{addon.name}</h4>
                      <span className="text-orange-600 font-bold">{addon.price}</span>
                    </div>
                    <p className="text-green-600 text-sm">{addon.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-800 to-green-900 p-6">
                <h3 className="text-2xl font-bold text-white text-center">
                  Pakket Vergelijking
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-green-100">
                      <th className="text-left p-4 font-semibold text-green-800">Feature</th>
                      <th className="text-center p-4 font-semibold text-green-600">Alleen Match</th>
                      <th className="text-center p-4 font-semibold text-orange-600">Match + Reis</th>
                      <th className="text-center p-4 font-semibold text-purple-600">Alles Inclusief</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-green-50">
                      <td className="p-4 text-green-700">Match Ticket</td>
                      <td className="p-4 text-center">Category C</td>
                      <td className="p-4 text-center">Category A</td>
                      <td className="p-4 text-center">VIP</td>
                    </tr>
                    <tr className="border-b border-green-50">
                      <td className="p-4 text-green-700">Transport</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">✓</td>
                      <td className="p-4 text-center">✓ Premium</td>
                    </tr>
                    <tr className="border-b border-green-50">
                      <td className="p-4 text-green-700">Accommodatie</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">✓ 2 nachten</td>
                    </tr>
                    <tr className="border-b border-green-50">
                      <td className="p-4 text-green-700">Maaltijden</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">-</td>
                      <td className="p-4 text-center">✓ Ontbijt & Diner</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-green-700">24/7 Support</td>
                      <td className="p-4 text-center">✓</td>
                      <td className="p-4 text-center">✓</td>
                      <td className="p-4 text-center">✓ Premium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Geld Terug Garantie</h3>
                <p className="text-green-600">Niet tevreden? 100% terugbetaling</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Gratis Omboeken</h3>
                <p className="text-green-600">Tot 14 dagen voor vertrek</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-green-800 mb-2">4.9/5 Rating</h3>
                <p className="text-green-600">Van 500+ tevreden klanten</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        selectedPackage={selectedPackage}
      />
    </div>
  );
}