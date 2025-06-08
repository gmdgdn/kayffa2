import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ContentGrid = ({ content, selectedItems, onSelectItem, searchQuery }) => {
  const handleItemAction = (action, item) => {
    switch (action) {
      case 'edit':
        window.location.href = `/content-detail?id=${item.id}&mode=edit`;
        break;
      case 'preview':
        window.location.href = `/content-detail?id=${item.id}`;
        break;
      case 'duplicate': console.log('Duplicating item:', item.id);
        break;
      case 'archive': console.log('Archiving item:', item.id);
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Published': 'bg-success-100 text-success-700',
      'Draft': 'bg-warning-100 text-warning-700',
      'Archived': 'bg-secondary-100 text-secondary-700',
      'Under Review': 'bg-accent-100 text-accent-700'
    };

    return (
      <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusConfig[status] || 'bg-secondary-100 text-secondary-700'}`}>
        {status}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const typeIcons = {
      'Document': 'FileText',
      'Image': 'Image',
      'Audio': 'Music',
      'Video': 'Video',
      'Database': 'Database'
    };
    return typeIcons[type] || 'File';
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {content.map((item) => (
          <div
            key={item.id}
            className={`card hover:shadow-elevated transition-all duration-200 cursor-pointer group ${
              selectedItems.includes(item.id) ? 'ring-2 ring-primary-500 bg-primary-50' : ''
            }`}
          >
            {/* Card Header with Checkbox */}
            <div className="flex items-center justify-between mb-4">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => onSelectItem(item.id, e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex items-center space-x-1">
                <Icon name={getTypeIcon(item.type)} size={16} className="text-secondary-500" />
                <span className="text-xs text-text-secondary">{item.type}</span>
              </div>
            </div>

            {/* Thumbnail */}
            <div 
              className="w-full h-40 rounded-lg overflow-hidden bg-secondary-100 mb-4 cursor-pointer"
              onClick={() => handleItemAction('preview', item)}
            >
              {item.thumbnail ? (
                <Image 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name={getTypeIcon(item.type)} size={48} className="text-secondary-400" />
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="space-y-3">
              <div>
                <h3 
                  className="font-medium text-text-primary line-clamp-2 cursor-pointer hover:text-primary-600 transition-colors duration-200"
                  onClick={() => handleItemAction('preview', item)}
                >
                  {highlightText(item.title, searchQuery)}
                </h3>
                <p className="text-sm text-text-secondary mt-1">{item.category}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">
                  {highlightText(item.author, searchQuery)}
                </span>
                {getStatusBadge(item.status)}
              </div>

              <div className="flex items-center justify-between text-sm text-text-muted">
                <span>{formatDate(item.uploadDate)}</span>
                <span>{item.size}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded">
                    {highlightText(tag, searchQuery)}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-xs text-text-muted">+{item.tags.length - 3}</span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{item.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={12} />
                    <span>{item.downloads}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemAction('edit', item);
                  }}
                  className="p-2 rounded-md text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                  title="Edit"
                >
                  <Icon name="Edit" size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemAction('preview', item);
                  }}
                  className="p-2 rounded-md text-secondary-500 hover:text-accent-600 hover:bg-accent-50 transition-colors duration-200"
                  title="Preview"
                >
                  <Icon name="Eye" size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleItemAction('duplicate', item);
                  }}
                  className="p-2 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 transition-colors duration-200"
                  title="Duplicate"
                >
                  <Icon name="Copy" size={16} />
                </button>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemAction('archive', item);
                }}
                className="p-2 rounded-md text-secondary-500 hover:text-warning-600 hover:bg-warning-50 transition-colors duration-200"
                title="Archive"
              >
                <Icon name="Archive" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;