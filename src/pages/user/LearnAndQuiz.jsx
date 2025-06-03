import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  Star,
  ArrowLeft,
  Mic,
  CheckCircle as CheckCircleIcon,
  X,
  XCircle as XCircleIcon,
  Sparkles,
  Award,
  VolumeX,
  HelpCircle,
  Smile,
  Frown,
  Trophy,
  Music,
  Zap
} from 'lucide-react';
import Confetti from 'react-confetti';
// Sound effects using Web Audio API
const playSound = (soundType) => {
  if (typeof window === 'undefined') return;
  
  // Simple beep sounds for different actions
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  // Different sounds for different actions
  switch(soundType) {
    case 'button_click':
      oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      break;
    case 'correct_answer':
      oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      break;
    case 'wrong_answer':
      oscillator.frequency.setValueAtTime(329.63, audioCtx.currentTime); // E4
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      break;
    case 'success':
      // A little melody for success
      [659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (i * 0.1));
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime + (i * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + (i * 0.1) + 0.2);
        osc.start(audioCtx.currentTime + (i * 0.1));
        osc.stop(audioCtx.currentTime + (i * 0.1) + 0.2);
      });
      return; // Early return as we've handled success sound
    default:
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
  }
  
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  oscillator.stop(audioCtx.currentTime + 0.1);
};

// Custom hook to get window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Animation variants for smooth transitions
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const slideUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  })
};

const bounce = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10
    }
  },
  hover: { scale: 1.05 }
};

const spin = {
  rotate: 360,
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear'
  }
};

// Define lesson content with more interactive elements
const lessonsData = {
  'twi-greetings': {
    id: 'twi-greetings',
    title: '👋 Twi Greetings & Basic Phrases',
    description: 'Master essential Twi greetings and everyday expressions!',
    sections: [
      // Introduction
      {
        title: 'Welcome to Twi Greetings! 👋',
        content: 'Learn how to greet people and use basic phrases in Twi, a beautiful language spoken in Ghana.',
        type: 'intro',
        emoji: '👋'
      },
      
      // Basic Greetings
      {
        title: 'Basic Greetings 🌟',
        content: 'Start with these essential Twi greetings for any time of day.',
        type: 'lesson',
        words: [
          { twi: 'Ɛte sɛn?', english: 'How are you?', pronunciation: 'eh-teh sen', emoji: '👋' },
          { twi: 'Me ho yɛ', english: 'I am fine', pronunciation: 'meh hoh yeh', emoji: '😊' },
          { twi: 'Ɛyɛ', english: 'Fine/Good', pronunciation: 'eh-yeh', emoji: '👍' },
          { twi: 'Me da wo ase', english: 'Thank you', pronunciation: 'meh dah woh ah-seh', emoji: '🙏' },
          { twi: 'Mepa wo kyɛw', english: 'Please', pronunciation: 'meh-pah woh chyew', emoji: '🥺' },
          { twi: 'Yɛfrɛ me...', english: 'My name is...', pronunciation: 'yeh-freh meh', emoji: '👤' },
          { twi: 'Wo din de sɛn?', english: 'What is your name?', pronunciation: 'woh deen deh sen', emoji: '❓' },
          { twi: 'Ɛyɛ me anigyeɛ', english: 'Nice to meet you', pronunciation: 'eh-yeh meh ah-nee-jay', emoji: '🤝' }
        ]
      },
      
      // Time-based Greetings
      {
        title: 'Time-based Greetings ⏰',
        content: 'Learn how to greet people at different times of the day.',
        type: 'lesson',
        words: [
          { twi: 'Maakye', english: 'Good morning', pronunciation: 'mah-chay', emoji: '🌅' },
          { twi: 'Maaha', english: 'Good afternoon', pronunciation: 'mah-ha', emoji: '☀️' },
          { twi: 'Maadwo', english: 'Good evening/night', pronunciation: 'mah-jo', emoji: '🌙' },
          { twi: 'Da yie', english: 'Good night (when going to bed)', pronunciation: 'dah yee-eh', emoji: '😴' },
          { twi: 'Afehyia pa', english: 'Happy new year', pronunciation: 'ah-feh-shee-ah pah', emoji: '🎉' },
          { twi: 'Akwaba', english: 'Welcome', pronunciation: 'ah-kwah-bah', emoji: '🏡' }
        ]
      },
      
      // Common Expressions
      {
        title: 'Common Expressions 💬',
        content: 'Useful everyday expressions in Twi.',
        type: 'lesson',
        words: [
          { twi: 'Aane', english: 'Yes', pronunciation: 'ah-eh-neh', emoji: '✅' },
          { twi: 'Daabi', english: 'No', pronunciation: 'dah-bee', emoji: '❌' },
          { twi: 'Mepawokyɛw', english: 'Excuse me/Sorry', pronunciation: 'meh-pah-woh-chyew', emoji: '🙇' },
          { twi: 'Kafra', english: 'Sorry', pronunciation: 'kah-frah', emoji: '😔' },
          { twi: 'Mepa wo kyɛw', english: 'Please (when asking for something)', pronunciation: 'meh-pah woh chyew', emoji: '🥺' },
          { twi: 'Medaase', english: 'Thank you (casual)', pronunciation: 'meh-dah-seh', emoji: '🙏' },
          { twi: 'Mema wo akye', english: 'I wish you good morning', pronunciation: 'meh-mah woh ah-chay', emoji: '🌞' },
          { twi: 'Yɛbɛhyia bio', english: 'See you again', pronunciation: 'yeh-beh-hya bee-oh', emoji: '👋' }
        ]
      },
      
      // Questions and Responses
      {
        title: 'Questions & Responses ❓',
        content: 'Common questions and how to respond in Twi.',
        type: 'practice',
        words: [
          { 
            twi: 'Wo ho te sɛn?', 
            english: 'How are you? (informal)', 
            pronunciation: 'woh hoh teh sen', 
            response: 'Me ho yɛ (I am fine)',
            emoji: '😊' 
          },
          { 
            twi: 'Ɛte sɛn?', 
            english: 'How is it going?', 
            pronunciation: 'eh-teh sen', 
            response: 'Ɛyɛ (It\'s good)',
            emoji: '👍' 
          },
          { 
            twi: 'Wofiri he?', 
            english: 'Where are you from?', 
            pronunciation: 'woh-fee-ree heh', 
            response: 'Mefiri... (I am from...)',
            emoji: '🌍' 
          },
          { 
            twi: 'Wote Twi?', 
            english: 'Do you speak Twi?', 
            pronunciation: 'woh-teh chwee', 
            response: 'Aane, metumi ka Twi kakra (Yes, I can speak a little Twi)',
            emoji: '💬' 
          }
        ]
      },
      
      // Completion
      {
        title: 'Congratulations! 🎉',
        content: 'You\'ve completed the Greetings & Basic Phrases lesson! Practice these phrases daily to become more comfortable.',
        type: 'completion',
        emoji: '🏆'
      }
    ]
  },
  // Add more lessons here with their respective IDs
};

// Default lesson (fallback)
const initialLessonContent = lessonsData['twi-language-basics'] || {
  id: 'twi-language-basics',
  title: '🌟 Twi Language Basics',
  description: 'Learn essential Twi words and phrases in a fun and interactive way!',
  sections: [
    // Introduction
    {
      title: 'Welcome to Twi! 👋',
      content: 'Twi is a dialect of Akan spoken by millions in Ghana. In this course, you\'ll learn practical Twi phrases and vocabulary.',
      type: 'intro',
      emoji: '👋'
    },
    
    // Greetings Section
    {
      title: 'Greetings & Basic Phrases',
      content: 'Learn how to greet people and use common phrases in Twi',
      type: 'section-header',
      emoji: '🗣️'
    },
    {
      title: 'Greeting People 🙋‍♂️',
      content: 'Here are some common Twi greetings:',
      type: 'lesson',
      words: [
        { twi: 'Maakye', english: 'Good morning', pronunciation: 'Mah-chay', emoji: '🌅' },
        { twi: 'Maaha', english: 'Good afternoon', pronunciation: 'Mah-ha', emoji: '☀️' },
        { twi: 'Maadwo', english: 'Good evening/night', pronunciation: 'Mah-jwoh', emoji: '🌙' },
        { twi: 'Mema wo akye', english: 'I greet you this morning', pronunciation: 'Meh-mah woh ah-chay', emoji: '🙏' }
      ]
    },
    {
      title: 'Asking How Someone Is ❓',
      content: 'Let\'s learn how to ask someone how they are:',
      type: 'lesson',
      words: [
        { twi: 'Ɛte sɛn?', english: 'How are you?', pronunciation: 'Eh-teh sen', emoji: '😊' },
        { twi: 'Wo ho te sɛn?', english: 'How are you? (polite)', pronunciation: 'Woh hoh teh sen', emoji: '🙂' },
        { twi: 'Ɛte sɛn wo ha?', english: 'How are you doing?', pronunciation: 'Eh-teh sen woh hah', emoji: '😊' },
        { twi: 'Ɛte sɛn ɛkɔ?', english: 'How is it going?', pronunciation: 'Eh-teh sen eh-koh', emoji: '😊' }
      ]
    },
    {
      title: 'Responding to Greetings 💬',
      content: 'Here\'s how to respond when someone greets you:',
      type: 'lesson',
      words: [
        { twi: 'Me ho yɛ', english: 'I am fine', pronunciation: 'Meh ho yeh', emoji: '👍' },
        { twi: 'Ɛyɛ', english: 'It\'s fine/okay', pronunciation: 'Eh-yeh', emoji: '👌' },
        { twi: 'Ɛyɛ oo', english: 'I\'m very well', pronunciation: 'Eh-yeh oh-oh', emoji: '😊' },
        { twi: 'Medaase', english: 'Thank you', pronunciation: 'Meh-dah-say', emoji: '🙏' },
        { twi: 'Meda wo ase', english: 'I thank you', pronunciation: 'Meh-dah woh ah-seh', emoji: '🙏' },
        { twi: 'Mepa wo kyɛw', english: 'Please/You\'re welcome', pronunciation: 'Meh-pah woh chaw', emoji: '🥺' },
        { twi: 'Yaa anua (to sibling)', english: 'Well done (response to greeting)', pronunciation: 'Yah ah-noo-ah', emoji: '👋' },
        { twi: 'Yaa ɛna (to mother)', english: 'Well done (to mother)', pronunciation: 'Yah ena', emoji: '👩' },
        { twi: 'Yaa agya (to father)', english: 'Well done (to father)', pronunciation: 'Yah a-jah', emoji: '👨' }
      ]
    },
    
    // Lesson 2: Common Phrases
    {
      title: 'Common Phrases 🗣️',
      content: 'Essential phrases for everyday conversations',
      type: 'lesson',
      words: [
        { twi: 'Mepa wo kyɛw', english: 'Please/You\'re welcome', pronunciation: 'Meh-pah woh chaw', emoji: '🥺' },
        { twi: 'Kafra', english: 'Sorry/Excuse me', pronunciation: 'Kah-frah', emoji: '😔' },
        { twi: 'Mepa kyɛw', english: 'Please (more polite)', pronunciation: 'Meh-pah chaw', emoji: '🙏' },
        { twi: 'Mepa wo kyɛw, mefre wo', english: 'Please, I\'m calling you', pronunciation: 'Meh-pah woh chaw, meh-freh woh', emoji: '📞' },
        { twi: 'Me nko yɛ', english: 'I don\'t understand', pronunciation: 'Meh n-koh yeh', emoji: '🤔' },
        { twi: 'Mesrɛ wo kasa kakra', english: 'Please speak slowly', pronunciation: 'Meh-sreh woh kah-sah kah-krah', emoji: '🐢' },
        { twi: 'Kasa bio', english: 'Say it again', pronunciation: 'Kah-sah bee-oh', emoji: '🔄' },
        { twi: 'Ɛyɛ den?', english: 'What\'s the matter?', pronunciation: 'Eh-yeh den', emoji: '❓' },
        { twi: 'Mepɛ sɛ meka Twi kakra', english: 'I want to speak a little Twi', pronunciation: 'Meh-peh seh meh-kah Chee kah-krah', emoji: '💬' }
      ]
    },
    
    // Lesson 3: Numbers
    {
      title: 'Numbers 1-10 🔢',
      content: 'Learn to count in Twi',
      type: 'lesson',
      words: [
        { twi: 'Baako', english: 'One', pronunciation: 'Bah-ah-koh', emoji: '1️⃣' },
        { twi: 'Mienu', english: 'Two', pronunciation: 'Mee-eh-noo', emoji: '2️⃣' },
        { twi: 'Miensa', english: 'Three', pronunciation: 'Mee-eh-nsah', emoji: '3️⃣' },
        { twi: 'Enan', english: 'Four', pronunciation: 'Eh-nahn', emoji: '4️⃣' },
        { twi: 'Enum', english: 'Five', pronunciation: 'Eh-noom', emoji: '5️⃣' },
        { twi: 'Nsia', english: 'Six', pronunciation: 'Nsi-ah', emoji: '6️⃣' },
        { twi: 'Nson', english: 'Seven', pronunciation: 'N-sohn', emoji: '7️⃣' },
        { twi: 'Nwɔtwe', english: 'Eight', pronunciation: 'N-woh-tweh', emoji: '8️⃣' },
        { twi: 'Nkron', english: 'Nine', pronunciation: 'N-krohn', emoji: '9️⃣' },
        { twi: 'Du', english: 'Ten', pronunciation: 'Doo', emoji: '🔟' }
      ]
    },
    
    // Lesson 4: Family
    {
      title: 'Family Members 👨‍👩‍👧‍👦',
      content: 'Learn how to talk about family',
      type: 'lesson',
      words: [
        { twi: 'Aban', english: 'Family', pronunciation: 'Ah-bahn', emoji: '👨‍👩‍👧‍👦' },
        { twi: 'Agoo', english: 'Parent', pronunciation: 'Ah-go', emoji: '👪' },
        { twi: 'Agya', english: 'Father', pronunciation: 'Ah-jah', emoji: '👨' },
        { twi: 'Ɛna', english: 'Mother', pronunciation: 'Eh-nah', emoji: '👩' },
        { twi: 'Nua', english: 'Sibling', pronunciation: 'Noo-ah', emoji: '👫' },
        { twi: 'Nana', english: 'Grandparent', pronunciation: 'Nah-nah', emoji: '👴👵' },
        { twi: 'Awofoɔ', english: 'Parents', pronunciation: 'Ah-woh-foh', emoji: '👨‍👩‍👧' },
        { twi: 'Awoɔ', english: 'Child', pronunciation: 'Ah-woh', emoji: '👶' },
        { twi: 'Abarimaa', english: 'Son', pronunciation: 'Ah-bah-ree-mah', emoji: '👦' },
        { twi: 'Abaa', english: 'Daughter', pronunciation: 'Ah-bah', emoji: '👧' }
      ]
    },
    
    // Food & Drinks Section
    {
      title: 'Food & Drinks',
      content: 'Learn food and drink vocabulary in Twi',
      type: 'section-header',
      emoji: '🍲'
    },
    {
      title: 'Food and Drinks 🍲',
      content: 'Common food and drink terms',
      type: 'lesson',
      words: [
        { twi: 'Aduane', english: 'Food', pronunciation: 'Ah-doo-ah-neh', emoji: '🍲' },
        { twi: 'Nsuo', english: 'Water', pronunciation: 'N-soo-oh', emoji: '💧' },
        { twi: 'Bankye', english: 'Cassava', pronunciation: 'Ban-chay', emoji: '🍠' },
        { twi: 'Fufuo', english: 'Pounded cassava and plantain', pronunciation: 'Foo-foo', emoji: '🥣' },
        { twi: 'Banku', english: 'Fermented corn/cassava dough', pronunciation: 'Ban-koo', emoji: '🥣' },
        { twi: 'Jollof', english: 'Jollof rice', pronunciation: 'Jol-lof', emoji: '🍛' },
        { twi: 'Kontomire', english: 'Cocoyam leaves', pronunciation: 'Kon-toh-mee-reh', emoji: '🥬' },
        { twi: 'Nkate nkwan', english: 'Peanut butter soup', pronunciation: 'N-kah-teh n-kwan', emoji: '🥜' },
        { twi: 'Kelewele', english: 'Spicy fried plantains', pronunciation: 'Ke-leh-weh-leh', emoji: '🍌' },
        { twi: 'Bofrot', english: 'Fried dough', pronunciation: 'Boh-froht', emoji: '🍩' }
      ]
    },
    
    // Shopping Section
    {
      title: 'Shopping & Transactions',
      content: 'Learn useful phrases for shopping in Twi',
      type: 'section-header',
      emoji: '🛍️'
    },
    {
      title: 'Shopping 🛍️',
      content: 'Useful phrases for shopping',
      type: 'lesson',
      words: [
        { twi: 'Sika', english: 'Money', pronunciation: 'See-kah', emoji: '💰' },
        { twi: 'Tɔn', english: 'Buy', pronunciation: 'Tohn', emoji: '🛒' },
        { twi: 'Tɔn bi', english: 'Buy some', pronunciation: 'Tohn bee', emoji: '🛍️' },
        { twi: 'Ɛbɛn?', english: 'How much?', pronunciation: 'Eh-ben', emoji: '💰' },
        { twi: 'Ɛyɛ dɛn?', english: 'How much is it?', pronunciation: 'Eh-yeh den', emoji: '💲' },
        { twi: 'Ɛyɛ kakra', english: 'It\'s a little', pronunciation: 'Eh-yeh kah-krah', emoji: '🪙' },
        { twi: 'Ɛyɛ pii', english: 'It\'s a lot', pronunciation: 'Eh-yeh pee', emoji: '💵' },
        { twi: 'Mepɛ sɛ metɔ', english: 'I want to buy', pronunciation: 'Meh-peh seh meh-toh', emoji: '🛒' },
        { twi: 'Me pɛ sɛ me nya kakra', english: 'I want to get a discount', pronunciation: 'Meh peh seh meh nyah kah-krah', emoji: '💱' }
      ]
    },
    
    // Practice & Review Section
    {
      title: 'Practice Time! 🎤',
      content: 'Let\'s practice what we\'ve learned. Tap the speaker to hear each phrase.',
      type: 'practice',
      words: [
        { twi: 'Maakye', english: 'Good morning' },
        { twi: 'Ɛte sɛn?', english: 'How are you?' },
        { twi: 'Me ho yɛ', english: 'I am fine' },
        { twi: 'Medaase', english: 'Thank you' },
        { twi: 'Mepa wo kyɛw', english: 'Please' },
        { twi: 'Kafra', english: 'Sorry' },
        { twi: 'Ɛbɛn?', english: 'How much?' },
        { twi: 'Me pɛ sɛ metɔ', english: 'I want to buy' }
      ]
    },
    
    // Review Section
    {
      title: 'Quick Review 📝',
      content: 'Match the Twi phrases with their English meanings.',
      type: 'review',
      pairs: [
        { twi: 'Maakye', english: 'Good morning' },
        { twi: 'Ɛte sɛn?', english: 'How are you?' },
        { twi: 'Me ho yɛ', english: 'I am fine' },
        { twi: 'Medaase', english: 'Thank you' },
        { twi: 'Mepa wo kyɛw', english: 'Please' },
        { twi: 'Kafra', english: 'Sorry' },
        { twi: 'Ɛbɛn?', english: 'How much?' },
        { twi: 'Sika', english: 'Money' }
      ]
    },
    
    // Completion
    {
      title: 'Great Job! 🎉',
      content: 'You\'ve completed the basic Twi language course! You can now greet people, introduce yourself, talk about family, order food, and go shopping in Twi. Keep practicing!',
      type: 'completion',
      emoji: '🏆'
    }
  ]
};

