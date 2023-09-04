import React, { useEffect, useState } from 'react';
import '../styles/css/facultyStaff.css';

import { urlForImage } from '../api/api';

import { getFacultyAndStaff } from '../api/api';

const FacultyAndStaff = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
      label: 'IICT',
      title: 'Institute of Information and Communcations Technology',
      content: facultyStaffIICT,
    },
    {
      label: 'CAS',
      title: 'College of Arts and Sciences',
      content: facultyStaffCAS,
    },
    {
      label: 'COF',
      title: 'College of Fisheries',
      content: facultyStaffCOF,
    },
    {
      label: 'COED',
      title: 'college of Education',
      content: facultyStaffCOED,
    },
    {
      label: 'IOES',
      title: 'Institute of Environmental Science',
      content: facultyStaffIOES,
    },
    {
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
  const perPage = 12;
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

  return (
    <div className="tab-container text-white-pure">
      <div className="tab-navigation">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={index === activeTab ? 'active paragraph p1' : 'paragraph p1'}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content text-white-pure">
        <div>
          <h2 className="headings h4 tab-title text-center mt-20">{currentTab.title}</h2>
          <div className="grid grid-cols-4 gap-[25px] mt-10">
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
  );
};

export default FacultyAndStaff;
