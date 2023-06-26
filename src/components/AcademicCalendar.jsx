import React, { useState } from 'react';
import HeroMainHeading from './HeroMainHeading';
import HeroAdmissionHeading from './HeroAdmissionHeading';
import HeroProgramHeading from './HeroProgramHeading';
import HeroPublicationHeading from './HeroPublicationHeading';
import HeroOfficeHeading from './HeroOfficeHeading';
import HeroCampusHeading from './HeroCampusHeading';

const AcademicCalendar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAcademicCalendar = () => {
    setIsOpen(!isOpen);
  }

  const { path } = props

  const bg = (path == '/admissions') ? 'hero-admission-img'
  				: (path == '/programs') ? 'hero-program-img'
				: (path == '/offices') ? 'hero-office-img'
				: (path == '/publications') ? 'hero-publication-img'
				: (path == '/campus') ? 'hero-campus-img'
				: (path == '/academic-calendar') ? ''
				: (path == '/search') ? ''
				: (path == '/articles') ? 'hero-main-img pb-[980px]'
				: (path == '/annual-reports') ? 'hero-main-img pb-[980px]'
				: (path == '/gazette') ? 'hero-main-img pb-[980px]'
				: 'hero-main-img xl:pb-[215px] xs:pb-[99px]'

  return (
    <>
		<div class=" bg-msu-deep-ocean w-full px-[12.5%] flex  flex-col pt-20">
            <div class="flex flex-col items-center">
                <h3 class="headings text-white-pure xl:h3 xs:h5 pl-[12.5%] pr-[12.5%] pb-[20px]">Academic Calendar</h3>
                <p class="paragraph text-silver xl:p1 xs:p2 pb-[80px]  xl:w-[960px]">
                    Lorem ipsum dolor sit amet consectetur. Viverra feugiat sollicitudin sit lacus sagittis cursus at sodales nunc. Hendrerit lectus nibh cras faucibus maecenas. Aliquam viverra enim massa cras. Viverra turpis senectus viverra a eu turpis quis. Varius vestibulum urna in rhoncus laoreet.
                </p>

                
            </div>
			
			<div class="item-center mt-[27px] pb-[79px]">
				<div class="item-center">
					
					{/* desktop view */}
					<div class="grid grid-col-4 justify-center xl:block xs:hidden">
						<div class="flex">
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">0</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
						</div>
						<div class="flex">
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-maroon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Apr</p>
										<h3 class="headings h3">01</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
						</div>
						<div class="flex">
							
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
						</div>
						<div class="flex">

							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">Jan</p>
										<h3 class="headings h3">14</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
								
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">NOV</p>
										<h3 class="headings h3">12</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-blue-horizon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">DEC</p>
										<h3 class="headings h3">15</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							<div class="bg-gradient-maroon p-5">
								
								<div class="gap-2 flex">
									<div>
										<p class="paragraph p1 text-white-pure">DEC</p>
										<h3 class="headings h3">25</h3>
									</div>
									<div>
										<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
										<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
									</div>
								</div>
							</div>
							
							
						</div>
						
					</div>

					{/* mobile view */}
					<div class="flex xs:flex-col xl:hidden xs:block">
								
						<div class="bg-gradient-blue-horizon p-5">
							
							<div class="gap-2 flex">
								<div>
									<p class="paragraph p1 text-white-pure">NOV</p>
									<h3 class="headings h3">12</h3>
								</div>
								<div>
									<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
									<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
								</div>
							</div>
						</div>
						<div class="bg-gradient-blue-horizon p-5">
							
							<div class="gap-2 flex">
								<div>
									<p class="paragraph p1 text-white-pure">DEC</p>
									<h3 class="headings h3">15</h3>
								</div>
								<div>
									<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
									<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
								</div>
							</div>
						</div>
						<div class="bg-gradient-maroon p-5">
							
							<div class="gap-2 flex">
								<div>
									<p class="paragraph p1 text-white-pure">DEC</p>
									<h3 class="headings h3">25</h3>
								</div>
								<div>
									<p class="paragraph p1 text-titanium mt-[5px]">Event Title</p>
									<p class="paragraph p2 text-titanium mt-[5px]">Lorem ipsum dolor sit amet consectetur. Faucibus enim nunc integer libero</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>

		</div>
    </>
  );
}

export default AcademicCalendar;