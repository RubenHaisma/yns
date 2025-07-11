"use client";

import { useState, useEffect } from 'react';
import { Mail, Users, Trophy, Sparkles, Check, Loader2, Gift } from 'lucide-react';

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

  const destinations = [
    'Premier League (Engeland)',
    'La Liga (Spanje)', 
    'Bundesliga (Duitsland)',
    'Serie A (Italië)',
    'Ligue 1 (Frankrijk)',
    'Eredivisie (Nederland)',
    'Jupiler Pro League (België)'
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
          setError('Je staat al op de waitlist!');
          setPosition(data.position);
        } else {
          setError(data.error || 'Er is iets misgegaan. Probeer het opnieuw.');
        }
      }
    } catch (error) {
      setError('Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Welkom bij de Waitlist! 🎉</h2>
            <p className="text-xl text-green-100 mb-8">
              Je bent succesvol aangemeld voor vroege toegang tot onze mystery football trips!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Je Positie op de Waitlist</h3>
            <div className="text-6xl font-bold text-orange-400 mb-2">#{position}</div>
            <p className="text-green-100">
              Je bent een van de eerste {totalWaitlist} mensen die toegang krijgen!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-6">
              <Gift className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Vroege Toegang</h4>
              <p className="text-sm text-green-200">Als eerste boeken wanneer we live gaan</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Exclusieve Kortingen</h4>
              <p className="text-sm text-green-200">Speciale prijzen voor waitlist leden</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <Sparkles className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Insider Updates</h4>
              <p className="text-sm text-green-200">Eerste updates over nieuwe bestemmingen</p>
            </div>
          </div>

          <p className="text-green-200">
            Check je email voor een bevestiging en meer details over wat je kunt verwachten!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>EXCLUSIEVE VROEGE TOEGANG</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sluit Je Aan Bij De Waitlist
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Wees een van de eersten die toegang krijgt tot onze mystery football trips door Europa. 
            Exclusieve kortingen en vroege toegang gegarandeerd!
          </p>

          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{totalWaitlist}+</div>
              <div className="text-green-200 text-sm">Mensen wachten al</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">50+</div>
              <div className="text-green-200 text-sm">Stadions klaar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">15+</div>
              <div className="text-green-200 text-sm">Landen beschikbaar</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">Waarom Vroeg Aanmelden?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Exclusieve Vroege Toegang</h4>
                  <p className="text-green-200">Boek je mystery trip voordat we officieel lanceren</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Waitlist Korting</h4>
                  <p className="text-green-200">Tot 25% korting op je eerste mystery trip</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Insider Updates</h4>
                  <p className="text-green-200">Eerste updates over nieuwe bestemmingen en features</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Beste Keuze Garantie</h4>
                  <p className="text-green-200">Voorrang bij het kiezen van je ideale reisdatum</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-6 h-6 text-orange-400" />
                <span className="font-bold">Live Waitlist Counter</span>
              </div>
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {totalWaitlist} mensen wachten al
              </div>
              <p className="text-green-200 text-sm">
                Sluit je aan en krijg positie #{totalWaitlist + 1}
              </p>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <Mail className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Meld Je Nu Aan
                </h3>
                <p className="text-green-600">
                  Vul je gegevens in en krijg exclusieve vroege toegang
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Email Adres *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800"
                    placeholder="je@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Naam *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800"
                    placeholder="Je naam"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Stad
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800"
                    placeholder="Amsterdam"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800"
                    placeholder="+31 6 1234 5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">
                  Favoriete Team
                </label>
                <select
                  name="favoriteTeam"
                  value={formData.favoriteTeam}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-800"
                >
                  <option value="">Selecteer je favoriete team</option>
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-700 mb-3">
                  Welke competities interesseren je? (meerdere mogelijk)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {destinations.map(destination => (
                    <button
                      key={destination}
                      type="button"
                      onClick={() => handleDestinationToggle(destination)}
                      className={`p-2 rounded-lg border text-sm transition-colors ${
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
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Aanmelden...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Meld Me Aan Voor De Waitlist</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Door je aan te melden ga je akkoord met onze voorwaarden en privacybeleid. 
                Je kunt je altijd uitschrijven.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}