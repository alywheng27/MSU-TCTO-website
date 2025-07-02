import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getBanner } from '../api/api';

export default function MySwiper() {
  const [banner, setBanner] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBanner();
        setBanner(data);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && !swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        ref={swiperRef}
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
        loop={banner.length >= 3}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {banner.map((ban, index) => (
          <SwiperSlide key={index} className="z-0">
            <a 
              href={ban.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <div className="relative z-0 overflow-hidden w-full h-full">
                <img 
                  src={ban.mainImage.asset.url} 
                  alt={`Banner ${index + 1}`} 
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}