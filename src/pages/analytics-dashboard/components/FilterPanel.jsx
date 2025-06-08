import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ activeFilters, onFilterChange, onClose }) => {
  const filterOptions = {
    userRole: [
      { value: 'all', label: 'All Roles' },
      { value: 'admin', label: 'Administrators' },
      { value: 'content-manager', label: 'Content Managers' },
      { value: 'editor', label: 'Editors' },
      { value: 'viewer', label: 'Viewers' }
    ],
    contentCategory: [
      { value: 'all', label: 'All Categories' },
      { value: 'documents', label: 'Documents' },
      { value: 'images', label: 'Images' },
      { value: 'videos', label: 'Videos' },
      { value: 'audio', label: 'Audio Files' },
      { value: 'archives', label: 'Archives' }
    ],
    customMetadata: [
      { value: 'all', label: 'All Metadata' },
      { value: 'public', label: 'Public Content' },
      { value: 'restricted', label: 'Restricted Access' },
      { value: 'archived', label: 'Archived Content' },
      { value: 'featured', label: 'Featured Content' }
    ]
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const clearAllFilters = () => {
    onFilterChange('userRole', 'all');
    onFilterChange('contentCategory', 'all');
    onFilterChange('customMetadata', 'all');
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter !== 'all');

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary-600" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">Advanced Filters</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-accent hover:text-accent-600 font-medium"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Role Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">User Role</label>
          <select
            value={activeFilters.userRole}
            onChange={(e) => handleFilterChange('userRole', e.target.value)}
            className="input-field"
          >
            {filterOptions.userRole.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Content Category Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Content Category</label>
          <select
            value={activeFilters.contentCategory}
            onChange={(e) => handleFilterChange('contentCategory', e.target.value)}
            className="input-field"
          >
            {filterOptions.contentCategory.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Custom Metadata Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Content Type</label>
          <select
            value={activeFilters.customMetadata}
            onChange={(e) => handleFilterChange('customMetadata', e.target.value)}
            className="input-field"
          >
            {filterOptions.customMetadata.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Tag" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([key, value]) => {
              if (value === 'all') return null;
              const option = filterOptions[key]?.find(opt => opt.value === value);
              return (
                <span
                  key={key}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-md text-sm"
                >
                  <span>{option?.label}</span>
                  <button
                    onClick={() => handleFilterChange(key, 'all')}
                    className="hover:text-primary-900"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;