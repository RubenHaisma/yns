"use client";

import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">YNS</span>
              </div>
              <span className="font-bold text-xl">YourNextStadium</span>
            </div>
            <p className="text-green-200 mb-4">
              Ontdek je volgende stadium met onze mystery voetbalreizen door heel Europa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Snelle Links</h3>
            <ul className="space-y-2 text-green-200">
              <li><a href="/hoe-het-werkt" className="hover:text-white transition-colors">Hoe Het Werkt</a></li>
              <li><a href="/pakketten" className="hover:text-white transition-colors">Pakketten</a></li>
              <li><a href="/verhalen" className="hover:text-white transition-colors">Verhalen</a></li>
              <li><a href="/veelgestelde-vragen" className="hover:text-white transition-colors">Veelgestelde Vragen</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Bestemmingen */}
          <div>
            <h3 className="font-bold text-lg mb-4">Bestemmingen</h3>
            <ul className="space-y-2 text-green-200">
              <li><a href="#" className="hover:text-white transition-colors">Premier League</a></li>
              <li><a href="#" className="hover:text-white transition-colors">La Liga</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bundesliga</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Serie A</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ligue 1</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-green-200">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+31 20 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>info@yournextstadium.nl</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>Amsterdam, Nederland</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <div className="text-sm font-medium mb-1">24/7 Noodlijn</div>
              <div className="text-orange-300 font-bold">+31 20 987 6543</div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-green-200 text-sm">
            © 2024 YourNextStadium. Alle rechten voorbehouden.
          </div>
          <div className="flex space-x-6 text-green-200 text-sm mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Algemene Voorwaarden</a>
            <a href="#" className="hover:text-white transition-colors">SGR Erkend</a>
          </div>
        </div>
      </div>
    </footer>
  );
}