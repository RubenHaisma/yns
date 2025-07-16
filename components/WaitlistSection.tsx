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
          setError(tWaitlist('errorAlready'));
          setPosition(data.position);
        } else {
          setError(data.error || tWaitlist('errorGeneric'));
        }
      }
    } catch (error) {
      setError(tWaitlist('errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="relative py-32 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
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
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5,
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
            className="absolute top-20 left-20 w-64 h-64 border-2 border-green-200/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 right-32 w-48 h-48 border-2 border-orange-200/30 rotate-45"
            animate={{ rotate: 405 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
              className="relative w-40 h-40 mx-auto mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl" />
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <Check className="w-16 h-16 text-green-600" />
              </div>
              <motion.div
                className="absolute -inset-4 border-4 border-green-300/50 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-black text-green-800 mb-8"
            >
              {tWaitlist('successTitle')}
              <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {tWaitlist('successElite')}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl lg:text-2xl text-green-700 mb-16 max-w-4xl mx-auto leading-relaxed"
            >
              {tWaitlist('successDesc')}
            </motion.p>

            {/* Position Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl p-12 mb-16 border-2 border-green-200/50 shadow-2xl"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 rounded-full text-white font-bold text-lg shadow-lg">
                  <Crown className="w-5 h-5 inline mr-2" />
                  {tWaitlist('vipPosition')}
                </div>
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1, type: "spring", bounce: 0.3 }}
                className="relative"
              >
                <div className="text-9xl lg:text-[12rem] font-black text-transparent bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text mb-6">
                  #{position}
                </div>
                <motion.div
                  className="absolute inset-0 text-9xl lg:text-[12rem] font-black text-orange-200/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  #{position}
                </motion.div>
              </motion.div>
              
              <p className="text-green-600 text-xl font-semibold">
                {tWaitlist('outOf', { total: totalWaitlist })}
              </p>
            </motion.div>

            {/* Exclusive Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              {tWaitlist.raw('benefits').map((benefit: any, index: number) => {
                const iconMap = { Zap, Gift, Star };
                const Icon = iconMap[benefit.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 + index * 0.2 }}
                    className={`relative bg-gradient-to-br from-white to-white rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 group`}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Exclusive Discount Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-6">{tWaitlist('vipCodeTitle')}</h3>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/30">
                  <code className="text-4xl font-mono font-black text-white tracking-wider">
                    EARLY10
                  </code>
                </div>
                <p className="text-orange-100 text-lg leading-relaxed mb-8">
                  {tWaitlist('vipCodeDesc')}
                </p>
                
                <motion.button
                  className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all shadow-lg flex items-center space-x-3 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{tWaitlist('shareWithFriends')}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Decorative Elements */}
              <motion.div
                className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/20 rotate-45"
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
    <section className="relative py-32 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
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
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-32 left-32 w-96 h-96 border border-green-200/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 right-32 w-64 h-64 border border-orange-200/20 rotate-45"
            animate={{ rotate: 405 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-32 h-32 border border-green-300/30 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl lg:text-8xl font-black text-green-800 mb-8 leading-tight">
            <span className="block">{tWaitlist('beFirst')}</span>
            <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              {tWaitlist('unlockMystery')}
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-green-600 max-w-4xl mx-auto leading-relaxed mb-16">
            {tWaitlist('waitlistDesc')}
          </p>

          {/* Enhanced Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            {[0, 1, 2].map((index) => {
              const iconMap = [Users, Trophy, Gift];
              const Icon = iconMap[index];
              const values = [totalWaitlist + '+', '50+', '10%'];
              const label = tWaitlist(`stats.${index}.label`);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
                    <div className={`w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-black text-gray-800 mb-2">{values[index]}</div>
                    <div className="text-gray-600 font-semibold">{label}</div>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Enhanced Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl p-12 lg:p-16 shadow-2xl border border-gray-100 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-green-500/10" />
              <motion.div
                className="absolute top-8 right-8 w-32 h-32 border border-orange-300/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                  className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
                >
                  <Mail className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-4xl font-black text-gray-800 mb-6">
                  {tWaitlist('formTitle')}
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {tWaitlist('formDesc')}
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 text-red-700 text-center font-semibold"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-8 py-6 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-orange-400/30 focus:border-orange-400 transition-all duration-300 text-lg font-medium"
                    placeholder={tWaitlist('emailPlaceholder')}
                  />
                  <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                    <Mail className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6 px-8 rounded-2xl font-bold text-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-4 shadow-xl hover:shadow-2xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>{tWaitlist('joining')}</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-6 h-6" />
                      <span>{tWaitlist('joinButton')}</span>
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-gray-500 leading-relaxed">
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