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
    spaceBetween={50}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => {}}
    onSlideChange={() => {}}
    loop={true}
    fade = {true}
    >
    <div class="flex flex-col gap-[20px] mb-[120px] justify-center w-full">
        <div  class="flex xl:flex-row xs:flex-row xs:gap-[20px] justify-center xl:hidden xs:block swiper-wrapper">
                    
        <SwiperSlide>
            <div id="cas" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mx-[15px] xs:mb-[20px] swiper-slide">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO CAS.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">College of Arts & Sciences</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Check our Enrollment Procedures</a>
                        </div>
                    <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div>
                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide>
            <div id="cias" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mx-[15px] xs:mb-[20px] swiper-slide">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO CIAS.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">College of Islamic & Arabic Studies</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Check our Enrollment Procedures</a>
                        </div>
                    <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>

            <div id="coed" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mx-[15px] xs:mb-[20px] swiper-slide">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO COED.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">College of Education</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Check our Enrollment Procedures</a>
                        </div>
                    <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div>
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div id="cof" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mx-[15px]  xs:mb-[20px]">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO COF.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">College of Fisheries</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Check our Enrollment Procedures</a>
                        </div>
                    <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div>
                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide>

            <div id="iict" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mx-[15px]  xs:mb-[20px]">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO IICT.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">Institute of Information and Communication Technology</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Check our Enrollment Procedures</a>
                        </div>
                    <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div>
                </div>
            </div>

        </SwiperSlide>
        <SwiperSlide>

            <div id="ioes" class="msu-drop-white-shadow xs:w-[460px] xs:h-[658px] xs:mx-[15px]  xs:mb-[20px]">
                <div class="flex xs:mx-[75px] xs:pt-[61px] justify-center">
                    <img src="/images/College Logo/LOGO IOES.png" alt="" class="xs:w-[242px] xs:h-[242px]"></img>
                </div>
                <div class="flex xs:px-[41px] mt-[37px] mb-[65px] justify-center ">
                    <h5 class="headings xs:h5 text-white-pure r">Institute of Oceanography and Environmental Science</h5>
                </div>
                <div class="flex flex-col gap-[20px] justify-center">
                    <div class="flex justify-center  mx-[41px]">
                        <a href="#" class="paragraph p1 bg-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px]">Check our Enrollment Procedures</a>
                        </div>
                    <div class="flex justify-center mx-[41px]">
                        <a href="#" class="paragraph p1 bg-transparent text-white-pure w-[351px] py-[12.5px] px-[30.5px] rounded-[40px] border border-msu-white-pure">Administrative Offices</a>
                    </div>
                </div>
            </div>

        </SwiperSlide>
        
        </div>
    </div>
    </Swiper>

  );
};