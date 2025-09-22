import { useState, useEffect } from 'react';

const CoedNavbar = ({ path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
      if (JSON.parse(savedDarkMode)) {
        document.documentElement.classList.add('dark');
      }
    }

    // Enhanced scroll effect with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);

          // Update active section based on scroll position
          const sections = ['about', 'call-for-abstracts', 'speakers', 'program', 'registration', 'endorsement', 'venue', 'contact'];
          const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });

          if (currentSection) {
            setActiveSection(currentSection);
          } else if (window.scrollY < 300) {
            setActiveSection('home');
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navigation = [
    { name: 'Home', href: '#', id: 'home', current: activeSection === 'home' },
    { name: 'About ICIIE', href: '#about', id: 'about', current: activeSection === 'about' },
    { name: 'Call for Abstracts', href: '#call-for-abstracts', id: 'call-for-abstracts', current: activeSection === 'call-for-abstracts' },
    { name: 'Speakers', href: '#speakers', id: 'speakers', current: activeSection === 'speakers' },
    { name: 'Program', href: '#program', id: 'program', current: activeSection === 'program' },
    { name: 'Registration', href: '#registration', id: 'registration', current: activeSection === 'registration' },
    { name: 'Endorsement', href: '#endorsement', id: 'endorsement', current: activeSection === 'endorsement' },
    { name: 'The Venue', href: '#venue', id: 'venue', current: activeSection === 'venue' },
    { name: 'Contact Us', href: '#contact', id: 'contact', current: activeSection === 'contact' },
  ];

  const handleNavClick = (href, sectionId) => {
    if (href === '#') {
      // Scroll to top for Home link
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else if (href.startsWith('#')) {
      // Smooth scroll to section and immediately update active state
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    } else {
      // Navigate to page
      window.location.href = href;
      setActiveSection('home');
    }
    setIsOpen(false);
  };

  // Set background color based on dark mode
  const navBg = darkMode
    ? 'bg-[#181A20] border-b border-[#22242c]/60 shadow-2xl shadow-[#181A20]/10'
    : 'bg-[#FFFFFF] border-b border-[#0077B6]/30 shadow-2xl shadow-[#0077B6]/10';

  const mobileMenuBg = darkMode
    ? 'bg-[#181A20] border-t border-[#22242c]/60 shadow-2xl shadow-[#181A20]/10'
    : 'bg-[#FFFFFF] border-t border-[#0077B6]/30 shadow-2xl shadow-[#0077B6]/10';

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 lg:h-28">
          {/* Enhanced Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 group">
            <div className="flex-shrink-0 relative">
              <div className={`absolute -inset-1 ${darkMode ? 'bg-[#181A20]' : 'bg-[#FFFFFF]'} rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500`}></div>
              <div className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 ${darkMode ? 'bg-[#181A20]' : 'bg-[#FFFFFF]'} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-300 p-2 sm:p-3`}>
                <img
                  src="/images/iciie.png"
                  alt="ICIIE 2025 Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
                <div className={`absolute inset-0 ${darkMode ? 'bg-[#181A20]/10' : 'bg-white/10'} rounded-xl`}></div>
              </div>
            </div>
            {/* Desktop only - Conference title text */}
            <div className=" lg:block">
              <img
                src="/SPEAKERS ICIIE/logo/wordmark.png"
                alt="ICIIE 2025 Logo Text"
                className="h-15 xl:h-15 3xl:h-17 object-contain"
                loading="lazy"
              />
              {/* Close the div for the logo text */}
            </div>
          </div>
          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-2">
              {navigation.map((item, index) => (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => handleNavClick(item.href, item.id)}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out transform hover:scale-105 ${
                      item.current
                        ? 'bg-[#0077B6] text-white shadow-lg shadow-[#0077B6]/30 border border-[#0077B6]/20'
                        : darkMode
                          ? 'text-[#90cdf4] hover:bg-[#0077B6]/10 hover:text-[#90cdf4] hover:shadow-lg hover:shadow-[#0077B6]/20'
                          : 'text-[#0077B6] hover:bg-[#0077B6]/10 hover:text-[#0077B6] hover:shadow-lg hover:shadow-[#0077B6]/20'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {hoveredItem === index && !item.current && (
                      <div className="absolute inset-0 bg-[#0077B6]/10 rounded-xl backdrop-blur-sm border border-[#0077B6]/20 animate-pulse"></div>
                    )}
                    {item.current && (
                      <div className="absolute inset-0 bg-[#0077B6]/20 rounded-xl animate-pulse"></div>
                    )}
                  </button>
                  {item.current && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-3 h-3 bg-[#0077B6] rounded-full animate-bounce"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-[#0077B6] rounded-full animate-ping opacity-30"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Dark Mode Toggle */}
            <div className="relative">
              <button
                onClick={toggleDarkMode}
                className={`group relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'} hover:bg-[#0077B6]/10 hover:shadow-lg`}
                aria-label="Toggle dark mode"
              >
                <div className="absolute inset-0 bg-[#0077B6]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {darkMode ? (
                  <svg className="w-5 h-5 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 relative z-10 transform group-hover:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Back to Home Button */}
            <div className="relative">
              <button
                onClick={() => window.location.href = '/'}
                className={`group relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'} hover:bg-[#0077B6]/10 hover:shadow-lg`}
                aria-label="Back to home page"
                title="Back to Home Page"
              >
                <div className="absolute inset-0 bg-[#0077B6]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-5 h-5 relative z-10 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>

            {/* Enhanced Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden group relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'} hover:bg-[#0077B6]/10 hover:shadow-lg`}
              aria-label="Toggle mobile menu"
            >
              <div className="absolute inset-0 bg-[#0077B6]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                {isOpen ? (
                  <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className={`px-4 pt-4 pb-6 space-y-3 rounded-b-2xl ${mobileMenuBg}`}>
              {navigation.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`group relative block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                    item.current
                      ? 'bg-[#0077B6] text-white shadow-lg shadow-[#0077B6]/30 border border-[#0077B6]/20'
                      : darkMode
                        ? 'text-[#90cdf4] hover:bg-[#0077B6]/10 hover:text-[#90cdf4] hover:shadow-lg hover:shadow-[#0077B6]/20'
                        : 'text-[#0077B6] hover:bg-[#0077B6]/10 hover:text-[#0077B6] hover:shadow-lg hover:shadow-[#0077B6]/20'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="relative z-10">{item.name}</span>
                    <svg className={`w-4 h-4 transform transition-transform duration-300 ${item.current ? 'text-white rotate-90' : darkMode ? 'text-[#90cdf4] group-hover:text-[#90cdf4] group-hover:translate-x-1' : 'text-gray-400 group-hover:text-[#0077B6] group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  {!item.current && (
                    <div className="absolute inset-0 bg-[#0077B6]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                  {item.current && (
                    <div className="absolute inset-0 bg-[#0077B6]/20 rounded-xl animate-pulse"></div>
                  )}
                </button>
              ))}

              {/* Back to Home Button for Mobile */}
              <button
                onClick={() => window.location.href = '/'}
                className={`group relative block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 bg-[#61063B] text-white hover:bg-[#61063B]/90 hover:shadow-lg hover:shadow-[#61063B]/20`}
                style={{ animationDelay: `${navigation.length * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="relative z-10">Back to Home Page</span>
                  </div>
                  <svg className="w-4 h-4 transform transition-transform duration-300 text-white group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-[#61063B]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Enhanced Mobile Brand */}
              <div className={`pt-6 border-t ${darkMode ? 'border-[#22242c]/50' : 'border-[#0077B6]/50'} mt-6`}>
                <div className={`px-4 py-4 ${darkMode ? 'bg-[#22242c]/30 border border-[#22242c]/20' : 'bg-[#0077B6]/10 border border-[#0077B6]/20'} rounded-xl`}>
                  <div className={`text-xl font-black ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'} mb-3`}>
                    ICIIE 2025
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'} font-semibold leading-tight mb-2`}>
                    1st International Conference on Inclusive and Indigenous Education
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'} leading-tight`}>
                    Mindanao State University – Tawi-Tawi College of Technology and Oceanography
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CoedNavbar;
