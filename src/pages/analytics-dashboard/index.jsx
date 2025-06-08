import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import MetricsCard from './components/MetricsCard';
import ChartWidget from './components/ChartWidget';
import FilterPanel from './components/FilterPanel';
import DateRangeSelector from './components/DateRangeSelector';
import ExportOptions from './components/ExportOptions';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('last30days');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    userRole: 'all',
    contentCategory: 'all',
    customMetadata: 'all'
  });
  const [refreshing, setRefreshing] = useState(false);

  // Mock analytics data
  const metricsData = [
    {
      id: 'total-views',
      title: 'Total Content Views',
      value: '2,847,392',
      change: '+12.5%',
      trend: 'up',
      icon: 'Eye',
      color: 'primary'
    },
    {
      id: 'downloads',
      title: 'Downloads',
      value: '156,847',
      change: '+8.3%',
      trend: 'up',
      icon: 'Download',
      color: 'accent'
    },
    {
      id: 'active-users',
      title: 'Active Users',
      value: '12,456',
      change: '+15.7%',
      trend: 'up',
      icon: 'Users',
      color: 'success'
    },
    {
      id: 'storage-used',
      title: 'Storage Used',
      value: '847.2 GB',
      change: '+5.2%',
      trend: 'up',
      icon: 'HardDrive',
      color: 'warning'
    }
  ];

  const contentViewsData = [
    { date: '2024-01-01', views: 12450, downloads: 2340 },
    { date: '2024-01-02', views: 13200, downloads: 2580 },
    { date: '2024-01-03', views: 11800, downloads: 2120 },
    { date: '2024-01-04', views: 14500, downloads: 2890 },
    { date: '2024-01-05', views: 15200, downloads: 3100 },
    { date: '2024-01-06', views: 13800, downloads: 2750 },
    { date: '2024-01-07', views: 16200, downloads: 3450 }
  ];

  const contentTypeData = [
    { type: 'Documents', count: 45230, percentage: 35 },
    { type: 'Images', count: 32180, percentage: 25 },
    { type: 'Videos', count: 25740, percentage: 20 },
    { type: 'Audio', count: 19320, percentage: 15 },
    { type: 'Archives', count: 6450, percentage: 5 }
  ];

  const searchTrendsData = [
    { term: 'historical documents', searches: 8450, trend: '+23%' },
    { term: 'digital archives', searches: 6780, trend: '+18%' },
    { term: 'metadata analysis', searches: 5230, trend: '+12%' },
    { term: 'content migration', searches: 4560, trend: '+8%' },
    { term: 'archive management', searches: 3890, trend: '+15%' }
  ];

  const userActivityData = [
    { hour: '00:00', activity: 120 },
    { hour: '04:00', activity: 80 },
    { hour: '08:00', activity: 450 },
    { hour: '12:00', activity: 680 },
    { hour: '16:00', activity: 520 },
    { hour: '20:00', activity: 340 }
  ];

  const geographicData = [
    { country: 'United States', users: 4250, percentage: 34 },
    { country: 'United Kingdom', users: 2180, percentage: 17 },
    { country: 'Canada', users: 1890, percentage: 15 },
    { country: 'Australia', users: 1560, percentage: 12 },
    { country: 'Germany', users: 1320, percentage: 11 },
    { country: 'Others', users: 1356, percentage: 11 }
  ];

  const COLORS = ['#1E3A8A', '#3B82F6', '#0EA5E9', '#059669', '#D97706', '#DC2626'];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Analytics Dashboard' }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleExport = (format) => {
    console.log(`Exporting analytics data in ${format} format`);
  };

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // Update metrics in real-time
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'} pt-16`}>
        <div className="p-6">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">Analytics Dashboard</h1>
              <p className="text-text-secondary font-body">
                Comprehensive insights into content performance and user engagement
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
              <DateRangeSelector 
                selectedRange={selectedDateRange}
                onRangeChange={handleDateRangeChange}
              />
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Icon name="Filter" size={16} />
                  <span>Filters</span>
                </button>
                
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Icon name="RefreshCw" size={16} className={refreshing ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>
                
                <ExportOptions onExport={handleExport} />
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterPanelOpen && (
            <FilterPanel
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClose={() => setIsFilterPanelOpen(false)}
            />
          )}

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData.map((metric) => (
              <MetricsCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Content Views Trend */}
            <ChartWidget
              title="Content Views & Downloads"
              subtitle="Daily trend analysis"
              icon="TrendingUp"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={contentViewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#1E3A8A" 
                    strokeWidth={2}
                    name="Views"
                    dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="downloads" 
                    stroke="#0EA5E9" 
                    strokeWidth={2}
                    name="Downloads"
                    dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartWidget>

            {/* Content Type Distribution */}
            <ChartWidget
              title="Content Type Distribution"
              subtitle="Breakdown by file type"
              icon="PieChart"
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percentage }) => `${type} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartWidget>
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Search Trends */}
            <ChartWidget
              title="Top Search Terms"
              subtitle="Most popular searches"
              icon="Search"
            >
              <div className="space-y-4">
                {searchTrendsData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-text-primary text-sm">{item.term}</p>
                      <p className="text-xs text-text-secondary">{item.searches.toLocaleString()} searches</p>
                    </div>
                    <span className="text-xs font-medium text-success px-2 py-1 bg-success-100 rounded-md">
                      {item.trend}
                    </span>
                  </div>
                ))}
              </div>
            </ChartWidget>

            {/* User Activity Heatmap */}
            <ChartWidget
              title="User Activity by Hour"
              subtitle="Daily usage patterns"
              icon="Clock"
            >
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="activity" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWidget>

            {/* Geographic Distribution */}
            <ChartWidget
              title="Users by Country"
              subtitle="Geographic distribution"
              icon="Globe"
            >
              <div className="space-y-3">
                {geographicData.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium text-text-primary">{country.country}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-text-primary">{country.users.toLocaleString()}</p>
                      <p className="text-xs text-text-secondary">{country.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </ChartWidget>
          </div>

          {/* Real-time Status */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">Real-time Status</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-success font-medium">Live</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-text-primary">247</p>
                <p className="text-sm text-text-secondary">Active Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-text-primary">1.2 MB/s</p>
                <p className="text-sm text-text-secondary">Data Transfer Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-text-primary">99.8%</p>
                <p className="text-sm text-text-secondary">System Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;