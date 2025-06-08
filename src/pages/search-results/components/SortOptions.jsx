import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SortOptions = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'date-desc', label: 'Date (Newest)', icon: 'CalendarDays' },
    { value: 'date-asc', label: 'Date (Oldest)', icon: 'Calendar' },
    { value: 'title-asc', label: 'Title (A-Z)', icon: 'ArrowUpAZ' },
    { value: 'title-desc', label: 'Title (Z-A)', icon: 'ArrowDownZA' },
    { value: 'popularity', label: 'Popularity', icon: 'TrendingUp' },
    { value: 'size-desc', label: 'Size (Largest)', icon: 'ArrowUp' },
    { value: 'size-asc', label: 'Size (Smallest)', icon: 'ArrowDown' }
  ];

  const currentSort = sortOptions.find(option => option.value === sortBy);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-md text-sm font-medium text-text-primary hover:bg-secondary-50 transition-colors duration-200"
      >
        <Icon name={currentSort?.icon || 'Target'} size={16} />
        <span>Sort: {currentSort?.label || 'Relevance'}</span>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-elevated z-dropdown animate-fade-in">
          <div className="py-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-secondary-50 transition-colors duration-200 ${
                  sortBy === option.value ? 'bg-primary-50 text-primary-700' : 'text-text-primary'
                }`}
              >
                <Icon 
                  name={option.icon} 
                  size={16} 
                  className={sortBy === option.value ? 'text-primary-600' : 'text-secondary-500'}
                />
                <span>{option.label}</span>
                {sortBy === option.value && (
                  <Icon name="Check" size={14} className="ml-auto text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-dropdown-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SortOptions;