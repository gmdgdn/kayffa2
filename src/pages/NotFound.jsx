import React from 'react';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="FileX" size={48} className="text-primary-600" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">Page Not Found</h2>
          <p className="text-text-secondary font-body">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={18} />
            <span>Back to Dashboard</span>
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary w-full flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;