import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const DiscoveryCards = () => {
  const navigate = useNavigate();
  
  const discoveryOptions = [
    {
      id: 'collections',
      title: 'Browse Collections',
      description: 'Explore curated collections of artifacts, documents, and multimedia content',
      icon: 'LayoutGrid',
      color: 'bg-primary-600',
      hoverColor: 'hover:bg-primary-700',
      path: '/content-management',
      items: '25+ Collections'
    },
    {
      id: 'search',
      title: 'Search Archives',
      description: 'Find specific items with our advanced search and filtering tools',
      icon: 'Search',
      color: 'bg-accent-600',
      hoverColor: 'hover:bg-accent-700',
      path: '/search-results',
      items: '10,000+ Items'
    },
    {
      id: 'stories',
      title: 'Featured Stories',
      description: 'Discover curated narratives and exhibitions from our archives',
      icon: 'Bookmark',
      color: 'bg-success-600',
      hoverColor: 'hover:bg-success-700',
      path: '/content-detail',
      items: '50+ Stories'
    },
    {
      id: 'recent',
      title: 'Recent Additions',
      description: 'View the latest content added to our digital archive',
      icon: 'Clock',
      color: 'bg-warning-600',
      hoverColor: 'hover:bg-warning-700',
      path: '/content-management',
      items: 'Updated Weekly'
    },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-4">Explore Our Digital Archive</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">Discover historical artifacts, rare documents, and cultural heritage through our comprehensive digital collections.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {discoveryOptions.map((option) => (
          <div 
            key={option.id}
            onClick={() => handleCardClick(option.path)}
            className="bg-surface border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
          >
            <div className="p-6">
              <div className={`w-14 h-14 rounded-lg ${option.color} ${option.hoverColor} text-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                <Icon name={option.icon} size={24} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-2 group-hover:text-primary-700 transition-colors duration-200">
                {option.title}
              </h3>
              <p className="text-text-secondary mb-4">
                {option.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted font-caption">
                  {option.items}
                </span>
                <div className="w-8 h-8 rounded-full bg-secondary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-50 transition-colors duration-200">
                  <Icon name="ChevronRight" size={18} className="transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoveryCards;