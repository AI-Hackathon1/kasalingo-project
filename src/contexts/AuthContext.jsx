import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { apiLogin, apiAdminLogin, apiRegister, apiRegisterAdmin } from '../service/auth';

// Create the authentication context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
          setIsAdmin(userData.role === 'admin');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (username, password, isAdminLogin = false) => {
    try {
      const response = isAdminLogin 
        ? await apiAdminLogin({ userName: username, password })
        : await apiLogin({ userName: username, password });
      
      const { token, user: userData } = response.data;
      
      // If it's an admin login, ensure the role is set to 'admin'
      const userWithRole = isAdminLogin 
        ? { ...userData, role: 'admin' } 
        : userData;
      
      // Store user data and token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithRole));
      
      // Update state
      setUser(userWithRole);
      setIsAuthenticated(true);
      setIsAdmin(isAdminLogin || (userData.role === 'admin'));
      
      return { success: true, user: userWithRole };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
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
        setUser(userWithRole);
        setIsAuthenticated(true);
        setIsAdmin(isAdmin || userData.role === 'admin');
        
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
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    toast.success('Logged out successfully');
    return true;
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    login,
    register,
    logout,
    setUser,
    setIsAuthenticated
  };

  if (isLoading) {
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
