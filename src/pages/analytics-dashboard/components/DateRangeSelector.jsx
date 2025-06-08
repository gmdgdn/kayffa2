import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DateRangeSelector = ({ selectedRange, onRangeChange }) => {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const predefinedRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'thisYear', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleRangeChange = (range) => {
    if (range === 'custom') {
      setIsCustomOpen(true);
    } else {
      setIsCustomOpen(false);
      onRangeChange(range);
    }
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      onRangeChange({
        type: 'custom',
        startDate: customStartDate,
        endDate: customEndDate
      });
      setIsCustomOpen(false);
    }
  };

  const getSelectedLabel = () => {
    if (typeof selectedRange === 'object' && selectedRange.type === 'custom') {
      return `${selectedRange.startDate} - ${selectedRange.endDate}`;
    }
    return predefinedRanges.find(range => range.value === selectedRange)?.label || 'Last 30 Days';
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <Icon name="Calendar" size={16} className="text-text-secondary" />
        <select
          value={typeof selectedRange === 'object' ? 'custom' : selectedRange}
          onChange={(e) => handleRangeChange(e.target.value)}
          className="input-field min-w-40"
        >
          {predefinedRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Date Range Modal */}
      {isCustomOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary">Custom Date Range</h3>
              <button
                onClick={() => setIsCustomOpen(false)}
                className="p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Start Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">End Date</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsCustomOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomRangeApply}
                disabled={!customStartDate || !customEndDate}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;