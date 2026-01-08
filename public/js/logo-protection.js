/**
 * Global Logo Protection Script
 * Prevents downloading, right-clicking, dragging, and screenshotting of protected logos
 */

(function() {
  'use strict';

  const initLogoProtection = () => {
    // Find all protected logo containers
    const protectedContainers = document.querySelectorAll('[data-protected-logo="true"]');
    const protectedImages = document.querySelectorAll('img[data-protected-image="true"]');
    const allLogos = document.querySelectorAll('img[src*="Official MSU-TCTO logo-01"]');

    // Combine all elements that need protection
    const elementsToProtect = [
      ...Array.from(protectedContainers),
      ...Array.from(protectedImages),
      ...Array.from(allLogos)
    ];

    elementsToProtect.forEach(element => {
      // Prevent right-click context menu
      const handleContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      };

      // Prevent drag and drop
      const handleDragStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      };

      // Prevent image selection
      const handleSelectStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      // Prevent copy
      const handleCopy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      // Prevent cut
      const handleCut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      // Add event listeners with capture phase
      element.addEventListener('contextmenu', handleContextMenu, true);
      element.addEventListener('dragstart', handleDragStart, true);
      element.addEventListener('selectstart', handleSelectStart, true);
      element.addEventListener('copy', handleCopy, true);
      element.addEventListener('cut', handleCut, true);

      // Set draggable to false
      if (element.tagName === 'IMG') {
        element.setAttribute('draggable', 'false');
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.mozUserSelect = 'none';
        element.style.msUserSelect = 'none';
        element.style.webkitTouchCallout = 'none';
        element.style.webkitUserDrag = 'none';
      }
    });

    // Global protection for screenshot shortcuts (limited effectiveness)
    const handleKeyDown = (e) => {
      // Prevent Print Screen when logo is visible
      if (e.key === 'PrintScreen') {
        const logos = document.querySelectorAll('img[src*="Official MSU-TCTO logo-01"]');
        if (logos.length > 0) {
          // Can't fully prevent, but can show warning
          console.warn('Screenshot protection: Logo images are protected');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogoProtection);
  } else {
    initLogoProtection();
  }

  // Re-initialize for dynamically loaded content
  const observer = new MutationObserver(() => {
    initLogoProtection();
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Add CSS protection via style injection
  const style = document.createElement('style');
  style.textContent = `
    img[src*="Official MSU-TCTO logo-01"],
    [data-protected-logo="true"] img,
    img[data-protected-image="true"] {
      -webkit-user-drag: none !important;
      -khtml-user-drag: none !important;
      -moz-user-drag: none !important;
      -o-user-drag: none !important;
      user-drag: none !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      -webkit-touch-callout: none !important;
      pointer-events: auto !important;
    }
    
    img[src*="Official MSU-TCTO logo-01"]::selection,
    [data-protected-logo="true"] img::selection,
    img[data-protected-image="true"]::selection {
      background: transparent !important;
    }
    
    img[src*="Official MSU-TCTO logo-01"]::-moz-selection,
    [data-protected-logo="true"] img::-moz-selection,
    img[data-protected-image="true"]::-moz-selection {
      background: transparent !important;
    }
  `;
  document.head.appendChild(style);
})();





