import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiMenu, FiBell, FiMic, FiX, FiVolume2, FiSend, 
  FiHome, FiBook, FiAward, FiSettings, FiHelpCircle, FiLogOut,
  FiStar, FiHeart, FiAward as FiTrophy, FiClock, FiPlayCircle
} from 'react-icons/fi';
import { FaExchangeAlt, FaRegStar, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/common/Logo';
import Confetti from 'react-confetti';
// Sound effects using Web Audio API
const playBeep = (type = 'success') => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(
      type === 'success' ? 800 : 400, 
      audioCtx.currentTime
    );
    
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
    
    return () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  } catch (e) {
    console.warn('Audio playback not supported', e);
  }
};

// Mascot states
const MASCOT_STATES = {
  IDLE: 'idle',
  LISTENING: 'listening',
  THINKING: 'thinking',
  HAPPY: 'happy',
  CELEBRATING: 'celebrating'
};

const Home = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('Twi');
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRecording, setShowRecording] = useState(false);
  const [mascotState, setMascotState] = useState(MASCOT_STATES.IDLE);
  const [favorites, setFavorites] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Sound effects
  const playSuccess = () => playBeep('success');
  const playClick = () => playBeep('click');
  
  // Animation variants
  const bounceTransition = {
    y: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    },
    scale: {
      duration: 0.2,
      type: 'spring',
      stiffness: 200,
      damping: 10
    }
  };

  // Load daily challenge
  useEffect(() => {
    // In a real app, this would come from an API
    const challenge = {
      word: 'Hello',
      translation: 'Mema wo akye',
      language: 'Twi',
      points: 10,
      completed: false
    };
    setDailyChallenge(challenge);
  }, []);

  const languages = [
    'English', 'Twi', 'Ga', 'Ewe', 'Dagbani', 'Dangme',
    'Dagaare', 'Gonja', 'Kasem', 'Nzema', 'Fante',
    'Hausa', 'Konkomba', 'Bimoba', 'Mampruli'
  ];

  // Mock translations
  const translations = {
    'Twi': {
      'hello': 'Mema wo akye',
      'thank you': 'Meda wase',
      'how are you': 'Wo ho te sɛn',
      'good morning': 'Mema wo akye',
      'good night': 'Da yie',
      'water': 'Nsuo',
      'food': 'Aduane',
      'friend': 'Adamfo'
    }
  };

  // Navigation items for sidebar
  const navItems = [
    { icon: <FiHome size={20} />, label: 'Home', path: '/' },
    { icon: <FiBook size={20} />, label: 'Lessons', path: '/lessons' },
    { icon: <FiAward size={20} />, label: 'Achievements', path: '/achievements' },
    { icon: <FiSettings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <FiHelpCircle size={20} />, label: 'Help', path: '/help' },
  ];

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle translation with better logic
  const handleTranslate = () => {
    if (!inputText.trim()) return;
    
    playClick();
    setMascotState(MASCOT_STATES.THINKING);
    setIsTranslating(true);

    setTimeout(() => {
      const lowercaseWord = inputText.toLowerCase().trim();
      let translation = 'Translation not found';
      
      if (translations[toLanguage] && translations[toLanguage][lowercaseWord]) {
        translation = translations[toLanguage][lowercaseWord];
        
        // Add to recent translations if not already there
        const newTranslation = {
          id: Date.now(),
          from: inputText,
          to: translation,
          fromLang: fromLanguage,
          toLang: toLanguage,
          timestamp: new Date().toISOString()
        };
        
        // Save to local storage
        const recent = JSON.parse(localStorage.getItem('recentTranslations') || '[]');
        const updatedRecent = [newTranslation, ...recent].slice(0, 10);
        localStorage.setItem('recentTranslations', JSON.stringify(updatedRecent));
        
        // Play success sound and show confetti for successful translation
        playSuccess();
        setShowConfetti(true);
        setMascotState(MASCOT_STATES.HAPPY);
        setTimeout(() => setMascotState(MASCOT_STATES.IDLE), 2000);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        setMascotState(MASCOT_STATES.IDLE);
      }
      
      setTranslatedText(translation);
      setIsTranslating(false);
    }, 800);
  };
  
  // Toggle favorite
  const toggleFavorite = (translation) => {
    playClick();
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === translation.id);
      if (isFavorite) {
        return prev.filter(fav => fav.id !== translation.id);
      } else {
        return [...prev, { ...translation, isFavorite: true }];
      }
    });
  };
  
  // Start daily challenge
  const startDailyChallenge = () => {
    setShowGame(true);
    setGameScore(0);
  };
  
  // Complete daily challenge
  const completeChallenge = () => {
    playSuccess();
    setDailyChallenge(prev => ({
      ...prev,
      completed: true
    }));
    setShowConfetti(true);
    setMascotState(MASCOT_STATES.CELEBRATING);
    setTimeout(() => {
      setShowConfetti(false);
      setMascotState(MASCOT_STATES.HAPPY);
      setTimeout(() => setMascotState(MASCOT_STATES.IDLE), 1000);
    }, 3000);
  };

  // Handle speech input
  const startListening = () => {
    setShowRecording(true);
  };

  // Handle text-to-speech
  const speakText = (text) => {
    if (!text) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Set voice to a child-friendly voice if available
      const voices = window.speechSynthesis.getVoices();
      const childVoice = voices.find(voice => voice.name.includes('Child') || voice.name.includes('Kids'));
      if (childVoice) {
        utterance.voice = childVoice;
      }
      utterance.rate = 0.9; // Slightly slower for children
      utterance.lang = toLanguage === 'English' ? 'en-US' : 'ak-GH';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Recording Modal
  const RecordingModal = () => (
    <AnimatePresence>
      {showRecording && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowRecording(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-lg p-6 w-5/6 max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-center">Record Your Voice</h3>
            
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <FiMic size={36} className="text-red-600" />
              </div>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-gray-600 mb-1">Say the word or phrase</p>
              <p className="font-bold text-lg">{inputText || "Hello"}</p>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowRecording(false)}
                className="flex-1 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Simulate recording
                  setTimeout(() => {
                    setShowRecording(false);
                    const phrases = [
                      'Hello',
                      'How are you',
                      'Thank you',
                      'Good morning',
                      'Good night'
                    ];
                    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                    setInputText(randomPhrase);
                  }, 1500);
                }}
                className="flex-1 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                <FiMic size={16} className="mr-1" />
                Record
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Mascot component
  const Mascot = ({ state }) => {
    const getMascotEmoji = () => {
      switch(state) {
        case MASCOT_STATES.LISTENING: return '👂';
        case MASCOT_STATES.THINKING: return '🤔';
        case MASCOT_STATES.HAPPY: return '😊';
        case MASCOT_STATES.CELEBRATING: return '🎉';
        default: return '👋';
      }
    };

    return (
      <motion.div 
        className="fixed bottom-6 right-6 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl z-10 cursor-pointer"
        animate={{
          y: [0, -10, 0],
          scale: state === MASCOT_STATES.CELEBRATING ? [1, 1.2, 1] : 1
        }}
        transition={bounceTransition}
        onClick={() => {
          playClick();
          if (state === MASCOT_STATES.IDLE) {
            speakText('Hello! I\'m Lingo, your language learning friend!');
          }
        }}
      >
        {getMascotEmoji()}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
      <Mascot state={mascotState} />
      
      {/* Sound Toggle */}
      <button 
        className="fixed bottom-6 left-6 bg-white p-2 rounded-full shadow-lg z-10"
        onClick={() => {
          playClick();
          // Toggle sound logic here
        }}
      >
        🔈
      </button>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full text-gray-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <FiMenu className="h-6 w-6" />
              </button>
              <div className="ml-4">
                <Logo size="small" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-600 hover:bg-purple-50 relative">
                <FiBell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || 'User'}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    {(user.displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                </div>
              ) : (
                <a
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Sign In
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={toggleSidebar}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <Logo size="small" />
                  <button
                    onClick={toggleSidebar}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <FiX className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {/* Premium Access Section */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                      <FiAward className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-800">Premium Access</h3>
                      <p className="text-sm text-purple-600 mt-1">Unlock all languages and features!</p>
                    </div>
                  </div>
                  <button 
                    className="w-full mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center text-sm"
                    onClick={() => {
                      // TODO: Implement premium subscription flow
                      console.log('Upgrade to Premium clicked');
                    }}
                  >
                    <span className="flex items-center">
                      Upgrade Now
                    </span>
                  </button>
                  <p className="text-xs text-center text-purple-500 mt-2">Cancel anytime</p>
                </div>

                {user && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="mr-3">
                        <FiLogOut className="h-5 w-5" />
                      </span>
                      Sign Out
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Daily Challenge Banner */}
        {dailyChallenge && !dailyChallenge.completed && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 mb-8 shadow-md flex flex-col md:flex-row items-center justify-between"
          >
            <div className="flex items-center mb-4 md:mb-0">
              <FiTrophy className="text-yellow-800 mr-3 text-2xl" />
              <div>
                <h3 className="font-bold text-yellow-900">Daily Challenge!</h3>
                <p className="text-yellow-800 text-sm">Translate "{dailyChallenge.word}" to earn {dailyChallenge.points} points</p>
              </div>
            </div>
            <button 
              onClick={startDailyChallenge}
              className="bg-white text-yellow-700 px-4 py-2 rounded-lg font-medium flex items-center hover:bg-yellow-50 transition-colors"
            >
              <FiPlayCircle className="mr-2" /> Start Challenge
            </button>
          </motion.div>
        )}
        {/* Translation Section - Updated with better design */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-2 p-4 bg-yellow-100 rounded-lg shadow-md mb-6"
        >
          <h2 className="text-xl font-bold text-purple-800 mb-3">Translate Words</h2>
          <div className="flex flex-col space-y-3">
            <select 
              value={toLanguage} 
              onChange={(e) => setToLanguage(e.target.value)}
              className="p-2 border rounded-md bg-white"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Enter an English word or phrase" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
              <button 
                onClick={() => setInputText('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {inputText && <FiX size={18} />}
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={handleTranslate}
                disabled={!inputText.trim() || isTranslating}
                className={`bg-purple-600 text-white py-2 px-4 rounded-md flex-grow flex items-center justify-center ${!inputText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
              >
                {isTranslating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Translating...
                  </>
                ) : 'Translate'}
              </button>
              
              <button
                onClick={startListening}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                <FiMic size={20} />
              </button>
            </div>
            
            {translatedText && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-white rounded-md shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{translatedText}</span>
                  <button 
                    onClick={() => speakText(translatedText)}
                    className="text-blue-500 p-1 hover:bg-blue-50 rounded-full"
                    aria-label="Listen to translation"
                  >
                    <FiVolume2 size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
              <FiStar className="text-yellow-500 mr-2" /> Favorites
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {favorites.slice(0, 4).map((fav, index) => (
                <motion.div 
                  key={fav.id || index}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-3 rounded-lg shadow-sm border border-yellow-100"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800">{fav.from}</span>
                    <button 
                      onClick={() => toggleFavorite(fav)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <FaStar />
                    </button>
                  </div>
                  <p className="text-sm text-purple-600">{fav.to}</p>
                  <p className="text-xs text-gray-400 mt-1">{fav.toLang}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Learning Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6"
        >
          <h2 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
            <FiPlayCircle className="mr-2 text-purple-600" />
            🚀 Quick Start Lessons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { 
                id: 1, 
                title: '👋 Greetings & Hello', 
                progress: 75, 
                color: 'green',
                words: '12/15',
                onClick: () => { playClick(); setInputText('Hello'); setToLanguage('Twi'); }
              },
              { 
                id: 2, 
                title: '🔢 Fun with Numbers', 
                progress: 40, 
                color: 'blue',
                words: '8/20',
                onClick: () => { playClick(); setInputText('Numbers'); setToLanguage('Twi'); }
              },
              { 
                id: 3, 
                title: '👨‍👩‍👧‍👦 My Family', 
                progress: 30, 
                color: 'purple',
                words: '6/20',
                onClick: () => { playClick(); setInputText('Family'); setToLanguage('Twi'); }
              },
              { 
                id: 4, 
                title: '🐘 Animals & Friends', 
                progress: 60, 
                color: 'yellow',
                words: '12/20',
                onClick: () => { playClick(); setInputText('Animals'); setToLanguage('Twi'); }
              },
              { 
                id: 5, 
                title: '🍎 Yummy Foods', 
                progress: 50, 
                color: 'red',
                words: '10/20',
                onClick: () => { playClick(); setInputText('Food'); setToLanguage('Twi'); }
              },
              { 
                id: 6, 
                title: '🙋‍♂️ Body Parts', 
                progress: 25, 
                color: 'pink',
                words: '5/20',
                onClick: () => { playClick(); setInputText('Body'); setToLanguage('Twi'); }
              },
              { 
                id: 7, 
                title: '📅 Days of the Week', 
                progress: 15, 
                color: 'indigo',
                words: '3/7',
                onClick: () => { playClick(); setInputText('Monday'); setToLanguage('Twi'); }
              },
              { 
                id: 8, 
                title: '🌈 Colors', 
                progress: 35, 
                color: 'indigo',
                words: '7/20',
                onClick: () => { playClick(); setInputText('Colors'); setToLanguage('Twi'); }
              },
              { 
                id: 9, 
                title: '📆 Months of the Year', 
                progress: 10, 
                color: 'teal',
                words: '2/12',
                onClick: () => { playClick(); setInputText('January'); setToLanguage('Twi'); }
              },
            ].map((lesson) => (
              <motion.div 
                key={lesson.id}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-br from-${lesson.color}-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-${lesson.color}-100`}
                onClick={lesson.onClick}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">{lesson.title}</h3>
                  <span className="text-xs bg-white text-gray-600 px-2 py-1 rounded-full border border-gray-200">{lesson.words} words</span>
                </div>
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-2 bg-${lesson.color}-500 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${lesson.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-medium text-gray-700">{lesson.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Recording Modal */}
      <RecordingModal />
      
      {/* Daily Challenge Game Modal */}
      <AnimatePresence>
        {showGame && dailyChallenge && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowGame(false)}
          >
            <motion.div 
              className="bg-white rounded-2xl p-6 w-full max-w-md relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowGame(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-3xl text-yellow-500 mx-auto mb-4">
                  🏆
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Challenge</h3>
                <p className="text-gray-600">Translate this word to earn {dailyChallenge.points} points!</p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 mb-6 text-center">
                <p className="text-lg font-medium text-purple-800">{dailyChallenge.word}</p>
                <p className="text-sm text-purple-500 mt-1">in {dailyChallenge.language}</p>
              </div>
              
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder={`Type the translation in ${dailyChallenge.language}...`}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button 
                  onClick={completeChallenge}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 flex items-center justify-center"
                >
                  <FiCheck className="mr-2" /> Submit Answer
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Score: {gameScore} points</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(gameScore / 100) * 100}%` }}></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;