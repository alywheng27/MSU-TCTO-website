import React, { useState, useCallback, useEffect } from 'react';
import { 
  FaHome, 
  FaInfoCircle, 
  FaGraduationCap, 
  FaBriefcase, 
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
  FaUserGraduate,
  FaUniversity,
  FaNewspaper,
  FaUserTie,
  FaBars,
  FaMoon,
  FaSun,
  FaUsers,
  FaBookOpen,
  FaCogs,
} from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { getNavbarItems } from '../config/navigation.js';

const Dropdown = ({ title, items, icon, activeDropdown, setActiveDropdown, index, closeMobileMenu }) => {
  const isActive = activeDropdown === index;
  
  return (
    <li className="group relative border-b border-white/[0.22]">
      <a 
        href="#" 
        className={`flex items-center justify-between px-4 py-3.5 min-h-[52px] transition-all duration-200 text-base sm:text-lg ${
          isActive
            ? 'text-msu-gold bg-white/15'
            : 'text-white hover:text-msu-gold hover:bg-white/10 active:bg-white/15'
        }`}
        onClick={(e) => {
          e.preventDefault();
          if (items.length > 0) {
            setActiveDropdown(isActive ? null : index);
          } else {
            closeMobileMenu();
          }
        }}
      >
        <div className="flex items-center min-w-0">
          {icon && <span className="mr-3 text-xl flex-shrink-0 text-white">{icon}</span>}
          <span className="font-semibold truncate">{title}</span>
        </div>
        {items.length > 0 && (
          <FiChevronRight className={`flex-shrink-0 w-6 h-6 transform transition-transform duration-300 ${isActive ? 'rotate-90 text-msu-gold' : 'text-white/85'}`} />
        )}
      </a>
      {items.length > 0 && (
        <ul 
          className={`overflow-hidden transition-all duration-300 bg-black/25 ${isActive ? 'max-h-[min(80vh,32rem)] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}
        >
          {items.map((item, idx) => {
            const isExternal = item.link && (item.link.startsWith('http://') || item.link.startsWith('https://'));
            return (
              <li key={idx}>
                <a 
                  href={item.link} 
                  className="block px-5 py-3 pl-14 text-[0.9375rem] leading-snug text-white/95 hover:bg-white/10 hover:text-white transition-colors duration-150 text-sm border-b border-white/[0.12]"
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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

  const openContactModal = useCallback((event) => {
    if (event) event.preventDefault();
    setIsContactModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

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
      if (e.key === 'Escape' && isContactModalOpen) {
        setIsContactModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchVisible, isContactModalOpen]);

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

  // Toggle body class so AI Summary and other fixed elements hide when nav menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-sidebar-open');
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('navSidebarOpened'));
    } else {
      document.body.classList.remove('nav-sidebar-open');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('nav-sidebar-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isContactModalOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    return undefined;
  }, [isContactModalOpen]);

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
    "Services": <FaCogs className="text-lg" />,
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

  const campusLocations = [
    {
      name: 'Main Campus',
      detail: 'Boheh Sallang, Sanga-Sanga, Bongao, Tawi-Tawi 7500'
    },
    {
      name: 'Manila Liaison Office',
      detail: 'Rm 203, Leticia Bldg., 1804 Taft Avenue corner J. Nakpil St., Malate, Manila'
    }
  ];

  const universityContacts = [
    { office: "Chancellor's Office", phone: '+63 917 310 7843', email: 'chancellor@msutcto.edu.ph' },
    { office: "Registrar's Office", phone: '+63 951 064 5611', email: 'registraroffice@msutcto.edu.ph' },
    { office: 'Admissions Office', phone: '0951 717 1690', email: 'admissions@msutcto.edu.ph' },
    { office: 'Guidance Office', phone: '+63 905 792 5924', email: 'guidanceoffice@msutcto.edu.ph' }
  ];

  const collegeContacts = [
    { college: 'College of Arts and Social Sciences (CASS)', email: 'cas@msutcto.edu.ph', phone: '+63 915 333 5294' },
    { college: 'College of Islamic Arts and Sciences (CIAS)', email: 'msutctocias@msutcto.edu.ph', phone: '+63 970 916 5267' },
    { college: 'College of Education (COED)', email: 'msutctocoed@msutcto.edu.ph', phone: 'Phone information available upon request' },
    { college: 'College of Computer Studies (CCS)', email: 'msutctoccs@msutawi-tawi.edu.ph', phone: '0920 969 9045' },
    { college: 'College of Fisheries, Oceanography, Environmental Science, and Technology (COFEST)', email: 'cofest@msutcto.edu.ph', phone: '+63 997 975 7616 / +63 917 159 1947' },
    { college: 'College of Law (COL)', email: 'law.tawitawicampus@msumain.edu.ph / mikeemaruhom@msutcto.edu.ph', phone: '+63 927 892 1411' }
  ];

  /* Layer order when open: page < top navbar < backdrop < drawer panel */
  const navChromeZ = isOpen ? 'z-[10049]' : 'z-50';
  const drawerBackdropZ = isOpen ? 'z-[10050]' : 'z-40';
  const drawerPanelZ = isOpen ? 'z-[10051]' : 'z-50';

  return (
    <>
      <div className={`fixed top-0 w-full transition-all duration-300 ${navChromeZ} ${scrolled ? 'shadow-lg bg-msu-deep-ocean dark:bg-gray-800' : 'bg-msu-deep-ocean dark:bg-gray-900'}`}>
        {/* Top Contact Bar */}
        <div className={`w-full bg-msu-deep-ocean dark:bg-gray-800 text-white dark:text-gray-100 transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'} hidden lg:block`}>
          <div className="container mx-auto px-4 xl:px-6 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="flex items-center gap-2 text-xs sm:text-sm text-white dark:text-gray-100 hover:text-msu-gold dark:hover:text-yellow-400 transition-colors duration-200 font-medium"
                aria-label="View contact information"
                onClick={openContactModal}
              >
                <FaEnvelope className="text-current text-sm flex-shrink-0" aria-hidden />
                <span>Contact Information</span>
              </a>
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
        <div className={`w-full bg-msu-deep-ocean dark:bg-gray-900 text-white dark:text-gray-100 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3 pro:py-4'} border-b border-msu-main-color dark:border-gray-700 border-opacity-30 safe-area-top`}>
          <div className="container mx-auto px-3 xs:px-4 pro:px-5 xl:px-6 flex justify-between items-center gap-2 min-w-0">
            {/* Logo */}
            <a href="/" className="flex items-center relative min-w-0 flex-shrink">
              <div
                aria-hidden="true"
                className="logo-watermark-overlay pointer-events-none"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 16px, transparent 16px, transparent 32px)',
                  mixBlendMode: 'multiply',
                  opacity: 0.65,
                  pointerEvents: 'none'
                }}
              />
              <img 
                src="/api/protected-logo" 
                alt="MSU-TCTO Logo" 
                className={`transition-all duration-300 flex-shrink-0 ${scrolled ? 'h-9 xs:h-10 sm:h-12' : 'h-10 xs:h-12 sm:h-16'} mr-2 xs:mr-3 sm:mr-4`}
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
                className={`hidden md:block transition-all duration-300 w-auto h-auto object-contain
                  ${scrolled 
                    ? 'max-h-20 md:max-h-24 lg:max-h-32 xl:max-h-36 max-w-[280px] md:max-w-[340px] lg:max-w-[480px] xl:max-w-[640px]' 
                    : 'max-h-24 md:max-h-28 lg:max-h-36 xl:max-h-40 max-w-[320px] md:max-w-[380px] lg:max-w-[520px] xl:max-w-[700px]'
                  }`}
                draggable="false"
                style={{ 
                  userSelect: 'none', 
                  WebkitUserSelect: 'none', 
                  WebkitTouchCallout: 'none',
                  WebkitUserDrag: 'none'
                }}
              />
            </a>

            {/* Action Buttons - 44px min on mobile (iPhone 12 Pro, etc.) for touch-friendly tap targets */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={toggleSearch}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 sm:w-9 sm:h-9 text-white dark:text-gray-200 hover:text-msu-gold dark:hover:text-yellow-400 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-300 rounded-full relative group shrink-0 touch-manipulation"
                aria-label="Toggle search"
                title="Search (Ctrl+K or Cmd+K)"
              >
                <FaSearch className="text-lg sm:text-base block flex-shrink-0" style={{ lineHeight: 0 }} />
                <span className="absolute -bottom-1 -right-1 text-[8px] bg-msu-main-color dark:bg-yellow-600 text-white px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  K
                </span>
              </button>
              <button 
                onClick={toggleDarkMode}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 sm:w-9 sm:h-9 text-white dark:text-gray-200 hover:text-msu-gold dark:hover:text-yellow-400 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-300 rounded-full shrink-0 touch-manipulation"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <FaSun className="text-lg sm:text-base block flex-shrink-0" style={{ lineHeight: 0 }} />
                ) : (
                  <FaMoon className="text-lg sm:text-base block flex-shrink-0" style={{ lineHeight: 0 }} />
                )}
              </button>
              <button 
                onClick={toggleNavbar}
                className="hamburger-button flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 sm:w-9 sm:h-9 text-white dark:text-gray-200 hover:text-msu-gold dark:hover:text-yellow-400 hover:bg-msu-main-color dark:hover:bg-gray-700 hover:bg-opacity-20 transition-colors duration-300 rounded-full shrink-0 touch-manipulation"
                aria-label="Toggle navigation"
              >
                {isOpen ? (
                  <FaTimes className="text-xl sm:text-lg block flex-shrink-0" style={{ lineHeight: 0 }} />
                ) : (
                  <FaBars className="text-xl sm:text-lg block flex-shrink-0" style={{ lineHeight: 0 }} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          className={`w-full bg-msu-deep-ocean dark:bg-gray-900 transition-all duration-300 ease-in-out overflow-hidden ${
            isSearchVisible
              ? 'border-b border-msu-main-color dark:border-gray-700 border-opacity-30 max-h-96 py-3'
              : 'border-b border-transparent max-h-0 py-0'
          }`}
        >
          <div className="container mx-auto px-3 xs:px-4 pro:px-5 xl:px-6">
            <div className="relative w-full max-w-2xl mx-auto min-w-0">
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
          className={`fixed inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 ${drawerBackdropZ}`}
          onClick={closeMobileMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Menu — solid brand panel (always burgundy #61063B) for clear contrast */}
      <div 
        aria-hidden={!isOpen}
        className={`sidebar-menu fixed top-0 right-0 h-full w-80 max-w-[min(100vw-2rem,20rem)] bg-msu-deep-ocean text-white border-l border-white/20 shadow-[-14px_0_40px_-6px_rgba(0,0,0,0.55)] transform transition-transform duration-300 ease-out flex flex-col ${drawerPanelZ} ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Quick actions row — mirrors common mobile drawer pattern */}
        <div className="flex-shrink-0 flex items-center justify-between gap-4 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 border-b border-white/25 bg-black/15">
          <button
            type="button"
            onClick={() => {
              toggleSearch();
            }}
            className="flex-1 flex items-center justify-center min-h-[44px] rounded-xl text-white hover:bg-white/15 active:bg-white/20 transition-colors touch-manipulation"
            aria-label="Toggle search"
          >
            <FaSearch className="text-xl" style={{ lineHeight: 0 }} />
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex-1 flex items-center justify-center min-h-[44px] rounded-xl text-white hover:bg-white/15 active:bg-white/20 transition-colors touch-manipulation"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <FaSun className="text-xl" style={{ lineHeight: 0 }} />
            ) : (
              <FaMoon className="text-xl" style={{ lineHeight: 0 }} />
            )}
          </button>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex-1 flex items-center justify-center min-h-[44px] rounded-xl text-white hover:bg-white/15 active:bg-white/20 transition-colors touch-manipulation"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" style={{ lineHeight: 0 }} />
          </button>
        </div>

        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20 flex-shrink-0 gap-3 bg-black/10">
          <div className="flex items-center min-w-0">
            <img 
              src="/images/Official MSU-TCTO logo-01.png" 
              alt="MSU-TCTO Logo" 
              className="h-10 mr-3 flex-shrink-0"
              data-protected-image="true"
              draggable="false"
              style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
            />
            <div className="min-w-0">
              <h3 className="font-bold text-lg text-white truncate">MSU-TCTO</h3>
              <p className="text-sm text-white/85">Navigation Menu</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation - Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain">
          <div className="py-2 pb-8">
            <ul className="px-2">
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
        <div className="p-4 sm:p-5 border-t border-white/25 bg-black/20 flex-shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a 
            href="https://msutawitawiedu.sharepoint.com/sites/Tawitawi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-msu-main-color hover:brightness-110 active:brightness-95 text-white px-4 py-3.5 rounded-lg text-center font-semibold transition-all duration-300 flex items-center justify-center text-sm shadow-lg shadow-black/30 border border-white/10"
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

      {isContactModalOpen && (
        <div className="fixed inset-0 z-[10060] flex items-start sm:items-center justify-center px-2 sm:px-4 lg:px-6 py-2 sm:py-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeContactModal}
            aria-label="Close contact modal backdrop"
          />
          <div className="relative w-full max-w-6xl h-[96vh] sm:h-auto sm:max-h-[92vh] overflow-y-auto rounded-xl sm:rounded-2xl border border-white/20 bg-gradient-to-br from-msu-deep-ocean via-msu-deep-ocean to-msu-main-color/95 text-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-white/15 bg-black/20 backdrop-blur">
              <div>
                <p className="text-[11px] sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white">MSU-TCTO Directory</p>
                <h2 className="text-lg sm:text-2xl font-bold leading-tight">Contact Information</h2>
              </div>
              <button
                type="button"
                onClick={closeContactModal}
                className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-colors shrink-0"
                aria-label="Close contact information modal"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-3 sm:p-5 lg:p-8 space-y-4 sm:space-y-6">
              <div className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-3 sm:p-5">
                <h3 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">Campus Locations</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {campusLocations.map((location) => (
                    <div key={location.name} className="rounded-lg bg-black/20 p-3 sm:p-4 border border-white/10">
                      <p className="text-sm sm:text-base font-semibold mb-2">{location.name}</p>
                      <p className="text-xs sm:text-sm text-white/85 flex gap-2 group leading-relaxed">
                        <span className="mt-0.5 shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors duration-300 group-hover:bg-[#61063B]">
                          <FaMapMarkerAlt className="text-xs text-[#61063B] group-hover:text-white transition-colors duration-300" />
                        </span>
                        <span>{location.detail}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-3 sm:p-5">
                <h3 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">University Offices</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {universityContacts.map((contact) => (
                    <div key={contact.office} className="rounded-lg bg-black/20 p-3 sm:p-4 border border-white/10">
                      <p className="text-sm sm:text-base font-semibold mb-3">{contact.office}</p>
                      <p className="text-xs sm:text-sm text-white/85 flex items-center gap-2 mb-2 group">
                        <span className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors duration-300 group-hover:bg-[#61063B]">
                          <FaPhone className="text-xs text-[#61063B] group-hover:text-white transition-colors duration-300" />
                        </span>
                        <span>{contact.phone}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-white/85 flex items-start gap-2 break-all group">
                        <span className="mt-0.5 shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors duration-300 group-hover:bg-[#61063B]">
                          <FaEnvelope className="text-xs text-[#61063B] group-hover:text-white transition-colors duration-300" />
                        </span>
                        <span>{contact.email}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg sm:rounded-xl border border-white/10 bg-white/5 p-3 sm:p-5">
                <h3 className="text-base sm:text-xl font-semibold mb-3 sm:mb-4">Colleges and Institutes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {collegeContacts.map((contact) => (
                    <div key={contact.college} className="rounded-lg bg-black/20 p-3 sm:p-4 border border-white/10">
                      <p className="text-sm sm:text-base font-semibold mb-3 leading-snug">{contact.college}</p>
                      <p className="text-xs sm:text-sm text-white/85 flex items-start gap-2 mb-2 break-all group">
                        <span className="mt-0.5 shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors duration-300 group-hover:bg-[#61063B]">
                          <FaEnvelope className="text-xs text-[#61063B] group-hover:text-white transition-colors duration-300" />
                        </span>
                        <span>{contact.email}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-white/85 flex items-center gap-2 group">
                        <span className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors duration-300 group-hover:bg-[#61063B]">
                          <FaPhone className="text-xs text-[#61063B] group-hover:text-white transition-colors duration-300" />
                        </span>
                        <span>{contact.phone}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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