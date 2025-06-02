import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, CheckCircle, X, Mic, MicOff, Star, Trophy, Sparkles, Award, Zap, Heart, Smile, ChevronRight, Clock, Lightbulb } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const bounceTransition = {
  y: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut'
  }
};

// Helper function to shuffle array
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const LearnAndQuiz = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState('learning');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load lesson data
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const fetchLesson = async () => {
      try {
        // Simulate API call
        // const response = await fetch(`/api/lessons/${lessonId}`);
        // const data = await response.json();
        // setLesson(data);
        
        // For now, using mock data
        const mockLesson = {
          id: lessonId,
          title: 'Sample Lesson',
          content: {
            interactive: [
              {
                type: 'matching',
                title: 'Match the Words',
                instruction: 'Match the Twi words with their English translations',
                pairs: [
                  { twi: 'Me din de...', english: 'My name is...' },
                  { twi: 'Wo ho te sɛn?', english: 'How are you?' },
                  { twi: 'Meda wo ase', english: 'Thank you' },
                  { twi: 'Mepa wo kyɛw', english: 'Please' },
                  { twi: 'Aane', english: 'Yes' },
                  { twi: 'Daabi', english: 'No' },
                ]
              }
            ]
          }
        };
        
        setLesson(mockLesson);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lesson:', error);
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const speakWord = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const renderInteractivePhase = () => {
    // Early return if no interactive activities are available
    if (!lesson?.content?.interactive?.length) {
      return (
        <motion.div 
          className="flex flex-col items-center justify-center p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Lightbulb className="h-12 w-12 text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Interactive Content</h3>
          <p className="text-gray-600 mb-6">This lesson doesn't have any interactive activities yet.</p>
          <Button 
            onClick={() => setCurrentPhase('quiz')}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Continue to Quiz
          </Button>
        </motion.div>
      );
    }
    
    const activity = lesson.content.interactive[0];
    
    if (activity.type === 'matching') {
      // Matching game UI
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{activity.title}</h2>
            <p className="text-gray-600">{activity.instruction}</p>
          </div>
          
          <div className="space-y-3">
            {activity.pairs?.map((pair, index) => (
              <motion.div 
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                whileHover={{ scale: 1.01 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => speakWord(pair.twi)}
                    className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors mr-3"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                  <span className="font-medium">{pair.twi}</span>
                </div>
                <div className="text-gray-400">
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="font-medium text-gray-700">{pair.english}</div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button 
                onClick={() => setCurrentPhase('quiz')}
                className="group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span className="relative">
                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-xl">📝</span>
                  <span className="ml-2">Take the Quiz!</span>
                  <ChevronRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    // Default view for other activity types
    return (
      <div className="text-center p-8">
        <Lightbulb className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Activity Type Not Supported</h3>
        <p className="text-gray-600 mb-6">This type of interactive activity is not yet supported.</p>
        <Button 
          onClick={() => setCurrentPhase('quiz')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Continue to Quiz
        </Button>
      </div>
    );
  };

  // Render the current phase
  const renderPhase = () => {
    switch (currentPhase) {
      case 'interactive':
        return renderInteractivePhase();
      // Add other phase renderers here
      default:
        return (
          <div className="text-center p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Lesson Content</h3>
            <Button 
              onClick={() => setCurrentPhase('interactive')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Start Interactive Activity
            </Button>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Lesson Not Found</h3>
        <p className="text-gray-600 mb-6">The requested lesson could not be found.</p>
        <Button onClick={() => navigate('/lessons')} className="bg-blue-500 hover:bg-blue-600 text-white">
          Back to Lessons
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => navigate(-1)} 
            variant="ghost" 
            className="flex items-center text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((star) => (
              <Star 
                key={star} 
                className={`h-6 w-6 ${star <= starsEarned ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
        
        {renderPhase()}
      </motion.div>
    </div>
  );
};

export default LearnAndQuiz;
