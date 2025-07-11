"use client";

import { useState } from 'react';
import { MapPin, Trophy, Star } from 'lucide-react';

export function MapSection() {
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);

  const destinations = [
    { name: 'Amsterdam', league: 'Eredivisie', left: '15%', top: '20%', color: 'orange' },
    { name: 'London', league: 'Premier League', left: '12%', top: '35%', color: 'blue' },
    { name: 'Madrid', league: 'La Liga', left: '8%', top: '55%', color: 'red' },
    { name: 'Barcelona', league: 'La Liga', left: '18%', top: '58%', color: 'blue' },
    { name: 'München', league: 'Bundesliga', left: '25%', top: '30%', color: 'red' },
    { name: 'Milano', league: 'Serie A', left: '30%', top: '45%', color: 'black' },
    { name: 'Paris', league: 'Ligue 1', left: '18%', top: '30%', color: 'purple' },
    { name: 'Brussels', league: 'Pro League', left: '20%', top: '25%', color: 'green' },
  ];

  const leagues = [
    { name: 'Premier League', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'from-blue-500 to-blue-600' },
    { name: 'La Liga', logo: '🇪🇸', color: 'from-red-500 to-red-600' },
    { name: 'Bundesliga', logo: '🇩🇪', color: 'from-black to-gray-800' },
    { name: 'Serie A', logo: '🇮🇹', color: 'from-green-500 to-red-500' },
    { name: 'Ligue 1', logo: '🇫🇷', color: 'from-blue-500 to-red-500' },
    { name: 'Eredivisie', logo: '🇳🇱', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Waar Kun Je Naartoe?
          </h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Van de Premier League tot La Liga - ontdek Europa's mooiste stadions
          </p>
        </div>

        {/* Interactive Map */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden mb-16">
          {/* Map Background */}
          <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100">
            {/* Europe Map Illustration */}
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600')] bg-cover bg-center opacity-20"></div>
            
            {/* Destination Pins */}
            {destinations.map((dest, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: dest.left, top: dest.top }}
                onMouseEnter={() => setHoveredDestination(dest.name)}
                onMouseLeave={() => setHoveredDestination(null)}
              >
                <div className={`relative transition-all duration-300 ${hoveredDestination === dest.name ? 'scale-125' : 'scale-100'}`}>
                  <MapPin className="w-8 h-8 text-orange-500 drop-shadow-lg" />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  
                  {/* Tooltip */}
                  {hoveredDestination === dest.name && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                      <div className="font-bold">{dest.name}</div>
                      <div className="text-xs text-gray-300">{dest.league}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map Legend */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex flex-wrap justify-center gap-4">
              {leagues.map((league, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${league.color} text-white font-medium text-sm`}
                >
                  <span>{league.logo}</span>
                  <span>{league.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stadium Gallery */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img 
              src="https://images.pexels.com/photos/2916450/pexels-photo-2916450.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Stadium" 
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-lg font-bold">Premier League</div>
                <div className="text-sm opacity-90">Iconische Stadions</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img 
              src="https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Stadium" 
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-lg font-bold">La Liga</div>
                <div className="text-sm opacity-90">Spaanse Passie</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img 
              src="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Stadium" 
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-lg font-bold">Bundesliga</div>
                <div className="text-sm opacity-90">Duitse Kwaliteit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mystery Destinations */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">Geheime Bestemmingen</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
                  <span className="text-4xl">?</span>
                </div>
              ))}
            </div>
            <p className="text-xl mb-6">
              Meer dan 50 stadions in 15+ landen wachten op je ontdekking
            </p>
            <div className="flex justify-center space-x-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}