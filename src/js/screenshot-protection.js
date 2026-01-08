/**
 * Professional Screenshot Protection System
 * Advanced multi-layer protection with intelligent logo detection
 * Automatically disables screenshots when logo is detected in capture
 */

(function() {
  'use strict';

  // Configuration - Professional and optimized
  const config = {
    enableBlur: true,
    enableWatermark: true,
    enableConsoleWarnings: true,
    enableDevToolsDetection: true,
    enableFullScreenProtection: true,
    blurIntensity: '8px', // Reduced for mobile performance
    watermarkText: 'PROTECTED CONTENT - MSU-TCTO',
    watermarkOpacity: 0.3, // More subtle
    logoOpacity: 1.0, // Logo is fully visible by default (100% opacity)
    logoBlurOnDetection: '25px', // Strong blur when detected
    autoDisableDuration: 10000, // Auto-disable for 10 seconds when detected
    mobileBlurIntensity: '6px' // Even lighter for mobile
  };

  // State tracking
  let isProtected = true;
  let devToolsOpen = false;
  let screenshotAttempts = 0;
  let protectionOverlay = null;
  let screenshotsDisabled = false; // Auto-disable flag
  let disableUntil = 0; // Timestamp when protection re-enables

  /**
   * Create professional protection overlay with subtle watermark
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
      transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 100px,
        rgba(220, 38, 38, 0.015) 100px,
        rgba(220, 38, 38, 0.015) 200px
      );
    `;

    // Professional watermark text
    if (config.enableWatermark) {
      const watermark = document.createElement('div');
      watermark.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: clamp(24px, 4vw, 42px);
        font-weight: 600;
        color: rgba(220, 38, 38, ${config.watermarkOpacity});
        white-space: nowrap;
        user-select: none;
        pointer-events: none;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        letter-spacing: 6px;
        opacity: 0.7;
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
   * Professional keyboard shortcut blocking with auto-disable
   */
  function blockScreenshotShortcuts(e) {
    // Allow typing in input fields, textareas, and contenteditable elements
    const target = e.target || e.srcElement;
    if (target && (
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.contentEditable === 'true' ||
      target.isContentEditable ||
      (target.closest && (target.closest('input') || target.closest('textarea') || target.closest('[contenteditable="true"]')))
    )) {
      // Allow normal typing in input fields - don't block
      return;
    }
    
    // Check if screenshots are auto-disabled
    if (screenshotsDisabled && Date.now() < disableUntil) {
      e.preventDefault();
      e.stopPropagation();
      showWarningMessage('Screenshots are temporarily disabled due to detection.');
      return false;
    }
    
    // Print Screen key - BLOCK SCREENSHOT COMPLETELY
    // Blur logo IMMEDIATELY before screenshot can be captured
    if (e.key === 'PrintScreen' || e.keyCode === 44 || e.code === 'PrintScreen') {
      // Immediately blur logo before screenshot
      makeLogosBlack(config.autoDisableDuration, true);
      showProtectionOverlay();
      showWarningMessage('Screenshot detected. Logo auto-blurred.');
      screenshotAttempts++;
      setTimeout(() => hideProtectionOverlay(), 4000);
      // Make logos black IMMEDIATELY and auto-disable
      makeLogosBlack(config.autoDisableDuration, true);
      
      // Show professional protection overlay
      showProtectionOverlay();
      showWarningMessage('Screenshot detected. Protection auto-enabled.');
      
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      screenshotAttempts++;
      
      if (config.enableConsoleWarnings) {
        console.warn('%c🛡️ SCREENSHOT BLOCKED', 'color: #dc2626; font-size: 14px; font-weight: bold;');
        console.warn('Screenshots auto-disabled. This content is protected.');
      }
      
      // Keep protection active
      setTimeout(() => {
        hideProtectionOverlay();
      }, 4000);
      
      return false;
    }

    // Windows + Shift + S (Windows Snipping Tool) - ENHANCED DETECTION
    // Detect Windows key (metaKey) + Shift + S combination
    if ((e.key === 'S' || e.keyCode === 83) && e.shiftKey && (e.metaKey || e.ctrlKey || e.altKey)) {
      // Blur logo IMMEDIATELY before the screenshot can be taken
      makeLogosBlack(config.autoDisableDuration, true);
      showProtectionOverlay();
      showWarningMessage('Screenshot tool detected. Logo auto-blurred.');
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      screenshotAttempts++;
      setTimeout(() => hideProtectionOverlay(), 4000);
      return false;
    }
    
    // Additional detection: Windows key combinations that might trigger snipping tool
    if (e.metaKey && e.shiftKey) {
      // Any Windows + Shift combination - blur logo proactively
      makeLogosBlack(config.autoDisableDuration, true);
    }

    // Alt + PrintScreen - BLOCK COMPLETELY
    if ((e.key === 'PrintScreen' || e.keyCode === 44 || e.code === 'PrintScreen') && e.altKey) {
      makeLogosBlack(config.autoDisableDuration, true);
      showProtectionOverlay();
      showWarningMessage('Screenshot detected. Protection auto-enabled.');
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      setTimeout(() => hideProtectionOverlay(), 4000);
      return false;
    }

    // Ctrl + Shift + I (DevTools) - BLOCK to prevent screenshots
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      showProtectionOverlay();
      showWarningMessage('Developer Tools detected. Protection auto-enabled.');
      setTimeout(() => hideProtectionOverlay(), 4000);
      if (config.enableConsoleWarnings) {
        console.warn('%c🛡️ Developer Tools BLOCKED', 'color: #dc2626; font-size: 13px; font-weight: bold;');
      }
      return false;
    }

    // F12 (DevTools) - BLOCK
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      showProtectionOverlay();
      showWarningMessage('Developer Tools detected. Protection auto-enabled.');
      setTimeout(() => hideProtectionOverlay(), 4000);
      if (config.enableConsoleWarnings) {
        console.warn('%c🛡️ Developer Tools BLOCKED', 'color: #dc2626; font-size: 13px; font-weight: bold;');
      }
      return false;
    }

    // Ctrl + Shift + C (Element Inspector) - BLOCK
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      return false;
    }

    // Ctrl + Shift + J (Console) - BLOCK
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      return false;
    }

    // Ctrl + U (View Source)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      showWarningMessage('View source is disabled. Protection auto-enabled.');
      return false;
    }

    // Ctrl + S (Save Page) - BLOCK
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      showWarningMessage('Saving is disabled. Protection auto-enabled.');
      return false;
  }

    // Ctrl + P (Print) - BLOCK
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      showWarningMessage('Printing is disabled. Protection auto-enabled.');
      return false;
    }

    // Ctrl + Shift + P (Command Palette in DevTools) - BLOCK
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      showWarningMessage('Developer Tools command palette blocked. Protection auto-enabled.');
      return false;
    }

    // Ctrl + Shift + D (Toggle Dock in DevTools) - BLOCK
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      return false;
    }

    // Ctrl + Shift + M (Toggle Device Toolbar) - BLOCK
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      return false;
    }

    // Ctrl + Shift + K (Console in Firefox) - BLOCK
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      showWarningMessage('Developer Tools blocked. Protection auto-enabled.');
      return false;
    }

    // Ctrl + Shift + E (Network in Firefox) - BLOCK
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
      e.preventDefault();
      e.stopPropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      return false;
    }

    // Escape key (often used to close DevTools) - Monitor
    if (e.key === 'Escape' || e.keyCode === 27) {
      // Check if DevTools might be closing
      setTimeout(() => {
        if (screenshotsDisabled && Date.now() < disableUntil) {
          // Still in protection period, keep blurred
          makeLogosBlack(2000, false);
        }
      }, 500);
    }
  }

  /**
   * Professional warning message with modern design
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
      top: clamp(16px, 4vh, 24px);
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, rgba(220, 38, 38, 0.98), rgba(185, 28, 28, 0.98));
      color: white;
      padding: 14px 20px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
      z-index: 1000000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: clamp(12px, 2.5vw, 14px);
      font-weight: 600;
      letter-spacing: 0.3px;
      animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      max-width: 90%;
      text-align: center;
    `;
    warning.textContent = message;

    // Add professional animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-30px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
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
      warning.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      warning.style.transform = 'translateX(-50%) translateY(-20px) scale(0.95)';
      setTimeout(() => warning.remove(), 400);
    }, 3500);
  }

  /**
   * Enhanced DevTools detection with multiple methods
   */
  function detectDevTools() {
    if (!config.enableDevToolsDetection) return;

    let devToolsOpen = false;
    let lastWindowWidth = window.innerWidth;
    let lastWindowHeight = window.innerHeight;
    let devToolsDetected = false;

    // Method 1: Console object detection
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function() {
        if (!devToolsOpen && !devToolsDetected) {
          devToolsOpen = true;
          devToolsDetected = true;
          triggerDevToolsProtection();
        }
      }
    });

    // Method 2: Window size detection (DevTools changes window dimensions)
    function checkWindowSize() {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      const widthDiff = Math.abs(currentWidth - lastWindowWidth);
      const heightDiff = Math.abs(currentHeight - lastWindowHeight);
      
      // Detect significant window size changes (DevTools opening/closing)
      if ((widthDiff > 200 || heightDiff > 200) && !devToolsDetected) {
        devToolsDetected = true;
        triggerDevToolsProtection();
      }
      
      lastWindowWidth = currentWidth;
      lastWindowHeight = currentHeight;
    }

    // Method 3: Console object property detection
    function checkConsoleObject() {
      try {
        const start = performance.now();
        console.log('%c', 'color: transparent');
        const end = performance.now();
        
        // If console is open, logging takes longer
        if (end - start > 100 && !devToolsDetected) {
          devToolsDetected = true;
          triggerDevToolsProtection();
        }
      } catch (e) {
        // Silent fail
      }
    }

    // Method 4: Debugger detection
    function checkDebugger() {
      try {
        const start = performance.now();
        debugger; // This will pause if DevTools is open
        const end = performance.now();
        
        if (end - start > 100 && !devToolsDetected) {
          devToolsDetected = true;
          triggerDevToolsProtection();
        }
      } catch (e) {
        // Silent fail
      }
    }

    // Method 5: Function toString detection
    function checkFunctionToString() {
      try {
        const devtools = {
          toString: function() {
            if (!devToolsDetected) {
              devToolsDetected = true;
              triggerDevToolsProtection();
            }
            return '';
          }
        };
        console.log('%c', devtools);
      } catch (e) {
        // Silent fail
      }
    }

    // Trigger protection when DevTools detected
    function triggerDevToolsProtection() {
          screenshotAttempts++;
      screenshotsDisabled = true;
      disableUntil = Date.now() + config.autoDisableDuration;
      makeLogosBlack(config.autoDisableDuration, true);
          showProtectionOverlay();
      showWarningMessage('Developer Tools detected. Protection auto-enabled. Screenshots disabled.');
          
          if (config.enableConsoleWarnings) {
        console.warn('%c🛡️ DEVELOPER TOOLS DETECTED - ACCESS BLOCKED', 'color: #dc2626; font-size: 16px; font-weight: bold;');
        console.warn('%c⚠️ Screenshots are now disabled for your protection.', 'color: #f59e0b; font-size: 14px;');
        console.warn('%c🔒 This content is protected. Please close Developer Tools.', 'color: #dc2626; font-size: 12px;');
          }
          
          setTimeout(() => hideProtectionOverlay(), 5000);
      
      // Continuously check and re-trigger if DevTools remains open
      const continuousCheck = setInterval(() => {
        if (devToolsDetected) {
          screenshotsDisabled = true;
          disableUntil = Date.now() + config.autoDisableDuration;
          makeLogosBlack(config.autoDisableDuration, true);
        } else {
          clearInterval(continuousCheck);
      }
      }, 2000);
    }

    // Continuous monitoring
    setInterval(() => {
      devToolsOpen = false;
      console.log(element);
      console.clear();
      checkWindowSize();
      checkConsoleObject();
      checkFunctionToString();
    }, 500); // Check every 500ms for faster detection

    // Debugger check (runs less frequently to avoid performance issues)
    setInterval(() => {
      checkDebugger();
    }, 2000);
  }

  /**
   * Detect if device is mobile or tablet (iOS, Android, etc.)
   */
  function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent);
    const isTablet = /iPad|Android/i.test(userAgent) && !window.MSStream;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 1024;
    
    return isMobileUA || isTablet || (hasTouch && isSmallScreen) ||
           (typeof window.orientation !== 'undefined') ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform));
  }

  /**
   * Professional visibility monitoring with auto-disable
   * Enhanced for mobile devices with optimized performance
   */
  function monitorVisibility() {
    const isMobile = isMobileDevice();
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page is hidden - user might be taking screenshot (common on mobile)
        screenshotAttempts++;
        // Auto-disable when detected
        makeLogosBlack(isMobile ? config.autoDisableDuration : config.autoDisableDuration, true);
        showProtectionOverlay();
        if (config.enableConsoleWarnings) {
          console.warn('%c🛡️ SCREENSHOT ATTEMPT DETECTED', 'color: #dc2626; font-size: 13px; font-weight: bold;');
        }
        setTimeout(() => hideProtectionOverlay(), 3000);
      } else {
        // Page is visible again - check if still in auto-disable period
        if (screenshotsDisabled && Date.now() < disableUntil) {
          makeLogosBlack(5000, false); // Keep blurred but don't extend disable
        } else {
          makeLogosBlack(isMobile ? 4000 : 3000, false);
        }
        showProtectionOverlay();
        setTimeout(() => hideProtectionOverlay(), 2000);
      }
    });
    
    // Also monitor window blur (when user switches to another app/window)
    // This is critical for detecting snipping tool usage
    window.addEventListener('blur', () => {
      screenshotAttempts++;
      // Auto-disable and blur logo IMMEDIATELY when window loses focus
      // Snipping tool often causes window to lose focus
      makeLogosBlack(config.autoDisableDuration, true);
      showProtectionOverlay();
      showWarningMessage('Window focus lost. Logo auto-blurred for protection.');
      if (config.enableConsoleWarnings) {
        console.warn('%c🛡️ SCREENSHOT ATTEMPT DETECTED - Window Blur', 'color: #dc2626; font-size: 13px; font-weight: bold;');
      }
      setTimeout(() => hideProtectionOverlay(), 3000);
    });
    
    window.addEventListener('focus', () => {
      // When window regains focus, check if still in auto-disable period
      if (screenshotsDisabled && Date.now() < disableUntil) {
        makeLogosBlack(4000, false); // Keep blurred but don't extend disable
      } else {
        makeLogosBlack(isMobile ? 3000 : 2000, false);
      }
      showProtectionOverlay();
      setTimeout(() => hideProtectionOverlay(), 2000);
    });
    
    // Mobile-specific: Detect orientation changes (common before mobile screenshots)
    if (isMobile) {
      let lastOrientation = window.orientation;
      window.addEventListener('orientationchange', () => {
        screenshotAttempts++;
        // Orientation change might indicate screenshot attempt
        makeLogosBlack(config.autoDisableDuration, true); // Auto-disable on orientation change
        showProtectionOverlay();
        showWarningMessage('Orientation change detected. Protection auto-enabled.');
        if (config.enableConsoleWarnings) {
          console.warn('%c🛡️ SCREENSHOT ATTEMPT DETECTED', 'color: #dc2626; font-size: 13px; font-weight: bold;');
        }
        setTimeout(() => hideProtectionOverlay(), 3000);
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
   * Prevent context menu globally - Enhanced blocking
   */
  function preventContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    screenshotAttempts++;
    makeLogosBlack(config.autoDisableDuration, true);
    showWarningMessage('Right-click is disabled. Protection auto-enabled.');
    return false;
  }

  /**
   * Prevent text selection and copying - Enhanced blocking
   */
  function preventSelection(e) {
    // Allow typing in input fields, textareas, and contenteditable elements
    const target = e.target || e.srcElement;
    if (target && (
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.contentEditable === 'true' ||
      target.isContentEditable ||
      (target.closest && (target.closest('input') || target.closest('textarea') || target.closest('[contenteditable="true"]')))
    )) {
      // Allow normal typing and copy/paste in input fields
      return;
    }
    
    if (e.ctrlKey || e.metaKey) {
      // Allow Ctrl+A for accessibility, but prevent Ctrl+C, Ctrl+X, Ctrl+V
      if (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        e.stopPropagation();
        screenshotAttempts++;
        makeLogosBlack(config.autoDisableDuration, true);
        showWarningMessage('Copying/Cutting/Pasting is disabled. Protection auto-enabled.');
        return false;
      }
    }
    
    // Prevent text selection with mouse (except in input fields)
    if (e.type === 'selectstart' || e.type === 'mousedown') {
      // Allow selection in input fields, textareas, and contenteditable elements
      const target = e.target || e.srcElement;
      if (target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.contentEditable === 'true' ||
        target.isContentEditable ||
        (target.closest && (target.closest('input') || target.closest('textarea') || target.closest('[contenteditable="true"]')))
      )) {
        // Allow selection in input fields
        return;
      }
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        e.preventDefault();
        e.stopPropagation();
        selection.removeAllRanges();
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
   * Professional logo protection - makes logo less visible and blurs on detection
   * Automatically disables screenshots when logo is detected
   * Enhanced for immediate blur on screenshot attempts
   */
  function makeLogosBlack(duration = 10000, autoDisable = true) {
    // Find ONLY the Official MSU-TCTO logo-01.png - specific protection only
    // Also check for protected logo endpoint and canvas elements (secure loaded)
    const logos = document.querySelectorAll('img[src*="Official MSU-TCTO logo-01.png"], img[src*="/api/protected-logo"], canvas[data-protected-image="true"], canvas[data-secure-loaded="true"]');
    
    const isMobile = isMobileDevice();
    const blurAmount = isMobile ? config.mobileBlurIntensity : config.logoBlurOnDetection;
    
    // Auto-disable screenshots when logo is detected
    if (autoDisable && logos.length > 0) {
      screenshotsDisabled = true;
      disableUntil = Date.now() + config.autoDisableDuration;
      
      if (config.enableConsoleWarnings) {
        console.warn('%c🛡️ SCREENSHOT DETECTED - Protection Auto-Enabled', 
          'color: #dc2626; font-size: 14px; font-weight: bold;');
        console.warn(`Screenshots disabled for ${config.autoDisableDuration / 1000} seconds (${config.autoDisableDuration / 60000} minutes)`);
      }
    }
    
    logos.forEach(logo => {
      // Apply strong blur filter IMMEDIATELY - no transition delay for maximum protection
      // This ensures logo is blurred before screenshot can be captured
      // On mobile: Increase from 50% blur to full blur when detected
      // On desktop: Apply full blur
      const detectionBlur = isMobile ? config.logoBlurOnDetection : blurAmount;
      logo.style.setProperty('filter', `blur(${detectionBlur})`, 'important');
      logo.style.setProperty('-webkit-filter', `blur(${detectionBlur})`, 'important');
      logo.style.setProperty('-moz-filter', `blur(${detectionBlur})`, 'important');
      logo.style.setProperty('transition', 'none', 'important'); // No transition for instant blur
      logo.style.setProperty('will-change', 'filter', 'important');
      logo.style.setProperty('opacity', '0.2', 'important'); // Further reduce visibility
      
      // Add protection class
      logo.classList.add('screenshot-protected-black');
      logo.classList.add('screenshot-detected');
      
      // Force multiple reflows to ensure the filter is applied IMMEDIATELY
      void logo.offsetWidth;
      void logo.offsetHeight;
      void logo.offsetWidth; // Double reflow for maximum compatibility
      logo.style.display = 'block';
      
      // After a brief moment, add transition back for smooth restore
      setTimeout(() => {
        logo.style.setProperty('transition', 'filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 'important');
      }, 50);
      
      // Restore after specified duration (but keep auto-disable active)
      // If auto-disable is enabled, use the auto-disable duration instead
      const restoreDuration = autoDisable ? config.autoDisableDuration : duration;
      
      setTimeout(() => {
        if (autoDisable && Date.now() < disableUntil) {
          // Still in auto-disable period, keep blurred - check again later
          const remainingTime = disableUntil - Date.now();
          setTimeout(() => {
            if (Date.now() >= disableUntil) {
              restoreLogo(logo);
            }
          }, remainingTime);
          return;
        }
        
        restoreLogo(logo);
      }, restoreDuration);
    });
    
    // Log for debugging
    if (config.enableConsoleWarnings && logos.length > 0) {
      console.log(`🛡️ Logo protection: ${logos.length} logo(s) protected - Blurred immediately`);
    }
  }

  /**
   * Restore logo - Returns to default visibility based on device type
   * Desktop: 100% opacity, no blur
   * Mobile/Tablet: 95% opacity, 3% blur
   * Works with both img and canvas elements
   */
  function restoreLogo(logo) {
    const isMobile = isMobileDevice();
    
    if (isMobile) {
      // Mobile/Tablet: Return to 3% blur (permanent mobile protection)
      logo.style.setProperty('filter', 'blur(0.75px)', 'important');
      logo.style.setProperty('-webkit-filter', 'blur(0.75px)', 'important');
      logo.style.setProperty('-moz-filter', 'blur(0.75px)', 'important');
      logo.style.setProperty('opacity', '0.95', 'important'); // 95% opacity
    } else {
      // Desktop: Return to full visibility (no blur, 100% opacity)
      logo.style.setProperty('opacity', '1', 'important'); // 100% opacity - fully visible
      logo.style.setProperty('filter', 'none', 'important'); // No blur - fully clear
      logo.style.setProperty('-webkit-filter', 'none', 'important');
      logo.style.setProperty('-moz-filter', 'none', 'important');
    }
    
    logo.style.setProperty('transition', 'filter 0.5s ease, opacity 0.5s ease', 'important');
    logo.classList.remove('screenshot-protected-black');
    logo.classList.remove('screenshot-detected');
    
    // For canvas elements, re-render with clear image if needed
    if (logo.tagName === 'CANVAS' && logo.getAttribute('data-secure-loaded') === 'true') {
      // Canvas is already rendered, just update styles
      // The canvas content remains the same, only styling changes
    }
  }
  
  /**
   * Generate authentication token for API request
   * 🔐 Auth-protected API endpoint
   */
  function generateAuthToken() {
    const timestamp = Math.floor(Date.now() / (1000 * 60 * 5)); // 5-minute window
    const hostname = window.location.hostname;
    const secret = 'msu-tcto-logo-secret-2024'; // Should match server secret
    
    // Simple hash function
    const hashInput = `${timestamp}-${hostname}-${secret}`;
    let hash = 0;
    for (let i = 0; i < hashInput.length; i++) {
      const char = hashInput.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return Math.abs(hash).toString(36);
  }

  /**
   * Securely load logo via canvas to completely hide from DevTools
   * 🧠 Load via JS Blob
   * 📉 Compressed version served
   * Replaces img element with canvas to prevent source URL exposure
   */
  async function loadLogoSecurely(logo) {
    try {
      // Check if DevTools is open
      let devToolsOpen = false;
      const element = new Image();
      Object.defineProperty(element, 'id', {
        get: function() {
          devToolsOpen = true;
        }
      });
      console.log(element);
      console.clear();
      
      // If DevTools detected, hide the logo
      if (devToolsOpen) {
        logo.style.display = 'none';
        logo.style.visibility = 'hidden';
        return;
      }
      
      // 🔐 Generate auth token
      const authToken = generateAuthToken();
      
      // 🧠 Fetch the logo via JS Blob with auth token
      const response = await fetch(`/api/protected-logo?auth=${authToken}`, {
        method: 'GET',
        headers: {
          'Referer': window.location.href,
          'Accept': 'image/png,image/*;q=0.8',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Logo-Auth': authToken
        },
        credentials: 'same-origin',
        cache: 'no-store'
      });
      
      if (response.ok) {
        // 🧠 Load as Blob
        const blob = await response.blob();
        
        // Create image from blob
        const img = new Image();
        const objectUrl = URL.createObjectURL(blob);
        
        img.onload = function() {
          // Create canvas to render the logo (completely hides source URL)
          const canvas = document.createElement('canvas');
          
          // 📉 Compress: Reduce canvas size for compression (quality vs size tradeoff)
          const maxDimension = 800; // Max width or height
          let canvasWidth = img.width;
          let canvasHeight = img.height;
          
          if (canvasWidth > maxDimension || canvasHeight > maxDimension) {
            const ratio = Math.min(maxDimension / canvasWidth, maxDimension / canvasHeight);
            canvasWidth = Math.floor(canvasWidth * ratio);
            canvasHeight = Math.floor(canvasHeight * ratio);
          }
          
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
          canvas.className = logo.className;
          canvas.setAttribute('data-protected-image', 'true');
          canvas.setAttribute('data-secure-loaded', 'true');
          canvas.setAttribute('draggable', 'false');
          canvas.setAttribute('alt', logo.alt || 'MSU-TCTO Logo');
          
          // Copy all data attributes and styles
          Array.from(logo.attributes).forEach(attr => {
            if (attr.name.startsWith('data-') || attr.name === 'alt') {
              canvas.setAttribute(attr.name, attr.value);
            }
          });
          
          // Copy computed styles
          const computedStyle = window.getComputedStyle(logo);
          canvas.style.cssText = logo.style.cssText;
          canvas.style.width = computedStyle.width || logo.width + 'px';
          canvas.style.height = computedStyle.height || logo.height + 'px';
          
          const ctx = canvas.getContext('2d');
          
          // 📉 Compress: Use lower quality rendering for compression
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'medium'; // Balance between quality and size
          
          // Draw the logo image
          ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
          
          // Apply device-specific styling
          const isMobile = isMobileDevice();
          if (isMobile) {
            canvas.style.setProperty('filter', 'blur(0.75px)', 'important');
            canvas.style.setProperty('-webkit-filter', 'blur(0.75px)', 'important');
            canvas.style.setProperty('-moz-filter', 'blur(0.75px)', 'important');
            canvas.style.setProperty('opacity', '0.95', 'important');
          } else {
            canvas.style.setProperty('opacity', '1', 'important');
            canvas.style.setProperty('filter', 'none', 'important');
          }
          
          // Replace img with canvas (source URL is now completely hidden)
          logo.parentNode.replaceChild(canvas, logo);
          
          // Clean up object URL
          URL.revokeObjectURL(objectUrl);
        };
        
        img.onerror = function() {
          // If loading fails, hide the logo
          logo.style.display = 'none';
          URL.revokeObjectURL(objectUrl);
        };
        
        img.src = objectUrl;
      } else {
        // If fetch fails, hide the logo
        logo.style.display = 'none';
      }
    } catch (error) {
      // Silent fail - hide logo on error
      try {
        logo.style.display = 'none';
        logo.style.visibility = 'hidden';
      } catch (e) {
        // Ignore
      }
    }
  }

  /**
   * Initialize logo with visibility based on device type
   * Desktop: Fully clear (100% opacity, no blur)
   * Mobile/Tablet: 3% blur for security (95% opacity)
   * Blur will increase when screenshot is detected
   * Uses secure loading to hide from DevTools
   */
  function initializeLogoVisibility() {
    const logos = document.querySelectorAll('img[src*="Official MSU-TCTO logo-01.png"], img[src*="/api/protected-logo"]');
    const isMobile = isMobileDevice();
    
    logos.forEach(logo => {
      // Skip if already a canvas (secure loaded)
      if (logo.tagName === 'CANVAS') {
        return;
      }
      
      // Check if already securely loaded
      if (logo.getAttribute('data-secure-loaded') === 'true') {
        return;
      }
      
      // For protected logo endpoint, always load securely via canvas
      if (logo.src.includes('/api/protected-logo') || logo.getAttribute('src') === '/api/protected-logo') {
        // Set a placeholder first
        logo.style.opacity = '0';
        logo.style.transition = 'opacity 0.3s ease';
        
        // Load securely via canvas (completely hides source URL)
        loadLogoSecurely(logo);
      } else {
        // For direct image paths, apply styling normally
        if (isMobile) {
          // Mobile/Tablet: Apply 3% blur for security (shows logo details with minimal blur effect)
          logo.style.setProperty('filter', 'blur(0.75px)', 'important'); // 3% blur (0.75px of 25px)
          logo.style.setProperty('-webkit-filter', 'blur(0.75px)', 'important');
          logo.style.setProperty('-moz-filter', 'blur(0.75px)', 'important');
          logo.style.setProperty('opacity', '0.95', 'important'); // 95% opacity - shows logo details clearly
          logo.style.setProperty('transition', 'opacity 0.3s ease, filter 0.3s ease', 'important');
          logo.style.setProperty('will-change', 'opacity, filter', 'important');
          logo.classList.add('mobile-protected'); // Add class for CSS targeting
          
          // Mobile optimizations
          logo.style.setProperty('-webkit-backface-visibility', 'hidden', 'important');
          logo.style.setProperty('backface-visibility', 'hidden', 'important');
          logo.style.setProperty('transform', 'translateZ(0)', 'important');
          logo.style.setProperty('-webkit-transform', 'translateZ(0)', 'important');
        } else {
          // Desktop: Logo is fully visible by default (no blur, 100% opacity)
          // Blur will only be applied when screenshot is detected
          logo.style.setProperty('opacity', '1', 'important'); // 100% opacity - fully visible
          logo.style.setProperty('filter', 'none', 'important'); // No blur by default
          logo.style.setProperty('-webkit-filter', 'none', 'important');
          logo.style.setProperty('-moz-filter', 'none', 'important');
          logo.style.setProperty('transition', 'opacity 0.3s ease, filter 0.3s ease', 'important');
          logo.style.setProperty('will-change', 'opacity, filter', 'important');
          
          // Performance optimizations
          logo.style.setProperty('-webkit-backface-visibility', 'hidden', 'important');
          logo.style.setProperty('backface-visibility', 'hidden', 'important');
          logo.style.setProperty('transform', 'translateZ(0)', 'important');
          logo.style.setProperty('-webkit-transform', 'translateZ(0)', 'important');
        }
          }
        });
      }

  /**
   * Proactive protection - periodically make logos black to catch screenshots
   * This helps catch Print Screen which happens too fast to detect
   */
  /**
   * Proactive protection - DISABLED to prevent blinking
   * Logo will only blur when screenshot is actually detected, not continuously
   */
  function proactiveLogoProtection() {
    // DISABLED - No continuous blinking/blurring
    // Logo will only blur when screenshot is actually detected through:
    // 1. Keyboard shortcuts (Print Screen, Win+Shift+S)
    // 2. Window blur/focus events
    // 3. Canvas capture detection
    // 4. Mouse selection detection
    // 5. Touch gesture detection (mobile)
    return;
  }

  /**
   * Proactive full-screen protection DISABLED for mobile usability
   * Hardware buttons (Volume + Power) cannot be detected directly
   * We rely on detection methods (visibility changes, blur events, touch gestures) instead
   * The aggressive blur was making the mobile page unusable, so it's been removed
   */
  function proactiveFullScreenProtection() {
    // DISABLED - Was causing mobile page to be unusable due to constant blurring
    // Protection is still active through:
    // 1. Logo protection (proactiveLogoProtection)
    // 2. Visibility change detection (monitorVisibility)
    // 3. Touch gesture detection (monitorMobileTouchEvents)
    // 4. Orientation change detection
    return;
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

    // Detect toDataURL calls (used by many screenshot tools) - BLOCK SCREENSHOTS
    HTMLCanvasElement.prototype.toDataURL = function(...args) {
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true); // Auto-disable on canvas capture
      showProtectionOverlay();
      showWarningMessage('Canvas capture detected. Protection auto-enabled.');
      
      if (config.enableConsoleWarnings) {
        console.warn('%c🛡️ SCREENSHOT BLOCKED', 'color: #dc2626; font-size: 14px; font-weight: bold;');
      }
      
      setTimeout(() => hideProtectionOverlay(), 4000);
      
      // Return blank/black canvas data to prevent screenshot
      try {
        const blankCanvas = document.createElement('canvas');
        blankCanvas.width = this.width || 1;
        blankCanvas.height = this.height || 1;
        const ctx = blankCanvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, blankCanvas.width, blankCanvas.height);
        return blankCanvas.toDataURL(...args);
      } catch (e) {
        return originalToDataURL.apply(this, args);
      }
    };

    // Detect getImageData calls - BLOCK screenshot data extraction
    CanvasRenderingContext2D.prototype.getImageData = function(...args) {
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true); // Auto-disable on image data extraction
      showProtectionOverlay();
      showWarningMessage('Image capture detected. Protection auto-enabled.');
      
      if (config.enableConsoleWarnings) {
        console.warn('%c🛡️ SCREENSHOT BLOCKED', 'color: #dc2626; font-size: 14px; font-weight: bold;');
      }
      
      setTimeout(() => hideProtectionOverlay(), 4000);
      
      // Return blank image data to prevent screenshot extraction
      try {
        const sx = args[0] || 0;
        const sy = args[1] || 0;
        const sw = args[2] || this.canvas.width || 1;
        const sh = args[3] || this.canvas.height || 1;
        const imageData = this.createImageData(sw, sh);
        // Fill with black pixels
        for (let i = 0; i < imageData.data.length; i += 4) {
          imageData.data[i] = 0;     // R
          imageData.data[i + 1] = 0; // G
          imageData.data[i + 2] = 0; // B
          imageData.data[i + 3] = 255; // A
        }
        return imageData;
      } catch (e) {
        return originalGetImageData.apply(this, args);
      }
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
   * Professional CSS for logo protection with reduced visibility
   * Optimized for mobile performance
   */
  function applyLogoBlackoutCSS() {
    const style = document.createElement('style');
    style.id = 'logo-blackout-styles';
    style.textContent = `
      /* Global text selection disabled for enhanced protection */
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      
      /* Allow text selection for input fields and textareas */
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      
      /* Logo is fully visible by default (no blur, clear) */
      /* Blur will only be applied when screenshot is detected */
      /* Supports both img and canvas elements (secure loaded) */
      img[src*="Official MSU-TCTO logo-01.png"],
      img[src*="/api/protected-logo"],
      canvas[data-protected-image="true"],
      canvas[data-secure-loaded="true"] {
        position: relative;
        opacity: 1 !important; /* 100% opacity - fully visible */
        filter: none !important; /* No blur by default */
        -webkit-filter: none !important;
        -moz-filter: none !important;
        will-change: filter, opacity;
        pointer-events: auto;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      
      /* Strong blur ONLY when screenshot is detected (class added dynamically) */
      /* By default, logo has no blur - this only applies when class is added */
      img[src*="Official MSU-TCTO logo-01.png"].screenshot-protected-black,
      img[src*="/api/protected-logo"].screenshot-protected-black,
      canvas[data-protected-image="true"].screenshot-protected-black,
      canvas[data-secure-loaded="true"].screenshot-protected-black {
        filter: blur(${config.logoBlurOnDetection}) !important;
        -webkit-filter: blur(${config.logoBlurOnDetection}) !important;
        -moz-filter: blur(${config.logoBlurOnDetection}) !important;
        -ms-filter: blur(${config.logoBlurOnDetection}) !important;
        transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        -webkit-transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        opacity: 0.3 !important;
        display: block !important;
      }
      
      /* When screenshot is detected, keep it blurred */
      img[src*="Official MSU-TCTO logo-01.png"].screenshot-detected,
      img[src*="/api/protected-logo"].screenshot-detected,
      canvas[data-protected-image="true"].screenshot-detected,
      canvas[data-secure-loaded="true"].screenshot-detected {
        filter: blur(${config.logoBlurOnDetection}) !important;
        -webkit-filter: blur(${config.logoBlurOnDetection}) !important;
        opacity: 0.25 !important;
      }
      
      /* Watermark overlay for protected logos */
      .logo-watermark-overlay {
        position: absolute !important;
        inset: 0 !important;
        background-image: repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 16px, transparent 16px, transparent 32px) !important;
        mix-blend-mode: multiply !important;
        opacity: 0.65 !important;
        pointer-events: none !important;
      }
      
      /* Mobile-specific: 3% blur for security (shows logo details with minimal blur effect) */
      /* Blur will increase to full blur when screenshot is detected */
      @media (max-width: 768px) {
        img[src*="Official MSU-TCTO logo-01.png"],
        img[src*="/api/protected-logo"],
        canvas[data-protected-image="true"],
        canvas[data-secure-loaded="true"] {
          filter: blur(0.75px) !important; /* 3% blur for mobile security - shows details clearly */
          -webkit-filter: blur(0.75px) !important;
          -moz-filter: blur(0.75px) !important;
          opacity: 0.95 !important; /* 95% opacity - shows logo details clearly */
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: filter, opacity;
        }
        
        /* When screenshot is detected on mobile, increase blur */
        img[src*="Official MSU-TCTO logo-01.png"].screenshot-protected-black,
        img[src*="/api/protected-logo"].screenshot-protected-black,
        canvas[data-protected-image="true"].screenshot-protected-black,
        canvas[data-secure-loaded="true"].screenshot-protected-black {
          filter: blur(${config.logoBlurOnDetection}) !important; /* Full blur on detection */
          -webkit-filter: blur(${config.logoBlurOnDetection}) !important;
          -moz-filter: blur(${config.logoBlurOnDetection}) !important;
          opacity: 0.2 !important; /* Further reduce on detection */
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        img[src*="Official MSU-TCTO logo-01.png"].screenshot-detected,
        img[src*="/api/protected-logo"].screenshot-detected,
        canvas[data-protected-image="true"].screenshot-detected,
        canvas[data-secure-loaded="true"].screenshot-detected {
          filter: blur(${config.logoBlurOnDetection}) !important; /* Full blur on detection */
          -webkit-filter: blur(${config.logoBlurOnDetection}) !important;
          opacity: 0.2 !important;
        }
      }
      
      /* Tablet-specific: 3% blur for security (shows logo details with minimal blur effect) */
      /* Blur will increase to full blur when screenshot is detected */
      @media (min-width: 769px) and (max-width: 1024px) {
        img[src*="Official MSU-TCTO logo-01.png"],
        img[src*="/api/protected-logo"],
        canvas[data-protected-image="true"],
        canvas[data-secure-loaded="true"] {
          filter: blur(0.75px) !important; /* 3% blur for tablet security - shows details clearly */
          -webkit-filter: blur(0.75px) !important;
          -moz-filter: blur(0.75px) !important;
          opacity: 0.95 !important; /* 95% opacity - shows logo details clearly */
        }
      }
      
      /* Performance optimization - use GPU acceleration */
      @supports (transform: translateZ(0)) {
        img[src*="Official MSU-TCTO logo-01.png"],
      img[src*="/api/protected-logo"] {
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
        makeLogosBlack(config.autoDisableDuration, true); // Auto-disable on multi-touch
        showProtectionOverlay();
        showWarningMessage('Screenshot gesture detected. Protection auto-enabled.');
        setTimeout(() => hideProtectionOverlay(), 3000);
      }
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - touchStartTime;
      // Very quick touch/release might indicate screenshot button press
      if (touchDuration < 200 && touchCount >= 2) {
        screenshotAttempts++;
        makeLogosBlack(config.autoDisableDuration, true); // Auto-disable on quick multi-touch
        showProtectionOverlay();
        showWarningMessage('Screenshot gesture detected. Protection auto-enabled.');
        setTimeout(() => hideProtectionOverlay(), 3000);
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
      // Make logos black immediately and auto-disable
      makeLogosBlack(config.autoDisableDuration, true);
      showProtectionOverlay();
      showWarningMessage('Screenshot detected. Logo auto-blurred.');
      screenshotAttempts++;
      setTimeout(() => hideProtectionOverlay(), 4000);
    }
  }
  
  /**
   * Enhanced detection for screenshot tools
   * Monitors for common screenshot tool behaviors
   */
  function enhancedScreenshotToolDetection() {
    // Monitor for window focus changes (snipping tool often causes this)
    let lastFocusTime = Date.now();
    let focusChangeCount = 0;
    
    window.addEventListener('focus', () => {
      const timeSinceLastFocus = Date.now() - lastFocusTime;
      focusChangeCount++;
      
      // Rapid focus changes might indicate screenshot tool usage
      if (timeSinceLastFocus < 500 && focusChangeCount > 2) {
        makeLogosBlack(config.autoDisableDuration, true);
        showWarningMessage('Screenshot tool activity detected. Logo auto-blurred.');
        focusChangeCount = 0;
      }
      
      lastFocusTime = Date.now();
    });
    
    // Monitor for mouse movements that might indicate screenshot selection
    let mouseDownTime = 0;
    let mouseDownX = 0;
    let mouseDownY = 0;
    
    document.addEventListener('mousedown', (e) => {
      mouseDownTime = Date.now();
      mouseDownX = e.clientX;
      mouseDownY = e.clientY;
    }, true);
    
    document.addEventListener('mouseup', (e) => {
      if (mouseDownTime > 0) {
        const mouseDuration = Date.now() - mouseDownTime;
        const mouseDistance = Math.sqrt(
          Math.pow(e.clientX - mouseDownX, 2) + 
          Math.pow(e.clientY - mouseDownY, 2)
        );
        
        // If user drags mouse (like selecting area for snipping tool), blur logo
        if (mouseDistance > 50 && mouseDuration > 100 && mouseDuration < 2000) {
          makeLogosBlack(config.autoDisableDuration, true);
          showWarningMessage('Selection detected. Logo auto-blurred.');
        }
        
        mouseDownTime = 0;
      }
    }, true);
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

    // Copy/Cut/Paste blocking - Enhanced (allow in input fields)
    document.addEventListener('copy', (e) => {
      // Allow copy in input fields, textareas, and contenteditable elements
      const target = e.target || e.srcElement;
      if (target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.contentEditable === 'true' ||
        target.isContentEditable ||
        (target.closest && (target.closest('input') || target.closest('textarea') || target.closest('[contenteditable="true"]')))
      )) {
        // Allow copy in input fields
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      showWarningMessage('Copying is disabled. Protection auto-enabled.');
      return false;
    }, true);

    document.addEventListener('cut', (e) => {
      // Allow cut in input fields, textareas, and contenteditable elements
      const target = e.target || e.srcElement;
      if (target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.contentEditable === 'true' ||
        target.isContentEditable ||
        (target.closest && (target.closest('input') || target.closest('textarea') || target.closest('[contenteditable="true"]')))
      )) {
        // Allow cut in input fields
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      screenshotAttempts++;
      makeLogosBlack(config.autoDisableDuration, true);
      showWarningMessage('Cutting is disabled. Protection auto-enabled.');
      return false;
    }, true);

    document.addEventListener('paste', (e) => {
      // Allow paste in input fields, textareas, and contenteditable elements
      const target = e.target || e.srcElement;
      if (target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.contentEditable === 'true' ||
        target.isContentEditable ||
        (target.closest && (target.closest('input') || target.closest('textarea') || target.closest('[contenteditable="true"]')))
      )) {
        // Allow paste in input fields
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      showWarningMessage('Pasting is disabled.');
      return false;
    }, true);

    // Prevent text selection globally (except in input fields)
    document.addEventListener('selectstart', (e) => {
      // Allow selection in input fields, textareas, and contenteditable elements
      const target = e.target || e.srcElement;
      if (target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.contentEditable === 'true' ||
        target.isContentEditable ||
        (target.closest && (target.closest('input') || target.closest('textarea') || target.closest('[contenteditable="true"]')))
      )) {
        // Allow selection in input fields
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);

    // Prevent drag and drop
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);

    document.addEventListener('drag', (e) => {
      e.preventDefault();
      e.stopPropagation();
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

    // Initialize logo with reduced visibility (make it less prominent)
    initializeLogoVisibility();

    // Proactive protection ENABLED - Optimized for both desktop and mobile
    // This continuously blurs the logo to catch screenshots
    proactiveLogoProtection();
    
    // Enhanced screenshot tool detection (desktop)
    if (!isMobile) {
      enhancedScreenshotToolDetection();
    }
    
    // Check auto-disable status periodically
    setInterval(() => {
      if (screenshotsDisabled && Date.now() >= disableUntil) {
        screenshotsDisabled = false;
        if (config.enableConsoleWarnings) {
          console.log('%c✅ Screenshot protection re-enabled', 'color: #10b981; font-size: 12px;');
        }
      }
    }, 1000);
    
    // Proactive full-screen protection for mobile hardware button screenshots (Volume + Power)
    // Since hardware buttons cannot be detected, we use aggressive periodic blackout
    proactiveFullScreenProtection();

    // Create protection overlay for full screen protection
    if (config.enableFullScreenProtection) {
      createProtectionOverlay();
    }

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
      console.log('%c🛡️ Professional Screenshot Protection Active', 'color: #10b981; font-size: 14px; font-weight: bold;');
      console.log('%cLogo visibility reduced. Auto-disable enabled on detection.', 'color: #6b7280; font-size: 12px;');
      if (isMobile) {
        console.log('%c📱 Mobile device detected - Logo has 3% blur for security (blur increases on screenshot detection)', 'color: #f59e0b; font-size: 12px;');
      }
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
    enable: () => { 
      isProtected = true; 
      screenshotsDisabled = false;
      disableUntil = 0;
    },
    disable: () => { 
      isProtected = false; 
      screenshotsDisabled = false;
      disableUntil = 0;
      hideProtectionOverlay();
    },
    showOverlay: showProtectionOverlay,
    hideOverlay: hideProtectionOverlay,
    getAttempts: () => screenshotAttempts,
    isAutoDisabled: () => screenshotsDisabled && Date.now() < disableUntil,
    getDisableTimeRemaining: () => Math.max(0, disableUntil - Date.now())
  };

})();

