"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronDown, ChevronUp, Search, HelpCircle, Shield, Clock, CreditCard, MapPin } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';

export default function FAQ() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: t('faq.allQuestions'), icon: HelpCircle },
    { id: 'booking', name: t('faq.booking'), icon: CreditCard },
    { id: 'travel', name: t('faq.travel'), icon: MapPin },
    { id: 'safety', name: t('faq.safety'), icon: Shield },
    { id: 'support', name: t('faq.support'), icon: Clock }
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
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('faq.title')}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              {t('faq.subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type="text"
                placeholder={t('faq.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-green-800 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-green-600 hover:bg-green-100 border border-green-200'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {t('faq.noResults')}
                </h3>
                <p className="text-green-600">
                  {t('faq.noResultsDesc')}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq: any) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-lg shadow-lg border border-green-100 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-green-800 pr-4">
                        {faq.question}
                      </h3>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                    </button>
                    
                    {openFAQ === faq.id && (
                      <div className="px-6 pb-4 border-t border-green-100">
                        <p className="text-green-700 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-green-800 to-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('faq.stillQuestions')}
            </h2>
            <p className="text-xl text-green-100 mb-8">
              {t('faq.stillQuestionsDesc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
              >
                {t('faq.contactUs')}
              </a>
              <a
                href="tel:+31201234567"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {t('faq.callNow')}
              </a>
            </div>
            
            <div className="mt-8 text-green-200">
              <p>{t('faq.emergencyLine')}</p>
            </div>
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