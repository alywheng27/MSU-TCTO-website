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
  FaUserTie
} from 'react-icons/fa';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import HeroMainHeading from './HeroMainHeading';
import HeroAdmissionHeading from './HeroAdmissionHeading';
import HeroProgramHeading from './HeroProgramHeading';
import HeroCASHeading from './HeroCASHeading';
import HeroCIASHeading from './HeroCIASHeading';
import HeroCOEDHeading from './HeroCOEDHeading';
import HeroCOFHeading from './HeroCOFHeading';
import HeroIICTHeading from './HeroIICTHeading';
import HeroIOESHeading from './HeroIOESHeading';
import HeroPublicationHeading from './HeroPublicationHeading';
import HeroOfficeHeading from './HeroOfficeHeading';
import HeroCampusHeading from './HeroCampusHeading';

const Dropdown = ({ title, items, icon, isMobile, activeDropdown, setActiveDropdown, index }) => {
  const isActive = activeDropdown === index;
  
  return (
    <li className={`group relative ${isMobile ? 'py-3 border-b border-gray-200 border-opacity-10' : 'py-4'}`}>
      <a 
        href="#" 
        className={`flex items-center transition-all duration-300 ${isMobile ? 'justify-between px-4' : 'xl:justify-start'} ${
          isActive ? 'text-msu-gold' : 'text-white hover:text-msu-gold'
        }`}
        onClick={(e) => {
          if (isMobile) {
            e.preventDefault();
            setActiveDropdown(isActive ? null : index);
          }
        }}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3 text-lg">{icon}</span>}
          <span className="font-medium text-sm uppercase tracking-wider">{title}</span>
        </div>
        {isMobile ? (
          <FiChevronRight className={`transform transition-transform duration-300 ${isActive ? 'rotate-90 text-msu-gold' : 'text-gray-300'}`} />
        ) : (
          <FiChevronDown className={`ml-2 transition-all duration-300 ${isActive ? 'rotate-180 text-msu-gold' : 'text-gray-300 group-hover:rotate-180 group-hover:text-msu-gold'}`} />
        )}
      </a>
      <ul 
        className={`${isMobile ? 
          `pl-8 overflow-hidden transition-all duration-300 ${isActive ? 'max-h-screen py-2' : 'max-h-0'}` : 
          'absolute left-0 mt-0 w-56 bg-msu-deep-ocean shadow-xl rounded-md py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-50 border-t-2 border-msu-gold'}`
        }
      >
        {items.map((item, idx) => (
          <li key={idx}>
            <a 
              href={item.link} 
              className={`block px-4 py-3 text-white hover:bg-msu-main-color transition-colors duration-200 text-sm ${
                isMobile ? 'border-b border-gray-200 border-opacity-10' : ''
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
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

  const getBackgroundClass = (path) => {
    const backgroundClasses = {
      '/admissions/admissions': 'hero-admission-img xl:h-[440px] xs:h-[164px]',
      '/programs': 'hero-program-img xl:h-[440px] xs:h-[164px]',
      '/cas': 'hero-cas-img xl:h-[440px] xs:h-[164px]',
      '/cias': 'hero-cias-img',
      '/coed': 'hero-coed-img',
      '/cof': 'hero-cof-img',
      '/iict': 'hero-iict-img',
      '/ioes': 'hero-ioes-img',
      '/offices/offices': 'hero-office-img xl:h-[440px] xs:h-[164px]',
      '/publications': 'hero-publication-img xl:h-[440px] xs:h-[220px]',
      '/about/campus': 'hero-campus-img xl:h-[440px] xs:h-[220px]',
      '/articles': 'hero-main-img xl:h-[980px] xs:h-[770px]',
      '/annual-reports': 'hero-main-img xl:h-[980px] xs:h-[770px]',
      '/gazette': 'hero-main-img xl:h-[980px] xs:h-[770px]',
      '/careers': 'hero-admission-img xl:h-[440px] xs:h-[164px]',
      '/application': 'hero-admission-img xl:h-[440px] xs:h-[164px]',
    };
    return backgroundClasses[path] || '';
  };

  const getComponent = (path) => {
    const components = {
      '/admissions/admissions': <HeroAdmissionHeading />,
      '/programs': <HeroProgramHeading />,
      '/cas': <HeroCASHeading />,
      '/cias': <HeroCIASHeading />,
      '/coed': <HeroCOEDHeading />,
      '/cof': <HeroCOFHeading />,
      '/iict': <HeroIICTHeading />,
      '/ioes': <HeroIOESHeading />,
      '/offices/offices': <HeroOfficeHeading />,
      '/publications': <HeroPublicationHeading />,
      '/about/campus': <HeroCampusHeading />,
    };
    return components[path] || null;
  };

  const bg = getBackgroundClass(path);
  const component = getComponent(path);

  const navItems = [
    {
      title: "Home",
      icon: <FaHome className="text-lg" />,
      items: [
        { link: "/", label: "Overview" },
        { link: "/404.astro", label: "Office Feedback" },
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
        { link: "/404.astro", label: "College of Arts and Sciences" },
        { link: "/404.astro", label: "College of Islamic & Arabic Studies" },
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
    }
  ];

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
        {/* Top Contact Bar */}
        <div className={`w-full bg-msu-deep-ocean text-white transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'} hidden md:block`}>
          <div className="container mx-auto px-4 xl:px-6 flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <FaPhone className="text-msu-bgc-color mr-2 text-sm" />
                <span className="text-xs sm:text-sm">+63 909 982 6063</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-msu-bgc-color mr-2 text-sm" />
                <a href="mailto:admissions@msutawi-tawi.edu.ph" className="text-xs sm:text-sm hover:text-msu-gold transition-colors duration-200">
                  admissions@msutawi-tawi.edu.ph
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <a 
                href="https://msutawitawiedu.sharepoint.com/sites/Tawitawi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-xs sm:text-sm hover:text-msu-gold transition-colors duration-200"
              >
                <span className="hidden lg:inline-block mr-1">SharePoint Portal</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4"
                >
                  <path d="M3.75 3h16.5a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 .75-.75zm4.94 4.28a.75.75 0 0 0-1.06-1.06L6 7.94 4.97 6.97a.75.75 0 0 0-1.06 1.06L4.94 9l-1.03 1.03a.75.75 0 1 0 1.06 1.06L6 10.06l1.03 1.03a.75.75 0 1 0 1.06-1.06L7.06 9l1.03-1.03a.75.75 0 0 0 0-1.06zm4.78 5.72a.75.75 0 1 1 1.5 0v5.25a.75.75 0 0 1-1.5 0v-5.25zm5.25-4.5a.75.75 0 1 0 0-1.5h-5.25a.75.75 0 0 0 0 1.5h5.25z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className={`w-full bg-msu-deep-ocean text-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
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
                  className={`transition-all duration-300 ${scrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-12'}`}
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-6">
              <ul className="flex space-x-1">
                {navItems.map((item, index) => (
                  <Dropdown
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    items={item.items}
                    isMobile={false}
                    index={index}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                ))}
              </ul>

              <div className="relative ml-4">
                <button 
                  onClick={toggleSearch}
                  className="text-white hover:text-msu-gold transition-colors duration-300 p-2 rounded-full hover:bg-msu-main-color"
                >
                  <FaSearch className="text-lg" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center space-x-3 sm:space-x-4">
              <button 
                onClick={toggleSearch}
                className="text-white hover:text-msu-gold transition-colors duration-300 p-2 rounded-full hover:bg-msu-main-color"
              >
                <FaSearch className="text-lg" />
              </button>
              <button 
                onClick={toggleNavbar} 
                className="text-white hover:text-msu-gold transition-colors duration-300 p-2 rounded-full hover:bg-msu-main-color"
                aria-label="Toggle navigation"
              >
                {isOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          className={`w-full bg-msu-deep-ocean transition-all duration-300 ease-in-out overflow-hidden ${
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
                  className="flex-grow px-4 py-2 text-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-msu-main-color"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-msu-main-color text-white px-4 py-2 hover:bg-msu-gold-dark transition-colors duration-300 flex items-center"
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

        {/* Mobile Navigation */}
        <div 
          className={`xl:hidden bg-msu-deep-ocean text-white overflow-y-auto transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[100vh] py-2' : 'max-h-0'
          }`}
        >
          <div className="container mx-auto px-4">
            <ul>
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
                />
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 border-opacity-10 px-4">
              <a 
                href="https://msutawitawiedu.sharepoint.com/sites/Tawitawi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-msu-main-color hover:bg-msu-gold-dark text-white px-4 py-3 rounded text-center font-medium transition-colors duration-300 flex items-center justify-center text-sm"
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
        </div>
      </div>

      {/* Spacer to account for fixed navbar */}
      <div className={`w-full transition-all duration-300 ${
        scrolled 
          ? (isSearchVisible ? 'h-[120px] sm:h-[140px]' : 'h-[80px] sm:h-[90px]') 
          : (isSearchVisible ? 'h-[160px] sm:h-[180px]' : 'h-[120px] sm:h-[140px]')
      }`}></div>
    </>
  );
};

export default React.memo(Navbar);