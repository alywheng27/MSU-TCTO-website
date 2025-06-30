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
          className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 text-gray-700 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table for Desktop */}
      <div className="hidden sm:block">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-msu-deep-ocean text-white">
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
              <tr key={index} className="hover:bg-gray-100 transition-all text-center">
                <td className="border-t px-4 py-3">{startIndex + index + 1}</td>
                <td className="border-t px-4 py-3">{bid.title || 'N/A'}</td>
                <td className="border-t px-4 py-3">{bid.contactPerson || 'N/A'}</td>
                <td className="border-t px-4 py-3">{bid.price || 'N/A'}</td>
                <td className="border-t px-4 py-3">{bid.number || 'N/A'}</td>
                <td className="border-t px-4 py-3">{bid.email || 'N/A'}</td>
                <td className="border-t px-4 py-3">
                  {bid.file?.asset?.url ? (
                    <a href={bid.file.asset.url} className="text-msu-maroon underline hover:text-msu-gold" target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    'No File'
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
          <div key={index} className="border-t border-gray-200 p-4 text-center w-full">
            <div className="flex flex-col items-center">
              <span className="font-semibold">{bid.title || 'N/A'}</span>
              <button
                onClick={() => toggleDetails(index)}
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-all mt-2"
              >
                {expandedRow === index ? 'Hide Details' : 'View Details'}
              </button>
            </div>

            {/* Expanded Details */}
            {expandedRow === index && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2 text-left w-full">
                <p><strong>#:</strong> {startIndex + index + 1}</p>
                <p><strong>Contact Person:</strong> {bid.contactPerson || 'N/A'}</p>
                <p><strong>Approved Budget:</strong> {bid.price || 'N/A'}</p>
                <p><strong>Contact Number:</strong> {bid.number || 'N/A'}</p>
                <p><strong>Email:</strong> {bid.email || 'N/A'}</p>
                <p>
                  <strong>File:</strong> {bid.file?.asset?.url ? (
                    <a href={bid.file.asset.url} className="text-msu-maroon underline hover:text-msu-gold" target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  ) : (
                    'No File'
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
          className={`px-4 py-2 mx-1 rounded-full ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-msu-main-color text-white hover:bg-msu-deep-ocean'}`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 mx-1 rounded-full ${currentPage === i + 1 ? 'bg-msu-deep-ocean text-white' : 'bg-gray-300 hover:bg-msu-main-color hover:text-white'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded-full ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-msu-main-color text-white hover:bg-msu-main-color'}`}
        >
          Next
        </button>
      </div>

      {/* Mobile Pagination (Bottom) */}
      <div className="sm:hidden flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded-full ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded-full ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTableComponent;