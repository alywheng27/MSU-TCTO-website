import React, { useState, useCallback, useEffect } from 'react';
import { 
  FaHome, 
  FaInfoCircle, 
  FaGraduationCap, 
  FaBook, 
  FaBriefcase, 
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaUserGraduate,
  FaUniversity,
  FaNewspaper,
  FaUserTie,
  FaBars
} from 'react-icons/fa';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const Dropdown = ({ title, items, icon, isMobile, activeDropdown, setActiveDropdown, index, closeMobileMenu }) => {
  const isActive = activeDropdown === index;
  
  return (
    <li className={`group relative ${isMobile ? 'border-b border-gray-200 border-opacity-20' : ''}`}>
      <a 
        href={items.length === 0 ? '#' : null} 
        className={`flex items-center justify-between px-4 py-3 transition-all duration-300 ${
          isActive ? 'text-msu-gold bg-msu-main-color bg-opacity-20' : 'text-white hover:text-msu-gold hover:bg-msu-main-color hover:bg-opacity-20'
        } ${isMobile ? 'text-lg' : 'text-base'}`}
        onClick={(e) => {
          if (isMobile && items.length > 0) {
            e.preventDefault();
            setActiveDropdown(isActive ? null : index);
          }
          if (items.length === 0 && isMobile) {
            closeMobileMenu();
          }
        }}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3 text-lg">{icon}</span>}
          <span className="font-medium">{title}</span>
        </div>
        {items.length > 0 && (
          isMobile ? (
            <FiChevronRight className={`transform transition-transform duration-300 ${isActive ? 'rotate-90 text-msu-gold' : 'text-gray-300'}`} />
          ) : (
            <FiChevronDown className={`ml-2 transition-all duration-300 ${isActive ? 'rotate-180 text-msu-gold' : 'text-gray-300 group-hover:rotate-180 group-hover:text-msu-gold'}`} />
          )
        )}
      </a>
      {items.length > 0 && (
        <ul 
          className={`${isMobile ? 
            `overflow-hidden transition-all duration-300 ${isActive ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'}` : 
            'absolute left-0 mt-0 w-64 bg-msu-deep-ocean shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-50 border border-msu-main-color'}`
          }
        >
          {items.map((item, idx) => (
            <li key={idx}>
              <a 
                href={item.link} 
                className={`block px-4 py-3 text-white hover:bg-msu-main-color hover:bg-opacity-20 transition-colors duration-200 text-sm ${
                  isMobile ? 'border-b border-gray-200 border-opacity-20' : ''
                }`}
                onClick={() => isMobile && closeMobileMenu()}
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

  const navItems = [
    {
      title: "Home",
      icon: <FaHome className="text-lg" />,
      items: [
        { link: "/", label: "Overview" },
        { link: "/officefeedback", label: "Office Feedback" },
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
        { link: "/programs/cias", label: "College of Islamic & Arabic Studies" },
        { link: "/404.astro", label: "College of Education" },
        { link: "/404.astro", label: "College of Fisheries" },
        { link: "/404.astro", label: "Institute of Information and Communication Technology" },
        { link: "/404.astro", label: "Institute of Oceanography and Environmental Science" },
        { link: "/404.astro", label: "College of Law" },
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
        { link: "/publications/articles", label: "Articles" },
        { link: "/publications/sulimbang", label: "Sulimbang" },
        { link: "/publications/gazette", label: "Gazettes" },
        { link: "/bidding", label: "Bidding" },
        { link: "/publications/annual-reports", label: "Annual Reports" },
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
    }
  ];

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg bg-msu-deep-ocean' : 'bg-msu-deep-ocean'}`}>
        {/* Top Contact Bar */}
        <div className={`w-full bg-msu-deep-ocean text-white transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'} hidden lg:block`}>
          <div className="container mx-auto px-4 xl:px-6 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <FaPhone className="text-white text-sm" />
                <span className="text-xs sm:text-sm">+63 909 982 6063</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-white mr-2 text-sm" />
                <a href="mailto:admissions@msutawi-tawi.edu.ph" className="text-xs sm:text-sm hover:text-msu-gold transition-colors duration-200">
                  admissions@msutawi-tawi.edu.ph
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://msutawitawiedu.sharepoint.com/sites/Tawitawi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-xs sm:text-sm hover:text-msu-gold transition-colors duration-200"
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
        <div className={`w-full bg-msu-deep-ocean text-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'} border-b border-msu-main-color border-opacity-30`}>
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

            {/* Hamburger Button - Always Visible */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleSearch}
                className="text-white hover:text-msu-gold hover:bg-msu-main-color hover:bg-opacity-20 transition-colors duration-300 p-2 rounded-full"
              >
                <FaSearch className="text-lg" />
              </button>
              <button 
                onClick={toggleNavbar} 
                className="hamburger-button text-white hover:text-msu-gold hover:bg-msu-main-color hover:bg-opacity-20 transition-colors duration-300 p-2 rounded-full"
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
          className={`w-full bg-msu-deep-ocean border-b border-msu-main-color border-opacity-30 transition-all duration-300 ease-in-out overflow-hidden ${
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
                  className="flex-grow px-4 py-2 text-gray-800 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-msu-main-color focus:border-msu-main-color"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-msu-main-color text-white px-4 py-2 hover:bg-msu-deep-ocean transition-colors duration-300 flex items-center"
                >
                  <FaSearch className="mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </button>
                <button 
                  type="button" 
                  onClick={toggleSearch}
                  className="ml-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-r-md hover:bg-gray-400 transition-colors duration-300"
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
        className={`sidebar-menu fixed top-0 right-0 h-full w-80 bg-msu-deep-ocean text-white transform transition-transform duration-300 ease-in-out z-50 shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-msu-main-color border-opacity-30">
          <div className="flex items-center">
            <img 
              src="/images/MSU Seal New (Official).png" 
              alt="MSU Seal" 
              className="h-10 mr-3" 
            />
            <div>
              <h3 className="font-bold text-lg">MSU-TCTO</h3>
              <p className="text-sm text-gray-300">Navigation Menu</p>
            </div>
          </div>
          <button 
            onClick={closeMobileMenu}
            className="text-white hover:text-msu-gold hover:bg-msu-main-color hover:bg-opacity-20 transition-colors duration-300 p-2 rounded-full"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item, index) => (
              <Dropdown
                key={index}
                title={item.title}
                icon={item.icon}
                items={item.items}
                isMobile={true}
                index={index}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                closeMobileMenu={closeMobileMenu}
              />
            ))}
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-msu-main-color border-opacity-30">
          <a 
            href="https://msutawitawiedu.sharepoint.com/sites/Tawitawi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-msu-main-color hover:bg-msu-deep-ocean text-white px-4 py-3 rounded text-center font-medium transition-colors duration-300 flex items-center justify-center text-sm"
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