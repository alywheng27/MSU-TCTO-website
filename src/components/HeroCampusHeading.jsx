import React from 'react'

const HeroCampusHeading = () => {
  return (
    <div className="relative z-10 xl:bottom-[250px] xs:bottom-[150px] h-[80px] xl:mx-[12.5%] xs:mx-[3.85%]">
      <h5 className="headings xl:h4 xs:h5 text-center">
        Welcome to the<br />
        Mindanao State University<br />
        Tawi-Tawi College of Technology & Oceanography
      </h5>
      
      <p className="paragraph p2 py-[100px] text-titanium xs:hidden xl:block"><a href="/">Home</a> / The Campus</p>
    </div>
  )
}

export default HeroCampusHeading