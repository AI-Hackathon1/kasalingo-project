import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { apiLogin, apiAdminLogin, apiRegister, apiRegisterAdmin } from '../service/auth';

// Helper function to safely parse JSON
const safeJsonParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error('Failed to parse JSON:', str, e);
    return null;
  }
};

// Create the authentication context
const AuthContext = createContext(null);

// Initialize state from localStorage if available
const loadInitialState = () => {
  try {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      const userData = safeJsonParse(storedUser);
      if (userData && userData.id) {
        return {
          user: userData,
          isAuthenticated: true,
          isAdmin: userData.role === 'admin',
          isLoading: false,
          initialCheckComplete: true
        };
      }
    }
  } catch (error) {
    console.error('Error loading initial auth state:', error);
  }
  
  return {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isLoading: false,
    initialCheckComplete: true
  };
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(loadInitialState);
  
  // Helper to update state
  const updateState = (updates) => {
    setState(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        console.log('Auth check - storedUser:', storedUser ? 'exists' : 'missing', 'token:', !!token);
        
        if (storedUser && token) {
          const userData = safeJsonParse(storedUser);
          
          if (!userData || !userData.id) {
            console.log('Auth check - Invalid user data, clearing storage');
            throw new Error('Invalid user data in storage');
          }
          
          const isUserAdmin = userData.role === 'admin';
          
          console.log('Auth check - Setting authenticated user:', userData);
          updateState({
            user: userData,
            isAuthenticated: true,
            isAdmin: isUserAdmin,
            isLoading: false,
            initialCheckComplete: true
          });
          
        } else {
          console.log('Auth check - No valid auth data found, ensuring logged out state');
          updateState({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            isLoading: false,
            initialCheckComplete: true
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear everything on error
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        updateState({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isLoading: false,
          initialCheckComplete: true
        });
      }
    };

    // Only run the check if we haven't completed the initial check
    if (!state.initialCheckComplete) {
      checkAuth();
    }
  }, [state.initialCheckComplete]);
  
  // Login function
  const login = async (username, password, isAdminLogin = false) => {
    try {
      let response;
      
      if (isAdminLogin) {
        response = await apiAdminLogin(username, password);
      } else {
        response = await apiLogin(username, password);
      }
      
      // Check if response and response.data exist
      if (response && response.data) {
        const { token, user } = response.data;
        
        if (!token) {
          throw new Error('No token received from server');
        }
        
        const userData = {
          id: user?._id || user?.id,
          username: user?.userName || username,
          name: user?.name,
          email: user?.email,
          role: isAdminLogin ? 'admin' : 'user'
        };
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        // Update state
        updateState({
          user: userData,
          isAuthenticated: true,
          isAdmin: isAdminLogin,
          isLoading: false
        });
        
        return { success: true, user: userData, token };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const { isAdmin, ...registrationData } = userData;
      
      // Format the registration data according to API requirements
      const formattedData = {
        userName: registrationData.userName,
        name: registrationData.name,
        email: registrationData.email,
        age: registrationData.age,
        password: registrationData.password,
        confirmPassword: registrationData.confirmPassword
      };
      
      // Call appropriate register API based on user type
      const response = isAdmin 
        ? await apiRegisterAdmin(formattedData)
        : await apiRegister(formattedData);
      
      // If registration is successful, log the user in automatically
      if (response.data.token) {
        const { token, user: userData } = response.data;
        
        // If it's an admin registration, ensure the role is set to 'admin'
        const userWithRole = isAdmin 
          ? { ...userData, role: 'admin' } 
          : userData;
        
        // Store user data and token
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userWithRole));
        
        // Update state
        updateState({
          user: userWithRole,
          isAuthenticated: true,
          isAdmin: isAdmin,
          isLoading: false
        });
        
        return { 
          success: true, 
          user: userWithRole 
        };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  // Logout function
  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Reset state
    updateState({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      isLoading: false
    });
    
    // Notify user
    toast.success('Successfully logged out');
  }, []);

  // Context value
  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isAdmin: state.isAdmin,
    isLoading: state.isLoading,
    initialCheckComplete: state.initialCheckComplete,
    login,
    register,
    logout,
    setUser: (user) => updateState({ user }),
    setIsAuthenticated: (isAuthenticated) => updateState({ isAuthenticated })
  };

  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
