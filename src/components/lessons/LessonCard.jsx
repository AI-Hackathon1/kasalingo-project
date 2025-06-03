import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Target, Play, Lock, Star, ChevronRight } from 'lucide-react';

const LessonCard = ({ 
  lesson, 
  isPremiumUser, 
  onStartLesson, 
  isCompleted,
  index = 0 
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isLocked = lesson.isPremium && !isPremiumUser;
  const progress = Math.min(Math.max(0, lesson.progress || 0), 100);
  
  const handleCardClick = (e) => {
    e.preventDefault();
    if (isLocked) return;
    // Use the path if available, otherwise fall back to the ID
    const targetPath = lesson.path || `/lessons/${lesson.id}`;
    navigate(targetPath);
  };
  
  // Color variants based on difficulty level
  const getDifficultyStyles = (difficulty) => {
    const styles = {
      Beginner: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200',
        icon: '🌱',
        gradient: 'from-green-500 to-teal-500'
      },
      Intermediate: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200',
        icon: '📚',
        gradient: 'from-blue-500 to-indigo-500'
      },
      Advanced: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-200',
        icon: '🏆',
        gradient: 'from-purple-600 to-pink-600'
      }
    };
    return styles[difficulty] || styles.Beginner;
  };

  // Get styles based on current lesson difficulty
  const difficultyStyles = getDifficultyStyles(lesson.difficulty || 'Beginner');
  
  // Color variants based on progress
  const getProgressColor = () => {
    if (progress < 30) return 'from-red-500 to-pink-500';
    if (progress < 70) return 'from-yellow-500 to-orange-500';
    return difficultyStyles.gradient;
  };

  return (
    <motion.div 
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${!isLocked ? 'cursor-pointer hover:shadow-lg' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => !isLocked && setIsHovered(true)}
      onHoverEnd={() => !isLocked && setIsHovered(false)}
      onClick={handleCardClick}
      role={!isLocked ? 'button' : undefined}
      tabIndex={!isLocked ? 0 : undefined}
      onKeyDown={(e) => !isLocked && e.key === 'Enter' && handleCardClick(e)}
      aria-label={!isLocked ? `Start ${lesson.title} lesson` : 'Premium lesson - upgrade to access'}
    >
      {/* Premium Banner */}
      {isLocked && (
        <div className="absolute -top-2 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
          Premium
        </div>
      )}
      
      {/* Colorful edge */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${isLocked ? 'from-yellow-400 to-yellow-500' : getProgressColor()} rounded-l-lg`}></div>
      
      <div className={`bg-white rounded-r-2xl shadow-sm border-l-0 border border-gray-200 overflow-hidden 
        transition-all duration-300 ${isHovered ? 'shadow-lg -translate-y-1' : ''} ${isLocked ? 'opacity-80' : ''}`}>
        <div className="p-6">
          <div className="flex items-start">
            {/* Icon with gradient border */}
            <div className="relative mr-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl 
                ${isLocked ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' : `bg-gradient-to-br ${difficultyStyles.gradient}`} p-0.5`}>
                <div className={`w-full h-full ${isLocked ? 'bg-yellow-50' : 'bg-white'} rounded-lg flex items-center justify-center`}>
                  {lesson.icon || difficultyStyles.icon}
                </div>
              </div>
              {isCompleted && !isLocked && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                  <Star className="h-3 w-3 text-white fill-current" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center mt-1 space-x-1">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyStyles.bg} ${difficultyStyles.text} ${difficultyStyles.border}`}>
                      {lesson.difficulty || 'Beginner'}
                    </span>
                    {lesson.difficulty === 'Advanced' && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                        Challenge!
                      </span>
                    )}
                  </div>
                </div>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </motion.div>
              </div>
              
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {lesson.description}
              </p>
              
              <div className="flex items-center text-gray-500 text-sm mt-3 space-x-3">
                <div className="flex items-center bg-blue-50 px-2.5 py-1 rounded-full">
                  <FileText className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                  <span className="text-xs font-medium text-blue-700">Quiz</span>
                </div>
                <div className="flex items-center bg-purple-50 px-2.5 py-1 rounded-full">
                  <Target className="h-3.5 w-3.5 mr-1.5 text-purple-500" />
                  <span className="text-xs font-medium text-purple-700">{lesson.wordCount || '4'} Words</span>
                </div>
              </div>

              {/* Progress Bar - Only show for non-locked lessons */}
              {!isLocked && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">Progress</span>
                    <span className="text-xs font-semibold text-gray-700">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full bg-gradient-to-r ${getProgressColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {progress}% Complete
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <motion.button 
            onClick={() => !isLocked && onStartLesson(lesson.id, isLocked)}
            disabled={isLocked}
            whileTap={{ scale: isLocked ? 1 : 0.98 }}
            className={`w-full mt-4 py-3 px-4 rounded-lg font-medium flex items-center justify-center relative overflow-hidden ${
              isLocked 
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md hover:shadow-lg' 
                : `bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-600 text-white shadow-sm ${isHovered ? 'shadow-md' : ''}`
            }`}
          >
            {isLocked ? (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Unlock with Premium
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Learn & Quiz
                <motion.span 
                  className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  animate={{ x: isHovered ? 5 : -10 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonCard;
