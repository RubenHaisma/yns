"use client";

import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';

export function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Marco van der Berg",
      location: "Amsterdam",
      trip: "Barcelona Mystery Trip",
      rating: 5,
      quote: "Ongelofelijk! Ik dacht dat ik naar Duitsland zou gaan, maar eindigde in het Camp Nou. De beste voetbalervaring van mijn leven!",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    },
    {
      name: "Lisa Janssen",
      location: "Utrecht",
      trip: "Premier League Mystery",
      rating: 5,
      quote: "Samen met mijn vriendin een mystery trip geboekt. We zijn in Liverpool terechtgekomen - wat een sfeer! Anfield was magisch.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    },
    {
      name: "Tom Verschuren",
      location: "Rotterdam",
      trip: "Bundesliga Adventure",
      rating: 5,
      quote: "München was onze mysterie bestemming. Bayern tegen Dortmund in de Allianz Arena - beter wordt het niet! Top georganiseerd.",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
    }
  ];

  const instagramPosts = [
    {
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      caption: "Eindelijk onthuld! Madrid was onze bestemming 🇪🇸⚽ #YourNextStadium #MysteryTrip",
      likes: 127
    },
    {
      image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      caption: "Van Amsterdam naar Barcelona in één dag ✈️ #VoetbalReizen #Mystery",
      likes: 89
    },
    {
      image: "https://images.pexels.com/photos/2916450/pexels-photo-2916450.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      caption: "Deze sfeer... kippenvel! 🔥 #StadiumLife #FootballFan",
      likes: 156
    },
    {
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      caption: "Bundesliga hier we come! 🇩🇪 #MysteryRevealed #Football",
      likes: 94
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="stories" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Verhalen van Avonturiers
          </h2>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Ontdek waarom meer dan 500 voetbalfans hun volgende stadium hebben gevonden
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-8">
              <Quote className="w-12 h-12 text-orange-500 opacity-50" />
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-green-800 font-medium mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-orange-200"
                />
                <div className="text-left">
                  <div className="font-bold text-green-800 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-green-600">
                    {testimonials[currentTestimonial].location}
                  </div>
                  <div className="text-orange-500 text-sm font-medium">
                    {testimonials[currentTestimonial].trip}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-green-800" />
          </button>
          <button
            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-green-800" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-orange-500' : 'bg-green-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Instagram-style Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-green-800 text-center mb-8">
            Deel je Verhaal
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {instagramPosts.map((post, index) => (
              <div key={index} className="relative group cursor-pointer">
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <Instagram className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm">{post.likes} likes</div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-white text-xs bg-black/50 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {post.caption}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-2xl p-8 text-white text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-200">Gelukkige Reizigers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-green-200">Gemiddelde Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-green-200">Zou Opnieuw Boeken</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}