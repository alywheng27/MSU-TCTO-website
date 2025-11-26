import { useState, useEffect } from 'react';

const CoedNavbar = ({ path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
          const sections = ['about', 'call-for-abstracts', 'speakers', 'program', 'tepo-journal', 'registration', 'endorsement', 'venue', 'contact'];
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

  // Add custom scrollbar styles
  useEffect(() => {
    const styleId = 'coed-navbar-scrollbar-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .mobile-menu-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .mobile-menu-scroll::-webkit-scrollbar-track {
          background: ${darkMode ? '#181A20' : '#FFFFFF'};
          border-radius: 10px;
        }
        .mobile-menu-scroll::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#0077B6' : '#0077B6'};
          border-radius: 10px;
        }
        .mobile-menu-scroll::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#005a8a' : '#005a8a'};
        }
      `;
      document.head.appendChild(style);
    } else {
      // Update existing styles when dark mode changes
      const style = document.getElementById(styleId);
      style.textContent = `
        .mobile-menu-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .mobile-menu-scroll::-webkit-scrollbar-track {
          background: ${darkMode ? '#181A20' : '#FFFFFF'};
          border-radius: 10px;
        }
        .mobile-menu-scroll::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#0077B6' : '#0077B6'};
          border-radius: 10px;
        }
        .mobile-menu-scroll::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#005a8a' : '#005a8a'};
        }
      `;
    }
  }, [darkMode]);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle ESC key to close sidebar
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSidebarOpen]);

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
    { name: 'The TEPO Journal', href: '#tepo-journal', id: 'tepo-journal', current: activeSection === 'tepo-journal' },
    { name: 'Registration', href: '#registration', id: 'registration', current: activeSection === 'registration' },
    { name: 'Endorsement', href: '#endorsement', id: 'endorsement', current: activeSection === 'endorsement' },
    { name: 'The Venue', href: '#venue', id: 'venue', current: activeSection === 'venue' },
    { name: 'Contact Us', href: '#contact', id: 'contact', current: activeSection === 'contact' },
  ];

  const handleNavClick = (href, sectionId) => {
    // Close menus and restore body scroll first
    setIsOpen(false);
    setIsSidebarOpen(false);
    document.body.style.overflow = 'auto';
    
    // Small delay to ensure menus are closed before scrolling
    setTimeout(() => {
      if (href === '#') {
        // Scroll to top for Home link
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      } else if (href.startsWith('#')) {
        // Smooth scroll to section and immediately update active state
        const element = document.querySelector(href);
        if (element) {
          // Calculate offset for sticky navbar
          const navbarHeight = 120; // Approximate navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setActiveSection(sectionId);
        }
      } else {
        // Navigate to page
        window.location.href = href;
        setActiveSection('home');
      }
    }, 100);
  };

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    // Ensure body scroll is restored
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 50);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 nest-hub-nav-container">
        <div className="flex justify-between items-center h-24 lg:h-28 nest-hub-nav-inner">
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
            <div className="hidden lg:block">
              <img
                src="/SPEAKERS ICIIE/logo/wordmark.png"
                alt="ICIIE 2025 Logo Text"
                className="wordmark-logo h-10 lg:h-12 xl:h-14 2xl:h-16 object-contain transition-all duration-300"
                loading="lazy"
              />
              {/* Conference Dates */}
         
            </div>
          </div>

          {/* Enhanced Right Side Controls */}
          <div className="flex items-center space-x-3 nest-hub-nav-controls">
            {/* Desktop Sidebar Toggle Button */}
            <div className="relative hidden lg:block">
              <button
                onClick={toggleSidebar}
                className={`group relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'} hover:bg-[#0077B6]/10 hover:shadow-lg`}
                aria-label="Toggle sidebar menu"
                title="Menu"
              >
                <div className="absolute inset-0 bg-[#0077B6]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-5 h-5 relative z-10 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

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
              onClick={() => {
                const newState = !isOpen;
                setIsOpen(newState);
                if (newState) {
                  document.body.style.overflow = 'hidden';
                } else {
                  document.body.style.overflow = 'auto';
                }
              }}
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
            <div className={`px-4 pt-4 pb-6 space-y-3 rounded-b-2xl ${mobileMenuBg} max-h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden mobile-menu-scroll`} style={{ scrollbarWidth: 'thin', scrollbarColor: darkMode ? '#0077B6 #181A20' : '#0077B6 #FFFFFF' }}>
              {navigation.map((item, index) => (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => handleNavClick(item.href, item.id)}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out transform hover:scale-105 ${
                      item.current
                        ? 'bg-[#0077B6] text-white shadow-lg shadow-[#0077B6]/30 border border-[#0077B6]/20'
                        : darkMode
                          ? 'text-[#90cdf4] hover:bg-[#0077B6]/10 hover:text-[#90cdf4] hover:shadow-lg hover:shadow-[#0077B6]/20'
                          : 'text-[#0077B6] hover:bg-[#0077B6]/10 hover:text-[#0077B6] hover:shadow-lg hover:shadow-[#0077B6]/20'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
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

              {/* Back to Home Button for Mobile */}
              <button
                onClick={() => window.location.href = '/'}
                className={`group relative block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 bg-[#0077B6] text-white hover:bg-[#0077B6]/90 hover:shadow-lg hover:shadow-[#0077B6]/20`}
                style={{ animationDelay: `${(navigation.length + 1) * 50}ms` }}
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
                <div className="absolute inset-0 bg-[#0077B6]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Enhanced Mobile Brand */}
              <div className={`pt-6 border-t ${darkMode ? 'border-[#22242c]/50' : 'border-[#0077B6]/50'} mt-6`}>
                <div className={`px-4 py-4 ${darkMode ? 'bg-[#22242c]/30 border border-[#22242c]/20' : 'bg-[#0077B6]/10 border border-[#0077B6]/20'} rounded-xl`}>
                  <div className={`text-xl font-black ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'} mb-2`}>
                    ICIIE 2025
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'} font-bold mb-3`}>
                    November 26-28, 2025
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

      {/* Desktop Right Sidebar Menu */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:block hidden"
            onClick={closeSidebar}
          ></div>
          
          {/* Sidebar */}
          <div 
            className={`fixed top-0 right-0 h-full w-80 ${mobileMenuBg} shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:block hidden ${
              isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#0077B6]/30 dark:border-[#22242c]/50 flex-shrink-0">
                <div className="flex items-center">
                  <img 
                    src="/images/iciie.png" 
                    alt="ICIIE 2025 Logo" 
                    className="h-10 mr-3" 
                  />
                  <div>
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-[#90cdf4]' : 'text-[#0077B6]'}`}>ICIIE 2025</h3>
                    <p className={`text-xs ${darkMode ? 'text-[#90cdf4]/70' : 'text-[#0077B6]/70'}`}>Navigation Menu</p>
                  </div>
                </div>
                <button 
                  onClick={closeSidebar}
                  className={`p-2 rounded-xl transition-all duration-300 ${darkMode ? 'text-[#90cdf4] hover:bg-[#0077B6]/10' : 'text-[#0077B6] hover:bg-[#0077B6]/10'}`}
                  aria-label="Close sidebar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Sidebar Navigation - Scrollable Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden mobile-menu-scroll px-4 py-6 space-y-2" style={{ scrollbarWidth: 'thin', scrollbarColor: darkMode ? '#0077B6 #181A20' : '#0077B6 #FFFFFF' }}>
                {navigation.map((item, index) => (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() => handleNavClick(item.href, item.id)}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out transform hover:scale-105 ${
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

              {/* Sidebar Footer */}
              <div className={`p-6 border-t ${darkMode ? 'border-[#22242c]/50' : 'border-[#0077B6]/50'} flex-shrink-0`}>
                <button
                  onClick={() => window.location.href = '/'}
                  className={`group relative w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 bg-[#0077B6] text-white hover:bg-[#0077B6]/90 hover:shadow-lg hover:shadow-[#0077B6]/20`}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="relative z-10">Back to Home Page</span>
                  </div>
                  <div className="absolute inset-0 bg-[#0077B6]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default CoedNavbar;
