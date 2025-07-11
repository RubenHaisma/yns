"use client";

import { Calendar, Gift, MapPin, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ProcessSection() {
  const t = useTranslations('process');

  const steps = [
    {
      icon: Calendar,
      title: t('step1.title'),
      description: t('step1.description'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Gift,
      title: t('step2.title'),
      description: t('step2.description'),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: t('step3.title'),
      description: t('step3.description'),
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="process" className="py-16 lg:py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-green-800 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg lg:text-xl text-green-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line - Desktop Only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-green-300 to-green-400 transform -translate-y-1/2 z-0"></div>
              )}
              
              {/* Step Card */}
              <div className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100 group-hover:border-green-200">
                {/* Icon */}
                <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>

                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-green-800 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-green-600 text-center leading-relaxed text-sm lg:text-base">
                  {step.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-orange-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-green-300 rounded-full opacity-40"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Visual */}
        <div className="mt-12 lg:mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-green-100">
            <h3 className="text-xl lg:text-2xl font-bold text-green-800 mb-6 text-center">
              Your Journey Timeline
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm lg:text-base">0</span>
                </div>
                <p className="text-xs lg:text-sm text-green-600">Booking</p>
              </div>
              <div className="w-full md:w-24 h-0.5 md:h-auto md:w-0.5 bg-green-200"></div>
              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm lg:text-base">7</span>
                </div>
                <p className="text-xs lg:text-sm text-green-600">Days Later</p>
              </div>
              <div className="w-full md:w-24 h-0.5 md:h-auto md:w-0.5 bg-green-200"></div>
              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <p className="text-xs lg:text-sm text-green-600">Reveal</p>
              </div>
              <div className="w-full md:w-24 h-0.5 md:h-auto md:w-0.5 bg-green-200"></div>
              <div className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm lg:text-base">✈</span>
                </div>
                <p className="text-xs lg:text-sm text-green-600">Departure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}