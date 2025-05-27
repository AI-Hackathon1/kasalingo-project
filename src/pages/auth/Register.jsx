import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Prepare the payload with isAdmin flag
      const payload = {
        ...formData,
        isAdmin: isAdmin,
        name: formData.userName, // Add name field required by the API
        age: '10' // Default age since it's required by the API
      };
      
      // Call the register function with the payload
      const { success, error: registerError } = await register(payload);
      
      if (success) {
        setShowCelebration(true);
        
        // Redirect based on user type after a short delay
        setTimeout(() => {
          navigate(isAdmin ? '/admin/login' : '/login');
        }, 3000);
      } else {
        throw new Error(registerError || 'Registration failed');
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         err.message || 
                         'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bubble-float {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(-20px) translateX(10px); }
        100% { transform: translateY(0) translateX(0); }
      }
      
      @keyframes bubble-float-reverse {
        0% { transform: translateY(0) translateX(0); }
        50% { transform: translateY(20px) translateX(-10px); }
        100% { transform: translateY(0) translateX(0); }
      }
      
      .animate-bubble-float {
        animation: bubble-float 8s ease-in-out infinite;
      }
      
      .animate-bubble-float-reverse {
        animation: bubble-float-reverse 10s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-pink-200 p-4 relative overflow-hidden">
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
          <div className="text-center bg-white p-6 rounded-2xl shadow-2xl animate-bounce border-4 border-yellow-300 border-opacity-50">
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">Welcome Aboard! 🎉</h2>
            <p className="text-gray-600 mb-4">Your {isAdmin ? 'admin ' : ''}account has been created successfully!</p>
            <button
              onClick={() => navigate(isAdmin ? '/admin/login' : '/login')}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-md"
            >
              Go to {isAdmin ? 'Admin ' : ''}Login
            </button>
          </div>
        </div>
      )}

      {/* Background animations */}
      <div className="absolute inset-0">
        <div className="absolute w-28 h-28 bg-yellow-200 rounded-full blur-2xl animate-bubble-float top-24 left-24"></div>
        <div className="absolute w-36 h-36 bg-pink-200 rounded-full blur-2xl animate-bubble-float-reverse top-56 right-56"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 border-4 border-yellow-200 border-opacity-50"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </motion.div>
            <h1 className="text-3xl font-bold text-yellow-600 mb-1">
              {isAdmin ? 'Create Admin Account' : 'Create Account'}
            </h1>
            <p className="text-pink-500">
              {isAdmin ? 'Register as an administrator' : 'Join the adventure! 🚀'}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg border-l-4 border-red-500"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="relative group">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-xl border-2 border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50 transition-all duration-200 bg-white/70"
                  placeholder=" "
                />
                <label 
                  htmlFor="userName" 
                  className="absolute left-3 -top-2.5 px-1 text-xs text-yellow-600 bg-white/80 rounded-full transition-all duration-200 pointer-events-none"
                >
                  Username
                </label>
              </div>
              
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-xl border-2 border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50 transition-all duration-200 bg-white/70"
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-3 -top-2.5 px-1 text-xs text-yellow-600 bg-white/80 rounded-full transition-all duration-200 pointer-events-none"
                >
                  Email
                </label>
              </div>

              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength="8"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-xl border-2 border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50 transition-all duration-200 bg-white/70"
                  placeholder=" "
                />
                <label 
                  htmlFor="password" 
                  className="absolute left-3 -top-2.5 px-1 text-xs text-yellow-600 bg-white/80 rounded-full transition-all duration-200 pointer-events-none"
                >
                  Password (min 8 chars)
                </label>
              </div>
              
              <div className="relative group">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm rounded-xl border-2 border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50 transition-all duration-200 bg-white/70"
                  placeholder=" "
                />
                <label 
                  htmlFor="confirmPassword" 
                  className="absolute left-3 -top-2.5 px-1 text-xs text-yellow-600 bg-white/80 rounded-full transition-all duration-200 pointer-events-none"
                >
                  Confirm Password
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="admin"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                    className="sr-only"
                  />
                  <div className={`w-10 h-5 rounded-full transition-colors duration-300 ${isAdmin ? 'bg-pink-500' : 'bg-yellow-200'}`}>
                    <div className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition-transform duration-300 ${isAdmin ? 'translate-x-5' : ''}`}></div>
                  </div>
                </div>
                <span className="text-yellow-700">Register as admin</span>
              </label>
              
              <Link 
                to={isAdmin ? "/admin/login" : "/login"} 
                className="text-pink-500 hover:text-pink-600 hover:underline font-medium"
              >
                Already have an account?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-3 px-4 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isAdmin ? 'Creating Admin Account...' : 'Creating Account...'}
                </span>
              ) : (
                isAdmin ? 'Create Admin Account' : 'Create Account'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;