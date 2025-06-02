import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FiMic, FiVolume2, FiSend, FiStar, FiHeart, FiClock, FiPlayCircle, FiAlertCircle, FiHome, FiBook, FiAward, FiSettings, FiHelpCircle
} from 'react-icons/fi';
import { FaExchangeAlt, FaRegStar, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import Navigation from '../components/common/Navigation';
import { translateText } from '../service/gnlp';
import { startRecording, textToSpeech, transcribeAudio } from '../service/voice';

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
  const [toLanguage, setToLanguage] = useState('Twi');
  const fromLanguage = 'English'; // Always set to English
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRecording, setShowRecording] = useState(false);
  const [mascotState, setMascotState] = useState(MASCOT_STATES.IDLE);
  const [favorites, setFavorites] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [error, setError] = useState(null);
  const [availableLanguages, setAvailableLanguages] = useState({
    'en': 'English',
    'tw': 'Twi',
    'ee': 'Ewe',
    'gaa': 'Ga',
    'fat': 'Fante',
    'yo': 'Yoruba',
    'dag': 'Dagbani',
    'ki': 'Kikuyu',
    'gur': 'Gurune',
    'luo': 'Luo',
    'mer': 'Kimeru',
    'kus': 'Kusaal'
  });
  const [languageCodeMap, setLanguageCodeMap] = useState({});
  
  // Initialize language code mapping
  useEffect(() => {
    const codeMap = {};
    Object.entries(availableLanguages).forEach(([code, name]) => {
      codeMap[name] = code;
    });
    setLanguageCodeMap(codeMap);
  }, [availableLanguages]);

  // Load available languages from API on component mount
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const langs = await import('../service/gnlp').then(m => m.fetchLanguages());
        setAvailableLanguages(langs);
      } catch (err) {
        console.error('Failed to load languages, using defaults', err);
        // Continue with default languages
      }
    };
    
    loadLanguages();
  }, []);

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

  // Handle translation with GNLP API
  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    playClick();
    setMascotState(MASCOT_STATES.THINKING);
    setIsTranslating(true);
    setError(null);
    
    try {
      // Get language codes from language names
      const sourceLangCode = languageCodeMap[fromLanguage] || 'en';
      const targetLangCode = languageCodeMap[toLanguage] || 'tw';
      console.log('Calling translateText with:', { 
        text: inputText, 
        sourceLang: 'en', 
        targetLang: targetLangCode 
      });
      
      const result = await translateText(inputText, 'en', targetLangCode);
      console.log('Translation result:', result);
      
      if (!result) {
        throw new Error('No translation returned from the API');
      }
      
      setTranslatedText(result);
      console.log('translatedText state set to:', result);
      
      setMascotState(MASCOT_STATES.HAPPY);
      playSuccess();
      
      // Show confetti for successful translation
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
    } catch (error) {
      console.error('Translation error:', error);
      setError(error.message || 'Translation failed. Please try again.');
      setMascotState(MASCOT_STATES.IDLE);
      setTranslatedText(''); // Clear any previous translation on error
    } finally {
      setIsTranslating(false);
    }
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

  // Handle speech input - now using direct microphone access
  const startListening = () => {
    toggleRecording();
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
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                onClick={stopRecording}
              >
                Stop Recording
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Mascot component
  const Mascot = ({ state = MASCOT_STATES.IDLE }) => {
    const getMascotEmoji = () => {
      switch(state) {
        case MASCOT_STATES.LISTENING:
          return (
            <motion.div 
              className="relative"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-4xl">👂</span>
              <motion.div 
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          );
        case MASCOT_STATES.THINKING:
          return (
            <motion.div 
              className="relative"
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-4xl">🤔</span>
            </motion.div>
          );
        case MASCOT_STATES.SPEAKING:
          return (
            <motion.div 
              className="relative"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <span className="text-4xl">💬</span>
              <motion.div 
                className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          );
        case MASCOT_STATES.HAPPY:
          return (
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <span className="text-4xl">😊</span>
            </motion.div>
          );
        case MASCOT_STATES.CELEBRATING:
          return (
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <span className="text-4xl">🎉</span>
            </motion.div>
          );
        default:
          return (
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-4xl">👋</span>
            </motion.div>
          );
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
            speakText('Hello! I\'m KasaLingo, your language learning friend!');
          }
        }}
      >
        {getMascotEmoji()}
      </motion.div>
    );
  };

  // Handle play audio
  const handlePlayAudio = () => {
    if (!translatedText) return;
    
    setIsPlaying(true);
    const audio = new Audio();
    audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&q=${translatedText}&tl=${languageCodeMap[toLanguage] || 'tw'}&client=tw-ob`;
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  // Handle recording functionality
  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording if already recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      setMascotState(MASCOT_STATES.THINKING);
      return;
    }

    // Start new recording
    try {
      setError(null);
      setIsRecording(true);
      setMascotState(MASCOT_STATES.LISTENING);
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      let audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        
        try {
          // Transcribe the recorded audio
          const text = await transcribeAudio(audioBlob, 'en'); // Always assume English input
          if (text) {
            setInputText(prev => prev ? `${prev} ${text}` : text);
            // Auto-trigger translation
            setTimeout(() => {
              handleTranslate();
            }, 500);
          }
        } catch (err) {
          console.error('Transcription error:', err);
          setError('Could not transcribe audio. Please try again.');
        } finally {
          setMascotState(MASCOT_STATES.IDLE);
          setIsRecording(false);
          // Stop all tracks to release the microphone
          stream.getTracks().forEach(track => track.stop());
        }
      };

      // Start recording
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;

      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 10000);
      
    } catch (error) {
      console.error('Recording error:', error);
      setError(error.message || 'Could not access microphone. Please check permissions.');
      setIsRecording(false);
      setMascotState(MASCOT_STATES.IDLE);
    }
  };

  // Debug effect to log state changes and API config
  useEffect(() => {
    console.log('translatedText changed:', translatedText);
    console.log('API Configuration:', {
      baseURL: import.meta.env.VITE_GNLP_BASE_URL,
      hasApiKey: !!import.meta.env.VITE_GNLP_API_KEY,
      env: import.meta.env
    });
  }, [translatedText]);

  // Clean up confetti and audio on unmount
  useEffect(() => {
    return () => {
      setShowConfetti(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

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

      {/* Navigation */}
      <Navigation />


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
              <FiAward className="text-yellow-800 mr-3 text-2xl" />
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
          <h2 className="text-xl font-bold text-purple-800 mb-3">Translate from English to:</h2>
          <div className="flex flex-col space-y-3">
            <div className="bg-white rounded-lg px-4 py-2 border border-gray-300">
              English
            </div>
            <select 
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              className="bg-white rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(availableLanguages)
                .filter(([code]) => code !== 'en') // Exclude English from target languages
                .map(([code, name]) => (
                  <option key={`to-${code}`} value={name}>
                    {name}
                  </option>
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
              {/* Test Translation Button - Remove in production */}
              <button 
                onClick={() => {
                  console.log('Test translation button clicked');
                  setInputText('Hello');
                  setTimeout(() => handleTranslate(), 100);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Test Translation
              </button>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTranslate}
                  disabled={isTranslating}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isTranslating ? 'Translating...' : 'Translate'}
                  <FiSend />
                </button>
                <button
                  onClick={toggleRecording}
                  disabled={isTranslating}
                  className={`p-3 rounded-full transition-all ${
                    isRecording 
                      ? 'animate-pulse bg-red-500 text-white' 
                      : 'bg-white text-purple-600 hover:bg-gray-100 shadow-md'
                  }`}
                  title={isRecording ? 'Stop recording' : 'Record voice'}
                >
                  <FiMic className={isRecording ? 'text-white' : 'text-purple-600'} />
                </button>
                {translatedText && (
                  <button
                    onClick={handlePlayAudio}
                    disabled={isPlaying}
                    className={`p-3 rounded-full transition-all ${
                      isPlaying 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-white text-purple-600 hover:bg-gray-100 shadow-md'
                    }`}
                    title="Listen to translation"
                  >
                    <FiVolume2 className={isPlaying ? 'animate-pulse' : ''} />
                  </button>
                )}
              </div>
              {error && (
                <div className="flex items-center text-red-500 text-sm">
                  <FiAlertCircle className="mr-1" />
                  {error}
                </div>
              )}
            </div>
            
            {/* Translation Result Section - Always show when there's content */}
            <div className="mt-6">
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: translatedText ? 1 : 0.5, 
                  height: translatedText ? 'auto' : 100,
                  padding: translatedText ? '1rem' : '0.5rem'
                }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl shadow-md overflow-hidden ${
                  translatedText 
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100' 
                    : 'bg-gray-100 border-2 border-dashed border-gray-300'
                }`}
              >
                <div className="flex flex-col">
                  {translatedText ? (
                    <>
                      <h3 className="text-sm font-semibold text-purple-700 mb-2 flex items-center">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Translation in {toLanguage}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">{translatedText}</span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(translatedText);
                            playBeep('success');
                          }}
                          className="text-purple-600 hover:bg-purple-50 p-2 rounded-full transition-colors"
                          title="Copy to clipboard"
                          aria-label="Copy translation"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => speakText(translatedText)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
                          title="Listen to translation"
                          aria-label="Listen to translation"
                        >
                          <FiVolume2 size={20} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 text-center">
                        {isTranslating ? 'Translating...' : 'Translation will appear here'}
                      </p>
                    </div>
                  )}
                </div>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-0.5 bg-gradient-to-r from-purple-200 to-blue-200 mt-3"
                />
              </motion.div>
            </div>
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