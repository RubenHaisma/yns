"use client";

import { Calendar, Gift, MapPin, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

export function ProcessSection() {
  const t = useTranslations();
  const tProcess = useTranslations('process');
  const tTimeline = useTranslations('timeline');

  const steps = [
    {
      icon: Calendar,
      title: tProcess('step1.title'),
      description: tProcess('step1.description'),
      color: "bg-green-50 border-green-200"
    },
    {
      icon: Gift,
      title: tProcess('step2.title'),
      description: tProcess('step2.description'),
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: MapPin,
      title: tProcess('step3.title'),
      description: tProcess('step3.description'),
      color: "bg-green-50 border-green-200"
    }
  ];

  const timelineSteps = [
    { number: "0", label: tTimeline('booking'), color: "bg-green-600" },
    { number: "7", label: tTimeline('daysLater'), color: "bg-orange-600" },
    { icon: Sparkles, label: tTimeline('reveal'), color: "bg-green-600" },
    { symbol: "✈", label: tTimeline('departure'), color: "bg-orange-600" }
  ];

  return (
    <section id="process" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-green-800 mb-6">
            {tProcess('title')}
          </h2>
          <p className="text-lg lg:text-xl text-green-600 max-w-3xl mx-auto leading-relaxed">
            {tProcess('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col h-full group transition-all duration-300">
              {/* Connection Line - Desktop Only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-10 h-px bg-green-200 transform -translate-y-1/2 z-0"></div>
              )}
              {/* Step Card */}
              <div className={`relative flex flex-col flex-1 bg-white rounded-2xl p-4 border ${step.color} shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`} style={{ transition: 'box-shadow 0.3s, transform 0.3s' }}>
                {/* Icon */}
                <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center mb-1 mx-auto shadow-sm">
                  <step.icon className="w-6 h-6 text-gray-700" />
                </div>
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-green-600 to-orange-500 shadow-lg rounded-full flex items-center justify-center z-10 border-2 border-white">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                {/* Content */}
                <h3 className="text-sm lg:text-base font-semibold text-green-800 mb-2 text-center">{step.title}</h3>
                <p className="text-green-600 leading-snug text-center text-sm mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Visual */}
        {/* <div className="mt-20 lg:mt-24 max-w-5xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 lg:p-12 border border-gray-100">
            <h3 className="text-2xl lg:text-3xl font-semibold text-green-800 mb-8 text-center">
              {tTimeline('title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 items-center">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.3,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-12 h-12 lg:w-14 lg:h-14 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {step.number && (
                      <span className="text-white font-semibold text-sm lg:text-base">{step.number}</span>
                    )}
                    {step.icon && (
                      <step.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                    )}
                    {step.symbol && (
                      <span className="text-white font-semibold text-sm lg:text-base">{step.symbol}</span>
                    )}
                  </motion.div>
                  <motion.p 
                    className="text-sm lg:text-base text-green-600 font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.3 + 0.2,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  >
                    {step.label}
                  </motion.p>
                </motion.div>
              ))}
            </div> */}
            
            {/* Connection Lines - Desktop Only */}
            {/* <div className="hidden md:block relative mt-8">
              <div className="flex justify-between items-center px-8">
                {timelineSteps.map((_, index) => (
                  index < timelineSteps.length - 1 && (
                    <motion.div
                      key={`line-${index}`}
                      className="w-16 h-0.5 bg-green-300"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.3 + 0.4,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true }}
                    />
                  )
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}