import React, { useEffect, useState } from 'react';
import { getFacultyAndStaff } from '../api/api';
import UniversityLogo from '../MSUseal.png';

const FacultyAndStaff = () => {
  // University color scheme
  const colors = {
    primary: '#1a365d',
    secondary: '#2c5282',
    accent: '#d69e2e',
    light: '#f8f9fa',
    dark: '#212529',
    muted: '#6c757d'
  };

  // Department tabs configuration
  const tabs = [
    { 
      id: 0, 
      label: 'IICT', 
      title: 'Institute of Information and Communications Technology',
      key: 'IICT',
      icon: '💻',
      description: 'Technology innovators and digital transformation leaders'
    },
    { 
      id: 1, 
      label: 'CAS', 
      title: 'College of Arts and Sciences',
      key: 'CAS',
      icon: '🎨',
      description: 'Experts in humanities, social sciences, and natural sciences'
    },
    { 
      id: 2, 
      label: 'COF', 
      title: 'College of Fisheries',
      key: 'COF',
      icon: '🐟',
      description: 'Marine biologists and aquaculture specialists'
    },
    { 
      id: 3, 
      label: 'COED', 
      title: 'College of Education',
      key: 'COED',
      icon: '📚',
      description: 'Educational theorists and teaching professionals'
    },
    { 
      id: 4, 
      label: 'IOES', 
      title: 'Institute of Environmental Science',
      key: 'IOES',
      icon: '🌿',
      description: 'Environmental researchers and conservationists'
    },
    { 
      id: 5, 
      label: 'CIAS', 
      title: 'College of Islamic and Arabic Studies',
      key: 'CIAS',
      icon: '🕌',
      description: 'Scholars of Islamic culture and Arabic language'
    },
    { 
      id: 6, 
      label: 'ADMIN', 
      title: 'Administrative and Support Staff',
      key: 'ADMIN',
      icon: '👔',
      description: 'Dedicated professionals supporting our academic mission'
    }
  ];

  // State management
  const [facultyStaffData, setFacultyStaffData] = useState(
    Object.fromEntries(tabs.map(tab => [tab.key, []]))
  );
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSearchResults, setGlobalSearchResults] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  // Fetch data for all departments
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const departmentData = await Promise.all(
          tabs.map(async tab => {
            try {
              const data = await getFacultyAndStaff(tab.key);
              return { key: tab.key, data: Array.isArray(data) ? data : [] };
            } catch (error) {
              console.error(`Error fetching ${tab.key} data:`, error);
              return { key: tab.key, data: [] };
            }
          })
        );
        
        const newData = {};
        departmentData.forEach(({key, data}) => {
          newData[key] = data;
        });
        
        setFacultyStaffData(newData);
      } catch (error) {
        console.error("Global fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle window resize for responsive pagination
  useEffect(() => {
    const handleResize = () => {
      setPerPage(window.innerWidth < 1280 ? 6 : 12);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setGlobalSearchResults([]);
    } else {
      const allFaculty = Object.values(facultyStaffData).flat();
      const results = allFaculty.filter(member =>
        [member.name, member.teachingLevel, member.advisory]
          .filter(Boolean)
          .some(field => field.toLowerCase().includes(query.toLowerCase()))
      );
      setGlobalSearchResults(results);
    }
    setCurrentPage(1);
  };

  // Get current department data
  const currentDepartment = tabs[activeTab].key;
  const currentData = searchQuery ? globalSearchResults : facultyStaffData[currentDepartment] || [];
  const totalPages = Math.ceil(currentData.length / perPage);
  const paginatedData = currentData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Loading component
  const LoadingIndicator = () => (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center backdrop-filter backdrop-blur-sm">
      <div className="text-center animate-pulse">
        <div className="relative w-24 h-24 mb-6 mx-auto">
          <img 
            src="/images/MSU Seal New (Official).png" 
            alt="University Seal" 
            className="w-full h-full object-contain opacity-90"
          />
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Faculty Directory</h3>
        <p className="text-sm text-gray-500">Curating academic excellence...</p>
      </div>
    </div>
  );

  // Faculty card component
  const FacultyCard = ({ member }) => (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 cursor-pointer"
      onClick={() => setSelectedPerson(member)}
    >
      <div className="p-6 flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
          <img
            src={member.image?.asset?.url || '/default-avatar.jpg'}
            className="relative h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
            alt={member.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-avatar.jpg';
            }}
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {member.name}
          </h3>
          <p className="text-sm text-blue-600 mb-1">{member.teachingLevel}</p>
          <p className="text-xs text-gray-500 line-clamp-2">{member.advisory}</p>
        </div>
      </div>
    </div>
  );

  // Faculty modal component
  const FacultyModal = ({ person, onClose }) => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-6 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-lg text-blue-600 mt-1">
                      {person.teachingLevel}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={person.image?.asset?.url || '/default-avatar.jpg'}
                      className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md"
                      alt={person.name}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    {person.advisory && (
                      <div>
                        <h4 className="font-semibold text-gray-900">Advisory Role</h4>
                        <p className="text-gray-700">{person.advisory}</p>
                      </div>
                    )}
                    
                    {person.educations?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900">Education</h4>
                        <ul className="list-disc list-inside text-gray-700">
                          {person.educations.map((edu, idx) => (
                            <li key={idx}>{edu.title}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {person.email && (
                      <div>
                        <h4 className="font-semibold text-gray-900">Contact</h4>
                        <a
                          href={`mailto:${person.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {person.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-50">
      {isLoading && <LoadingIndicator />}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-msu-deep-ocean to-msu-main-color py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Faculty & Staff Directory
            </h1>
            <p className="text-xl text-blue-100">
              Meet our distinguished academic professionals
            </p>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, department, or expertise..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-blue-700 rounded-lg bg-blue-800 bg-opacity-50 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Department Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <nav className="flex space-x-1 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-msu-main-color text-white border-b-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {searchQuery 
              ? `Search Results (${globalSearchResults.length})` 
              : tabs[activeTab].title}
          </h2>
          <p className="text-gray-600">
            {tabs[activeTab].description}
          </p>
        </div>

        {/* Faculty Grid */}
        {paginatedData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedData.map((member, index) => (
                <FacultyCard key={index} member={member} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && !searchQuery && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6">
                <div className="mb-4 sm:mb-0">
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 border rounded-md text-sm font-medium ${
                            currentPage === pageNum
                              ? 'bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="px-4 py-2 text-gray-500">...</span>
                    )}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50"
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {searchQuery ? 'No matching faculty found' : 'No faculty members in this department'}
            </h3>
            <p className="mt-2 text-gray-500">
              {searchQuery
                ? 'Try adjusting your search criteria'
                : 'Please check back later for updates'}
            </p>
          </div>
        )}
      </div>

      {/* Faculty Modal */}
      {selectedPerson && (
        <FacultyModal 
          person={selectedPerson} 
          onClose={() => setSelectedPerson(null)} 
        />
      )}
    </div>
  );
};

export default FacultyAndStaff;