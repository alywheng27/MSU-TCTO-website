import React, { useEffect, useState, useMemo } from 'react'

const PageSearch = (props) => {
  const [num, setNum] = useState([])
  
  const { articles, search, maxCount } = props
  const splitSearch = search.split('/')

  const count = Math.floor(maxCount / 10) + 1

  
  return (
    <>
      <div className="flex">
        <p className="paragraph text-titanium p2 mr-[30px] text-left">
            Page
        </p>
        {
          Array.from(Array(count), (e, i) => {
            {
              if(splitSearch[1] === undefined) {
                splitSearch[1] = 'All'
              }
            }

            if(splitSearch[2] === undefined) {
              splitSearch[2] = 1
            }

            const color = parseInt(splitSearch[2]) === (i + 1) ? "text-msu-crimson-ground" : "text-titanium"

            return <a href={"/search/"+splitSearch[0]+"/"+splitSearch[1]+"/"+(i+1)} key={i} className={"paragraph p2 mr-[20px] text-left " + color } >{i + 1}</a>
          })
        }
      </div>
    </>
  )
}

export default PageSearch