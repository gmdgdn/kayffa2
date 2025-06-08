import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const UploadQueue = ({ files, selectedFile, onFileSelect, onRemoveFile }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return { icon: 'Clock', color: 'text-secondary-500' };
      case 'uploading':
        return { icon: 'Upload', color: 'text-accent-600' };
      case 'processing':
        return { icon: 'Loader2', color: 'text-warning-600' };
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success-600' };
      case 'error':
        return { icon: 'XCircle', color: 'text-error-600' };
      case 'published':
        return { icon: 'Globe', color: 'text-primary-600' };
      default:
        return { icon: 'File', color: 'text-secondary-500' };
    }
  };

  const getFileTypeIcon = (type) => {
    if (type.startsWith('image/')) return 'Image';
    if (type.startsWith('video/')) return 'Video';
    if (type.startsWith('audio/')) return 'Music';
    if (type.includes('pdf')) return 'FileText';
    if (type.includes('document') || type.includes('word')) return 'FileText';
    if (type.includes('presentation') || type.includes('powerpoint')) return 'Presentation';
    if (type.includes('zip') || type.includes('archive')) return 'Archive';
    return 'File';
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'uploading':
        return 'Uploading';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Ready';
      case 'error':
        return 'Error';
      case 'published':
        return 'Published';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Upload Queue
        </h3>
        <span className="text-sm text-text-secondary font-caption">
          {files.length} file{files.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {files.map((file) => {
          const statusInfo = getStatusIcon(file.status);
          const isSelected = selectedFile && selectedFile.id === file.id;
          
          return (
            <div
              key={file.id}
              onClick={() => onFileSelect(file)}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50' :'border-border hover:border-primary-300 hover:bg-secondary-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* File Thumbnail/Icon */}
                <div className="flex-shrink-0">
                  {file.thumbnail ? (
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <Image
                        src={file.thumbnail}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-secondary-100 rounded-md flex items-center justify-center">
                      <Icon
                        name={getFileTypeIcon(file.type)}
                        size={20}
                        className="text-secondary-500"
                      />
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {file.name}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFile(file.id);
                      }}
                      className="text-text-muted hover:text-error transition-colors duration-200"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-secondary font-caption">
                      {formatFileSize(file.size)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Icon
                        name={statusInfo.icon}
                        size={14}
                        className={`${statusInfo.color} ${
                          file.status === 'processing' ? 'animate-spin' : ''
                        }`}
                      />
                      <span className={`text-xs font-medium ${statusInfo.color}`}>
                        {getStatusText(file.status)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {(file.status === 'uploading' || file.status === 'processing') && (
                    <div className="w-full bg-secondary-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          file.status === 'uploading' ? 'bg-accent-500' : 'bg-warning-500'
                        }`}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata Preview */}
              {isSelected && file.metadata && (
                <div className="mt-3 pt-3 border-t border-border-light">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {file.metadata.title && (
                      <div>
                        <span className="text-text-secondary font-caption">Title:</span>
                        <p className="text-text-primary font-medium truncate">
                          {file.metadata.title}
                        </p>
                      </div>
                    )}
                    {file.metadata.category && (
                      <div>
                        <span className="text-text-secondary font-caption">Category:</span>
                        <p className="text-text-primary font-medium">
                          {file.metadata.category}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {files.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Upload" size={24} className="text-secondary-500" />
          </div>
          <p className="text-text-secondary font-body">
            No files in queue. Upload files to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadQueue;