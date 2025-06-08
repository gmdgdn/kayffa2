import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const MetadataForm = ({ file, categories, collections, onMetadataUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    collection: '',
    rightsInfo: '',
    publicationDate: '',
    customAttributes: {},
    isPublic: true,
    enableComments: false,
    featured: false
  });

  const [newTag, setNewTag] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (file && file.metadata) {
      setFormData({
        title: file.metadata.title || '',
        description: file.metadata.description || '',
        category: file.metadata.category || '',
        tags: file.metadata.tags || [],
        collection: file.metadata.collection || '',
        rightsInfo: file.metadata.rightsInfo || '',
        publicationDate: file.metadata.publicationDate || new Date().toISOString().split('T')[0],
        customAttributes: file.metadata.customAttributes || {},
        isPublic: file.metadata.isPublic !== undefined ? file.metadata.isPublic : true,
        enableComments: file.metadata.enableComments || false,
        featured: file.metadata.featured || false
      });
    }
  }, [file]);

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onMetadataUpdate(updatedData);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      const updatedTags = [...formData.tags, newTag.trim()];
      handleInputChange('tags', updatedTags);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = formData.tags.filter(tag => tag !== tagToRemove);
    handleInputChange('tags', updatedTags);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const getFilePreview = () => {
    if (!file) return null;

    if (file.thumbnail) {
      return (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-secondary-100">
          <Image
            src={file.thumbnail}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    if (file.type.startsWith('video/')) {
      return (
        <div className="w-full h-48 rounded-lg bg-secondary-100 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Video" size={48} className="text-secondary-500 mx-auto mb-2" />
            <p className="text-sm text-text-secondary">Video Preview</p>
            <p className="text-xs text-text-muted">{file.name}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-48 rounded-lg bg-secondary-100 flex items-center justify-center">
        <div className="text-center">
          <Icon name="File" size={48} className="text-secondary-500 mx-auto mb-2" />
          <p className="text-sm text-text-secondary">File Preview</p>
          <p className="text-xs text-text-muted">{file.name}</p>
        </div>
      </div>
    );
  };

  const extractedMetadata = {
    fileSize: file ? (file.size / (1024 * 1024)).toFixed(2) + ' MB' : '',
    fileType: file ? file.type : '',
    dimensions: file && file.type.startsWith('image/') ? '1920 × 1080' : null,
    duration: file && file.type.startsWith('video/') ? '00:02:45' : null,
    created: file ? new Date(file.file?.lastModified || Date.now()).toLocaleDateString() : ''
  };

  if (!file) {
    return (
      <div className="card h-96 flex items-center justify-center">
        <div className="text-center">
          <Icon name="FileText" size={48} className="text-secondary-500 mx-auto mb-4" />
          <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
            No File Selected
          </h3>
          <p className="text-text-secondary font-body">
            Select a file from the upload queue to edit its metadata
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          File Metadata
        </h3>
        <p className="text-sm text-text-secondary font-body">
          Configure metadata and settings for: {file.name}
        </p>
      </div>

      {/* File Preview */}
      <div className="mb-6">
        {getFilePreview()}
      </div>

      {/* Extracted Metadata */}
      <div className="mb-6 p-4 bg-background rounded-lg">
        <h4 className="text-sm font-medium text-text-primary mb-3">Extracted Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary font-caption">File Size:</span>
            <p className="text-text-primary font-medium">{extractedMetadata.fileSize}</p>
          </div>
          <div>
            <span className="text-text-secondary font-caption">File Type:</span>
            <p className="text-text-primary font-medium">{extractedMetadata.fileType}</p>
          </div>
          {extractedMetadata.dimensions && (
            <div>
              <span className="text-text-secondary font-caption">Dimensions:</span>
              <p className="text-text-primary font-medium">{extractedMetadata.dimensions}</p>
            </div>
          )}
          {extractedMetadata.duration && (
            <div>
              <span className="text-text-secondary font-caption">Duration:</span>
              <p className="text-text-primary font-medium">{extractedMetadata.duration}</p>
            </div>
          )}
          <div>
            <span className="text-text-secondary font-caption">Created:</span>
            <p className="text-text-primary font-medium">{extractedMetadata.created}</p>
          </div>
        </div>
      </div>

      {/* Metadata Form */}
      <form className="space-y-6">
        {/* Required Fields */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-4 flex items-center">
            <Icon name="Star" size={16} className="text-error mr-2" />
            Required Information
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="input-field"
                placeholder="Enter a descriptive title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="input-field h-24 resize-none"
                placeholder="Provide a detailed description of the content"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-primary-500 hover:text-primary-700"
                >
                  <Icon name="X" size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field flex-1"
              placeholder="Add tags to improve discoverability"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="btn-secondary"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>

        {/* Collection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Collection
          </label>
          <select
            value={formData.collection}
            onChange={(e) => handleInputChange('collection', e.target.value)}
            className="input-field"
          >
            <option value="">No collection</option>
            {collections.map(collection => (
              <option key={collection.id} value={collection.id}>
                {collection.label}
              </option>
            ))}
          </select>
        </div>

        {/* Publication Date */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Publication Date
          </label>
          <input
            type="date"
            value={formData.publicationDate}
            onChange={(e) => handleInputChange('publicationDate', e.target.value)}
            className="input-field"
          />
        </div>

        {/* Advanced Options Toggle */}
        <div className="pt-4 border-t border-border">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-accent hover:text-accent-600 font-medium"
          >
            <Icon 
              name={showAdvanced ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
            <span>Advanced Options</span>
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Rights Information
              </label>
              <textarea
                value={formData.rightsInfo}
                onChange={(e) => handleInputChange('rightsInfo', e.target.value)}
                className="input-field h-20 resize-none"
                placeholder="Copyright, licensing, or usage rights information"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500"
                />
                <label htmlFor="isPublic" className="text-sm text-text-primary">
                  Make this content publicly accessible
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="enableComments"
                  checked={formData.enableComments}
                  onChange={(e) => handleInputChange('enableComments', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500"
                />
                <label htmlFor="enableComments" className="text-sm text-text-primary">
                  Enable comments and feedback
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-border rounded focus:ring-primary-500"
                />
                <label htmlFor="featured" className="text-sm text-text-primary">
                  Feature this content on homepage
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <div className="text-sm text-text-secondary font-caption">
            Changes are saved automatically
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="btn-secondary"
            >
              <Icon name="Eye" size={16} className="mr-2" />
              Preview
            </button>
            <button
              type="button"
              className="btn-accent"
            >
              <Icon name="Wand2" size={16} className="mr-2" />
              Auto-categorize
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MetadataForm;