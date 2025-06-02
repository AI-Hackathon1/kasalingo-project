import React, { useState } from 'react';
import Navigation from '@components/common/Navigation';
import LessonViewer from '@components/lessons/LessonViewer';
import LessonsList from '@components/lessons/LessonsList';

const Lessons = () => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([1, 2]);
  const [currentProgress] = useState({
    1: 75,   // Greetings & Hello - 12/15 words
    2: 40,   // Fun with Numbers - 8/20 words
    3: 20,   // Colors - 4/20 words
    4: 30,   // My Family - 6/20 words
    5: 50,   // Food & Drinks - 10/20 words
    6: 35,   // Around the House - 7/20 words
    7: 25,   // Weather & Seasons - 5/20 words
    8: 15,   // Days & Months - 3/20 words
    9: 0     // Cultural Insights - 0/20 words
  });

  const togglePremium = () => {
    setIsPremium(!isPremium);
  };

  const startLesson = (lessonId, isLocked) => {
    if (isLocked) return; // Handle locked state (show upgrade modal, etc.)
    setActiveLesson(lessonId);
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const lessons = [
    // Beginner Lessons (Simple, foundational concepts)
    {
      id: 1,
      title: '🌟 Greetings & Hello',
      description: 'Learn basic greetings and introductions',
      difficulty: 'Beginner',
      duration: '10-15 min',
      isPremium: false,
      progress: 75,
      xpReward: 50,
      icon: '👋',
      content: {
        learning: [
          { 
            type: 'interactive',
            content: {
              type: 'flashcard',
              front: 'Hello',
              back: 'ɛte sɛn?',
              audio: '/audio/greetings/hello.mp3',
              image: '/images/greetings/hello.png'
            }
          },
          { 
            type: 'interactive',
            content: {
              type: 'matching',
              prompt: 'Match the greeting to the time of day',
              pairs: [
                { question: 'Good morning', answer: 'Mema wo akye' },
                { question: 'Good afternoon', answer: 'Mema wo aha' },
                { question: 'Good evening', answer: 'Mema wo adwo' }
              ]
            }
          },
          {
            type: 'cultural',
            title: 'Did you know?',
            content: 'In Ghanaian culture, greetings are very important and often include asking about family and well-being.'
          },
          {
            type: 'practice',
            content: {
              type: 'speaking',
              prompt: 'Record yourself saying: "ɛte sɛn?"',
              targetPhrase: 'ɛte sɛn',
              feedbackType: 'pronunciation'
            }
          },
          { 
            type: 'interactive',
            content: {
              type: 'quiz',
              question: 'How do you say "Good morning" in Twi?',
              options: [
                { text: 'Mema wo akye', correct: true },
                { text: 'Mema wo aha', correct: false },
                { text: 'Mema wo adwo', correct: false },
                { text: 'ɛte sɛn?', correct: false }
              ],
              explanation: 'Mema wo akye is used to say Good morning in Twi.'
            }
          },
          { type: 'text', content: 'Good night - Da yie' },
          { type: 'text', content: 'How are you? - Wo ho te sɛn?' },
          { type: 'text', content: 'I am fine - Me ho yɛ' },
          { type: 'text', content: 'Thank you - Me da wo ase' },
          { type: 'text', content: 'You\'re welcome - Mema wo akwaaba' },
          { type: 'text', content: 'Please - Mepa wo kyɛw' },
          { type: 'text', content: 'Sorry - Kafra' },
          { type: 'text', content: 'Goodbye - Nante yie' }
        ],
        quiz: [
          {
            question: 'How do you say "Hello" in Twi?',
            options: ['Mema wo akye', 'Ɛte sɛn?', 'Me din de...', 'Me da wo ase'],
            correctAnswer: 'Ɛte sɛn?'
          },
          {
            question: 'What does "Mema wo akye" mean?',
            options: ['Good night', 'Good morning', 'Good afternoon', 'Goodbye'],
            correctAnswer: 'Good morning'
          },
          {
            question: 'How do you say "Thank you" in Twi?',
            options: ['Me da wo ase', 'Mepa wo kyɛw', 'Me ho yɛ', 'Ɛte sɛn?'],
            correctAnswer: 'Me da wo ase'
          }
        ],
        vocabulary: [
          { twi: 'ɛte sɛn', english: 'hello/how are you', pronunciation: 'eh-teh-sen' },
          { twi: 'mema wo akye', english: 'good morning', pronunciation: 'meh-mah woh ah-chay' },
          { twi: 'mema wo aha', english: 'good afternoon', pronunciation: 'meh-mah woh ah-hah' },
          { twi: 'me da wo ase', english: 'thank you', pronunciation: 'meh-dah-woh-ah-seh' },
          { twi: 'mepa wo kyɛw', english: 'please', pronunciation: 'meh-pah-woh-chay-oh' }
        ],
        culturalTips: [
          'In Ghanaian culture, it\'s polite to greet everyone when you enter a room',
          'A handshake is a common greeting, sometimes followed by snapping fingers',
          'It\'s customary to ask about someone\'s family and well-being when greeting',
          'Using both hands when giving or receiving items shows respect',
          'Greetings are often accompanied by inquiries about health and family'
        ]
      }
    },
    {
      id: 2,
      title: '🔢 Fun with Numbers',
      description: '8/20 words',
      difficulty: 'Beginner',
      duration: '15 min',
      isPremium: false,
      progress: 40,
      xpReward: 75,
      icon: '🔢'
    },
    {
      id: 3,
      title: '🎨 Colors',
      description: 'Learn basic colors',
      difficulty: 'Beginner',
      duration: '10-15 min',
      isPremium: false,
      progress: 20,
      xpReward: 65,
      icon: '🎨',
      content: {
        learning: [
          { type: 'text', content: 'Red - Kɔkɔɔ' },
          { type: 'text', content: 'Blue - Bluu' },
          { type: 'text', content: 'Yellow - Atootoa' },
          { type: 'text', content: 'Green - Ahabammono' },
          { type: 'text', content: 'Black - Tuntum' },
          { type: 'text', content: 'White - Fitaa' },
          { type: 'text', content: 'Pink - Pinki' },
          { type: 'text', content: 'Purple - Bɔɔbɔɔ' },
          { type: 'text', content: 'Orange - ɔrenge' },
          { type: 'text', content: 'Brown - Ahaban' }
        ],
        quiz: [
          {
            question: 'What is the Twi word for "Red"?',
            options: ['Bluu', 'Kɔkɔɔ', 'Ahabammono', 'Tuntum'],
            correctAnswer: 'Kɔkɔɔ'
          },
          {
            question: 'How do you say "White" in Twi?',
            options: ['Fitaa', 'Tuntum', 'Pinki', 'Bluu'],
            correctAnswer: 'Fitaa'
          }
        ]
      }
    },
    // Intermediate Lessons (Building on basics, more complex concepts)
    {
      id: 4,
      title: '👨‍👩‍👧‍👦 My Family',
      description: 'Learn family member names and relationships',
      difficulty: 'Intermediate',
      duration: '12-15 min',
      isPremium: false,
      progress: 30,
      xpReward: 80,
      icon: '👨‍👩‍👧‍👦'
    },
    {
      id: 5,
      title: '🍎 Food & Drinks',
      description: 'Learn food names and how to order',
      difficulty: 'Intermediate',
      duration: '15-20 min',
      isPremium: false,
      progress: 50,
      xpReward: 85,
      icon: '🍎'
    },
    {
      id: 6,
      title: '🏠 Around the House',
      description: 'Common household items and rooms',
      difficulty: 'Intermediate',
      duration: '15 min',
      isPremium: true,
      progress: 35,
      xpReward: 90,
      icon: '🏠'
    },
    // Advanced Lessons (Complex concepts and cultural insights)
    {
      id: 7,
      title: '🌤️ Weather & Seasons',
      description: 'Talk about weather and seasonal changes',
      difficulty: 'Advanced',
      duration: '15 min',
      isPremium: false,
      progress: 25,
      xpReward: 100,
      icon: '🌤️'
    },
    {
      id: 8,
      title: '📅 Days & Months',
      description: 'Learn days of week and months of the year',
      difficulty: 'Advanced',
      duration: '15-20 min',
      isPremium: false,
      progress: 15,
      xpReward: 110,
      icon: '📅'
    },
    {
      id: 9,
      title: '🌍 Cultural Insights',
      description: 'Traditions and cultural context',
      difficulty: 'Advanced',
      duration: '15-20 min',
      isPremium: true,
      progress: 0,
      xpReward: 120,
      icon: '🌍'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LessonsList
          lessons={lessons}
          isPremium={isPremium}
          completedLessons={completedLessons}
          onStartLesson={startLesson}
          onTogglePremium={togglePremium}
        />
      </main>
    </div>
  );
};

export default Lessons;
