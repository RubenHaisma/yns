"use client";

import { useEffect, useState } from 'react';
import { Users, MapPin, Trophy, Heart, Shield, Clock } from 'lucide-react';

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('stats-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Users,
      number: 500,
      suffix: '+',
      label: 'Happy Travelers',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      number: 50,
      suffix: '+',
      label: 'Stadiums Visited',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Trophy,
      number: 15,
      suffix: '+',
      label: 'Countries',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Heart,
      number: 98,
      suffix: '%',
      label: 'Satisfaction Rate',
      color: 'from-red-500 to-red-600'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Geld Terug Garantie',
      description: 'Niet tevreden? Krijg je geld terug, geen vragen gesteld.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Onze experts staan altijd voor je klaar, waar je ook bent.'
    },
    {
      icon: Users,
      title: 'SGR Erkend',
      description: 'Officieel erkend door de Stichting Garantiefonds Reisgelden.'
    }
  ];

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Waarom Mystery Football Trips?
          </h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Ontdek waarom duizenden voetbalfans ons vertrouwen voor hun volgende stadium avontuur
          </p>
        </div>

        {/* Animated Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-green-800 mb-2">
                {isVisible ? (
                  <CountUp end={stat.number} suffix={stat.suffix} />
                ) : (
                  '0'
                )}
              </div>
              <div className="text-green-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-green-800 to-green-900 p-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Wij vs. Normale Voetbalreizen
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-100">
                  <th className="text-left p-4 font-semibold text-green-800">Feature</th>
                  <th className="text-center p-4 font-semibold text-orange-600">YourNextStadium</th>
                  <th className="text-center p-4 font-semibold text-gray-600">Normale Boekingen</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-green-50">
                  <td className="p-4 text-green-700">Prijs</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                      Tot 40% goedkoper
                    </span>
                  </td>
                  <td className="p-4 text-center text-gray-500">Volledige prijs</td>
                </tr>
                <tr className="border-b border-green-50">
                  <td className="p-4 text-green-700">Verrassing</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-medium">
                      Altijd spannend
                    </span>
                  </td>
                  <td className="p-4 text-center text-gray-500">Voorspelbaar</td>
                </tr>
                <tr className="border-b border-green-50">
                  <td className="p-4 text-green-700">Organisatie</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                      Volledig verzorgd
                    </span>
                  </td>
                  <td className="p-4 text-center text-gray-500">Zelf uitzoeken</td>
                </tr>
                <tr>
                  <td className="p-4 text-green-700">Support</td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                      24/7 beschikbaar
                    </span>
                  </td>
                  <td className="p-4 text-center text-gray-500">Kantooruren</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg border border-green-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">{feature.title}</h3>
              <p className="text-green-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return <>{count}{suffix}</>;
}