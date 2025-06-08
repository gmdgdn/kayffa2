import React, { useState, useRef, useCallback } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import UploadZone from './components/UploadZone';
import MetadataForm from './components/MetadataForm';
import UploadQueue from './components/UploadQueue';

const ContentUpload = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Content Upload' }
  ];

  const mockCategories = [
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'images', label: 'Images', icon: 'Image' },
    { id: 'videos', label: 'Videos', icon: 'Video' },
    { id: 'audio', label: 'Audio', icon: 'Music' },
    { id: 'archives', label: 'Archives', icon: 'Archive' },
    { id: 'presentations', label: 'Presentations', icon: 'Presentation' }
  ];

  const mockCollections = [
    { id: 'historical', label: 'Historical Documents' },
    { id: 'research', label: 'Research Papers' },
    { id: 'media', label: 'Media Archive' },
    { id: 'corporate', label: 'Corporate Records' }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilesAdded = useCallback((newFiles) => {
    const processedFiles = newFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'pending', // pending, uploading, processing, completed, error
      thumbnail: null,
      metadata: {
        title: file.name.split('.')[0],
        description: '',
        category: '',
        tags: [],
        customAttributes: {},
        rightsInfo: '',
        publicationDate: new Date().toISOString().split('T')[0]
      }
    }));

    setUploadedFiles(prev => [...prev, ...processedFiles]);
    
    // Auto-select first file if none selected
    if (!selectedFile && processedFiles.length > 0) {
      setSelectedFile(processedFiles[0]);
    }

    // Start processing files
    processedFiles.forEach(processFile);
  }, [selectedFile]);

  const processFile = async (fileData) => {
    try {
      // Update status to uploading
      updateFileStatus(fileData.id, 'uploading', 0);

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        updateFileStatus(fileData.id, 'uploading', progress);
      }

      // Update status to processing
      updateFileStatus(fileData.id, 'processing', 100);

      // Generate thumbnail for images
      if (fileData.type.startsWith('image/')) {
        const thumbnail = await generateThumbnail(fileData.file);
        updateFileThumbnail(fileData.id, thumbnail);
      }

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mark as completed
      updateFileStatus(fileData.id, 'completed', 100);
    } catch (error) {
      updateFileStatus(fileData.id, 'error', 0);
    }
  };

  const generateThumbnail = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  const updateFileStatus = (fileId, status, progress) => {
    setUploadedFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, status, progress } : file
    ));
  };

  const updateFileThumbnail = (fileId, thumbnail) => {
    setUploadedFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, thumbnail } : file
    ));
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleMetadataUpdate = (metadata) => {
    if (selectedFile) {
      setUploadedFiles(prev => prev.map(file => 
        file.id === selectedFile.id 
          ? { ...file, metadata: { ...file.metadata, ...metadata } }
          : file
      ));
      setSelectedFile(prev => ({ ...prev, metadata: { ...prev.metadata, ...metadata } }));
    }
  };

  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    if (selectedFile && selectedFile.id === fileId) {
      const remainingFiles = uploadedFiles.filter(file => file.id !== fileId);
      setSelectedFile(remainingFiles.length > 0 ? remainingFiles[0] : null);
    }
  };

  const handlePublishAll = async () => {
    setIsProcessing(true);
    try {
      // Simulate publishing process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark all completed files as published
      setUploadedFiles(prev => prev.map(file => 
        file.status === 'completed' 
          ? { ...file, status: 'published' }
          : file
      ));
      
      alert('All files have been published successfully!');
    } catch (error) {
      alert('Error publishing files. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveAsDraft = () => {
    alert('Files saved as draft successfully!');
  };

  const completedFiles = uploadedFiles.filter(file => file.status === 'completed');
  const processingFiles = uploadedFiles.filter(file => ['uploading', 'processing'].includes(file.status));

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-64'} pt-16`}>
        <div className="p-6">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  Content Upload
                </h1>
                <p className="text-text-secondary font-body">
                  Upload and manage your digital assets with comprehensive metadata capture
                </p>
              </div>
              
              {completedFiles.length > 0 && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSaveAsDraft}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Icon name="Save" size={18} />
                    <span>Save as Draft</span>
                  </button>
                  <button
                    onClick={handlePublishAll}
                    disabled={isProcessing}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <Icon name="Loader2" size={18} className="animate-spin" />
                    ) : (
                      <Icon name="Upload" size={18} />
                    )}
                    <span>{isProcessing ? 'Publishing...' : 'Publish All'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Upload Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Upload" size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-caption">Total Files</p>
                  <p className="text-xl font-heading font-semibold text-text-primary">
                    {uploadedFiles.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-accent-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-caption">Processing</p>
                  <p className="text-xl font-heading font-semibold text-text-primary">
                    {processingFiles.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-caption">Completed</p>
                  <p className="text-xl font-heading font-semibold text-text-primary">
                    {completedFiles.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                  <Icon name="HardDrive" size={20} className="text-warning-600" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-caption">Total Size</p>
                  <p className="text-xl font-heading font-semibold text-text-primary">
                    {(uploadedFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(1)} MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Panel - Upload Zone and Queue */}
            <div className="lg:col-span-4 space-y-6">
              <UploadZone onFilesAdded={handleFilesAdded} />
              
              {uploadedFiles.length > 0 && (
                <UploadQueue
                  files={uploadedFiles}
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                  onRemoveFile={handleRemoveFile}
                />
              )}
            </div>

            {/* Right Panel - Metadata Form */}
            <div className="lg:col-span-8">
              {selectedFile ? (
                <MetadataForm
                  file={selectedFile}
                  categories={mockCategories}
                  collections={mockCollections}
                  onMetadataUpdate={handleMetadataUpdate}
                />
              ) : (
                <div className="card h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="FileText" size={32} className="text-secondary-500" />
                    </div>
                    <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                      No File Selected
                    </h3>
                    <p className="text-text-secondary font-body">
                      Upload files or select from the queue to edit metadata
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentUpload;