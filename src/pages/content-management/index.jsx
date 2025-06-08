import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import FilterPanel from './components/FilterPanel';
import ContentTable from './components/ContentTable';
import ContentGrid from './components/ContentGrid';
import BulkActionBar from './components/BulkActionBar';

const ContentManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState('table');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'uploadDate', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filters, setFilters] = useState({
    contentType: '',
    category: '',
    status: '',
    dateRange: { start: '', end: '' },
    tags: []
  });

  const mockContent = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1568667256549-094345857637?w=100&h=100&fit=crop",
      title: "Historical Documents Collection 2023",
      type: "Document",
      category: "Historical Archives",
      uploadDate: "2024-01-15",
      status: "Published",
      size: "2.4 MB",
      author: "Dr. Sarah Johnson",
      tags: ["history", "documents", "2023"],
      downloads: 156,
      views: 1240,
      lastModified: "2024-01-20"
    },
    {
      id: 2,
      thumbnail: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?w=100&h=100&fit=crop",
      title: "Medieval Manuscript Digitization Project",
      type: "Image",
      category: "Manuscripts",
      uploadDate: "2024-01-12",
      status: "Draft",
      size: "15.7 MB",
      author: "Prof. Michael Chen",
      tags: ["medieval", "manuscripts", "digitization"],
      downloads: 89,
      views: 567,
      lastModified: "2024-01-18"
    },
    {
      id: 3,
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/06/15/audio-1867121_960_720.jpg?w=100&h=100&fit=crop",
      title: "Oral History Interview Series",
      type: "Audio",
      category: "Oral Histories",
      uploadDate: "2024-01-10",
      status: "Published",
      size: "45.2 MB",
      author: "Lisa Rodriguez",
      tags: ["oral history", "interviews", "community"],
      downloads: 234,
      views: 890,
      lastModified: "2024-01-16"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=100&h=100&fit=crop",
      title: "Documentary Film Archive",
      type: "Video",
      category: "Films",
      uploadDate: "2024-01-08",
      status: "Archived",
      size: "1.2 GB",
      author: "James Wilson",
      tags: ["documentary", "film", "archive"],
      downloads: 45,
      views: 234,
      lastModified: "2024-01-14"
    },
    {
      id: 5,
      thumbnail: "https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?w=100&h=100&fit=crop",
      title: "Scientific Research Papers Collection",
      type: "Document",
      category: "Research",
      uploadDate: "2024-01-05",
      status: "Published",
      size: "8.9 MB",
      author: "Dr. Emily Davis",
      tags: ["research", "science", "papers"],
      downloads: 312,
      views: 1567,
      lastModified: "2024-01-19"
    },
    {
      id: 6,
      thumbnail: "https://images.pixabay.com/photo/2017/05/10/19/29/map-2301952_960_720.jpg?w=100&h=100&fit=crop",
      title: "Historical Maps Collection",
      type: "Image",
      category: "Maps",
      uploadDate: "2024-01-03",
      status: "Published",
      size: "12.3 MB",
      author: "Robert Thompson",
      tags: ["maps", "historical", "geography"],
      downloads: 178,
      views: 923,
      lastModified: "2024-01-17"
    },
    {
      id: 7,
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop",
      title: "Library Catalog Database",
      type: "Database",
      category: "Catalogs",
      uploadDate: "2024-01-01",
      status: "Draft",
      size: "156.7 MB",
      author: "Maria Garcia",
      tags: ["library", "catalog", "database"],
      downloads: 67,
      views: 345,
      lastModified: "2024-01-15"
    },
    {
      id: 8,
      thumbnail: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=100&h=100&fit=crop",
      title: "Photographic Archive 1950-1980",
      type: "Image",
      category: "Photography",
      uploadDate: "2023-12-28",
      status: "Published",
      size: "234.5 MB",
      author: "David Lee",
      tags: ["photography", "vintage", "archive"],
      downloads: 445,
      views: 2134,
      lastModified: "2024-01-12"
    }
  ];

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Content Management' }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterPanelToggle = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(mockContent.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on items:`, selectedItems);
    // Handle bulk actions here
    setSelectedItems([]);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleUploadNew = () => {
    window.location.href = '/content-upload';
  };

  const filteredAndSortedContent = mockContent
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = !filters.contentType || item.type === filters.contentType;
      const matchesCategory = !filters.category || item.category === filters.category;
      const matchesStatus = !filters.status || item.status === filters.status;
      
      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalItems = filteredAndSortedContent.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedContent = filteredAndSortedContent.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Filter Panel */}
          <FilterPanel 
            isOpen={isFilterPanelOpen}
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setIsFilterPanelOpen(false)}
          />

          {/* Main Content Area */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${isFilterPanelOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>
            <div className="p-6 border-b border-border bg-surface">
              <Breadcrumb items={breadcrumbItems} />
              
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-heading font-semibold text-text-primary">Content Management</h1>
                  <p className="text-text-secondary font-body mt-1">
                    Organize and manage your digital archive content
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleFilterPanelToggle}
                    className={`lg:hidden btn-secondary flex items-center space-x-2 ${isFilterPanelOpen ? 'bg-primary-100 text-primary-700' : ''}`}
                  >
                    <Icon name="Filter" size={18} />
                    <span>Filters</span>
                  </button>
                  
                  <button
                    onClick={handleUploadNew}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Icon name="Plus" size={18} />
                    <span>Upload New Content</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="p-6 border-b border-border bg-surface">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative flex-1 lg:w-80">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search content..."
                      className="input-field pl-10"
                    />
                  </div>

                  {/* Filter Toggle for Desktop */}
                  <button
                    onClick={handleFilterPanelToggle}
                    className={`hidden lg:flex btn-secondary items-center space-x-2 ${isFilterPanelOpen ? 'bg-primary-100 text-primary-700' : ''}`}
                  >
                    <Icon name="Filter" size={18} />
                    <span>Filters</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-secondary-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        viewMode === 'table' ? 'bg-surface text-primary-600 shadow-sm' : 'text-secondary-600 hover:text-secondary-900'
                      }`}
                    >
                      <Icon name="Table" size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors duration-200 ${
                        viewMode === 'grid' ? 'bg-surface text-primary-600 shadow-sm' : 'text-secondary-600 hover:text-secondary-900'
                      }`}
                    >
                      <Icon name="Grid3X3" size={18} />
                    </button>
                  </div>

                  {/* Page Size Selector */}
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="input-field w-auto"
                  >
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                  </select>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-text-secondary font-caption">
                  Showing {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} of {totalItems} items
                </p>
                
                {selectedItems.length > 0 && (
                  <BulkActionBar 
                    selectedCount={selectedItems.length}
                    onBulkAction={handleBulkAction}
                    onClearSelection={() => setSelectedItems([])}
                  />
                )}
              </div>
            </div>

            {/* Content Display */}
            <div className="flex-1 overflow-auto">
              {viewMode === 'table' ? (
                <ContentTable
                  content={paginatedContent}
                  selectedItems={selectedItems}
                  sortConfig={sortConfig}
                  onSelectAll={handleSelectAll}
                  onSelectItem={handleSelectItem}
                  onSort={handleSort}
                  searchQuery={searchQuery}
                />
              ) : (
                <ContentGrid
                  content={paginatedContent}
                  selectedItems={selectedItems}
                  onSelectItem={handleSelectItem}
                  searchQuery={searchQuery}
                />
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-border bg-surface">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Icon name="ChevronLeft" size={16} />
                      <span>Previous</span>
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
                              currentPage === page
                                ? 'bg-primary text-white' :'text-text-secondary hover:bg-secondary-100'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      
                      {totalPages > 5 && (
                        <>
                          <span className="text-text-secondary">...</span>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={`w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
                              currentPage === totalPages
                                ? 'bg-primary text-white' :'text-text-secondary hover:bg-secondary-100'
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-text-secondary font-caption">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentManagement;