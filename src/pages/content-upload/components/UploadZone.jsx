import React, { useCallback, useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const UploadZone = ({ onFilesAdded }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const supportedFormats = {
    images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    documents: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'],
    videos: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
    audio: ['mp3', 'wav', 'flac', 'aac', 'ogg'],
    archives: ['zip', 'rar', '7z', 'tar', 'gz'],
    presentations: ['ppt', 'pptx', 'odp']
  };

  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const validateFile = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const allSupportedFormats = Object.values(supportedFormats).flat();
    
    if (!allSupportedFormats.includes(extension)) {
      return { valid: false, error: `Unsupported file format: .${extension}` };
    }
    
    if (file.size > maxFileSize) {
      return { valid: false, error: `File size exceeds 100MB limit` };
    }
    
    return { valid: true };
  };

  const processFiles = useCallback((files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    const errors = [];

    fileArray.forEach(file => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      alert(`Some files were rejected:\n${errors.join('\n')}`);
    }

    if (validFiles.length > 0) {
      onFilesAdded(validFiles);
    }
  }, [onFilesAdded]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [processFiles]);

  const handlePaste = useCallback((e) => {
    const items = e.clipboardData.items;
    const files = [];
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        files.push(items[i].getAsFile());
      }
    }
    
    if (files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Upload Files
        </h3>
        <p className="text-sm text-text-secondary font-body">
          Drag and drop files, paste from clipboard, or click to browse
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary-500 bg-primary-50' :'border-border hover:border-primary-300 hover:bg-primary-25'
        }`}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.doc,.docx,.txt,.rtf,.odt,.mp4,.avi,.mov,.wmv,.flv,.webm,.mp3,.wav,.flac,.aac,.ogg,.zip,.rar,.7z,.tar,.gz,.ppt,.pptx,.odp"
        />
        
        <div className="space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
            isDragOver ? 'bg-primary-100' : 'bg-secondary-100'
          }`}>
            <Icon 
              name={isDragOver ? "Upload" : "CloudUpload"} 
              size={32} 
              className={isDragOver ? 'text-primary-600' : 'text-secondary-500'} 
            />
          </div>
          
          <div>
            <p className="text-lg font-medium text-text-primary mb-2">
              {isDragOver ? 'Drop files here' : 'Choose files or drag them here'}
            </p>
            <p className="text-sm text-text-secondary">
              Maximum file size: 100MB per file
            </p>
          </div>
          
          <button className="btn-primary">
            <Icon name="FolderOpen" size={18} className="mr-2" />
            Browse Files
          </button>
        </div>
      </div>

      {/* Supported Formats */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Supported Formats</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(supportedFormats).map(([category, formats]) => (
            <div key={category} className="bg-background rounded-md p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={
                    category === 'images' ? 'Image' :
                    category === 'documents' ? 'FileText' :
                    category === 'videos' ? 'Video' :
                    category === 'audio' ? 'Music' :
                    category === 'archives'? 'Archive' : 'Presentation'
                  } 
                  size={16} 
                  className="text-secondary-500" 
                />
                <span className="text-sm font-medium text-text-primary capitalize">
                  {category}
                </span>
              </div>
              <p className="text-xs text-text-secondary font-caption">
                {formats.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-text-secondary font-caption">Quick Actions:</span>
            <button className="text-accent hover:text-accent-600 font-medium">
              Paste from Clipboard (Ctrl+V)
            </button>
          </div>
          <div className="text-text-muted font-caption">
            Tip: You can select multiple files at once
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;