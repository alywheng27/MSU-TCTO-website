import React, { useEffect, useRef } from 'react';

const ProtectedLogo = ({ 
  src, 
  alt = "MSU-TCTO Logo", 
  className = "", 
  size = "default",
  ...props 
}) => {
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    
    if (!img || !container) return;

    // Prevent right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent drag and drop
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent image selection
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent common screenshot shortcuts
    const handleKeyDown = (e) => {
      // Prevent Print Screen (limited effectiveness)
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }
      // Prevent Ctrl+Shift+I (DevTools) when focused on logo
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        if (container.contains(document.activeElement)) {
          e.preventDefault();
        }
      }
    };

    // Prevent copy
    const handleCopy = (e) => {
      e.preventDefault();
      return false;
    };

    // Add all event listeners
    img.addEventListener('contextmenu', handleContextMenu);
    img.addEventListener('dragstart', handleDragStart);
    img.addEventListener('selectstart', handleSelectStart);
    img.addEventListener('copy', handleCopy);
    container.addEventListener('contextmenu', handleContextMenu);
    container.addEventListener('dragstart', handleDragStart);
    container.addEventListener('selectstart', handleSelectStart);
    container.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);

    // CSS protection - disable image dragging via attribute
    img.setAttribute('draggable', 'false');
    img.style.userSelect = 'none';
    img.style.webkitUserSelect = 'none';
    img.style.mozUserSelect = 'none';
    img.style.msUserSelect = 'none';
    img.style.pointerEvents = 'auto';
    
    // Add invisible overlay to catch right-clicks
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '10';
    overlay.style.cursor = 'default';
    overlay.addEventListener('contextmenu', handleContextMenu);
    overlay.addEventListener('dragstart', handleDragStart);
    container.style.position = 'relative';
    container.appendChild(overlay);

    return () => {
      img.removeEventListener('contextmenu', handleContextMenu);
      img.removeEventListener('dragstart', handleDragStart);
      img.removeEventListener('selectstart', handleSelectStart);
      img.removeEventListener('copy', handleCopy);
      container.removeEventListener('contextmenu', handleContextMenu);
      container.removeEventListener('dragstart', handleDragStart);
      container.removeEventListener('selectstart', handleSelectStart);
      container.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    };
  }, []);

  // Size presets
  const sizeClasses = {
    small: 'h-8 w-8',
    default: 'h-12 w-12',
    medium: 'h-16 w-16',
    large: 'h-24 w-24',
    xl: 'h-32 w-32',
    auto: 'h-auto w-auto'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <div 
      ref={containerRef}
      className={`inline-block relative ${className}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${sizeClass} ${className}`}
        draggable="false"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          pointerEvents: 'auto'
        }}
        {...props}
      />
      {/* Invisible watermark overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'transparent',
          zIndex: 5
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default ProtectedLogo;

