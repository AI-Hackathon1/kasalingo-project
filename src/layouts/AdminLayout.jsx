import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header */}
      <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex pt-16 h-[calc(100vh-4rem)]">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block w-64 h-full fixed left-0 top-16 overflow-y-auto">
          <AdminSidebar 
            isOpen={true}
            onClose={() => {}}
          />
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Mobile Sidebar */}
        <div 
          className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <AdminSidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto md:ml-64 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
