import React, { useState, useCallback, useEffect } from 'react';
import { 
  FaHome, 
  FaInfoCircle, 
  FaGraduationCap, 
  FaBriefcase, 
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaUserGraduate,
  FaUniversity,
  FaNewspaper,
  FaUserTie,
  FaBars,
  FaMoon,
  FaSun,
  FaUsers
} from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

const Dropdown = ({ title, items, icon, activeDropdown, setActiveDropdown, index, closeMobileMenu }) => {
  const isActive = activeDropdown === index;
  
  return (
    <li className="group relative border-b border-gray-200 dark:border-gray-600 border-opacity-20">
      <a 
        href={items.length === 0 ? '#' : null} 
        className={`flex items-center justify-between px-4 py-3 transition-all duration-300 text-lg ${
          isActive ? 'text-msu-gold dark:text-yellow-400 bg-msu-main-color dark:bg-gray-700 bg-opacity-20' : 'text-white dark:text-gray-200 hover:text-msu-gold dark:hover:text-yellow-400 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20'
        }`}
        onClick={(e) => {
          if (items.length > 0) {
            e.preventDefault();
            setActiveDropdown(isActive ? null : index);
          }
          if (items.length === 0) {
            closeMobileMenu();
          }
        }}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3 text-lg">{icon}</span>}
          <span className="font-medium">{title}</span>
        </div>
        {items.length > 0 && (
          <FiChevronRight className={`transform transition-transform duration-300 ${isActive ? 'rotate-90 text-msu-gold dark:text-yellow-400' : 'text-gray-300 dark:text-gray-400'}`} />
        )}
      </a>
      {items.length > 0 && (
        <ul 
          className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}
        >
          {items.map((item, idx) => (
            <li key={idx}>
              <a 
                href={item.link} 
                className="block px-4 py-3 text-white dark:text-gray-200 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-200 text-sm border-b border-gray-200 dark:border-gray-600 border-opacity-20"
                onClick={() => closeMobileMenu()}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Navbar = ({ path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleNavbar = useCallback(() => {
    setIsOpen((prev) => !prev);
    setActiveDropdown(null);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, []);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isOpen) setIsOpen(false);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('darkModeChanged', {
      detail: { isDarkMode: newDarkMode }
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sidebar-menu') && !event.target.closest('.hamburger-button')) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('darkModeChanged', {
      detail: { isDarkMode }
    }));
  }, [isDarkMode]);

  const navItems = [
    {
      title: "Home",
      icon: <FaHome className="text-lg" />,
      items: [
        { link: "/", label: "Overview" },
        { link: "/officefeedback", label: "Office & Student Survey" },
        { link: "/partners", label: "Local and International Partners" }
      ]
    },
    {
      title: "About",
      icon: <FaInfoCircle className="text-lg" />,
      items: [
        { link: "/about/campus", label: "Brief History" },
        { link: "/about/mission-vision", label: "Mission/Vision" },
        { link: "/about/university-hymn", label: "University Hymn" },
      ]
    },
    {
      title: "Admissions",
      icon: <FaUserGraduate className="text-lg" />,
      items: [
        { link: "/admissions/admissions", label: "Admission Procedures" },
        { link: "/admissions/scholarship-and-grants", label: "Scholarship and Grants" },
      ]
    },
    {
      title: "Programs",
      icon: <FaUniversity className="text-lg" />,
      items: [
        { link: "/programs/cas", label: "College of Arts and Sciences" },
        { link: "/programs/404", label: "College of Islamic & Arabic Studies" },
        { link: "/programs/coed", label: "College of Education" },
        { link: "/programs/404", label: "College of Fisheries" },
        { link: "/programs/ccs", label: "College of Computer Studies (CCS)" },
        { link: "/programs/ioes", label: "Institute of Oceanography and Environmental Science" },
        { link: "/programs/col", label: "College of Law" },
      ]
    },
    {
      title: "Offices",
      icon: <FaUserTie className="text-lg" />,
      items: [
        { link: "/offices/offices", label: "Administrative Offices" },
        { link: "/offices/academic-offices", label: "Academic Offices" },
        { link: "/offices/faculty-staff", label: "Faculty & Staff" },
      ]
    },
    {
      title: "Publications",
      icon: <FaNewspaper className="text-lg" />,
      items: [
        { link: "/publications/offices", label: "Offices & Resources" },
        { link: "/publications/articles", label: "Articles" },
        { link: "/publications/sulimbang", label: "Sulimbang" },
        { link: "/publications/gazette", label: "Gazettes" },
        { link: "/bidding", label: "Bidding" },
        { link: "/publications/annual-reports", label: "Annual Reports" },
        { link: "/underprocess", label: "KAWASA Publications" },
        // { link: "/publications/msutctoscopus", label: "Scopus" },
      ]
    },
    {
      title: "Careers",
      icon: <FaBriefcase className="text-lg" />,
      items: [
        { link: "/careers", label: "Open Positions" },
      ]
    },
    {
      title: "Graduation",
      icon: <FaGraduationCap className="text-lg" />,
      items: [
        { link: "/graduationphoto", label: "Graduation Photos" },
      ]
    },

    {
      title: "Conference",
      icon: <FaUsers className="text-lg" />,
      items: [
        // { link: "404", label: "ICIIE 2025", disabled: true },
        { link: "/iciie2025", label: "ICIIE 2025" },
      ]
    }
  ];

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg bg-msu-deep-ocean dark:bg-gray-800' : 'bg-msu-deep-ocean dark:bg-gray-900'}`}>
        {/* Top Contact Bar */}
        <div className={`w-full bg-msu-deep-ocean dark:bg-gray-800 text-white dark:text-gray-100 transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'} hidden lg:block`}>
          <div className="container mx-auto px-4 xl:px-6 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <FaPhone className="text-white dark:text-gray-300 text-sm" />
                <span className="text-xs sm:text-sm">+63 909 982 6063</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-white dark:text-gray-300 mr-2 text-sm" />
                <a href="mailto:admissions@msutawi-tawi.edu.ph" className="text-xs sm:text-sm hover:text-msu-gold dark:hover:text-yellow-400 transition-colors duration-200">
                  admissions@msutawi-tawi.edu.ph
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://msutawitawiedu.sharepoint.com/sites/Tawitawi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-xs sm:text-sm hover:text-msu-gold dark:hover:text-yellow-400 transition-colors duration-200"
              >
                <img 
                  src="https://dev-tcto.etpbx.com/Picture1-removebg-preview.png" 
                  alt="Logo" 
                  className="w-[80px] mr-2"
                />
                {/* <span>SharePoint Portal</span> */}
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className={`w-full bg-msu-deep-ocean dark:bg-gray-900 text-white dark:text-gray-100 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'} border-b border-msu-main-color dark:border-gray-700 border-opacity-30`}>
          <div className="container mx-auto px-4 xl:px-6 flex justify-between items-center">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src="/images/MSU Seal New (Official).png" 
                alt="MSU Seal" 
                className={`transition-all duration-300 ${scrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-16'} mr-3 sm:mr-4`} 
              />
              <div className='hidden sm:block'>
                <img
                  src="/images/TAWI-TAWI COLLEGE OF TECHNOLOGY AND OCEANOGRAPHY.png"
                  alt="MSU Logo"
                  className={`transition-all duration-300 ${scrolled ? 'h-9 sm:h-10' : 'h-10 sm:h-12'}`}
                />
              </div>
            </a>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleSearch}
                className="text-white dark:text-gray-200 hover:text-msu-gold dark:hover:text-yellow-400 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-300 p-2 rounded-full"
                aria-label="Toggle search"
              >
                <FaSearch className="text-lg" />
              </button>
              <button 
                onClick={toggleDarkMode}
                className="text-white dark:text-gray-200 hover:text-msu-gold dark:hover:text-yellow-400 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-300 p-2 rounded-full"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <FaSun className="text-lg" />
                ) : (
                  <FaMoon className="text-lg" />
                )}
              </button>
              <button 
                onClick={toggleNavbar} 
                className="hamburger-button text-white dark:text-gray-200 hover:text-msu-gold dark:hover:text-yellow-400 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-300 p-2 rounded-full"
                aria-label="Toggle navigation"
              >
                {isOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          className={`w-full bg-msu-deep-ocean dark:bg-gray-900 border-b border-msu-main-color dark:border-gray-700 border-opacity-30 transition-all duration-300 ease-in-out overflow-hidden ${
            isSearchVisible ? 'max-h-20 py-3' : 'max-h-0 py-0'
          }`}
        >
          <div className="container mx-auto px-4 xl:px-6">
            <div className="relative max-w-2xl mx-auto">
              <form action={`/search/${url}`} method="post" className="flex">
                <input 
                  type="search" 
                  autoComplete="off" 
                  onChange={(e) => setUrl(e.target.value)} 
                  placeholder="Search..." 
                  className="flex-grow px-4 py-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-msu-main-color dark:focus:ring-yellow-400 focus:border-msu-main-color dark:focus:border-yellow-400"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-msu-main-color dark:bg-yellow-600 text-white px-4 py-2 hover:bg-msu-deep-ocean dark:hover:bg-yellow-700 transition-colors duration-300 flex items-center"
                >
                  <FaSearch className="mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </button>
                <button 
                  type="button" 
                  onClick={toggleSearch}
                  className="ml-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300"
                >
                  <FaTimes />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div 
        className={`sidebar-menu fixed top-0 right-0 h-full w-80 bg-msu-deep-ocean dark:bg-gray-900 text-white dark:text-gray-100 transform transition-transform duration-300 ease-in-out z-50 shadow-2xl flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-msu-main-color dark:border-gray-700 border-opacity-30 flex-shrink-0">
          <div className="flex items-center">
            <img 
              src="/images/MSU Seal New (Official).png" 
              alt="MSU Seal" 
              className="h-10 mr-3" 
            />
            <div>
              <h3 className="font-bold text-lg">MSU-TCTO</h3>
              <p className="text-sm text-gray-300 dark:text-gray-400">Navigation Menu</p>
            </div>
          </div>
          <button 
            onClick={closeMobileMenu}
            className="text-white dark:text-gray-200 hover:text-msu-gold dark:hover:text-yellow-400 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-300 p-2 rounded-full"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Sidebar Navigation - Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="py-6">
            <ul className="space-y-2 px-4">
              {navItems.map((item, index) => (
                <Dropdown
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  items={item.items}
                  index={index}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  closeMobileMenu={closeMobileMenu}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar Footer - Always Visible */}
        <div className="p-6 border-t border-msu-main-color dark:border-gray-700 border-opacity-30 flex-shrink-0">
          <a 
            href="https://msutawitawiedu.sharepoint.com/sites/Tawitawi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-msu-main-color dark:bg-yellow-600 hover:bg-msu-deep-ocean dark:hover:bg-yellow-700 text-white px-4 py-3 rounded text-center font-medium transition-colors duration-300 flex items-center justify-center text-sm"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 mr-2"
            >
              <path d="M3.75 3h16.5a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 .75-.75zm4.94 4.28a.75.75 0 0 0-1.06-1.06L6 7.94 4.97 6.97a.75.75 0 0 0-1.06 1.06L4.94 9l-1.03 1.03a.75.75 0 1 0 1.06 1.06L6 10.06l1.03 1.03a.75.75 0 1 0 1.06-1.06L7.06 9l1.03-1.03a.75.75 0 0 0 0-1.06zm4.78 5.72a.75.75 0 1 1 1.5 0v5.25a.75.75 0 0 1-1.5 0v-5.25zm5.25-4.5a.75.75 0 1 0 0-1.5h-5.25a.75.75 0 0 0 0 1.5h5.25z" />
            </svg>
            SharePoint Portal
          </a>
        </div>
      </div>

      {/* Spacer to account for fixed navbar */}
      <div className={`w-full transition-all duration-300 ${
        scrolled 
          ? (isSearchVisible ? 'h-[140px] sm:h-[160px]' : 'h-[100px] sm:h-[110px]') 
          : (isSearchVisible ? 'h-[180px] sm:h-[200px]' : 'h-[140px] sm:h-[160px]')
      }`}></div>
    </>
  );
};

export default React.memo(Navbar);