import React, { useState, useEffect } from 'react';

const DataTableComponent = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null); // Track expanded row
  const itemsPerPage = 15;

  const filteredData = data.filter(bid =>
    bid.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const toggleDetails = (index) => {
    setExpandedRow(expandedRow === index ? null : index); // Toggle expanded row
  };

  return (
    <div className="overflow-x-auto">
      {/* Global Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for titles..."
          className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 text-gray-700 dark:text-yellow-300 text-lg border border-gray-300 dark:border-gray-600 focus:border-msu-deep-ocean dark:focus:border-yellow-400 focus:outline-none transition-colors duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table for Desktop */}
      <div className="hidden sm:block">
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-msu-deep-ocean dark:bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4">#</th>
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Contact Person</th>
              <th className="text-left py-3 px-4">Approved Budget</th>
              <th className="text-left py-3 px-4">Contact Number</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((bid, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-center text-msu-deep-ocean dark:text-yellow-300 border-b border-gray-200 dark:border-gray-600">
                <td className="border-t border-gray-200 dark:border-gray-600 px-4 py-3">{startIndex + index + 1}</td>
                <td className="border-t border-gray-200 dark:border-gray-600 px-4 py-3">{bid.title || 'N/A'}</td>
                <td className="border-t border-gray-200 dark:border-gray-600 px-4 py-3">{bid.contactPerson || 'N/A'}</td>
                <td className="border-t border-gray-200 dark:border-gray-600 px-4 py-3">{bid.price || 'N/A'}</td>
                <td className="border-t border-gray-200 dark:border-gray-600 px-4 py-3">{bid.number || 'N/A'}</td>
                <td className="border-t border-gray-200 dark:border-gray-600 px-4 py-3">{bid.email || 'N/A'}</td>
                <td className="border-t border-gray-200 dark:border-gray-600 px-4 py-3">
                  {bid.pdfUrl ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        className="view-pdf-btn inline-flex items-center justify-center bg-msu-main-color hover:bg-msu-deep-ocean dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-300 text-sm"
                        data-pdf-url={bid.pdfUrl}
                        data-title={bid.title}
                        onClick={() => window.openPdfViewer && window.openPdfViewer(bid.pdfUrl, bid.title)}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        View PDF
                      </button>
                      <a href={bid.pdfUrl} className="text-msu-maroon dark:text-yellow-400 underline hover:text-msu-gold dark:hover:text-yellow-300 text-sm" target="_blank" rel="noopener noreferrer">
                        Open
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-500 dark:text-yellow-300">No File</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col items-center sm:hidden mt-4">
        {paginatedData.map((bid, index) => (
          <div key={index} className="border-t border-gray-200 dark:border-gray-600 p-4 text-center w-full">
            <div className="flex flex-col items-center">
              <span className="font-semibold text-msu-deep-ocean dark:text-yellow-300">{bid.title || 'N/A'}</span>
              <button
                onClick={() => toggleDetails(index)}
                className="bg-blue-500 dark:bg-gray-700 text-white dark:text-yellow-300 rounded-lg px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-600 transition-all mt-2"
              >
                {expandedRow === index ? 'Hide Details' : 'View Details'}
              </button>
            </div>

            {/* Expanded Details */}
            {expandedRow === index && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2 text-left w-full">
                <p className="text-msu-deep-ocean dark:text-yellow-300"><strong>#:</strong> {startIndex + index + 1}</p>
                <p className="text-msu-deep-ocean dark:text-yellow-300"><strong>Contact Person:</strong> {bid.contactPerson || 'N/A'}</p>
                <p className="text-msu-deep-ocean dark:text-yellow-300"><strong>Approved Budget:</strong> {bid.price || 'N/A'}</p>
                <p className="text-msu-deep-ocean dark:text-yellow-300"><strong>Contact Number:</strong> {bid.number || 'N/A'}</p>
                <p className="text-msu-deep-ocean dark:text-yellow-300"><strong>Email:</strong> {bid.email || 'N/A'}</p>
                <p className="text-msu-deep-ocean dark:text-yellow-300">
                  <strong>File:</strong> {bid.pdfUrl ? (
                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        className="view-pdf-btn inline-flex items-center justify-center bg-msu-main-color hover:bg-msu-deep-ocean dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-300 text-sm w-full"
                        data-pdf-url={bid.pdfUrl}
                        data-title={bid.title}
                        onClick={() => window.openPdfViewer && window.openPdfViewer(bid.pdfUrl, bid.title)}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        View PDF
                      </button>
                      <a href={bid.pdfUrl} className="text-msu-maroon dark:text-yellow-400 underline hover:text-msu-gold dark:hover:text-yellow-300 text-sm text-center" target="_blank" rel="noopener noreferrer">
                        Open in New Tab
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-500 dark:text-yellow-300">No File</span>
                  )}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded-full ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-msu-main-color dark:bg-gray-700 text-white dark:text-yellow-300 hover:bg-msu-deep-ocean dark:hover:bg-gray-600'}`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 mx-1 rounded-full ${currentPage === i + 1 ? 'bg-msu-deep-ocean dark:bg-gray-600 text-white dark:text-yellow-300' : 'bg-gray-300 dark:bg-gray-700 hover:bg-msu-main-color dark:hover:bg-gray-600 hover:text-white dark:hover:text-yellow-300'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded-full ${currentPage === totalPages ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-msu-main-color dark:bg-gray-700 text-white dark:text-yellow-300 hover:bg-msu-main-color dark:hover:bg-gray-600'}`}
        >
          Next
        </button>
      </div>

      {/* Mobile Pagination (Bottom) */}
      <div className="sm:hidden flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded-full ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-500 dark:bg-gray-700 text-white dark:text-yellow-300 hover:bg-blue-700 dark:hover:bg-gray-600'}`}
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded-full ${currentPage === totalPages ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-500 dark:bg-gray-700 text-white dark:text-yellow-300 hover:bg-blue-700 dark:hover:bg-gray-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTableComponent;