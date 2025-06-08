import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ isOpen, filters, onFiltersChange, onClose }) => {
  const contentTypes = ['Document', 'Image', 'Audio', 'Video', 'Database'];
  const categories = ['Historical Archives', 'Manuscripts', 'Oral Histories', 'Films', 'Research', 'Maps', 'Catalogs', 'Photography'];
  const statuses = ['Published', 'Draft', 'Archived', 'Under Review'];

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDateRangeChange = (type, value) => {
    onFiltersChange(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value
      }
    }));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      contentType: '',
      category: '',
      status: '',
      dateRange: { start: '', end: '' },
      tags: []
    });
  };

  const hasActiveFilters = filters.contentType || filters.category || filters.status || 
                          filters.dateRange.start || filters.dateRange.end || filters.tags.length > 0;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-dropdown"
          onClick={onClose}
        />
      )}

      {/* Filter Panel */}
      <aside className={`
        fixed top-16 left-64 h-[calc(100vh-4rem)] w-80 bg-surface border-r border-border z-dropdown
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-auto lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold text-text-primary">Filters</h3>
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
                  className="lg:hidden p-1 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-secondary-50 transition-colors duration-200"
                  aria-label="Close filters"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
            </div>
            <p className="text-sm text-text-secondary font-caption mt-1">
              Refine your content search
            </p>
          </div>

          {/* Filter Options */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Content Type Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Content Type
              </label>
              <select
                value={filters.contentType}
                onChange={(e) => handleFilterChange('contentType', e.target.value)}
                className="input-field"
              >
                <option value="">All Types</option>
                {contentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input-field"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Upload Date Range
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-text-secondary mb-1 font-caption">From</label>
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-secondary mb-1 font-caption">To</label>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* File Size Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                File Size
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                  <span className="text-sm text-text-secondary">Small (&lt; 1 MB)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                  <span className="text-sm text-text-secondary">Medium (1-10 MB)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                  <span className="text-sm text-text-secondary">Large (10-100 MB)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                  <span className="text-sm text-text-secondary">Very Large (&gt; 100 MB)</span>
                </label>
              </div>
            </div>

            {/* Author Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Author
              </label>
              <input
                type="text"
                placeholder="Search by author..."
                className="input-field"
              />
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Tags
              </label>
              <input
                type="text"
                placeholder="Enter tags separated by commas..."
                className="input-field"
              />
              <div className="mt-2 flex flex-wrap gap-1">
                {['history', 'documents', 'research', 'archive'].map(tag => (
                  <button
                    key={tag}
                    className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-md hover:bg-secondary-200 transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex space-x-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 btn-secondary"
              >
                Reset
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-primary lg:hidden"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterPanel;