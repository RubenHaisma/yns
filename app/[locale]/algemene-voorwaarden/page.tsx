"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, AlertTriangle, CreditCard, Plane, Shield, Clock } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';

export default function Terms() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FileText className="w-16 h-16 mx-auto mb-6 text-green-200" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('terms.title')}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              {t('terms.subtitle')}
            </p>
            <p className="text-green-200 mt-4">
              {t('terms.lastUpdated')}
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-6">1. Algemene Bepalingen</h2>
              <div className="space-y-4 text-green-700">
                <p>
                  Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen YourNextStadium B.V., 
                  gevestigd te Amsterdam (hierna: "YourNextStadium" of "wij"), en de klant (hierna: "u" of "de reiziger").
                </p>
                <p>
                  Door een boeking te maken via onze website of andere kanalen, gaat u akkoord met deze voorwaarden. 
                  Wij adviseren u deze voorwaarden zorgvuldig door te lezen voordat u een boeking maakt.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-orange-800">Belangrijk</p>
                      <p className="text-orange-700 text-sm">
                        YourNextStadium is aangesloten bij de Stichting Garantiefonds Reisgelden (SGR). 
                        Uw geld is beschermd conform de Wet op het consumentenrecht.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Process */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <CreditCard className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-800">2. Boeking en Betaling</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">2.1 Boekingsproces</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>Een boeking komt tot stand na ontvangst van uw betaling en onze schriftelijke bevestiging</li>
                    <li>Alle prijzen zijn per persoon en inclusief BTW, tenzij anders vermeld</li>
                    <li>Boekingen zijn bindend en kunnen alleen worden gewijzigd of geannuleerd conform deze voorwaarden</li>
                    <li>U bent verplicht correcte en volledige gegevens te verstrekken</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">2.2 Betaling</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Betaalmethoden</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• iDEAL</li>
                        <li>• Creditcard (Visa, Mastercard)</li>
                        <li>• PayPal</li>
                        <li>• Bankoverschrijving</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Betalingstermijnen</h4>
                      <ul className="text-green-700 text-sm space-y-1">
                        <li>• Volledige betaling bij boeking</li>
                        <li>• Bij groepen &gt;6 personen: 50% aanbetaling</li>
                        <li>• Restbetaling 30 dagen voor vertrek</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>    

            {/* Mystery Concept */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-6">3. Mystery Concept</h2>
              
              <div className="space-y-4 text-green-700">
                <p>
                  <strong>3.1 Bestemming:</strong> De exacte bestemming van uw reis blijft geheim tot 1-2 weken voor vertrek. 
                  Wij houden rekening met uw opgegeven voorkeuren en afkeuringen.
                </p>
                <p>
                  <strong>3.2 Onthulling:</strong> De bestemming wordt onthuld via email en uw persoonlijke dashboard. 
                  U ontvangt dan alle reisdetails, tickets en praktische informatie.
                </p>
                <p>
                  <strong>3.3 Garanties:</strong> Wij garanderen dat uw bestemming voldoet aan het geboekte pakket en 
                  dat u niet naar teams/steden gaat die u expliciet heeft uitgesloten.
                </p>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Mystery Garantie</h4>
                  <p className="text-purple-700 text-sm">
                    Niet tevreden met de onthulde bestemming? U kunt binnen 24 uur na onthulling 
                    kosteloos omboeken naar een andere datum of uw geld terugkrijgen.
                  </p>
                </div>
              </div>
            </div>

            {/* Cancellation */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-800">4. Annulering en Wijzigingen</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">4.1 Annulering door de Reiziger</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-green-200">
                      <thead>
                        <tr className="bg-green-50">
                          <th className="border border-green-200 p-3 text-left text-green-800">Annuleringsmoment</th>
                          <th className="border border-green-200 p-3 text-left text-green-800">Kosten</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-green-200 p-3 text-green-700">Meer dan 30 dagen voor vertrek</td>
                          <td className="border border-green-200 p-3 text-green-700">€50 administratiekosten</td>
                        </tr>
                        <tr className="bg-green-25">
                          <td className="border border-green-200 p-3 text-green-700">15-30 dagen voor vertrek</td>
                          <td className="border border-green-200 p-3 text-green-700">25% van de reissom</td>
                        </tr>
                        <tr>
                          <td className="border border-green-200 p-3 text-green-700">8-14 dagen voor vertrek</td>
                          <td className="border border-green-200 p-3 text-green-700">50% van de reissom</td>
                        </tr>
                        <tr className="bg-green-25">
                          <td className="border border-green-200 p-3 text-green-700">Minder dan 8 dagen voor vertrek</td>
                          <td className="border border-green-200 p-3 text-green-700">100% van de reissom</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">4.2 Wijzigingen</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>Wijzigingen zijn mogelijk tot 14 dagen voor vertrek (€25 wijzigingskosten)</li>
                    <li>Naamswijzigingen zijn gratis mogelijk tot 7 dagen voor vertrek</li>
                    <li>Datumwijzigingen zijn afhankelijk van beschikbaarheid</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Travel Conditions */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <Plane className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-800">5. Reisvoorwaarden</h2>
              </div>
              
              <div className="space-y-4 text-green-700">
                <p>
                  <strong>5.1 Documenten:</strong> U bent zelf verantwoordelijk voor geldige reisdocumenten (paspoort/ID). 
                  Voor reizen buiten de EU kunnen aanvullende documenten vereist zijn.
                </p>
                <p>
                  <strong>5.2 Gezondheid:</strong> U dient fysiek en mentaal in staat te zijn om de reis te ondernemen. 
                  Bij twijfel adviseren wij medisch advies in te winnen.
                </p>
                <p>
                  <strong>5.3 Gedrag:</strong> U dient zich te houden aan lokale wetten en gebruiken. 
                  Ongepast gedrag kan leiden tot uitsluiting van de reis zonder recht op terugbetaling.
                </p>
                <p>
                  <strong>5.4 Verzekering:</strong> Wij adviseren sterk een reisverzekering af te sluiten. 
                  YourNextStadium is niet aansprakelijk voor kosten door ziekte, ongeval of andere onvoorziene omstandigheden.
                </p>
              </div>
            </div>

            {/* Liability */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-800">6. Aansprakelijkheid</h2>
              </div>
              
              <div className="space-y-4 text-green-700">
                <p>
                  <strong>6.1 Onze aansprakelijkheid:</strong> YourNextStadium is aansprakelijk voor de juiste uitvoering 
                  van de geboekte diensten. Onze aansprakelijkheid is beperkt tot de reissom.
                </p>
                <p>
                  <strong>6.2 Overmacht:</strong> Wij zijn niet aansprakelijk voor schade door overmacht, zoals natuurrampen, 
                  stakingen, terrorisme, pandemieën of overheidsmaatregelen.
                </p>
                <p>
                  <strong>6.3 Derde partijen:</strong> Voor diensten van derde partijen (hotels, vervoerders, stadions) 
                  gelden hun eigen voorwaarden. Wij bemiddelen bij problemen maar zijn niet primair aansprakelijk.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">SGR Garantie</h4>
                  <p className="text-blue-700 text-sm">
                    YourNextStadium is aangesloten bij SGR (Stichting Garantiefonds Reisgelden). 
                    Uw geld is beschermd bij faillissement. SGR nummer: 4321.
                  </p>
                </div>
              </div>
            </div>

            {/* Complaints */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-6">7. Klachten en Geschillen</h2>
              
              <div className="space-y-4 text-green-700">
                <p>
                  <strong>7.1 Klachtenprocedure:</strong> Klachten dienen binnen 14 dagen na terugkeer schriftelijk 
                  te worden ingediend bij onze klantenservice.
                </p>
                <p>
                  <strong>7.2 Geschillencommissie:</strong> Bij onopgeloste geschillen kunt u zich wenden tot de 
                  Geschillencommissie Reizen (www.degeschillencommissie.nl).
                </p>
                <p>
                  <strong>7.3 Toepasselijk recht:</strong> Op deze overeenkomst is Nederlands recht van toepassing. 
                  Geschillen worden voorgelegd aan de bevoegde rechter in Amsterdam.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-green-800 mb-6">8. Contact</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-3">YourNextStadium B.V.</h3>
                  <div className="text-green-700 space-y-2">
                    <p><strong>Adres:</strong> Voetbalstraat 123, 1012 AB Amsterdam</p>
                    <p><strong>KvK:</strong> 12345678</p>
                    <p><strong>BTW:</strong> NL123456789B01</p>
                    <p><strong>ANVR:</strong> 98765</p>
                    <p><strong>SGR:</strong> 4321</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-3">Contact</h3>
                  <div className="text-green-700 space-y-2">
                    <p><strong>Telefoon:</strong> +31 20 123 4567</p>
                    <p><strong>24/7 Noodlijn:</strong> +31 20 987 6543</p>
                    <p><strong>Email:</strong> info@yournextstadium.nl</p>
                    <p><strong>Website:</strong> www.yournextstadium.nl</p>
                  </div>
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