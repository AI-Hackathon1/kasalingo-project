import { Menu } from 'lucide-react';

const SidebarTrigger = ({ onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center rounded-md p-1.5 ${className}`}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
};

export { SidebarTrigger };
