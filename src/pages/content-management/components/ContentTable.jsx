import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ContentTable = ({ 
  content, 
  selectedItems, 
  sortConfig, 
  onSelectAll, 
  onSelectItem, 
  onSort,
  searchQuery 
}) => {
  const isAllSelected = content.length > 0 && selectedItems.length === content.length;
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < content.length;

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

  const formatFileSize = (size) => {
    if (size.includes('GB')) return size;
    if (size.includes('MB')) return size;
    return size;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary-600" />
      : <Icon name="ArrowDown" size={14} className="text-primary-600" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-secondary-50 border-b border-border">
          <tr>
            <th className="w-12 px-6 py-4">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={input => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
            </th>
            <th className="w-20 px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Preview
            </th>
            <th 
              className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
              onClick={() => onSort('title')}
            >
              <div className="flex items-center space-x-1">
                <span>Title</span>
                {getSortIcon('title')}
              </div>
            </th>
            <th 
              className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
              onClick={() => onSort('type')}
            >
              <div className="flex items-center space-x-1">
                <span>Type</span>
                {getSortIcon('type')}
              </div>
            </th>
            <th 
              className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
              onClick={() => onSort('category')}
            >
              <div className="flex items-center space-x-1">
                <span>Category</span>
                {getSortIcon('category')}
              </div>
            </th>
            <th 
              className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
              onClick={() => onSort('author')}
            >
              <div className="flex items-center space-x-1">
                <span>Author</span>
                {getSortIcon('author')}
              </div>
            </th>
            <th 
              className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
              onClick={() => onSort('uploadDate')}
            >
              <div className="flex items-center space-x-1">
                <span>Upload Date</span>
                {getSortIcon('uploadDate')}
              </div>
            </th>
            <th 
              className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors duration-200"
              onClick={() => onSort('status')}
            >
              <div className="flex items-center space-x-1">
                <span>Status</span>
                {getSortIcon('status')}
              </div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-surface divide-y divide-border">
          {content.map((item) => (
            <tr 
              key={item.id} 
              className={`hover:bg-secondary-50 transition-colors duration-200 ${
                selectedItems.includes(item.id) ? 'bg-primary-50' : ''
              }`}
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={(e) => onSelectItem(item.id, e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </td>
              <td className="px-6 py-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary-100 flex items-center justify-center">
                  {item.thumbnail ? (
                    <Image 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name={getTypeIcon(item.type)} size={20} className="text-secondary-500" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <button
                    onClick={() => handleItemAction('preview', item)}
                    className="text-sm font-medium text-text-primary hover:text-primary-600 transition-colors duration-200 text-left"
                  >
                    {highlightText(item.title, searchQuery)}
                  </button>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-secondary-100 text-secondary-600 text-xs rounded">
                        {highlightText(tag, searchQuery)}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-xs text-text-muted">+{item.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Icon name={getTypeIcon(item.type)} size={16} className="text-secondary-500" />
                  <span className="text-sm text-text-secondary">{item.type}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-text-secondary">{item.category}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-text-secondary">
                  {highlightText(item.author, searchQuery)}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-text-secondary">{formatDate(item.uploadDate)}</span>
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(item.status)}
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-text-secondary">{formatFileSize(item.size)}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleItemAction('edit', item)}
                    className="p-1.5 rounded-md text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                    title="Edit"
                  >
                    <Icon name="Edit" size={16} />
                  </button>
                  <button
                    onClick={() => handleItemAction('preview', item)}
                    className="p-1.5 rounded-md text-secondary-500 hover:text-accent-600 hover:bg-accent-50 transition-colors duration-200"
                    title="Preview"
                  >
                    <Icon name="Eye" size={16} />
                  </button>
                  <button
                    onClick={() => handleItemAction('duplicate', item)}
                    className="p-1.5 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 transition-colors duration-200"
                    title="Duplicate"
                  >
                    <Icon name="Copy" size={16} />
                  </button>
                  <button
                    onClick={() => handleItemAction('archive', item)}
                    className="p-1.5 rounded-md text-secondary-500 hover:text-warning-600 hover:bg-warning-50 transition-colors duration-200"
                    title="Archive"
                  >
                    <Icon name="Archive" size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;