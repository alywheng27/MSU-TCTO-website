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
  FaUsers,
  FaBookOpen
} from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { getNavbarItems } from '../config/navigation.js';

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
          {items.map((item, idx) => {
            const isExternal = item.link && (item.link.startsWith('http://') || item.link.startsWith('https://'));
            return (
              <li key={idx}>
                <a 
                  href={item.link} 
                  className="block px-4 py-3 text-white dark:text-gray-200 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-200 text-sm border-b border-gray-200 dark:border-gray-600 border-opacity-20"
                  onClick={() => closeMobileMenu()}
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
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

  // Keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchVisible(true);
        setTimeout(() => {
          const searchInput = document.getElementById('global-search-input');
          if (searchInput) {
            searchInput.focus();
          }
        }, 100);
      }
      // ESC to close search
      if (e.key === 'Escape' && isSearchVisible) {
        setIsSearchVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchVisible]);

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

  // Get navigation items from shared config
  const navConfig = getNavbarItems();
  
  // Icon mapping for navbar items
  const iconMap = {
    "Home": <FaHome className="text-lg" />,
    "University": <FaInfoCircle className="text-lg" />,
    "About": <FaInfoCircle className="text-lg" />,
    "Admissions": <FaUserGraduate className="text-lg" />,
    "Programs": <FaUniversity className="text-lg" />,
    "Offices": <FaUserTie className="text-lg" />,
    "Publications": <FaNewspaper className="text-lg" />,
    "Careers": <FaBriefcase className="text-lg" />,
    "Graduation": <FaGraduationCap className="text-lg" />,
    "Conference": <FaUsers className="text-lg" />,
    "Journal": <FaBookOpen className="text-lg" />,
  };

  // Transform config to navbar format
  const navItems = navConfig.map((section) => ({
    title: section.title === "University" ? "About" : section.title, // Map "University" to "About" for navbar
    icon: iconMap[section.title] || iconMap["Home"],
    items: section.links
      .filter(link => !link.footerOnly) // Filter out footer-only links (keep navbarOnly and regular links)
      .map(link => ({
        link: link.href,
        label: link.label
      }))
  }));

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
                src="/api/protected-logo" 
                alt="MSU-TCTO Logo" 
                className={`transition-all duration-300 ${scrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-16'} mr-3 sm:mr-4`}
                data-protected-image="true"
                draggable="false"
                style={{ 
                  userSelect: 'none', 
                  WebkitUserSelect: 'none', 
                  WebkitTouchCallout: 'none',
                  WebkitUserDrag: 'none'
                }}
              />
              <img 
                src="/images/TCTO Header - White.png" 
                alt="MSU-TCTO Wordmark" 
                className={`hidden sm:block transition-all duration-300 ${scrolled ? 'max-h-16 sm:max-h-20 md:max-h-24 lg:max-h-28' : 'max-h-20 sm:max-h-24 md:max-h-28 lg:max-h-32'} max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] w-auto h-auto object-contain`}
                draggable="false"
                style={{ 
                  userSelect: 'none', 
                  WebkitUserSelect: 'none', 
                  WebkitTouchCallout: 'none',
                  WebkitUserDrag: 'none'
                }}
              />
            </a>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleSearch}
                className="text-white dark:text-gray-200 hover:text-msu-gold dark:hover:text-yellow-400 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-300 p-2 rounded-full relative group"
                aria-label="Toggle search"
                title="Search (Ctrl+K or Cmd+K)"
              >
                <FaSearch className="text-lg" />
                <span className="absolute -bottom-1 -right-1 text-[8px] bg-msu-main-color dark:bg-yellow-600 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  K
                </span>
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
            isSearchVisible ? 'max-h-96 py-3' : 'max-h-0 py-0'
          }`}
        >
          <div className="container mx-auto px-4 xl:px-6">
            <div className="relative max-w-2xl mx-auto">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (url.trim()) {
                    window.location.href = `/search/${encodeURIComponent(url.trim())}`;
                  }
                }} 
                className="flex"
              >
                <div className="flex-grow relative">
                  <input 
                    type="search" 
                    id="global-search-input"
                    autoComplete="off" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && url.trim()) {
                        window.location.href = `/search/${encodeURIComponent(url.trim())}`;
                      }
                    }}
                    placeholder="Search articles, programs, faculty..." 
                    className="w-full px-4 py-2 pr-10 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-msu-main-color dark:focus:ring-yellow-400 focus:border-msu-main-color dark:focus:border-yellow-400"
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={() => setUrl("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                      aria-label="Clear search"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  )}
                </div>
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
              
              {/* Quick Search Suggestions */}
              {isSearchVisible && url.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {['Admissions', 'College of Education', 'Scholarships', 'Graduation', 'Faculty', 'Programs', 'News', 'Events'].map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setUrl(term);
                            setTimeout(() => {
                              window.location.href = `/search/${encodeURIComponent(term)}`;
                            }, 100);
                          }}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-msu-main-color hover:text-white dark:hover:bg-yellow-600 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
              src="/images/Official MSU-TCTO logo-01.png" 
              alt="MSU-TCTO Logo" 
              className="h-10 mr-3"
              data-protected-image="true"
              draggable="false"
              style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
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
          ? (isSearchVisible ? 'h-[180px] sm:h-[200px]' : 'h-[100px] sm:h-[110px]') 
          : (isSearchVisible ? 'h-[220px] sm:h-[240px]' : 'h-[140px] sm:h-[160px]')
      }`}></div>
    </>
  );
};

export default React.memo(Navbar);