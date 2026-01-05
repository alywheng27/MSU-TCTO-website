/**
 * Advanced Screenshot Protection System
 * Multi-layer protection against screenshots including browser extensions
 * Note: Browser extensions with elevated privileges can bypass some protections,
 * but this makes it significantly more difficult.
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    enableBlur: true,
    enableWatermark: true,
    enableConsoleWarnings: true,
    enableDevToolsDetection: true,
    blurIntensity: '15px',
    watermarkText: 'PROTECTED CONTENT - MSU-TCTO',
    watermarkOpacity: 0.3
  };

  // State tracking
  let isProtected = true;
  let devToolsOpen = false;
  let screenshotAttempts = 0;
  let protectionOverlay = null;

  /**
   * Create protection overlay with watermark
   */
  function createProtectionOverlay() {
    if (protectionOverlay) return protectionOverlay;

    const overlay = document.createElement('div');
    overlay.id = 'screenshot-protection-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
      opacity: 0;
      transition: opacity 0.3s ease;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 50px,
        rgba(255, 0, 0, 0.02) 50px,
        rgba(255, 0, 0, 0.02) 100px
      );
    `;

    // Watermark text
    if (config.enableWatermark) {
      const watermark = document.createElement('div');
      watermark.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 48px;
        font-weight: bold;
        color: rgba(255, 0, 0, ${config.watermarkOpacity});
        white-space: nowrap;
        user-select: none;
        pointer-events: none;
        font-family: Arial, sans-serif;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        letter-spacing: 8px;
      `;
      watermark.textContent = config.watermarkText;
      overlay.appendChild(watermark);
    }

    document.body.appendChild(overlay);
    protectionOverlay = overlay;
    return overlay;
  }

  /**
   * Show protection overlay
   */
  function showProtectionOverlay() {
    // Disabled - only logo protection is active, no screen overlay
    // const overlay = createProtectionOverlay();
    // overlay.style.opacity = '1';
    
    // if (config.enableBlur) {
    //   document.body.style.filter = `blur(${config.blurIntensity})`;
    //   document.body.style.transition = 'filter 0.3s ease';
    // }
  }

  /**
   * Hide protection overlay
   */
  function hideProtectionOverlay() {
    // Disabled - only logo protection is active, no screen overlay
    // if (protectionOverlay) {
    //   protectionOverlay.style.opacity = '0';
    // }
    // document.body.style.filter = '';
  }

  /**
   * Block keyboard shortcuts for screenshots
   */
  function blockScreenshotShortcuts(e) {
    // Print Screen key - IMMEDIATE logo blackout
    if (e.key === 'PrintScreen' || e.keyCode === 44 || e.code === 'PrintScreen') {
      // Make logos black IMMEDIATELY (no delay) - keep black for 20 seconds
      // Call BEFORE preventDefault to ensure it happens instantly
      makeLogosBlack(20000);
      
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      screenshotAttempts++;
      // Only logo blackout, no screen overlay
      
      if (config.enableConsoleWarnings) {
        console.warn('%c⚠️ LOGO PROTECTION ACTIVATED', 'color: red; font-size: 16px; font-weight: bold;');
        console.warn('Logo protection is active. Logos will appear black in screenshots.');
      }
      
      // Optional: Show brief warning message (can be removed if not needed)
      // showWarningMessage('Logo protection is active. Logos are protected and will appear black in screenshots.');
      
      return false;
    }

    // Windows + Shift + S (Windows Snipping Tool)
    if ((e.key === 'S' || e.keyCode === 83) && e.shiftKey && (e.metaKey || e.ctrlKey)) {
      makeLogosBlack(20000); // Make logos black for 20 seconds
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      // Only logo blackout, no screen overlay
      // showWarningMessage('Logo protection is active. Logos are protected and will appear black in screenshots.');
      return false;
    }

    // Alt + PrintScreen
    if ((e.key === 'PrintScreen' || e.keyCode === 44 || e.code === 'PrintScreen') && e.altKey) {
      makeLogosBlack(20000); // Make logos black for 20 seconds
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      // Only logo blackout, no screen overlay
      // showWarningMessage('Logo protection is active. Logos are protected and will appear black in screenshots.');
      return false;
    }
    
    // Also detect Print Screen on keyup (in case keydown was missed)
    // This is a backup detection method

    // Ctrl + Shift + I (DevTools) - can be used for screenshots
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
      screenshotAttempts++;
      if (config.enableConsoleWarnings) {
        console.warn('%c⚠️ Developer Tools Access Detected', 'color: orange; font-size: 14px; font-weight: bold;');
      }
    }

    // F12 (DevTools)
    if (e.key === 'F12' || e.keyCode === 123) {
      screenshotAttempts++;
      if (config.enableConsoleWarnings) {
        console.warn('%c⚠️ Developer Tools Access Detected', 'color: orange; font-size: 14px; font-weight: bold;');
      }
    }

    // Ctrl + Shift + C (Element Inspector)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
      screenshotAttempts++;
    }

    // Ctrl + Shift + J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
      screenshotAttempts++;
    }

    // Ctrl + U (View Source)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      showWarningMessage('View source is disabled.');
      return false;
    }
  }

  /**
   * Show warning message to user
   */
  function showWarningMessage(message) {
    // Remove existing warning if any
    const existingWarning = document.getElementById('screenshot-warning');
    if (existingWarning) {
      existingWarning.remove();
    }

    const warning = document.createElement('div');
    warning.id = 'screenshot-warning';
    warning.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(220, 38, 38, 0.95);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 1000000;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: bold;
      animation: slideDown 0.3s ease;
      pointer-events: none;
    `;
    warning.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
    `;
    if (!document.getElementById('screenshot-warning-style')) {
      style.id = 'screenshot-warning-style';
      document.head.appendChild(style);
    }

    document.body.appendChild(warning);

    setTimeout(() => {
      warning.style.opacity = '0';
      warning.style.transition = 'opacity 0.3s ease';
      setTimeout(() => warning.remove(), 300);
    }, 3000);
  }

  /**
   * Detect DevTools opening
   */
  function detectDevTools() {
    if (!config.enableDevToolsDetection) return;

    let devToolsThreshold = 160;
    const element = new Image();
    let devToolsOpen = false;

    Object.defineProperty(element, 'id', {
      get: function() {
        if (!devToolsOpen) {
          devToolsOpen = true;
          screenshotAttempts++;
          makeLogosBlack(10000); // Make logos black when DevTools detected
          
          if (config.enableConsoleWarnings) {
            console.warn('%c⚠️ Developer Tools Detected', 'color: red; font-size: 16px; font-weight: bold;');
            console.warn('Logo protection is active.');
          }
          
          // Only logo protection, no screen overlay
          // showWarningMessage('Developer Tools detected. Logo protection is active.');
        }
      }
    });

    setInterval(() => {
      devToolsOpen = false;
      console.log(element);
      console.clear();
    }, 1000);
  }

  /**
   * Detect if device is mobile
   */
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (typeof window.orientation !== 'undefined') ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
  }

  /**
   * Monitor page visibility changes (tab switching, app switching)
   * Enhanced for mobile devices
   */
  function monitorVisibility() {
    const isMobile = isMobileDevice();
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page is hidden - user might be taking screenshot (common on mobile)
        screenshotAttempts++;
        // Longer duration on mobile since screenshots take longer
        makeLogosBlack(isMobile ? 15000 : 10000);
        if (config.enableConsoleWarnings) {
          console.warn('%c⚠️ Page Visibility Changed', 'color: orange; font-size: 14px;');
        }
      } else {
        // Page is visible again - keep logos black briefly to catch delayed screenshots
        makeLogosBlack(isMobile ? 5000 : 3000);
        // Only logo protection, no screen overlay
      }
    });
    
    // Also monitor window blur (when user switches to another app/window)
    window.addEventListener('blur', () => {
      screenshotAttempts++;
      // Mobile devices often lose focus when taking screenshots
      makeLogosBlack(isMobile ? 12000 : 8000);
      if (config.enableConsoleWarnings) {
        console.warn('%c⚠️ Window Focus Lost', 'color: orange; font-size: 14px;');
      }
    });
    
    window.addEventListener('focus', () => {
      // When window regains focus, keep logos black briefly (longer on mobile)
      makeLogosBlack(isMobile ? 4000 : 2000);
    });
    
    // Mobile-specific: Detect orientation changes (common before mobile screenshots)
    if (isMobile) {
      let lastOrientation = window.orientation;
      window.addEventListener('orientationchange', () => {
        screenshotAttempts++;
        // Orientation change might indicate screenshot attempt
        makeLogosBlack(10000);
        if (config.enableConsoleWarnings) {
          console.warn('%c⚠️ Orientation Changed', 'color: orange; font-size: 14px;');
        }
        lastOrientation = window.orientation;
      });
      
      // Also listen for resize events (orientation change triggers resize)
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (window.orientation !== lastOrientation) {
            screenshotAttempts++;
            makeLogosBlack(10000);
            lastOrientation = window.orientation;
          }
        }, 100);
      });
    }
  }

  /**
   * Detect screenshot extensions by checking for common extension APIs
   */
  function detectScreenshotExtensions() {
    // Check for common screenshot extension identifiers
    const extensionChecks = [
      () => window.chrome && window.chrome.runtime && window.chrome.runtime.id,
      () => window.browser && window.browser.runtime && window.browser.runtime.id,
      () => document.querySelector('iframe[src*="screenshot"]'),
      () => document.querySelector('iframe[src*="capture"]'),
    ];

    setInterval(() => {
      extensionChecks.forEach((check, index) => {
        try {
          if (check()) {
            screenshotAttempts++;
            makeLogosBlack(10000);
            if (config.enableConsoleWarnings) {
              console.warn('%c⚠️ Screenshot Extension Detected', 'color: red; font-size: 14px; font-weight: bold;');
            }
            // Only logo protection, no screen overlay
          }
        } catch (e) {
          // Extension detection failed, continue
        }
      });
    }, 2000);
  }

  /**
   * Prevent context menu globally
   */
  function preventContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    showWarningMessage('Right-click is disabled.');
    return false;
  }

  /**
   * Prevent text selection
   */
  function preventSelection(e) {
    if (e.ctrlKey || e.metaKey) {
      // Allow Ctrl+A for accessibility, but prevent Ctrl+C
      if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        e.stopPropagation();
        showWarningMessage('Copying is disabled.');
        return false;
      }
    }
  }

  /**
   * Block common screenshot-related mouse events
   */
  function blockScreenshotMouseEvents(e) {
    // Middle mouse button (sometimes used for screenshots)
    if (e.button === 1) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  /**
   * Make logos black when screenshot is detected
   * This function applies CSS filters to turn logos black when canvas-based screenshots are taken
   */
  function makeLogosBlack(duration = 10000) {
    // Find ONLY the Official MSU-TCTO logo-01.png - specific protection only
    const logos = document.querySelectorAll('img[src*="Official MSU-TCTO logo-01.png"]');
    
    logos.forEach(logo => {
      // Apply filter to make logo black IMMEDIATELY (no transition delay)
      // Use multiple methods to ensure it works
      logo.style.setProperty('filter', 'brightness(0) contrast(0)', 'important');
      logo.style.setProperty('-webkit-filter', 'brightness(0) contrast(0)', 'important');
      logo.style.setProperty('-moz-filter', 'brightness(0) contrast(0)', 'important');
      logo.style.setProperty('transition', 'filter 0s ease', 'important');
      logo.style.setProperty('will-change', 'filter', 'important');
      logo.style.setProperty('opacity', '1', 'important');
      
      // Also add a class for CSS targeting
      logo.classList.add('screenshot-protected-black');
      
      // Force multiple reflows to ensure the filter is applied immediately
      void logo.offsetWidth;
      void logo.offsetHeight;
      logo.style.display = 'block'; // Ensure it's visible
      
      // Restore after specified duration
      setTimeout(() => {
        logo.style.removeProperty('filter');
        logo.style.removeProperty('-webkit-filter');
        logo.style.removeProperty('-moz-filter');
        logo.style.setProperty('transition', 'filter 0.5s ease', 'important');
        logo.classList.remove('screenshot-protected-black');
      }, duration);
    });
    
    // Log for debugging
    if (config.enableConsoleWarnings && logos.length > 0) {
      console.log(`🛡️ Logo protection: ${logos.length} logo(s) turned black`);
    }
  }

  /**
   * Proactive protection - periodically make logos black to catch screenshots
   * This helps catch Print Screen which happens too fast to detect
   */
  /**
   * Proactive protection - periodically make logos black to catch screenshots
   * CRITICAL for mobile devices - hardware screenshots cannot be detected, so we use high-frequency blackout
   */
  function proactiveLogoProtection() {
    const isMobile = isMobileDevice();
    
    // On mobile, use much higher frequency to catch hardware button screenshots
    const interval = isMobile ? 50 : 150; // 50ms on mobile (20 times per second), 150ms on desktop
    const blackoutDuration = isMobile ? 25 : 30; // Slightly longer on mobile
    const chance = isMobile ? 0.6 : 0.4; // 60% chance on mobile (higher frequency)
    
    setInterval(() => {
      const logos = document.querySelectorAll('img[src*="Official MSU-TCTO logo-01.png"]');
      
      if (logos.length === 0) return;
      
      // Make logos black for very brief moments
      // On mobile: Higher frequency increases chance of catching hardware button screenshots
      if (Math.random() < chance) {
        logos.forEach(logo => {
          // Only apply if not already black from a detected screenshot
          if (!logo.classList.contains('screenshot-protected-black')) {
            const originalFilter = logo.style.filter || '';
            
            // Apply black filter instantly
            logo.style.setProperty('filter', 'brightness(0) contrast(0)', 'important');
            logo.style.setProperty('-webkit-filter', 'brightness(0) contrast(0)', 'important');
            logo.style.setProperty('-moz-filter', 'brightness(0) contrast(0)', 'important');
            logo.style.setProperty('transition', 'filter 0s ease', 'important');
            
            // Force reflow for immediate application
            void logo.offsetWidth;
            void logo.offsetHeight;
            
            // Restore almost immediately - invisible to human eye but catches screenshots
            setTimeout(() => {
              if (!logo.classList.contains('screenshot-protected-black')) {
                logo.style.setProperty('filter', originalFilter, 'important');
                logo.style.setProperty('-webkit-filter', originalFilter, 'important');
                logo.style.setProperty('-moz-filter', originalFilter, 'important');
                logo.style.setProperty('transition', 'filter 0.02s ease', 'important');
              }
            }, blackoutDuration);
          }
        });
      }
    }, interval);
  }

  /**
   * Detect canvas-based screenshot attempts
   * Many screenshot tools use canvas to capture content
   */
  function detectCanvasScreenshots() {
    // Override HTMLCanvasElement methods
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    const originalDrawImage = CanvasRenderingContext2D.prototype.drawImage;

    // Detect toDataURL calls (used by many screenshot tools)
    HTMLCanvasElement.prototype.toDataURL = function(...args) {
      screenshotAttempts++;
      makeLogosBlack(10000);
      // Only logo protection, no screen overlay
      
      if (config.enableConsoleWarnings) {
        console.warn('%c⚠️ Canvas Screenshot Detected', 'color: red; font-size: 14px; font-weight: bold;');
      }
      
      // Still return the data (we can't prevent it, but we've made logos black)
      return originalToDataURL.apply(this, args);
    };

    // Detect getImageData calls
    CanvasRenderingContext2D.prototype.getImageData = function(...args) {
      screenshotAttempts++;
      makeLogosBlack(10000);
      
      if (config.enableConsoleWarnings) {
        console.warn('%c⚠️ Canvas Image Data Access Detected', 'color: red; font-size: 14px; font-weight: bold;');
      }
      
      return originalGetImageData.apply(this, args);
    };

    // Detect drawImage calls that might be used for screenshots
    let drawImageCallCount = 0;
    CanvasRenderingContext2D.prototype.drawImage = function(...args) {
      drawImageCallCount++;
      
      // If there are many drawImage calls in quick succession, might be a screenshot
      if (drawImageCallCount > 10) {
        setTimeout(() => {
          if (drawImageCallCount > 50) {
            screenshotAttempts++;
            makeLogosBlack(10000);
            // Only logo protection, no screen overlay
          }
          drawImageCallCount = 0;
        }, 100);
      }
      
      return originalDrawImage.apply(this, args);
    };
  }

  /**
   * Detect screenshot tools using MutationObserver
   * Some tools inject elements or modify the DOM
   */
  function detectScreenshotTools() {
    // Watch for suspicious DOM changes
    const suspiciousPatterns = [
      /screenshot/i,
      /capture/i,
      /snapshot/i,
      /screen.*shot/i
    ];

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const nodeString = node.outerHTML || node.tagName || '';
            const suspicious = suspiciousPatterns.some(pattern => pattern.test(nodeString));
            
            if (suspicious) {
              screenshotAttempts++;
              makeLogosBlack(10000);
              // Only logo protection, no screen overlay
              
              if (config.enableConsoleWarnings) {
                console.warn('%c⚠️ Screenshot Tool Detected', 'color: red; font-size: 14px; font-weight: bold;');
              }
            }
          }
        });
      });
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id']
      });
    }
  }

  /**
   * Use CSS to make logos appear black when captured
   * This uses CSS filters that respond differently when content is captured
   */
  function applyLogoBlackoutCSS() {
    const style = document.createElement('style');
    style.id = 'logo-blackout-styles';
    style.textContent = `
      /* Make logos black when screenshot is detected */
      img[src*="Official MSU-TCTO logo-01.png"].screenshot-protected-black {
        filter: brightness(0) contrast(0) !important;
        -webkit-filter: brightness(0) contrast(0) !important;
        -moz-filter: brightness(0) contrast(0) !important;
        -ms-filter: brightness(0) contrast(0) !important;
        transition: filter 0s ease !important;
        -webkit-transition: filter 0s ease !important;
        opacity: 1 !important;
        display: block !important;
      }
      
      /* Logo appears normal by default - proactive protection uses very brief blackouts */
      img[src*="Official MSU-TCTO logo-01.png"] {
        position: relative;
        will-change: filter;
        pointer-events: auto;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        /* Proactive protection applies brief blackouts (invisible to users) */
      }
      
      /* Mobile-specific optimizations for better performance */
      @media (max-width: 768px) {
        img[src*="Official MSU-TCTO logo-01.png"] {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        img[src*="Official MSU-TCTO logo-01.png"].screenshot-protected-black {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
      }
    `;
    
    if (!document.getElementById('logo-blackout-styles')) {
      document.head.appendChild(style);
    }
  }

  /**
   * Monitor for screenshot extension activity
   * Check for common screenshot extension behaviors
   */
  function monitorScreenshotActivity() {
    // Check for common screenshot extension APIs periodically
    setInterval(() => {
      // Check if any canvas elements are being created (screenshot tools often create hidden canvases)
      const canvases = document.querySelectorAll('canvas');
      if (canvases.length > 0) {
        canvases.forEach(canvas => {
          // Check if canvas is hidden (common for screenshot tools)
          const style = window.getComputedStyle(canvas);
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            // Hidden canvas detected - might be a screenshot tool
            screenshotAttempts++;
            makeLogosBlack(10000);
            
            if (config.enableConsoleWarnings) {
              console.warn('%c⚠️ Hidden Canvas Detected', 'color: orange; font-size: 14px;');
            }
          }
        });
      }

      // Check for iframes that might be screenshot tools
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        try {
          const src = iframe.src || iframe.getAttribute('src') || '';
          if (/screenshot|capture|snapshot/i.test(src)) {
            screenshotAttempts++;
            makeLogosBlack(10000);
            // Only logo protection, no screen overlay
          }
        } catch (e) {
          // Cross-origin iframe, can't access
        }
      });
    }, 1000);
  }

  /**
   * Mobile-specific touch event monitoring
   * Detect potential screenshot gestures (e.g., multi-touch that might precede screenshots)
   */
  function monitorMobileTouchEvents() {
    if (!isMobileDevice()) return;
    
    let touchStartTime = 0;
    let touchCount = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchCount = e.touches.length;
      touchStartTime = Date.now();
      
      // Multiple simultaneous touches might indicate screenshot attempt preparation
      if (touchCount >= 2) {
        screenshotAttempts++;
        makeLogosBlack(8000);
      }
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - touchStartTime;
      // Very quick touch/release might indicate screenshot button press
      if (touchDuration < 200 && touchCount >= 2) {
        makeLogosBlack(10000);
      }
      touchCount = 0;
    }, { passive: true });
  }

  /**
   * Additional Print Screen detection on keyup
   * Catches Print Screen even if keydown was missed
   */
  function detectPrintScreenKeyup(e) {
    if (e.key === 'PrintScreen' || e.keyCode === 44 || e.code === 'PrintScreen') {
      // Make logos black immediately - keep black for 20 seconds
      makeLogosBlack(20000);
      screenshotAttempts++;
      // Only logo blackout, no screen overlay
      // showWarningMessage('Screenshot detected. Logos are protected and will appear black in screenshots.');
    }
  }

  /**
   * Initialize all protection mechanisms
   */
  function initScreenshotProtection() {
    const isMobile = isMobileDevice();
    
    // Keyboard event blocking - use capture phase for maximum priority (desktop only)
    if (!isMobile) {
      document.addEventListener('keydown', blockScreenshotShortcuts, true);
      document.addEventListener('keypress', blockScreenshotShortcuts, true);
      document.addEventListener('keyup', detectPrintScreenKeyup, true);
      document.addEventListener('keyup', preventSelection, true);
    }

    // Mouse event blocking (desktop)
    if (!isMobile) {
      document.addEventListener('contextmenu', preventContextMenu, true);
      document.addEventListener('mousedown', blockScreenshotMouseEvents, true);
      document.addEventListener('mouseup', blockScreenshotMouseEvents, true);
    }
    
    // Touch event monitoring (mobile)
    monitorMobileTouchEvents();

    // Copy/Cut blocking
    document.addEventListener('copy', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showWarningMessage('Copying is disabled.');
      return false;
    }, true);

    document.addEventListener('cut', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showWarningMessage('Cutting is disabled.');
      return false;
    }, true);

    // DevTools detection
    if (config.enableDevToolsDetection) {
      detectDevTools();
    }

    // Visibility monitoring
    monitorVisibility();

    // Extension detection
    detectScreenshotExtensions();

    // Canvas-based screenshot detection
    detectCanvasScreenshots();

    // Screenshot tool detection
    detectScreenshotTools();

    // Monitor screenshot activity
    monitorScreenshotActivity();

    // Apply CSS for logo blackout
    applyLogoBlackoutCSS();

    // Proactive protection ENABLED - CRITICAL for mobile hardware screenshots
    // High-frequency blackout on mobile to catch volume+power button screenshots
    proactiveLogoProtection();

    // Protection overlay disabled - only logo protection is active
    // createProtectionOverlay();

    // Add CSS to prevent text selection globally
    const style = document.createElement('style');
    style.id = 'screenshot-protection-styles';
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      
      img {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(style);

    if (config.enableConsoleWarnings) {
      console.log('%c🛡️ Screenshot Protection Active', 'color: green; font-size: 16px; font-weight: bold;');
      console.log('This website is protected against unauthorized screenshots.');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScreenshotProtection);
  } else {
    initScreenshotProtection();
  }

  // Re-initialize for dynamically loaded content
  const observer = new MutationObserver(() => {
    if (isProtected && !protectionOverlay) {
      createProtectionOverlay();
    }
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Export for manual control if needed
  window.screenshotProtection = {
    enable: () => { isProtected = true; },
    disable: () => { 
      isProtected = false; 
      hideProtectionOverlay();
    },
    showOverlay: showProtectionOverlay,
    hideOverlay: hideProtectionOverlay,
    getAttempts: () => screenshotAttempts
  };

})();

