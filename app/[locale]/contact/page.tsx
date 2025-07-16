"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, Sparkles, Shield } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast({
          title: t('contact.error'),
          description: t('contact.errorDescription'),
          variant: 'destructive',
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      toast({
        title: t('contact.error'),
        description: t('contact.errorDescription'),
        variant: 'destructive',
      });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      details: 'info@yournextstadium.com',
      description: 'Get in touch for any inquiries',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      details: '+31 20 123 4567',
      description: '24/7 emergency support',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Amsterdam, Netherlands',
      description: 'Our headquarters',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: 'Within 24 hours',
      description: 'We respond quickly',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-32 pt-20 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white overflow-hidden">
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

              <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight mt-20">
                <span className="block">{t('contact.title')}</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-32 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <span className="text-green-600 font-bold">Contact Information</span>
                <Phone className="w-6 h-6 text-orange-500" />
              </motion.div>

              <h2 className="text-5xl lg:text-7xl font-black text-gray-800 mb-8">
                Multiple Ways to
                <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Connect
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 text-center h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{info.title}</h3>
                    <p className="text-lg font-semibold text-gray-900 mb-2">{info.details}</p>
                    <p className="text-gray-600 leading-relaxed">{info.description}</p>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-32 bg-gradient-to-br from-green-50 via-white to-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-gray-800 mb-6">
                {t('contact.sendMessage')}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Ready to start your mystery football adventure? Let&apos;s talk!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Success State */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-gray-200 flex items-center justify-center z-10"
                  >
                    <div className="text-center p-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-green-800 mb-4">Message Sent!</h3>
                      <p className="text-green-600">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-green-500/10" />
                  <motion.div
                    className="absolute top-8 right-8 w-32 h-32 border border-orange-300/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <div className="relative z-10 p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          {t('contact.name')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-400/30 focus:border-green-400 transition-all duration-300 text-lg font-medium"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          {t('contact.email')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-400/30 focus:border-green-400 transition-all duration-300 text-lg font-medium"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        {t('contact.subject')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-400/30 focus:border-green-400 transition-all duration-300 text-lg font-medium"
                      >
                        <option value="">{t('contact.selectSubject')}</option>
                        <option value="booking">{t('contact.newBooking')}</option>
                        <option value="existing">{t('contact.existingBooking')}</option>
                        <option value="complaint">{t('contact.complaint')}</option>
                        <option value="suggestion">{t('contact.suggestion')}</option>
                        <option value="other">{t('contact.other')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        {t('contact.message')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-400/30 focus:border-green-400 transition-all duration-300 text-lg font-medium resize-none"
                        placeholder={t('contact.messagePlaceholder')}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-4"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-6 h-6" />
                      <span>{t('contact.send')}</span>
                    </motion.button>
                  </form>
                </div>
              </div>
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