export const lessons = [
  {
    id: 1,
    title: "👋 1. Akwaaba (Greetings)",
    description: "Learn basic Twi greetings and introductions with fun activities!",
    difficulty: "beginner",
    duration: "10 min",
    progress: 0,
    isLocked: false,
    image: "/images/lessons/greetings/akwaaba.jpg",
    character: "/images/characters/kofi.png",
    content: {
      learning: [
        { 
          id: 1, 
          content: "Hello - Ete sen?",
          image: "/images/lessons/greetings/hello.jpg",
          audio: "/audio/ete_sen.mp3",
          emoji: "👋",
          color: "bg-blue-100",
          tip: "Wave your hand while saying it!"
        },
        { 
          id: 2, 
          content: "Good morning - Maakye",
          image: "/images/lessons/greetings/morning.jpg",
          audio: "/audio/maakye.mp3",
          emoji: "🌅",
          color: "bg-yellow-100",
          tip: "Use this when you see the sun rising!"
        },
        { 
          id: 3, 
          content: "Good afternoon - Maaha",
          image: "/images/lessons/greetings/afternoon.jpg",
          audio: "/audio/maaha.mp3",
          emoji: "☀️",
          color: "bg-orange-100",
          tip: "Perfect for lunchtime greetings!"
        },
        { 
          id: 4, 
          content: "Good evening - Maadwo",
          image: "/images/lessons/greetings/evening.jpg",
          audio: "/audio/maadwo.mp3",
          emoji: "🌙",
          color: "bg-purple-100",
          tip: "Use when the moon comes out!"
        },
        { 
          id: 5, 
          content: "How are you? - Wo ho te sɛn?",
          audio: "/audio/wo_ho_te_sen.mp3",
          emoji: "🤔",
          color: "bg-green-100",
          tip: "Ask with a smile!"
        },
        { 
          id: 6, 
          content: "I'm fine - Me ho yɛ",
          emoji: "😊",
          color: "bg-pink-100",
          tip: "Thumbs up when you say it!"
        },
        { 
          id: 7, 
          content: "What's your name? - Wo din de sɛn?",
          emoji: "👤",
          color: "bg-red-100",
          tip: "Point to yourself when asking!"
        },
        { 
          id: 8, 
          content: "My name is... - Me din de...",
          emoji: "👋",
          color: "bg-indigo-100",
          tip: "Say your name proudly!"
        },
        { 
          id: 9, 
          content: "Nice to meet you - Ɛyɛ me anigyeɛ",
          emoji: "🤝",
          color: "bg-teal-100",
          tip: "Shake hands when you say this!"
        },
        { 
          id: 10, 
          content: "Goodbye - Nante yie",
          emoji: "👋",
          color: "bg-blue-100",
          tip: "Wave goodbye with a big smile!"
        }
      ],
      interactive: [
        {
          type: "matching",
          title: "🌞 Time of Day Match",
          instruction: "Match each greeting to the right time of day",
          pairs: [
            { 
              twi: "Maakye", 
              english: "Good morning",
              image: "/images/lessons/greetings/morning-icon.png",
              audio: "/audio/maakye.mp3"
            },
            { 
              twi: "Maaha", 
              english: "Good afternoon",
              image: "/images/lessons/greetings/afternoon-icon.png",
              audio: "/audio/maaha.mp3"
            },
            { 
              twi: "Maadwo", 
              english: "Good evening",
              image: "/images/lessons/greetings/evening-icon.png",
              audio: "/audio/maadwo.mp3"
            }
          ],
          reward: "morning-star"
        },
        {
          type: "drag-drop",
          title: "🎭 Role Play Time",
          instruction: "Arrange the conversation in the correct order",
          background: "/images/backgrounds/classroom.png",
          characters: [
            { name: "Kofi", image: "/images/characters/kofi.png" },
            { name: "Ama", image: "/images/characters/ama.png" }
          ],
          items: [
            { text: "Ete sen?", speaker: "Kofi" },
            { text: "Me ho yɛ, medaase", speaker: "Ama" },
            { text: "Wo din de sɛn?", speaker: "Kofi" },
            { text: "Me din de Ama", speaker: "Ama" }
          ],
          reward: "conversation-badge"
        },
        {
          type: "fill-blank",
          title: "🎤 Speak & Record",
          instruction: "Record yourself saying these greetings",
          phrases: [
            { text: "Maakye", audio: "/audio/maakye.mp3" },
            { text: "Maaha", audio: "/audio/maaha.mp3" },
            { text: "Maadwo", audio: "/audio/maadwo.mp3" }
          ],
          reward: "microphone-badge"
        },
        {
          type: "memory",
          title: "🧠 Memory Game",
          instruction: "Find matching pairs of Twi and English greetings",
          pairs: [
            { twi: "Ete sen?", english: "Hello?" },
            { twi: "Wo ho te sɛn?", english: "How are you?" },
            { twi: "Me din de...", english: "My name is..." },
            { twi: "Nante yie", english: "Goodbye" }
          ],
          reward: "memory-medal"
        }
      ],
      quiz: [
        {
          question: "How do you say 'Hello' in Twi?",
          options: ["Maakye", "Ete sen", "Maadwo", "Nante yie"],
          correctAnswer: "Ete sen"
        },
        {
          question: "What does 'Maakye' mean?",
          options: ["Good night", "Good morning", "Good evening", "Goodbye"],
          correctAnswer: "Good morning"
        },
        {
          question: "How do you ask someone's name in Twi?",
          options: ["Wo ho te sɛn?", "Wo din de sɛn?", "Wote saa?", "Wofiri he?"],
          correctAnswer: "Wo din de sɛn?"
        },
        {
          question: "What does 'Maadwo' mean?",
          options: ["Good afternoon", "Good night", "Good evening", "Good morning"],
          correctAnswer: "Good evening"
        },
        {
          question: "How do you say 'Nice to meet you' in Twi?",
          options: [
            "Ɛyɛ me anigyeɛ",
            "Me da wo ase",
            "Mepa wo kyɛw",
            "Yɛbɛhyia bio"
          ],
          correctAnswer: "Ɛyɛ me anigyeɛ"
        }
      ]
    }
  },
  {
    id: 2,
    title: "2. Family Members",
    description: "Learn how to talk about family in Twi",
    difficulty: "beginner",
    duration: "15 min",
    progress: 0,
    isLocked: true,
    image: "/images/lessons/family/family.jpg",
    content: {
      learning: [
        { id: 1, content: "Family - Abusua" },
        { id: 2, content: "Father - Papa" },
        { id: 3, content: "Mother - Maame" },
        { id: 4, content: "Brother - Nua (barima)" },
        { id: 5, content: "Sister - Nua (bea)" },
        { id: 6, content: "Grandfather - Nana" },
        { id: 7, content: "Grandmother - Nana" },
        { id: 8, content: "Uncle - Wofa" },
        { id: 9, content: "Aunt - Auntie" },
        { id: 10, content: "Cousin - Nua ba" }
      ],
      quiz: [
        {
          question: "What is 'family' in Twi?",
          options: ["Nnipa", "Abusua", "Fie", "Nkuro"],
          correctAnswer: "Abusua"
        },
        {
          question: "How do you say 'mother' in Twi?",
          options: ["Papa", "Nana", "Maame", "Auntie"],
          correctAnswer: "Maame"
        },
        {
          question: "What does 'nua' mean?",
          options: ["Friend", "Sibling", "Parent", "Child"],
          correctAnswer: "Sibling"
        },
        {
          question: "How do you say 'grandfather' in Twi?",
          options: ["Wofa", "Papa", "Nana", "Agyapɔn"],
          correctAnswer: "Nana"
        },
        {
          question: "What is 'aunt' in Twi?",
          options: ["Auntie", "Maame", "Nana", "Sister"],
          correctAnswer: "Auntie"
        }
      ]
    }
  },
  {
    id: 3,
    title: "3. Numbers 1-10",
    description: "Learn to count in Twi",
    difficulty: "beginner",
    duration: "15 min",
    progress: 0,
    isLocked: true,
    image: "/images/lessons/numbers/counting.jpg",
    content: {
      learning: [
        { id: 1, content: "1 - baako" },
        { id: 2, content: "2 - mmienu" },
        { id: 3, content: "3 - mmiɛnsa" },
        { id: 4, content: "4 - ɛnan" },
        { id: 5, content: "5 - enum" },
        { id: 6, content: "6 - nsia" },
        { id: 7, content: "7 - nson" },
        { id: 8, content: "8 - nwɔtwe" },
        { id: 9, content: "9 - nkron" },
        { id: 10, content: "10 - edu" }
      ],
      quiz: [
        {
          question: "How do you say 'one' in Twi?",
          options: ["baako", "mmienu", "mmiɛnsa", "ɛnan"],
          correctAnswer: "baako"
        },
        {
          question: "What does 'enum' mean?",
          options: ["Three", "Four", "Five", "Six"],
          correctAnswer: "Five"
        },
        {
          question: "How do you say 'ten' in Twi?",
          options: ["nwɔtwe", "nkron", "edu", "nson"],
          correctAnswer: "edu"
        },
        {
          question: "What does 'nson' mean?",
          options: ["Five", "Six", "Seven", "Eight"],
          correctAnswer: "Seven"
        },
        {
          question: "Which of these means 'nine' in Twi?",
          options: ["nsia", "nson", "nwɔtwe", "nkron"],
          correctAnswer: "nkron"
        }
      ]
    }
  }
];
