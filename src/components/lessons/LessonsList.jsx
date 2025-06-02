import React, { useEffect, useRef } from 'react';
import { Button } from '@components/ui/button';
import { Crown, Sparkles } from 'lucide-react';
import LessonCard from './LessonCard';
import { motion, AnimatePresence } from 'framer-motion';

const LessonsList = ({ 
  lessons, 
  isPremium, 
  onStartLesson, 
  onTogglePremium,
  completedLessons 
}) => {
  return (
    <div className="space-y-8">
      {/* User Progress Header with Animated Background */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl shadow-lg mb-8 group"
        whileHover={{ 
          scale: 1.01,
          transition: { duration: 0.3 }
        }}
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 opacity-90"
            initial={{ opacity: 0.9 }}
            whileHover={{
              opacity: 1,
              background: 'linear-gradient(135deg, rgba(237, 233, 254, 0.9) 0%, rgba(249, 168, 212, 0.9) 50%, rgba(191, 219, 254, 0.9) 100%)',
              transition: { duration: 0.5 }
            }}
          ></motion.div>
          <motion.div 
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHBhdGggZmlsbD0idXJsKCNnKSIgc3Ryb2tlPSJub25lIiBkPSJNLTEsLTFINDYyTDQ2MCw0NjBINzVMMCwwWiI+PC9wYXRoPjwvc3ZnPg==')] opacity-20"
            initial={{ opacity: 0.2 }}
            whileHover={{
              opacity: 0.3,
              transition: { duration: 0.5 }
            }}
          ></motion.div>
          
          {/* Floating Elements */}
          <AnimatePresence>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 - 10,
                  y: Math.random() * 100 - 50,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
                animate={{
                  x: Math.random() * 100 - 10 + (Math.random() > 0.5 ? 50 : -50),
                  y: Math.random() * 100 - 50 + (Math.random() > 0.5 ? 30 : -30),
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className={`absolute rounded-full w-16 h-16 md:w-24 md:h-24 ${
                  i % 3 === 0 ? 'bg-pink-300' : i % 2 === 0 ? 'bg-purple-300' : 'bg-blue-300'
                } blur-xl`}
              />
            ))}
          </AnimatePresence>
        </div>
        
        <div className="relative z-10 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ 
                scale: 1.02,
                x: 5,
                transition: { type: 'spring', stiffness: 400, damping: 10 }
              }}
            >
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                whileHover={{
                  background: 'linear-gradient(90deg, #7c3aed 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: { duration: 0.3 }
                }}
              >
                Hello, User! <motion.span 
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  whileHover={{
                    scale: 1.5,
                    rotate: [0, 20, -15, 20, -10, 15, 0],
                    transition: { duration: 1.5 }
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop' }}
                  style={{ display: 'inline-block', transformOrigin: '70% 80%' }}
                >
                  👋
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-gray-700 mt-1 text-lg"
                whileHover={{
                  x: 5,
                  color: '#4f46e5',
                  transition: { duration: 0.3 }
                }}
              >
                Continue your learning journey
              </motion.p>
            </motion.div>
          
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="bg-purple-50 rounded-lg p-3 flex-1 min-w-[180px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-purple-800">Daily Streak</span>
                  <span className="text-sm font-bold text-purple-800">🔥 3 days</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-3 flex-1 min-w-[180px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-yellow-800">XP Points</span>
                  <span className="text-sm font-bold text-yellow-800">🌟 {completedLessons.length * 10} XP</span>
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant={isPremium ? "default" : "outline"} 
                  className="flex items-center space-x-2 h-10 mt-2 sm:mt-0 group/button"
                  onClick={onTogglePremium}
                >
                  <motion.span
                    animate={{ rotate: isPremium ? 0 : [0, 10, -5, 10, 0] }}
                    transition={{
                      repeat: isPremium ? 0 : Infinity,
                      repeatType: 'reverse',
                      duration: 2,
                      ease: 'easeInOut'
                    }}
                  >
                    <Crown className="h-4 w-4 group-hover/button:fill-yellow-400 transition-colors" />
                  </motion.span>
                  <span>{isPremium ? 'Premium Active' : 'Go Premium'}</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Group lessons by difficulty */}
      {['Beginner', 'Intermediate', 'Advanced'].map((difficulty) => {
        const filteredLessons = lessons.filter(lesson => lesson.difficulty === difficulty);
        if (filteredLessons.length === 0) return null;
        
        return (
          <div key={difficulty} className="mb-10">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {difficulty} Lessons
              </h2>
              <span className="ml-3 px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                {filteredLessons.length} {filteredLessons.length === 1 ? 'lesson' : 'lessons'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  isPremiumUser={isPremium}
                  onStartLesson={onStartLesson}
                  isCompleted={completedLessons.includes(lesson.id)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {!isPremium && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-yellow-50 text-yellow-800 px-6 py-4 rounded-lg">
            <Crown className="h-6 w-6 mr-2" />
            <span className="font-medium">Unlock all premium lessons and features!</span>
            <Button 
              variant="default" 
              className="ml-4"
              onClick={onTogglePremium}
            >
              Go Premium
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsList;
