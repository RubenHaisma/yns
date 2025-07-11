"use client";

import { useState, useEffect } from 'react';
import { Mail, Users, Trophy, Sparkles, Check, Loader2, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function WaitlistSection() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    city: '',
    phone: '',
    favoriteTeam: '',
    preferredDestinations: [] as string[],
    source: 'homepage'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [totalWaitlist, setTotalWaitlist] = useState(0);

  const t = useTranslations('waitlist');

  const destinations = [
    'Premier League (England)',
    'La Liga (Spain)', 
    'Bundesliga (Germany)',
    'Serie A (Italy)',
    'Ligue 1 (France)',
    'Eredivisie (Netherlands)',
    'Jupiler Pro League (Belgium)'
  ];

  const teams = [
    'Ajax', 'Feyenoord', 'PSV', 'Real Madrid', 'Barcelona', 'Bayern München',
    'Manchester United', 'Liverpool', 'Chelsea', 'Arsenal', 'Manchester City',
    'Juventus', 'AC Milan', 'Inter Milan', 'PSG', 'Borussia Dortmund'
  ];

  useEffect(() => {
    // Fetch current waitlist count
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => {
        if (data.totalUsers) {
          setTotalWaitlist(data.totalUsers);
        }
      })
      .catch(console.error);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDestinationToggle = (destination: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDestinations: prev.preferredDestinations.includes(destination)
        ? prev.preferredDestinations.filter(d => d !== destination)
        : [...prev.preferredDestinations, destination]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setPosition(data.position);
        setTotalWaitlist(prev => prev + 1);
      } else {
        if (response.status === 409) {
          setError('You are already on the waitlist!');
          setPosition(data.position);
        } else {
          setError(data.error || 'Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-16 lg:py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('success')} 🎉</h2>
            <p className="text-lg lg:text-xl text-green-100 mb-8">
              {t('successMessage')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 mb-8">
            <h3 className="text-xl lg:text-2xl font-bold mb-4">{t('position')}</h3>
            <div className="text-5xl lg:text-6xl font-bold text-orange-400 mb-2">#{position}</div>
            <p className="text-green-100">
              You are one of the first {totalWaitlist} people to get access!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4 lg:p-6">
              <Gift className="w-6 h-6 lg:w-8 lg:h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2 text-sm lg:text-base">{t('benefits.earlyAccess')}</h4>
              <p className="text-xs lg:text-sm text-green-200">{t('benefits.earlyAccessDesc')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 lg:p-6">
              <Trophy className="w-6 h-6 lg:w-8 lg:h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2 text-sm lg:text-base">{t('benefits.discounts')}</h4>
              <p className="text-xs lg:text-sm text-green-200">{t('benefits.discountsDesc')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 lg:p-6">
              <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2 text-sm lg:text-base">{t('benefits.updates')}</h4>
              <p className="text-xs lg:text-sm text-green-200">{t('benefits.updatesDesc')}</p>
            </div>
          </div>

          <p className="text-green-200 text-sm lg:text-base">
            Check your email for confirmation and more details!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>EXCLUSIVE EARLY ACCESS</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-lg lg:text-xl text-green-100 max-w-3xl mx-auto mb-8">
            {t('subtitle')}. {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-orange-400">{totalWaitlist}+</div>
              <div className="text-green-200 text-sm">People waiting</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-orange-400">50+</div>
              <div className="text-green-200 text-sm">Stadiums ready</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-orange-400">15+</div>
              <div className="text-green-200 text-sm">Countries available</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Benefits */}
          <div className="space-y-6">
            <h3 className="text-xl lg:text-2xl font-bold mb-6">Why Sign Up Early?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-base lg:text-lg mb-1">{t('benefits.earlyAccess')}</h4>
                  <p className="text-green-200 text-sm lg:text-base">{t('benefits.earlyAccessDesc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-base lg:text-lg mb-1">Waitlist Discount</h4>
                  <p className="text-green-200 text-sm lg:text-base">Up to 25% off your first mystery trip</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-base lg:text-lg mb-1">{t('benefits.updates')}</h4>
                  <p className="text-green-200 text-sm lg:text-base">{t('benefits.updatesDesc')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-base lg:text-lg mb-1">Best Choice Guarantee</h4>
                  <p className="text-green-200 text-sm lg:text-base">Priority when choosing your ideal travel date</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 mt-8">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-orange-400" />
                <span className="font-bold text-sm lg:text-base">Live Waitlist Counter</span>
              </div>
              <div className="text-xl lg:text-2xl font-bold text-orange-400 mb-1">
                {totalWaitlist} people waiting
              </div>
              <p className="text-green-200 text-xs lg:text-sm">
                Join now and get position #{totalWaitlist + 1}
              </p>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="text-center mb-6">
                <Mail className="w-10 h-10 lg:w-12 lg:h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl lg:text-2xl font-bold text-green-800 mb-2">
                  Sign Up Now
                </h3>
                <p className="text-green-600 text-sm lg:text-base">
                  Fill in your details and get exclusive early access
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800 text-sm lg:text-base"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800 text-sm lg:text-base"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('city')}
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800 text-sm lg:text-base"
                    placeholder="Amsterdam"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    {t('phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800 text-sm lg:text-base"
                    placeholder="+31 6 1234 5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  {t('favoriteTeam')}
                </label>
                <select
                  name="favoriteTeam"
                  value={formData.favoriteTeam}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800 text-sm lg:text-base"
                >
                  <option value="">Select your favorite team</option>
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-3">
                  {t('interests')} (multiple possible)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {destinations.map(destination => (
                    <button
                      key={destination}
                      type="button"
                      onClick={() => handleDestinationToggle(destination)}
                      className={`p-2 rounded-lg border text-xs lg:text-sm transition-colors ${
                        formData.preferredDestinations.includes(destination)
                          ? 'bg-green-100 border-green-300 text-green-800'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {destination}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 lg:py-4 px-6 rounded-lg font-bold text-sm lg:text-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing up...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>{t('joinWaitlist')}</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By signing up you agree to our terms and privacy policy. 
                You can always unsubscribe.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}