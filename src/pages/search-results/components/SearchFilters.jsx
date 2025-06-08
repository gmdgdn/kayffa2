import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SearchFilters = ({ onApplyFilters, appliedFilters, totalResults, isMobile, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    contentType: true,
    dateRange: true,
    category: true,
    fileFormat: true,
    metadata: false
  });

  const [selectedFilters, setSelectedFilters] = useState({
    contentType: [],
    dateRange: '',
    category: [],
    fileFormat: [],
    fileSize: '',
    author: ''
  });

  const filterOptions = {
    contentType: [
      { label: 'Document Collection', count: 456 },
      { label: 'Manuscript', count: 234 },
      { label: 'Letter Collection', count: 189 },
      { label: 'Photo Collection', count: 167 },
      { label: 'Research Papers', count: 145 },
      { label: 'Artifact Database', count: 56 }
    ],
    category: [
      { label: 'Historical Archives', count: 345 },
      { label: 'Medieval Studies', count: 234 },
      { label: 'Military History', count: 198 },
      { label: 'Cultural Heritage', count: 167 },
      { label: 'Scientific Literature', count: 145 },
      { label: 'Archaeology', count: 89 },
      { label: 'Government Records', count: 69 }
    ],
    fileFormat: [
      { label: 'PDF', count: 567 },
      { label: 'TIFF', count: 234 },
      { label: 'RAW', count: 189 },
      { label: 'JSON', count: 145 },
      { label: 'DOCX', count: 89 },
      { label: 'XML', count: 23 }
    ]
  };

  const dateRanges = [
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 6 months', value: '6m' },
    { label: 'Last year', value: '1y' },
    { label: '2020-2024', value: '2020-2024' },
    { label: '2010-2019', value: '2010-2019' },
    { label: '2000-2009', value: '2000-2009' },
    { label: 'Before 2000', value: 'before-2000' }
  ];

  const fileSizeOptions = [
    { label: 'Small (< 10 MB)', value: 'small' },
    { label: 'Medium (10-100 MB)', value: 'medium' },
    { label: 'Large (100-500 MB)', value: 'large' },
    { label: 'Very Large (> 500 MB)', value: 'xlarge' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value, isChecked) => {
    setSelectedFilters(prev => {
      if (filterType === 'contentType' || filterType === 'category' || filterType === 'fileFormat') {
        const currentValues = prev[filterType] || [];
        if (isChecked) {
          return { ...prev, [filterType]: [...currentValues, value] };
        } else {
          return { ...prev, [filterType]: currentValues.filter(v => v !== value) };
        }
      } else {
        return { ...prev, [filterType]: value };
      }
    });
  };

  const handleApplyFilters = () => {
    const filters = [];
    
    selectedFilters.contentType.forEach(type => filters.push(`Type: ${type}`));
    selectedFilters.category.forEach(cat => filters.push(`Category: ${cat}`));
    selectedFilters.fileFormat.forEach(format => filters.push(`Format: ${format}`));
    
    if (selectedFilters.dateRange) {
      const dateLabel = dateRanges.find(d => d.value === selectedFilters.dateRange)?.label;
      filters.push(`Date: ${dateLabel}`);
    }
    
    if (selectedFilters.fileSize) {
      const sizeLabel = fileSizeOptions.find(s => s.value === selectedFilters.fileSize)?.label;
      filters.push(`Size: ${sizeLabel}`);
    }
    
    if (selectedFilters.author) {
      filters.push(`Author: ${selectedFilters.author}`);
    }

    onApplyFilters(filters);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      contentType: [],
      dateRange: '',
      category: [],
      fileFormat: [],
      fileSize: '',
      author: ''
    });
    onApplyFilters([]);
  };

  const renderFilterSection = (title, key, options, type = 'checkbox') => (
    <div className="border-b border-border-light last:border-b-0">
      <button
        onClick={() => toggleSection(key)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary-50 transition-colors duration-200"
      >
        <span className="font-medium text-text-primary">{title}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`transform transition-transform duration-200 ${expandedSections[key] ? 'rotate-180' : ''}`}
        />
      </button>
      
      {expandedSections[key] && (
        <div className="px-4 pb-4 space-y-2">
          {type === 'checkbox' && options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedFilters[key]?.includes(option.label) || false}
                onChange={(e) => handleFilterChange(key, option.label, e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-surface border-border rounded focus:ring-primary-500 focus:ring-2"
              />
              <span className="flex-1 text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                {option.label}
              </span>
              <span className="text-xs text-text-muted font-caption">
                {option.count}
              </span>
            </label>
          ))}
          
          {type === 'radio' && options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name={key}
                value={option.value}
                checked={selectedFilters[key] === option.value}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                className="w-4 h-4 text-primary-600 bg-surface border-border focus:ring-primary-500 focus:ring-2"
              />
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Refine Results
          </h2>
          <span className="text-sm text-text-secondary font-caption">
            {totalResults.toLocaleString()} items
          </span>
        </div>
        <p className="text-sm text-text-secondary font-body">
          Use filters to narrow down your search results
        </p>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto">
        {renderFilterSection('Content Type', 'contentType', filterOptions.contentType)}
        {renderFilterSection('Date Range', 'dateRange', dateRanges, 'radio')}
        {renderFilterSection('Category', 'category', filterOptions.category)}
        {renderFilterSection('File Format', 'fileFormat', filterOptions.fileFormat)}
        {renderFilterSection('File Size', 'fileSize', fileSizeOptions, 'radio')}
        
        {/* Custom Metadata */}
        <div className="border-b border-border-light">
          <button
            onClick={() => toggleSection('metadata')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary-50 transition-colors duration-200"
          >
            <span className="font-medium text-text-primary">Custom Metadata</span>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transform transition-transform duration-200 ${expandedSections.metadata ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedSections.metadata && (
            <div className="px-4 pb-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Author</label>
                <input
                  type="text"
                  value={selectedFilters.author}
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                  placeholder="Enter author name"
                  className="input-field text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Keywords</label>
                <input
                  type="text"
                  placeholder="Enter keywords"
                  className="input-field text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border space-y-3">
        <button
          onClick={handleApplyFilters}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Icon name="Filter" size={18} />
          <span>Apply Filters</span>
        </button>
        
        <button
          onClick={handleClearFilters}
          className="btn-secondary w-full flex items-center justify-center space-x-2"
        >
          <Icon name="RotateCcw" size={18} />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;