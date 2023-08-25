// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

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
    modules={[Navigation]}
    spaceBetween={25}
    slidesPerView={1}
    slidesPerGroup={1}
    pagination={{ clickable: true, el: ".swiper-pagination", dynamicBullets: true }}
    navigation={{nextEl: '.swiper-button-next', prevEl:'.swiper-button-prev'}}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    loop={true}
    fade = {true}
    centeredSlides={true}
    grabCursor={true}
    
    >
    <div class="flex flex-col gap-[20px] mb-[120px] justify-center w-full">
        <div  class="flex xl:flex-row xs:flex-row xs:gap-[20px] justify-center xl:hidden xs:block swiper-wrapper">
                    
        <SwiperSlide>
            <img src="/images/image 3.png" alt="" class="xl:h-[360px] object-cover object-center" ></img>

        </SwiperSlide>
        <SwiperSlide>
            <img src="/images/image 4.png" alt="" class="xl:h-[360px] object-cover object-center" />

        </SwiperSlide>
        <SwiperSlide>
            <img src="/images/image 5.png" alt="" class="xl:h-[360px] object-cover object-center" />

        </SwiperSlide>

            
        <div class="swiper-button-next swiper-navBtn"></div>
        <div class="swiper-button-next swiper-navBtn"></div>
        <div class="swiper-pagination"></div>
        </div>
    </div>
    </Swiper>

  );
};