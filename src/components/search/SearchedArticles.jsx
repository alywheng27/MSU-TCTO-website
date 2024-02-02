import React from 'react'
import { getYear } from '../../js/date';
import { get3LettersMonth } from '../../js/date';
import { getDay } from '../../js/date';

const SearchedArticles = (props) => {
  const { articles } = props

  return (
    <>
      <div className="flex flex-col gap-[60px] ">
        <div className="flex flex-col ">   
          <div className="flex relative xl:mt-0 xs:mt-[15px] xl:w-fit xs:w-full xl:mb-[30px]">
              <input type="search" name="" value="Sample title search of a document, article, or event..." id="" className="bg-transparent border xs:rounded-[20px] xl:rounded-[40px] xs:w-full xl:w-[960px]  xl:py-[25px] xs:py-[12px] pl-12 pr-4 text-center text-white-pure" />
              <img src="/images/search.png" alt="" className="absolute xl:top-[25px] xs:top-[12px] left-3 xl:hidden xs:block" />
          </div>
  
          <div className="flex gap-[30px] mb-[10px]">  
            <p className="paragraph text-msu-crimson-ground p2 text-left xl:block xs:hidden">
                All
            </p> 
            <p className="paragraph text-titanium p2 text-left xl:block xs:hidden">
                Articles
            </p> 
            <p className="paragraph text-titanium p2 text-left xl:block xs:hidden">
                Events
            </p> 
            <p className="paragraph text-titanium p2 text-left xl:block xs:hidden">
                Gazette
            </p> 
            <p className="paragraph text-titanium p2 text-left xl:block xs:hidden">
                Reports
            </p> 
            <p className="paragraph text-titanium p2 text-left xl:block xs:hidden">
                Others
            </p> 
          </div>

          <div className="flex gap-[50px]">  
              <p className="paragraph text-titanium p2 mb-[20px] text-left xl:block xs:hidden">
                  3,691 results
              </p> 
              <p className="paragraph text-titanium p2 mb-[20px] text-left xl:block xs:hidden">
                  Sort by date
              </p> 
          </div>
        </div>
        <div className="flex flex-col gap-[40px]">
          {
            articles.map((article) => (
              <div className="flex flex-col gap-[10px]">
                  <a href={`/${article.slug.current}`}>
                      <h5 className="headings text-white-pure hover:text-msu-maroon hover:underline h5 mb-[10px] text-left">
                          { article.title }
                      </h5>     
                  </a>
                  <p className="paragraph text-titanium p2 text-left">
                      { article.body[0].children[0].text }
                  </p>
                  <div className="flex gap-[20px]">
                      <p className="paragraph text-titanium p2 mb-[20px] text-left">
                          { article.category.category }
                      </p> 
                      <p className="paragraph text-titanium p2 mb-[20px] text-left">
                          { getYear(article.publishedAt) } { get3LettersMonth(article.publishedAt) } { getDay(article.publishedAt) }
                      </p> 
                  </div>
              </div>
            ))
          }
        </div>
        <div className="flex">
          <p className="paragraph text-titanium p2 mr-[30px] text-left">
              Page
          </p> 
          <p className="paragraph text-msu-crimson-ground p2 mr-[20px] text-left">
              1
          </p> 
          <p className="paragraph text-titanium p2 mr-[20px] text-left">
              2
          </p> 
          <p className="paragraph text-titanium p2 mr-[20px] text-left">
              3
          </p> 
          <p className="paragraph text-titanium p2 mr-[20px] text-left">
              4
          </p> 
          <p className="paragraph text-titanium p2 mr-[20px] text-left">
              5
          </p> 
          <p className="paragraph text-titanium p2 mr-[20px] text-left">
              6
          </p> 
          <p className="paragraph text-titanium p2 mr-[20px] text-left">
              7
          </p> 
          <p className="paragraph text-titanium p2 mr-[20px] text-left">
              8
          </p>
        </div>
      </div>
    </>
  )
}

export default SearchedArticles