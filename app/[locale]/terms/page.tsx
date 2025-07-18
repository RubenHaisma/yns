"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, AlertTriangle, CreditCard, Plane, Shield, Clock, Users, Globe, Mail, Building } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';

export default function Terms() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 pt-20 bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden">
          <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-green-200" />
            <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              {t('terms.title')}
            </h1>
            <p className="text-base lg:text-lg text-green-100 max-w-2xl mx-auto mb-4">
              {t('terms.subtitle')}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-3 text-green-200 text-sm">
              <Clock className="w-4 h-4" />
              <span>{t('terms.lastUpdated')}</span>
              <span>•</span>
              <span>{t('terms.version')}</span>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-10 bg-gray-50 border-b">
          <div className="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-green-600" />
                {t('terms.tableOfContents')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <a href="#introduction" className="block text-green-700 hover:text-green-800">{t('terms.introduction.title')}</a>
                  <a href="#booking" className="block text-green-700 hover:text-green-800">{t('terms.booking.title')}</a>
                  <a href="#mystery" className="block text-green-700 hover:text-green-800">{t('terms.mystery.title')}</a>
                  <a href="#cancellation" className="block text-green-700 hover:text-green-800">{t('terms.cancellation.title')}</a>
                </div>
                <div className="space-y-2">
                  <a href="#travel" className="block text-green-700 hover:text-green-800">{t('terms.travel.title')}</a>
                  <a href="#liability" className="block text-green-700 hover:text-green-800">{t('terms.liability.title')}</a>
                  <a href="#complaints" className="block text-green-700 hover:text-green-800">{t('terms.complaints.title')}</a>
                  <a href="#contact" className="block text-green-700 hover:text-green-800">{t('terms.contact.title')}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6 space-y-10">
            
            {/* Introduction */}
            <div id="introduction" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('terms.introduction.title')}</h2>
              <div className="space-y-4 text-gray-700">
                <p dangerouslySetInnerHTML={{ __html: t('terms.introduction.company') }} />
                <p>{t('terms.introduction.agreement')}</p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-orange-800 text-sm">Belangrijk</p>
                      <p className="text-orange-700 text-xs">
                        {t('terms.introduction.important')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Process */}
            <div id="booking" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <CreditCard className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('terms.booking.title')}</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('terms.booking.process.title')}</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {t.raw('terms.booking.process.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('terms.booking.payment.title')}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">{t('terms.booking.payment.methods')}</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        {t.raw('terms.booking.payment.methodsItems').map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">{t('terms.booking.payment.terms')}</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        {t.raw('terms.booking.payment.termsItems').map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>    

            {/* Mystery Concept */}
            <div id="mystery" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('terms.mystery.title')}</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>{t('terms.mystery.destination')}</p>
                <p>{t('terms.mystery.reveal')}</p>
                <p>{t('terms.mystery.guarantees')}</p>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-1 text-sm">{t('terms.mystery.mysteryGuarantee')}</h4>
                  <p className="text-purple-700 text-xs">
                    {t('terms.mystery.mysteryGuaranteeDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Cancellation */}
            <div id="cancellation" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('terms.cancellation.title')}</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('terms.cancellation.cancellationByTraveler.title')}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 p-2 text-left text-gray-800 text-sm">{t('terms.cancellation.cancellationByTraveler.cancellationMoment')}</th>
                          <th className="border border-gray-200 p-2 text-left text-gray-800 text-sm">{t('terms.cancellation.cancellationByTraveler.costs')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-200 p-2 text-gray-700 text-xs">{t('terms.cancellation.cancellationByTraveler.moreThan30Days')}</td>
                          <td className="border border-gray-200 p-2 text-gray-700 text-xs">{t('terms.cancellation.cancellationByTraveler.adminCosts')}</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-200 p-2 text-gray-700 text-xs">{t('terms.cancellation.cancellationByTraveler.fifteenTo30Days')}</td>
                          <td className="border border-gray-200 p-2 text-gray-700 text-xs">{t('terms.cancellation.cancellationByTraveler.twentyFivePercent')}</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 p-2 text-gray-700 text-xs">{t('terms.cancellation.cancellationByTraveler.eightTo14Days')}</td>
                          <td className="border border-gray-200 p-2 text-gray-700 text-xs">{t('terms.cancellation.cancellationByTraveler.fiftyPercent')}</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-200 p-2 text-gray-700 text-xs">{t('terms.cancellation.cancellationByTraveler.lessThan8Days')}</td>
                          <td className="border border-gray-200 p-2 text-gray-700 text-xs">{t('terms.cancellation.cancellationByTraveler.hundredPercent')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('terms.cancellation.changes.title')}</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {t.raw('terms.cancellation.changes.items').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Travel Conditions */}
            <div id="travel" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Plane className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('terms.travel.title')}</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>{t('terms.travel.documents')}</p>
                <p>{t('terms.travel.health')}</p>
                <p>{t('terms.travel.behavior')}</p>
                <p>{t('terms.travel.insurance')}</p>
              </div>
            </div>

            {/* Liability */}
            <div id="liability" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('terms.liability.title')}</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>{t('terms.liability.ourLiability')}</p>
                <p>{t('terms.liability.forceMajeure')}</p>
                <p>{t('terms.liability.thirdParties')}</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-1 text-sm">{t('terms.liability.sgrGuarantee')}</h4>
                  <p className="text-blue-700 text-xs">
                    {t('terms.liability.sgrGuaranteeDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Complaints */}
            <div id="complaints" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('terms.complaints.title')}</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>{t('terms.complaints.procedure')}</p>
                <p>{t('terms.complaints.disputes')}</p>
                <p>{t('terms.complaints.applicableLaw')}</p>
              </div>
            </div>

            {/* Contact */}
            <div id="contact" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('terms.contact.title')}</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-bold text-gray-800 mb-2">{t('terms.contact.company')}</h3>
                  <div className="text-gray-700 space-y-2">
                    <p><strong>{t('terms.contact.address')}</strong> {t('terms.contact.streetAddress')}</p>
                    <p><strong>{t('terms.contact.kvk')}</strong> {t('terms.contact.kvkNumber')}</p>
                    <p><strong>{t('terms.contact.vat')}</strong> {t('terms.contact.vatNumber')}</p>
                    <p><strong>{t('terms.contact.anvr')}</strong> {t('terms.contact.anvrNumber')}</p>
                    {/* SGR removed: replaced by trusted booking label in translations */}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-bold text-gray-800 mb-2">Contact</h3>
                  <div className="text-gray-700 space-y-2">
                    <p><strong>{t('terms.contact.phone')}</strong> {t('terms.contact.phoneNumber')}</p>
                    <p><strong>{t('terms.contact.emergencyLine')}</strong> {t('terms.contact.emergencyNumber')}</p>
                    <p><strong>{t('terms.contact.email')}</strong> {t('terms.contact.emailAddress')}</p>
                    <p><strong>{t('terms.contact.website')}</strong> {t('terms.contact.websiteAddress')}</p>
                  </div>
                </div>
              </div>
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