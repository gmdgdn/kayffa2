import React from 'react';
import Icon from 'components/AppIcon';

const MetricsCard = ({ metric }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 text-primary-600',
      accent: 'bg-accent-50 text-accent-600',
      success: 'bg-success-50 text-success-600',
      warning: 'bg-warning-50 text-warning-600',
      error: 'bg-error-50 text-error-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-secondary';
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 hover:shadow-elevated transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(metric.color)}`}>
          <Icon name={metric.icon} size={24} />
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
          <Icon name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
          <span className="text-sm font-medium">{metric.change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-heading font-bold text-text-primary mb-1">{metric.value}</h3>
        <p className="text-sm text-text-secondary font-body">{metric.title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;