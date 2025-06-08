import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import MetricsCards from './components/MetricsCards';
import ContentRecommendations from './components/ContentRecommendations';
import SystemHealth from './components/SystemHealth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userRole] = useState('content_manager'); // Mock user role

  // Mock data for charts
  const contentGrowthData = [
    { month: 'Jan', uploads: 245, views: 1200 },
    { month: 'Feb', uploads: 312, views: 1450 },
    { month: 'Mar', uploads: 289, views: 1380 },
    { month: 'Apr', uploads: 356, views: 1620 },
    { month: 'May', uploads: 423, views: 1890 },
    { month: 'Jun', uploads: 398, views: 1750 }
  ];

  const engagementData = [
    { name: 'Documents', value: 45, color: '#3B82F6' },
    { name: 'Images', value: 30, color: '#0EA5E9' },
    { name: 'Videos', value: 15, color: '#059669' },
    { name: 'Audio', value: 10, color: '#D97706' }
  ];

  const apiUsageData = [
    { endpoint: 'GET /content', calls: 1250, status: 'healthy' },
    { endpoint: 'POST /upload', calls: 890, status: 'healthy' },
    { endpoint: 'GET /search', calls: 2340, status: 'warning' },
    { endpoint: 'PUT /metadata', calls: 567, status: 'healthy' }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                  Welcome back, Sarah! 👋
                </h1>
                <p className="text-text-secondary font-body">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 bg-success-50 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-success-700">System Online</span>
                </div>
                <button className="btn-primary flex items-center space-x-2">
                  <Icon name="Plus" size={18} />
                  <span>Quick Upload</span>
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <MetricsCards userRole={userRole} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Content Growth Chart */}
            <div className="xl:col-span-2 card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary">Content Growth</h3>
                  <p className="text-sm text-text-secondary font-caption">Monthly uploads and views</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-secondary-50 rounded-md transition-colors duration-200">
                    <Icon name="Download" size={16} className="text-text-secondary" />
                  </button>
                  <button className="p-2 hover:bg-secondary-50 rounded-md transition-colors duration-200">
                    <Icon name="MoreHorizontal" size={16} className="text-text-secondary" />
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contentGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="uploads" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="views" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Content Distribution */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary">Content Types</h3>
                  <p className="text-sm text-text-secondary font-caption">Distribution by format</p>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {engagementData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-text-secondary">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-text-primary">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>

            {/* Quick Actions */}
            <div>
              <QuickActions userRole={userRole} />
            </div>
          </div>

          {/* Content Recommendations */}
          <ContentRecommendations />

          {/* System Health & API Usage (Admin/Advanced Users) */}
          {(userRole === 'admin' || userRole === 'content_manager') && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              <SystemHealth />
              
              {/* API Usage Statistics */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">API Usage</h3>
                    <p className="text-sm text-text-secondary font-caption">Last 24 hours</p>
                  </div>
                  <button className="btn-secondary text-sm">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {apiUsageData.map((api, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          api.status === 'healthy' ? 'bg-success-500' : 
                          api.status === 'warning' ? 'bg-warning-500' : 'bg-error-500'
                        }`}></div>
                        <div>
                          <p className="text-sm font-medium text-text-primary font-mono">{api.endpoint}</p>
                          <p className="text-xs text-text-secondary font-caption">{api.calls.toLocaleString()} calls</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                        api.status === 'healthy' ? 'bg-success-100 text-success-700' :
                        api.status === 'warning' ? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'
                      }`}>
                        {api.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;