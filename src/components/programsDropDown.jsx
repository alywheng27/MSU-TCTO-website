import React, { useState } from 'react';

const ProgramsDropDown = () => {
  const [selectedOption, setSelectedOption] = useState('Option 1');
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  const getContent = () => {
    switch (selectedOption) {
      case 'Option 1':
        return <div>Content for Option 1</div>;
      case 'Option 2':
        return <div>Content for Option 2</div>;
      case 'Option 3':
        return <div>Content for Option 3</div>;
      default:
        return <div>No content available</div>;
    }
  };
  
  return (
    <div className="app-container">
      <div className="dropdown-container">
        <h2>Dropdown at the Top</h2>
        <select className='dropdown-program' value={selectedOption} onChange={handleOptionChange}>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
        <div className="arrow-down"></div>
      </div>
      <div className="content-container">
        <h2>Content Below</h2>
        {getContent()}
      </div>
    </div>
  );
};

export default ProgramsDropDown;