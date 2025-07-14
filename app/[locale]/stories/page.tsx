"use client";

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Star, Quote, MapPin, Calendar, Heart, Camera, Instagram } from 'lucide-react';
import { useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { useTranslations } from 'next-intl';

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
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('stories.title')}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              {t('stories.subtitle')}
            </p>
          </div>
        </section>

        {/* Featured Story */}
        <section className="py-20 bg-gradient-to-b from-white to-green-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={stories[selectedStory].image}
                    alt={stories[selectedStory].name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(stories[selectedStory].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl text-green-800 font-medium mb-6 italic">
                    "{stories[selectedStory].quote}"
                  </blockquote>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                      {stories[selectedStory].name}
                    </h3>
                    <div className="flex items-center space-x-4 text-green-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{stories[selectedStory].location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{stories[selectedStory].date}</span>
                      </div>
                    </div>
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {stories[selectedStory].destination}
                    </div>
                  </div>

                  <p className="text-green-700 leading-relaxed">
                    {stories[selectedStory].story}
                  </p>
                </div>
              </div>

              {/* Story Photos */}
              <div className="p-8 bg-gray-50 border-t">
                <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Foto's van de Reis
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {stories[selectedStory].photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Reis foto ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Story Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedStory(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === selectedStory ? 'bg-orange-500' : 'bg-green-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* All Stories Grid */}
        <section className="py-20 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-800 text-center mb-12">
              {t('stories.moreStories')}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-green-800 mb-2">{story.name}</h3>
                    <p className="text-green-600 text-sm mb-3">{story.location} • {story.date}</p>
                    <p className="text-green-700 text-sm mb-4 line-clamp-3">"{story.quote}"</p>
                    <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                      {story.destination}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                {t('stories.shareStory')}
              </h2>
              <p className="text-green-600">
                {t('stories.tagUs')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:from-pink-600 hover:to-purple-700 transition-all">
                <Instagram className="w-5 h-5 inline mr-2" />
                {t('stories.followInstagram')}
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-800 to-green-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('stories.writeYourStory')}
            </h2>
            <p className="text-xl text-green-100 mb-8">
              {t('stories.joinCommunity')}
            </p>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-2xl"
            >
              {t('stories.startAdventure')}
            </button>
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