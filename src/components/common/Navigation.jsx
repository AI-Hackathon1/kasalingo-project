import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, FiX, FiBell, FiHome, FiBook, FiAward, 
  FiSettings, FiHelpCircle, FiLogOut, FiPlayCircle
} from 'react-icons/fi';
import Logo from './Logo';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <FiHome className="w-5 h-5" /> },
    { path: '/lessons', label: 'Lessons', icon: <FiBook className="w-5 h-5" /> },
    { path: '/stories', label: 'Stories', icon: <FiPlayCircle className="w-5 h-5" /> },
    { path: '/store', label: 'Store', icon: <FiAward className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings className="w-5 h-5" /> },
    { path: '/help', label: 'Help', icon: <FiHelpCircle className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full text-gray-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <FiMenu className="h-6 w-6" />
              </button>
              <div className="ml-4">
                <Logo size="small" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-600 hover:bg-purple-50 relative">
                <FiBell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    {user.displayName || 'User'}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    {(user.displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                </div>
              ) : (
                <a
                  href="/login"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Sign In
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={toggleSidebar}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <Logo size="small" />
                  <button
                    onClick={toggleSidebar}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <FiX className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        className={`flex items-center p-3 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? 'bg-purple-50 text-purple-700'
                            : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                
                {user && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={logout}
                      className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="mr-3">
                        <FiLogOut className="h-5 w-5" />
                      </span>
                      Sign Out
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
