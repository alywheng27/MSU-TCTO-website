import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { getBanner } from '../api/api';

export default function MySwiper() {
  const [banner, setBanner] = useState([]);
  const [loadedImages, setLoadedImages] = useState(new Set());
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

  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  const handleImageError = useCallback((index, src) => {
    console.warn(`Failed to load banner image ${index + 1}:`, src);
  }, []);

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
                {/* Loading placeholder */}
                {!loadedImages.has(index) && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400 text-sm">Loading...</div>
                  </div>
                )}
                
                <img 
                  src={ban.mainImage.asset.url} 
                  alt={`Banner ${index + 1}`} 
                  className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
                    loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index, ban.mainImage.asset.url)}
                />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}