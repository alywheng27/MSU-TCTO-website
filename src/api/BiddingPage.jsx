import React, { useState, useEffect } from 'react';

const BiddingPage = ({ bidding }) => {
  const [filteredBidding, setFilteredBidding] = useState(bidding);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setFilteredBidding(bidding);
  }, [bidding]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setFilteredBidding(
      bidding.filter((bid) => bid.title.toLowerCase().includes(searchQuery))
    );
    setCurrentPage(1); // Reset to the first page after search
  };

  const displayBidding = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredBidding.slice(start, end);
  };

  const totalPages = Math.ceil(filteredBidding.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Maximum page numbers to display at once
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if we're at the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Add "..." for pages before the startPage
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="ellipsis-start"
          className="px-4 py-2 bg-msu-maroon text-white rounded-lg cursor-default"
          disabled
        >
          ...
        </button>
      );
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-4 py-2 ${
            currentPage === i ? 'bg-msu-gold text-white' : 'bg-msu-maroon text-white'
          } rounded-lg hover:bg-msu-gold`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Add "..." for pages after the endPage
    if (endPage < totalPages) {
      pageNumbers.push(
        <button
          key="ellipsis-end"
          className="px-4 py-2 bg-msu-maroon text-white rounded-lg cursor-default"
          disabled
        >
          ...
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for titles..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-msu-maroon focus:border-transparent"
          onInput={handleSearch}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-msu-maroon text-white">
            <tr>
              <th className="text-left py-3 px-4">#</th>
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayBidding().map((bid, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors">
                <td className="border-t px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="border-t px-4 py-3">{bid.title}</td>
                <td className="border-t px-4 py-3">
                  <a
                    href={`${bid.file.asset.url}`}
                    className="text-msu-maroon underline hover:text-msu-gold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <button
          className={`px-4 py-2 ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-msu-maroon hover:bg-msu-gold'
          } text-white rounded-lg`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className={`px-4 py-2 ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-msu-maroon hover:bg-msu-gold'
          } text-white rounded-lg`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BiddingPage;