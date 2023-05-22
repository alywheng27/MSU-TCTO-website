import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
        <div className="3xl:h-[100px] xl:h-[80px] xs:h-[60px] w-full bg-msu-deep-ocean text-white-pure flex justify-between items-center xl:px-[12.5%] xs:px-[3.85%]">
			<div className="flex items-center xl:py-0 xs:py-2">
				<img src="/images/MSU Seal New (Official).png" alt="" className="3xl:h-[72.99px] xs:h-[43.79px] mr-5 3xl:block xl:hidden sm:block" />
				<div>
					<h4 className="headings xl:h5 block xl:block xs:hidden">Mindanao State University</h4>
					<p className="paragraph xl:p2 block xl:block xs:hidden">Tawi-Tawi College of Technology and Oceanography</p>
				</div>
			</div>
			<div>
				<p className="paragraph xl:p2 xl:block xs:hidden pb-1">+63 910 291 0605</p>
				<p className="paragraph xl:p2 xl:block xs:hidden">admissions@msutawi-tawi.edu.ph</p>
				<button className="headings h6 xl:hidden xs:block" onClick={toggleNavbar}>MENU</button>
			</div>
		</div>
        <div className="hero-main-img xl:h-[980px] xs:h-[764px] relative">
			<div className={`xs:bg-msu-deep-ocean xl:bg-transparent xl:bg-gradient-ocean flex xl:flex-row xs:flex-col justify-between items-center 3xl:h-[80px] xl-[60px] text-white-pure xl:px-[12.5%] xs:px-[3.85%] nav ${isOpen && 'active'}`}>
				<div className="flex 3xl:flex-row xl:flex-row sm:flex-col xs:flex-col xl:gap-20 xl:text-left xs:text-center paragraph p2 w-full">
					<a href="/admissions" className='py-[15px]'>Admissions</a>
					<a href="#" className='py-[15px]'>Programs</a>
					<a href="#" className='py-[15px]'>Offices</a>
					<a href="#" className='py-[15px]'>Publication</a>
					<a href="#" className='py-[15px]'>The Campus</a>
				</div>
				<div className="relative xl:mt-0 xs:mt-[15px] xl:w-fit xs:w-full">
					<input type="search" name="" id="" className="bg-transparent border rounded-[20px] 3xl:w-[360px] xl:w-[240px] xs:w-full h-10 pl-12 pr-4 text-center" />
					<img src="/images/search.png" alt="" className="absolute top-[6px] left-3" />
				</div>
			</div>
            <div className='bg-gradient-ocean h-[60px] xs:block xl:hidden'></div>
			<div className="xl:mt-[398px] xs:mt-[300px] xl:w-[769px] xl:mx-[12.5%] xs:mx-[3.85%]">
				<h3 className="headings xl:h3 xs:h4">
					Four decades <br />
					of steadfast Excellence <br />
					in Marine Sciences
				</h3>
				<div className="mt-5 flex xl:flex-row xs:flex-col">
					<a href="#" className="bg-msu-maroon text-white-pure xl:py-[14.5px] xs:py-5 xl:w-[360px] text-center rounded-[40px] paragraph xl:p1 xs:p2">Enroll Now</a>
					<a href="#" className="text-white-pure xl:py-[14.5px] xs:py-5 xl:w-[360px] text-center rounded-[40px] xl:ml-10 xl:mt-0 xs:mt-[10px] paragraph xl:p1 xs:p2 border">Our Course Offerings</a>
				</div>
			</div>
			{/* <div className="flex xl:flex-row xs:flex-col justify-center mt-[135px] px-[12.5%] relative">
				<div>
					<img src="/images/main-article.png" alt="" className="h-[720px] object-cover object-center" />
					<div className="xl:absolute xl:top-[519px] xs:relative pl-10">
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
			</div> */}
		</div>
    </>
  );
}

export default Navbar;