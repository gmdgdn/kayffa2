import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentActivity = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'upload',
      user: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      action: 'uploaded',
      target: 'Historical_Documents_2024.pdf',
      targetType: 'document',
      timestamp: new Date(Date.now() - 300000),
      metadata: { size: '2.4 MB', pages: 45 }
    },
    {
      id: 2,
      type: 'approval',
      user: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      action: 'approved',
      target: 'Archive Collection: Medieval Manuscripts',
      targetType: 'collection',
      timestamp: new Date(Date.now() - 900000),
      metadata: { items: 23 }
    },
    {
      id: 3,
      type: 'edit',
      user: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      action: 'updated metadata for',
      target: 'Ancient_Artifacts_Gallery',
      targetType: 'gallery',
      timestamp: new Date(Date.now() - 1800000),
      metadata: { fields: 8 }
    },
    {
      id: 4,
      type: 'download',
      user: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      action: 'downloaded',
      target: 'Research_Data_2024.zip',
      targetType: 'archive',
      timestamp: new Date(Date.now() - 3600000),
      metadata: { size: '156 MB' }
    },
    {
      id: 5,
      type: 'comment',
      user: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      action: 'commented on',
      target: 'Digital_Archive_Proposal.docx',
      targetType: 'document',
      timestamp: new Date(Date.now() - 7200000),
      metadata: { comment: 'Excellent work on the categorization system!' }
    },
    {
      id: 6,
      type: 'share',
      user: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      action: 'shared',
      target: 'Public Archives Dashboard',
      targetType: 'dashboard',
      timestamp: new Date(Date.now() - 10800000),
      metadata: { recipients: 5 }
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activity', icon: 'Activity' },
    { value: 'upload', label: 'Uploads', icon: 'Upload' },
    { value: 'approval', label: 'Approvals', icon: 'CheckCircle' },
    { value: 'edit', label: 'Edits', icon: 'Edit' },
    { value: 'download', label: 'Downloads', icon: 'Download' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const getActivityIcon = (type) => {
    const iconMap = {
      upload: 'Upload',
      approval: 'CheckCircle',
      edit: 'Edit',
      download: 'Download',
      comment: 'MessageCircle',
      share: 'Share'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      upload: 'bg-primary-100 text-primary-600',
      approval: 'bg-success-100 text-success-600',
      edit: 'bg-warning-100 text-warning-600',
      download: 'bg-accent-100 text-accent-600',
      comment: 'bg-secondary-100 text-secondary-600',
      share: 'bg-purple-100 text-purple-600'
    };
    return colorMap[type] || 'bg-secondary-100 text-secondary-600';
  };

  const getTargetIcon = (type) => {
    const iconMap = {
      document: 'FileText',
      collection: 'FolderOpen',
      gallery: 'Image',
      archive: 'Archive',
      dashboard: 'LayoutDashboard'
    };
    return iconMap[type] || 'File';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">Recent Activity</h3>
          <p className="text-sm text-text-secondary font-caption">Latest actions across the platform</p>
        </div>
        <button className="btn-secondary text-sm">
          View All
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === option.value
                ? 'bg-primary-100 text-primary-700' :'text-text-secondary hover:bg-secondary-50 hover:text-text-primary'
            }`}
          >
            <Icon name={option.icon} size={14} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-secondary-50 rounded-lg transition-colors duration-200">
            {/* User Avatar */}
            <div className="relative flex-shrink-0">
              <Image
                src={activity.avatar}
                alt={activity.user}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={10} />
              </div>
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-text-primary text-sm">{activity.user}</span>
                <span className="text-text-secondary text-sm">{activity.action}</span>
                <Icon name={getTargetIcon(activity.targetType)} size={14} className="text-text-muted" />
              </div>
              
              <p className="text-sm text-text-primary font-medium mb-1">{activity.target}</p>
              
              {/* Metadata */}
              <div className="flex items-center space-x-4 text-xs text-text-secondary font-caption">
                <span>{formatTimeAgo(activity.timestamp)}</span>
                {activity.metadata.size && (
                  <span className="flex items-center space-x-1">
                    <Icon name="HardDrive" size={10} />
                    <span>{activity.metadata.size}</span>
                  </span>
                )}
                {activity.metadata.pages && (
                  <span className="flex items-center space-x-1">
                    <Icon name="FileText" size={10} />
                    <span>{activity.metadata.pages} pages</span>
                  </span>
                )}
                {activity.metadata.items && (
                  <span className="flex items-center space-x-1">
                    <Icon name="Package" size={10} />
                    <span>{activity.metadata.items} items</span>
                  </span>
                )}
                {activity.metadata.fields && (
                  <span className="flex items-center space-x-1">
                    <Icon name="Tag" size={10} />
                    <span>{activity.metadata.fields} fields</span>
                  </span>
                )}
                {activity.metadata.recipients && (
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" size={10} />
                    <span>{activity.metadata.recipients} recipients</span>
                  </span>
                )}
              </div>

              {/* Comment Preview */}
              {activity.metadata.comment && (
                <div className="mt-2 p-2 bg-secondary-50 rounded-md">
                  <p className="text-xs text-text-secondary italic">"{activity.metadata.comment}"</p>
                </div>
              )}
            </div>

            {/* Action Menu */}
            <button className="flex-shrink-0 p-1 hover:bg-secondary-100 rounded-md transition-colors duration-200">
              <Icon name="MoreHorizontal" size={16} className="text-text-muted" />
            </button>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">No {filter === 'all' ? '' : filter} activity found</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;