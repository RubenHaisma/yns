"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, Gift, MapPin, Sparkles, Clock, Shield, Users } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const t = useTranslations();

  const steps = [
    {
      icon: Calendar,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      details: t('howItWorks.step1.details'),
      color: "bg-green-50 border-green-200"
    },
    {
      icon: Gift,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      details: t('howItWorks.step2.details'),
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: MapPin,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      details: t('howItWorks.step3.details'),
      color: "bg-green-50 border-green-200"
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
        <section className="py-20 lg:py-24 bg-green-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-8">
              {t('howItWorks.title')}
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              {t('howItWorks.subtitle')}
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20 lg:space-y-24">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}>
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mb-8">
                      <step.icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6">
                      {step.title}
                    </h3>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-4">
                      {Array.isArray(step.details) && step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-4">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <div className={`bg-white rounded-lg border ${step.color} p-8 shadow-lg`}>
                      <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 flex items-center justify-center mx-auto mb-6">
                            <step.icon className="w-10 h-10 text-gray-700" />
                          </div>
                          <p className="text-gray-600 font-medium">Stap {index + 1} Illustratie</p>
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
        <section className="py-20 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
                {t('howItWorks.faqTitle')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('howItWorks.faqSubtitle')}
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24 bg-green-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-8">
              {t('howItWorks.readyTitle')}
            </h2>
            <p className="text-xl text-green-100 mb-10 leading-relaxed">
              {t('howItWorks.readySubtitle')}
            </p>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg"
            >
              {t('howItWorks.bookTrip')}
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