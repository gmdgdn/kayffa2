import React from 'react';
import Icon from 'components/AppIcon';

const QuickActions = ({ userRole }) => {
  const getActionsForRole = (role) => {
    const baseActions = [
      {
        id: 'upload-content',
        title: 'Upload Content',
        description: 'Add new digital assets',
        icon: 'Upload',
        color: 'primary',
        path: '/content-upload'
      },
      {
        id: 'search-archives',
        title: 'Search Archives',
        description: 'Find existing content',
        icon: 'Search',
        color: 'accent',
        path: '/search-results'
      }
    ];

    if (role === 'admin') {
      return [
        ...baseActions,
        {
          id: 'create-collection',
          title: 'Create Collection',
          description: 'Organize content groups',
          icon: 'FolderPlus',
          color: 'success',
          path: '/content-management'
        },
        {
          id: 'generate-report',
          title: 'Generate Report',
          description: 'Analytics and insights',
          icon: 'BarChart3',
          color: 'warning',
          path: '/analytics-dashboard'
        },
        {
          id: 'manage-users',
          title: 'Manage Users',
          description: 'User administration',
          icon: 'Users',
          color: 'secondary',
          path: '/user-management'
        },
        {
          id: 'system-settings',
          title: 'System Settings',
          description: 'Platform configuration',
          icon: 'Settings',
          color: 'secondary',
          path: '/settings'
        }
      ];
    } else if (role === 'content_manager') {
      return [
        ...baseActions,
        {
          id: 'create-collection',
          title: 'Create Collection',
          description: 'Organize content groups',
          icon: 'FolderPlus',
          color: 'success',
          path: '/content-management'
        },
        {
          id: 'generate-report',
          title: 'Generate Report',
          description: 'Content analytics',
          icon: 'BarChart3',
          color: 'warning',
          path: '/analytics-dashboard'
        },
        {
          id: 'review-pending',
          title: 'Review Pending',
          description: 'Approve submissions',
          icon: 'Clock',
          color: 'warning',
          path: '/content-management?filter=pending'
        }
      ];
    } else {
      return [
        ...baseActions,
        {
          id: 'my-bookmarks',
          title: 'My Bookmarks',
          description: 'Saved content items',
          icon: 'Bookmark',
          color: 'success',
          path: '/bookmarks'
        },
        {
          id: 'browse-collections',
          title: 'Browse Collections',
          description: 'Explore curated content',
          icon: 'Grid3x3',
          color: 'secondary',
          path: '/collections'
        }
      ];
    }
  };

  const actions = getActionsForRole(userRole);

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-100 text-primary-600 hover:bg-primary-200',
      accent: 'bg-accent-100 text-accent-600 hover:bg-accent-200',
      success: 'bg-success-100 text-success-600 hover:bg-success-200',
      warning: 'bg-warning-100 text-warning-600 hover:bg-warning-200',
      secondary: 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
    };
    return colorMap[color] || colorMap.secondary;
  };

  const handleActionClick = (path) => {
    if (path) {
      window.location.href = path;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">Quick Actions</h3>
            <p className="text-sm text-text-secondary font-caption">Common tasks and shortcuts</p>
          </div>
        </div>

        <div className="space-y-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.path)}
              className="w-full flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${getColorClasses(action.color)}`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-text-primary group-hover:text-primary-700 transition-colors duration-200">
                  {action.title}
                </h4>
                <p className="text-sm text-text-secondary font-caption">
                  {action.description}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-muted group-hover:text-primary-600 transition-colors duration-200" />
            </button>
          ))}
        </div>
      </div>

      {/* Workflow Status (for content managers and admins) */}
      {(userRole === 'content_manager' || userRole === 'admin') && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary">Workflow Status</h3>
            <button className="text-sm text-accent hover:text-accent-600 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Pending Reviews</p>
                  <p className="text-xs text-text-secondary font-caption">18 items awaiting approval</p>
                </div>
              </div>
              <button className="btn-secondary text-xs">
                Review
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Active Uploads</p>
                  <p className="text-xs text-text-secondary font-caption">7 files processing</p>
                </div>
              </div>
              <button className="btn-secondary text-xs">
                Monitor
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-success-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Completed Today</p>
                  <p className="text-xs text-text-secondary font-caption">42 items published</p>
                </div>
              </div>
              <button className="btn-secondary text-xs">
                View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Shortcuts */}
      <div className="card">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">Recent Shortcuts</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 p-2 hover:bg-secondary-50 rounded-md transition-colors duration-200">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Medieval Manuscripts Collection</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-2 hover:bg-secondary-50 rounded-md transition-colors duration-200">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Research Data Archive</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-2 hover:bg-secondary-50 rounded-md transition-colors duration-200">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Digital Gallery Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;