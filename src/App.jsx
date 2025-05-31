import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate, Outlet, Link, useNavigationType } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import AdminLessons from './pages/admin/lessons/Lessons';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Landing from './pages/user/Landing';
import GamesPage from './components/pages/GamesPage';
import LessonsPage from './pages/user/Lessons';
import StoriesPage from './pages/Stories';
import StorePage from './pages/Store';
import ProfilePage from './pages/Profile';
import { Home as HomeIcon, BookOpen, Gamepad2, BookMarked, ShoppingBag, User } from 'lucide-react';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

// Public Route Component (for login/register when already authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  console.log('PublicRoute - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading, 'from:', from);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log('Redirecting to:', from);
    return <Navigate to={from} replace />;
  }

  return children;
};

// Main Layout with Bottom Navigation
const MainLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon, path: '/home' },
    { id: 'lessons', label: 'Lessons', icon: BookOpen, path: '/lessons' },
    { id: 'games', label: 'Games', icon: Gamepad2, path: '/games' },
    { id: 'stories', label: 'Stories', icon: BookMarked, path: '/stories' },
    { id: 'store', label: 'Store', icon: ShoppingBag, path: '/store' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center px-2 py-3">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={`flex flex-col items-center justify-center w-full py-1 ${location.pathname === tab.path ? 'text-purple-600' : 'text-gray-500'}`}
            >
              <tab.icon className={`w-5 h-5 ${location.pathname === tab.path ? 'text-purple-600' : 'text-gray-500'}`} />
              <span className="text-[10px] mt-1">{tab.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

// Component to check authentication status and redirect accordingly
const CheckAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
};

// NavLink component for navigation
const NavLink = ({ to, children, className = '' }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`${className} ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
      {children}
    </Link>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading, initialCheckComplete } = useAuth();
  const location = useLocation();

  console.log('AppContent - Auth State:', { 
    isAuthenticated, 
    isLoading, 
    initialCheckComplete,
    pathname: location.pathname 
  });

  // Show loading spinner while checking auth state
  if (isLoading || !initialCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Always show landing page at root path
  if (location.pathname === '/') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  }

  // Handle auth pages - make them accessible regardless of auth status
  if (['/login', '/register'].includes(location.pathname)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  }

  // If authenticated, show the main app
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Protected Main App Routes */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="lessons" element={<AdminLessons />} />
        </Route>
        
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-lg text-gray-600 mb-6">Page not found</p>
              <Link 
                to="/home" 
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Go to Home
              </Link>
            </div>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
