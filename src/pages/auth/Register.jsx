import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiRegister, apiRegisterAdmin } from '../../service/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { MdAdminPanelSettings } from 'react-icons/md';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    email: '',
    age: '',
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
    if (isAdmin && !formData.userName.startsWith('admin_')) {
      setError("Admin username must start with 'admin_'");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Prepare data for API - ensure field names match exactly what the server expects
      const userData = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };
      
      // Add additional fields for regular users
      if (!isAdmin) {
        userData.name = formData.name;
        userData.age = formData.age;
      }
      
      console.log('Sending registration data:', userData); // Debug log
      
      // Call appropriate register API
      const response = isAdmin 
        ? await apiRegisterAdmin(userData)
        : await apiRegister(userData);
      
      console.log('Registration successful:', response.data); // Debug log
      
      // Show success message and redirect
      setShowCelebration(true);
      toast.success('Account created successfully!');
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         err.message || 
                         'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err.response?.data || err);
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
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      @keyframes bubble-float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      @keyframes bubble-float-reverse {
        0% { transform: translateY(0px); }
        50% { transform: translateY(20px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse-fast {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.5; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes pulse-slow {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes arc-move {
        0% { transform: translateX(0px); }
        50% { transform: translateX(20px); }
        100% { transform: translateX(0px); }
      }
      @keyframes arc-move-reverse {
        0% { transform: translateX(0px); }
        50% { transform: translateX(-20px); }
        100% { transform: translateX(0px); }
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
          <div className="text-center bg-white p-8 rounded-lg shadow-xl animate-bounce border-4 border-yellow-300 border-opacity-50">
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">Welcome Aboard! 🎉</h2>
            <p className="text-gray-600 mb-4">Your account has been created successfully!</p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-md"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-yellow-50 to-pink-100 rounded-2xl shadow-lg p-6 w-full max-w-md transform transition-all duration-300 hover:scale-105 border-4 border-yellow-300 border-opacity-50"
        >
          <h1 className="text-2xl sm:text-3xl text-yellow-600 font-bold text-center mb-6 sm:mb-8">
            {isAdmin ? 'Admin Sign Up' : 'Create Your Account'}
          </h1>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center border border-red-200"
            >
              <span className="mr-2">⚠️</span>
              <span className="flex-1">{error}</span>
              <button 
                onClick={() => setError('')}
                className="text-red-400 hover:text-red-600 text-lg"
              >
                &times;
              </button>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative overflow-hidden group">
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                  {isAdmin ? 'Admin Username' : 'Username'} *
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/70 transition-all duration-200"
                  placeholder={isAdmin ? 'admin_username' : 'fun_username'}
                  required
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>

              {!isAdmin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/70 transition-all duration-200"
                      placeholder="Your name"
                      required={!isAdmin}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                  
                  <div className="relative overflow-hidden group">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="4"
                      max="12"
                      className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/70 transition-all duration-200"
                      placeholder="4-12"
                      required={!isAdmin}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              )}

              <div className="relative overflow-hidden group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/70 transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/70 transition-all duration-200"
                    placeholder="•••••••"
                    required
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
                
                <div className="relative overflow-hidden group">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white/70 transition-all duration-200"
                    placeholder="•••••••"
                    required
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>

              <div className="flex items-center mt-4">
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="admin-toggle"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                </div>
                <label htmlFor="admin-toggle" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Register as admin
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 px-6 text-center text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:scale-95 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-pink-500 hover:from-yellow-500 hover:to-pink-600'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="mr-2">🚀</span> Create Account
                    </span>
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-bold text-yellow-600 hover:text-yellow-700 hover:underline transition-all duration-200"
                >
                  Sign in here
                </Link>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;
