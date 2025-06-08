import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ContentRecommendations = () => {
  const [activeTab, setActiveTab] = useState('recommended');

  const recommendedContent = [
    {
      id: 1,
      title: 'Ancient Roman Architecture Documentation',
      type: 'collection',
      thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=300&h=200&fit=crop',
      description: 'Comprehensive digital archive of Roman architectural elements and historical documentation.',
      tags: ['Architecture', 'History', 'Roman'],
      lastUpdated: '2 days ago',
      items: 156,
      views: 2340,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Medieval Manuscript Digitization Project',
      type: 'document',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      description: 'High-resolution scans of medieval manuscripts with detailed metadata and transcriptions.',
      tags: ['Medieval', 'Manuscripts', 'Literature'],
      lastUpdated: '1 week ago',
      items: 89,
      views: 1890,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Industrial Revolution Photography Archive',
      type: 'gallery',
      thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop',
      description: 'Historical photographs documenting the industrial revolution and its impact on society.',
      tags: ['Photography', 'Industrial', 'History'],
      lastUpdated: '3 days ago',
      items: 234,
      views: 3120,
      rating: 4.7
    },
    {
      id: 4,
      title: 'Scientific Research Data Collection',
      type: 'dataset',
      thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop',
      description: 'Curated scientific research data with comprehensive analysis and documentation.',
      tags: ['Science', 'Research', 'Data'],
      lastUpdated: '5 days ago',
      items: 67,
      views: 1560,
      rating: 4.6
    }
  ];

  const recentlyAccessed = [
    {
      id: 5,
      title: 'Digital Art Collection 2024',
      type: 'gallery',
      thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
      description: 'Contemporary digital art pieces from emerging artists worldwide.',
      tags: ['Art', 'Digital', 'Contemporary'],
      lastAccessed: '2 hours ago',
      items: 45,
      views: 890
    },
    {
      id: 6,
      title: 'Historical Maps Archive',
      type: 'collection',
      thumbnail: 'https://images.unsplash.com/photo-1597149041419-0d902ac1d712?w=300&h=200&fit=crop',
      description: 'Digitized historical maps from various time periods and geographical regions.',
      tags: ['Maps', 'Geography', 'History'],
      lastAccessed: '1 day ago',
      items: 123,
      views: 2100
    },
    {
      id: 7,
      title: 'Audio Archive: Folk Music Collection',
      type: 'audio',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      description: 'Traditional folk music recordings from different cultures and regions.',
      tags: ['Music', 'Folk', 'Audio'],
      lastAccessed: '2 days ago',
      items: 78,
      views: 1450
    }
  ];

  const tabs = [
    { id: 'recommended', label: 'Recommended', icon: 'Star' },
    { id: 'recent', label: 'Recently Accessed', icon: 'Clock' }
  ];

  const getTypeIcon = (type) => {
    const iconMap = {
      collection: 'FolderOpen',
      document: 'FileText',
      gallery: 'Image',
      dataset: 'Database',
      audio: 'Music'
    };
    return iconMap[type] || 'File';
  };

  const getTypeColor = (type) => {
    const colorMap = {
      collection: 'bg-primary-100 text-primary-600',
      document: 'bg-success-100 text-success-600',
      gallery: 'bg-accent-100 text-accent-600',
      dataset: 'bg-warning-100 text-warning-600',
      audio: 'bg-purple-100 text-purple-600'
    };
    return colorMap[type] || 'bg-secondary-100 text-secondary-600';
  };

  const handleContentClick = (content) => {
    window.location.href = `/content-detail?id=${content.id}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={12} className="text-warning-500 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={12} className="text-warning-300" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-secondary-300" />
      );
    }

    return stars;
  };

  const currentContent = activeTab === 'recommended' ? recommendedContent : recentlyAccessed;

  return (
    <div className="card mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Content Discovery</h3>
          <p className="text-sm text-text-secondary font-caption">Personalized recommendations and recent activity</p>
        </div>
        <button className="btn-secondary text-sm">
          Explore All
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-secondary-50 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-surface text-primary-700 shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {currentContent.map((content) => (
          <div
            key={content.id}
            onClick={() => handleContentClick(content)}
            className="group cursor-pointer bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevated hover:border-primary-300 transition-all duration-200"
          >
            {/* Thumbnail */}
            <div className="relative h-32 overflow-hidden">
              <Image
                src={content.thumbnail}
                alt={content.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute top-2 left-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(content.type)}`}>
                  <Icon name={getTypeIcon(content.type)} size={16} />
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <button className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors duration-200">
                  <Icon name="Bookmark" size={14} />
                </button>
              </div>
            </div>

            {/* Content Info */}
            <div className="p-4">
              <h4 className="font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200">
                {content.title}
              </h4>
              <p className="text-sm text-text-secondary font-caption mb-3 line-clamp-2">
                {content.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {content.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {content.tags.length > 2 && (
                  <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-md font-medium">
                    +{content.tags.length - 2}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-text-secondary font-caption">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="Package" size={10} />
                    <span>{content.items} items</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Eye" size={10} />
                    <span>{content.views.toLocaleString()}</span>
                  </span>
                </div>
                {content.rating && (
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center space-x-0.5">
                      {renderStars(content.rating)}
                    </div>
                    <span className="text-text-primary font-medium">{content.rating}</span>
                  </div>
                )}
              </div>

              {/* Last Updated/Accessed */}
              <div className="mt-2 pt-2 border-t border-border-light">
                <span className="text-xs text-text-muted font-caption">
                  {activeTab === 'recommended' ? 'Updated' : 'Accessed'} {content.lastUpdated || content.lastAccessed}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <div className="mt-6 text-center">
        <button className="btn-secondary">
          <Icon name="ChevronDown" size={16} className="mr-2" />
          Load More Content
        </button>
      </div>
    </div>
  );
};

export default ContentRecommendations;