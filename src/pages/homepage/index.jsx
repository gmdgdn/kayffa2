import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';




// Component imports
import HeroSection from './components/HeroSection';
import DiscoveryCards from './components/DiscoveryCards';
import FeaturedCollections from './components/FeaturedCollections';
import SearchExplorer from './components/SearchExplorer';
import RecentAdditions from './components/RecentAdditions';
import InstitutionalInfo from './components/InstitutionalInfo';

const Homepage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for progressive content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      
      <main className="lg:ml-64 pt-16">
        {/* Main content area */}
        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {/* Hero Section with rotating featured content */}
          <HeroSection />
          
          {/* Quick Access Discovery Cards */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 bg-background">
            <DiscoveryCards />
          </div>
          
          {/* Search Explorer with autocomplete */}
          <div className="px-4 sm:px-6 lg:px-8 py-10 bg-primary-50">
            <SearchExplorer />
          </div>
          
          {/* Featured Collections */}
          <div className="px-4 sm:px-6 lg:px-8 py-12 bg-background">
            <FeaturedCollections />
          </div>
          
          {/* Recent Additions */}
          <div className="px-4 sm:px-6 lg:px-8 py-12 bg-secondary-50">
            <RecentAdditions />
          </div>
          
          {/* Institutional Information & News */}
          <div className="px-4 sm:px-6 lg:px-8 py-12 bg-background border-t border-border">
            <InstitutionalInfo />
          </div>
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-modal bg-background bg-opacity-80">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-primary font-heading font-medium">Loading archive content...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;