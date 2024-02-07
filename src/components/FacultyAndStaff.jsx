import React, { useEffect, useState } from 'react';
import '../styles/css/facultyStaff.css';

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { urlForImage } from '../api/api';

import { getFacultyAndStaff } from '../api/api';

const FacultyAndStaff = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(getInitialPerPage());

  const [my_swiper, set_my_swiper] = useState({});
  const [slideCount, setSlideCount] = useState(0)

  function getInitialPerPage() {
    return window.innerWidth < 1280 ? 6 : 12;
  }

  useEffect(() => {
    const handleResize = () => {
      setPerPage(window.innerWidth < 1280 ? 6 : 12);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [facultyStaffIICT, setFacultyStaffIICT] = useState([]);
  const [facultyStaffCAS, setFacultyStaffCAS] = useState([]);
  const [facultyStaffCOED, setFacultyStaffCOED] = useState([]);
  const [facultyStaffCOF, setFacultyStaffCOF] = useState([]);
  const [facultyStaffIOES, setFacultyStaffIOES] = useState([]);
  const [facultyStaffCIAS, setFacultyStaffCIAS] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const facultyStaffData = await getFacultyAndStaff('IICT');
        setFacultyStaffIICT(facultyStaffData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const facultyStaffData = await getFacultyAndStaff('CAS');
        setFacultyStaffCAS(facultyStaffData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const facultyStaffData = await getFacultyAndStaff('COED');
        setFacultyStaffCOED(facultyStaffData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const facultyStaffData = await getFacultyAndStaff('IOES');
        setFacultyStaffIOES(facultyStaffData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const facultyStaffData = await getFacultyAndStaff('CIAS');
        setFacultyStaffCIAS(facultyStaffData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        const facultyStaffData = await getFacultyAndStaff('COF');
        setFacultyStaffCOF(facultyStaffData);
    };

    fetchData();
  }, []);

  const tabs = [
    {
      tabId: '0',
      label: 'IICT',
      title: 'Institute of Information and Communcations Technology',
      content: facultyStaffIICT,
    },
    {
      tabId: '1',
      label: 'CAS',
      title: 'College of Arts and Sciences',
      content: facultyStaffCAS,
    },
    {
      tabId: '2',
      label: 'COF',
      title: 'College of Fisheries',
      content: facultyStaffCOF,
    },
    {
      tabId: '3',
      label: 'COED',
      title: 'College of Education',
      content: facultyStaffCOED,
    },
    {
      tabId: '4',
      label: 'IOES',
      title: 'Institute of Environmental Science',
      content: facultyStaffIOES,
    },
    {
      tabId: '5',
      label: 'CIAS',
      title: 'College of Islaminc and Arabic Studies',
      content: facultyStaffCIAS,
    },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
    setCurrentPage(1); // Reset to the first page when changing tabs
  };

  // Helper function to paginate content
  const paginateContent = (content, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return content.slice(startIndex, endIndex);
  };

  const currentTab = tabs[activeTab];
  const currentTabContent = currentTab.content;
  const pageCount = Math.ceil(currentTabContent.length / perPage);
  const paginatedContent = paginateContent(
    currentTabContent,
    currentPage,
    perPage
  );

  const paginationIndicators = Array.from({ length: pageCount }, (_, index) => (
    <span
      key={index}
      className={`pagination-indicator ${
        currentPage === index + 1 ? 'active' : ''
      }`}
      onClick={() => setCurrentPage(index + 1)}
    >
      {/* &bull; */}
    </span>
  ));

  const handleNextSlide = () => {
    let count = 0;
    if(slideCount === 5) {
      count = 0
    }else {
      count = slideCount + 1
    }
    setSlideCount(count)
    handleTabClick(count)
    my_swiper.slideNext()
  }

  const handlePrevSlide = () => {
    let count = 0;
    if(slideCount === 0) {
      count = 5
    }else {
      count = slideCount - 1
    }
    setSlideCount(count)
    handleTabClick(count)
    my_swiper.slidePrev()
  }

  return (
    <>
    <div className="xl:hidden xs:block">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        onInit={(ev) => {
          set_my_swiper(ev)
        }}
        allowTouchMove={false}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}
        loop={true}
        >

          {tabs.map((tab, index) => (
            <SwiperSlide key={index} className='flex justify-center text-white-pure'>
                <div  className="paragraph p1 py-2">
                    {tab.label}
                </div>
            </SwiperSlide>
          ))}

          <div onClick={handlePrevSlide} className="swiper-button-prev"></div>
          <div onClick={handleNextSlide} className="swiper-button-next"></div>
        </Swiper>
    </div>

    <div className="tab-container text-white-pure">
      <div className="tab-navigation">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`xl:inline-block xs:hidden ${index === activeTab ? 'active paragraph p1' : 'paragraph p1'}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
        
      </div>
      
      <div className="tab-content text-white-pure">
        <div>
          <h2 className="headings h4 tab-title text-center mt-20">{currentTab.title}</h2>
          <div className="grid xl:grid-cols-4 xs:grid-cols-1 xs:grid-rows-6 xl:grid-rows-1 gap-[25px] mt-10">
            {paginatedContent.map((member, index) => (
              <div className="flex justify-start" key={index}>
                <div className='flex gap-5'>
                  <img src={ member.image.asset.url } className='h-[160px] w-[160px]' alt={member.name} />
                  <div className='flex flex-col mt-5 text-left'>
                    <p className='paragraph p2'>{member.name}</p>
                    <p className='paragraph p2'>{member.teachingLevel}</p>
                    <p className='paragraph p2'>{member.advisory}</p>
                    <p className='paragraph p2'>{member.yearStarted}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      {pageCount > 1 && (
        <div className="pagination">
          {paginationIndicators}
        </div>
      )}
    </div>
    </>
  );
};

export default FacultyAndStaff;
