// import Swiper core and required modules
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
    modules={[Navigation, Autoplay]}
    spaceBetween={50}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    loop={true}
    autoplay={{
        delay: 5000,
        disableOnInteraction: false,
    }}
    fade = {true}
    >

                    
        <SwiperSlide className='flex justify-center'>
            <div id="cas" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mb-[20px] swiper-slide">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO CAS.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">College of Arts & Sciences</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="/cas#college_contact_details_cas#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Contact Us</a>
                        </div>
                    {/* <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div> */}
                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide className='flex justify-center'>
            <div id="cias" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mb-[20px] swiper-slide">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO CIAS.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">College of Islamic & Arabic Studies</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="/cias#college_contact_details_cias#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Contact Us</a>
                        </div>
                    {/* <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div> */}
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='flex justify-center'>

            <div id="coed" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mb-[20px] swiper-slide">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO COED.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">College of Education</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="/coed#college_contact_details_coed#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Contact Us</a>
                        </div>
                    {/* <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div> */}
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide className='flex justify-center'>
            <div id="cof" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mb-[20px] swiper-slide">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO COF.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">College of Fisheries</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="/cof#college_contact_details_cof#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Contact Us</a>
                        </div>
                    {/* <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div> */}
                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide className='flex justify-center'>
            
            <div id="iict" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mb-[20px] swiper-slide">
            {/* <div id="iict" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px]  xs:mb-[20px]"> */}
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO IICT.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">Institute of Information and Communication Technology</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="/iict#college_contact_details_iict#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Contact Us</a>
                        </div>
                    {/* <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div> */}
                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide className='flex justify-center'>

            <div id="ioes" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mb-[20px] swiper-slide">
            {/* <div id="ioes" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mb-[20px]"> */}
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO IOES.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">Institute of Oceanography and Environmental Science</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="/ioes#college_contact_details_ioes#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Contact Us</a>
                        </div>
                    {/* <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div> */}
                </div>
            </div>

        </SwiperSlide>

    </Swiper>

  );
};