import React from 'react'

const HeroMainHeading = () => {
  return (
    <div className="absolute z-10 xl:top-[578px] xs:top-[490px] xl:w-[769px] xl:mx-[12.5%] xs:mx-[3.85%]">
      <h3 className="headings xl:h3 xs:h4">
          Four decades of steadfast
          Excellence in Marine Sciences
      </h3>
      <div className="mt-5 flex xl:flex-row xs:flex-col">
        <a href="#" className="bg-msu-maroon text-white-pure xl:py-[14.5px] xs:py-5 xl:w-[360px] text-center rounded-[40px] paragraph xl:p1 xs:p2">Enroll Now</a>
        <a href="#" className="text-white-pure xl:py-[14.5px] xs:py-5 xl:w-[360px] text-center rounded-[40px] xl:ml-10 xl:mt-0 xs:mt-[10px] paragraph xl:p1 xs:p2 border">Our Course Offerings</a>
      </div>
    </div>
  )
}

export default HeroMainHeading