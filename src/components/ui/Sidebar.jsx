import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    content: true,
    search: true
  });

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and quick actions'
    },
    {
      id: 'content',
      label: 'Content',
      icon: 'FolderOpen',
      description: 'Content management tools',
      children: [
        {
          id: 'content-management',
          label: 'Content Management',
          path: '/content-management',
          icon: 'FileText',
          description: 'Organize and manage content'
        },
        {
          id: 'content-upload',
          label: 'Content Upload',
          path: '/content-upload',
          icon: 'Upload',
          description: 'Upload new content'
        }
      ]
    },
    {
      id: 'search',
      label: 'Search & Discovery',
      icon: 'Search',
      description: 'Find and explore content',
      children: [
        {
          id: 'search-results',
          label: 'Search Results',
          path: '/search-results',
          icon: 'SearchCheck',
          description: 'Browse search results'
        },
        {
          id: 'content-detail',
          label: 'Content Detail',
          path: '/content-detail',
          icon: 'FileSearch',
          description: 'Detailed content view'
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      description: 'System insights and reports'
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const isActiveItem = (path) => {
    return location.pathname === path;
  };

  const isActiveSection = (section) => {
    if (section.path) {
      return isActiveItem(section.path);
    }
    return section.children?.some(child => isActiveItem(child.path));
  };

  const handleNavigation = (path) => {
    if (path) {
      window.location.href = path;
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  const renderNavItem = (item, isChild = false) => {
    const isActive = isActiveItem(item.path);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.id];
    const isSectionActive = isActiveSection(item);

    if (hasChildren) {
      return (
        <div key={item.id} className="space-y-1">
          <button
            onClick={() => toggleSection(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
              isSectionActive
                ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' :'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon 
                name={item.icon} 
                size={18} 
                className={`${isSectionActive ? 'text-primary-600' : 'text-secondary-500 group-hover:text-secondary-700'}`}
              />
              <div className="text-left">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-text-muted font-caption">{item.description}</div>
              </div>
            </div>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${
                isSectionActive ? 'text-primary-600' : 'text-secondary-400'
              }`}
            />
          </button>
          
          {isExpanded && (
            <div className="ml-6 space-y-1 animate-fade-in">
              {item.children.map(child => renderNavItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => handleNavigation(item.path)}
        className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
          isChild ? 'ml-0' : ''
        } ${
          isActive
            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' :'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
        }`}
      >
        <Icon 
          name={item.icon} 
          size={isChild ? 16 : 18} 
          className={`${isActive ? 'text-primary-600' : 'text-secondary-500 group-hover:text-secondary-700'}`}
        />
        <div className="text-left flex-1">
          <div className="font-medium">{item.label}</div>
          <div className="text-xs text-text-muted font-caption">{item.description}</div>
        </div>
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-mobile-menu"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-surface border-r border-border z-sidebar
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Navigation Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold text-text-primary">Navigation</h2>
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-secondary-50 transition-colors duration-200"
                aria-label="Close sidebar"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
            <p className="text-sm text-text-secondary font-caption mt-1">
              Access all platform features
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map(item => renderNavItem(item))}
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t border-border">
            <div className="bg-accent-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Lightbulb" size={16} className="text-accent-600" />
                <span className="text-sm font-medium text-accent-700">Quick Tip</span>
              </div>
              <p className="text-xs text-accent-600 font-caption">
                Use Cmd+K to quickly search and navigate to any content or feature.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;