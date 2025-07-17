"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Check, Star, Plane, Hotel, Ticket, Crown, Shield, Clock, Sparkles, Trophy, Zap } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';
import { PackageSection } from '@/components/PackageSection';
import { motion } from 'framer-motion';

export default function Packages() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-32 pt-20 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white overflow-hidden mt-20">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
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

              <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight mt-20">
                <span className="block">{t('packages.heroLine1')}</span>
                <span className="block bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  {t('packages.heroLine2')}
                </span>
                <span className="block text-5xl lg:text-7xl">{t('packages.heroLine3')}</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
                {t('packages.heroSubtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-32 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PackageSection onBookingClick={() => setIsBookingModalOpen(true)} />

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="mt-32"
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/10 to-orange-500/10 rounded-full px-8 py-4 border border-green-200/50 mb-12"
                >
                  <Shield className="w-6 h-6 text-green-500" />
                  <span className="text-green-600 font-bold">{t('packages.comparisonLabel')}</span>
                  <Zap className="w-6 h-6 text-orange-500" />
                </motion.div>

                <h3 className="text-4xl lg:text-5xl font-black text-gray-800 mb-6">
                  {t('packages.comparisonTitle')}
                </h3>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-green-800 to-green-900 p-8">
                  <h3 className="text-3xl font-black text-white text-center">
                    {t('packages.comparisonHeader')}
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left p-6 font-bold text-gray-900 text-lg">{t('packages.feature')}</th>
                        <th className="text-center p-6 font-bold text-green-600 text-lg">{t('packages.basic.name')}</th>
                        <th className="text-center p-6 font-bold text-orange-600 text-lg">{t('packages.comfort.name')}</th>
                        <th className="text-center p-6 font-bold text-purple-600 text-lg">{t('packages.premium.name')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-6 text-gray-700 font-medium">{t('packages.matchTicket')}</td>
                        <td className="p-6 text-center font-semibold text-green-600">{t('packages.basic.category')}</td>
                        <td className="p-6 text-center font-semibold text-orange-600">{t('packages.comfort.category')}</td>
                        <td className="p-6 text-center font-semibold text-purple-600">VIP</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-6 text-gray-700 font-medium">{t('packages.transport')}</td>
                        <td className="p-6 text-center text-gray-400">-</td>
                        <td className="p-6 text-center">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-purple-600 font-semibold">{t('packages.premium.name')}</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-6 text-gray-700 font-medium">{t('packages.accommodation')}</td>
                        <td className="p-6 text-center text-gray-400">-</td>
                        <td className="p-6 text-center text-gray-400">-</td>
                        <td className="p-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-purple-600 font-semibold">{t('packages.nights')}</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-6 text-gray-700 font-medium">{t('packages.meals')}</td>
                        <td className="p-6 text-center text-gray-400">-</td>
                        <td className="p-6 text-center text-gray-400">-</td>
                        <td className="p-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-purple-600 font-semibold">{t('packages.breakfastDinner')}</span>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-6 text-gray-700 font-medium">{t('packages.support')}</td>
                        <td className="p-6 text-center">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-purple-600 font-semibold">{t('packages.premium.name')}</span>
                          </div>
                        </td>
                      </tr> 
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-32"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Shield, title: t('packages.moneyBackGuarantee'), desc: t('packages.moneyBackDesc'), color: 'from-green-500 to-green-600' },
                  { icon: Clock, title: t('packages.freeRebooking'), desc: t('packages.freeRebookingDesc'), color: 'from-orange-500 to-orange-600' },
                  { icon: Star, title: t('packages.rating'), desc: t('packages.ratingDesc'), color: 'from-purple-500 to-purple-600' }
                ].map((trust, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${trust.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                        <trust.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{trust.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{trust.desc}</p>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer onBookingClick={() => setIsBookingModalOpen(true)} />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        selectedPackage={selectedPackage}
      />
    </div>
  );
}