import React from 'react';
import Icon from 'components/AppIcon';

const MetricsCards = ({ userRole }) => {
  const getMetricsForRole = (role) => {
    const baseMetrics = [
      {
        id: 'total-content',
        title: 'Total Content',
        value: '12,847',
        change: '+12%',
        changeType: 'positive',
        icon: 'FileText',
        description: 'Digital assets stored'
      },
      {
        id: 'recent-uploads',
        title: 'Recent Uploads',
        value: '234',
        change: '+8%',
        changeType: 'positive',
        icon: 'Upload',
        description: 'Last 30 days'
      }
    ];

    if (role === 'admin') {
      return [
        ...baseMetrics,
        {
          id: 'pending-approvals',
          title: 'Pending Approvals',
          value: '18',
          change: '-5%',
          changeType: 'negative',
          icon: 'Clock',
          description: 'Awaiting review'
        },
        {
          id: 'storage-usage',
          title: 'Storage Usage',
          value: '2.4 TB',
          change: '+15%',
          changeType: 'neutral',
          icon: 'HardDrive',
          description: 'of 5 TB capacity'
        }
      ];
    } else if (role === 'content_manager') {
      return [
        ...baseMetrics,
        {
          id: 'pending-approvals',
          title: 'Pending Approvals',
          value: '18',
          change: '-5%',
          changeType: 'negative',
          icon: 'Clock',
          description: 'Awaiting review'
        },
        {
          id: 'active-workflows',
          title: 'Active Workflows',
          value: '7',
          change: '+2',
          changeType: 'positive',
          icon: 'GitBranch',
          description: 'In progress'
        }
      ];
    } else {
      return [
        ...baseMetrics,
        {
          id: 'bookmarks',
          title: 'My Bookmarks',
          value: '42',
          change: '+3',
          changeType: 'positive',
          icon: 'Bookmark',
          description: 'Saved items'
        },
        {
          id: 'recent-views',
          title: 'Recent Views',
          value: '156',
          change: '+24%',
          changeType: 'positive',
          icon: 'Eye',
          description: 'Last 7 days'
        }
      ];
    }
  };

  const metrics = getMetricsForRole(userRole);

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success-600 bg-success-50';
      case 'negative':
        return 'text-error-600 bg-error-50';
      default:
        return 'text-secondary-600 bg-secondary-50';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <div key={metric.id} className="card hover:shadow-elevated transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              metric.changeType === 'positive' ? 'bg-primary-100' :
              metric.changeType === 'negative' ? 'bg-error-100' : 'bg-secondary-100'
            }`}>
              <Icon 
                name={metric.icon} 
                size={24} 
                className={
                  metric.changeType === 'positive' ? 'text-primary-600' :
                  metric.changeType === 'negative' ? 'text-error-600' : 'text-secondary-600'
                }
              />
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${getChangeColor(metric.changeType)}`}>
              <Icon name={getChangeIcon(metric.changeType)} size={12} />
              <span>{metric.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-1">
              {metric.value}
            </h3>
            <p className="text-sm font-medium text-text-primary mb-1">
              {metric.title}
            </p>
            <p className="text-xs text-text-secondary font-caption">
              {metric.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;