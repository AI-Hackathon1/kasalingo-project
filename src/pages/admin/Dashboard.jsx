import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiBook, FiBarChart2, FiDollarSign, FiClock, FiCheckCircle, FiUserPlus } from 'react-icons/fi';

// Sample data - replace with real API calls
const stats = {
  totalUsers: 1, // This will be updated from props later
  activeUsers: 0,
  totalLessons: 5,
  totalRevenue: 0
};

const recentActivities = [
  { 
    id: 1, 
    type: 'user', 
    action: 'New user registered', 
    details: 'john.doe@example.com',
    time: '2 minutes ago',
    icon: <FiUserPlus className="text-blue-500" />
  },
  { 
    id: 2, 
    type: 'content', 
    action: 'Lesson updated', 
    details: 'Alphabet Lesson 1',
    time: '1 hour ago',
    icon: <FiCheckCircle className="text-green-500" />
  }
];

const AdminDashboard = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              <FiClock className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalUsers}</p>
              <p className="text-xs text-green-500 mt-1">+12% from last month</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-500">
              <FiUsers className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.activeUsers}</p>
              <p className="text-xs text-gray-500 mt-1">Online now</p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-500">
              <FiUsers className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Lessons Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Lessons</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.totalLessons}</p>
              <p className="text-xs text-blue-500 mt-1">+3 new this week</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50 text-purple-500">
              <FiBook className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-800">${stats.totalRevenue}</p>
              <p className="text-xs text-green-500 mt-1">+8.2% from last month</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50 text-yellow-500">
              <FiDollarSign className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                to="/admin/users" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <FiUsers className="h-5 w-5 text-blue-500 mr-3" />
                <span>Manage Users</span>
              </Link>
              <Link 
                to="/admin/lessons" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <FiBook className="h-5 w-5 text-purple-500 mr-3" />
                <span>Manage Lessons</span>
              </Link>
              <Link 
                to="/admin/analytics" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <FiBarChart2 className="h-5 w-5 text-green-500 mr-3" />
                <span>View Analytics</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-sm text-blue-500 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2 rounded-full bg-blue-50 text-blue-500 mr-3">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
