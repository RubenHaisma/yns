"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, Gift, MapPin, Sparkles, Clock, Shield, Users, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function HowItWorks() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const t = useTranslations();

  const steps = [
    {
      icon: Calendar,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      details: t('howItWorks.step1.details'),
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      number: "01"
    },
    {
      icon: Gift,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      details: t('howItWorks.step2.details'),
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      number: "02"
    },
    {
      icon: MapPin,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      details: t('howItWorks.step3.details'),
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      number: "03"
    }
  ];

  const faqs = t.raw('howItWorks.faqQuestions') || [];

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20 mb-12"
              >
                <Sparkles className="w-8 h-8 text-orange-400" />
                <span className="text-white font-bold text-lg">How It Works</span>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </motion.div>

              <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="block">{t('howItWorks.title')}</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-12">
                {t('howItWorks.subtitle')}
              </p>

              <motion.button
                onClick={() => setIsVideoPlaying(true)}
                className="group flex items-center space-x-3 bg-white/10 backdrop-blur-xl text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center group-hover:bg-orange-400 transition-colors">
                  <Play className="w-5 h-5 ml-0.5" />
                </div>
                <span>Watch How It Works</span>
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl lg:text-7xl font-black text-gray-800 mb-8">
                Simple Process
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                From booking to adventure - your journey in three easy steps
              </p>
            </motion.div>

            <div className="space-y-32">
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
                        className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-xl`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <step.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      <div className={`text-6xl font-black text-transparent bg-gradient-to-br ${step.color} bg-clip-text`}>
                        {step.number}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-4xl lg:text-5xl font-black text-gray-800 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
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
                      className={`relative bg-gradient-to-br ${step.bgColor} rounded-3xl p-12 shadow-2xl border border-gray-200/50`}
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
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 bg-gradient-to-br from-green-50 via-white to-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/10 to-orange-500/10 rounded-full px-8 py-4 border border-green-200/50 mb-12"
              >
                <Shield className="w-6 h-6 text-green-500" />
                <span className="text-green-600 font-bold">Frequently Asked</span>
                <Sparkles className="w-6 h-6 text-orange-500" />
              </motion.div>

              <h2 className="text-5xl lg:text-7xl font-black text-gray-800 mb-8">
                {t('howItWorks.faqTitle')}
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                {t('howItWorks.faqSubtitle')}
              </p>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq: { question: string; answer: string }, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 group"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 60 + 20}px`,
                  height: `${Math.random() * 60 + 20}px`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-7xl font-black mb-8">
                {t('howItWorks.readyTitle')}
              </h2>
              <p className="text-xl lg:text-2xl text-green-100 mb-12 leading-relaxed">
                {t('howItWorks.readySubtitle')}
              </p>
              
              <motion.button
                onClick={() => setIsBookingModalOpen(true)}
                className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-2xl overflow-hidden group"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 flex items-center space-x-3">
                  <span>{t('howItWorks.bookTrip')}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer onBookingClick={() => setIsBookingModalOpen(true)} />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 text-orange-400" />
                  <p className="text-xl">Video coming soon...</p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}