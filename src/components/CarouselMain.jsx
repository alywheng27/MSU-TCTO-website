import React, { useEffect, useState } from 'react';

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { urlForImage } from '../api/api';
import { getBanner } from '../api/api';

export default function MySwiper() {
  const [banner, setbanner] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
        const hold = await getBanner();
        setbanner(hold);
    };

    fetchData();
  }, []);

  return (
    <Swiper
    // install Swiper modules
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={25}
    slidesPerView={1}
    slidesPerGroup={1}
    pagination={{ 
      clickable: true,
      renderBullet: function () {
      return '<span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>';
    }, }}
    // navigation={{nextEl: '.swiper-button-next', prevEl:'.swiper-button-prev'}}
    // scrollbar={{ draggable: true }}
    onSwiper={(swiper) => {}}
    onSlideChange={() => {}}
    loop={true}
    autoplay={{
        delay: 5000,
        disableOnInteraction: false,
    }}
    // fade = {true}
    // centeredSlides={true}
    // grabCursor={true}
    
    >
      <SwiperSlide >
      <div className='z-0'>
        <img src="/images/banner/banner1.jpg"></img>
        </div>
      </SwiperSlide>
      {
        banner.map((ban, index) => (
          <SwiperSlide key={index} className='z-0' >
           
           <div className='z-0'>
            <img src={ ban.mainImage.asset.url }></img>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>

  );
};