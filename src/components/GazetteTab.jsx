import React, { useEffect, useState } from 'react';
import '../styles/css/gazetteTab.css'

import { getYear } from '../js/date';

import { getYearGazette } from '../api/api';
import { getGazette } from '../api/api';

const GazetteTab = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [yearGazette, setYearGazette] = useState([]);
    const [gazette, setGazette] = useState([]);
    const [year, setYear] = useState(2023);

    useEffect(() => {
      const fetchData = async () => {
          const yearGazetteData = await getYearGazette();
          // console.log(yearGazetteData);
          setYearGazette(yearGazetteData);
      };

      fetchData();
    }, []);

    useEffect(() => {
      const fetchGazette = async () => {
          const gazetteData = await getGazette(year);
          // console.log();
          setGazette(gazetteData);
      };

      fetchGazette();
    }, [])
  
    const tabs = [
      { label: 'Tab 1', content: 'Content for Tab 1' },
      { label: 'Tab 2', content: 'Content for Tab 2' },
      { label: 'Tab 3', content: 'Content for Tab 3' },
    ];
  
    const handleTabClick = (index) => {
      setActiveTab(index);
      setYear(getYear(yearGazette[activeTab].publishedAt));

      const fetchGazette = async () => {
          const gazetteData = await getGazette(year);
          // console.log();
          setGazette(gazetteData);
      };

      fetchGazette();
    };
  
    return (
      <div className="tab-container">
        <div className="tab-navigation">
          {yearGazette.map((year, index) => (
            <button
              key={index}
              className={index === activeTab ? 'active' : ''}
              onClick={() => handleTabClick(index)}
            >
              { getYear(year.publishedAt) }
            </button>
          ))}
        </div>
        <div className="tab-content">
          { 
            // getYear(yearGazette[activeTab].publishedAt)
            gazette.map((gaz, index) => (
              <div className="">{ gaz.title }</div>
            ))
            
          }
        </div>
      </div>
    );
  };

export default GazetteTab