// Sample Quiz Questions
const quizQuestions = [
  {
    question: 'How do you say "Hello" in Twi?',
    options: ['Maakye', 'Ɛte sɛn?', 'Mepa wo kyɛw', 'Yoo'],
    correctAnswer: 'Maakye',
    explanation: '"Maakye" is a common way to say "Good morning" or "Hello" in Twi.',
    emoji: '☀️'
  },
  {
    question: 'What does "Me da wo ase" mean?',
    options: ['Please', 'Thank you', 'How are you?', 'Goodbye'],
    correctAnswer: 'Thank you',
    explanation: '"Me da wo ase" translates to "Thank you".',
    emoji: '🙏'
  },
  {
    question: 'Which of these means "Yes"?',
    options: ['Daabi', 'Aane', 'Yoo', 'Ampa'],
    correctAnswer: 'Aane',
    explanation: '"Aane" is the Twi word for "Yes".',
    emoji: '✅'
  },
  {
    question: 'How do you ask "What is your name?" in Twi?',
    options: ['Yɛfrɛ me...', 'Wo din de sɛn?', 'Me ho yɛ', 'Ɛte sɛn?'],
    correctAnswer: 'Wo din de sɛn?',
    explanation: '"Wo din de sɛn?" is how you ask for someone\'s name.',
    emoji: '❓'
  },
  {
    question: 'What is "Good afternoon" in Twi?',
    options: ['Maadwo', 'Maakye', 'Maaha', 'Da yie'],
    correctAnswer: 'Maaha',
    explanation: '"Maaha" is used for "Good afternoon".',
    emoji: '☀️'
  }
];

