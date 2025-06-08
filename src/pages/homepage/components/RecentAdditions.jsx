import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const RecentAdditions = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = [
    { id: 'all', label: 'All Types' },
    { id: 'document', label: 'Documents' },
    { id: 'image', label: 'Images' },
    { id: 'audio', label: 'Audio' },
    { id: 'video', label: 'Video' },
  ];
  
  const recentItems = [
    {
      id: 1,
      title: 'Byzantine Manuscript Fragment',
      type: 'document',
      thumbnail: '/assets/images/museum-artifacts/artifact1.jpg',
      dateAdded: '3 days ago',
      description: 'A newly digitized fragment of a Byzantine manuscript featuring decorative elements.',
      tags: ['Manuscript', 'Byzantine', 'Medieval']
    },
    {
      id: 2,
      title: 'Traditional Folk Music Recording',
      type: 'audio',
      thumbnail: '/assets/images/museum-artifacts/artifact2.jpg',
      dateAdded: '5 days ago',
      description: 'Audio recording of traditional folk music from the early 20th century.',
      tags: ['Audio', 'Folk Music', 'Cultural Heritage']
    },
    {
      id: 3,
      title: 'Ancient Greek Pottery',
      type: 'image',
      thumbnail: '/assets/images/museum-artifacts/artifact3.jpg',
      dateAdded: '1 week ago',
      description: 'High-resolution images of ancient Greek pottery with mythological scenes.',
      tags: ['Pottery', 'Ancient Greece', 'Archaeology']
    },
    {
      id: 4,
      title: 'Civil War Letters Collection',
      type: 'document',
      thumbnail: '/assets/images/museum-artifacts/artifact4.jpg',
      dateAdded: '1 week ago',
      description: 'Collection of personal letters from soldiers during the American Civil War.',
      tags: ['Letters', 'Civil War', 'American History']
    },
    {
      id: 5,
      title: 'Early Cinema Documentary',
      type: 'video',
      thumbnail: '/assets/images/museum-artifacts/artifact5.jpg',
      dateAdded: '2 weeks ago',
      description: 'Restored footage from early 20th century documentary filmmaking.',
      tags: ['Film', 'Documentary', 'Cinema History']
    },
    {
      id: 6,
      title: 'Indigenous Art Collection',
      type: 'image',
      thumbnail: '/assets/images/museum-artifacts/artifact6.jpg',
      dateAdded: '2 weeks ago',
      description: 'Digital photographs of indigenous art and artifacts from various cultures.',
      tags: ['Indigenous', 'Art', 'Cultural Heritage']
    }
  ];
  
  const filteredItems = activeFilter === 'all' 
    ? recentItems 
    : recentItems.filter(item => item.type === activeFilter);
  
  const getTypeIcon = (type) => {
    const iconMap = {
      document: 'FileText',
      image: 'Image',
      audio: 'Music',
      video: 'Video'
    };
    return iconMap[type] || 'File';
  };
  
  const getTypeColor = (type) => {
    const colorMap = {
      document: 'bg-primary-100 text-primary-600',
      image: 'bg-accent-100 text-accent-600',
      audio: 'bg-success-100 text-success-600',
      video: 'bg-warning-100 text-warning-600'
    };
    return colorMap[type] || 'bg-secondary-100 text-secondary-600';
  };
  
  const handleItemClick = (id) => {
    navigate(`/content-detail?id=${id}`);
  };
  
  const handleViewAllClick = () => {
    navigate('/content-management');
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-2">Recent Additions</h2>
          <p className="text-text-secondary">The latest items added to our digital archive collections.</p>
        </div>
        
        <button 
          onClick={handleViewAllClick}
          className="mt-4 sm:mt-0 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
        >
          <span>View All Recent Items</span>
          <Icon name="ArrowRight" size={16} className="ml-1.5" />
        </button>
      </div>
      
      {/* Filter tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-thin">
        <div className="inline-flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${activeFilter === filter.id ? 'bg-primary-600 text-white' : 'bg-white border border-border text-text-secondary hover:bg-secondary-50'}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="flex bg-white border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="w-1/3 relative">
              <Image
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(item.type)}`}>
                <Icon name={getTypeIcon(item.type)} size={16} />
              </div>
            </div>
            
            {/* Content */}
            <div className="w-2/3 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-heading font-semibold text-text-primary line-clamp-1 group-hover:text-primary-700 transition-colors duration-200">
                  {item.title}
                </h3>
              </div>
              
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-text-muted">
                  <Icon name="Clock" size={12} className="mr-1" />
                  <span>Added {item.dateAdded}</span>
                </div>
                
                <div className="w-6 h-6 rounded-full bg-secondary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-50 transition-colors duration-200">
                  <Icon name="ChevronRight" size={14} className="transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-10 bg-white rounded-lg border border-border">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-text-muted" />
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">No items found</h3>
          <p className="text-text-secondary">There are no recent items matching the selected filter.</p>
          <button 
            onClick={() => setActiveFilter('all')} 
            className="mt-4 btn-secondary"
          >
            View All Items
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentAdditions;