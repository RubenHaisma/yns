"use client";

import { useState, useEffect } from 'react';
import { Mail, Users, Trophy, Sparkles, Check, Loader2, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [totalWaitlist, setTotalWaitlist] = useState(0);

  const tWaitlist = useTranslations('waitlistSection');
  const tSuccess = useTranslations('waitlist');

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
        body: JSON.stringify({ 
          email,
          source: 'homepage'
        }),
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{tSuccess('success')}</h2>
            <p className="text-lg lg:text-xl text-green-100 mb-8">
              {tSuccess('successMessage')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 mb-8">
            <h3 className="text-xl lg:text-2xl font-bold mb-4">{tSuccess('position')}</h3>
            <div className="text-5xl lg:text-6xl font-bold text-orange-400 mb-2">#{position}</div>
            <p className="text-green-100">
              {totalWaitlist > 0 && `${tSuccess('benefits.earlyAccessDesc')} - ${totalWaitlist} ${tSuccess('benefits.updatesDesc')}`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4 lg:p-6">
              <Gift className="w-6 h-6 lg:w-8 lg:h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2 text-sm lg:text-base">{tSuccess('benefits.earlyAccess')}</h4>
              <p className="text-xs lg:text-sm text-green-200">{tSuccess('benefits.earlyAccessDesc')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 lg:p-6">
              <Trophy className="w-6 h-6 lg:w-8 lg:h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2 text-sm lg:text-base">{tSuccess('benefits.discounts')}</h4>
              <p className="text-xs lg:text-sm text-green-200">{tSuccess('benefits.discountsDesc')}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 lg:p-6">
              <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2 text-sm lg:text-base">{tSuccess('benefits.updates')}</h4>
              <p className="text-xs lg:text-sm text-green-200">{tSuccess('benefits.updatesDesc')}</p>
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
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            {tWaitlist('title')}
          </h2>
          <p className="text-lg lg:text-xl text-green-100 max-w-3xl mx-auto mb-8">
            {tWaitlist('subtitle')}. {tWaitlist('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-orange-400">{totalWaitlist}+</div>
              <div className="text-green-200 text-sm">{tWaitlist('stats.waiting')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-orange-400">50+</div>
              <div className="text-green-200 text-sm">{tWaitlist('stats.stadiums')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-orange-400">15+</div>
              <div className="text-green-200 text-sm">{tWaitlist('stats.countries')}</div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {/* Simple Email Form */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <Mail className="w-10 h-10 lg:w-12 lg:h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl lg:text-2xl font-bold text-green-800 mb-2">
                  {tWaitlist('joinWaitlist')}
                </h3>
                <p className="text-green-600 text-sm lg:text-base">
                  {tWaitlist('description')}
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  {tWaitlist('email')} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800 text-sm lg:text-base"
                  placeholder={tWaitlist('emailPlaceholder')}
                />
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
                    <span>{tWaitlist('joinWaitlist')}</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                {tWaitlist('termsText')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}