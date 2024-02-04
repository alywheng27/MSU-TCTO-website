import React, { useState } from 'react'

const SearchForm = (props) => {
  const [url, setUrl] = useState("")

  const { search } = props
  console.log(url)
  return (
    <>
        <input type="search" readOnly placeholder={search} id="" className="bg-transparent border xs:rounded-[20px] xl:rounded-[40px] xs:w-full xl:w-[960px]  xl:py-[25px] xs:py-[12px] pl-12 pr-4 text-center text-white-pure" />
        <img src="/images/search.png" alt="" className="absolute xl:top-[25px] xs:top-[12px] left-3 xs:block xl:hidden" />
    </>
  )
}

export default SearchForm