import React, { useState } from 'react';
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

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  }

  const { path } = props

  const bg = (path == '/admissions') ? 'hero-admission-img xl:h-[440px] xs:h-[164px]'
  				: (path == '/programs') ? 'hero-program-img xl:h-[440px] xs:h-[164px]'
  				: (path == '/cas') ? 'hero-cas-img xl:h-[440px] xs:h-[164px]'
  				: (path == '/cias') ? 'hero-cias-img'
  				: (path == '/coed') ? 'hero-coed-img'
  				: (path == '/cof') ? 'hero-cof-img'
  				: (path == '/iict') ? 'hero-iict-img'
  				: (path == '/ioes') ? 'hero-ioes-img'
				: (path == '/offices') ? 'hero-office-img xl:h-[440px] xs:h-[164px]'
				: (path == '/publications') ? 'hero-publication-img xl:h-[440px] xs:h-[220px]'
				: (path == '/campus') ? 'hero-campus-img xl:h-[440px] xs:h-[164px]'
				: (path == '/academic-calendar') ? ''
				: (path == '/search') ? ''
				: (path == '/articles') ? 'hero-main-img xl:h-[980px] xs:h-[770px]'
				: (path == '/annual-reports') ? 'hero-main-img xl:h-[980px] xs:h-[770px]'
				: (path == '/gazette') ? 'hero-main-img xl:h-[980px] xs:h-[770px]'
				: (path == '/careers') ? 'hero-admission-img xl:h-[440px] xs:h-[164px]'
				: (path == '/application') ? 'hero-admission-img xl:h-[440px] xs:h-[164px]'
				: (path == '/') ? 'hero-main-img xl:h-[980px] xs:h-[770px]'
				: ''

  return (
    <>
        <div className="3xl:h-[100px] xl:h-[80px] xs:h-[60px] w-full bg-msu-deep-ocean text-white-pure flex justify-between items-center xl:px-[12.5%] xs:px-[3.85%] relative">
			<a href='/' className="flex items-center xl:py-0 xs:py-2">
				<img src="/images/MSU Seal New (Official).png" alt="" className="3xl:h-[72.99px] xs:h-[43.79px] mr-5 3xl:block xl:hidden sm:block" />
				<div>
					<h4 className="headings xl:h5 block xl:block xs:hidden">Mindanao State University</h4>
					<p className="paragraph xl:p2 block xl:block xs:hidden">Tawi-Tawi College of Technology and Oceanography</p>
				</div>
			</a>
			<div>
				<p className="paragraph xl:p2 xl:block xs:hidden pb-1">+63 910 291 0605</p>
				<p className="paragraph xl:p2 xl:block xs:hidden">admissions@msutawi-tawi.edu.ph</p>
				<button className="headings h5 xl:hidden xs:block" onClick={toggleNavbar}>MENU</button>
			</div>
		</div>
        <div className={bg + ` relative`}>
			<div className='relative z-20'>
				<div className={`xs:bg-msu-deep-ocean xl:bg-transparent xl:bg-gradient-ocean flex xl:flex-row xs:flex-col justify-between items-center 3xl:h-[80px] xl:h-[60px] text-white-pure xl:px-[12.5%] xs:px-[3.85%] nav ${isOpen && 'active'}`}>
					<div className="flex 3xl:flex-row xl:flex-row sm:flex-col xs:flex-col xl:gap-20 xl:text-left xs:text-center paragraph p2 w-full">
						<a href="/admissions" className='py-[15px]'>Admissions</a>
						<a href="/programs" className='py-[15px]'>Programs</a>
						<a href="/offices" className='py-[15px]'>Offices</a>
						<a href="/publications" className='py-[15px]'>Publication</a>
						<a href="/campus" className='py-[15px]'>The Campus</a>
						<a href="/careers#" className='py-[15px]'>Careers</a>
					</div>
					<div className="relative xl:mt-0 xs:mt-[15px] xl:w-fit xs:w-full">
						<input type="search" name="" id="" className="bg-transparent border rounded-[20px] 3xl:w-[360px] xl:w-[240px] xs:w-full h-10 pl-12 pr-4 text-center" />
						<img src="/images/search.png" alt="" className="absolute top-[6px] left-3" />
					</div>
				</div>				
			</div>
			
            <div className='bg-gradient-ocean h-[60px] xl:hidden xs:block'></div>
			
			
		</div>
		{
			(path == '/admissions') ? <HeroAdmissionHeading />
			: (path == '/programs') ? <HeroProgramHeading />
			: (path == '/cas') ? <HeroCASHeading />
			: (path == '/cias') ? <HeroCIASHeading />
			: (path == '/coed') ? <HeroCOEDHeading />
			: (path == '/cof') ? <HeroCOFHeading />
			: (path == '/iict') ? <HeroIICTHeading />
			: (path == '/ioes') ? <HeroIOESHeading />
			: (path == '/offices') ? <HeroOfficeHeading />
			: (path == '/publications') ? <HeroPublicationHeading />
			: (path == '/campus') ? <HeroCampusHeading />
			: (path == '/academic-calendar' || path == '/articles' || path == '/annual-reports' || path == '/gazette' || path == '/search' || path == '/article-topic' || path == '/careers' || path == '/application') ? ''
			: (path == '/') ? <HeroMainHeading />
			: ''
		}
    </>
  );
}

export default Navbar;