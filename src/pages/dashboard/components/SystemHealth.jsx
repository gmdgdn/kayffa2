import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SystemHealth = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    status: 'healthy',
    uptime: '99.9%',
    responseTime: '145ms',
    activeUsers: 1247,
    storageUsed: 68,
    cpuUsage: 23,
    memoryUsage: 45,
    networkLatency: 12
  });

  const [services, setServices] = useState([
    {
      id: 'api-gateway',
      name: 'API Gateway',
      status: 'healthy',
      responseTime: '120ms',
      uptime: '99.9%',
      lastCheck: new Date(Date.now() - 30000)
    },
    {
      id: 'database',
      name: 'Database',
      status: 'healthy',
      responseTime: '45ms',
      uptime: '99.8%',
      lastCheck: new Date(Date.now() - 15000)
    },
    {
      id: 'file-storage',
      name: 'File Storage',
      status: 'warning',
      responseTime: '230ms',
      uptime: '99.5%',
      lastCheck: new Date(Date.now() - 45000)
    },
    {
      id: 'search-engine',
      name: 'Search Engine',
      status: 'healthy',
      responseTime: '89ms',
      uptime: '99.9%',
      lastCheck: new Date(Date.now() - 20000)
    }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'File storage response time above threshold',
      timestamp: new Date(Date.now() - 300000),
      resolved: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      timestamp: new Date(Date.now() - 3600000),
      resolved: true
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        responseTime: `${Math.floor(Math.random() * 50) + 120}ms`,
        activeUsers: Math.floor(Math.random() * 100) + 1200,
        cpuUsage: Math.floor(Math.random() * 20) + 15,
        memoryUsage: Math.floor(Math.random() * 15) + 40,
        networkLatency: Math.floor(Math.random() * 10) + 8
      }));

      setServices(prev => prev.map(service => ({
        ...service,
        responseTime: `${Math.floor(Math.random() * 100) + 50}ms`,
        lastCheck: new Date()
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    const colorMap = {
      healthy: 'text-success-600 bg-success-100',
      warning: 'text-warning-600 bg-warning-100',
      error: 'text-error-600 bg-error-100',
      maintenance: 'text-secondary-600 bg-secondary-100'
    };
    return colorMap[status] || colorMap.healthy;
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      healthy: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle',
      maintenance: 'Tool'
    };
    return iconMap[status] || iconMap.healthy;
  };

  const getAlertIcon = (type) => {
    const iconMap = {
      error: 'XCircle',
      warning: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle'
    };
    return iconMap[type] || iconMap.info;
  };

  const getAlertColor = (type) => {
    const colorMap = {
      error: 'text-error-600',
      warning: 'text-warning-600',
      info: 'text-accent-600',
      success: 'text-success-600'
    };
    return colorMap[type] || colorMap.info;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 80) return 'bg-error-500';
    if (percentage >= 60) return 'bg-warning-500';
    return 'bg-success-500';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">System Health</h3>
          <p className="text-sm text-text-secondary font-caption">Real-time system monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemMetrics.status)}`}>
            <Icon name={getStatusIcon(systemMetrics.status)} size={14} />
            <span className="capitalize">{systemMetrics.status}</span>
          </div>
          <button className="p-2 hover:bg-secondary-50 rounded-md transition-colors duration-200">
            <Icon name="RefreshCw" size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-text-primary">{systemMetrics.uptime}</div>
          <div className="text-xs text-text-secondary font-caption">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-text-primary">{systemMetrics.responseTime}</div>
          <div className="text-xs text-text-secondary font-caption">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-text-primary">{systemMetrics.activeUsers.toLocaleString()}</div>
          <div className="text-xs text-text-secondary font-caption">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-text-primary">{systemMetrics.networkLatency}ms</div>
          <div className="text-xs text-text-secondary font-caption">Network Latency</div>
        </div>
      </div>

      {/* Resource Usage */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Resource Usage</h4>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-text-secondary">Storage</span>
              <span className="text-sm font-medium text-text-primary">{systemMetrics.storageUsed}%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(systemMetrics.storageUsed)}`}
                style={{ width: `${systemMetrics.storageUsed}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-text-secondary">CPU</span>
              <span className="text-sm font-medium text-text-primary">{systemMetrics.cpuUsage}%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(systemMetrics.cpuUsage)}`}
                style={{ width: `${systemMetrics.cpuUsage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-text-secondary">Memory</span>
              <span className="text-sm font-medium text-text-primary">{systemMetrics.memoryUsage}%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(systemMetrics.memoryUsage)}`}
                style={{ width: `${systemMetrics.memoryUsage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Services</h4>
        <div className="space-y-2">
          {services.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  service.status === 'healthy' ? 'bg-success-500' :
                  service.status === 'warning' ? 'bg-warning-500' : 'bg-error-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{service.name}</p>
                  <p className="text-xs text-text-secondary font-caption">
                    {service.responseTime} • {service.uptime} uptime
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium ${
                  service.status === 'healthy' ? 'text-success-600' :
                  service.status === 'warning' ? 'text-warning-600' : 'text-error-600'
                }`}>
                  {service.status}
                </div>
                <div className="text-xs text-text-muted font-caption">
                  {formatTimeAgo(service.lastCheck)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-text-primary">Recent Alerts</h4>
          <button className="text-xs text-accent hover:text-accent-600 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-2">
          {alerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
              alert.resolved ? 'bg-secondary-50' : 'bg-warning-50'
            }`}>
              <Icon 
                name={getAlertIcon(alert.type)} 
                size={16} 
                className={`mt-0.5 ${getAlertColor(alert.type)} ${alert.resolved ? 'opacity-50' : ''}`}
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${alert.resolved ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                  {alert.message}
                </p>
                <p className="text-xs text-text-muted font-caption mt-1">
                  {formatTimeAgo(alert.timestamp)}
                  {alert.resolved && ' • Resolved'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;