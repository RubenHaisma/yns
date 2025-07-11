"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronDown, ChevronUp, Search, HelpCircle, Shield, Clock, CreditCard, MapPin } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';

export default function FAQ() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Alle Vragen', icon: HelpCircle },
    { id: 'booking', name: 'Boeken', icon: CreditCard },
    { id: 'travel', name: 'Reizen', icon: MapPin },
    { id: 'safety', name: 'Veiligheid', icon: Shield },
    { id: 'support', name: 'Support', icon: Clock }
  ];

  const faqs = [
    {
      id: 1,
      category: 'booking',
      question: "Hoe werkt het boeken van een mystery trip?",
      answer: "Het boeken is heel eenvoudig! Kies je pakket, selecteer je datum, vul je voorkeuren in en betaal veilig online. Je ontvangt direct een bevestiging en 1-2 weken voor vertrek onthullen we je bestemming."
    },
    {
      id: 2,
      category: 'booking',
      question: "Kan ik mijn boeking annuleren?",
      answer: "Ja, je kunt tot 14 dagen voor vertrek gratis annuleren en krijg je 100% van je geld terug. Binnen 14 dagen gelden onze annuleringsvoorwaarden."
    },
    {
      id: 3,
      category: 'travel',
      question: "Wat als ik niet naar de onthulde bestemming wil?",
      answer: "Geen probleem! Als je echt niet naar de onthulde bestemming wilt, krijg je 100% van je geld terug of kun je omboeken naar een andere datum."
    },
    {
      id: 4,
      category: 'travel',
      question: "Welke bestemmingen zijn mogelijk?",
      answer: "We organiseren trips naar meer dan 50 stadions in 15+ Europese landen. Denk aan Premier League, La Liga, Bundesliga, Serie A, Ligue 1 en meer!"
    },
    {
      id: 5,
      category: 'booking',
      question: "Hoe weet ik zeker dat ik niet naar een team ga dat ik haat?",
      answer: "In je boekingsformulier kun je teams opgeven die je absoluut niet wilt zien. Wij houden hier 100% rekening mee bij het selecteren van je bestemming."
    },
    {
      id: 6,
      category: 'travel',
      question: "Wat gebeurt er als de wedstrijd wordt afgelast?",
      answer: "We hebben altijd een backup plan. Je krijgt tickets voor een andere wedstrijd in dezelfde stad of een volledige terugbetaling als dat niet mogelijk is."
    },
    {
      id: 7,
      category: 'safety',
      question: "Is mijn geld veilig bij jullie?",
      answer: "Absoluut! We zijn SGR erkend (Stichting Garantiefonds Reisgelden) en je geld is volledig beschermd. Ook bieden we een 100% geld terug garantie."
    },
    {
      id: 8,
      category: 'support',
      question: "Kan ik jullie bereiken tijdens mijn reis?",
      answer: "Ja! We hebben een 24/7 noodlijn (+31 20 987 6543) speciaal voor reizigers onderweg. Je bent nooit alleen!"
    },
    {
      id: 9,
      category: 'booking',
      question: "Kan ik voor meerdere personen boeken?",
      answer: "Natuurlijk! Je kunt voor maximaal 6 personen tegelijk boeken. Alle reizigers krijgen dezelfde bestemming."
    },
    {
      id: 10,
      category: 'travel',
      question: "Wat is inbegrepen in de pakketten?",
      answer: "Dit verschilt per pakket. 'Alleen de Match' bevat alleen tickets, 'Match + Reis' bevat ook transport, en 'Alles Inclusief' bevat ook hotel en maaltijden."
    },
    {
      id: 11,
      category: 'booking',
      question: "Welke betaalmethoden accepteren jullie?",
      answer: "We accepteren iDEAL, creditcards (Visa, Mastercard), bankoverschrijving en PayPal. Alle betalingen zijn 100% veilig."
    },
    {
      id: 12,
      category: 'travel',
      question: "Kan ik mijn reis verlengen?",
      answer: "Ja! Je kunt extra nachten bijboeken of je verblijf verlengen. Neem contact met ons op voor de mogelijkheden."
    },
    {
      id: 13,
      category: 'support',
      question: "Hoe krijg ik updates over mijn reis?",
      answer: "Je ontvangt regelmatig updates via email en hebt toegang tot je persoonlijke dashboard waar je alle informatie kunt vinden."
    },
    {
      id: 14,
      category: 'safety',
      question: "Wat als ik ziek word voor mijn reis?",
      answer: "We raden een reisverzekering aan. Bij ziekte kun je vaak gratis omboeken of krijg je je geld terug via je verzekering."
    },
    {
      id: 15,
      category: 'travel',
      question: "Zijn de hotels van goede kwaliteit?",
      answer: "Ja! We werken alleen met 4-5 sterren hotels in het premium pakket en zorgen altijd voor schone, veilige accommodatie."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
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
              Veelgestelde Vragen
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Alles wat je wilt weten over onze mystery football trips
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type="text"
                placeholder="Zoek in veelgestelde vragen..."
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
                  Geen resultaten gevonden
                </h3>
                <p className="text-green-600">
                  Probeer een andere zoekterm of selecteer een andere categorie
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
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
              Nog Vragen?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Ons team staat klaar om je te helpen met al je vragen over mystery football trips
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Neem Contact Op
              </a>
              <a
                href="tel:+31201234567"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Bel Ons Nu
              </a>
            </div>
            
            <div className="mt-8 text-green-200">
              <p>24/7 Noodlijn: +31 20 987 6543</p>
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