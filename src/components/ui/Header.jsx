import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, title: 'Content Upload Complete', message: 'Document "Archive_2024.pdf" has been processed', time: '2 min ago', unread: true },
    { id: 2, title: 'New User Registration', message: 'John Doe has requested access to the system', time: '15 min ago', unread: true },
    { id: 3, title: 'System Maintenance', message: 'Scheduled maintenance completed successfully', time: '1 hour ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search-results?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-header">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and Menu Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            <Icon name="Menu" size={20} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16.21 2.76.21 3.92 0 5.16-1 9-5.45 9-11V7l-10-5z"/>
                <path d="M8 11l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-text-primary">ArchiveHub</h1>
              <p className="text-xs text-text-secondary font-caption">Digital Archive Platform</p>
            </div>
          </div>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`relative transition-all duration-200 ${isSearchFocused ? 'transform scale-105' : ''}`}>
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder="Search archives, documents, metadata..."
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
            
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-elevated z-dropdown animate-fade-in">
                <div className="p-3">
                  <div className="text-xs font-caption text-text-secondary mb-2">Recent Searches</div>
                  <div className="space-y-1">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-secondary-50 rounded-md transition-colors duration-200">
                      <Icon name="Clock" size={14} className="inline mr-2 text-text-secondary" />
                      historical documents 2023
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-secondary-50 rounded-md transition-colors duration-200">
                      <Icon name="Clock" size={14} className="inline mr-2 text-text-secondary" />
                      metadata analysis
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Section - Actions and User Menu */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Button */}
          <button className="md:hidden p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors duration-200">
            <Icon name="Search" size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-elevated z-dropdown animate-fade-in">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-medium text-text-primary">Notifications</h3>
                    <button className="text-xs text-accent hover:text-accent-600 font-medium">
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border-light hover:bg-secondary-50 transition-colors duration-200 ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-accent' : 'bg-secondary-300'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary">{notification.title}</p>
                          <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                          <p className="text-xs text-text-muted mt-2 font-caption">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <button className="w-full text-center text-sm text-accent hover:text-accent-600 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 p-2 rounded-md text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors duration-200"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-600" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-text-primary">Sarah Chen</p>
                <p className="text-xs text-text-secondary font-caption">Content Manager</p>
              </div>
              <Icon name="ChevronDown" size={16} className="hidden lg:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-surface border border-border rounded-lg shadow-elevated z-dropdown animate-fade-in">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-text-primary">Sarah Chen</p>
                  <p className="text-xs text-text-secondary font-caption">sarah.chen@archivehub.com</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-success-100 text-success-700 text-xs rounded-md font-medium">
                    Content Manager
                  </span>
                </div>
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-200 flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-200 flex items-center space-x-2">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-secondary-50 transition-colors duration-200 flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="py-2 border-t border-border">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;