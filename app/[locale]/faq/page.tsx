"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronDown, ChevronUp, Search, HelpCircle, Shield, Clock, CreditCard, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const t = useTranslations();
  const tFaqPage = useTranslations('faqPage');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: t('faq.allQuestions'), icon: HelpCircle, color: 'from-purple-500 to-purple-600' },
    { id: 'booking', name: t('faq.booking'), icon: CreditCard, color: 'from-green-500 to-green-600' },
    { id: 'travel', name: t('faq.travel'), icon: MapPin, color: 'from-orange-500 to-orange-600' },
    { id: 'safety', name: t('faq.safety'), icon: Shield, color: 'from-blue-500 to-blue-600' },
    { id: 'support', name: t('faq.support'), icon: Clock, color: 'from-red-500 to-red-600' }
  ];

  // Get FAQ questions from translations
  const faqs = t.raw('faq.questions') || [];

  const filteredFAQs = faqs.filter((faq: any) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      <main>
        {/* Hero Section */}
        <section className="relative py-32 pt-25 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 80 + 40}px`,
                  height: `${Math.random() * 80 + 40}px`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Geometric Patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-20 w-96 h-96 border border-white/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-64 h-64 border border-orange-400/20 rotate-45"
              animate={{ rotate: 405 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >

              <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="block">{t('faq.title')}</span>
              </h1>
              
              <p className="text-base lg:text-lg text-green-100 max-w-2xl mx-auto leading-relaxed mb-8">
                {t('faq.subtitle')}
              </p>
              
              {/* Enhanced Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-2xl mx-auto relative"
              >
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-400" />
                  <input
                    type="text"
                    placeholder={t('faq.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-6 rounded-3xl text-green-800 placeholder-green-500 focus:outline-none focus:ring-4 focus:ring-orange-400/30 bg-white/95 backdrop-blur-xl border border-white/20 text-lg font-medium shadow-2xl"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Categories */}
        <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/10 to-orange-500/10 rounded-full px-8 py-4 border border-green-200/50 mb-12"
              >
                <Star className="w-6 h-6 text-green-500" />
                <span className="text-green-600 font-bold">{tFaqPage('browseCategories')}</span>
                <HelpCircle className="w-6 h-6 text-orange-500" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-4">
                {tFaqPage('findYourAnswer')}
              </h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-bold transition-all duration-500 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-2xl scale-105`
                      : 'bg-white text-gray-600 hover:text-gray-800 border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl hover:scale-105'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                  <div className="relative z-10 flex items-center space-x-3">
                    <category.icon className="w-5 h-5" />
                    <span>{category.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
          <div className="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6">
            {filteredFAQs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <HelpCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-green-800 mb-4">
                  {t('faq.noResults')}
                </h3>
                <p className="text-xl text-green-600 leading-relaxed">
                  {t('faq.noResultsDesc')}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredFAQs.map((faq: any, index: number) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                      <motion.button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-8 py-8 text-left flex items-center justify-between hover:bg-green-50/50 transition-all duration-300 group"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <h3 className="text-xl font-bold text-green-800 pr-6 group-hover:text-green-900 transition-colors leading-relaxed">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <ChevronDown className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {openFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-8 border-t border-green-100/50">
                              <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="pt-6"
                              >
                                <p className="text-green-700 leading-relaxed text-base lg:text-lg">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      initial={false}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Enhanced Contact CTA */}
        <section className="relative py-20 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 60 + 30}px`,
                  height: `${Math.random() * 60 + 30}px`,
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

          <div className="relative z-10 max-w-2xl mx-auto px-2 sm:px-4 lg:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">
                {t('faq.stillQuestions')}
              </h2>
              <p className="text-base lg:text-lg text-green-100 mb-8 leading-relaxed">
                {t('faq.stillQuestionsDesc')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  className="relative bg-white text-green-800 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all shadow-2xl overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-50"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10">{t('faq.contactUs')}</span>
                </motion.a>
                
                <motion.a
                  href="tel:+31201234567"
                  className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-2xl overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10">{t('faq.callNow')}</span>
                </motion.a>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8 text-green-200"
              >
                <p className="text-lg">{t('faq.emergencyLine')}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer onBookingClick={() => setIsBookingModalOpen(true)} />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}