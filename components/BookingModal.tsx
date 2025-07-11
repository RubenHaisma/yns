"use client";

import { useState } from 'react';
import { X, Calendar, Users, MapPin, CreditCard, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    package: '',
    date: '',
    travelers: 1,
    preferences: {
      hatedTeams: [] as string[],
      visitedCities: [] as string[],
      travelStyle: ''
    }
  });

  const packages = [
    { id: 'basic', name: 'Alleen de Match', price: '€149-299', popular: false },
    { id: 'comfort', name: 'Match + Reis', price: '€299-599', popular: true },
    { id: 'premium', name: 'Alles Inclusief', price: '€599-999', popular: false }
  ];

  const teams = [
    'Ajax', 'Feyenoord', 'PSV', 'Real Madrid', 'Barcelona', 'Bayern München', 
    'Manchester United', 'Liverpool', 'Chelsea', 'Arsenal'
  ];

  const cities = [
    'Amsterdam', 'London', 'Madrid', 'Barcelona', 'München', 'Milano', 
    'Paris', 'Brussels', 'Liverpool', 'Manchester'
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleTeamToggle = (team: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        hatedTeams: prev.preferences.hatedTeams.includes(team)
          ? prev.preferences.hatedTeams.filter(t => t !== team)
          : [...prev.preferences.hatedTeams, team]
      }
    }));
  };

  const handleCityToggle = (city: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        visitedCities: prev.preferences.visitedCities.includes(city)
          ? prev.preferences.visitedCities.filter(c => c !== city)
          : [...prev.preferences.visitedCities, city]
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-100">
          <div>
            <h2 className="text-2xl font-bold text-green-800">Boek Je Mystery Trip</h2>
            <p className="text-green-600">Stap {step} van 4</p>
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
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">Kies je Pakket</h3>
                <p className="text-green-600">Welk avontuur past bij jou?</p>
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
                        <div className="font-semibold text-green-800">{pkg.name}</div>
                        <div className="text-green-600">{pkg.price}</div>
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
                <h3 className="text-xl font-bold text-green-800 mb-2">Wanneer wil je gaan?</h3>
                <p className="text-green-600">Kies je vertrekdatum</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Vertrekdatum
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Aantal reizigers
                  </label>
                  <select
                    value={formData.travelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'persoon' : 'personen'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">Vertel ons over jezelf</h3>
                <p className="text-green-600">Zo kunnen we je perfecte mystery bestemming kiezen</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-3">
                    Welke teams haat je? (selecteer alles wat van toepassing is)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {teams.map((team) => (
                      <button
                        key={team}
                        type="button"
                        onClick={() => handleTeamToggle(team)}
                        className={`p-2 rounded-lg border transition-colors ${
                          formData.preferences.hatedTeams.includes(team)
                            ? 'bg-red-100 border-red-300 text-red-800'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700 mb-3">
                    Waar ben je al geweest?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {cities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => handleCityToggle(city)}
                        className={`p-2 rounded-lg border transition-colors ${
                          formData.preferences.visitedCities.includes(city)
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-700 mb-3">
                    Reis je alleen of met vrienden?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'alone', label: 'Alleen - ik ontmoet graag nieuwe mensen' },
                      { value: 'friends', label: 'Met vrienden - we willen samen plezier hebben' },
                      { value: 'flexible', label: 'Flexibel - maakt mij niet uit' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="travelStyle"
                          value={option.value}
                          checked={formData.preferences.travelStyle === option.value}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, travelStyle: e.target.value }
                          }))}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-green-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">Bevestig je Boeking</h3>
                <p className="text-green-600">Controleer je gegevens en betaal veilig</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Pakket:</span>
                  <span className="font-semibold text-green-800">
                    {packages.find(p => p.id === formData.package)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Datum:</span>
                  <span className="font-semibold text-green-800">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Reizigers:</span>
                  <span className="font-semibold text-green-800">{formData.travelers}</span>
                </div>
                <hr className="border-green-200" />
                <div className="flex justify-between text-lg">
                  <span className="text-green-700">Totaal:</span>
                  <span className="font-bold text-green-800">
                    {packages.find(p => p.id === formData.package)?.price}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Email adres
                  </label>
                  <input
                    type="email"
                    placeholder="je@email.com"
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    placeholder="+31 6 1234 5678"
                    className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-orange-100 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Mystery Trip Gegarandeerd</span>
                </div>
                <p className="text-sm text-green-700">
                  Je bestemming wordt 1-2 weken voor vertrek onthuld. Geld terug garantie als je niet tevreden bent.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-green-100">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="px-6 py-2 text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Vorige
          </button>
          
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-2 h-2 rounded-full ${
                  num === step ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
            >
              Volgende
            </button>
          ) : (
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all">
              Boek Nu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}