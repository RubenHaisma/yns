"use client";

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe-client';

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
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // 1. Add new state for upsells and per-person info
  const [upsells, setUpsells] = useState({
    seat: 'basic', // 'basic', 'cat1', 'cat2'
    hotelNights: 0,
    insurance: 'standaard', // 'standaard', 'goud'
  });
  const [travelersInfo, setTravelersInfo] = useState([
    { title: '', firstName: '', lastName: '', email: '', birthDay: '', birthMonth: '', birthYear: '' },
  ]);

  // Add state for football tier selection
  const [footballTier, setFootballTier] = useState<string>('');

  // Add state for traveler errors and attempted submit
  const [travelerErrors, setTravelerErrors] = useState([] as string[][]);
  const [triedSubmitTravelers, setTriedSubmitTravelers] = useState(false);

  const t = useTranslations('modal');
  const locale = useLocale();

  // Update package when selectedPackage prop changes
  React.useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({ ...prev, package: selectedPackage }));
    }
  }, [selectedPackage]);

  // When package changes, set hotelNights appropriately
  React.useEffect(() => {
    if (formData.package === 'premium') {
      setUpsells(prev => ({ ...prev, hotelNights: 1 }));
    } else {
      setUpsells(prev => ({ ...prev, hotelNights: 0 }));
    }
  }, [formData.package]);

  // 2. Update travelersInfo when number of travelers changes
  React.useEffect(() => {
    setTravelersInfo((prev) => {
      const arr = [...prev];
      while (arr.length < formData.travelers) {
        arr.push({ title: '', firstName: '', lastName: '', email: '', birthDay: '', birthMonth: '', birthYear: '' });
      }
      return arr.slice(0, formData.travelers);
    });
  }, [formData.travelers]);

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

  // 3. Add price calculation for upsells
  const getSeatPrice = () => {
    if (upsells.seat === 'cat1') return 50 * formData.travelers;
    if (upsells.seat === 'cat2') return 100 * formData.travelers;
    return 0;
  };
  const getHotelPrice = () => {
    if (formData.package === 'premium') {
      // 1 night included, only charge for extra
      return Math.max(upsells.hotelNights - 1, 0) * 150 * formData.travelers;
    }
    return 0;
  };
  const getInsurancePrice = () => (upsells.insurance === 'goud' ? 15 * formData.travelers : 0);
  // Add price calculation for football tier
  const getFootballTierPrice = () => {
    if (footballTier === 'A') return 100 * formData.travelers;
    if (footballTier === 'B') return 50 * formData.travelers;
    return 0;
  };
  const calculateTotalPrice = () => {
    const pkg = packages.find(p => p.id === formData.package);
    if (!pkg) return '€0';
    const basePrice = parseInt(pkg.price.replace('€', '')) * formData.travelers;
    const total = basePrice + getSeatPrice() + getHotelPrice() + getInsurancePrice() + getFootballTierPrice();
    return `€${total}`;
  };
  const getNumericPrice = () => {
    const pkg = packages.find(p => p.id === formData.package);
    if (!pkg) return 0;
    const basePrice = parseInt(pkg.price.replace('€', '')) * formData.travelers;
    return basePrice + getSeatPrice() + getHotelPrice() + getInsurancePrice() + getFootballTierPrice();
  };

  // Step 3: Confirm details and create payment intent
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setPaymentError(null);
    try {
      const amount = getNumericPrice();
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'eur',
          bookingData: {
            ...formData,
            locale,
            footballTier, // include selected tier
            preferences: JSON.stringify({ upsells, travelersInfo }),
          },
        }),
      });
      const data = await response.json();
      if (response.ok && data.clientSecret) {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
        // Do not change step here; already on step 7
      } else {
        setPaymentError(data.error || 'Failed to initiate payment.');
      }
    } catch (error) {
      setPaymentError('Failed to initiate payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Payment form component
  function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async (e: React.FormEvent) => {
      e.preventDefault();
      setPaying(true);
      setError(null);
      if (!stripe || !elements) {
        setError('Stripe is not loaded.');
        setPaying(false);
        return;
      }
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/${locale}/payment-success`,
        },
        redirect: 'always',
      });
      if (result.error) {
        setError(result.error.message || 'Payment failed.');
      }
      setPaying(false);
    };

    return (
      <form onSubmit={handlePayment} className="space-y-6">
        <PaymentElement options={{ layout: 'tabs' }} />
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        <button
          type="submit"
          disabled={paying || !stripe || !elements}
          className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-base"
        >
          {paying ? t('processing') : t('payBook')}
        </button>
      </form>
    );
  }

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 lg:p-8 text-center">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-green-800 mb-4">Welcome to the Waitlist!</h2>
            <p className="text-lg lg:text-xl text-green-600 mb-6">
              You&apos;re now on the exclusive waitlist for early access!
            </p>
            <div className="bg-green-50 rounded-lg p-4 lg:p-6 mb-6">
              <h3 className="text-base lg:text-lg font-bold text-green-800 mb-2">Reference Number</h3>
              <div className="text-xl lg:text-2xl font-mono font-bold text-green-700">
                {bookingId}
              </div>
            </div>
            <p className="text-green-700 mb-6 lg:mb-8 text-sm lg:text-base">
              You&apos;ll receive a confirmation email within minutes with your waitlist position and exclusive benefits. We&apos;ll notify you as soon as bookings open!
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
    // New: require football tier selection
    if (step === 2 && !footballTier) {
      return; // Don't proceed if no football tier is selected
    }
    // Guard: if on step 2 and no package, send back to step 1
    if (step === 3 && !formData.package) {
      setStep(1);
      return;
    }
    // On step 3, skip hotel step for non-premium packages
    if (step === 3) {
      if (formData.package === 'premium') {
        setStep(4);
      } else {
        setStep(5);
      }
      return;
    }
    if (step === 7) {
      setTriedSubmitTravelers(true);
      // Validate all travelers info and collect errors
      const errors: string[][] = travelersInfo.map((t, i) => {
        const errs: string[] = [];
        if (!t.title || t.title.trim() === '') errs.push('Kies een aanhef');
        if (!t.firstName || t.firstName.trim() === '') errs.push('Voornaam is verplicht');
        if (!t.lastName || t.lastName.trim() === '') errs.push('Achternaam is verplicht');
        if (i === 0 && (!t.email || t.email.trim() === '')) errs.push('E-mailadres is verplicht');
        if (!t.birthDay || t.birthDay.toString().trim() === '') errs.push('Dag is verplicht');
        if (!t.birthMonth || t.birthMonth.toString().trim() === '') errs.push('Maand is verplicht');
        if (!t.birthYear || t.birthYear.toString().trim() === '') errs.push('Jaar is verplicht');
        return errs;
      });
      setTravelerErrors(errors);
      if (errors.some(errs => errs.length > 0)) {
        // Debug output
        console.log('Traveler validation failed:', { travelersInfo, errors });
        return;
      }
      // If validation passes, go to step 8 (overview/payment)
      setStep(8);
      return;
    }
    if (step === 8) {
      handleConfirmBooking();
      return;
    }
    if (step < 8) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  // 1. Update step count and logic
  const TOTAL_STEPS = 8;

  // 2. Render each step separately
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-green-100">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-green-800">{t('bookTrip')}</h2>
            <p className="text-green-600 text-sm lg:text-base">Stap {step} van {TOTAL_STEPS}</p>
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
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
        {/* Step Content */}
        <div className="p-4 lg:p-6">
          {/* Step 1: Package */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">Kies je pakket</h3>
                <p className="text-green-600 text-sm lg:text-base">Welk avontuur past bij jou?</p>
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
                      className="flex items-center justify-between p-4 border-2 border-green-100 rounded-lg cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:bg-green-50 transition-colors"
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
              <div className="bg-green-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between text-base lg:text-lg">
                  <span className="text-green-700">Totaal:</span>
                  <span className="font-bold text-green-800">{formData.package ? calculateTotalPrice() : '€0'}</span>
                </div>
              </div>
            </div>
          )}
          {/* Step 2: Football Tier */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">Kies je voetbal tier</h3>
                <p className="text-green-600 text-sm lg:text-base">Welke clubs wil je kunnen bezoeken?</p>
              </div>
              <div className="space-y-4">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${footballTier === 'A' ? 'border-orange-500 bg-orange-50' : 'border-green-100'}`}> 
                  <input type="radio" name="footballTier" value="A" checked={footballTier === 'A'} onChange={() => setFootballTier('A')} className="mr-2" />
                  <span className="font-bold">Tier A</span> – Bijv. Dortmund, Liverpool, Paris (PSG), etc.
                </label>
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${footballTier === 'B' ? 'border-orange-500 bg-orange-50' : 'border-green-100'}`}> 
                  <input type="radio" name="footballTier" value="B" checked={footballTier === 'B'} onChange={() => setFootballTier('B')} className="mr-2" />
                  <span className="font-bold">Tier B</span> – Bijv. Eintracht, Schalke 04, Sunderland, AS Roma, etc.
                </label>
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${footballTier === 'C' ? 'border-orange-500 bg-orange-50' : 'border-green-100'}`}> 
                  <input type="radio" name="footballTier" value="C" checked={footballTier === 'C'} onChange={() => setFootballTier('C')} className="mr-2" />
                  <span className="font-bold">Tier C</span> – Bijv. Dusseldorf, Southampton, Lens, etc.
                </label>
              </div>
            </div>
          )}
          {/* Step 3: Seat upgrade */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">Kies je stoel</h3>
                <p className="text-green-600 text-sm lg:text-base">Wil je een upgrade?</p>
              </div>
              <div>
                <label className="block text-sm font-wmedium text-green-700 mb-2">Stoel upgrade</label>
                <select
                  value={upsells.seat}
                  onChange={e => setUpsells(prev => ({ ...prev, seat: e.target.value }))}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                >
                  <option value="basic">Basis (inbegrepen)</option>
                  <option value="cat1">Categorie 1 (+€50 p.p.)</option>
                  <option value="cat2">Categorie 2 (+€100 p.p.)</option>
                </select>
              </div>
              <div className="bg-green-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between text-base lg:text-lg">
                  <span className="text-green-700">Totaal:</span>
                  <span className="font-bold text-green-800">{calculateTotalPrice()}</span>
                </div>
              </div>
            </div>
          )}
          {/* Only show hotel nights step if package is premium */}
          {step === 4 && formData.package === 'premium' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">Hotelovernachtingen</h3>
                <p className="text-green-600 text-sm lg:text-base">Wil je extra hotelnachten bijboeken?</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">Aantal hotelnachten</label>
                <select
                  value={upsells.hotelNights}
                  onChange={e => setUpsells(prev => ({ ...prev, hotelNights: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                >
                  {[1, 2, 3].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <span className="text-xs text-green-600">1 nacht inbegrepen, extra nachten + €150 per nacht per persoon</span>
              </div>
              <div className="bg-green-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between text-base lg:text-lg">
                  <span className="text-green-700">Totaal:</span>
                  <span className="font-bold text-green-800">{calculateTotalPrice()}</span>
                </div>
              </div>
            </div>
          )}
          {/* Step 5: Insurance (full copy) */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">Selecteer een verzekering</h3>
              </div>
              <div className="flex flex-col gap-4">
                <label className={`p-4 border rounded-lg cursor-pointer ${upsells.insurance === 'standaard' ? 'border-orange-500 bg-orange-50' : 'border-green-200'}`}> 
                  <input
                    type="radio"
                    name="insurance"
                    value="standaard"
                    checked={upsells.insurance === 'standaard'}
                    onChange={() => setUpsells(prev => ({ ...prev, insurance: 'standaard' }))}
                    className="mr-2"
                  />
                  <span className="font-bold">Standaard</span> – Standaard inbegrepen, geen extra kosten<br/>
                  <span className="text-xs block mt-1">Wedstrijdkaarten blijven geldig voor de nieuwe speeldatum</span>
                </label>
                <label className={`p-4 border rounded-lg cursor-pointer ${upsells.insurance === 'goud' ? 'border-orange-500 bg-orange-50' : 'border-green-200'}`}> 
                  <input
                    type="radio"
                    name="insurance"
                    value="goud"
                    checked={upsells.insurance === 'goud'}
                    onChange={() => setUpsells(prev => ({ ...prev, insurance: 'goud' }))}
                    className="mr-2"
                  />
                  <span className="font-bold">Goud</span> – Volledig verzekerd, €15 per persoon<br/>
                  <span className="text-xs block mt-1">Wedstrijdkaarten blijven geldig voor de nieuwe speeldatum<br/>ÓF Ticketprijs wordt omgezet in een 100% tegoedbon (2 jaar geldig)</span>
                </label>
              </div>
              <div className="bg-green-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between text-base lg:text-lg">
                  <span className="text-green-700">Totaal:</span>
                  <span className="font-bold text-green-800">{calculateTotalPrice()}</span>
                </div>
              </div>
            </div>
          )}
          {/* Step 6: Date & travelers */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">Wanneer wil je gaan?</h3>
                <p className="text-green-600 text-sm lg:text-base">Kies je vertrekdatum en aantal reizigers</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">Vertrekdatum</label>
                  <input
                    type="date"
                    value={formData.date}
                    min={getMinDate()}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">Aantal reizigers</label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'persoon' : 'personen'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between text-base lg:text-lg">
                  <span className="text-green-700">Totaal:</span>
                  <span className="font-bold text-green-800">{calculateTotalPrice()}</span>
                </div>
              </div>
            </div>
          )}
          {/* Step 7: Per-person info */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-green-800 mb-2">Gegevens per persoon</h3>
                <p className="text-green-600 text-sm lg:text-base">Vul de gegevens in voor iedere reiziger</p>
              </div>
              <div className="space-y-4">
                {travelersInfo.map((traveler, idx) => (
                  <div key={idx} className="bg-green-50 rounded-lg p-4 mb-2">
                    <div className="mb-2 font-bold text-green-700">Ticket {idx + 1} {idx === 0 ? 'Hoofdboeker' : ''}</div>
                    {/* Error messages */}
                    {triedSubmitTravelers && travelerErrors[idx] && travelerErrors[idx].length > 0 && (
                      <ul className="mb-2 text-red-600 text-xs list-disc list-inside">
                        {travelerErrors[idx].map((err, i) => <li key={i}>{err}</li>)}
                      </ul>
                    )}
                    <div className="flex gap-2 mb-2">
                      <select
                        value={traveler.title}
                        onChange={e => setTravelersInfo(info => info.map((t, i) => i === idx ? { ...t, title: e.target.value } : t))}
                        className={`p-2 border rounded-lg text-sm ${triedSubmitTravelers && travelerErrors[idx]?.includes('Kies een aanhef') ? 'border-red-500' : 'border-green-200'}`}
                        required
                      >
                        <option value="">Aanhef</option>
                        <option value="de heer">de heer</option>
                        <option value="mevrouw">mevrouw</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Voornaam *"
                        value={traveler.firstName}
                        onChange={e => setTravelersInfo(info => info.map((t, i) => i === idx ? { ...t, firstName: e.target.value } : t))}
                        className={`p-2 border rounded-lg text-sm flex-1 ${triedSubmitTravelers && travelerErrors[idx]?.includes('Voornaam is verplicht') ? 'border-red-500' : 'border-green-200'}`}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Achternaam *"
                        value={traveler.lastName}
                        onChange={e => setTravelersInfo(info => info.map((t, i) => i === idx ? { ...t, lastName: e.target.value } : t))}
                        className={`p-2 border rounded-lg text-sm flex-1 ${triedSubmitTravelers && travelerErrors[idx]?.includes('Achternaam is verplicht') ? 'border-red-500' : 'border-green-200'}`}
                        required
                      />
                    </div>
                    {idx === 0 && (
                      <input
                        type="email"
                        placeholder="E-mailadres *"
                        value={traveler.email}
                        onChange={e => setTravelersInfo(info => info.map((t, i) => i === idx ? { ...t, email: e.target.value } : t))}
                        className={`p-2 border rounded-lg text-sm w-full mb-2 ${triedSubmitTravelers && travelerErrors[idx]?.includes('E-mailadres is verplicht') ? 'border-red-500' : 'border-green-200'}`}
                        required
                      />
                    )}
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Dag"
                        min={1}
                        max={31}
                        value={traveler.birthDay}
                        onChange={e => setTravelersInfo(info => info.map((t, i) => i === idx ? { ...t, birthDay: e.target.value } : t))}
                        className={`p-2 border rounded-lg text-sm w-1/4 ${triedSubmitTravelers && travelerErrors[idx]?.includes('Dag is verplicht') ? 'border-red-500' : 'border-green-200'}`}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Maand"
                        min={1}
                        max={12}
                        value={traveler.birthMonth}
                        onChange={e => setTravelersInfo(info => info.map((t, i) => i === idx ? { ...t, birthMonth: e.target.value } : t))}
                        className={`p-2 border rounded-lg text-sm w-1/4 ${triedSubmitTravelers && travelerErrors[idx]?.includes('Maand is verplicht') ? 'border-red-500' : 'border-green-200'}`}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Jaar"
                        min={1900}
                        max={new Date().getFullYear()}
                        value={traveler.birthYear}
                        onChange={e => setTravelersInfo(info => info.map((t, i) => i === idx ? { ...t, birthYear: e.target.value } : t))}
                        className={`p-2 border rounded-lg text-sm w-1/2 ${triedSubmitTravelers && travelerErrors[idx]?.includes('Jaar is verplicht') ? 'border-red-500' : 'border-green-200'}`}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between text-base lg:text-lg">
                  <span className="text-green-700">Totaal:</span>
                  <span className="font-bold text-green-800">{calculateTotalPrice()}</span>
                </div>
              </div>
            </div>
          )}
          {/* Step 8: Overzicht & betaling */}
          {step === 8 && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <div className="mb-4">
                <div className="bg-green-50 rounded-lg p-4 mb-2">
                  <div className="font-bold mb-2">Overzicht</div>
                  <div className="flex justify-between text-sm"><span>Pakket:</span><span>{packages.find(p => p.id === formData.package)?.name}</span></div>
                  <div className="flex justify-between text-sm"><span>Voetbal tier:</span><span>{footballTier === 'A' ? 'A (Dortmund, Liverpool, PSG)' : footballTier === 'B' ? 'B (Eintracht, Schalke 04, Sunderland, AS Roma)' : footballTier === 'C' ? 'C (Dusseldorf, Southampton, Lens)' : ''}</span></div>
                  <div className="flex justify-between text-sm"><span>Voetbal tier toeslag:</span><span>€{getFootballTierPrice()}</span></div>
                  <div className="flex justify-between text-sm"><span>Datum:</span><span>{formData.date}</span></div>
                  <div className="flex justify-between text-sm"><span>Reizigers:</span><span>{formData.travelers}</span></div>
                  <div className="flex justify-between text-sm"><span>Stoel:</span><span>{upsells.seat === 'basic' ? 'Basis' : upsells.seat === 'cat1' ? 'Categorie 1' : 'Categorie 2'}</span></div>
                  <div className="flex justify-between text-sm"><span>Hotelnachten:</span><span>{upsells.hotelNights}</span></div>
                  <div className="flex justify-between text-sm"><span>Verzekering:</span><span>{upsells.insurance === 'standaard' ? 'Standaard' : 'Goud'}</span></div>
                  <div className="flex justify-between text-sm"><span>Hotel totaal:</span><span>€{getHotelPrice()}</span></div>
                  <div className="flex justify-between text-sm"><span>Stoel upgrade:</span><span>€{getSeatPrice()}</span></div>
                  <div className="flex justify-between text-sm"><span>Verzekering:</span><span>€{getInsurancePrice()}</span></div>
                  <div className="flex justify-between text-base font-bold mt-2"><span>Totaal:</span><span>{calculateTotalPrice()}</span></div>
                </div>
              </div>
              <PaymentForm />
            </Elements>
          )}
        </div>
        {/* Footer with navigation buttons */}
        <div className="flex justify-between items-center p-4 lg:p-6 border-t border-green-100">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="px-4 lg:px-6 py-2 text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
          >
            {t('previous')}
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`w-2 h-2 rounded-full transition-all ${num === step ? 'bg-green-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={
              isSubmitting ||
              (step === 1 && !formData.package) ||
              (step === 2 && !footballTier) ||
              (step === 6 && (!formData.date || formData.travelers < 1))
            }
            className="px-4 lg:px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
          >
            {step === TOTAL_STEPS ? t('payBook') : t('next')}
          </button>
        </div>
      </div>
    </div>
  );
}