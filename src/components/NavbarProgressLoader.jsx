import React, { useState, useEffect } from 'react';

const NavbarProgressLoader = ({ 
  isVisible = false, 
  progress = 0, 
  status = "Loading...", 
  onComplete = () => {} 
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Smooth progress animation
      const interval = setInterval(() => {
        setDisplayProgress(prev => {
          if (prev >= progress) {
            clearInterval(interval);
            if (progress >= 100) {
              setTimeout(() => {
                onComplete();
              }, 500);
            }
            return progress;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, [isVisible, progress, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/images/Official MSU-TCTO logo-01.png" 
              alt="MSU-TCTO Logo" 
              className="h-8 w-8 mr-3"
              data-protected-image="true"
              draggable="false"
              style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              MSU-TCTO
            </span>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {status}
              </span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {Math.round(displayProgress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-msu-deep-ocean to-msu-pink h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
          </div>

          {/* Loading Indicator */}
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-msu-deep-ocean border-t-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarProgressLoader;
