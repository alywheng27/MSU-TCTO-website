import React, { useState, useEffect } from 'react';

const PDFViewer = ({ isOpen, onClose, pdfUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [iframeKey, setIframeKey] = useState(0);

  console.log('PDFViewer props:', { isOpen, pdfUrl, title });

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setErrorMessage('');
      setCurrentPage(1);
      setZoom(100);
      setIframeKey(prev => prev + 1); // Force iframe refresh
      
      // Set a timeout to prevent infinite loading
      const loadingTimeout = setTimeout(() => {
        if (isLoading) {
          console.log('PDF loading timeout reached');
          setIsLoading(false);
          setHasError(true);
          setErrorMessage('PDF failed to load. Please try opening in a new tab or downloading.');
        }
      }, 10000); // 10 second timeout

      return () => clearTimeout(loadingTimeout);
    }
  }, [isOpen, pdfUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title || 'document.pdf';
    link.click();
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  const handleFullScreen = () => {
    const container = document.getElementById('pdf-container');
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    }
  };

  const handleIframeLoad = () => {
    console.log('PDF iframe loaded successfully');
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    console.log('PDF iframe failed to load');
    setIsLoading(false);
    setHasError(true);
    setErrorMessage('PDF failed to load. Please try opening in a new tab or downloading.');
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleFitToWidth = () => {
    setZoom(100);
  };

  // Create a blob URL for the PDF to prevent auto-download
  const createPDFBlobUrl = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error creating blob URL:', error);
      return url; // Fallback to original URL
    }
  };

  const [blobUrl, setBlobUrl] = useState('');

  useEffect(() => {
    if (pdfUrl && isOpen) {
      createPDFBlobUrl(pdfUrl).then(url => {
        setBlobUrl(url);
      });
    }
    
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [pdfUrl, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm">
      {/* Main Container */}
      <div className="flex flex-col h-full">
        
        {/* Header - MSU-IIT Style */}
        <div className="bg-gray-900 text-white px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-lg font-semibold">{title || 'Document Viewer'}</h2>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-300">
                <span>Page {currentPage} of {totalPages}</span>
                <span>Zoom: {zoom}%</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleOpenInNewTab}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Open in New Tab"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Download"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* PDF Container */}
        <div id="pdf-container" className="flex-1 relative bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 font-medium">Loading document...</p>
              </div>
            </div>
          )}
          
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center space-y-6 p-8">
                <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load PDF</h3>
                  <p className="text-gray-600 mb-6">{errorMessage}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleOpenInNewTab}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Open in New Tab
                    </button>
                    <button
                      onClick={handleDownload}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!hasError && (
            <div className="h-full overflow-auto">
              {/* Try blob URL first, then fallback to original URL */}
              <iframe
                key={iframeKey}
                src={blobUrl || `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title={title}
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            </div>
          )}
        </div>

        {/* Control Bar - MSU-IIT Style */}
        <div className="bg-gray-900 text-white px-6 py-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Zoom Out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Zoom In"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>
              <button
                onClick={handleFitToWidth}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Fit to Width"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>

            {/* Center Controls */}
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>MSU-TCTO PDF Viewer</span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleFullScreen}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                title="Full Screen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer; 