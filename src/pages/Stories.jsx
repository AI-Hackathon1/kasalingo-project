import React from 'react';
import Navigation from '../components/common/Navigation';
import { FaBook, FaLanguage, FaStar, FaPlayCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StoriesPage = () => {
  const stories = [
    { 
      id: 1, 
      title: 'The Magic Forest', 
      language: 'English', 
      level: 'Beginner',
      duration: '5 min',
      image: 'https://source.unsplash.com/random/400x300/?forest,fairytale',
      progress: 75
    },
    { 
      id: 2, 
      title: 'El Bosque Mágico', 
      language: 'Spanish', 
      level: 'Beginner',
      duration: '5 min',
      image: 'https://source.unsplash.com/random/400x300/?forest,spanish',
      progress: 25
    },
    { 
      id: 3, 
      title: 'La Forêt Enchantée', 
      language: 'French', 
      level: 'Intermediate',
      duration: '7 min',
      image: 'https://source.unsplash.com/random/400x300/?forest,france',
      progress: 10
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-800 mb-2">Stories</h1>
            <p className="text-gray-600">Read and listen to fun stories in different languages!</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-white px-4 py-2 rounded-lg border border-purple-200 text-purple-700 font-medium hover:bg-purple-50 transition-colors">
              Filter
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
              New Story
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <motion.div 
              key={story.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 bg-gray-200">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-xl">{story.title}</h3>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2">
                  <FaLanguage className="text-purple-600" />
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                    {story.language}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <FaStar className="text-yellow-400" />
                    <span className="ml-1 text-sm font-medium text-gray-700">
                      {story.level}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <FaPlayCircle className="mr-1" />
                    <span>{story.duration}</span>
                  </div>
                  <div className="w-1/2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-blue-500 h-2 rounded-full" 
                        style={{ width: `${story.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-right mt-1 text-gray-500">{story.progress}% complete</p>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center">
                  <FaPlayCircle className="mr-2" />
                  {story.progress > 0 ? 'Continue' : 'Start'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Reading Challenge</h2>
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full p-3 mr-4">
              <FaBook className="text-purple-600 text-2xl" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Weekly Goal</span>
                <span className="text-sm font-medium text-purple-700">2/5 stories</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full" style={{ width: '40%' }} />
              </div>
              <p className="text-sm text-gray-500 mt-2">Read 3 more stories to complete this week's challenge!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoriesPage;
