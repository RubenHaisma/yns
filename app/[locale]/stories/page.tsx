"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Star, Quote, MapPin, Calendar, Heart, Camera, Instagram, Play, Sparkles, Trophy } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stories() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(0);
  const t = useTranslations();

  const stories = [
    {
      id: 1,
      name: "Marco van der Berg",
      age: 28,
      location: "Amsterdam",
      trip: "Barcelona Mystery Trip",
      date: "Maart 2024",
      rating: 5,
      destination: "Camp Nou, Barcelona",
      quote: "Ongelofelijk! Ik dacht dat ik naar Duitsland zou gaan, maar eindigde in het Camp Nou. De beste voetbalervaring van mijn leven!",
      story: "Toen ik mijn mystery trip boekte, had ik geen idee wat me te wachten stond. De hints wezen naar Duitsland, maar twee weken voor vertrek kreeg ik de onthulling: Barcelona! Het Camp Nou was altijd al een droom van me. De sfeer, de geschiedenis, de passie - alles was perfect. YourNextStadium heeft mijn verwachtingen overtroffen.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      photos: [
        "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
      ]
    },
    {
      id: 2,
      name: "Lisa Janssen",
      age: 25,
      location: "Utrecht",
      trip: "Premier League Mystery",
      date: "April 2024",
      rating: 5,
      destination: "Anfield, Liverpool",
      quote: "Samen met mijn vriendin een mystery trip geboekt. We zijn in Liverpool terechtgekomen - wat een sfeer! Anfield was magisch.",
      story: "Als Liverpool fan was dit een droom die uitkwam. De mystery aspect maakte het nog spannender. We hadden geen idee waar we naartoe gingen, maar toen Liverpool werd onthuld waren we door het dolle heen. You'll Never Walk Alone zingen in Anfield - onbeschrijfelijk!",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      photos: [
        "https://images.pexels.com/photos/2916450/pexels-photo-2916450.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
      ]
    },
    {
      id: 3,
      name: "Tom Verschuren",
      age: 32,
      location: "Rotterdam",
      trip: "Bundesliga Adventure",
      date: "Mei 2024",
      rating: 5,
      destination: "Allianz Arena, München",
      quote: "München was onze mysterie bestemming. Bayern tegen Dortmund in de Allianz Arena - beter wordt het niet! Top georganiseerd.",
      story: "De organisatie was perfect van begin tot eind. Transport, hotel, tickets - alles was geregeld. De Allianz Arena is een architectonisch wonder en de wedstrijd was spectaculair. Der Klassiker in het echt zien was een ervaring die ik nooit zal vergeten.",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      photos: [
        "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
        "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=400&h=300"
      ]
    }
  ];

  const instagramPosts = [
    {
      image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      caption: "Eindelijk onthuld! Madrid was onze bestemming 🇪🇸⚽ #YourNextStadium #MysteryTrip",
      likes: 127,
      user: "@marco_voetbal"
    },
    {
      image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      caption: "Van Amsterdam naar Barcelona in één dag ✈️ #VoetbalReizen #Mystery",
      likes: 89,
      user: "@lisa_travels"
    },
    {
      image: "https://images.pexels.com/photos/2916450/pexels-photo-2916450.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      caption: "Deze sfeer... kippenvel! 🔥 #StadiumLife #FootballFan",
      likes: 156,
      user: "@tom_stadium"
    },
    {
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
      caption: "Bundesliga hier we come! 🇩🇪 #MysteryRevealed #Football",
      likes: 94,
      user: "@sarah_football"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      <main>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 60 + 30}px`,
                  height: `${Math.random() * 60 + 30}px`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20 mb-8"
              >
                <Quote className="w-6 h-6 text-orange-400" />
                <span className="text-white font-bold text-base">Fan Stories</span>
                <Trophy className="w-6 h-6 text-green-400" />
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="block">{t('stories.title')}</span>
              </h1>
              <p className="text-base lg:text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
                {t('stories.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Story */}
        <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
          <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/10 to-orange-500/10 rounded-full px-8 py-4 border border-green-200/50 mb-6"
              >
                <Star className="w-5 h-5 text-green-500" />
                <span className="text-green-600 font-bold text-base">Featured Story</span>
                <Sparkles className="w-5 h-5 text-orange-500" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-2">
                Real Adventures, Real Stories
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
            >
              <div className="md:flex">
                <div className="md:w-1/2 relative">
                  <img
                    src={stories[selectedStory].image}
                    alt={stories[selectedStory].name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center mb-2">
                      {[...Array(stories[selectedStory].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-lg font-bold">{stories[selectedStory].name}</div>
                    <div className="text-sm opacity-90">{stories[selectedStory].location}</div>
                  </div>
                </div>
                <div className="md:w-1/2 p-6 lg:p-8">
                  <div className="mb-6">
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
                      {stories[selectedStory].destination}
                    </div>
                    <blockquote className="text-base lg:text-lg text-green-800 font-medium mb-4 italic leading-relaxed">
                      "{stories[selectedStory].quote}"
                    </blockquote>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-4 text-green-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{stories[selectedStory].date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{stories[selectedStory].trip}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6 text-base lg:text-lg">
                    {stories[selectedStory].story}
                  </p>

                  <motion.button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-base hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Your Adventure
                  </motion.button>
                </div>
              </div>

              {/* Story Photos */}
              <div className="p-6 bg-gray-50 border-t">
                <h4 className="text-base font-bold text-green-800 mb-3 flex items-center">
                  <Camera className="w-4 h-4 mr-2" />
                  Foto's van de Reis
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {stories[selectedStory].photos.map((photo, index) => (
                    <motion.img
                      key={index}
                      src={photo}
                      alt={`Reis foto ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Story Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {stories.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedStory(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === selectedStory ? 'bg-orange-500 scale-125' : 'bg-green-200 hover:bg-green-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* All Stories Grid */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
          <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-green-800 mb-4">
                {t('stories.moreStories')}
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {stories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="relative">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h3 className="text-base font-bold text-green-800 mb-1 group-hover:text-orange-600 transition-colors">{story.name}</h3>
                    <p className="text-green-600 text-xs mb-2">{story.location} • {story.date}</p>
                    <p className="text-green-700 text-xs mb-3 line-clamp-3">"{story.quote}"</p>
                    <div className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs font-medium inline-block">
                      {story.destination}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full px-8 py-4 border border-pink-200/50 mb-6"
              >
                <Instagram className="w-6 h-6 text-pink-500" />
                <span className="text-pink-600 font-bold">Share Your Story</span>
                <Camera className="w-6 h-6 text-purple-500" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-4">
                {t('stories.shareStory')}
              </h2>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                {t('stories.tagUs')}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {instagramPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={post.image}
                    alt="Instagram post"
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <Instagram className="w-8 h-8 mx-auto mb-2" />
                      <div className="flex items-center justify-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-white text-xs bg-black/70 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="font-medium mb-1">{post.user}</div>
                    <div>{post.caption}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <motion.button
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-base hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5 inline mr-2" />
                {t('stories.followInstagram')}
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-green-800 via-green-900 to-green-800 text-white overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 60 + 30}px`,
                  height: `${Math.random() * 60 + 30}px`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-2xl mx-auto px-2 sm:px-4 lg:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4">
                {t('stories.writeYourStory')}
              </h2>
              <p className="text-base lg:text-lg text-green-100 mb-8 leading-relaxed">
                {t('stories.joinCommunity')}
              </p>
              
              <motion.button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-base hover:from-orange-600 hover:to-orange-700 transition-all shadow-2xl"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('stories.startAdventure')}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer onBookingClick={() => setIsBookingModalOpen(true)} />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}