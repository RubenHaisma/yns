"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocale, useTranslations } from 'next-intl';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to set map view to bounds of markers
type Destination = {
  city: string;
  stadium: string;
  league: string;
  lat: number;
  lon: number;
  country: string;
  color: string;
};
type MapBoundsProps = { destinations: Destination[] };
function MapBounds({ destinations }: MapBoundsProps) {
  const map = useMap();
  if (destinations.length > 0) {
    const bounds = L.latLngBounds(
      destinations.map((dest: Destination) => [dest.lat, dest.lon])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }
  return null;
}

export function MapSection() {
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations('map');

  // Famous football destinations in England, Netherlands, Germany, Spain, France, North Italy
  const destinations: Destination[] = [
    // England - Premier League
    { city: 'London', stadium: 'Wembley Stadium', league: 'Premier League', lat: 51.556, lon: -0.2796, country: 'England', color: 'blue' },
    { city: 'Manchester', stadium: 'Old Trafford', league: 'Premier League', lat: 53.4631, lon: -2.2913, country: 'England', color: 'red' },
    { city: 'Liverpool', stadium: 'Anfield', league: 'Premier League', lat: 53.4308, lon: -2.9608, country: 'England', color: 'red' },
    { city: 'London', stadium: 'Stamford Bridge', league: 'Premier League', lat: 51.4816, lon: -0.1910, country: 'England', color: 'blue' },
    { city: 'London', stadium: 'Emirates Stadium', league: 'Premier League', lat: 51.5549, lon: -0.1084, country: 'England', color: 'red' },
    // England - Championship (Second Division)
    { city: 'Sunderland', stadium: 'Stadium of Light', league: 'Championship', lat: 54.9144, lon: -1.3881, country: 'England', color: 'purple' },
    { city: 'Sheffield', stadium: 'Bramall Lane', league: 'Championship', lat: 53.3703, lon: -1.4715, country: 'England', color: 'purple' },
    { city: 'Ipswich', stadium: 'Portman Road', league: 'Championship', lat: 52.0558, lon: 1.1441, country: 'England', color: 'purple' },
    // Netherlands - Eredivisie
    { city: 'Amsterdam', stadium: 'Johan Cruijff ArenA', league: 'Eredivisie', lat: 52.3143, lon: 4.9414, country: 'Netherlands', color: 'orange' },
    { city: 'Rotterdam', stadium: 'De Kuip', league: 'Eredivisie', lat: 51.8931, lon: 4.5231, country: 'Netherlands', color: 'green' },
    { city: 'Eindhoven', stadium: 'Philips Stadion', league: 'Eredivisie', lat: 51.4416, lon: 5.4678, country: 'Netherlands', color: 'red' },
    // Netherlands - Eerste Divisie (Second Division)
    { city: 'Nijmegen', stadium: 'Goffertstadion', league: 'Eerste Divisie', lat: 51.8222, lon: 5.8522, country: 'Netherlands', color: 'purple' },
    { city: 'Tilburg', stadium: 'Koning Willem II Stadion', league: 'Eerste Divisie', lat: 51.5606, lon: 5.0672, country: 'Netherlands', color: 'purple' },
    { city: 'Almere', stadium: 'Yanmar Stadion', league: 'Eerste Divisie', lat: 52.3702, lon: 5.2256, country: 'Netherlands', color: 'purple' },
    // Germany - Bundesliga
    { city: 'München', stadium: 'Allianz Arena', league: 'Bundesliga', lat: 48.2188, lon: 11.6247, country: 'Germany', color: 'red' },
    { city: 'Dortmund', stadium: 'Signal Iduna Park', league: 'Bundesliga', lat: 51.4926, lon: 7.4517, country: 'Germany', color: 'yellow' },
    { city: 'Gelsenkirchen', stadium: 'Veltins-Arena', league: 'Bundesliga', lat: 51.5546, lon: 7.0676, country: 'Germany', color: 'blue' },
    { city: 'Berlin', stadium: 'Olympiastadion', league: 'Bundesliga', lat: 52.5146, lon: 13.2394, country: 'Germany', color: 'blue' },
    // Germany - 2. Bundesliga (Second Division)
    { city: 'Hamburg', stadium: 'Volksparkstadion', league: '2. Bundesliga', lat: 53.5872, lon: 9.8986, country: 'Germany', color: 'teal' },
    { city: 'Düsseldorf', stadium: 'Merkur Spiel-Arena', league: '2. Bundesliga', lat: 51.2611, lon: 6.7339, country: 'Germany', color: 'teal' },
    { city: 'Kaiserslautern', stadium: 'Fritz-Walter-Stadion', league: '2. Bundesliga', lat: 49.4401, lon: 7.7716, country: 'Germany', color: 'teal' },
    // Spain - La Liga
    { city: 'Barcelona', stadium: 'Spotify Camp Nou', league: 'La Liga', lat: 41.3809, lon: 2.1228, country: 'Spain', color: 'blue' },
    { city: 'Madrid', stadium: 'Santiago Bernabéu', league: 'La Liga', lat: 40.4531, lon: -3.6883, country: 'Spain', color: 'white' },
    { city: 'Sevilla', stadium: 'Ramón Sánchez Pizjuán', league: 'La Liga', lat: 37.3841, lon: -5.9707, country: 'Spain', color: 'red' },
    { city: 'Valencia', stadium: 'Mestalla', league: 'La Liga', lat: 39.4745, lon: -0.3582, country: 'Spain', color: 'orange' },
    // Spain - Segunda División (Second Division)
    { city: 'Zaragoza', stadium: 'La Romareda', league: 'Segunda División', lat: 41.6356, lon: -0.9025, country: 'Spain', color: 'teal' },
    { city: 'Gijón', stadium: 'El Molinón', league: 'Segunda División', lat: 43.5456, lon: -5.6378, country: 'Spain', color: 'teal' },
    { city: 'Las Palmas', stadium: 'Estadio Gran Canaria', league: 'Segunda División', lat: 28.0997, lon: -15.4567, country: 'Spain', color: 'teal' },
    // France - Ligue 1
    { city: 'Paris', stadium: 'Parc des Princes', league: 'Ligue 1', lat: 48.8414, lon: 2.2530, country: 'France', color: 'blue' },
    { city: 'Marseille', stadium: 'Stade Vélodrome', league: 'Ligue 1', lat: 43.2699, lon: 5.3957, country: 'France', color: 'white' },
    { city: 'Lyon', stadium: 'Groupama Stadium', league: 'Ligue 1', lat: 45.7652, lon: 4.9828, country: 'France', color: 'red' },
    // France - Ligue 2 (Second Division)
    { city: 'Saint-Étienne', stadium: 'Stade Geoffroy-Guichard', league: 'Ligue 2', lat: 45.4606, lon: 4.3903, country: 'France', color: 'purple' },
    { city: 'Metz', stadium: 'Stade Saint-Symphorien', league: 'Ligue 2', lat: 49.1097, lon: 6.1439, country: 'France', color: 'purple' },
    { city: 'Bastia', stadium: 'Stade Armand Cesari', league: 'Ligue 2', lat: 42.6622, lon: 9.4061, country: 'France', color: 'purple' },
    // North Italy - Serie A
    { city: 'Milano', stadium: 'San Siro', league: 'Serie A', lat: 45.4781, lon: 9.1240, country: 'Italy', color: 'black' },
    { city: 'Turin', stadium: 'Allianz Stadium', league: 'Serie A', lat: 45.1096, lon: 7.6413, country: 'Italy', color: 'white' },
    { city: 'Genoa', stadium: 'Stadio Luigi Ferraris', league: 'Serie A', lat: 44.4164, lon: 8.9525, country: 'Italy', color: 'red' },
    { city: 'Bergamo', stadium: 'Gewiss Stadium', league: 'Serie A', lat: 45.6987, lon: 9.6773, country: 'Italy', color: 'blue' },
    // North Italy - Serie B (Second Division)
    { city: 'Parma', stadium: 'Stadio Ennio Tardini', league: 'Serie B', lat: 44.7951, lon: 10.3411, country: 'Italy', color: 'teal' },
    { city: 'Venice', stadium: 'Stadio Pier Luigi Penzo', league: 'Serie B', lat: 45.4281, lon: 12.3667, country: 'Italy', color: 'teal' },
    { city: 'Brescia', stadium: 'Stadio Mario Rigamonti', league: 'Serie B', lat: 45.5631, lon: 10.2269, country: 'Italy', color: 'teal' },
  ];

  // Localize city, stadium, and league names if translation keys exist
  const getLocalized = (type: string, value: string) => {
    // Try to get translation: map.city.London, map.stadium.Wembley Stadium, map.league.Premier League
    const key = `${type}.${value}`;
    const translated = t.has(key) ? t(key) : value;
    return translated;
  };

  const leagues = [
    { name: 'Premier League', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'from-blue-500 to-blue-600' },
    { name: 'La Liga', logo: '🇪🇸', color: 'from-red-500 to-red-600' },
    { name: 'Bundesliga', logo: '🇩🇪', color: 'from-black to-gray-800' },
    { name: 'Serie A', logo: '🇮🇹', color: 'from-green-500 to-red-500' },
    { name: 'Ligue 1', logo: '🇫🇷', color: 'from-blue-500 to-red-500' },
    { name: 'Eredivisie', logo: '🇳🇱', color: 'from-orange-500 to-orange-600' },
    { name: 'Pro League', logo: '🇧🇪', color: 'from-green-500 to-green-600' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            {locale === 'nl' ? 'Waar Kun Je Naartoe?' : 'Where Can You Go?'}
          </h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            {locale === 'nl'
              ? 'Van de Premier League tot La Liga - ontdek Europa\'s mooiste stadions'
              : 'From the Premier League to La Liga - discover Europe\'s most beautiful stadiums'}
          </p>
        </div>

        {/* Interactive Map */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden mb-16">
          <div className="relative h-96">
            <MapContainer
              style={{ height: '100%', width: '100%' }}
              center={[51.5, 10]}
              zoom={4}
              scrollWheelZoom={true}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <MapBounds destinations={destinations} />
              {destinations.map((dest: Destination, index: number) => (
                <Marker
                  key={index}
                  position={[dest.lat, dest.lon]}
                  eventHandlers={{
                    mouseover: () => setHoveredDestination(dest.city + dest.stadium),
                    mouseout: () => setHoveredDestination(null),
                  }}
                >
                  <Popup
                    className="custom-popup"
                  >
                    <div className="bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                      <div className="font-bold">{getLocalized('city', dest.city)}</div>
                      <div className="text-xs text-gray-300">{getLocalized('stadium', dest.stadium)}</div>
                      <div className="text-xs text-gray-400">{getLocalized('league', dest.league)}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Map Legend */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex flex-wrap justify-center gap-4">
              {/* Leagues legend, can be localized if needed */}
              {[
                { name: 'Premier League', logo: '🏴', color: 'from-blue-500 to-blue-600' },
                { name: 'La Liga', logo: '🇪🇸', color: 'from-red-500 to-red-600' },
                { name: 'Bundesliga', logo: '🇩🇪', color: 'from-black to-gray-800' },
                { name: 'Serie A', logo: '🇮🇹', color: 'from-green-500 to-red-500' },
                { name: 'Ligue 1', logo: '🇫🇷', color: 'from-blue-500 to-red-500' },
                { name: 'Eredivisie', logo: '🇳🇱', color: 'from-orange-500 to-orange-600' },
                { name: 'Pro League', logo: '🇧🇪', color: 'from-green-500 to-green-600' },
                { name: 'Second Division', logo: '🏟️', color: 'from-purple-500 to-teal-500' },
              ].map((league, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${league.color} text-white font-medium text-sm`}
                >
                  <span>{league.logo}</span>
                  <span>{getLocalized('league', league.name)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stadium Gallery */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <Image 
              src="https://images.unsplash.com/photo-1683838946268-e0db005a09b4" 
              alt="Stadium" 
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              width={600}
              height={600}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-lg font-bold">Premier League</div>
                <div className="text-sm opacity-90">Iconische Stadions</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <Image 
              src="https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Stadium" 
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              width={600}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-lg font-bold">La Liga</div>
                <div className="text-sm opacity-90">Spaanse Passie</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <Image 
              src="https://images.unsplash.com/photo-1675474463858-54ea69949dfe" 
              alt="Stadium" 
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              width={600}
              height={600}
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
              Meer dan 50 stadions in 5+ landen wachten op je ontdekking
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