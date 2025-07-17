"use client";

import { useState, useEffect } from 'react';
import { Mail, Users, Trophy, Sparkles, Check, Loader2, Gift, Star, Zap, ArrowRight, Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [totalWaitlist, setTotalWaitlist] = useState(0);
  const [particleElements, setParticleElements] = useState<Array<{id: number, x: number, y: number, delay: number, size: number}>>([]);

  const tWaitlist = useTranslations('waitlistSection');
  const tSuccess = useTranslations('waitlist');

  useEffect(() => {
    // Generate particle elements
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 4 + 2
    }));
    setParticleElements(elements);

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
      <section className="relative py-10 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {particleElements.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-br from-orange-400/20 to-green-400/20"
              style={{ 
                left: `${particle.x}%`, 
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-40 h-40 border-2 border-green-200/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-16 right-16 w-32 h-32 border-2 border-orange-200/30 rotate-45"
            animate={{ rotate: 405 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-2 sm:px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
              className="relative w-14 h-14 mx-auto mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl" />
              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <motion.div
                className="absolute -inset-2 border-2 border-green-300/50 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl font-bold text-green-800 mb-2"
            >
              {tWaitlist('successTitle')}
              <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {tWaitlist('successElite')}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base lg:text-lg text-green-700 mb-6 max-w-2xl mx-auto leading-relaxed">
              {tWaitlist('successDesc')}
            </motion.p>
            {/* Position Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 mb-10 border border-green-200/50 shadow-xl"
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 rounded-full text-white font-bold text-base shadow-lg">
                  <Crown className="w-4 h-4 inline mr-2" />
                  {tWaitlist('vipPosition')}
                </div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1, type: "spring", bounce: 0.3 }}
                className="relative"
              >
                <div className="text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text mb-1">
                  #{position}
                </div>
                <motion.div
                  className="absolute inset-0 text-2xl lg:text-3xl font-bold text-orange-200/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  #{position}
                </motion.div>
              </motion.div>
              <p className="text-green-600 text-sm font-medium">
                {tWaitlist('outOf', { total: totalWaitlist })}
              </p>
            </motion.div>
            {/* Exclusive Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
            >
              {tWaitlist.raw('benefits').map((benefit: any, index: number) => {
                const icons = { Zap, Gift, Star };
                const Icon = icons[benefit.icon as keyof typeof icons];
                const colors = [
                  'from-yellow-400 to-orange-500',
                  'from-green-400 to-green-600',
                  'from-purple-400 to-purple-600'
                ];
                const bgColors = [
                  'from-yellow-50 to-orange-50',
                  'from-green-50 to-green-100',
                  'from-purple-50 to-purple-100'
                ];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                    className={`relative bg-gradient-to-br ${bgColors[index]} rounded-2xl p-4 border border-white/50 shadow group`}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${colors[index]} rounded-lg flex items-center justify-center mx-auto mb-2 shadow group-hover:scale-105 transition-transform`}>
                      {Icon && <Icon className="w-5 h-5 text-white" />}
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{benefit.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-xs">{benefit.desc}</p>
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
            {/* Exclusive Discount Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-xl font-black text-white mb-4">{tWaitlist('vipCodeTitle')}</h3>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 mb-4 border border-white/30">
                  <code className="text-2xl font-mono font-black text-white tracking-wider">
                    EARLY10
                  </code>
                </div>
                <p className="text-orange-100 text-base leading-relaxed mb-4">
                  {tWaitlist('vipCodeDesc')}
                </p>
                <motion.button
                  className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-base hover:bg-orange-50 transition-all shadow flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{tWaitlist('shareWithFriends')}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
              {/* Decorative Elements */}
              <motion.div
                className="absolute top-2 right-2 w-12 h-12 border-2 border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-2 left-2 w-10 h-10 border-2 border-white/20 rotate-45"
                animate={{ rotate: 405 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {particleElements.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-orange-400/10 to-green-400/10"
            style={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Geometric Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 border border-green-200/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 border border-orange-200/20 rotate-45"
            animate={{ rotate: 405 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-20 h-20 border border-green-300/30 rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-2 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-green-800 mb-4 leading-tight">
            <span className="block">{tWaitlist('beFirst')}</span>
            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              {tWaitlist('unlockMystery')}
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-green-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {tWaitlist('waitlistDesc')}
          </p>
          {/* Enhanced Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {(Array.isArray(tWaitlist.raw('stats')) ? tWaitlist.raw('stats') : []).map((stat: any, index: number) => {
              const icons = [Users, Trophy, Gift];
              const colors = [
                'from-purple-500 to-purple-600',
                'from-green-500 to-green-600',
                'from-orange-500 to-orange-600'
              ];
              const Icon = icons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500`}>
                    <div className={`w-10 h-10 bg-gradient-to-br ${colors[index]} rounded-xl flex items-center justify-center mx-auto mb-2 shadow group-hover:scale-105 transition-transform`}>
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    <div className="text-2xl font-black text-gray-800 mb-1">{index === 0 ? totalWaitlist + '+' : stat.value || ''}</div>
                    <div className="text-gray-600 font-semibold text-sm">{stat.label}</div>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        {/* Enhanced Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-green-500/10" />
              <motion.div
                className="absolute top-6 right-6 w-20 h-20 border border-orange-300/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-black text-gray-800 mb-4">
                  {tWaitlist('formTitle')}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {tWaitlist('formDesc')}
                </p>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-red-700 text-center font-semibold text-sm"
                >
                  {error === 'You are already on the waitlist!' ? tWaitlist('errorAlready') : tWaitlist('errorGeneric')}
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-400/30 focus:border-orange-400 transition-all duration-300 text-base font-medium"
                    placeholder={tWaitlist('emailPlaceholder')}
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{tWaitlist('joining')}</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5" />
                      <span>{tWaitlist('joinButton')}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
                <p className="text-center text-gray-500 leading-relaxed text-xs">
                  🔒 {tWaitlist('noSpam')}
                  <br />
                  <span className="font-semibold text-orange-600">{tWaitlist('alreadyWaiting', { total: totalWaitlist })}</span>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}