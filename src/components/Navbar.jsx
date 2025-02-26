import React, { useState, useCallback } from 'react';
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

const Dropdown = ({ title, items }) => {
  return (
    <li className='py-[15px] dropdown dropdown-1'>
      <a href="#" className='flex xs:justify-center xl:justify-start'>
        {title} <img src="../../public/down-arrow2-svgrepo-com.svg" className='ml-2 float-right' width={16} alt="" />
      </a>
      <ul className={`mt-[15px] dropdown-menu lvl-one`}>
        {items.map((item, index) => (
          <li key={index} className={`py-[15px] px-5 ${index === items.length - 1 ? 'pt-[15px]' : ''}`}>
            <a href={item.link}>{item.label}</a>
          </li>
        ))}
      </ul>
    </li>
  );
};

const Navbar = ({ path }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const toggleNavbar = useCallback(() => {
    setIsOpen((prev) => !prev);
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

  return (
    <>
      <div className="sticky top-0 z-50">
        <div className="3xl:h-[100px] xl:h-[80px] xs:h-[60px] w-full bg-msu-deep-ocean text-white-pure flex justify-between items-center xl:px-[12.5%] xs:px-[3.85%] relative">
          <a href="#" className="flex items-center xl:py-0 xs:py-2">
            <img src="/images/MSU Seal New (Official).png" alt="" className="3xl:h-[72.99px] xs:h-[43.79px] mr-5" />
            <div>
              <h4 className="headings xl:h5 block xl:block xs:hidden">Mindanao State University</h4>
              <p className="paragraph xl:p2 block xl:block xs:hidden">Tawi-Tawi College of Technology and Oceanography</p>
            </div>
          </a>
          <div>
            <p className="paragraph xl:p2 xl:block xs:hidden pb-1">+63 909 982 6063</p>
            <p className="paragraph xl:p2 xl:block xs:hidden">admissions@msutawi-tawi.edu.ph</p>
            <button className="headings h5 xl:hidden xs:block" onClick={toggleNavbar} aria-label="Toggle navigation">
              <img src="/images/menuicon.png" alt="menu" />
            </button>
          </div>
        </div>
        <div className={`relative z-99 ${isOpen ? 'block' : 'hidden'} xl:block`}>
          <div className='relative z-99'>
            <div className={`xs:bg-msu-deep-ocean xl:bg-transparent xl:bg-gradient-ocean flex xl:flex-row xs:flex-col justify-between items-center text-white-pure xl:px-[12.5%] xs:px-[3.85%] nav ${isOpen && 'active'}`}>
              <ul className="flex 3xl:flex-row xl:flex-row sm:flex-col xs:flex-col xl:gap-14 xl:text-left xs:text-center paragraph p2 w-full">
                <Dropdown
                  title="About"
                  items={[
                    { link: "/about/campus", label: "Brief History" },
                    { link: "/about/mission-vision", label: "Mission/Vision" },
                    { link: "/about/university-hymn", label: "University Hymn" },
                  ]}
                />
                <Dropdown
                  title="Admissions"
                  items={[
                    { link: "/admissions/admissions", label: "Admission Procedures" },
                    { link: "/admissions/scholarship-and-grants", label: "Scholarship and Grants" },
                  ]}
                />
                <Dropdown
                  title="Programs"
                  items={[
                    { link: "/programs/cas", label: "College of Arts and Sciences" },
                    { link: "/programs/cias", label: "College of Islamic & Arabic Studies" },
                    { link: "/programs/coed", label: "College of Education" },
                    { link: "/programs/cof", label: "College of Fisheries" },
                    { link: "/programs/iict", label: "Institute of Information and Communication Technology" },
                    { link: "/programs/ioes", label: "Institute of Oceanography and Environmental Science" },
                  ]}
                />
                <Dropdown
                  title="Offices"
                  items={[
                    { link: "/offices/offices", label: "Administrative Offices" },
                    { link: "/offices/academic-offices", label: "Academic Offices" },
                    { link: "/offices/faculty-staff", label: "Faculty & Staff" },
                  ]}
                />
                <Dropdown
                  title="Publications"
                  items={[
                    { link: "/publications/articles", label: "Articles" },
                    { link: "/publications/sulimbang", label: "Sulimbang" },
                    { link: "/publications/gazette", label: "Gazettes" },
                    { link: "/bidding", label: "Bidding" },
                    { link: "/publications/annual-reports", label: "Annual Reports" },
                  ]}
                />
                <Dropdown
                  title="Job Opening"
                  items={[
                    { link: "/careers", label: "Open Positions" },
                  ]}
                />
              </ul>
              <div className="relative xl:mt-0 xs:mt-[15px] xl:w-fit xs:w-full">
                <form action={`/search/${url}`} method="post">
                  <input type="search" autoComplete='off' onChange={(e) => { setUrl(e.target.value) }} name="" id="search" className="bg-transparent border rounded-[20px] 3xl:w-[360px] xl:w-[240px] xs:w-full h-10 pl-12 pr-4 text-center" />
                  <img src="/images/search.png" alt="" className="absolute top-[6px] left-3" label="search" />
                </form>
              </div>
            </div>
          </div>
          <div className='bg-gradient-ocean h-[60px] xl:hidden xs:block'></div>
        </div>
      </div>

      <div className="downsize">
        {component}
      </div>
    </>
  );
};

export default React.memo(Navbar);