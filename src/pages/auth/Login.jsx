import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-yellow-200 p-4 relative overflow-hidden">
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
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md transform transition-all duration-300 hover:scale-105">
          <h1 className="text-2xl sm:text-3xl text-yellow-500 font-bold text-center mb-6 sm:mb-8 animate-pulse">
            Welcome Back!
          </h1>
          
          <form action="/login" method="POST" className="space-y-3 sm:space-y-4">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter password"
                className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
              />
            </div>

            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <a href="/forgot-password" className="text-sm text-yellow-500 hover:text-yellow-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg font-semibold hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300"
            >
              Login
            </button>

            <p className="text-center text-gray-600 mt-4 sm:mt-6 text-sm sm:text-base">
              Don't have an account?{' '}
              <a href="/register" className="text-yellow-500 hover:text-yellow-600 font-medium">
                Register here
              </a>
            </p>
          </form>
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
}`;

export default Login;