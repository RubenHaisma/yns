"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
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
        toast({
          title: t('contact.success'),
          description: t('contact.successDescription'),
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
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

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main className="pt-16">
        {/* Contact Form Section */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('contact.title')}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8 lg:p-12 shadow-sm">
              <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 text-center">
                {t('contact.sendMessage')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.name')} {t('contact.required')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={t('contact.name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.email')} {t('contact.required')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder={t('contact.email')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.subject')} {t('contact.required')}
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.message')} {t('contact.required')}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{t('contact.send')}</span>
                </button>
              </form>
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