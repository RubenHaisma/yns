"use client";

import { useState } from 'react';
import { Check, Star, Plane, Hotel, Ticket, Crown } from 'lucide-react';

interface PackageSectionProps {
  onBookingClick: () => void;
}

export function PackageSection({ onBookingClick }: PackageSectionProps) {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);

  const packages = [
    {
      name: "Alleen de Match",
      subtitle: "Voor de pure voetballiefhebber",
      price: "€149-299",
      category: "C",
      icon: Ticket,
      gradient: "from-green-500 to-green-600",
      features: [
        "Match ticket (Category C)",
        "Mysterie bestemming",
        "24/7 support",
        "Digitale reisguide"
      ],
      popular: false
    },
    {
      name: "Match + Reis",
      subtitle: "De complete ervaring",
      price: "€299-599",
      category: "A",
      icon: Plane,
      gradient: "from-orange-500 to-orange-600",
      features: [
        "Match ticket (Category A)",
        "Retour transport",
        "Mysterie bestemming",
        "Stadion tour mogelijk",
        "24/7 support",
        "Digitale reisguide"
      ],
      popular: true
    },
    {
      name: "Alles Inclusief",
      subtitle: "Luxe mystery weekend",
      price: "€599-999",
      category: "VIP",
      icon: Crown,
      gradient: "from-purple-500 to-purple-600",
      features: [
        "VIP match ticket",
        "Retour transport",
        "2 nachten hotel",
        "Ontbijt & diner",
        "Stadion tour",
        "Lokale gids",
        "Souvenirs pakket",
        "24/7 support"
      ],
      popular: false
    }
  ];

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Kies Je Avontuur
          </h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Van een simpel match bezoek tot een compleet luxury weekend - kies het pakket dat bij jou past
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  <Star className="w-4 h-4 inline mr-1" />
                  POPULAIR
                </div>
              )}

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
                  <div className="text-3xl font-bold text-green-800 mb-2">{pkg.price}</div>
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
                      <span className="text-green-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={onBookingClick}
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
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

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Waarom kiezen voor onze mystery trips?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Altijd Verrassing</h4>
                  <p className="text-green-600 text-sm">Nooit een saaie bestemming</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Beste Deals</h4>
                  <p className="text-green-600 text-sm">Tot 40% goedkoper dan normale boekingen</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">Zorgeloos</h4>
                  <p className="text-green-600 text-sm">Wij regelen alles voor je</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}