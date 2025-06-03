import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Star,
  ArrowLeft,
  Mic,
  CheckCircle,
  X
} from 'lucide-react';

// Animation variants for smooth transitions
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const LearnAndQuiz = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  // Quiz questions
  const quizQuestions = [
    {
      question: 'How do you say "Thank you" in Twi?',
      options: ['Mepa wo kyɛw', 'Meda wo ase', 'Wo ho te sɛn?', 'Aane'],
      correctAnswer: 'Meda wo ase',
      audio: 'thank_you.mp3'
    },
    {
      question: 'What does "Mepa wo kyɛw" mean?',
      options: ['Thank you', 'Please', 'Goodbye', 'Hello'],
      correctAnswer: 'Please',
      audio: 'please.mp3'
    },
    {
      question: 'How do you ask "How are you?" in Twi?',
      options: ['Me din de...', 'Wo ho te sɛn?', 'Daabi', 'Aane'],
      correctAnswer: 'Wo ho te sɛn?',
      audio: 'how_are_you.mp3'
    }
  ];

  // Define lesson content outside of state to avoid recreation on each render
  const initialLessonContent = {
    id: 'basic-greetings',
    title: 'Basic Twi Greetings',
    description: 'Learn common Twi greetings and phrases',
    sections: [
      {
        title: 'Welcome to Twi! 👋',
        content: 'Let\'s learn some basic Twi greetings. Twi is a dialect of Akan spoken in Ghana.',
        type: 'intro',
        emoji: '👋'
      },
      {
        title: 'Greeting People 🙋‍♂️',
        content: 'Here are some common Twi greetings:',
        type: 'lesson',
        words: [
          { twi: 'Maakye', english: 'Good morning', pronunciation: 'Mah-chay', emoji: '🌅' },
          { twi: 'Maaha', english: 'Good afternoon', pronunciation: 'Mah-ha', emoji: '☀️' },
          { twi: 'Maadwo', english: 'Good evening/night', pronunciation: 'Mah-jwoh', emoji: '🌙' },
          { twi: 'Me ma wo akye', english: 'I greet you this morning', pronunciation: 'Meh mah woh ah-chay', emoji: '🙏' }
        ]
      },
      {
        title: 'Asking How Someone Is ❓',
        content: 'Let\'s learn how to ask someone how they are:',
        type: 'lesson',
        words: [
          { twi: 'Ɛte sɛn?', english: 'How are you?', pronunciation: 'Eh-teh sen', emoji: '😊' },
          { twi: 'Wo ho te sɛn?', english: 'How are you? (polite)', pronunciation: 'Woh hoh teh sen', emoji: '🙂' }
        ]
      },
      {
        title: 'Responding to Greetings 💬',
        content: 'Here\'s how to respond when someone greets you:',
        type: 'lesson',
        words: [
          { twi: 'Me ho yɛ', english: 'I am fine', pronunciation: 'Meh ho yeh', emoji: '👍' },
          { twi: 'Ɛyɛ', english: 'It\'s fine/okay', pronunciation: 'Eh-yeh', emoji: '👌' },
          { twi: 'Medaase', english: 'Thank you', pronunciation: 'Meh-dah-say', emoji: '🙏' }
        ]
      },
      {
        title: 'Practice Time! 🎤',
        content: 'Let\'s practice what we\'ve learned. Tap the speaker to hear each phrase.',
        type: 'practice',
        words: [
          { twi: 'Maakye', english: 'Good morning' },
          { twi: 'Ɛte sɛn?', english: 'How are you?' },
          { twi: 'Me ho yɛ', english: 'I am fine' },
          { twi: 'Medaase', english: 'Thank you' }
        ]
      },
      {
        title: 'Quick Review 📝',
        content: 'Match the Twi phrases with their English meanings.',
        type: 'review',
        pairs: [
          { twi: 'Maakye', english: 'Good morning' },
          { twi: 'Ɛte sɛn?', english: 'How are you?' },
          { twi: 'Me ho yɛ', english: 'I am fine' },
          { twi: 'Medaase', english: 'Thank you' }
        ]
      },
      {
        title: 'Great Job! 🎉',
        content: 'You\'ve completed the lesson! Ready to test your knowledge with a quiz?',
        type: 'completion'
      }
    ]
  };

  // State management
  const [state, setState] = useState({
    currentSection: 0,
    completedLesson: false,
    showCelebration: false,
    lesson: initialLessonContent,
    loading: false
  });

  // Destructure state for easier access
  const { currentSection, completedLesson, showCelebration, lesson, loading } = state;
  const currentData = lesson.sections[currentSection];

  // Navigation handlers
  const handleNext = () => {
    setState(prev => {
      const nextSection = prev.currentSection + 1;
      
      // If there are more sections, move to the next one
      if (nextSection < prev.lesson.sections.length) {
        return {
          ...prev,
          currentSection: nextSection
        };
      }
      
      // If this was the last section, mark as completed
      return {
        ...prev,
        completedLesson: true,
        showCelebration: true
      };
    });
  };

  const handlePrevious = () => {
    setState(prev => ({
      ...prev,
      currentSection: Math.max(0, prev.currentSection - 1)
    }));
  };

  // Render the current section based on its type
  const renderSection = () => {
    if (!currentData) return null;

    switch (currentData.type) {
      case 'intro':
        return (
          <motion.div 
            className="flex flex-col items-center justify-center text-center p-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="text-6xl mb-6">{currentData.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{currentData.title}</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">{currentData.content}</p>
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 text-lg font-semibold rounded-lg shadow-md"
            >
              Start Learning
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        );

      case 'lesson':
        return (
          <div className="space-y-6">
            <motion.div 
              className="text-center mb-8"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-3">{currentData.title}</h2>
              <p className="text-lg text-gray-600">{currentData.content}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentData.words.map((word, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                  variants={slideUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => playWordSound(word.twi)}
                    className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors mr-4"
                  >
                    <Volume2 className="h-6 w-6" />
                  </button>
                  <div className="text-left">
                    <div className="font-semibold text-lg text-gray-800">{word.twi}</div>
                    <div className="text-sm text-gray-500">{word.english}</div>
                    {word.pronunciation && (
                      <div className="text-xs text-gray-400 mt-1">
                        Pronounced: <span className="italic">{word.pronunciation}</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-auto text-2xl">{word.emoji}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'practice':
        return (
          <div className="space-y-6">
            <motion.div 
              className="text-center mb-8"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-3">{currentData.title}</h2>
              <p className="text-lg text-gray-600">{currentData.content}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-4">
              {currentData.words.map((word, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                  variants={slideUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => playWordSound(word.twi)}
                      className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors mr-4"
                    >
                      <Volume2 className="h-6 w-6" />
                    </button>
                    <div>
                      <div className="font-semibold text-lg text-gray-800">{word.twi}</div>
                      <div className="text-sm text-gray-500">{word.english}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-indigo-500">
                    <Mic className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'completion':
        return (
          <motion.div 
            className="flex flex-col items-center justify-center text-center p-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Great Job!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              You've completed the lesson! Ready to test your knowledge with a quiz?
            </p>
            <Button 
              onClick={() => navigate('/quiz')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 text-lg font-semibold rounded-lg shadow-md"
            >
              Start Quiz
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Navigation buttons component
  const NavigationButtons = () => (
    <div className="flex justify-between mt-8">
      <Button 
        onClick={handlePrevious} 
        disabled={currentSection === 0}
        variant="outline"
        className={`${currentSection === 0 ? 'invisible' : ''} min-w-[120px]`}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      
      <Button 
        onClick={handleNext}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white min-w-[120px]"
      >
        {currentSection < lesson.sections.length - 1 ? 'Next' : 'Finish'}
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Render lesson not found state
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

  // Main render
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
                className={`h-6 w-6 ${star <= 3 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
        
        {renderSection()}
        
        {currentData?.type !== 'intro' && currentData?.type !== 'completion' && <NavigationButtons />}
      </motion.div>
    </div>
  );
};

// Mock lesson data - in a real app, this would come from an API
const lessonData = {
  id: '1',
          title: 'Basic Twi Greetings',
          description: 'Learn common Twi greetings and phrases',
          sections: [
            {
              type: 'intro',
              title: 'Welcome to Twi Greetings',
              content: 'In this lesson, you will learn basic Twi greetings and how to introduce yourself.'
            },
            {

  const lessonContent = {
    title: "Basic Greetings in Twi",
    description: "Learn how to greet people in Twi!",
    sections: [
      {
        title: "Welcome! 👋",
        content: "Let's learn some basic Twi greetings. Listen carefully and repeat after me!",
        type: "intro",
        emoji: "👋"
      },
      {
        title: "Greeting People 🌅",
        content: "In Twi, we greet differently based on the time of day:",
        type: "lesson",
        words: [
          { twi: "Maakye", english: "Good morning", pronunciation: "Mah-chi", emoji: "🌅" },
          { twi: "Maaha", english: "Good afternoon", pronunciation: "Mah-ha", emoji: "☀️" },
          { twi: "Maadwo", english: "Good evening/night", pronunciation: "Mah-joh", emoji: "🌙" }
        ]
      },
      {
        title: "Asking How Someone Is ❓",
        content: "Let's learn how to ask someone how they are:",
        type: "lesson",
        words: [
          { twi: "Ɛte sɛn?", english: "How are you?", pronunciation: "Eh-teh sen", emoji: "😊" },
          { twi: "Wo ho te sɛn?", english: "How are you? (polite)", pronunciation: "Woh hoh teh sen", emoji: "🙂" }
        ]
      },
      {
        title: "Responding to Greetings 💬",
        content: "Here's how to respond when someone greets you:",
        type: "lesson",
        words: [
          { twi: "Me ho yɛ", english: "I am fine", pronunciation: "Meh ho yeh", emoji: "👍" },
          { twi: "Ɛyɛ", english: "It's fine/okay", pronunciation: "Eh-yeh", emoji: "👌" },
          { twi: "Medaase", english: "Thank you", pronunciation: "Meh-dah-say", emoji: "🙏" }
        ]
      },
      {
        title: "Practice Time! 🎤",
        content: "Let's practice what we've learned. Tap the speaker to hear each phrase.",
        type: "practice",
        words: [
          { twi: "Maakye", english: "Good morning" },
          { twi: "Ɛte sɛn?", english: "How are you?" },
          { twi: "Me ho yɛ", english: "I am fine" },
          { twi: "Medaase", english: "Thank you" }
        ]
      },
      {
        title: "Quick Review 📝",
        content: "Match the Twi phrases with their English meanings.",
        type: "review",
        pairs: [
          { twi: "Maakye", english: "Good morning" },
          { twi: "Ɛte sɛn?", english: "How are you?" },
          { twi: "Me ho yɛ", english: "I am fine" },
          { twi: "Medaase", english: "Thank you" }
        ]
      },
      {
        title: "Great Job! 🎉",
        content: "You've completed the lesson! Ready to test your knowledge with a quiz?",
        type: "completion"
      }
    ]
  };

  const quizQuestions = [
    {
      question: 'How do you say "Thank you" in Twi?',
      options: ['Mepa wo kyɛw', 'Meda wo ase', 'Wo ho te sɛn?', 'Aane'],
      correctAnswer: 'Meda wo ase',
      audio: 'thank_you.mp3'
    },
    {
      question: 'What does "Mepa wo kyɛw" mean?',
      options: ['Thank you', 'Please', 'Goodbye', 'Hello'],
      correctAnswer: 'Please',
      audio: 'please.mp3'
    },
    {
      question: 'How do you ask "How are you?" in Twi?',
      options: ['Me din de...', 'Wo ho te sɛn?', 'Daabi', 'Aane'],
      correctAnswer: 'Wo ho te sɛn?',
      audio: 'how_are_you.mp3'
    }
  ];

  const NavigationButtons = () => (
    <div className="flex justify-between mt-8">
      <Button 
        onClick={handlePrevious} 
        disabled={currentSection === 0}
        variant="outline"
        className={`${currentSection === 0 ? 'invisible' : ''} min-w-[120px]`}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      
      <Button 
        onClick={handleNext}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white min-w-[120px]"
      >
        {currentSection < lessonContent.sections.length - 1 ? 'Next' : 'Finish'}
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  const playWordSound = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'ak-GH'; // Twi language code
      utterance.rate = 0.8; // Slightly slower for better understanding
      window.speechSynthesis.speak(utterance);
    }
  };

  // Fetch lesson data when component mounts
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // In a real app, you would fetch this from an API
        // const response = await fetch(`/api/lessons/${lessonId}`);
        // const data = await response.json();
        // setState(prev => ({ ...prev, lesson: data }));
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleCardClick = (index, isTwi) => {
    if (selectedCard && selectedCard.index === index && selectedCard.isTwi === isTwi) {
      setSelectedCard(null);
      return;
    }

    if (selectedCard) {
      const currentPair = currentData.pairs[isTwi ? selectedCard.index : index];
      const selectedPair = currentData.pairs[isTwi ? index : selectedCard.index];
      
      if ((isTwi ? currentPair : selectedPair).english === (isTwi ? selectedPair : currentPair).twi) {
        setMatchedPairs([...matchedPairs, currentPair.twi]);
      }
      
      setTimeout(() => setSelectedCard(null), 1000);
    } else {
      setSelectedCard({ index, isTwi });
    }
  };

  const handleAnswerSelect = (answer) => {
    if (isAnswerSelected) return;
    
    const correct = answer === quizQuestions[currentQuestionIndex].correctAnswer;
    
    setIsAnswerSelected(true);
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswerSelected(false);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setLesson(lessonContent);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lesson:', error);
        setLoading(false);
      }
    };

    fetchLesson();
  }, []);

  useEffect(() => {
    setCurrentData(lessonContent.sections[currentSection]);
  }, [currentSection]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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

  const renderSection = () => {
    switch (currentData.type) {
      case 'intro':
        return (
          <div className="space-y-6">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-3">{currentData.title}</h2>
              <p className="text-lg text-gray-600">{currentData.content}</p>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-4">
              {currentData.words.map((word, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => playWordSound(word.twi)}
                      className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors mr-4"
                    >
                      <Volume2 className="h-6 w-6" />
                    </button>
                    <div>
                      <div className="font-semibold text-lg text-gray-800">{word.twi}</div>
                      <div className="text-sm text-gray-500">{word.english}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-indigo-500">
                    <Mic className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'lesson':
        return (
          <div className="flex flex-col h-full">
            <div className="max-w-3xl mx-auto p-6 flex-1">
              <motion.div 
                className="mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-3">{currentData.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{currentData.content}</p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {currentData.words.map((word, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-indigo-600">{word.twi}</h3>
                        <span className="text-2xl">{word.emoji}</span>
                      </div>
                      <p className="text-gray-700">{word.english}</p>
                      <p className="text-sm text-gray-500 mt-1">Pronunciation: {word.pronunciation}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-indigo-600 hover:bg-indigo-50"
                        onClick={() => playWordSound(word.english)}
                      >
                        <Volume2 className="mr-2 h-4 w-4" />
                        Hear it
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="p-6 border-t">
              <NavigationButtons />
            </div>
          </div>
        );

      case 'practice':
        return (
          <div className="flex flex-col h-full">
            <div className="max-w-3xl mx-auto p-6 flex-1">
              <motion.div 
                className="mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-3">{currentData.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{currentData.content}</p>
                
                <div className="space-y-4">
                  {currentData.words?.map((word, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{word.twi}</h3>
                        <p className="text-gray-600">{word.english}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-indigo-600 hover:bg-indigo-50"
                        onClick={() => playWordSound(word.english)}
                      >
                        <Volume2 className="mr-2 h-4 w-4" />
                        Hear it
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="p-6 border-t">
              <NavigationButtons />
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <motion.div 
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-3">{currentData.title}</h2>
              <p className="text-lg text-gray-600">{currentData.content}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentData.pairs.map((pair, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl shadow-sm transition-all border-2 ${
                    matchedPairs.includes(pair.twi)
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-100 bg-white hover:border-indigo-200'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => !matchedPairs.includes(pair.twi) && handleCardClick(index, true)}
                >
                  <div className="font-medium text-gray-800">
                    {pair.twi} - {pair.english}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Button 
                onClick={handlePrevious}
                variant="outline"
                className="px-6 py-3"
              >
                Previous
              </Button>
              
              <div className="text-sm text-gray-500">
                {matchedPairs.length} of {currentData.pairs.length} matched
              </div>
              
              <Button 
                onClick={handleNext}
                disabled={matchedPairs.length < currentData.pairs.length}
                className={`px-8 py-6 text-lg ${
                  matchedPairs.length === currentData.pairs.length
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-300 cursor-not-allowed'
                } text-white`}
              >
                {matchedPairs.length === currentData.pairs.length ? (
                  <>
                    Complete Review
                    <CheckCircle className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  'Match all pairs to continue'
                )}
              </Button>
            </div>
          </div>
        );

      case 'completion':
        return (
          <motion.div 
            className="flex flex-col items-center justify-center p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="bg-green-100 p-6 rounded-full mb-6">
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Great Job! 🎉</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              You've completed the lesson! Ready to test your knowledge with a quiz?
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={handlePrevious}
                variant="outline"
                className="px-6 py-3"
              >
                Review Again
              </Button>
              <Button 
                onClick={() => setCurrentPhase('quiz')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg"
              >
                Take the Quiz!
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderQuizQuestion = () => {
    if (!quizQuestions.length) return null;
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    return (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </h3>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{score} / {quizQuestions.length}</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl font-medium text-gray-800">{currentQuestion.question}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    !showFeedback 
                      ? 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      : option === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : option === selectedAnswer
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                  }`}
                  whileTap={{ scale: 0.98 }}
                  disabled={showFeedback}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      !showFeedback
                        ? 'border-gray-300'
                        : option === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : option === selectedAnswer
                            ? 'border-red-500 bg-white text-red-500'
                            : 'border-gray-300'
                    }`}>
                      {showFeedback && option === currentQuestion.correctAnswer && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      {showFeedback && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                        <X className="h-4 w-4" />
                      )}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {showFeedback && (
              <motion.div 
                className={`p-4 rounded-lg mt-4 ${
                  isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">
                      {isCorrect ? 'Correct! 🎉' : `Incorrect. The correct answer is: ${currentQuestion.correctAnswer}`}
                    </p>
                    {!isCorrect && (
                      <button 
                        onClick={() => speakWord(currentQuestion.correctAnswer)}
                        className="mt-2 text-sm inline-flex items-center text-indigo-600 hover:text-indigo-800"
                      >
                        <Volume2 className="h-4 w-4 mr-1" />
                        Hear correct pronunciation
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="pt-2">
              {!showFeedback ? (
                <Button
                  onClick={checkAnswer}
                  disabled={!selectedAnswer}
                  className={`w-full py-6 text-lg font-semibold ${
                    !selectedAnswer 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  className="w-full py-6 text-lg font-semibold bg-green-600 hover:bg-green-700"
                >
                  {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderQuizResults = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const stars = Math.ceil((score / quizQuestions.length) * 3);
    
    return (
      <motion.div 
        className="text-center p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 mb-6">
          <Trophy className="h-12 w-12 text-yellow-500" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {percentage >= 70 ? 'Great Job! 🎉' : percentage >= 40 ? 'Good Try!' : 'Keep Practicing!'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          You scored {score} out of {quizQuestions.length} ({percentage}%)
        </p>
        
        <div className="flex justify-center space-x-1 mb-8">
          {[1, 2, 3].map((star) => (
            <Star 
              key={star} 
              className={`h-8 w-8 ${star <= stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setQuizCompleted(false);
              setShowFeedback(false);
              setSelectedAnswer('');
            }}
            className="w-full py-6 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
          >
            Try Again
          </Button>
          
          <Button 
            onClick={() => navigate('/lessons')}
            variant="outline"
            className="w-full py-6 text-lg font-semibold border-2 border-gray-200 hover:bg-gray-50"
          >
            Back to Lessons
          </Button>
        </div>
      </motion.div>
    );
  };

  const renderPhase = () => {
    if (quizCompleted) {
      return renderQuizResults();
    }
    
    switch (currentPhase) {
      case 'learning':
        return renderInteractivePhase();
      case 'quiz':
        return renderQuizQuestion();
      default:
        return (
          <div className="text-center p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to Start?</h3>
            <Button 
              onClick={() => setCurrentPhase('learning')}
              className="bg-green-500 hover:bg-green-600 text-white py-6 px-8 text-lg"
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
