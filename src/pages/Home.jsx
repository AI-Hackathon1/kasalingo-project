import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-800">Welcome to Kasalingo</h1>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hello, {user.name || user.userName}!</span>
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          ) : (
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </header>

        <main className="bg-white rounded-2xl shadow-xl p-8">
          <section className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Fun Language Learning for Kids
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Kasalingo makes learning a new language exciting and engaging for children aged 4-12. 
              Our interactive lessons and games make language learning an adventure!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: 'Interactive Lessons',
                  description: 'Engaging content that makes learning fun',
                  emoji: '🎮'
                },
                {
                  title: 'Child-Friendly',
                  description: 'Designed specifically for young learners',
                  emoji: '👧👦'
                },
                {
                  title: 'Progress Tracking',
                  description: 'Monitor your child\'s learning journey',
                  emoji: '📊'
                }
              ].map((feature, index) => (
                <div key={index} className="p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                  <div className="text-4xl mb-4">{feature.emoji}</div>
                  <h3 className="text-xl font-semibold text-indigo-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {user && (
            <section className="mt-16 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Ready to continue learning?
              </h3>
              <Link 
                to="/lessons"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Go to Lessons
              </Link>
            </section>
          )}
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Kasalingo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
