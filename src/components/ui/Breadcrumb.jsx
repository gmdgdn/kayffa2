import React from 'react';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path) {
      window.location.href = path;
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-text-secondary" />
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Icon name="ChevronRight" size={14} className="text-text-muted" />
          
          {index === items.length - 1 ? (
            <span className="text-text-primary font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <button
              onClick={() => handleNavigation(item.path)}
              className="text-text-secondary hover:text-primary-600 transition-colors duration-200 hover:underline"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;