import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { apiLogin, apiAdminLogin } from '../../service/auth';
import Confetti from 'react-confetti';

const Login = () => {
  const navigate = useNavigate(); //htmlFor navigation
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mascotState, setMascotState] = useState('idle');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [streakCount, setStreakCount] = useState(() => {
    return localStorage.getItem('streakCount') ? parseInt(localStorage.getItem('streakCount')) : 0;
  });
  
  useEffect(() => {
    // Set mascot to wave when page loads
    setMascotState('wave');
    const timer = setTimeout(() => setMascotState('idle'), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  // Function to update mascot based on input focus
  const handleFocus = () => setMascotState('excited');
  const handleBlur = () => setMascotState('idle');
  
  // handle login submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMascotState('thinking');
    const formData = new FormData(event.target);
    
    // Create request body object to match backend API requirements
    const requestBody = {
      userName: formData.get('userName'),
      password: formData.get('password')
    };
    
    // Check if this is an admin login
    const isAdmin = requestBody.userName && requestBody.userName.startsWith('admin_');
    
    try {
      const res = isAdmin 
        ? await apiAdminLogin(requestBody)
        : await apiLogin(requestBody);
      
      // For admin login, we might not get a userType in response
      const role = isAdmin ? 'admin' : (res.data.user?.userType || 'user');
      
      // Store token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);

      // Update streak count for regular users
      if (role !== 'admin') {
        const newStreakCount = streakCount + 1;
        localStorage.setItem('streakCount', newStreakCount);
        setStreakCount(newStreakCount);
      }
      
      // Show celebration animation
      setIsLoading(false);
      setMascotState('celebrate');
      setShowCelebration(true);
      
      // Play success sound
      const successSound = new Audio('/sounds/login-success.mp3');
      successSound.play().catch(e => console.log('Sound play failed', e));
      
      // Navigate after a short delay to enjoy the celebration
      setTimeout(() => {
        navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      setMascotState('sad');
      setLoginAttempts(prev => prev + 1);
      
      // Show error message
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      alert(errorMessage);
      
      // Show helpful hint after 2 failed attempts
      if (loginAttempts >= 1) {
        // Play gentle hint sound
        const hintSound = new Audio('/sounds/hint.mp3');
        hintSound.play().catch(e => console.log('Sound play failed', e));
        
        // Show admin hint if username starts with admin_ but login failed
        if (formData.get('userName').startsWith('admin_')) {
          alert('Make sure you are using the correct admin credentials. Admin accounts must be created separately from regular user accounts.');
        }
      }
    }
  };

  // Get a random encouragement message
  const getRandomEncouragement = () => {
    const messages = [
      "You're doing great!",
      "Ready for an adventure?",
      "Time to learn and have fun!",
      "Your friends are waiting for you!",
      "Let's play and learn together!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-yellow-200 p-4 relative overflow-hidden">
      {/* Celebration animation */}
      {showCelebration && (
        <>
          <Confetti 
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={300}
            colors={['#FFD700', '#FFA500', '#FF69B4', '#00BFFF', '#FF1493']}
          />
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none">
            <div className="animate-bounce text-4xl mb-4">
              🎉 Welcome Back! 🎊
            </div>
            {streakCount > 1 && (
              <div className="animate-pulse text-2xl text-center">
                <span className="font-bold">Day {streakCount} Streak!</span> 
                <br/>
                <span className="text-xl">Keep it up! 🌟</span>
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Mascot character */}
      <div className="absolute top-10 right-10 z-30 w-32 h-32 transform transition-all duration-500" 
        style={{
          transform: mascotState === 'excited' ? 'translateY(-10px)' : 
                    mascotState === 'wave' ? 'rotate(5deg)' :
                    mascotState === 'sad' ? 'rotate(-5deg)' :
                    mascotState === 'celebrate' ? 'scale(1.2)' : 'none'
        }}>
        <div className="relative w-full h-full">
          {/* Base mascot */}
          <div className="absolute inset-0 flex items-center justify-center text-7xl">
            {mascotState === 'idle' && '🦊'}
            {mascotState === 'wave' && '👋🦊'}
            {mascotState === 'excited' && '😃🦊'}
            {mascotState === 'thinking' && '🤔🦊'}
            {mascotState === 'celebrate' && '🥳🦊'}
            {mascotState === 'sad' && '😔🦊'}
          </div>
          
          {/* Speech bubble */}
          {(loginAttempts > 1 && mascotState === 'sad') && (
            <div className="absolute -top-14 -left-40 bg-white rounded-lg p-2 shadow-lg animate-pulse">
              <p className="text-xs">Try your username and password again!</p>
              <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 rotate-45 w-3 h-3 bg-white"></div>
            </div>
          )}
          
          {mascotState === 'wave' && (
            <div className="absolute -top-14 -left-20 bg-white rounded-lg p-2 shadow-lg">
              <p className="text-xs">{getRandomEncouragement()}</p>
              <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 rotate-45 w-3 h-3 bg-white"></div>
            </div>
          )}
        </div>
      </div>

      {/* Background animations */}
      <div className="absolute inset-0">
        {/* Floating bubbles */}
        <div className="absolute w-28 h-28 bg-yellow-200 rounded-full blur-2xl animate-bubble-float top-24 left-24"></div>
        <div className="absolute w-36 h-36 bg-pink-200 rounded-full blur-2xl animate-bubble-float-reverse top-56 right-56"></div>
        <div className="absolute w-24 h-24 bg-yellow-300 rounded-full blur-2xl animate-bubble-float top-80 left-80"></div>
        
        {/* Pulsing circles */}
        <div className="absolute w-20 h-20 bg-pink-400 rounded-full blur-sm animate-pulse-fast top-32 right-32"></div>
        <div className="absolute w-16 h-16 bg-yellow-400 rounded-full blur-sm animate-pulse-slow bottom-48 left-48"></div>
        
        {/* Rotating arcs */}
        <div className="absolute w-72 h-1 bg-pink-500 blur-sm animate-arc-move top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-56 h-1 bg-yellow-500 blur-sm animate-arc-move-reverse top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen">
        <div className="bg-gradient-to-br from-yellow-50 to-pink-100 rounded-2xl shadow-lg p-6 w-full max-w-md transform transition-all duration-300 hover:scale-105 border-4 border-yellow-300 border-opacity-50">
          <h1 className="text-2xl sm:text-3xl text-yellow-500 font-bold text-center mb-6 sm:mb-8 animate-pulse">
            Welcome Back!
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="relative overflow-hidden group">
              <input
                type="text"
                id="userName"
                name="userName"
                required
                placeholder="Enter your username"
                className="w-full p-2.5 sm:p-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 bg-yellow-50 bg-opacity-70"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-300 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-8 transition-all duration-500">
                <span className="text-lg">✨</span>
              </div>
            </div>

            <div className="relative overflow-hidden group">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter password"
                className="w-full p-2.5 sm:p-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 bg-pink-50 bg-opacity-70"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-300 to-pink-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-8 transition-all duration-500">
                <span className="text-lg">✨</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-yellow-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 font-medium">
                  Remember me
                </label>
              </div>

              <a href="/forgot-password" className="text-sm text-pink-500 hover:text-pink-600 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-yellow-400 to-pink-400 text-white py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg font-semibold hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} border-2 border-white`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="relative w-6 h-6 mr-3">
                    {/* Animated character running instead of spinner */}
                    <div className="absolute inset-0 animate-spin-slow text-lg">
                      🏃
                    </div>
                  </div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>

            <div className="relative mt-6 pt-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-yellow-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-gradient-to-r from-yellow-100 to-pink-100 text-sm text-gray-500">or</span>
              </div>
            </div>

            <p className="text-center text-gray-600 mt-4 sm:mt-2 text-sm sm:text-base">
              Don't have an account?{' '}
              <a href="/register" className="text-yellow-500 hover:text-yellow-600 font-medium">
                Register here
              </a>
            </p>
          </form>
          
          {/* Decorative elements */}
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full shadow-md transform rotate-12"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

// Add animation classes
const blobAnimation = `@keyframes bubble-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-30px);
  }
}

@keyframes bubble-float-reverse {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(30px);
  }
}

@keyframes pulse-fast {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes pulse-slow {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes arc-move {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  50% {
    transform: translateX(30px) rotate(10deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
}

@keyframes arc-move-reverse {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  50% {
    transform: translateX(-30px) rotate(-10deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
}

@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-bubble-float {
  animation: bubble-float 8s ease-in-out infinite;
}

.animate-bubble-float-reverse {
  animation: bubble-float-reverse 8s ease-in-out infinite;
}

.animate-pulse-fast {
  animation: pulse-fast 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-arc-move {
  animation: arc-move 6s ease-in-out infinite;
}

.animate-arc-move-reverse {
  animation: arc-move-reverse 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}`;

export default Login;