"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';

export default function Contact() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
        alert('Bericht verzonden! We nemen zo snel mogelijk contact met je op.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        alert('Er is iets misgegaan. Probeer het opnieuw.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Er is iets misgegaan. Probeer het opnieuw.');
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
              Contact
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Heb je vragen over onze mystery trips? We helpen je graag verder!
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-green-800 mb-8">
                  Neem Contact Op
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-1">Telefoon</h3>
                      <p className="text-green-600">+31 20 123 4567</p>
                      <p className="text-sm text-green-500">Ma-Vr: 09:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-1">24/7 Noodlijn</h3>
                      <p className="text-green-600">+31 20 987 6543</p>
                      <p className="text-sm text-green-500">Voor reizigers onderweg</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-1">Email</h3>
                      <p className="text-green-600">info@yournextstadium.nl</p>
                      <p className="text-sm text-green-500">Reactie binnen 24 uur</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-1">Adres</h3>
                      <p className="text-green-600">
                        Voetbalstraat 123<br />
                        1012 AB Amsterdam<br />
                        Nederland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-1">WhatsApp</h3>
                      <p className="text-green-600">+31 6 1234 5678</p>
                      <p className="text-sm text-green-500">Voor snelle vragen</p>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-white rounded-lg p-6 shadow-lg border border-green-100">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Openingstijden
                  </h3>
                  <div className="space-y-2 text-green-600">
                    <div className="flex justify-between">
                      <span>Maandag - Vrijdag</span>
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Zaterdag</span>
                      <span>10:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Zondag</span>
                      <span>Gesloten</span>
                    </div>
                    <div className="border-t border-green-100 pt-2 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>24/7 Noodlijn</span>
                        <span className="text-orange-600">Altijd bereikbaar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
                  <h3 className="text-2xl font-bold text-green-800 mb-6">
                    Stuur ons een Bericht
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                          Naam *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Je volledige naam"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="je@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        Telefoonnummer
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="+31 6 1234 5678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        Onderwerp *
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Selecteer een onderwerp</option>
                        <option value="booking">Nieuwe Boeking</option>
                        <option value="existing">Bestaande Boeking</option>
                        <option value="complaint">Klacht</option>
                        <option value="suggestion">Suggestie</option>
                        <option value="other">Anders</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        Bericht *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Vertel ons hoe we je kunnen helpen..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Verstuur Bericht</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-800 text-center mb-12">
              Veelgestelde Vragen
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "Hoe snel krijg ik antwoord op mijn vraag?",
                  answer: "We streven ernaar om binnen 24 uur te reageren op alle vragen. Voor urgente zaken kun je ons bellen."
                },
                {
                  question: "Kan ik jullie ook bereiken via WhatsApp?",
                  answer: "Ja! Je kunt ons een WhatsApp sturen op +31 6 1234 5678 voor snelle vragen."
                },
                {
                  question: "Wat moet ik doen bij een noodgeval tijdens mijn reis?",
                  answer: "Bel onze 24/7 noodlijn: +31 20 987 6543. We zijn altijd bereikbaar voor reizigers onderweg."
                },
                {
                  question: "Kan ik langskomen op jullie kantoor?",
                  answer: "Ja, maar maak wel eerst een afspraak via telefoon of email om er zeker van te zijn dat we er zijn."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-green-100">
                  <h3 className="text-lg font-bold text-green-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-green-700">
                    {faq.answer}
                  </p>
                </div>
              ))}
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