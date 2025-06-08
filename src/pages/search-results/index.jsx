import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import SearchFilters from './components/SearchFilters';
import ResultCard from './components/ResultCard';
import ViewToggle from './components/ViewToggle';
import SortOptions from './components/SortOptions';

const SearchResults = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('historical documents');
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(0.23);
  const [totalResults, setTotalResults] = useState(1247);

  const mockSearchResults = [
    {
      id: 1,
      title: "Historical Documents Collection 1920-1950",
      snippet: "A comprehensive collection of historical documents from the early 20th century including government records, personal letters, and official correspondence that provides insight into the social and political climate of the era.",
      contentType: "Document Collection",
      fileFormat: "PDF",
      category: "Historical Archives",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      relevanceScore: 95,
      dateCreated: "2024-01-15",
      fileSize: "45.2 MB",
      author: "National Archives",
      tags: ["history", "documents", "20th century", "government"],
      downloadCount: 1250,
      lastModified: "2024-03-10"
    },
    {
      id: 2,
      title: "Medieval Manuscript Digital Archive",
      snippet: "Digitized medieval manuscripts from the 12th to 15th centuries featuring illuminated texts, religious documents, and scholarly works preserved in high-resolution format for academic research and historical study.",
      contentType: "Manuscript",
      fileFormat: "TIFF",
      category: "Medieval Studies",
      thumbnail: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?w=400&h=300&fit=crop",
      relevanceScore: 88,
      dateCreated: "2023-11-20",
      fileSize: "128.7 MB",
      author: "University Library",
      tags: ["medieval", "manuscripts", "illuminated", "religious"],
      downloadCount: 890,
      lastModified: "2024-02-28"
    },
    {
      id: 3,
      title: "World War II Correspondence Archive",
      snippet: "Personal letters and official correspondence from World War II era including soldier communications, government dispatches, and civilian accounts that document the human experience during wartime.",
      contentType: "Letter Collection",
      fileFormat: "PDF",
      category: "Military History",
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/05/07/letter-1867342_1280.jpg?w=400&h=300&fit=crop",
      relevanceScore: 92,
      dateCreated: "2024-02-08",
      fileSize: "67.3 MB",
      author: "War Memorial Museum",
      tags: ["wwii", "letters", "military", "correspondence"],
      downloadCount: 2100,
      lastModified: "2024-03-15"
    },
    {
      id: 4,
      title: "Ancient Civilization Artifacts Database",
      snippet: "Comprehensive digital catalog of ancient artifacts including pottery, tools, jewelry, and ceremonial objects from various civilizations with detailed metadata and high-resolution imagery for archaeological research.",
      contentType: "Artifact Database",
      fileFormat: "JSON",
      category: "Archaeology",
      thumbnail: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop",
      relevanceScore: 85,
      dateCreated: "2023-12-05",
      fileSize: "234.1 MB",
      author: "Archaeological Institute",
      tags: ["archaeology", "artifacts", "ancient", "civilization"],
      downloadCount: 756,
      lastModified: "2024-01-22"
    },
    {
      id: 5,
      title: "Scientific Research Papers 1950-2000",
      snippet: "Collection of peer-reviewed scientific research papers spanning five decades of scientific advancement including breakthrough discoveries, experimental results, and theoretical frameworks across multiple disciplines.",
      contentType: "Research Papers",
      fileFormat: "PDF",
      category: "Scientific Literature",
      thumbnail: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?w=400&h=300&fit=crop",
      relevanceScore: 79,
      dateCreated: "2024-01-30",
      fileSize: "156.8 MB",
      author: "Research Institute",
      tags: ["science", "research", "papers", "academic"],
      downloadCount: 1890,
      lastModified: "2024-03-05"
    },
    {
      id: 6,
      title: "Cultural Heritage Photography Collection",
      snippet: "Extensive photographic documentation of cultural heritage sites, traditional ceremonies, and historical landmarks from around the world captured over several decades by renowned photographers and cultural anthropologists.",
      contentType: "Photo Collection",
      fileFormat: "RAW",
      category: "Cultural Heritage",
      thumbnail: "https://images.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg?w=400&h=300&fit=crop",
      relevanceScore: 91,
      dateCreated: "2023-10-12",
      fileSize: "512.4 MB",
      author: "Cultural Heritage Foundation",
      tags: ["photography", "culture", "heritage", "landmarks"],
      downloadCount: 1456,
      lastModified: "2024-02-18"
    }
  ];

  const relatedSearches = [
    "historical documents 19th century",
    "government archives collection",
    "manuscript digitization project",
    "wartime correspondence letters",
    "archaeological artifact database"
  ];

  const suggestedRefinements = [
    "Add date filter: 1900-1950",
    "Filter by PDF format",
    "Include government category",
    "Sort by popularity"
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Search Results', path: '/search-results' }
  ];

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleToggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleFilterApply = (filters) => {
    setAppliedFilters(filters);
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleRemoveFilter = (filterToRemove) => {
    const updatedFilters = appliedFilters.filter(filter => filter !== filterToRemove);
    setAppliedFilters(updatedFilters);
  };

  const handleSearchRefine = (query) => {
    setSearchQuery(query);
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const handleResultAction = (action, resultId) => {
    switch (action) {
      case 'preview':
        window.location.href = `/content-detail?id=${resultId}`;
        break;
      case 'download':
        console.log(`Downloading result ${resultId}`);
        break;
      case 'collection':
        console.log(`Adding result ${resultId} to collection`);
        break;
      case 'share':
        console.log(`Sharing result ${resultId}`);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'} pt-16`}>
        <div className="flex">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 border-r border-border bg-surface">
            <SearchFilters 
              onApplyFilters={handleFilterApply}
              appliedFilters={appliedFilters}
              totalResults={totalResults}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="p-6">
              <Breadcrumb items={breadcrumbItems} />
              
              {/* Search Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                      Search Results
                    </h1>
                    <p className="text-text-secondary font-body">
                      {totalResults.toLocaleString()} results for "{searchQuery}" ({searchTime}s)
                    </p>
                  </div>
                  
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={handleToggleFilters}
                    className="lg:hidden btn-secondary flex items-center space-x-2"
                  >
                    <Icon name="Filter" size={18} />
                    <span>Filters</span>
                  </button>
                </div>

                {/* Applied Filters */}
                {appliedFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm text-text-secondary font-caption">Active filters:</span>
                    {appliedFilters.map((filter, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        <span>{filter}</span>
                        <button
                          onClick={() => handleRemoveFilter(filter)}
                          className="hover:text-primary-900 transition-colors duration-200"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => setAppliedFilters([])}
                      className="text-sm text-accent hover:text-accent-600 font-medium"
                    >
                      Clear all
                    </button>
                  </div>
                )}

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-surface rounded-lg border border-border">
                  <div className="flex items-center space-x-4">
                    <ViewToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} />
                    <div className="hidden sm:block w-px h-6 bg-border"></div>
                    <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="text-sm text-accent hover:text-accent-600 font-medium flex items-center space-x-1">
                      <Icon name="Search" size={16} />
                      <span>Advanced Search</span>
                    </button>
                    <button className="text-sm text-accent hover:text-accent-600 font-medium flex items-center space-x-1">
                      <Icon name="Download" size={16} />
                      <span>Export Results</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="card animate-pulse">
                      <div className="w-full h-48 bg-secondary-200 rounded-md mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                        <div className="h-3 bg-secondary-200 rounded w-full"></div>
                        <div className="h-3 bg-secondary-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`
                  ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 
                    viewMode === 'list' ? 'space-y-4' : 'overflow-x-auto'}
                `}>
                  {mockSearchResults.map((result) => (
                    <ResultCard
                      key={result.id}
                      result={result}
                      viewMode={viewMode}
                      searchQuery={searchQuery}
                      onAction={handleResultAction}
                    />
                  ))}
                </div>
              )}

              {/* Load More / Infinite Scroll Trigger */}
              <div className="mt-12 text-center">
                <button className="btn-primary flex items-center space-x-2 mx-auto">
                  <Icon name="RotateCcw" size={18} />
                  <span>Load More Results</span>
                </button>
              </div>

              {/* Related Searches & Suggestions */}
              <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Related Searches
                  </h3>
                  <div className="space-y-2">
                    {relatedSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchRefine(search)}
                        className="block w-full text-left text-sm text-accent hover:text-accent-600 hover:underline transition-colors duration-200"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Suggested Refinements
                  </h3>
                  <div className="space-y-2">
                    {suggestedRefinements.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm text-text-secondary"
                      >
                        <Icon name="Lightbulb" size={14} className="text-warning-500" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {isFiltersOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-modal">
            <div className="fixed inset-y-0 left-0 w-80 bg-surface shadow-modal">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-heading font-semibold text-text-primary">Filters</h2>
                <button
                  onClick={handleToggleFilters}
                  className="p-2 rounded-md text-secondary-500 hover:text-secondary-700 hover:bg-secondary-50"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <SearchFilters 
                onApplyFilters={handleFilterApply}
                appliedFilters={appliedFilters}
                totalResults={totalResults}
                isMobile={true}
                onClose={handleToggleFilters}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;