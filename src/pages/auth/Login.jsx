import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaUser, FaLock, FaUserShield } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginStreak, setLoginStreak] = useState(() => {
    return localStorage.getItem('loginStreak') || 0;
  });
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      console.log('Attempting login with:', formData.username, isAdmin);
      
      // Clear any previous auth data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Call login with the correct parameter format
      const result = await login(formData.username, formData.password, isAdmin);
      
      console.log('Login result:', result);
      
      if (result && result.success) {
        // Update login streak
        const newStreak = (loginStreak || 0) + 1;
        setLoginStreak(newStreak);
        localStorage.setItem('loginStreak', newStreak);
        
        // Show celebration animation
        setShowCelebration(true);
        
        // Store user data in localStorage (already done in AuthContext)
        // Just make sure we have the latest user data in state
        setUser(result.user);
        
        // Redirect to admin dashboard if user is an admin
        if (result.user?.role === 'admin') {
          navigate('/admin');
        }
      } else {
        // Shake animation on error
        document.getElementById('loginForm').classList.add('animate-shake');
        setTimeout(() => {
          document.getElementById('loginForm').classList.remove('animate-shake');
        }, 500);
        
        toast.error(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add animations to the document head
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.1); opacity: 1; }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); }
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      @keyframes bubble-float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
      .animate-shake {
        animation: shake 0.5s ease-in-out;
      }
      .animate-bounce-in {
        animation: bounceIn 0.5s ease-out;
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-yellow-200 p-4 relative overflow-hidden">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
            colors={['#FFD700', '#FFA500', '#FF69B4', '#00BFFF', '#FF1493']}
          />
          <div className="text-center bg-white p-8 rounded-2xl shadow-2xl animate-bounce border-4 border-yellow-300 border-opacity-50">
            <h2 className="text-3xl font-bold text-yellow-600 mb-3">Welcome Back! 🎉</h2>
            <p className="text-lg text-gray-600 mb-6">
              {user?.name ? `Great to see you again, ${user.name}!` : 'You\'re all set!'}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/home')}
                className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-md"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background animations */}
      <div className="absolute inset-0">
        <div className="absolute w-32 h-32 bg-yellow-200 rounded-full blur-2xl animate-bubble-float top-20 left-20"></div>
        <div className="absolute w-40 h-40 bg-pink-200 rounded-full blur-2xl animate-bubble-float-reverse top-1/3 right-1/4"></div>
        <div className="absolute w-28 h-28 bg-pink-100 rounded-full blur-2xl animate-bubble-float animation-delay-4000 bottom-20 right-20"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          id="loginForm"
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105 border-4 border-yellow-200 border-opacity-50"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaUser className="text-white text-3xl" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-yellow-600 mb-2">Welcome Back!</h1>
            <p className="text-pink-500">Sign in to continue your adventure</p>
          </div>

          {loginStreak > 0 && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mb-6 p-3 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-lg border-l-4 border-pink-400"
            >
              <p className="text-pink-800 font-medium flex items-center justify-center">
                <span className="text-xl mr-2">🔥</span>
                {loginStreak}-day login streak! Keep it up!
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-pink-400 group-hover:text-pink-600 transition-colors duration-300" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-pink-100 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
                placeholder="Username"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-pink-400 group-hover:text-pink-600 transition-colors duration-300" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-pink-100 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:ring-opacity-50 transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
                placeholder="Password"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-50 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
            </div>

            <div className="flex items-center">
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                  className="sr-only"
                />
                <div 
                  className={`block w-10 h-6 rounded-full transition-colors duration-300 ${isAdmin ? 'bg-pink-600' : 'bg-gray-300'}`}
                >
                  <div 
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${isAdmin ? 'translate-x-4' : ''}`}
                  ></div>
                </div>
              </div>
              <label htmlFor="isAdmin" className="flex items-center text-sm text-pink-700">
                <MdAdminPanelSettings className="mr-1" /> Admin Mode
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 ${
                isLoading 
                  ? 'bg-pink-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 shadow-lg'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-pink-600">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="font-semibold text-pink-700 hover:text-pink-800 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;