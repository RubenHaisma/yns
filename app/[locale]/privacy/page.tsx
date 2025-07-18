"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, Eye, Lock, Users, Mail, Clock, FileText, Database, Globe, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';

export default function Privacy() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 pt-20 bg-gradient-to-br from-green-800 to-green-900 text-white overflow-hidden">
          <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-green-200" />
            <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
              {t('privacy.title')}
            </h1>
            <p className="text-base lg:text-lg text-green-100 max-w-2xl mx-auto mb-4">
              {t('privacy.subtitle')}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-3 text-green-200 text-sm">
              <Clock className="w-4 h-4" />
              <span>{t('privacy.lastUpdated')}</span>
              <span>•</span>
              <span>{t('privacy.version')}</span>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-10 bg-gray-50 border-b">
          <div className="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-green-600" />
                {t('privacy.tableOfContents')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <a href="#introduction" className="block text-green-700 hover:text-green-800">{t('privacy.introduction.title')}</a>
                  <a href="#definitions" className="block text-green-700 hover:text-green-800">{t('privacy.definitions.title')}</a>
                  <a href="#collection" className="block text-green-700 hover:text-green-800">{t('privacy.collection.title')}</a>
                  <a href="#categories" className="block text-green-700 hover:text-green-800">{t('privacy.categories.title')}</a>
                  <a href="#purposes" className="block text-green-700 hover:text-green-800">{t('privacy.purposes.title')}</a>
                </div>
                <div className="space-y-2">
                  <a href="#sharing" className="block text-green-700 hover:text-green-800">{t('privacy.sharing.title')}</a>
                  <a href="#security" className="block text-green-700 hover:text-green-800">{t('privacy.security.title')}</a>
                  <a href="#retention" className="block text-green-700 hover:text-green-800">{t('privacy.retention.title')}</a>
                  <a href="#rights" className="block text-green-700 hover:text-green-800">{t('privacy.rights.title')}</a>
                  <a href="#contact" className="block text-green-700 hover:text-green-800">{t('privacy.contact.title')}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-2 sm:px-4 lg:px-6 space-y-10">
            
            {/* Introduction */}
            <div id="introduction" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('privacy.introduction.title')}</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('privacy.introduction.company') }} />
                <p className="mb-4">{t('privacy.introduction.applies')}</p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                  <p className="text-blue-800">
                    {t('privacy.introduction.important')}
                  </p>
                </div>
              </div>
            </div>

            {/* Definitions */}
            <div id="definitions" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('privacy.definitions.title')}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.definitions.keyDefinitions')}</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-gray-900">{t('privacy.definitions.personalData')}</strong>
                      <p className="text-gray-700 mt-1">{t('privacy.definitions.personalDataDesc')}</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">{t('privacy.definitions.processing')}</strong>
                      <p className="text-gray-700 mt-1">{t('privacy.definitions.processingDesc')}</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">{t('privacy.definitions.dataController')}</strong>
                      <p className="text-gray-700 mt-1">{t('privacy.definitions.dataControllerDesc')}</p>
                    </div>
                    <div>
                      <strong className="text-gray-900">{t('privacy.definitions.dataProcessor')}</strong>
                      <p className="text-gray-700 mt-1">{t('privacy.definitions.dataProcessorDesc')}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.definitions.legalFramework')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>{t('privacy.definitions.gdpr')}</li>
                    <li>{t('privacy.definitions.uavg')}</li>
                    <li>{t('privacy.definitions.privacyRegs')}</li>
                    <li>{t('privacy.definitions.industryRegs')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Collection */}
            <div id="collection" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('privacy.collection.title')}</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.collection.directCollection')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {t.raw('privacy.collection.directItems').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.collection.automaticCollection')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {t.raw('privacy.collection.automaticItems').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.collection.thirdPartySources')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {t.raw('privacy.collection.thirdPartyItems').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Categories */}
            <div id="categories" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('privacy.categories.title')}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-base font-bold text-gray-800 mb-2">{t('privacy.categories.identityContact')}</h3>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      {t.raw('privacy.categories.identityItems').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-base font-bold text-gray-800 mb-2">{t('privacy.categories.financialPayment')}</h3>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      {t.raw('privacy.categories.financialItems').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-base font-bold text-gray-800 mb-2">{t('privacy.categories.travelBooking')}</h3>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      {t.raw('privacy.categories.travelItems').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-base font-bold text-gray-800 mb-2">{t('privacy.categories.technicalUsage')}</h3>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      {t.raw('privacy.categories.technicalItems').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Purposes */}
            <div id="purposes" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('privacy.purposes.title')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-3 text-left font-bold text-gray-800">{t('privacy.purposes.purpose')}</th>
                        <th className="border border-gray-200 p-3 text-left font-bold text-gray-800">{t('privacy.purposes.legalBasis')}</th>
                        <th className="border border-gray-200 p-3 text-left font-bold text-gray-800">{t('privacy.purposes.dataCategories')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.serviceProvision')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.contractPerformance')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.identityContactTravelFinancial')}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.paymentProcessing')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.contractPerformance')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.financialIdentity')}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.customerSupport')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.legitimateInterest')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.identityContactTravel')}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.marketingCommunications')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.consent')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.identityContact')}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.analyticsImprovement')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.legitimateInterest')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.technicalUsage')}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.legalCompliance')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.legalObligation')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.allCategories')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                  <p className="text-yellow-800 text-sm">
                    {t('privacy.purposes.note')}
                  </p>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div id="sharing" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('privacy.sharing.title')}</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.sharing.serviceProviders')}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.sharing.paymentProcessors')}</h4>
                      <p className="text-gray-700 text-sm">{t('privacy.sharing.paymentProcessorsDesc')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.sharing.cloudServices')}</h4>
                      <p className="text-gray-700 text-sm">{t('privacy.sharing.cloudServicesDesc')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.sharing.analytics')}</h4>
                      <p className="text-gray-700 text-sm">{t('privacy.sharing.analyticsDesc')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.sharing.communication')}</h4>
                      <p className="text-gray-700 text-sm">{t('privacy.sharing.communicationDesc')}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.sharing.travelPartners')}</h3>
                  <ul className="space-y-2 text-gray-700">
                    {t.raw('privacy.sharing.travelPartnersItems').map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                  <p className="text-red-800 text-sm">
                    {t('privacy.sharing.important')}
                  </p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div id="security" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('privacy.security.title')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.security.technicalMeasures')}</h3>
                    <ul className="space-y-2 text-gray-700">
                      {t.raw('privacy.security.technicalItems').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.security.organizationalMeasures')}</h3>
                    <ul className="space-y-2 text-gray-700">
                      {t.raw('privacy.security.organizationalItems').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
                  <p className="text-green-800 text-sm">
                    {t('privacy.security.certification')}
                  </p>
                </div>
              </div>
            </div>

            {/* Retention */}
            <div id="retention" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('privacy.retention.title')}</h2>
              </div>
              
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-3 text-left font-bold text-gray-800">{t('privacy.retention.dataCategory')}</th>
                        <th className="border border-gray-200 p-3 text-left font-bold text-gray-800">{t('privacy.retention.retentionPeriod')}</th>
                        <th className="border border-gray-200 p-3 text-left font-bold text-gray-800">{t('privacy.retention.legalBasis')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.bookingRecords')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.sevenYears')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.legalObligationTax')}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.financialTransactions')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.sevenYears')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.legalObligationAccounting')}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.marketingData')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.untilConsentWithdrawal')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.purposes.consent')}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.analyticsData')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.twentySixMonths')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.legitimateInterest')}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.supportCommunications')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.threeYears')}</td>
                        <td className="border border-gray-200 p-3 text-gray-700">{t('privacy.retention.legitimateInterest')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
                  <p className="text-blue-800 text-sm">
                    {t('privacy.retention.deletionProcess')}
                  </p>
                </div>
              </div>
            </div>

            {/* Rights */}
            <div id="rights" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">{t('privacy.rights.title')}</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.rights.accessPortability')}</h3>
                    <p className="text-gray-700 text-sm">{t('privacy.rights.accessPortabilityDesc')}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.rights.rectification')}</h3>
                    <p className="text-gray-700 text-sm">{t('privacy.rights.rectificationDesc')}</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.rights.erasure')}</h3>
                    <p className="text-gray-700 text-sm">{t('privacy.rights.erasureDesc')}</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.rights.restriction')}</h3>
                    <p className="text-gray-700 text-sm">{t('privacy.rights.restrictionDesc')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.rights.objection')}</h3>
                    <p className="text-gray-700 text-sm">{t('privacy.rights.objectionDesc')}</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.rights.withdrawal')}</h3>
                    <p className="text-gray-700 text-sm">{t('privacy.rights.withdrawalDesc')}</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.rights.automatedDecisions')}</h3>
                    <p className="text-gray-700 text-sm">{t('privacy.rights.automatedDecisionsDesc')}</p>
                  </div>
                  
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{t('privacy.rights.complaints')}</h3>
                    <p className="text-gray-700 text-sm">{t('privacy.rights.complaintsDesc')}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2 text-sm">{t('privacy.rights.howToExercise')}</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  {t('privacy.rights.contactDPO')}
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-gray-800">{t('privacy.rights.email')}</strong>
                    <p className="text-gray-700">{t('privacy.rights.dpoEmail')}</p>
                  </div>
                  <div>
                    <strong className="text-gray-800">{t('privacy.rights.responseTime')}</strong>
                    <p className="text-gray-700">{t('privacy.rights.responseTimeDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div id="contact" className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">{t('privacy.contact.title')}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.contact.dataProtectionOfficer')}</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>{t('privacy.rights.email')}</strong> {t('privacy.rights.dpoEmail')}</p>
                    <p><strong>{t('privacy.contact.phone')}</strong> +31 20 123 4567</p>
                    <p><strong>{t('privacy.contact.address')}</strong><br />
                    {t('privacy.contact.companyAddress')}<br />
                    {t('privacy.contact.streetAddress')}<br />
                    {t('privacy.contact.postalCode')}<br />
                    {t('privacy.contact.country')}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{t('privacy.contact.supervisoryAuthority')}</h3>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>{t('privacy.contact.apName')}</strong></p>
                    <p><strong>{t('privacy.contact.website')}</strong> {t('privacy.contact.apWebsite')}</p>
                    <p><strong>{t('privacy.contact.phone')}</strong> {t('privacy.contact.apPhone')}</p>
                    <p><strong>{t('privacy.contact.address')}</strong><br />
                    {t('privacy.contact.apAddress')}<br />
                    {t('privacy.contact.apPostal')}<br />
                    {t('privacy.contact.apCity')}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800 text-sm">
                  {t('privacy.contact.complaintProcess')}
                </p>
              </div>
            </div>

            {/* Final Notice */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">{t('privacy.notices.title')}</h2>
              </div>
              
              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <strong>{t('privacy.notices.internationalTransfers').split(':')[0]}:</strong> {t('privacy.notices.internationalTransfers').split(':')[1]}
                </p>
                <p>
                  <strong>{t('privacy.notices.childrenPrivacy').split(':')[0]}:</strong> {t('privacy.notices.childrenPrivacy').split(':')[1]}
                </p>
                <p>
                  <strong>{t('privacy.notices.cookiesPolicy').split(':')[0]}:</strong> {t('privacy.notices.cookiesPolicy').split(':')[1]}
                </p>
                <p>
                  <strong>{t('privacy.notices.updates').split(':')[0]}:</strong> {t('privacy.notices.updates').split(':')[1]}
                </p>
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