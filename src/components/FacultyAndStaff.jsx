import React, { useEffect, useState } from 'react';
import '../styles/css/facultyStaff.css';
import '../styles/css/animations.css'; // For custom animations
import { Link } from 'react-router-dom';
import { getFacultyAndStaff } from '../api/api';

const FacultyAndStaff = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(getInitialPerPage());
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSearchResults, setGlobalSearchResults] = useState([]);
  const [facultyStaffData, setFacultyStaffData] = useState({
    IICT: [],
    CAS: [],
    COF: [],
    COED: [],
    IOES: [],
    CIAS: [],
    ADMIN: [], // Added Staff Section
  });
  const [selectedPerson, setSelectedPerson] = useState(null);

  const tabs = [
    { tabId: '0', label: 'IICT', title: 'Institute of Information and Communications Technology', key: 'IICT' },
    { tabId: '1', label: 'CAS', title: 'College of Arts and Sciences', key: 'CAS' },
    { tabId: '2', label: 'COF', title: 'College of Fisheries', key: 'COF' },
    { tabId: '3', label: 'COED', title: 'College of Education', key: 'COED' },
    { tabId: '4', label: 'IOES', title: 'Institute of Environmental Science', key: 'IOES' },
    { tabId: '5', label: 'CIAS', title: 'College of Islamic and Arabic Studies', key: 'CIAS' },
    { tabId: '6', label: 'ADMIN', title: 'Administrative and Support Staff', key: 'ADMIN' }, // Added Staff Tab
  ];

  function getInitialPerPage() {
    return window.innerWidth < 1280 ? 6 : 12;
  }

  useEffect(() => {
    const handleResize = () => {
      setPerPage(getInitialPerPage());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchFacultyData = async () => {
      const data = await Promise.all(
        tabs.map((tab) => getFacultyAndStaff(tab.key).then((response) => ({ [tab.key]: response })))
      );
      const combinedData = data.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setFacultyStaffData(combinedData);
    };

    fetchFacultyData();
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    setCurrentPage(1); // Reset to the first page when switching tabs
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === '') {
      setGlobalSearchResults([]);
    } else {
      const allMembers = Object.values(facultyStaffData).flat();
      const filteredResults = allMembers.filter((member) =>
        [member.name, member.teachingLevel, member.advisory]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(query))
      );
      setGlobalSearchResults(filteredResults);
    }
    setCurrentPage(1); // Reset to the first page when searching
  };

  const currentTabKey = tabs[activeTab].key;
  const currentTabContent = globalSearchResults.length
    ? globalSearchResults
    : facultyStaffData[currentTabKey];
  const pageCount = Math.ceil(currentTabContent.length / perPage);
  const paginatedContent = currentTabContent.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const openModal = (person) => {
    setSelectedPerson(person);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="search-container my-6 flex justify-center">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search faculty and staff..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-10 text-black bg-gray-100 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all transform hover:scale-105 focus:scale-105 duration-300"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Updated Responsive Navigation Section */}
      <nav className={`container text-white-pure flex justify-center transition-all duration-300 `}>
  <div className={`tab-navigation inline-flex bg-gray-200 p-4 rounded-lg shadow-md overflow-x-auto `} role="group">
    {tabs.map((tab, index) => (
      <a
        key={index}
        href="#" // Replace with actual link or use `to` for React Router
        className={`px-4 py-2 md:px-6 md:py-4 text-sm md:text-lg font-semibold transition-all duration-300 ease-in-out transform focus:outline-none border border-gray-300 whitespace-nowrap
          ${index === 0
            ? 'rounded-l-lg' // Rounded left for the first button
            : index === tabs.length - 1
            ? 'rounded-r-lg' // Rounded right for the last button
            : 'rounded-none' // No rounding for middle buttons
          }
          ${index === activeTab
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' // Active tab style
            : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:shadow-xl hover:scale-105' // Inactive tab style
          }`}
        onClick={(e) => {
          e.preventDefault(); // Prevent default link behavior
          handleTabClick(index);
        }}
        aria-current={index === activeTab ? "page" : undefined} // Accessibility enhancement
      >
        {tab.label}
      </a>
    ))}
  </div>
</nav>

      <div className="tab-content text-white-pure">
        <h2 className="text-center font-semibold text-3xl mt-10 mb-6 animate-fade-in">
          {searchQuery && globalSearchResults.length ? 'Search Results' : tabs[activeTab].title}
        </h2>
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-8 mt-10">
          {paginatedContent.map((member, index) => (
            <div
              key={index}
              className="flex justify-start items-center bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300 animate-slide-in-up"
              onClick={() => openModal(member)}
            >
              <img
                src={member.image.asset.url}
                className="h-[160px] w-[160px] rounded-full border-4 border-blue-500"
                alt={member.name}
              />
              <div className="flex flex-col ml-4">
                <p
                  className="font-semibold text-xl"
                  dangerouslySetInnerHTML={{
                    __html: member.name.replace(
                      new RegExp(searchQuery, 'gi'),
                      (match) => `<mark class="bg-yellow-300">${match}</mark>`
                    ),
                  }}
                />
                <h2 className="text-gray-700 font-bold">{member.name}</h2>
                <p className="text-gray-700">{member.teachingLevel}</p>
                <p className="text-gray-500">{member.advisory}</p>
                <p className="text-gray-500">{member.yearStarted}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && !searchQuery && (
        <div className="pagination mt-6 flex flex-wrap justify-center gap-2">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              className={`pagination-indicator flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-sm md:text-base font-semibold rounded-xl transition-all duration-300 shadow-sm
                ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-110'
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {selectedPerson && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-4xl w-full shadow-xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-3xl text-gray-900">
                {selectedPerson.name}
              </h3>
              <button
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={closeModal}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <img
                src={selectedPerson.image?.asset?.url || '/placeholder.jpg'}
                alt={selectedPerson.name || 'Faculty member'}
                className="h-40 w-40 rounded-full border-4 border-blue-500 shadow-lg"
              />
              <p className="font-medium text-lg mt-4 text-gray-700">
                {selectedPerson.advisory || 'Teaching Level Unavailable'}
              </p>
            </div>

            <div className="space-y-6">
              {selectedPerson.teachingLevel && (
                <div className="flex items-start space-x-4 justify-center items-center z-50">
                  <span className="text-blue-500">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7v10m8-10v10m-12 4h16"
                      />
                    </svg> */}
                  </span>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">
                      Academic Rank and Department
                    </h4>
                    <p className="text-gray-700">{selectedPerson.teachingLevel}</p>
                  </div>
                </div>
              )}

            {selectedPerson.educations && (
              <div className="flex items-start space-x-4">
                <span className="text-green-500">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v8m0 4v.01M4 12h16"
                    />
                  </svg> */}
                </span>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">Educations</h4>
                  {/* Map over the educations array */}
                  {selectedPerson.educations.map((educations, index) => (
                    <p key={index} className="text-gray-700">
                      {educations.title} 
                    </p>
                  ))}
                </div>
              </div>
            )}

              {selectedPerson.email && (
                <div className="flex items-start space-x-4">
                  <span className="text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12H8m0 0l3.5 3.5M8 12l3.5-3.5"
                      />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">
                      Email   
                    </h4>
                    <a
                      href={`mailto:${selectedPerson.email}`}
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      {selectedPerson.email}
                    </a>
                  </div>
                </div>
              )}

                {selectedPerson.researchLink && (
                  <div className="flex items-start space-x-4 flex justify-center items-center z-50">
                    <span className="text-red-500">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.5 14L7 16.5m-2-2.5h2m12 0h-2M7 9.5l2.5 2m7-2l-2.5 2"
                        />
                      </svg> */}
                    </span>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">
                      
                      </h4>
                      <a
                        href={selectedPerson.researchLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        View More Info
                      </a>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyAndStaff;