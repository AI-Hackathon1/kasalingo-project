import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiMenu, FiBell, FiMic, FiX, FiVolume2, FiSend, 
  FiHome, FiBook, FiAward, FiSettings, FiHelpCircle, FiLogOut 
} from 'react-icons/fi';
import { FaExchangeAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/common/Logo';
import Confetti from 'react-confetti';

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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const languages = [
    'English', 'Twi', 'Ga', 'Ewe', 'Dagbani', 'Dangme',
    'Dagaare', 'Gonja', 'Kasem', 'Nzema', 'Fante',
    'Hausa', 'Konkomba', 'Bimoba', 'Mampruli'
  ];

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

  // Swap source and target languages
  const swapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  // Handle translation
  const handleTranslate = () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);

    // Simulate translation API call
    setTimeout(() => {
      setTranslatedText(`Translated: ${inputText} (${fromLanguage} → ${toLanguage})`);
      setIsTranslating(false);
      setShowConfetti(true);
      
      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1500);
  };

  // Handle speech input
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    setIsListening(true);
    
    // Simulate speech recognition
    setTimeout(() => {
      const phrases = [
        'Hello, how are you?',
        'What is your name?',
        'I love learning languages',
        'How do you say thank you?',
        'Can you help me with my homework?'
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setInputText(prev => prev ? `${prev} ${randomPhrase}` : randomPhrase);
      setIsListening(false);
    }, 1500);
  };

  // Handle text-to-speech
  const speakText = (text, lang) => {
    if (!text) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Set language based on selection
      utterance.lang = lang === 'English' ? 'en-US' : 'ak-GH';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden">
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
                {user && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
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
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Language Translator
            </h1>
            
            {/* Language Selection */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
              <div className="w-full md:w-1/3">
                <label htmlFor="from-language" className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <select
                  id="from-language"
                  value={fromLanguage}
                  onChange={(e) => setFromLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={`from-${lang}`} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={swapLanguages}
                className="p-2 bg-gray-100 rounded-full hover:bg-purple-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Swap languages"
              >
                <FaExchangeAlt className="h-5 w-5 text-purple-600" />
              </button>
              
              <div className="w-full md:w-1/3">
                <label htmlFor="to-language" className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <select
                  id="to-language"
                  value={toLanguage}
                  onChange={(e) => setToLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {languages
                    .filter(lang => lang !== fromLanguage)
                    .map((lang) => (
                      <option key={`to-${lang}`} value={lang}>
                        {lang}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            
            {/* Translation Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="input-text" className="block text-sm font-medium text-gray-700">
                    {fromLanguage}
                  </label>
                  <button
                    onClick={startListening}
                    disabled={isListening}
                    className={`p-1.5 rounded-full ${isListening ? 'bg-red-100 text-red-600' : 'text-purple-600 hover:bg-purple-50'} transition-colors`}
                    aria-label={isListening ? 'Listening...' : 'Start voice input'}
                  >
                    <FiMic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
                <div className="relative">
                  <textarea
                    id="input-text"
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder={`Type or speak in ${fromLanguage}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  {inputText && (
                    <button
                      onClick={() => setInputText('')}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      aria-label="Clear text"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="translated-text" className="block text-sm font-medium text-gray-700">
                    {toLanguage}
                  </label>
                  <button
                    onClick={() => speakText(translatedText, toLanguage)}
                    disabled={!translatedText}
                    className={`p-1.5 rounded-full ${translatedText ? 'text-purple-600 hover:bg-purple-50' : 'text-gray-400'} transition-colors`}
                    aria-label="Listen to translation"
                  >
                    <FiVolume2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="relative">
                  <div
                    id="translated-text"
                    className="w-full min-h-[150px] max-h-[150px] px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto"
                  >
                    {isTranslating ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-pulse flex space-x-2">
                          <div className="h-2 w-2 bg-purple-400 rounded-full"></div>
                          <div className="h-2 w-2 bg-purple-500 rounded-full delay-100"></div>
                          <div className="h-2 w-2 bg-purple-600 rounded-full delay-200"></div>
                        </div>
                      </div>
                    ) : translatedText ? (
                      translatedText
                    ) : (
                      <p className="text-gray-400">Translation will appear here...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Translate Button */}
            <div className="flex justify-center">
              <motion.button
                onClick={handleTranslate}
                disabled={!inputText.trim() || isTranslating}
                className={`px-8 py-3 rounded-full font-medium text-white shadow-lg ${
                  !inputText.trim() || isTranslating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90'
                } transition-all duration-200 flex items-center`}
                whileHover={!isTranslating && inputText.trim() ? { scale: 1.05 } : {}}
                whileTap={!isTranslating && inputText.trim() ? { scale: 0.95 } : {}}
              >
                {isTranslating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Translating...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Translate
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
