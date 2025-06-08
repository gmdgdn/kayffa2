import React from 'react';
import Icon from 'components/AppIcon';

const ViewToggle = ({ viewMode, onViewModeChange }) => {
  const viewOptions = [
    { mode: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { mode: 'list', icon: 'List', label: 'List View' },
    { mode: 'table', icon: 'Table', label: 'Table View' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-secondary-100 rounded-lg p-1">
      {viewOptions.map((option) => (
        <button
          key={option.mode}
          onClick={() => onViewModeChange(option.mode)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            viewMode === option.mode
              ? 'bg-surface text-primary-600 shadow-sm'
              : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
          }`}
          title={option.label}
        >
          <Icon name={option.icon} size={16} />
          <span className="hidden sm:inline">{option.label.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;