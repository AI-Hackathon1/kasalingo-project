
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Pages
import Landing from './pages/user/Landing';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/users/Users';
import AdminLayout from './layouts/AdminLayout';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = 'user' }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: '',
    isLoading: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') || '';
    
    // In a real app, you would validate the token with your backend
    setAuthState({
      isAuthenticated: !!token,
      userRole: role,
      isLoading: false
    });
  }, []); // Empty dependency array means this effect runs once on mount

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  // Check if user has the required role
  if (requiredRole === 'admin' && authState.userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

// Admin Layout Wrapper
const AdminLayoutWrapper = () => (
  <ProtectedRoute requiredRole="admin">
    <AdminLayout />
  </ProtectedRoute>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route element={<AdminLayoutWrapper />}>
            <Route index path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            {/* Add more admin routes here */}
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
