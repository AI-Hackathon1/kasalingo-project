import React from 'react';

const Register = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-pink-200 p-4 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        <div className="absolute w-24 h-24 bg-pink-200 rounded-full blur-2xl animate-float top-16 left-16"></div>
        <div className="absolute w-32 h-32 bg-yellow-200 rounded-full blur-2xl animate-float-reverse top-40 right-40"></div>
        <div className="absolute w-20 h-20 bg-pink-300 rounded-full blur-2xl animate-float top-64 left-64"></div>
        
        {/* Rotating shapes */}
        <div className="absolute w-16 h-16 bg-pink-400 rounded-full blur-sm animate-rotate top-20 right-20"></div>
        <div className="absolute w-12 h-12 bg-yellow-300 rounded-full blur-sm animate-rotate-reverse bottom-32 left-32"></div>
        
        {/* Floating lines */}
        <div className="absolute w-64 h-1 bg-pink-500 blur-sm animate-line-move top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-48 h-1 bg-yellow-400 blur-sm animate-line-move-reverse top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md transform transition-all duration-300 hover:scale-105">
          <h1 className="text-2xl sm:text-3xl text-pink-500 font-bold text-center mb-6 sm:mb-8 animate-pulse">
            Join Kasalingo!
          </h1>
          
          <form action="/register" method="POST" className="space-y-3 sm:space-y-4">
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Enter your username"
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <select
                id="age"
                name="age"
                required
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
              >
                <option value="">Select your age</option>
                {Array.from({ length: 9 }, (_, i) => i + 4).map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                required
                placeholder="Parent's email"
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Create password"
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder="Confirm password"
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <select
                id="language"
                name="language"
                required
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
              >
                <option value="">Select language</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg font-semibold hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300"
            >
              Register
            </button>

            <p className="text-center text-gray-600 mt-4 sm:mt-6 text-sm sm:text-base">
              Already have an account?{' '}
              <a href="/login" className="text-pink-500 hover:text-pink-600 font-medium">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// Add animation classes
const blobAnimation = `@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-reverse {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate-reverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes line-move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes line-move-reverse {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-20px);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 6s ease-in-out infinite;
}

.animate-rotate {
  animation: rotate 8s linear infinite;
}

.animate-rotate-reverse {
  animation: rotate-reverse 8s linear infinite;
}

.animate-line-move {
  animation: line-move 4s ease-in-out infinite;
}

.animate-line-move-reverse {
  animation: line-move-reverse 4s ease-in-out infinite;
}`;

export default Register;