const LearnAndQuiz = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  
  // Load lesson data based on lessonId
  useEffect(() => {
    const loadLesson = () => {
      try {
        // In a real app, you would fetch the lesson data from an API here
        // For now, we'll use the lessonsData object
        const lessonData = lessonsData[lessonId] || initialLessonContent;
        
        setState(prev => ({
          ...prev,
          lesson: lessonData,
          currentSection: 0, // Reset to first section when lesson changes
          loading: false,
          error: null
        }));
        
        // Scroll to top when lesson loads
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Failed to load lesson:', error);
        // Fallback to initial content
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load lesson. Please try again.'
        }));
      }
    };

    if (lessonId) {
      setState(prev => ({ ...prev, loading: true }));
      loadLesson();
    }
  }, [lessonId]);
  
  // Consolidated state management
  const [state, setState] = useState({
    currentSection: 0,
    completedLesson: false,
    showCelebration: false,
    lesson: initialLessonContent,
    loading: false,
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: '',
    showFeedback: false,
    isCorrect: false,
    quizCompleted: false,
    showConfetti: false,
    currentPhase: 'learning', // 'learning' or 'quiz'
  });

  // Get current section data
  const currentSectionData = useMemo(() => {
    if (!state.lesson?.sections?.length) return null;
    return state.lesson.sections[state.currentSection];
  }, [state.lesson, state.currentSection]);

  // Destructure state for easier access
  const {
    currentSection,
    completedLesson,
    showCelebration,
    lesson,
    loading,
    currentQuestionIndex,
    score,
    selectedAnswer,
    showFeedback,
    isCorrect,
    quizCompleted,
    showConfetti,
    currentPhase,
    starsEarned,
    speakingWords
  } = state;
  
  // Show loading state if no section data is available
  if (!currentSectionData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson content...</p>
        </div>
      </div>
    );
  }


  // State updater function
  const updateState = useCallback((updates) => {
    setState(prev => ({
      ...prev,
      ...updates
    }));
  }, []);
  
  // Get current section data
  const currentData = useMemo(() => {
    if (!state.lesson?.sections?.length) return null;
    return state.lesson.sections[state.currentSection];
  }, [state.lesson, state.currentSection]);
  
  // Ensure we have valid currentData
  if (!currentData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson content...</p>
        </div>
      </div>
    );
  }

  // Navigation handlers with sound effects and animations
  const handleNext = useCallback(() => {
    playSound('button_click');
    
    const nextSection = currentSection + 1;
    
    // If there are more sections, move to the next one
    if (nextSection < lesson.sections.length) {
      setState(prev => ({
        ...prev,
        currentSection: nextSection,
        showCelebration: false
      }));
      
      // Scroll to top when changing sections
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If this was the last section, mark lesson as completed
      setState(prev => ({
        ...prev,
        completedLesson: true,
        showCelebration: true
      }));
    }
  }, [currentSection, lesson.sections]);

  const handlePrevious = () => {
    playSound('button_click');
    updateState({
      currentSection: Math.max(0, currentSection - 1),
      showCelebration: false
    });
  };

  // Handle answer selection in quiz
  const handleAnswerSelect = (answer) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const correct = answer === currentQuestion.correctAnswer;
    const newScore = correct ? score + 1 : score;
    
    updateState({
      selectedAnswer: answer,
      isCorrect: correct,
      showFeedback: true,
      score: newScore
    });
    
    playSound(correct ? 'correct_answer' : 'wrong_answer');
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        updateState({
          showFeedback: false,
          selectedAnswer: '',
          currentQuestionIndex: currentQuestionIndex + 1
        });
      } else {
        // Calculate stars based on performance
        const percentage = newScore / quizQuestions.length;
        const stars = Math.ceil(percentage * 3);
        
        updateState({
          showFeedback: false,
          selectedAnswer: '',
          quizCompleted: true,
          showConfetti: true,
          starsEarned: stars
        });
        
        // Hide confetti after animation
        setTimeout(() => updateState({ showConfetti: false }), 5000);
      }
    }, 1500);
  };

  // Speak text using Web Speech API (will be replaced with your TTS API)
  const handleSpeak = (text, index) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ak-GH';
      utterance.rate = 0.8;
      
      // Update speaking state for the specific word
      updateState({
        speakingWords: {
          ...speakingWords,
          [index]: true
        }
      });
      
      utterance.onend = () => {
        updateState({
          speakingWords: {
            ...speakingWords,
            [index]: false
          }
        });
      };
      
      speechSynthesis.speak(utterance);
      playSound('button_click');
    }
  };

  // Main renderSection function using component state
  const renderSection = () => {
    if (!currentData) return null;
    
    switch (currentData.type) {
      case 'section-header':
        return (
          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-4xl mb-4"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {currentData.emoji}
            </motion.div>
            <motion.h2 
              className="text-2xl font-bold text-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentData.title}
            </motion.h2>
            {currentData.content && (
              <motion.p 
                className="text-gray-600 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentData.content}
              </motion.p>
            )}
          </motion.div>
        );

      case 'intro':
        return (
          <motion.div 
            className="flex flex-col items-center justify-center text-center p-8 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="relative mb-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            >
              <div className="absolute -inset-4 bg-purple-200 rounded-full opacity-70 blur-xl animate-blob"></div>
              <div className="relative text-8xl p-8 bg-white rounded-3xl shadow-2xl border-4 border-purple-100">
                {currentData.emoji}
              </div>
            </motion.div>
            
            <motion.div className="max-w-3xl mx-auto">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {currentData.title}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {currentData.content}
              </motion.p>
              
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
              >
                <Button 
                  onClick={handleNext}
                  className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 px-12 text-2xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-3">Start Learning Now</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ChevronRight className="h-8 w-8 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Button>
                
                <motion.p 
                  className="text-gray-500 mt-4 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Click the button above to begin your Twi language journey!
                </motion.p>
              </motion.div>
            </motion.div>
            
            {/* Floating decorative elements */}
            <AnimatePresence>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    fontSize: `${1 + Math.random() * 2}rem`
                  }}
                  initial={{ 
                    y: 0,
                    opacity: 0.3,
                    scale: 0.5 
                  }}
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {['✨', '🎉', '🌈', '🎈', '🎨', '🎯', '🧩', '🎠'][i % 8]}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        );

      case 'lesson':
        return (
          <motion.div 
            className="space-y-6 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-center mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.h2 
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentData.title}
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-700 max-w-2xl mx-auto"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {currentData.content}
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentData.words && currentData.words.length > 0 ? (
                currentData.words.map((word, index) => {
                  const isSpeaking = speakingWords && speakingWords[index] || false;
                  
                  const handleSpeak = () => {
                    if ('speechSynthesis' in window) {
                      const utterance = new SpeechSynthesisUtterance(word.twi);
                      utterance.lang = 'ak-GH';
                      utterance.rate = 0.8;
                      
                      updateState({
                        speakingWords: {
                          ...speakingWords,
                          [index]: true
                        }
                      });
                      
                      utterance.onend = () => {
                        updateState({
                          speakingWords: {
                            ...speakingWords,
                            [index]: false
                          }
                        });
                      };
                      
                      speechSynthesis.speak(utterance);
                      playSound('button_click');
                    }
                  };
                  
                  return (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-200 transition-all duration-300 hover:shadow-xl"
                      initial={{ y: 20, opacity: 0, scale: 0.95 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.1 * index,
                        type: 'spring',
                        stiffness: 100,
                        damping: 10
                      }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1">{word.twi}</h3>
                          <p className="text-gray-700 text-lg">{word.english}</p>
                        </div>
                        <motion.span 
                          className="text-4xl"
                          animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          {word.emoji}
                        </motion.span>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Pronunciation:</p>
                            <p className="text-purple-700 font-medium">{word.pronunciation}</p>
                          </div>
                          <motion.button
                            onClick={handleSpeak}
                            className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            whileTap={{ scale: 0.9 }}
                            title="Listen to pronunciation"
                          >
                            {isSpeaking ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              >
                                <VolumeX className="h-5 w-5" />
                              </motion.div>
                            ) : (
                              <Volume2 className="h-5 w-5" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                      
                      {word.example && (
                        <motion.div 
                          className="mt-4 p-3 bg-blue-50 rounded-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <p className="text-sm text-blue-800 font-medium">Example:</p>
                          <p className="text-blue-700">"{word.example}"</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 col-span-full">Lesson content (words) not available for this section.</p>
              )}
            </div>

            <motion.div 
              className="flex justify-between mt-10 pt-6 border-t border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex items-center bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                  disabled={currentSection === 0}
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Previous
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center"
                >
                  Continue
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Progress indicator */}
            <div className="mt-6 bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((currentSection + 1) / lesson.sections.length) * 100}%` 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Lesson {currentSection + 1} of {lesson.sections.length}
            </p>
          </motion.div>
        );

      case 'practice':
        return (
          <motion.div 
            className="space-y-6 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-center mb-8 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                {currentData.title}
              </h2>
              <p className="text-lg text-gray-700">{currentData.content}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentData.words.map((word, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-purple-200"
                  variants={bounce}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={index * 0.1}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">{word.twi}</h3>
                      <p className="text-gray-600 mb-2">{word.english}</p>
                      {word.pronunciation && (
                        <p className="text-sm text-gray-500 italic">
                          {word.pronunciation}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleSpeak(word.twi, index)}
                      className={`p-2 rounded-full ${speakingWords[index] ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-500'} transition-colors`}
                      aria-label="Listen to pronunciation"
                    >
                      <Volume2 className="h-6 w-6" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
              <Button 
                onClick={handlePrevious}
                variant="outline"
                className="flex items-center"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Continue
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </div>
          </motion.div>
        );

      case 'review':
        const [selectedPairs, setSelectedPairs] = useState([]);
        const [matchedPairs, setMatchedPairs] = useState([]);

        const handleCardClick = (type, value, index) => {
          if (selectedPairs.length < 2 && !selectedPairs.some(pair => pair.index === index)) {
            const newSelection = [...selectedPairs, { type, value, index }];
            setSelectedPairs(newSelection);

            if (newSelection.length === 2) {
              const [first, second] = newSelection;
              if (first.type !== second.type && 
                  currentData.pairs.some(pair => 
                    (pair.twi === first.value && pair.english === second.value) ||
                    (pair.english === first.value && pair.twi === second.value)
                  )
              ) {
                setMatchedPairs([...matchedPairs, first.value, second.value]);
              }
              setTimeout(() => setSelectedPairs([]), 1000);
            }
          }
        };

        const isCardSelected = (value, index) => 
          selectedPairs.some(pair => pair.value === value && pair.index === index);

        const isCardMatched = (value) => matchedPairs.includes(value);

        return (
          <motion.div 
            className="space-y-6 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="text-center mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                {currentData.title}
              </h2>
              <p className="text-lg text-gray-700">{currentData.content}</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[...currentData.pairs]
                .flatMap(pair => [
                  { type: 'twi', value: pair.twi },
                  { type: 'english', value: pair.english }
                ])
                .sort(() => Math.random() - 0.5)
                .map((item, index) => {
                  const isSelected = isCardSelected(item.value, index);
                  const isMatched = isCardMatched(item.value);
                  const isActive = isSelected || isMatched;
                  
                  return (
                    <motion.div
                      key={`${item.value}-${index}`}
                      className={`p-4 rounded-xl text-center cursor-pointer transition-all ${isMatched 
                        ? 'bg-green-100 border-2 border-green-300' 
                        : isSelected 
                          ? 'bg-blue-100 border-2 border-blue-300' 
                          : 'bg-white border-2 border-gray-200 hover:border-purple-300'}`}
                      onClick={() => !isActive && handleCardClick(item.type, item.value, index)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: isActive ? 1.02 : 1
                      }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.05
                      }}
                      whileHover={!isActive ? { scale: 1.02 } : {}}
                      whileTap={!isActive ? { scale: 0.98 } : {}}
                    >
                      <p className={`font-medium ${isMatched ? 'text-green-800' : 'text-gray-800'}`}>
                        {item.value}
                      </p>
                      {isMatched && (
                        <motion.div 
                          className="text-green-500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          ✓
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
            </div>

            <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
              <Button 
                onClick={handlePrevious}
                variant="outline"
                className="flex items-center"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Previous
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                disabled={matchedPairs.length < currentData.pairs.length * 2}
              >
                {matchedPairs.length >= currentData.pairs.length * 2 ? 'Continue' : 'Match all pairs'}
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </div>
          </motion.div>
        );

      case 'completion':
        return (
          <motion.div 
            className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 mb-8"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            >
              <Trophy className="h-16 w-16 text-yellow-700" />
            </motion.div>
            
            <motion.h2 
              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentData.title}
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-700 mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentData.content}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={() => setState(prev => ({ ...prev, currentPhase: 'quiz' }))}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 px-8 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center"
              >
                Start Quiz
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                onClick={() => setState(prev => ({ ...prev, currentSection: 0 }))}
                variant="outline"
                className="border-2 border-gray-200 hover:bg-gray-50 py-4 px-8 text-lg font-semibold rounded-2xl shadow-sm hover:shadow transition-all"
              >
                Review Again
              </Button>
            </motion.div>
            
            {/* Floating decorative elements */}
            <AnimatePresence>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none text-2xl"
                  style={{
                    left: `${5 + Math.random() * 90}%`,
                    top: `${5 + Math.random() * 90}%`,
                    fontSize: `${1.5 + Math.random() * 2}rem`
                  }}
                  initial={{ 
                    y: 0,
                    opacity: 0.3,
                    rotate: Math.random() * 360
                  }}
                  animate={{ 
                    y: [0, -30, 0],
                    rotate: [0, 360],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {['✨', '🎉', '🌈', '🎈', '🎨', '🎯', '🧩', '🏆'][i % 8]}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        );

      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Section Type Not Found</h2>
            <p className="text-gray-600">This section type is not yet implemented.</p>
          </div>
        );
    }
  };

  const renderQuizQuestion = () => {
    if (state.currentQuestionIndex >= quizQuestions.length) {
      return <div className="p-6 text-center text-red-500">Error: Question index out of bounds. Quiz should have completed.</div>;
    }
    const currentQuestion = quizQuestions[state.currentQuestionIndex];

    if (!currentQuestion) {
      return <div className="p-6 text-center">Loading question...</div>;
    }

    return (
      <motion.div
        key={state.currentQuestionIndex} // Ensure re-render and animation on question change
        className="p-6 md:p-10 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="mb-6 md:mb-8">
          <p className="text-sm text-purple-600 font-semibold mb-1 tracking-wide">
            Question {state.currentQuestionIndex + 1} of {quizQuestions.length}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight flex items-center">
            {currentQuestion.emoji && <span className="mr-3 text-3xl md:text-4xl">{currentQuestion.emoji}</span>}
            <span>{currentQuestion.question}</span>
          </h2>
        </div>

        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
          {currentQuestion.options.map((option, index) => {
            const isSelected = state.selectedAnswer === option;
            const isCorrectOption = option === currentQuestion.correctAnswer;
            
            let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-purple-400";
            let icon = null;

            if (state.showFeedback) {
              if (isCorrectOption) {
                buttonClass += " bg-green-50 border-green-400 text-green-700 font-semibold cursor-default";
                icon = <CheckCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-green-600" />;
              } else if (isSelected && !state.isCorrect) {
                buttonClass += " bg-red-50 border-red-400 text-red-700 font-semibold cursor-default";
                icon = <XCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-red-600" />;
              } else {
                buttonClass += " bg-gray-50 border-gray-300 text-gray-500 opacity-60 cursor-default pointer-events-none";
              }
            } else {
              if (isSelected) {
                buttonClass += " bg-purple-100 border-purple-500 text-purple-700 font-semibold shadow-md scale-[1.02]";
              } else {
                buttonClass += " bg-white border-gray-300 text-gray-800 hover:border-purple-400 hover:bg-purple-50 hover:scale-[1.02]";
              }
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={buttonClass}
                disabled={state.showFeedback}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.1, type: 'spring', stiffness: 120, damping: 12 }}
                whileHover={!state.showFeedback ? { scale: 1.03, transition: { duration: 0.15} } : {}}
                whileTap={!state.showFeedback ? { scale: 0.98, transition: { duration: 0.1 } } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg">{option}</span>
                  {state.showFeedback && icon && (
                    <motion.div initial={{scale:0.5, opacity: 0}} animate={{scale:1, opacity: 1}} transition={{delay: 0.1, type: 'spring', stiffness:150}}>{icon}</motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {state.showFeedback && (
          <motion.div
            className={`p-4 md:p-5 rounded-lg mt-6 text-center border ${state.isCorrect ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h3 className="font-bold text-lg md:text-xl mb-1">
              {state.isCorrect ? 'Correct! 🎉' : 'Not quite... 🤔'}
            </h3>
            {currentQuestion.explanation && (
              <p className="text-sm md:text-base">{currentQuestion.explanation}</p>
            )}
            {currentQuestion.hint && !state.isCorrect && (
               <p className="text-sm md:text-base mt-1 italic opacity-80">Hint: {currentQuestion.hint}</p>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  };

  // Render quiz results
  const renderQuizResults = () => {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const stars = Math.ceil(percentage / 33); // 1-3 stars
    
    // Calculate performance message
    let message = '';
    let messageEmoji = '';
    
    if (percentage >= 80) {
      message = 'Amazing job! You\'re a Twi superstar! 🌟';
      messageEmoji = '🎯';
    } else if (percentage >= 50) {
      message = 'Great work! Keep practicing to get even better! 👏';
      messageEmoji = '👍';
    } else {
      message = 'Good try! Practice makes perfect! 💪';
      messageEmoji = '🌟';
    }
    
    return (
      <motion.div 
        className="p-6 md:p-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 shadow-lg border border-green-100 max-w-2xl mx-auto">
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 mb-6 mx-auto"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2, 
              repeat: Infinity, 
              repeatType: 'reverse' 
            }}
          >
            <Trophy className="h-12 w-12 text-yellow-700" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {percentage >= 80 ? 'Amazing!' : percentage >= 50 ? 'Great Job!' : 'Good Try!'}
          </h2>
          
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {quizQuestions.length} ({percentage}%)
          </p>
          
          <div className="flex justify-center space-x-1 mb-8">
            {[1, 2, 3].map((star) => (
              <Star 
                key={star} 
                className={`h-10 w-10 ${star <= stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          
          <motion.div 
            className="bg-blue-50 p-4 rounded-lg mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center">
              <span className="text-2xl mr-2">{messageEmoji}</span>
              <p className="text-blue-800 font-medium">{message}</p>
            </div>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Button 
              onClick={() => {
                playSound('button_click');
                updateState({
                  currentQuestionIndex: 0,
                  score: 0,
                  selectedAnswer: '',
                  showFeedback: false,
                  quizCompleted: false,
                  starsEarned: 0,
                  showConfetti: false
                });
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Zap className="h-5 w-5 mr-2" />
              Try Again
            </Button>
            
            <Button 
              onClick={() => {
                playSound('button_click');
                updateState({
                  currentPhase: 'learning'
                });
              }}
              variant="outline"
              className="border-2 border-gray-200 hover:bg-gray-50 py-3 px-6 text-lg font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Lessons
            </Button>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Share your achievement
            </h3>
            <div className="flex justify-center space-x-4">
              {['📱', '📧', '📲', '🔗'].map((icon, i) => (
                <motion.button
                  key={i}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl transition-colors duration-200"
                  whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                  whileTap={{ scale: 0.95 }}
                >
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Main render function
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
          />
        )}
      </AnimatePresence>
      
      <div className="max-w-6xl mx-auto">
        {/* Header with progress */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            onClick={() => {
              playSound('button_click');
              if (currentPhase === 'quiz') {
                updateState({
                  currentPhase: 'learning'
                });
              } else {
                navigate(-1);
              }
            }}
            variant="ghost" 
            className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {currentPhase === 'quiz' ? 'Back to Lesson' : 'Back'}
          </Button>
          
          <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <div className="w-40 bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((currentSection + 1) / state.lesson.sections.length) * 100}%` 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {currentSection + 1}/{state.lesson.sections.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {[1, 2, 3].map((star) => (
              <Star 
                key={star} 
                className={`h-5 w-5 ${star <= starsEarned ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </motion.div>
        
        {/* Main content */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {currentPhase === 'quiz' ? (
            quizCompleted ? renderQuizResults() : renderQuizQuestion()
          ) : renderSection()}
        </motion.div>
        
        {/* Quiz button */}
        {currentPhase !== 'quiz' && !completedLesson && (
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              onClick={() => {
                playSound('button_click');
                updateState({
                  currentPhase: 'quiz',
                  currentQuestionIndex: 0,
                  score: 0,
                  selectedAnswer: '',
                  showFeedback: false,
                  quizCompleted: false,
                  starsEarned: 0,
                  showConfetti: false
                });
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-4 px-8 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Take the Quiz!
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LearnAndQuiz;
