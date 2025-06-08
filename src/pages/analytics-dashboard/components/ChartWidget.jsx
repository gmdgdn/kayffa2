import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ChartWidget = ({ title, subtitle, icon, children, onDrillDown }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDrillDown = () => {
    if (onDrillDown) {
      onDrillDown();
    }
  };

  return (
    <div className={`bg-surface rounded-lg border border-border transition-all duration-300 ${
      isExpanded ? 'col-span-full' : ''
    }`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon name={icon} size={20} className="text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary">{title}</h3>
              <p className="text-sm text-text-secondary font-body">{subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {onDrillDown && (
              <button
                onClick={handleDrillDown}
                className="p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors duration-200"
                title="Drill down for details"
              >
                <Icon name="ZoomIn" size={16} />
              </button>
            )}
            
            <button
              onClick={handleExpand}
              className="p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors duration-200"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              <Icon name={isExpanded ? 'Minimize2' : 'Maximize2'} size={16} />
            </button>
            
            <div className="relative">
              <button className="p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors duration-200">
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default ChartWidget;