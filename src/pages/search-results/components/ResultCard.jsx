import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ResultCard = ({ result, viewMode, searchQuery, onAction }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getContentTypeIcon = (contentType) => {
    const iconMap = {
      'Document Collection': 'FileText',
      'Manuscript': 'ScrollText',
      'Letter Collection': 'Mail',
      'Photo Collection': 'Camera',
      'Research Papers': 'GraduationCap',
      'Artifact Database': 'Database'
    };
    return iconMap[contentType] || 'File';
  };

  const getFileFormatColor = (format) => {
    const colorMap = {
      'PDF': 'bg-error-100 text-error-700',
      'TIFF': 'bg-accent-100 text-accent-700',
      'RAW': 'bg-warning-100 text-warning-700',
      'JSON': 'bg-success-100 text-success-700',
      'DOCX': 'bg-primary-100 text-primary-700',
      'XML': 'bg-secondary-100 text-secondary-700'
    };
    return colorMap[format] || 'bg-secondary-100 text-secondary-700';
  };

  const highlightSearchTerms = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query.split(' ').join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-warning-100 text-warning-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const formatFileSize = (sizeStr) => {
    return sizeStr;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleQuickAction = (action, e) => {
    e.stopPropagation();
    onAction(action, result.id);
  };

  const handleCardClick = () => {
    onAction('preview', result.id);
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="card hover:shadow-elevated transition-all duration-200 cursor-pointer"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex space-x-4">
          <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md bg-secondary-100">
            <Image
              src={result.thumbnail}
              alt={result.title}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getContentTypeIcon(result.contentType)} 
                  size={16} 
                  className="text-primary-600" 
                />
                <span className="text-sm text-text-secondary font-caption">
                  {result.contentType}
                </span>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getFileFormatColor(result.fileFormat)}`}>
                  {result.fileFormat}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning-500" />
                <span className="text-sm font-medium text-text-primary">
                  {result.relevanceScore}%
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-2">
              {highlightSearchTerms(result.title, searchQuery)}
            </h3>
            
            <p className="text-sm text-text-secondary font-body mb-3 line-clamp-2">
              {highlightSearchTerms(result.snippet, searchQuery)}
            </p>
            
            <div className="flex items-center justify-between text-xs text-text-muted font-caption">
              <div className="flex items-center space-x-4">
                <span>By {result.author}</span>
                <span>{formatDate(result.dateCreated)}</span>
                <span>{formatFileSize(result.fileSize)}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Download" size={12} />
                <span>{result.downloadCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {isHovered && (
            <div className="flex-shrink-0 flex flex-col space-y-2">
              <button
                onClick={(e) => handleQuickAction('preview', e)}
                className="p-2 rounded-md bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors duration-200"
                title="Preview"
              >
                <Icon name="Eye" size={16} />
              </button>
              <button
                onClick={(e) => handleQuickAction('download', e)}
                className="p-2 rounded-md bg-accent-100 text-accent-600 hover:bg-accent-200 transition-colors duration-200"
                title="Download"
              >
                <Icon name="Download" size={16} />
              </button>
              <button
                onClick={(e) => handleQuickAction('collection', e)}
                className="p-2 rounded-md bg-success-100 text-success-600 hover:bg-success-200 transition-colors duration-200"
                title="Add to Collection"
              >
                <Icon name="Plus" size={16} />
              </button>
              <button
                onClick={(e) => handleQuickAction('share', e)}
                className="p-2 rounded-md bg-secondary-100 text-secondary-600 hover:bg-secondary-200 transition-colors duration-200"
                title="Share"
              >
                <Icon name="Share2" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (viewMode === 'table') {
    return (
      <tr 
        className="hover:bg-secondary-50 cursor-pointer transition-colors duration-200"
        onClick={handleCardClick}
      >
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 overflow-hidden rounded-md bg-secondary-100 flex-shrink-0">
              <Image
                src={result.thumbnail}
                alt={result.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-text-primary line-clamp-1">
                {highlightSearchTerms(result.title, searchQuery)}
              </h3>
              <p className="text-xs text-text-secondary line-clamp-1">
                {result.contentType}
              </p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-text-secondary">
          {result.author}
        </td>
        <td className="px-6 py-4 text-sm text-text-secondary">
          {formatDate(result.dateCreated)}
        </td>
        <td className="px-6 py-4 text-sm text-text-secondary">
          {formatFileSize(result.fileSize)}
        </td>
        <td className="px-6 py-4">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getFileFormatColor(result.fileFormat)}`}>
            {result.fileFormat}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-text-primary font-medium">
          {result.relevanceScore}%
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => handleQuickAction('preview', e)}
              className="p-1 rounded text-primary-600 hover:bg-primary-100 transition-colors duration-200"
              title="Preview"
            >
              <Icon name="Eye" size={14} />
            </button>
            <button
              onClick={(e) => handleQuickAction('download', e)}
              className="p-1 rounded text-accent-600 hover:bg-accent-100 transition-colors duration-200"
              title="Download"
            >
              <Icon name="Download" size={14} />
            </button>
            <button
              onClick={(e) => handleQuickAction('share', e)}
              className="p-1 rounded text-secondary-600 hover:bg-secondary-100 transition-colors duration-200"
              title="Share"
            >
              <Icon name="Share2" size={14} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  // Grid view (default)
  return (
    <div 
      className="card hover:shadow-elevated transition-all duration-200 cursor-pointer group"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden rounded-md bg-secondary-100 mb-4">
        <Image
          src={result.thumbnail}
          alt={result.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Quick Actions Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-3 animate-fade-in">
            <button
              onClick={(e) => handleQuickAction('preview', e)}
              className="p-3 rounded-full bg-white text-primary-600 hover:bg-primary-50 transition-colors duration-200"
              title="Preview"
            >
              <Icon name="Eye" size={20} />
            </button>
            <button
              onClick={(e) => handleQuickAction('download', e)}
              className="p-3 rounded-full bg-white text-accent-600 hover:bg-accent-50 transition-colors duration-200"
              title="Download"
            >
              <Icon name="Download" size={20} />
            </button>
            <button
              onClick={(e) => handleQuickAction('collection', e)}
              className="p-3 rounded-full bg-white text-success-600 hover:bg-success-50 transition-colors duration-200"
              title="Add to Collection"
            >
              <Icon name="Plus" size={20} />
            </button>
            <button
              onClick={(e) => handleQuickAction('share', e)}
              className="p-3 rounded-full bg-white text-secondary-600 hover:bg-secondary-50 transition-colors duration-200"
              title="Share"
            >
              <Icon name="Share2" size={20} />
            </button>
          </div>
        )}
        
        {/* Content Type Badge */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white bg-opacity-90 px-2 py-1 rounded-md">
          <Icon 
            name={getContentTypeIcon(result.contentType)} 
            size={14} 
            className="text-primary-600" 
          />
          <span className="text-xs font-medium text-text-primary">
            {result.contentType}
          </span>
        </div>
        
        {/* Relevance Score */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white bg-opacity-90 px-2 py-1 rounded-md">
          <Icon name="Star" size={14} className="text-warning-500" />
          <span className="text-xs font-medium text-text-primary">
            {result.relevanceScore}%
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getFileFormatColor(result.fileFormat)}`}>
            {result.fileFormat}
          </span>
          <span className="text-xs text-text-muted font-caption">
            {formatFileSize(result.fileSize)}
          </span>
        </div>
        
        <h3 className="text-lg font-heading font-semibold text-text-primary line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
          {highlightSearchTerms(result.title, searchQuery)}
        </h3>
        
        <p className="text-sm text-text-secondary font-body line-clamp-3">
          {highlightSearchTerms(result.snippet, searchQuery)}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {result.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
          {result.tags.length > 3 && (
            <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-md font-medium">
              +{result.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-text-muted font-caption pt-2 border-t border-border-light">
          <div className="flex items-center space-x-2">
            <span>By {result.author}</span>
            <span>•</span>
            <span>{formatDate(result.dateCreated)}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={12} />
            <span>{result.downloadCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;