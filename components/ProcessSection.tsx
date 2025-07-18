"use client";

import { Calendar, Gift, MapPin, Sparkles, Clock, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react';
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
      details: tProcess('step1.details'),
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      number: "01"
    },
    {
      icon: Gift,
      title: tProcess('step2.title'),
      description: tProcess('step2.description'),
      details: tProcess('step2.details'),
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      number: "02"
    },
    {
      icon: MapPin,
      title: tProcess('step3.title'),
      description: tProcess('step3.description'),
      details: tProcess('step3.details'),
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      number: "03"
    }
  ];

  const timelineSteps = [
    { 
      number: "0", 
      label: tTimeline('booking'), 
      color: "bg-green-600",
      icon: Calendar,
      description: "Choose your package and book your mystery adventure"
    },
    { 
      number: "7", 
      label: tTimeline('daysLater'), 
      color: "bg-orange-600",
      icon: Gift,
      description: "Receive hints and clues about your destination"
    },
    { 
      icon: Sparkles, 
      label: tTimeline('reveal'), 
      color: "bg-purple-600",
      description: "The big reveal - discover where you're going!"
    },
    { 
      symbol: "✈", 
      label: tTimeline('departure'), 
      color: "bg-blue-600",
      description: "Pack your bags and start your adventure"
    }
  ];

  return (
    <section id="process" className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <h2 className="text-3xl lg:text-4xl font-black text-gray-800 mb-4">
            {tProcess('title')}
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {tProcess('subtitle')}
          </p>
        </motion.div>

        {/* Main Steps */}
        <div className="space-y-32 mb-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center space-x-6">
                  <motion.div
                    className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <step.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className={`text-3xl font-black text-transparent bg-gradient-to-br ${step.color} bg-clip-text`}>
                    {step.number}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-black text-gray-800 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {Array.isArray(step.details) && (
                    <ul className="space-y-4">
                      {step.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: detailIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-4"
                        >
                          <div className={`w-6 h-6 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <motion.div
                  className={`relative bg-gradient-to-br ${step.bgColor} rounded-3xl p-6 shadow-2xl border border-gray-200/50`}
                  whileHover={{ scale: 1.02, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="aspect-video bg-white rounded-2xl flex items-center justify-center border-2 border-gray-200/50 relative overflow-hidden shadow-lg">
                    <div className={`text-8xl text-transparent bg-gradient-to-br ${step.color} bg-clip-text font-black`}>
                      {step.number}
                    </div>
                    
                    {/* Decorative Elements */}
                    <motion.div
                      className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${step.color} rounded-full opacity-10`}
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full opacity-20`}
                      animate={{ scale: [1, 0.8, 1], rotate: [0, -180, -360] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  
                  {/* Floating Icon */}
                  <motion.div
                    className={`absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl`}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 lg:p-8 shadow-2xl"
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
              {tTimeline('title')}
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {tTimeline('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Connection Line */}
                {index < timelineSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-600 to-gray-700 z-0" />
                )}

                {/* Step Circle */}
                <motion.div
                  className={`relative w-16 h-16 lg:w-20 lg:h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl z-10`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.number && (
                    <span className="text-white font-black text-lg lg:text-xl">{step.number}</span>
                  )}
                  {step.icon && (
                    <step.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  )}
                  {step.symbol && (
                    <span className="text-white font-black text-lg lg:text-xl">{step.symbol}</span>
                  )}
                  
                  {/* Pulse Effect */}
                  <motion.div
                    className={`absolute inset-0 ${step.color} rounded-full opacity-30`}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Step Content */}
                <h4 className="text-lg lg:text-xl font-bold text-white mb-3">
                  {step.label}
                </h4>
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                  {tTimeline(`step${index + 1}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}