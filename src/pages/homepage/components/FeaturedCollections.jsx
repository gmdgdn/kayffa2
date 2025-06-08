import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const FeaturedCollections = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('trending');
  
  const collections = {
    trending: [
      {
        id: 1,
        title: 'Ancient Mesopotamian Artifacts',
        description: 'A comprehensive collection of digitized artifacts from ancient Mesopotamia, including cuneiform tablets, cylinder seals, and sculptures.',
        thumbnail: 'https://images.unsplash.com/photo-1560438718-eb61ede255eb?w=600&h=400&fit=crop',
        itemCount: 247,
        category: 'Artifacts',
        period: '3000 BCE - 500 BCE',
        curator: 'Dr. Sarah Chen'
      },
      {
        id: 2,
        title: 'Medieval Illuminated Manuscripts',
        description: 'High-resolution scans of rare illuminated manuscripts from the 12th to 15th centuries, featuring detailed artistic embellishments.',
        thumbnail: 'https://images.pexels.com/photos/1028441/pexels-photo-1028441.jpeg?w=600&h=400&fit=crop',
        itemCount: 128,
        category: 'Manuscripts',
        period: '1100 CE - 1500 CE',
        curator: 'Prof. Michael Wong'
      },
      {
        id: 3,
        title: 'Renaissance Art & Architecture',
        description: 'Explore the artistic and architectural achievements of the Renaissance period through high-quality digital reproductions.',
        thumbnail: 'https://images.pixabay.com/photo/2020/05/16/19/39/church-5179249_1280.jpg?w=600&h=400&fit=crop',
        itemCount: 315,
        category: 'Art & Architecture',
        period: '14th - 17th Century',
        curator: 'Dr. Isabella Romano'
      }
    ],
    recent: [
      {
        id: 4,
        title: 'Industrial Revolution Photographs',
        description: 'Photographic documentation of the Industrial Revolution, capturing factories, workers, and technological innovations of the era.',
        thumbnail: 'https://images.pexels.com/photos/6447417/pexels-photo-6447417.jpeg?w=600&h=400&fit=crop',
        itemCount: 189,
        category: 'Photography',
        period: '1760 - 1840',
        curator: 'Dr. Thomas Maxwell'
      },
      {
        id: 5,
        title: 'World War II Documents Archive',
        description: 'Historical documents, letters, maps, and official records from World War II, providing insights into this pivotal period.',
        thumbnail: 'https://images.pixabay.com/photo/2017/08/10/01/44/typewriter-2616347_1280.jpg?w=600&h=400&fit=crop',
        itemCount: 423,
        category: 'Documents',
        period: '1939 - 1945',
        curator: 'Prof. Robert Harris'
      },
      {
        id: 6,
        title: 'Indigenous Cultural Heritage',
        description: 'A curated collection of indigenous art, artifacts, and oral histories preserved in digital format for future generations.',
        thumbnail: 'https://images.unsplash.com/photo-1496853650640-5bb6da4be695?w=600&h=400&fit=crop',
        itemCount: 156,
        category: 'Cultural Heritage',
        period: 'Various',
        curator: 'Dr. Maya Johnson'
      }
    ],
    featured: [
      {
        id: 7,
        title: 'Ancient Egyptian Papyri',
        description: 'Digitized collection of ancient Egyptian papyri with hieroglyphic writings, including religious texts and administrative documents.',
        thumbnail: 'https://images.pexels.com/photos/6786927/pexels-photo-6786927.jpeg?w=600&h=400&fit=crop',
        itemCount: 92,
        category: 'Manuscripts',
        period: '3000 BCE - 30 BCE',
        curator: 'Dr. Amelia Parker'
      },
      {
        id: 8,
        title: 'Early Scientific Instruments',
        description: 'Digital models and photographs of historical scientific instruments that revolutionized our understanding of the natural world.',
        thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop',
        itemCount: 104,
        category: 'Scientific History',
        period: '16th - 19th Century',
        curator: 'Prof. David Schmidt'
      },
      {
        id: 9,
        title: 'Oral History Recordings',
        description: 'Audio recordings of oral histories, personal accounts, and interviews capturing lived experiences across different time periods.',
        thumbnail: 'https://images.pexels.com/photos/2533090/pexels-photo-2533090.jpeg?w=600&h=400&fit=crop',
        itemCount: 267,
        category: 'Audio',
        period: '20th Century',
        curator: 'Dr. Sophia Williams'
      }
    ]
  };

  const tabs = [
    { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
    { id: 'recent', label: 'Recently Added', icon: 'Clock' },
    { id: 'featured', label: 'Featured', icon: 'Star' }
  ];

  const handleViewCollection = (id) => {
    navigate(`/content-detail?id=${id}`);
  };

  const handleViewAllCollections = () => {
    navigate('/content-management');
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-2">Featured Collections</h2>
          <p className="text-text-secondary max-w-2xl">Explore our curated digital collections spanning various historical periods and subjects.</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="inline-flex bg-secondary-50 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? 'bg-white text-primary-700 shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections[activeTab].map((collection) => (
          <div 
            key={collection.id}
            className="bg-surface border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group"
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={collection.thumbnail}
                alt={collection.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-2 py-1 bg-primary-600 text-white text-xs rounded-md font-medium">
                  {collection.category}
                </span>
                <h3 className="text-xl text-white font-heading font-semibold mt-2 line-clamp-1">
                  {collection.title}
                </h3>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <p className="text-text-secondary mb-4 line-clamp-3">
                {collection.description}
              </p>
              
              <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-text-secondary mb-4">
                <div className="flex items-center">
                  <Icon name="Calendar" size={14} className="mr-1.5 text-text-muted" />
                  <span>{collection.period}</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Package" size={14} className="mr-1.5 text-text-muted" />
                  <span>{collection.itemCount} items</span>
                </div>
                <div className="flex items-center">
                  <Icon name="User" size={14} className="mr-1.5 text-text-muted" />
                  <span>{collection.curator}</span>
                </div>
              </div>
              
              <Button
                onClick={() => handleViewCollection(collection.id)}
                variant="outline"
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full"
              >
                Explore Collection
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button
          onClick={handleViewAllCollections}
          variant="secondary"
          size="lg"
          iconName="Grid"
        >
          View All Collections
        </Button>
      </div>
    </div>
  );
};

export default FeaturedCollections;