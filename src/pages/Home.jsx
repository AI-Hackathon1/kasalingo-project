import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaStar, FaBookOpen, FaGamepad, FaTrophy } from 'react-icons/fa';

const Home = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    // Show welcome message if coming from login
    if (location.state?.fromLogin) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
    
    // Show welcome message on first visit
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, [location]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Feature items with icons
  const features = [
    {
      title: 'Interactive Lessons',
      description: 'Engaging content that makes learning fun',
      icon: <FaBookOpen className="text-3xl text-indigo-600 mb-3" />,
      color: 'from-indigo-100 to-indigo-50'
    },
    {
      title: 'Fun Games',
      description: 'Play and learn with exciting language games',
      icon: <FaGamepad className="text-3xl text-pink-600 mb-3" />,
      color: 'from-pink-100 to-pink-50'
    },
    {
      title: 'Earn Rewards',
      description: 'Collect stars and unlock achievements',
      icon: <FaTrophy className="text-3xl text-yellow-500 mb-3" />,
      color: 'from-yellow-100 to-yellow-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 relative overflow-hidden">
      {/* Celebration Effect */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            colors={['#FFD700', '#FFA500', '#FF69B4', '#00BFFF', '#FF1493']}
          />
        </div>
      )}

      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white p-4 rounded-xl shadow-xl border-2 border-yellow-300 flex items-center space-x-2">
              <div className="text-yellow-500 text-2xl">👋</div>
              <div>
                <h3 className="font-bold text-gray-800">Welcome to Kasalingo!</h3>
                <p className="text-sm text-gray-600">Start your language adventure today!</p>
              </div>
              <button 
                onClick={() => setShowWelcome(false)}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative">
        <header className="flex justify-between items-center mb-12">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent"
          >
            Welcome to Kasalingo
          </motion.h1>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hello, {user.name || user.userName}!</span>
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          ) : (
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </header>

        <motion.main 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden"
        >
          <section className="text-center py-12">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-6">
                Fun Language Learning for Kids
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
                Kasalingo makes learning a new language exciting and engaging for children aged 4-12. 
                Our interactive lessons and games make language learning an adventure!
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className={`p-8 rounded-2xl bg-gradient-to-br ${feature.color} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {user ? (
            <motion.section 
              variants={itemVariants}
              className="mt-16 text-center"
            >
              <div className="inline-block bg-indigo-50 rounded-full px-6 py-2 mb-6">
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-medium text-indigo-800">Welcome back, {user.name || user.userName}!</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Ready to continue learning?
              </h3>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/lessons"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Continue Your Adventure! 🚀
                </Link>
              </motion.div>
            </motion.section>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors hover:shadow-lg"
                >
                  Sign In
                </Link>
                <span className="text-gray-500">or</span>
                <Link 
                  to="/register" 
                  className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </motion.div>
          )}
        </motion.main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Kasalingo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
