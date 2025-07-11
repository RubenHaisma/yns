"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, Gift, MapPin, Sparkles, Clock, Shield, Users } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';

export default function HowItWorks() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const steps = [
    {
      icon: Calendar,
      title: "1. Boek je Avontuur",
      description: "Kies je datum en pakket. Betaal veilig online via iDEAL, creditcard of bankoverschrijving.",
      details: [
        "Selecteer je gewenste vertrekdatum",
        "Kies uit onze drie pakketten",
        "Vul je voorkeuren in",
        "Betaal veilig online"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Gift,
      title: "2. Wacht vol Spanning",
      description: "Ontvang hints en updates via email. De spanning stijgt terwijl je bestemming geheim blijft.",
      details: [
        "Ontvang bevestiging per email",
        "Krijg wekelijkse hints over je bestemming",
        "Volg updates in je persoonlijke dashboard",
        "Bereid je voor met onze reistips"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "3. Ontdek je Bestemming",
      description: "1-2 weken voor vertrek onthullen we je mysterie bestemming via een speciale onthullingsvideo.",
      details: [
        "Ontvang je persoonlijke onthullingsvideo",
        "Krijg alle reisdetails en tickets",
        "Download je digitale reisguide",
        "Bereid je voor op het avontuur"
      ],
      color: "from-orange-500 to-orange-600"
    }
  ];

  const faqs = [
    {
      question: "Wat als ik niet kan op de geboekte datum?",
      answer: "Je kunt tot 14 dagen voor vertrek gratis omboeken naar een andere datum, afhankelijk van beschikbaarheid."
    },
    {
      question: "Kan ik mijn bestemming weigeren?",
      answer: "Ja! Als je echt niet naar de onthulde bestemming wilt, krijg je 100% van je geld terug of kun je omboeken naar een andere datum."
    },
    {
      question: "Hoe weet ik zeker dat ik niet naar een team ga dat ik haat?",
      answer: "In je boekingsformulier kun je teams opgeven die je absoluut niet wilt zien. Wij houden hier rekening mee bij het selecteren van je bestemming."
    },
    {
      question: "Wat als de wedstrijd wordt afgelast?",
      answer: "We hebben altijd een backup plan. Je krijgt tickets voor een andere wedstrijd of een volledige terugbetaling."
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
              Hoe Het Werkt
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Van boeking tot beleving - ontdek hoe jouw mystery stadium avontuur tot leven komt
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                  <div className="flex-1">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.color} rounded-full mb-6`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-xl text-green-600 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-green-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-orange-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <step.icon className="w-10 h-10 text-white" />
                          </div>
                          <p className="text-green-700 font-medium">Stap {index + 1} Illustratie</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-800 mb-6">
                Veelgestelde Vragen
              </h2>
              <p className="text-xl text-green-600">
                Alles wat je wilt weten over onze mystery trips
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-6 border border-green-100">
                  <h3 className="text-lg font-bold text-green-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-green-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-800 to-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Klaar voor je Mystery Avontuur?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Boek nu je volgende stadium en laat je verrassen door Europa's mooiste voetbalstadions
            </p>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-2xl"
            >
              Boek Je Mystery Trip
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}