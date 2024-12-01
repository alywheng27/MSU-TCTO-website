// BiddingPage.jsx
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
    setCurrentPage(1);
  };

  const displayBidding = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredBidding.slice(start, end);
  };

  const totalPages = Math.ceil(filteredBidding.length / itemsPerPage);

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
                <td className="border-t px-4 py-3">{index + 1}</td>
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

      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-msu-maroon text-white rounded-lg hover:bg-msu-gold"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {currentPage}</span>
        <button
          className="px-4 py-2 bg-msu-maroon text-white rounded-lg hover:bg-msu-gold"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BiddingPage;
