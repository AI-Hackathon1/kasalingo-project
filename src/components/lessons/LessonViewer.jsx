import React, { useState } from 'react';
import { Button } from '@components/ui/button';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Volume2, 
  CheckCircle, 
  X, 
  Mic, 
  MicOff, 
  Star, 
  Trophy, 
  RefreshCw, 
  Sparkles 
} from 'lucide-react';

const LessonViewer = ({ lesson, onBack }) => {
  const [currentPhase, setCurrentPhase] = useState('learning');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  if (!lesson) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>Loading lesson...</p>
      </div>
    );
  }

  const speakWord = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = lesson.content.quiz[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion.question,
      selectedAnswer: answer,
      isCorrect
    }]);

    setTimeout(() => {
      if (currentQuestionIndex < lesson.content.quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
      } else {
        setCurrentPhase('results');
      }
    }, 1000);
  };

  const renderStars = (count) => {
    return (
      <div className="flex justify-center space-x-1">
        {[...Array(count)].map((_, i) => (
          <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
        ))}
        {[...Array(3 - count)].map((_, i) => (
          <Star key={i + count} className="h-6 w-6 text-gray-300" />
        ))}
      </div>
    );
  };

  const renderLearningPhase = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-xl">
        <h2 className="text-2xl font-bold text-center text-purple-800">
          Let's Learn: {lesson.title.replace(/^[^\w\s]+/, '').trim()}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lesson.content.learning.map((item, index) => (
          <motion.div 
            key={index} 
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{item.content}</span>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600"
                onClick={() => speakWord(item.content.split(' - ')[1] || item.content)}
              >
                <Volume2 className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="pt-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={() => setCurrentPhase('quiz')}
        >
          <Trophy className="mr-2 h-5 w-5" />
          Take the Quiz!
        </Button>
      </motion.div>
    </motion.div>
  );

  const renderQuizPhase = () => {
    const currentQuestion = lesson.content.quiz[currentQuestionIndex];
    
    return (
      <motion.div 
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <span className="font-bold text-blue-600">
                {currentQuestionIndex + 1}
              </span>
              <span className="text-gray-500">/{lesson.content.quiz.length}</span>
            </div>
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {lesson.content.quiz.length}
            </span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-full shadow-sm">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-bold">{score}</span>
          </div>
        </div>
        
        <motion.h3 
          className="text-2xl font-bold text-center text-gray-800 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {currentQuestion.question}
        </motion.h3>
        
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = selectedAnswer === option;
            const isAnswered = selectedAnswer !== '';
            
            let buttonClass = "w-full justify-start text-left py-6 text-base font-medium ";
            
            if (isAnswered) {
              if (isCorrect) {
                buttonClass += "bg-green-50 border-green-300 text-green-700 hover:bg-green-50 ";
              } else if (isSelected) {
                buttonClass += "bg-red-50 border-red-300 text-red-700 hover:bg-red-50 ";
              } else {
                buttonClass += "bg-gray-50 border-gray-200 text-gray-600 ";
              }
            } else {
              buttonClass += "bg-white border-gray-200 hover:bg-gray-50 ";
            }
            
            return (
              <motion.div
                key={idx}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
              >
                <Button
                  variant="outline"
                  className={buttonClass}
                  onClick={() => !isAnswered && handleAnswerSelect(option)}
                  disabled={isAnswered}
                >
                  <div className="flex items-center w-full">
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full mr-3 ${
                      isAnswered && isCorrect ? 'bg-green-100 text-green-600' : 
                      isSelected ? 'bg-red-100 text-red-600' : 
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-left">{option}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                    )}
                    {isSelected && !isCorrect && (
                      <X className="ml-auto h-5 w-5 text-red-500" />
                    )}
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    );
  };

  const renderResultsPhase = () => {
    const percentage = Math.round((score / lesson.content.quiz.length) * 100);
    const stars = Math.min(3, Math.ceil(percentage / 33.33));
    
    return (
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-30"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold text-yellow-600 mb-2">{percentage}%</h2>
            <p className="text-gray-600">You got {score} out of {lesson.content.quiz.length} correct!</p>
            <div className="flex justify-center mt-4">
              {renderStars(stars)}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => {
              setCurrentPhase('learning');
              setCurrentQuestionIndex(0);
              setScore(0);
              setSelectedAnswer('');
              setAnsweredQuestions([]);
            }}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg font-semibold"
            onClick={onBack}
          >
            Back to Lessons
          </Button>
        </div>
        
        <div className="mt-8 text-left bg-gray-50 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            What You Learned
          </h3>
          <ul className="space-y-2">
            {lesson.content.learning.slice(0, 5).map((item, idx) => (
              <li key={idx} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{item.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  };

  const renderPhase = () => {
    switch (currentPhase) {
      case 'learning':
        return renderLearningPhase();
      case 'quiz':
        return renderQuizPhase();
      case 'results':
        return renderResultsPhase();
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-6 text-gray-600 hover:bg-gray-100"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Lessons
      </Button>
      
      {renderPhase()}
    </div>
  );
};

export default LessonViewer;
