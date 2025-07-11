"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const t = useTranslations();
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
        alert(t('contact.success'));
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert(t('contact.error'));
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert(t('contact.error'));
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
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <div className="space-y-6 mb-8 text-center">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-1">{t('contact.email')}</h3>
                      <p className="text-green-600">info@yournextstadium.nl</p>
                      <p className="text-sm text-green-500">{t('contact.subtitle')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">
                    {t('contact.sendMessage')}
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                          {t('contact.name')} {t('contact.required')}
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={t('contact.name')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                          {t('contact.email')} {t('contact.required')}
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={t('contact.email')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        {t('contact.subject')} {t('contact.required')}
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        {t('contact.message')} {t('contact.required')}
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={t('contact.messagePlaceholder')}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>{t('contact.send')}</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}