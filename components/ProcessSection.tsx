"use client";

import { Calendar, Gift, MapPin, Sparkles } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      icon: Calendar,
      title: "Boek je Avontuur",
      description: "Kies je datum en pakket. Betaal veilig online en begin met dromen over je volgende stadium.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Gift,
      title: "Wacht vol Spanning",
      description: "Ontvang hints en updates. De spanning stijgt terwijl je bestemming geheim blijft.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "Ontdek je Bestemming",
      description: "1-2 weken voor vertrek onthullen we je mysterie bestemming. Bereid je voor op een onvergetelijke ervaring!",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="process" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Het Mysterie Onthuld
          </h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Van boeking tot beleving - zo werkt jouw volgende stadium avontuur
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-gradient-to-r from-green-300 to-green-400 transform -translate-y-1/2 z-0"></div>
              )}
              
              {/* Step Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100 group-hover:border-green-200">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-green-600 text-center leading-relaxed">
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
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
            <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
              Jouw Reis Timeline
            </h3>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">0</span>
                </div>
                <p className="text-sm text-green-600">Boeking</p>
              </div>
              <div className="w-full md:w-24 h-0.5 md:h-auto md:w-0.5 bg-green-200"></div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">7</span>
                </div>
                <p className="text-sm text-green-600">Dagen Later</p>
              </div>
              <div className="w-full md:w-24 h-0.5 md:h-auto md:w-0.5 bg-green-200"></div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-green-600">Onthulling</p>
              </div>
              <div className="w-full md:w-24 h-0.5 md:h-auto md:w-0.5 bg-green-200"></div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">✈</span>
                </div>
                <p className="text-sm text-green-600">Vertrek</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}