"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, Eye, Lock, Users, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';

export default function Privacy() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-green-200" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Jouw privacy is belangrijk voor ons. Lees hoe we je gegevens beschermen.
            </p>
            <p className="text-green-200 mt-4">
              Laatst bijgewerkt: 1 januari 2024
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-6">Inleiding</h2>
              <p className="text-green-700 leading-relaxed mb-4">
                YourNextStadium ("wij", "ons", "onze") respecteert je privacy en is toegewijd aan het beschermen van je persoonlijke gegevens. 
                Deze privacy policy legt uit hoe we je informatie verzamelen, gebruiken en beschermen wanneer je onze website bezoekt of onze diensten gebruikt.
              </p>
              <p className="text-green-700 leading-relaxed">
                Door onze website te gebruiken of een boeking te maken, ga je akkoord met de praktijken beschreven in deze policy.
              </p>
            </div>

            {/* Data Collection */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-800">Welke Gegevens Verzamelen We?</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">Persoonlijke Informatie</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>Naam en contactgegevens (email, telefoon)</li>
                    <li>Boekingsinformatie en reisvoorkeuren</li>
                    <li>Betaalgegevens (verwerkt door beveiligde betalingsproviders)</li>
                    <li>Communicatie met onze klantenservice</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">Automatisch Verzamelde Gegevens</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-2">
                    <li>IP-adres en browserinformatie</li>
                    <li>Website gebruiksstatistieken</li>
                    <li>Cookies en vergelijkbare technologieën</li>
                    <li>Apparaat- en locatiegegevens (indien toegestaan)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Usage */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-800">Hoe Gebruiken We Je Gegevens?</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-green-800 mb-3">Dienstverlening</h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• Verwerken van boekingen</li>
                    <li>• Versturen van bevestigingen</li>
                    <li>• Klantenservice verlenen</li>
                    <li>• Mystery bestemmingen selecteren</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-green-800 mb-3">Communicatie</h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• Reisupdate emails</li>
                    <li>• Marketing (met toestemming)</li>
                    <li>• Belangrijke mededelingen</li>
                    <li>• Feedback verzamelen</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-green-800 mb-3">Verbetering</h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• Website optimalisatie</li>
                    <li>• Nieuwe diensten ontwikkelen</li>
                    <li>• Gebruikerservaring verbeteren</li>
                    <li>• Technische problemen oplossen</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-green-800 mb-3">Juridisch</h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• Wettelijke verplichtingen</li>
                    <li>• Fraude preventie</li>
                    <li>• Geschillen oplossen</li>
                    <li>• Veiligheid waarborgen</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <Lock className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-800">Hoe Beschermen We Je Gegevens?</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">🔒</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800">SSL Encryptie</h3>
                    <p className="text-green-700">Alle gegevensoverdracht is beveiligd met 256-bit SSL encryptie</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">🛡️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800">Beveiligde Servers</h3>
                    <p className="text-green-700">Je gegevens worden opgeslagen op beveiligde servers in Europa</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">👥</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800">Beperkte Toegang</h3>
                    <p className="text-green-700">Alleen geautoriseerd personeel heeft toegang tot je gegevens</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">🔄</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800">Regelmatige Audits</h3>
                    <p className="text-green-700">We voeren regelmatig beveiligingsaudits uit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-6">Je Rechten (AVG/GDPR)</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-3">Toegang & Controle</h3>
                  <ul className="text-green-700 space-y-2">
                    <li>• Inzage in je gegevens</li>
                    <li>• Correctie van onjuiste gegevens</li>
                    <li>• Verwijdering van gegevens</li>
                    <li>• Beperking van verwerking</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-3">Overdracht & Bezwaar</h3>
                  <ul className="text-green-700 space-y-2">
                    <li>• Gegevensoverdracht</li>
                    <li>• Bezwaar tegen verwerking</li>
                    <li>• Intrekken van toestemming</li>
                    <li>• Klacht indienen bij AP</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg mt-6">
                <p className="text-green-700">
                  <strong>Wil je gebruik maken van je rechten?</strong> Stuur een email naar 
                  <a href="mailto:privacy@yournextstadium.nl" className="text-green-800 font-bold"> privacy@yournextstadium.nl</a> 
                  met je verzoek. We reageren binnen 30 dagen.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-6">Cookies</h2>
              
              <div className="space-y-4">
                <p className="text-green-700">
                  We gebruiken cookies om je ervaring op onze website te verbeteren. Je kunt cookies beheren via je browserinstellingen.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Noodzakelijk</h4>
                    <p className="text-green-700 text-sm">Voor basisfunctionaliteit</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Analytics</h4>
                    <p className="text-green-700 text-sm">Voor website verbetering</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Marketing</h4>
                    <p className="text-green-700 text-sm">Voor gepersonaliseerde content</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-800">Hoe Lang Bewaren We Je Gegevens?</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-semibold text-green-800">Boekingsgegevens</span>
                  <span className="text-green-700">7 jaar (wettelijk verplicht)</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="font-semibold text-green-800">Marketing gegevens</span>
                  <span className="text-green-700">Tot uitschrijving</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-green-800">Website analytics</span>
                  <span className="text-green-700">26 maanden</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-green-800">Klantenservice</span>
                  <span className="text-green-700">3 jaar</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <Mail className="w-8 h-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-800">Contact & Vragen</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-3">Privacy Officer</h3>
                  <p className="text-green-700 mb-2">
                    <strong>Email:</strong> privacy@yournextstadium.nl
                  </p>
                  <p className="text-green-700 mb-2">
                    <strong>Telefoon:</strong> +31 20 123 4567
                  </p>
                  <p className="text-green-700">
                    <strong>Adres:</strong> Voetbalstraat 123, 1012 AB Amsterdam
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-green-800 mb-3">Autoriteit Persoonsgegevens</h3>
                  <p className="text-green-700 mb-2">
                    Bij klachten kun je contact opnemen met de AP:
                  </p>
                  <p className="text-green-700 mb-2">
                    <strong>Website:</strong> autoriteitpersoonsgegevens.nl
                  </p>
                  <p className="text-green-700">
                    <strong>Telefoon:</strong> 088 - 1805 250
                  </p>
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