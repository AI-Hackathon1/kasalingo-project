import { 
  Home, 
  Users, 
  BookOpen, 
  BookText, 
  Gamepad2, 
  BarChart2, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/admin', icon: Home, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/lessons', icon: BookOpen, label: 'Lessons' },
    { to: '/admin/stories', icon: BookText, label: 'Stories' },
    { to: '/admin/games', icon: Gamepad2, label: 'Games' },
    { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-white shadow-lg z-50 md:z-40
        `}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-purple-800">Kasalingo</h2>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `
                      flex items-center p-3 rounded-lg
                      ${isActive 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                      transition-colors duration-200
                    `}
                    onClick={onClose}
                  >
                    <item.icon size={20} className="mr-3" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <button className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
