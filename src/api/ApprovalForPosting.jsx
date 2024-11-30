import React, { useState, useEffect } from 'react';

const ApprovalForPosting = ({ bidding }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBidding, setFilteredBidding] = useState(bidding);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page

  // Function to filter and display items for the current page
  const displayBidding = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredBidding.slice(start, end);
  };

  useEffect(() => {
    // Filter bidding data based on search query
    setFilteredBidding(
      bidding.filter((bid) =>
        bid.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    setCurrentPage(1);  // Reset to first page when search query changes
  }, [searchQuery, bidding]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredBidding.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="bg-white-pure w-full xl:px-[12.5%] xs:px-[5%] py-[60px]">
        <h4 className="xl:h4 xs:h5 text-msu-maroon text-center font-semibold mb-6">
          Approval for Posting
        </h4>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for titles..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-msu-maroon focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
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
                      href={bid.file.asset.url}
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-msu-maroon text-white rounded-lg hover:bg-msu-gold"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {currentPage}</span>
          <button
            className="px-4 py-2 bg-msu-maroon text-white rounded-lg hover:bg-msu-gold"
            onClick={handleNextPage}
            disabled={currentPage >= Math.ceil(filteredBidding.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalForPosting;
