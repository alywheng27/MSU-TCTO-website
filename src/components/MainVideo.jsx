import React, { useState } from 'react';
import HeroMainHeading from './HeroMainHeading';
import HeroAdmissionHeading from './HeroAdmissionHeading';
import HeroProgramHeading from './HeroProgramHeading';
import HeroPublicationHeading from './HeroPublicationHeading';
import HeroOfficeHeading from './HeroOfficeHeading';
import HeroCampusHeading from './HeroCampusHeading';

const MainVideo = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMainVideo = () => {
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
       	<div class="video-wrapper">
			<div class="video-container">
				<iframe width="100%" height="980"
					src="https://www.youtube.com/embed/0C7f8iq6f_w?autoplay=0&mute=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
				</iframe>
			</div>
		</div>
    </>
  );
}

export default MainVideo;