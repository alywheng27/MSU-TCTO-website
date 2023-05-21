import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
        <div className="3xl:h-[100px] xl:h-[80px] xs:h-[60px] w-full bg-msu-deep-ocean text-white-pure flex justify-between items-center xl:px-[12.5%] xsm:px-[3.85%]">
			<div className="flex items-center xl:py-0 xsm:py-2">
				<img src="/images/MSU Seal New (Official).png" alt="" className="3xl:h-[72.99px] xsm:h-[43.79px] mr-5 3xl:block xl:hidden sm:block" />
				<div>
					<h4 className="headings xl:h5 block xl:block xsm:hidden">Mindanao State University</h4>
					<p className="paragraph xl:p2 block xl:block xsm:hidden">Tawi-Tawi College of Technology and Oceanography</p>
				</div>
			</div>
			<div>
				<p className="paragraph xl:p2 xl:block xsm:hidden pb-1">+63 910 291 0605</p>
				<p className="paragraph xl:p2 xl:block xsm:hidden">admissions@msutawi-tawi.edu.ph</p>
				<button className="headings h6 xl:hidden xsm:block" onClick={toggleNavbar}>MENU</button>
			</div>
		</div>
        <div className="hero-main-img relative">
			<div className={`xsm:bg-msu-deep-ocean xl:bg-transparent xl:bg-gradient-ocean flex xl:flex-row xsm:flex-col justify-between items-center 3xl:h-[80px] xl-[60px] text-white-pure xl:px-[12.5%] xsm:px-[3.85%] nav ${isOpen && 'active'}`}>
				<div className="flex 3xl:flex-row xl:flex-row sm:flex-col xsm:flex-col xl:gap-20 xl:text-left xsm:text-center paragraph p2 w-full">
					<a href="#" className='py-[15px]' >Admissions</a>
					<a href="#" className='py-[15px]'>Programs</a>
					<a href="#" className='py-[15px]'>Offices</a>
					<a href="#" className='py-[15px]'>Publication</a>
					<a href="#" className='py-[15px]'>The Campus</a>
				</div>
				<div className="relative xl:mt-0 xsm:mt-[15px] xl:w-fit xsm:w-full">
					<input type="search" name="" id="" className="bg-transparent border rounded-[20px] 3xl:w-[360px] xl:w-[240px] xsm:w-full h-10 pl-12 pr-4 text-center" />
					<img src="/images/search.png" alt="" className="absolute top-[6px] left-3" />
				</div>
			</div>
            <div className='bg-gradient-ocean h-[60px] xsm:block xl:hidden'></div>
			<div className="mt-[478px] px-[12.5%]">
				<h3 className="headings h3">
					Four decades<br/>
					of steadfast Excellence<br/>
					in Marine Sciences<br/>
				</h3>
				<div className="mt-5">
					<a href="#" className="bg-msu-maroon text-white-pure py-[14.5px] px-[115.5px] rounded-[40px] paragraph p1">Enroll Now</a>
					<a href="#" className="text-white-pure py-[14.5px] px-[115.5px] rounded-[40px] ml-10 paragraph p1 border">Our Course Offerings</a>
				</div>
			</div>
			<div className="flex justify-center mt-[135px] px-[12.5%] relative">
				<div>
					<img src="/images/main-article.png" alt="" className="h-[720px]" />
					<div className="absolute top-[519px] pl-10">
						<h4 className="headings h4 max-w-[680px]">
							Four decades of steadfast
							Excellence in Marine Sciences
						</h4>
						<p className="paragraph p2 mt-5 text-titanium max-w-[680px]">Lorem ipsum dolor sit amet consectetur. Consequat neque interdum ut tristique habitant sapien. Facilisis eros mauris imperdiet nibh adipiscing sit sed sed. Vestibulum mattis netus interdum vitae pellentesque.</p>
					</div>
				</div>
				<div className="mt-5 ml-5">
					<div className="flex">
						<img src="/images/article-img-1.png" alt="" className="h-[200px]" />
						<div className="ml-5">
							<h5 className="headings h5 max-w-[220px]">Article Long Title </h5>
							<p className="paragraph p2 max-w-[220px] text-white-pure mt-[15px] max-h-[152px]">Lorem ipsum dolor sit amet consectetur. Consequat neque interdum ut tristique habitant sapien. Facilisis eros mauris imperdiet nibh adipiscing sit sed sed. Vestibulum mattis netus interdum vitae pellentesque.</p>
						</div>
					</div>
					<div className="flex mt-10">
						<img src="/images/article-img-1.png" alt="" className="h-[200px]" />
						<div className="ml-5">
							<h5 className="headings h5 max-w-[220px]">Article Long Title </h5>
							<p className="paragraph p2 max-w-[220px] text-white-pure mt-[15px] max-h-[152px]">Lorem ipsum dolor sit amet consectetur. Consequat neque interdum ut tristique habitant sapien. Facilisis eros mauris imperdiet nibh adipiscing sit sed sed. Vestibulum mattis netus interdum vitae pellentesque.</p>
						</div>
					</div>
					<div className="flex mt-10">
						<img src="/images/article-img-1.png" alt="" className="h-[200px]" />
						<div className="ml-5">
							<h5 className="headings h5 max-w-[220px]">Article Long Title </h5>
							<p className="paragraph p2 max-w-[220px] text-white-pure mt-[15px] max-h-[152px]">Lorem ipsum dolor sit amet consectetur. Consequat neque interdum ut tristique habitant sapien. Facilisis eros mauris imperdiet nibh adipiscing sit sed sed. Vestibulum mattis netus interdum vitae pellentesque.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>
  );
}

export default Navbar;