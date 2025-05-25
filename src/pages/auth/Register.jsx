import React, { useState, useEffect } from 'react';
import { apiRegister, apiRegisterAdmin } from '../../service/auth';
import { useNavigate } from 'react-router';
import Confetti from 'react-confetti';

// Animation components
const CelebrationEffects = ({ isAdmin }) => (
  <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
    <div className="absolute animate-spin-slow text-6xl">✨</div>
    <div className="absolute animate-float-large-slow text-6xl" style={{transform: 'translateX(-100px)'}}>🎈</div>
    <div className="absolute animate-float-large-reverse text-6xl" style={{transform: 'translateX(100px)'}}>
      {isAdmin ? '🔑' : '🎁'}
    </div>
  </div>
);

const BackgroundAnimations = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute w-64 h-64 bg-pink-300 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute w-96 h-96 bg-yellow-300 rounded-full opacity-20 animate-blob animation-delay-4000 right-0 bottom-0"></div>
    <div className="absolute w-80 h-80 bg-blue-300 rounded-full opacity-20 animate-blob animation-delay-6000 left-1/2 top-1/2"></div>
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminToggle, setShowAdminToggle] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    ...(!isAdmin && { name: '', age: '4' })
  });

  // Update formData when isAdmin changes
  useEffect(() => {
    setFormData(prev => ({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      ...(!isAdmin && { name: '', age: '4' })
    }));
  }, [isAdmin]);

  // Toggle admin mode with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        toggleAdminMode();
        e.preventDefault();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!formData.userName || !formData.email) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!isAdmin && (!formData.name || !formData.age)) {
      setError('Please fill in all required fields');
      return false;
    }
    if (isAdmin && !formData.userName.startsWith('admin_')) {
      setError('Admin username must start with "admin_"');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      // Prepare request body based on user type
      const requestBody = { ...formData };
      
      // Make the API call
      const response = isAdmin 
        ? await apiRegisterAdmin({
            userName: requestBody.userName,
            email: requestBody.email,
            password: requestBody.password,
            confirmPassword: requestBody.confirmPassword
          })
        : await apiRegister(requestBody);

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', isAdmin ? 'admin' : 'user');

      // Show celebration for regular users
      if (!isAdmin) {
        setShowCelebration(true);
        // Play a fun sound for kids
        const successSound = new Audio('/sounds/success.mp3');
        successSound.play().catch(e => console.log('Sound play failed', e));
        // Redirect after celebration
        setTimeout(() => navigate('/login'), 3000);
      } else {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAdminMode = () => {
    const newState = !isAdmin;
    setIsAdmin(newState);
    setShowAdminToggle(true);
    setTimeout(() => setShowAdminToggle(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-pink-200 p-4 relative overflow-hidden">
      {/* Admin mode notification */}
      {showAdminToggle && (
        <div className="fixed top-4 right-4 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce">
          {isAdmin ? '👑 Admin Mode Enabled' : '👤 User Mode Enabled'}
        </div>
      )}
      
      {/* Celebration animation */}
      {showCelebration && (
        <Confetti 
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          colors={['#FFC0CB', '#FFD700', '#FF69B4', '#87CEFA', '#7FFFD4']}
        />
      )}
      
      {showCelebration && !isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-bounce text-5xl">
            🎉 Hooray! 🎊
          </div>
        </div>
      )}
      
      {showCelebration && <CelebrationEffects isAdmin={isAdmin} />}
      <BackgroundAnimations />

      <div className="relative flex items-center justify-center min-h-screen">
        <div className={`${isAdmin ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border-4 border-blue-300' : 'bg-gradient-to-br from-pink-50 to-yellow-100 border-4 border-pink-300'} rounded-2xl shadow-lg p-5 w-full max-w-md transform transition-all duration-300 hover:scale-105 border-opacity-50`}>
          <h1 className={`text-xl sm:text-2xl ${isAdmin ? 'text-blue-500' : 'text-pink-500'} font-bold text-center mb-3 sm:mb-4 animate-pulse`}>
            {isAdmin ? 'Admin Registration' : 'Join Kasalingo!'}
          </h1>

          {/* Admin toggle */}
          <div className="absolute top-2 right-2 text-xs">
            <button 
              type="button" 
              onClick={toggleAdminMode}
              className={`p-1 rounded-full ${isAdmin ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'} transition-colors`}
              title={isAdmin ? 'Switch to User Mode' : 'Switch to Admin Mode'}
            >
              {isAdmin ? '👑' : '👤'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Username */}
              <div className={`relative group ${isAdmin ? 'col-span-2' : 'col-span-2 sm:col-span-1'}`}>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  placeholder={isAdmin ? "Admin username (must start with 'admin_')" : "Username"}
                  className={`w-full p-3 border-2 ${isAdmin ? 'border-blue-300 bg-blue-50' : 'border-pink-300 bg-pink-50'} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 bg-opacity-70 text-sm`}
                />
                {!isAdmin && (
                  <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-8 transition-all duration-500">
                    <span className="text-lg">✨</span>
                  </div>
                )}
              </div>

              {/* Age (only for regular users) */}
              {!isAdmin && (
                <div className="relative group col-span-2 sm:col-span-1">
                  <select
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200 bg-yellow-50 bg-opacity-70 text-sm"
                  >
                    <option value="">Select Age</option>
                    {Array.from({ length: 9 }, (_, i) => i + 4).map(age => (
                      <option key={age} value={age}>{age} years</option>
                    ))}
                  </select>
                  <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-8 transition-all duration-500">
                    <span className="text-lg">🎂</span>
                  </div>
                </div>
              )}
            </div>

            {/* Full Name (only for regular users) */}
            {!isAdmin && (
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full p-3 border-2 border-pink-300 bg-pink-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 bg-opacity-70 text-sm"
                />
                <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-8 transition-all duration-500">
                  <span className="text-lg">👤</span>
                </div>
              </div>
            )}

            {/* Email */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full p-3 border-2 border-pink-300 bg-pink-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 bg-opacity-70 text-sm"
              />
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-8 transition-all duration-500">
                <span className="text-lg">✉️</span>
              </div>
            </div>

            {/* Password */}
            <div className="relative group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder={isAdmin ? "Password (min 6 characters)" : "Create a Password (min 6 characters)"}
                className="w-full p-3 border-2 border-pink-300 bg-pink-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 bg-opacity-70 text-sm"
              />
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-8 transition-all duration-500">
                <span className="text-lg">🔒</span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Confirm Password"
                className="w-full p-3 border-2 border-pink-300 bg-pink-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 bg-opacity-70 text-sm"
              />
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-8 transition-all duration-500">
                <span className="text-lg">🔑</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg text-white font-bold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoading 
                  ? 'bg-gray-400' 
                  : isAdmin 
                    ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400' 
                    : 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-400'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isAdmin ? 'Creating Admin...' : 'Creating Account...'}
                </span>
              ) : isAdmin ? (
                'Create Admin Account'
              ) : (
                'Create My Account'
              )}
            </button>

            {/* Login Link */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  type="button" 
                  onClick={() => navigate('/login')}
                  className="text-pink-600 hover:text-pink-800 font-medium focus:outline-none focus:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>

          {/* Decorative elements */}
          <div className={`absolute -top-3 -right-3 w-6 h-6 ${isAdmin ? 'bg-blue-400' : 'bg-pink-400'} rounded-full shadow-md transform rotate-12`}></div>
          <div className={`absolute -bottom-2 -left-2 w-5 h-5 ${isAdmin ? 'bg-indigo-400' : 'bg-yellow-400'} rounded-full shadow-md`}></div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-large {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes float-large-reverse {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(30px) scale(1.1); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-large { animation: float-large 8s ease-in-out infinite; }
        .animate-float-large-reverse { animation: float-large-reverse 10s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  );
};

export default Register;
