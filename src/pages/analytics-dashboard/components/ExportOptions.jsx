import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportOptions = ({ onExport }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const exportFormats = [
    { format: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { format: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
    { format: 'csv', label: 'CSV Data', icon: 'Database' },
    { format: 'png', label: 'PNG Images', icon: 'Image' },
    { format: 'json', label: 'JSON Data', icon: 'Code' }
  ];

  const handleExport = (format) => {
    onExport(format);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="btn-accent flex items-center space-x-2"
      >
        <Icon name="Download" size={16} />
        <span>Export</span>
        <Icon name="ChevronDown" size={14} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-elevated z-dropdown">
          <div className="p-2">
            <div className="px-3 py-2 border-b border-border mb-2">
              <p className="text-sm font-medium text-text-primary">Export Format</p>
              <p className="text-xs text-text-secondary">Choose your preferred format</p>
            </div>
            
            {exportFormats.map((format) => (
              <button
                key={format.format}
                onClick={() => handleExport(format.format)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-secondary-50 rounded-md transition-colors duration-200"
              >
                <Icon name={format.icon} size={16} className="text-secondary-600" />
                <span>{format.label}</span>
              </button>
            ))}
          </div>
          
          <div className="p-3 border-t border-border">
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="w-full text-center text-sm text-secondary-600 hover:text-secondary-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-dropdown-overlay"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default ExportOptions;