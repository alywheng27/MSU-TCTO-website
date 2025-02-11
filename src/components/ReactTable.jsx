import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";

import Modal from '../components/modal'; // Import the Modal component

// Global search filter component
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <input
      value={globalFilter || ""}
      onChange={(e) => {
        console.log("Search input changed: ", e.target.value); // Debugging log
        setGlobalFilter(e.target.value || undefined);
      }}
      placeholder="Search all columns..."
      className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
    />
  );
}

export default function ReactTable({ data }) {
  const [selectedPerson, setSelectedPerson] = useState(null); // Track selected person for modal

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        Header: "Profile Picture",
        accessor: "profilePicture",
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Occupation",
        accessor: "occupation",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <button
            onClick={() => {
              console.log("Button clicked!"); // Debugging log
              setSelectedPerson(row.original);
              console.log("Selected Person: ", row.original); // Debugging log
            }}
            className="mt-2 p-2 bg-blue-600 text-white rounded-lg"
          >
            View Details
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Use `page` instead of `rows` for pagination
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
    state: { globalFilter, pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 6 }, // Set initial page size
    },
    useGlobalFilter,
    usePagination // Add usePagination hook
  );

  // Handle modal close
  const closeModal = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      {/* Global Search Filter */}
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      {/* Table Cards */}
      <div
        {...getTableBodyProps()}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {page.map((row) => { // Use `page` instead of `rows`
          prepareRow(row);
          return (
            <div className="bg-gray-800 shadow-md rounded-lg p-4" key={row.id}>
              {row.cells.map((cell) => (
                <div key={cell.column.id} className="mb-2">
                  <strong>{cell.column.render("Header")}: </strong>
                  {cell.render("Cell")}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="p-2 rounded-md border disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {pageIndex + 1}</span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="p-2 rounded-md border disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal for Viewing Details */}
      <Modal isOpen={!!selectedPerson} onClose={closeModal}>
        {selectedPerson && (
          <div>
            <h2 className="text-xl font-bold mb-4">Person Details</h2>
            <div className="mb-4">
              <strong>Name:</strong> {selectedPerson.name}
            </div>
            <div className="mb-4">
              <strong>Age:</strong> {selectedPerson.age}
            </div>
            <div className="mb-4">
              <strong>Occupation:</strong> {selectedPerson.occupation}
            </div>
            <div className="mb-4">
              <strong>Profile Picture:</strong>
              <img
                src={selectedPerson.profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
} 