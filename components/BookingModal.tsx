"use client";

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string | null;
}

export function BookingModal({ isOpen, onClose, selectedPackage }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [formData, setFormData] = useState({
    package: selectedPackage || '',
    date: '',
    travelers: 1,
    name: '',
    email: '',
    phone: ''
  });

  const t = useTranslations('modal');

  // Update package when selectedPackage prop changes
  React.useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({ ...prev, package: selectedPackage }));
    }
  }, [selectedPackage]);

  // Calculate minimum date (1 month from today)
  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    return minDate.toISOString().split('T')[0];
  };

  const packages = [
    { 
      id: 'basic', 
      name: t('basic.name'), 
      price: t('basic.price'), 
      popular: false 
    },
    { 
      id: 'comfort', 
      name: t('comfort.name'), 
      price: t('comfort.price'), 
      popular: true 
    },
    { 
      id: 'premium', 
      name: t('premium.name'), 
      price: t('premium.price'), 
      popular: false 
    }
  ];

  const calculateTotalPrice = () => {
    const pkg = packages.find(p => p.id === formData.package);
    if (!pkg) return '€0';
    
    // Extract base price
    const basePrice = parseInt(pkg.price.replace('€', ''));
    const total = basePrice * formData.travelers;
    return `€${total}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate booking ID
      const newBookingId = `YNS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setBookingId(newBookingId);
      setIsSuccess(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 lg:p-8 text-center">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-green-800 mb-4">{t('bookingConfirmed')}</h2>
            <p className="text-lg lg:text-xl text-green-600 mb-6">
              {t('adventureBegins')}
            </p>
            <div className="bg-green-50 rounded-lg p-4 lg:p-6 mb-6">
              <h3 className="text-base lg:text-lg font-bold text-green-800 mb-2">{t('bookingNumber')}</h3>
              <div className="text-xl lg:text-2xl font-mono font-bold text-green-700">
                {bookingId}
              </div>
            </div>
            <p className="text-green-700 mb-6 lg:mb-8 text-sm lg:text-base">
              Je ontvangt binnen enkele minuten een bevestigingsmail met alle details. Je bestemming wordt 1-2 weken voor vertrek onthuld!
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
                setFormData({
                  package: '',
                  date: '',
                  travelers: 1,
                  name: '',
                  email: '',
                  phone: ''
                });
                onClose();
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 lg:px-8 py-3 rounded-full font-bold hover:from-green-600 hover:to-green-700 transition-all text-sm lg:text-base"
            >
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    // Validate current step before proceeding
    if (step === 1 && !formData.package) {
      return; // Don't proceed if no package is selected
    }
    if (step === 2 && (!formData.date || formData.travelers < 1)) {
      return; // Don't proceed if date is not selected or travelers is invalid
    }
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-green-100">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-green-800">{t('bookTrip')}</h2>
            <p className="text-green-600 text-sm lg:text-base">{t('step')} {step} {t('of')} 3</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-4 lg:p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">{t('choosePackage')}</h3>
                <p className="text-green-600 text-sm lg:text-base">{t('packageQuestion')}</p>
              </div>
              
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="relative">
                    <input
                      type="radio"
                      id={pkg.id}
                      name="package"
                      value={pkg.id}
                      checked={formData.package === pkg.id}
                      onChange={(e) => setFormData(prev => ({ ...prev, package: e.target.value }))}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={pkg.id}
                      className="flex items-center justify-bet
                      ween p-4 border-2 border-green-100 rounded-lg cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:bg-green-50 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-green-800 text-sm lg:text-base">{pkg.name}</div>
                        <div className="text-green-600 text-sm lg:text-base">{pkg.price}</div>
                      </div>
                      {pkg.popular && (
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          POPULAIR
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">{t('whenTravel')}</h3>
                <p className="text-green-600 text-sm lg:text-base">{t('chooseDateSubtitle')}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('departureDate')}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={getMinDate()}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('travelers')}
                  </label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? t('person') : t('people')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">{t('joinWaitlistTitle')}</h3>
                <p className="text-green-600 text-sm lg:text-base">{t('joinWaitlistSubtitle')}</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm lg:text-base">
                  <span className="text-green-700">{t('package')}:</span>
                  <span className="font-semibold text-green-800">
                    {packages.find(p => p.id === formData.package)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm lg:text-base">
                  <span className="text-green-700">{t('date')}:</span>
                  <span className="font-semibold text-green-800">{formData.date}</span>
                </div>
                <div className="flex justify-between text-sm lg:text-base">
                  <span className="text-green-700">{t('travelers')}:</span>
                  <span className="font-semibold text-green-800">{formData.travelers}</span>
                </div>
                <hr className="border-green-200" />
                <div className="flex justify-between text-base lg:text-lg">
                  <span className="text-green-700">{t('total')}:</span>
                  <span className="font-bold text-green-800">
                    {calculateTotalPrice()}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('fullName')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Je volledige naam"
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="je@email.com"
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+31 6 1234 5678"
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-orange-100 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800 text-sm lg:text-base">{t('earlyAccess')}</span>
                </div>
                <p className="text-xs lg:text-sm text-green-700">
                  {t('earlyAccessDesc')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 lg:p-6 border-t border-green-100">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="px-4 lg:px-6 py-2 text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
          >
            {t('previous')}
          </button>
          
          <div className="flex space-x-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-2 h-2 rounded-full transition-all ${
                  num === step ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.package) ||
                (step === 2 && (!formData.date || formData.travelers < 1))
              }
              className="px-4 lg:px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
            >
              {t('next')}
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name || !formData.email}
              className="px-4 lg:px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm lg:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('joining')}</span>
                </>
              ) : (
                <span>{t('joinWaitlist')}</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}