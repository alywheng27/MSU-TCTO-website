import React, { useState, useReducer } from 'react'

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const reducer = (state, action) => {
  switch (action.type) {
    case 'freshmenAndTransferee':
      return {freshmenAndTransferee: true, returningShiftingAndRemedial: false, studentFees: false}
    case 'returningShiftingAndRemedial':
      return {freshmenAndTransferee: false, returningShiftingAndRemedial: true, studentFees: false}
    case 'studentFees':
      return {freshmenAndTransferee: false, returningShiftingAndRemedial: false, studentFees: true}
    default:
      return state
  }
}

export default function AdmissionProcedure() {
  const [state, dispatch] = useReducer(reducer, {freshmenAndTransferee: true, returningShiftingAndRemedial: false, studentFees: false})
  const [my_swiper, set_my_swiper] = useState({})

  const AdmissionProcedureTab = [
    {
      tabId: 1,
      label: 'Freshmen & Transferee',
    },
    {
      tabId: 2,
      label: 'Returning, Shifting & Remedial Programs',
    },
    {
      tabId: 3,
      label: 'Student Fees'
    },
  ]

  const handleNextSlide = () => {
    if(state.freshmenAndTransferee) {
      dispatch({type: 'returningShiftingAndRemedial'})
    }else if(state.returningShiftingAndRemedial) {
      dispatch({type: 'studentFees'})
    }else if(state.studentFees) {
      dispatch({type: 'freshmenAndTransferee'})
    }

    my_swiper.slideNext()
  }

  const handlePrevSlide = () => {
    if(state.freshmenAndTransferee) {
      dispatch({type: 'studentFees'})
    }else if(state.returningShiftingAndRemedial) {
      dispatch({type: 'freshmenAndTransferee'})
    }else if(state.studentFees) {
      dispatch({type: 'returningShiftingAndRemedial'})
    }

    my_swiper.slidePrev()
  }

  return (
    <div class="bg-msu-maroon px-[12.5%] xl:pt-[80px] xs:pt-[40px]">
			<div class="item-center">
				<h3 class="headings text-center xl:text-white-pure xs:text-msu-golden-fog xl:h3 xs:h5">Admission Procedures</h3>
			</div>
      <div className='xl:hidden xs:block mt-8'>
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

          {AdmissionProcedureTab.map((tab, index) => (
            <SwiperSlide key={index}>
                <div className='flex justify-center text-white-pure'>
                  <p className="paragraph p2 py-1 text-center w-40">
                      {tab.label}
                  </p>
                </div>
            </SwiperSlide>
          ))}

          <div onClick={handlePrevSlide} className="swiper-button-prev" style={{color: "white"}}></div>
          <div onClick={handleNextSlide} className="swiper-button-next" style={{color: "white"}}></div>
        </Swiper>
      </div>
			
			<div class="mt-[27px]">
				<div class="flex">
					<div class="xl:flex xs:hidden flex-col gap-[5px] mr-24">
						<div class="flex flex-col gap-[20px] paragraph p1 text-msu-crimson-ground text-left mt-[26px]">
							<button onClick={() => {
                dispatch({type: 'freshmenAndTransferee'})
              }} className={`w-[250px] ${state.freshmenAndTransferee && 'text-white-pure' }`}>Freshmen & Transferee</button>
							<button onClick={() => {
                dispatch({type: 'returningShiftingAndRemedial'})
              }} className={`w-[250px] ${state.returningShiftingAndRemedial && 'text-white-pure' }`}>Returning, Shifting & Remedial Programs</button>
							<button onClick={() => {
                dispatch({type: 'studentFees'})
              }} className={`w-[250px] ${state.studentFees && 'text-white-pure' }`}>Student Fees</button>
						</div>
					</div>

					<div class="gap-[10px]">
            { state.freshmenAndTransferee && 
              <>
                <div class="xs:mb-[50px]">
                  {/* <!-- <h4 class="headings xl:h4 xs:h6 text-white-pure mt-5">THE ADMISSION PROCESS </h4> --> */}
                  <div class="flex flex-col gap-[5px] paragraph p2 text-white-pure">
                    <p class="paragraph xl:p1 xs:p3 text-silver pt-[27px]">
                      For admission, prospective students should bring a short brown envelope, 3 copies of 2X2 ID pictures (recently taken close-up shot) and the following documents (with 2 photocopies of each):  
                    </p>
                    <a href="#" id="freshmen" class="headings xl:h4 xs:h6 text-white-pure ml-[50px] mt-[25px]">A.	FOR FRESHMEN:   </a>
                      <p class="paragraph xl:p1 xs:p2 text-silver mt-[5px] ml-[100px]">
                      1.	Senior High School Report Card (Form 138-A)<br />  
                      2.	MSU SASE Report of Rating (with passing score) <br />
                      3.	PSA/NSO-Authenticated Birth Certificate (original) <br />
                      4.	Certificate of Good Moral Character   <br />
                      </p>
                    <a href="#" id="transferee" class="headings xl:h4 xs:h6 text-white-pure ml-[50px] mt-[25px]">B.	FOR TRANSFEREE:   </a>
                      <p class="paragraph xl:p1 xs:p2 text-silver mt-[5px] ml-[100px]">
                        1.	Honorable Dismissal  <br />
                        2.	Transcript of Records (TOR)  <br />
                        3.	PSA/ NSO-Authenticated Birth Certificate (original); and  <br />
                        4. MSU SASE Report of Rating (with passing score)     <br />
                      </p>
                  </div>
                </div>

                <div className='grid xl:grid-cols-3 xs:grid-cols-2 xl:gap-0 xs:gap-2'>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 01</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Present the documents above to the attending admission personnel. Secure an Application for Admission form. There is an express lane for persons with disabilities in all the steps enumerated for the admission process. </p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 02</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">See the college physician at the College Infirmary for medical examination and from whom you secure a medical clearance to be presented to the admissions personnel.</p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 03</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Proceed to the Guidance Counselor for career guidance and psychometric test.</p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 04</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Accomplish Application for Admission, making sure all solicited information is filled up as completely and accurately as possible. Incompletely filled up or unsigned forms will be returned.  </p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 05</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Secure Notice of Admission. You may now proceed and present your Notice of Admission to the registration adviser for the course you intend to enroll in.  </p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 06</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Step details, where to go and who to approach</p>
                  </div>
                </div>
              </>
            }

            { state.returningShiftingAndRemedial &&
              <>
                <div class="xs:mb-[50px]" id="shifting">
                  {/* <!-- <h4 class="headings xl:h4 xs:h6 text-white-pure mt-5">THE ADMISSION PROCESS </h4> --> */}
                  <div class="paragraph p2 text-white-pure xl:mt-[30px] xs:mt-[25px]">
                    <a href="#" class="headings xl:h4 xs:h6 text-white-pure mt-[25px]">C.	FOR RETURNING AND SHIFTING STUDENTS </a>
                  </div>
                </div>
                <div className='grid xl:grid-cols-3 xs:grid-cols-2'>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 01</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Present your official copy of grades (with photocopy) for the latest semester to the admission personnel.  </p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 02</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]"> Secure and fill-up an Application for Shifting/Re-admission form.  </p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 03</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Proceed to the Guidance Counselor for career guidance and psychometric test. </p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 04</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Bring the endorsed Application for Shifting/Re-admission to the appropriate registration adviser for action. (Your application will either be approved or disapproved depending on whether you are able to meet the required CGPA for the concerned program)  </p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 05</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Bring back the approved Application for Shifting/Re-admission to the Admissions Office. </p>
                  </div>
                  <div class=" bg-gradient-rusty-red p-10">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step 06</p>
                    <p class="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">Proceed to the respective department. </p>
                  </div>
                </div>

                <div class="xs:mb-[50px] mt-16" id="remedial">
                  {/* <!-- <h4 class="headings xl:h4 xs:h6 text-white-pure mt-5">THE ADMISSION PROCESS </h4> --> */}
                  <div class="paragraph p2 text-white-pure xl:mt-[10px] xs:mt[18px]">
                    <a href="#" class="headings xl:h4 xs:h6 text-white-pure mt-[25px]">D.	FOR REMEDIAL PROGRAM </a>
            
                    <p class="paragraph text-silver xl:p1 xs:p3 pt-[27px]">
                      The MSU-Tawi-Tawi , in order to accommodate those whose scores are a little lower than the median, has been implementing the so-called Remedial Program wherein for the first semester of the student’s stay in the campus he is enrolled in a 9-hour per week remedial Math and another 9-hour per week remedial English. (Only upon passing both subjects is the student deemed qualified to be treated as a regular student)
                    </p>
                  </div>
                </div>
              </>
            }
						
            { state.studentFees &&
              <>
                <div class="xs:mb-[50px]" id="fees">
                  {/* <!-- <h4 class="headings xl:h4 xs:h6 text-white-pure mt-5">THE ADMISSION PROCESS </h4> --> */}
                  <div class="paragraph p2 text-white-pure xl:mt-[30px] xs:mt-[25px]">
                    <a href="#" class="headings xl:h4 xs:h6 text-white-pure mt-[25px]">E.	FOR STUDENT FEES (BOR RES #50, Series 2005) </a>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div class=" bg-maroon py-[20px] border border-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">Tuition Fees</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border bg-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">Php 50.00 / unit</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border border-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">Athletic Fees</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border bg-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">Php 50.00</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border border-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">CDF</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border bg-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">Php 20.00</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border border-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">SPEAR</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border bg-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">Php 50.00</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border border-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">ROTC / CWTS</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border bg-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">Php 100.00</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border border-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">Speech Laboratory</p>
                  </div>
                  <div class=" bg-maroon py-[20px] border bg-msu-rusty-red">
                    <p class="paragraph xl:p1 xs:p2 text-white-pure ml-[50px] mr-[50px]">Php 150.00</p>
                  </div>
                </div>
              </>
            }
						
					</div>
				</div>
			</div>
			<div class="text-center pb-[60px]">
				{/* <!-- <p class="paragraph text-white-pure xl:p1 xs:p2 pt-20 mb-5">Need clarifications or help?</p>
				<a href="" class="bg-transparent border paragraph  xl:p1 xs:p2  gap-10 text-white-pure py-[10.5px] px-[60px] rounded-[40px]">Contact us now!</a> --> */}
			</div>
		</div>
  )
}
