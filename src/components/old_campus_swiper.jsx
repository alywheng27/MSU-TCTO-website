// import Swiper core and required modules
import React, { useEffect, useState } from 'react';
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function MySwiper() {
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
    fade = {true}
    centeredSlides={true}
    grabCursor={true}
    
    >
    {/* <div class="flex flex-col gap-[20px] mb-[120px] justify-center w-full">
        <div  class="flex xl:flex-row xs:flex-row xs:gap-[20px] justify-center xl:hidden xs:block swiper-wrapper">
                     */}
        <SwiperSlide className='flex justify-center'>
            <img src="/images/image 3.png" alt="" class="xl:h-[360px] xs:w-full object-cover object-center" ></img>
        </SwiperSlide>
        <SwiperSlide className='flex justify-center'>
            <img src="/images/image 4.png" alt="" class="xl:h-[360px] xs:w-full object-cover object-center" />
        </SwiperSlide>
        <SwiperSlide className='flex justify-center'>
            <img src="/images/image 5.png" alt="" class="xl:h-[360px] xs:w-full object-cover object-center" />
        </SwiperSlide>

            
        {/* <div class="swiper-button-next swiper-navBtn"></div>
        <div class="swiper-button-prev swiper-navBtn"></div> */}
        {/* <div class="swiper-pagination swiper-navBtn"></div> */}
        {/* </div>
    </div> */}
    </Swiper>

  );
};