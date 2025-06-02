import React from 'react';
import Navigation from '../components/common/Navigation';
import { FaGem, FaTshirt, FaHatCowboy, FaGlasses } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StorePage = () => {
  const storeItems = [
    { id: 1, name: 'Shiny Gem', price: 50, icon: <FaGem className="text-yellow-400 text-3xl" />, color: 'from-yellow-100 to-yellow-50' },
    { id: 2, name: 'Cool T-Shirt', price: 100, icon: <FaTshirt className="text-blue-500 text-3xl" />, color: 'from-blue-50 to-blue-100' },
    { id: 3, name: 'Cowboy Hat', price: 75, icon: <FaHatCowboy className="text-amber-800 text-3xl" />, color: 'from-amber-50 to-amber-100' },
    { id: 4, name: 'Funny Glasses', price: 60, icon: <FaGlasses className="text-purple-600 text-3xl" />, color: 'from-purple-50 to-purple-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">KasaLingo Store</h1>
        <p className="text-gray-600 mb-8">Use your points to unlock fun items!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storeItems.map((item) => (
            <motion.div
              key={item.id}
              className={`bg-gradient-to-br ${item.color} rounded-xl p-6 shadow-md flex flex-col items-center`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
              <div className="flex items-center mt-2">
                <span className="text-yellow-600 font-bold mr-1">{item.price}</span>
                <span className="text-yellow-500">★</span>
              </div>
              <button 
                className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                onClick={() => console.log(`Buying ${item.name}`)}
              >
                Buy Now
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Your Points</h2>
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-full p-3 mr-4">
              <FaGem className="text-yellow-500 text-2xl" />
            </div>
            <div>
              <p className="text-gray-600">Current Balance</p>
              <p className="text-2xl font-bold text-yellow-600">250 <span className="text-lg">points</span></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StorePage;
