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
  FaTimes
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
    <li className={`group relative ${isMobile ? 'py-3 border-b border-opacity-10' : 'py-[15px]'}`}>
      <a 
        href="#" 
        className={`flex items-center transition-colors duration-300 ${isMobile ? 'justify-between px-4' : 'xl:justify-start'} ${
          isActive ? 'text-msu-main-color' : 'text-white-pure hover:text-msu-main-color'
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
          <span className="font-medium">{title}</span>
        </div>
        {isMobile ? (
          <FiChevronRight className={`transform transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
        ) : (
          <FiChevronDown className="ml-2 transition-transform duration-300 group-hover:rotate-180" />
        )}
      </a>
      <ul 
        className={`${isMobile ? 
          `pl-8 overflow-hidden transition-all duration-300 ${isActive ? 'max-h-screen py-2' : 'max-h-0'}` : 
          'absolute left-0 mt-2 w-56 bg-msu-deep-ocean shadow-xl rounded-md py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-50'}`
        }
      >
        {items.map((item, idx) => (
          <li key={idx}>
            <a 
              href={item.link} 
              className={`block px-4 py-3 hover:bg-msu-main-color hover:text-white-pure transition-colors duration-200 ${
                idx === items.length - 1 ? '' : isMobile ? 'border-b border-opacity-10' : ''
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
    // Close mobile menu when search is opened
    if (isOpen) {
      setIsOpen(false);
    }
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
      icon: <FaHome />,
      items: [
        { link: "/", label: "Overview" },
        { link: "/404.astro", label: "Office Feedback" }
      ]
    },
    {
      title: "About",
      icon: <FaInfoCircle />,
      items: [
        { link: "/about/campus", label: "Brief History" },
        { link: "/about/mission-vision", label: "Mission/Vision" },
        { link: "/about/university-hymn", label: "University Hymn" },
      ]
    },
    {
      title: "Admissions",
      icon: <FaGraduationCap />,
      items: [
        { link: "/admissions/admissions", label: "Admission Procedures" },
        { link: "/admissions/scholarship-and-grants", label: "Scholarship and Grants" },
      ]
    },
    {
      title: "Programs",
      icon: <FaBook />,
      items: [
        // { link: "/404.astro", label: "Under Contstructions" },
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
      icon: <FaBriefcase />,
      items: [
        { link: "/offices/offices", label: "Administrative Offices" },
        { link: "/offices/academic-offices", label: "Academic Offices" },
        { link: "/offices/faculty-staff", label: "Faculty & Staff" },
      ]
    },
    {
      title: "Publications",
      icon: <FaBook />,
      items: [
        { link: "/publications/articles", label: "Articles" },
        { link: "/publications/sulimbang", label: "Sulimbang" },
        { link: "/publications/gazette", label: "Gazettes" },
        { link: "/bidding", label: "Bidding" },
        { link: "/publications/annual-reports", label: "Annual Reports" },
      ]
    },
    {
      title: "Job Opening",
      icon: <FaBriefcase />,
      items: [
        { link: "/careers", label: "Open Positions" },
      ]
    }
  ];

  return (
    <>
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
        {/* Top Bar */}
        <div className={`w-full bg-msu-deep-ocean text-white-pure transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'}`}>
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaPhone className="text-white mr-2" />
                <span className="text-sm  sm:block">+63 909 982 6063</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-white mr-2" />
                <a href="mailto:admissions@msutawi-tawi.edu.ph" className="text-sm  sm:block hover:text-msu-main-color transition-colors duration-200">
                  admissions@msutawi-tawi.edu.ph
                </a>
              </div>
            </div>
         <div className="flex items-center space-x-4">
<a 
  href="https://msutawitawiedu.sharepoint.com/sites/Tawitawi" 
  target="_blank" 
  rel="noopener noreferrer"
  className="p-0 m-0 bg-transparent hover:opacity-80 transition-opacity duration-300 hidden sm:flex items-center"
>
  <img 
    src="https://dev-tcto.etpbx.com/Picture1-removebg-preview.png" 
    alt="MSU Logo" 
    style={{ width: '100px' }} 
    className="block"
  />
</a>

    {/* <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-4 h-4 mr-2"
    >
      <path d="M3.75 3h16.5a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 .75-.75zm4.94 4.28a.75.75 0 0 0-1.06-1.06L6 7.94 4.97 6.97a.75.75 0 0 0-1.06 1.06L4.94 9l-1.03 1.03a.75.75 0 1 0 1.06 1.06L6 10.06l1.03 1.03a.75.75 0 1 0 1.06-1.06L7.06 9l1.03-1.03a.75.75 0 0 0 0-1.06zm4.78 5.72a.75.75 0 1 1 1.5 0v5.25a.75.75 0 0 1-1.5 0v-5.25zm5.25-4.5a.75.75 0 1 0 0-1.5h-5.25a.75.75 0 0 0 0 1.5h5.25z" />
    </svg>
    SharePoint */}
 
</div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className={`w-full bg-msu-deep-ocean text-white-pure transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src="/images/MSU Seal New (Official).png" 
                alt="MSU Seal" 
                className={`transition-all duration-300 ${scrolled ? 'h-12' : 'h-16'} mr-4`} 
              />
              <div className='xs:hidden xl:block'>
                <img
                  src="/images/TAWI-TAWI COLLEGE OF TECHNOLOGY AND OCEANOGRAPHY.png"
                  alt="MSU Logo"
                  className={`transition-all duration-300 ${scrolled ? 'h-9' : 'h-8'}`}
                />
                <p className={`text-white-pure opacity-80 transition-all duration-300 ${scrolled ? 'text-xs mt-1' : 'text-sm mt-1'} hidden lg:block`}>
                  {/* Tawi-Tawi College of Technology and Oceanography */}
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-8">
              <ul className="flex space-x-6">
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

              <div className="relative">
                <button 
                  onClick={toggleSearch}
                  className="text-white-pure hover:text-msu-main-color transition-colors duration-300"
                >
                  <FaSearch className="text-xl" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center space-x-4">
              <button 
                onClick={toggleSearch}
                className="text-white-pure hover:text-msu-main-color transition-colors duration-300"
              >
                <FaSearch className="text-xl" />
              </button>
              <button 
                onClick={toggleNavbar} 
                className="text-white-pure hover:text-msu-main-color transition-colors duration-300"
                aria-label="Toggle navigation"
              >
                {isOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar - Fixed below navbar */}
        <div 
          className={`w-full bg-msu-deep-ocean transition-all duration-300 ease-in-out ${
            isSearchVisible ? 'max-h-20 py-4' : 'max-h-0 py-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-4">
            <form action={`/search/${url}`} method="post" className="flex">
              <input 
                type="search" 
                autoComplete="off" 
                onChange={(e) => setUrl(e.target.value)} 
                placeholder="Search..." 
                className="flex-grow px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-msu-main-color text-white-pure px-4 py-2 rounded-r-md hover:bg-msu-main-color-dark transition-colors duration-300"
              >
                <FaSearch />
              </button>
              <button 
                type="button" 
                onClick={toggleSearch}
                className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
              >
                <FaTimes />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`xl:hidden bg-msu-deep-ocean text-white-pure overflow-y-auto transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[100vh] py-4' : 'max-h-0'
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
            <div className="mt-5 pt-5 border-t border-opacity-10 px-4">
              <a 
                href="https://msutawitawiedu.sharepoint.com/sites/Tawitawi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-msu-main-color hover:bg-msu-main-color-dark text-msu-deep-ocean px-4 py-3 rounded text-center font-medium transition-colors duration-300 flex items-center justify-center"
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
      <div className={`h-${scrolled ? (isSearchVisible ? '44' : '24') : (isSearchVisible ? '52' : '32')} w-full`}></div>
    </>
  );
};

export default React.memo(Navbar);