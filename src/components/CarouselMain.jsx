import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getBanner } from '../api/api';

export default function MySwiper() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBanner();
        console.log('Banner Data:', data); // Debugging: Log fetched data
        setBanner(data);
      } catch (error) {
        console.error('Error fetching banner data:', error); // Debugging: Log errors
      }
    };

    fetchData();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={25}
      slidesPerView={1}
      slidesPerGroup={1}
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className}"></span>`;
        },
      }}
      loop={banner.length >= 3} // Enable loop only if there are 3 or more slides
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      onSwiper={(swiper) => console.log('Swiper instance:', swiper)} // Debugging: Log Swiper instance
      onSlideChange={() => console.log('Slide changed')} // Debugging: Log slide change
    >
      {/* Static Slide */}
      <SwiperSlide>
        <div className="z-0">
          <img src="/images/banner/banner1.jpg" alt="Banner 1" />
        </div>
      </SwiperSlide>

      {/* Dynamic Slides from API */}
      {banner.map((ban, index) => (
        <SwiperSlide key={index} className="z-0">
          <div className="z-0">
            <img src={ban.mainImage.asset.url} alt={`Banner ${index + 2}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}