import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActionBar = ({ selectedCount, onBulkAction, onClearSelection }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bulkActions = [
    { id: 'publish', label: 'Publish Selected', icon: 'Upload', color: 'text-success-600' },
    { id: 'draft', label: 'Move to Draft', icon: 'Edit', color: 'text-warning-600' },
    { id: 'archive', label: 'Archive Selected', icon: 'Archive', color: 'text-secondary-600' },
    { id: 'delete', label: 'Delete Selected', icon: 'Trash2', color: 'text-error-600' },
    { id: 'export', label: 'Export Selected', icon: 'Download', color: 'text-accent-600' },
    { id: 'duplicate', label: 'Duplicate Selected', icon: 'Copy', color: 'text-primary-600' }
  ];

  const handleActionClick = (actionId) => {
    onBulkAction(actionId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex items-center space-x-3 bg-primary-50 border border-primary-200 rounded-lg px-4 py-2">
      <div className="flex items-center space-x-2">
        <Icon name="CheckSquare" size={16} className="text-primary-600" />
        <span className="text-sm font-medium text-primary-700">
          {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="btn-primary flex items-center space-x-2"
          >
            <Icon name="Settings" size={16} />
            <span>Bulk Actions</span>
            <Icon name="ChevronDown" size={14} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-elevated z-dropdown">
              <div className="py-2">
                {bulkActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action.id)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary-50 transition-colors duration-200 flex items-center space-x-3 ${action.color}`}
                  >
                    <Icon name={action.icon} size={16} />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClearSelection}
          className="btn-secondary flex items-center space-x-2"
        >
          <Icon name="X" size={16} />
          <span>Clear Selection</span>
        </button>
      </div>
    </div>
  );
};

export default BulkActionBar;