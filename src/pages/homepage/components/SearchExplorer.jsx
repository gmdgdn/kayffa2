import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const SearchExplorer = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  
  // Mock suggestions based on query
  const getSearchSuggestions = (query) => {
    if (!query || query.length < 2) return [];
    
    const suggestions = [
      { text: `${query} in manuscripts`, type: 'collection', icon: 'FileText' },
      { text: `${query} artifacts`, type: 'object', icon: 'Package' },
      { text: `Historical ${query}`, type: 'period', icon: 'Clock' },
      { text: `${query} photography`, type: 'media', icon: 'Image' },
    ];
    
    return suggestions;
  };
  
  const suggestions = getSearchSuggestions(searchQuery);
  
  const popularSearches = [
    { text: 'Ancient Civilizations', count: 1240 },
    { text: 'Medieval Manuscripts', count: 856 },
    { text: 'Renaissance Art', count: 723 },
    { text: 'Industrial Revolution', count: 645 },
    { text: 'World War Documents', count: 932 },
  ];
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    navigate(`/search-results?q=${encodeURIComponent(suggestion.text)}`);
  };
  
  const handlePopularSearchClick = (search) => {
    navigate(`/search-results?q=${encodeURIComponent(search.text)}`);
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-4">Discover Our Archives</h2>
          <p className="text-text-secondary">Search across thousands of historical documents, artifacts, and multimedia content.</p>
        </div>
        
        <div className="relative" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative z-10">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105 shadow-elevated' : 'shadow-soft'}`}>
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="text-text-secondary" 
                />
              </div>
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search by keyword, period, or artifact type..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-border rounded-xl text-base font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-16 flex items-center text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={18} />
                </button>
              )}
              
              <button
                type="submit"
                className="absolute inset-y-0 right-4 flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-200"
              >
                <Icon name="ArrowRight" size={20} />
              </button>
            </div>
          </form>
          
          {/* Search suggestions dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-elevated z-dropdown animate-fade-in">
              {searchQuery && suggestions.length > 0 && (
                <div className="p-3 border-b border-border-light">
                  <div className="text-xs font-caption text-text-secondary mb-2">Suggestions</div>
                  <div className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <button 
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-2.5 text-sm hover:bg-secondary-50 rounded-md transition-colors duration-200 flex items-center"
                      >
                        <Icon name={suggestion.icon} size={16} className="inline mr-3 text-text-secondary" />
                        <span className="flex-1">{suggestion.text}</span>
                        <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded-md">{suggestion.type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="p-3">
                <div className="text-xs font-caption text-text-secondary mb-2">Popular Searches</div>
                <div className="space-y-1">
                  {popularSearches.map((search, index) => (
                    <button 
                      key={index}
                      onClick={() => handlePopularSearchClick(search)}
                      className="w-full text-left px-3 py-2.5 text-sm hover:bg-secondary-50 rounded-md transition-colors duration-200 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Icon name="TrendingUp" size={14} className="inline mr-3 text-accent-500" />
                        <span>{search.text}</span>
                      </div>
                      <span className="text-xs text-text-muted">{search.count.toLocaleString()} results</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-3 border-t border-border-light bg-secondary-50 rounded-b-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Press <kbd className="px-2 py-1 bg-white rounded border border-border text-xs">Enter</kbd> to search</span>
                  <button 
                    onClick={() => navigate('/search-results')}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Advanced Search
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-text-secondary">Popular topics:</span>
          {['Manuscripts', 'Photography', 'Ancient Artifacts', 'Maps', 'Audio Recordings'].map((topic, index) => (
            <button 
              key={index}
              onClick={() => navigate(`/search-results?q=${encodeURIComponent(topic)}`)} 
              className="text-sm bg-white px-3 py-1.5 rounded-full border border-border hover:bg-secondary-50 transition-colors duration-200"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchExplorer;