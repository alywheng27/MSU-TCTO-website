import React, { useState, useEffect } from 'react';
import PDFViewer from './PDFViewer';

const PDFViewerWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    const handleOpenPDFViewer = (event) => {
      console.log('PDFViewerWrapper received event:', event.detail);
      const { pdfUrl, title } = event.detail;
      
      // Debug the PDF URL
      console.log('PDF URL received:', pdfUrl);
      console.log('PDF URL type:', typeof pdfUrl);
      console.log('PDF URL length:', pdfUrl?.length);
      console.log('PDF URL includes http:', pdfUrl?.includes('http'));
      
      if (!pdfUrl || pdfUrl === '' || pdfUrl === '#') {
        console.error('Invalid PDF URL received:', pdfUrl);
        alert('PDF file not available for this publication.');
        return;
      }
      
      // Set the URL and title immediately
      setPdfUrl(pdfUrl);
      setTitle(title);
      setIsOpen(true);
      
      // Test if the URL is accessible in the background
      fetch(pdfUrl, { method: 'HEAD' })
        .then(response => {
          console.log('PDF URL fetch response:', response.status, response.ok);
          if (!response.ok) {
            console.error('PDF URL not accessible:', response.status);
            // Try fallback to original Sanity URL
            const originalUrl = pdfUrl.replace('https://cdn.sanity.io/files/w8lfrsa6/production/', '');
            if (originalUrl !== pdfUrl) {
              console.log('Trying fallback URL:', originalUrl);
              // Update the URL to try the original
              setPdfUrl(originalUrl);
            }
          }
        })
        .catch(error => {
          console.error('PDF URL fetch error:', error);
          // Try fallback to original Sanity URL
          const originalUrl = pdfUrl.replace('https://cdn.sanity.io/files/w8lfrsa6/production/', '');
          if (originalUrl !== pdfUrl) {
            console.log('Trying fallback URL:', originalUrl);
            // Update the URL to try the original
            setPdfUrl(originalUrl);
          }
        });
    };

    document.addEventListener('openPDFViewer', handleOpenPDFViewer);

    return () => {
      document.removeEventListener('openPDFViewer', handleOpenPDFViewer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setPdfUrl('');
    setTitle('');
  };

  return (
    <PDFViewer
      isOpen={isOpen}
      onClose={handleClose}
      pdfUrl={pdfUrl}
      title={title}
    />
  );
};

export default PDFViewerWrapper; 