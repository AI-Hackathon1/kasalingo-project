import { Menu, Bell, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHeader = ({ onMenuClick }) => (
  <header className="bg-purple-600 text-white p-4 flex justify-between items-center shadow-md">
    <div className="flex items-center">
      <button 
        onClick={onMenuClick}
        className="mr-3 md:hidden"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
      <Link to="/" className="text-xl font-bold hover:text-purple-100 transition-colors">
        Kasalingo Admin
      </Link>
    </div>
    <div className="flex items-center space-x-4">
      <button 
        className="p-1 rounded-full hover:bg-purple-500 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} />
      </button>
      <button 
        className="p-1 rounded-full hover:bg-purple-500 transition-colors"
        aria-label="User profile"
      >
        <UserIcon size={20} />
      </button>
    </div>
  </header>
);

export default AdminHeader;
