import React, { useState, useReducer } from 'react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { motion, AnimatePresence } from 'framer-motion'; // For animations

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'freshmenAndTransferee':
      return { freshmenAndTransferee: true, returningShiftingAndRemedial: false, studentFees: false };
    case 'returningShiftingAndRemedial':
      return { freshmenAndTransferee: false, returningShiftingAndRemedial: true, studentFees: false };
    case 'studentFees':
      return { freshmenAndTransferee: false, returningShiftingAndRemedial: false, studentFees: true };
    default:
      return state;
  }
};

export default function AdmissionProcedure() {
  const [state, dispatch] = useReducer(reducer, { freshmenAndTransferee: true, returningShiftingAndRemedial: false, studentFees: false });
  const [my_swiper, set_my_swiper] = useState({});

  const AdmissionProcedureTab = [
    { tabId: 1, label: 'Freshmen & Transferee' },
    { tabId: 2, label: 'Returning, Shifting & Remedial Programs' },
    { tabId: 3, label: 'Student Fees' },
  ];

  const handleNextSlide = () => {
    if (state.freshmenAndTransferee) {
      dispatch({ type: 'returningShiftingAndRemedial' });
    } else if (state.returningShiftingAndRemedial) {
      dispatch({ type: 'studentFees' });
    } else if (state.studentFees) {
      dispatch({ type: 'freshmenAndTransferee' });
    }
    my_swiper.slideNext();
  };

  const handlePrevSlide = () => {
    if (state.freshmenAndTransferee) {
      dispatch({ type: 'studentFees' });
    } else if (state.returningShiftingAndRemedial) {
      dispatch({ type: 'freshmenAndTransferee' });
    } else if (state.studentFees) {
      dispatch({ type: 'returningShiftingAndRemedial' });
    }
    my_swiper.slidePrev();
  };

  // Animation variants for content sections
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Step details for Freshmen & Transferee
  const freshmenSteps = [
    {
      step: '01',
      description:
        'Present the documents above to the attending admission personnel. Secure an Application for Admission form. There is an express lane for persons with disabilities in all the steps enumerated for the admission process.',
    },
    {
      step: '02',
      description:
        'See the college physician at the College Infirmary for medical examination and from whom you secure a medical clearance to be presented to the admissions personnel.',
    },
    {
      step: '03',
      description: 'Proceed to the Guidance Counselor for career guidance and psychometric test.',
    },
    {
      step: '04',
      description:
        'Accomplish Application for Admission, making sure all solicited information is filled up as completely and accurately as possible. Incompletely filled up or unsigned forms will be returned.',
    },
    {
      step: '05',
      description:
        'Secure Notice of Admission. You may now proceed and present your Notice of Admission to the registration adviser for the course you intend to enroll in.',
    },
    {
      step: '06',
      description: 'Step details, where to go and who to approach.',
    },
  ];

  // Step details for Returning, Shifting & Remedial Programs
  const returnSteps = [
    {
      step: '01',
      description:
        'Present your official copy of grades (with photocopy) for the latest semester to the admission personnel.',
    },
    {
      step: '02',
      description:
        'Secure and fill-up an Application for Shifting/Re-admission form.',
    },
    {
      step: '03',
      description: 'Proceed to the Guidance Counselor for career guidance and psychometric test.',
    },
    {
      step: '04',
      description:
        'Bring the endorsed Application for Shifting/Re-admission to the appropriate registration adviser for action. (Your application will either be approved or disapproved depending on whether you are able to meet the required CGPA for the concerned program)',
    },
    {
      step: '05',
      description:
        'Bring back the approved Application for Shifting/Re-admission to the Admissions Office.',
    },
    {
      step: '06',
      description: 'Proceed to the respective department.',
    },
  ];

  return (
    <div className="bg-msu-maroon px-[12.5%] xl:pt-[80px] xs:pt-[40px]">
      <div className="item-center">
        <h3 className="headings text-center xl:text-white-pure xs:text-msu-golden-fog xl:h3 xs:h5">Admission Procedures</h3>
      </div>

      {/* Swiper for Mobile */}
      <div className="xl:hidden xs:block mt-8">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          onInit={(ev) => set_my_swiper(ev)}
          allowTouchMove={false}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          {AdmissionProcedureTab.map((tab, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center text-white-pure">
                <p className="paragraph p2 py-1 text-center w-40">{tab.label}</p>
              </div>
            </SwiperSlide>
          ))}
          <div onClick={handlePrevSlide} className="swiper-button-prev" style={{ color: 'white' }}></div>
          <div onClick={handleNextSlide} className="swiper-button-next" style={{ color: 'white' }}></div>
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="mt-[27px]">
        <div className="flex">
          {/* Sidebar for Desktop */}
          <div className="xl:flex xs:hidden flex-col gap-[5px] mr-24">
            <div className="flex flex-col gap-[20px] paragraph p1 text-msu-crimson-ground text-left mt-[26px]">
              <button
                onClick={() => dispatch({ type: 'freshmenAndTransferee' })}
                className={`w-[250px] transition-all hover:text-white-pure ${
                  state.freshmenAndTransferee ? 'text-white-pure font-bold' : 'text-msu-crimson-ground'
                }`}
              >
                Freshmen & Transferee
              </button>
              <button
                onClick={() => dispatch({ type: 'returningShiftingAndRemedial' })}
                className={`w-[250px] transition-all hover:text-white-pure ${
                  state.returningShiftingAndRemedial ? 'text-white-pure font-bold' : 'text-msu-crimson-ground'
                }`}
              >
                Returning, Shifting & Remedial Programs
              </button>
              <button
                onClick={() => dispatch({ type: 'studentFees' })}
                className={`w-[250px] transition-all hover:text-white-pure ${
                  state.studentFees ? 'text-white-pure font-bold' : 'text-msu-crimson-ground'
                }`}
              >
                Student Fees
              </button>
            </div>
          </div>

          {/* Content Sections with Animations */}
          <div className="gap-[10px]">
            <AnimatePresence mode="wait">
              {state.freshmenAndTransferee && (
                <motion.div
                  key="freshmenAndTransferee"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                >
                  <div className="xs:mb-[50px]">
                    <div className="flex flex-col gap-[5px] paragraph p2 text-white-pure">
                      <p className="paragraph xl:p1 xs:p3 text-silver pt-[27px]">
                        For admission, prospective students should bring a short brown envelope, 3 copies of 2X2 ID pictures (recently taken close-up shot) and the following documents (with 2 photocopies of each):
                      </p>
                      <a href="#" id="freshmen" className="headings xl:h4 xs:h6 text-white-pure ml-[50px] mt-[25px]">
                        A. FOR FRESHMEN:
                      </a>
                      <p className="paragraph xl:p1 xs:p2 text-silver mt-[5px] ml-[100px]">
                        1. Senior High School Report Card (Form 138-A)<br />
                        2. MSU SASE Report of Rating (with passing score) <br />
                        3. PSA/NSO-Authenticated Birth Certificate (original) <br />
                        4. Certificate of Good Moral Character <br />
                      </p>
                      <a href="#" id="transferee" className="headings xl:h4 xs:h6 text-white-pure ml-[50px] mt-[25px]">
                        B. FOR TRANSFEREE:
                      </a>
                      <p className="paragraph xl:p1 xs:p2 text-silver mt-[5px] ml-[100px]">
                        1. Honorable Dismissal <br />
                        2. Transcript of Records (TOR) <br />
                        3. PSA/ NSO-Authenticated Birth Certificate (original); and <br />
                        4. MSU SASE Report of Rating (with passing score) <br />
                      </p>
                    </div>
                  </div>

                  {/* Your Provided Grid Section */}
                  <div className="grid xl:grid-cols-3 xs:grid-cols-2 xl:gap-0 xs:gap-2">
                    {freshmenSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-rusty-red p-10 hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                      >
                        <p className="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step {step.step}</p>
                        <p className="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">{step.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {state.returningShiftingAndRemedial && (
                <motion.div
                  key="returningShiftingAndRemedial"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                >
                  {/* Content for Returning, Shifting & Remedial Programs */}
                  <div className="xs:mb-[50px]" id="shifting">
                    <div className="paragraph p2 text-white-pure xl:mt-[30px] xs:mt-[25px]">
                      <a href="#" className="headings xl:h4 xs:h6 text-white-pure mt-[25px]">
                        C. FOR RETURNING AND SHIFTING STUDENTS
                      </a>
                    </div>
                  </div>
                  <div className="grid xl:grid-cols-3 xs:grid-cols-2">
                    {returnSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-rusty-red p-10 hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                      >
                        <p className="paragraph xl:p1 xs:p2 text-white-pure mt-[5px]">Step {step.step}</p>
                        <p className="paragraph xl:p2 xs:p3 text-white-pure mt-[5px]">{step.description}</p>
                      </motion.div>
                    ))}
                  
                </div>
                       {/* D. FOR REMEDIAL PROGRAM */}
                    <div className="xs:mb-[50px]" id="remedial">
                    <div className="paragraph p2 text-white-pure xl:mt-[30px] xs:mt-[25px]">
                      <a href="#" className="headings xl:h4 xs:h6 text-white-pure mt-[25px]">
                        D. FOR REMEDIAL PROGRAM
                      </a>

                    <p className="flex flex-col gap-[7px] paragraph p2 text-white-pure mt-4">
                      The MSU-Tawi-Tawi, in order to accommodate those whose scores are a little lower than the median, has been implementing the so-called Remedial Program wherein for the first semester of the student’s stay on campus, he is enrolled in a 9-hour per week remedial Math and another 9-hour per week remedial English. (Only upon passing both subjects is the student deemed qualified to be treated as a regular student.)
                    </p>
                  </div>
                </div>
                </motion.div>
              )}
     


              {state.studentFees && (
                <motion.div
                  key="studentFees"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                >
                  {/* Content for Student Fees */}
                  <div className="xs:mb-[50px]" id="fees">
                    <div className="paragraph p2 text-white-pure xl:mt-[30px] xs:mt-[25px]">
                      <a href="#" className="headings xl:h4 xs:h6 text-white-pure mt-[25px]">
                        E. FOR STUDENT FEES (BOR RES #50, Series 2005)
                      </a>
                      
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    {/* Student Fees Grid Content */}
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
                  <br />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}