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
import Headroom from 'react-headroom';

/***
 * Faculty and Staff data
 * List of Departments of Colleges data
 * List of Courses of Departments data
 * Head of Departments data
 * Short Description of the departments data
 * Photos of facilities and activities of dapartments
 * Programs and certifications of departments
 * Email and Contacts of departments
 */

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
	const [url, setUrl] = useState("");

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  }

  const { path } = props

  const bg = (path == '/admissions/admissions') ? 'hero-admission-img xl:h-[440px] xs:h-[164px]'
  				: (path == '/programs') ? 'hero-program-img xl:h-[440px] xs:h-[164px]'
  				: (path == '/cas') ? 'hero-cas-img xl:h-[440px] xs:h-[164px]'
  				: (path == '/cias') ? 'hero-cias-img'
  				: (path == '/coed') ? 'hero-coed-img'
  				: (path == '/cof') ? 'hero-cof-img'
  				: (path == '/iict') ? 'hero-iict-img'
  				: (path == '/ioes') ? 'hero-ioes-img'
				: (path == '/offices/offices') ? 'hero-office-img xl:h-[440px] xs:h-[164px]'
				: (path == '/publications') ? 'hero-publication-img xl:h-[440px] xs:h-[220px]'
				: (path == '/about/campus') ? 'hero-campus-img xl:h-[440px] xs:h-[220px]'
				: (path == '/academic-calendar') ? ''
				: (path == '/search') ? ''
				: (path == '/articles') ? 'hero-main-img xl:h-[980px] xs:h-[770px]'
				: (path == '/annual-reports') ? 'hero-main-img xl:h-[980px] xs:h-[770px]'
				: (path == '/gazette') ? 'hero-main-img xl:h-[980px] xs:h-[770px]'
				: (path == '/careers') ? 'hero-admission-img xl:h-[440px] xs:h-[164px]'
				: (path == '/application') ? 'hero-admission-img xl:h-[440px] xs:h-[164px]'
				// : (path == '/') ? 'hero-main-img xl:h-[980px] xs:h-[770px]'
				: ''

  return (
    <>

<Headroom>
			<div className="3xl:h-[100px] xl:h-[80px] xs:h-[60px] w-full bg-msu-deep-ocean text-white-pure flex justify-between items-center xl:px-[12.5%] xs:px-[3.85%] relative">
				<a href='/' className="flex items-center xl:py-0 xs:py-2">
					<img src="/images/MSU Seal New (Official).png" alt="" className="3xl:h-[72.99px] xs:h-[43.79px] mr-5 3xl:block xl:hidden sm:block" />
					<div>
						<h4 className="headings xl:h5 block xl:block xs:hidden">Mindanao State University</h4>
						<p className="paragraph xl:p2 block xl:block xs:hidden">Tawi-Tawi College of Technology and Oceanography</p>
					</div>
				</a>
				<div>
					<p className="paragraph xl:p2 xl:block xs:hidden pb-1">+63 909 9826063</p>
					<p className="paragraph xl:p2 xl:block xs:hidden">admissions@msutawi-tawi.edu.ph</p>
					<button className="headings h5 xl:hidden xs:block" onClick={toggleNavbar}><img src="../public/images/menuicon.png"></img></button>
				</div>
			</div>
			<div className={` relative z-99`}>
				<div className='relative z-99'>
					<div className={`xs:bg-msu-deep-ocean xl:bg-transparent xl:bg-gradient-ocean flex xl:flex-row xs:flex-col justify-between items-center text-white-pure xl:px-[12.5%] xs:px-[3.85%] nav ${isOpen && 'active'}`}>
						<ul className="flex 3xl:flex-row xl:flex-row sm:flex-col xs:flex-col xl:gap-14 xl:text-left xs:text-center paragraph p2 w-full">
				{/* <li className='py-[15px]'><a href="/" className='flex xs:justify-center xl:justify-start'>Home</a></li> */}
				<li className='py-[15px] dropdown dropdown-1' >
				<a href="#" className='flex xs:justify-center xl:justify-start'>About <img src="../../public/down-arrow2-svgrepo-com.svg" className='ml-2 float-right' width={16} alt="" /></a>
				<ul className={`mt-[15px] dropdown-menu lvl-one`}>
					<li className='py-[15px] px-5'><a href="/about/campus">Brief History</a></li>
					<li className='py-[15px] px-5'><a href="/about/mission-vision">Mission/Vision</a></li>
					<li className='pt-[15px] px-5'><a href="/about/university-hymn">University Hymn</a></li>
					{/* <li className='px-5 pt-[15px] dropdown dropdown-2'>
					<a href="#" className='flex xs:justify-center xl:justify-start'>University Hymn <img src="../../public/down-arrow2-svgrepo-com.svg" className='ml-2 float-right' width={18} alt="" /></a>
					<ul className={`dropdown-menu lvl-two`}>
						<li className='xs:pt-[30px] xl:pt-[15px] pb-[15px] px-5'><a href="/campus">Lupang Hinirang</a></li>
						<li className='py-[15px] px-5'><a href="/campus">Panatang Makabayan</a></li>
						<li className='pt-[15px] px-5'><a href="/campus">Silais</a></li>
					</ul>
					</li> */}
				</ul>
				</li>
							<li className='py-[15px] dropdown dropdown-1'>
				<a href="#" className='flex xs:justify-center xl:justify-start'>Admissions <img src="../../public/down-arrow2-svgrepo-com.svg" className='ml-2 float-right' width={16} alt="" /></a>
				<ul className={`mt-[15px] dropdown-menu lvl-one`}>
					<li className='py-[15px] px-5'><a href="/admissions/admissions">Admission Procedures</a></li>
					<li className='pt-[15px] px-5'><a href="/admissions/scholarship-and-grants">Scholarship and Grants</a></li>
				</ul>
				</li>
							<li className='py-[15px] dropdown dropdown-1'>
				<a href="/programs" className='flex xs:justify-center xl:justify-start'>Programs <img src="../../public/down-arrow2-svgrepo-com.svg" className='ml-2 float-right' width={16} alt="" /></a>
				<ul className={`mt-[15px] dropdown-menu lvl-one`}>
					<li className='py-[15px] px-5'><a href="/programs/cas">College of Arts and Sciences</a></li>
					<li className='py-[15px] px-5'><a href="/programs/cias">College of Islamic & Arabic Studies</a></li>
					<li className='py-[15px] px-5'><a href="/programs/coed">College of Education</a></li>
					<li className='py-[15px] px-5'><a href="/programs/cof">College of Fisheries</a></li>
					<li className='py-[15px] px-5'><a href="/programs/iict">Institute of Information and Communication Technology</a></li>
					<li className='pt-[15px] px-5'><a href="/programs/ioes">Institute of Oceanography and Environmental Science</a></li>
				</ul>
				</li>
							<li className='py-[15px] dropdown dropdown-1'>
				<a href="#" className='flex xs:justify-center xl:justify-start'>Offices <img src="../../public/down-arrow2-svgrepo-com.svg" className='ml-2 float-right' width={16} alt="" /></a>
				<ul className={`mt-[15px] dropdown-menu lvl-one`}>
					<li className='py-[15px] px-5'><a href="/offices/offices">Administrative Offices</a></li>
					<li className='pt-[15px] px-5'><a href="/offices/academic-offices">Academic Offices</a></li>
					<li className='pt-[15px] px-5'><a href="/offices/academic-offices">Our Teachers</a></li>
				</ul>
				</li>
							<li className='py-[15px] dropdown dropdown-1'>
				<a href="/publications" className='flex xs:justify-center xl:justify-start'>Publications <img src="../../public/down-arrow2-svgrepo-com.svg" className='ml-2 float-right' width={16} alt="" /></a>
				<ul className={`mt-[15px] dropdown-menu lvl-one`}>
					<li className='py-[15px] px-5'><a href="/publications/articles">Articles</a></li>
					<li className='py-[15px] px-5'><a href="/publications/gazette">Gazettes</a></li>
					<li className='pt-[15px] px-5'><a href="/publications/annual-reports">Annual Reports</a></li>
				</ul>
				</li>

				<li className='py-[15px] dropdown dropdown-1'>
				<a href="/publications" className='flex xs:justify-center xl:justify-start'>Job Offering <img src="../../public/down-arrow2-svgrepo-com.svg" className='ml-2 float-right' width={16} alt="" /></a>
				<ul className={`mt-[15px] dropdown-menu lvl-one`}>
					<li className='py-[15px] px-5'><a href="/careers">Open Positions</a></li>
		
				</ul>
				</li>
							{/* <li className='py-[15px]'><a href="/careers">Careers</a></li> */}
						</ul>
						<div className="relative xl:mt-0 xs:mt-[15px] xl:w-fit xs:w-full">
							<form action={`/search/${url}`} method="post">
								<input type="search" autoComplete='off' onChange={(e) => {setUrl(e.target.value)}} name="" id="search" className="bg-transparent border rounded-[20px] 3xl:w-[360px] xl:w-[240px] xs:w-full h-10 pl-12 pr-4 text-center" />
								<img src="/images/search.png" alt="" className="absolute top-[6px] left-3" label="search" />
							</form>
							
						</div>
					</div>				
				</div>
		
		<div className='bg-gradient-ocean h-[60px] xl:hidden xs:block'></div>
				
			</div>

			</Headroom>
		
		<div class="downsize">
		{
			(path == '/admissions/admissions') ? <HeroAdmissionHeading />
			: (path == '/programs') ? <HeroProgramHeading />
			: (path == '/cas') ? <HeroCASHeading />
			: (path == '/cias') ? <HeroCIASHeading />
			: (path == '/coed') ? <HeroCOEDHeading />
			: (path == '/cof') ? <HeroCOFHeading />
			: (path == '/iict') ? <HeroIICTHeading />
			: (path == '/ioes') ? <HeroIOESHeading />
			: (path == '/offices/offices') ? <HeroOfficeHeading />
			: (path == '/publications') ? <HeroPublicationHeading />
			: (path == '/about/campus') ? <HeroCampusHeading />
			: (path == '/academic-calendar' || path == '/articles' || path == '/annual-reports' || path == '/gazette' || path == '/search' || path == '/article-topic' || path == '/careers' || path == '/application') ? ''
			// : (path == '/') ? <HeroMainHeading />
			: ''
		}
			</div>
    </>

  );
}

export default Navbar;