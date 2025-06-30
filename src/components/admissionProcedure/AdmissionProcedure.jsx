import React, { useState, useReducer } from 'react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiChevronLeft, FiDownload } from 'react-icons/fi';

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
  const [hoveredStep, setHoveredStep] = useState(null);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const scaleUp = {
    hover: { scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }
  };

  // Step details
  const freshmenSteps = [
    {
      step: '01',
      title: 'Document Submission',
      description: 'Present the documents above to the attending admission personnel. Secure an Application for Admission form. There is an express lane for persons with disabilities in all the steps enumerated for the admission process.',
      icon: '📄'
    },
    {
      step: '02',
      title: 'Medical Examination',
      description: 'See the college physician at the College Infirmary for medical examination and from whom you secure a medical clearance to be presented to the admissions personnel.',
      icon: '🏥'
    },
    {
      step: '03',
      title: 'Career Guidance',
      description: 'Proceed to the Guidance Counselor for career guidance and psychometric test.',
      icon: '🧠'
    },
    {
      step: '04',
      title: 'Application Completion',
      description: 'Accomplish Application for Admission, making sure all solicited information is filled up as completely and accurately as possible. Incompletely filled up or unsigned forms will be returned.',
      icon: '✍️'
    },
    {
      step: '05',
      title: 'Admission Notice',
      description: 'Secure Notice of Admission. You may now proceed and present your Notice of Admission to the registration adviser for the course you intend to enroll in.',
      icon: '📝'
    },
    {
      step: '06',
      title: 'Final Registration',
      description: 'Complete your registration with the assigned adviser and submit all required documents.',
      icon: '🎓'
    },
  ];

  const returnSteps = [
    {
      step: '01',
      title: 'Grade Submission',
      description: 'Present your official copy of grades (with photocopy) for the latest semester to the admission personnel.',
      icon: '📊'
    },
    {
      step: '02',
      title: 'Application Form',
      description: 'Secure and fill-up an Application for Shifting/Re-admission form.',
      icon: '📑'
    },
    {
      step: '03',
      title: 'Guidance Session',
      description: 'Proceed to the Guidance Counselor for career guidance and psychometric test.',
      icon: '🧑‍🏫'
    },
    {
      step: '04',
      title: 'Adviser Approval',
      description: 'Bring the endorsed Application for Shifting/Re-admission to the appropriate registration adviser for action. (Your application will either be approved or disapproved depending on whether you are able to meet the required CGPA for the concerned program)',
      icon: '✅'
    },
    {
      step: '05',
      title: 'Final Submission',
      description: 'Bring back the approved Application for Shifting/Re-admission to the Admissions Office.',
      icon: '📤'
    },
    {
      step: '06',
      title: 'Department Processing',
      description: 'Proceed to the respective department for final processing and enrollment.',
      icon: '🏛️'
    },
  ];

  const feesData = [
    { name: 'Tuition Fees', amount: 'Php 50.00 / unit' },
    { name: 'Athletic Fees', amount: 'Php 50.00' },
    { name: 'CDF', amount: 'Php 20.00' },
    { name: 'SPEAR', amount: 'Php 50.00' },
    { name: 'ROTC / CWTS', amount: 'Php 100.00' },
    { name: 'Speech Laboratory', amount: 'Php 150.00' },
  ];

  return (
    <div className="min-h-screen bg-white px-[5%] xl:pt-[80px] xs:pt-[60px] pb-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-msu-maroon mb-4">Admission Procedures</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your journey to academic excellence starts here. Explore our streamlined admission process.
        </p>
      </motion.div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        {/* Swiper for Mobile */}
        <div className="xl:hidden xs:block py-6 px-4">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            effect="fade"
            spaceBetween={50}
            slidesPerView={1}
            onInit={(ev) => set_my_swiper(ev)}
            allowTouchMove={false}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            {AdmissionProcedureTab.map((tab, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center">
                  <motion.div 
                    className="bg-msu-maroon text-white rounded-full px-6 py-2 font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tab.label}
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
            <div onClick={handlePrevSlide} className="swiper-button-prev text-msu-maroon hover:text-msu-dark-maroon"></div>
            <div onClick={handleNextSlide} className="swiper-button-next text-msu-maroon hover:text-msu-dark-maroon"></div>
          </Swiper>
        </div>

        {/* Desktop Layout */}
        <div className="flex flex-col xl:flex-row">
          {/* Sidebar for Desktop */}
          <div className="xl:w-1/4 xs:w-full bg-gray-50 p-6 border-r border-gray-200">
            <motion.div 
              className="flex flex-col gap-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.button
                onClick={() => dispatch({ type: 'freshmenAndTransferee' })}
                className={`text-left p-4 rounded-xl transition-all flex items-center ${state.freshmenAndTransferee ? 'bg-msu-maroon text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <span className="mr-3 text-xl">🎓</span>
                Freshmen & Transferee
              </motion.button>
              
              <motion.button
                onClick={() => dispatch({ type: 'returningShiftingAndRemedial' })}
                className={`text-left p-4 rounded-xl transition-all flex items-center ${state.returningShiftingAndRemedial ? 'bg-msu-maroon text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <span className="mr-3 text-xl">🔄</span>
                Returning, Shifting & Remedial
              </motion.button>
              
              <motion.button
                onClick={() => dispatch({ type: 'studentFees' })}
                className={`text-left p-4 rounded-xl transition-all flex items-center ${state.studentFees ? 'bg-msu-maroon text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <span className="mr-3 text-xl">💲</span>
                Student Fees
              </motion.button>

              <motion.div 
                className="mt-8 p-4 bg-white rounded-xl border border-msu-maroon"
                variants={itemVariants}
              >
                <h4 className="text-msu-maroon font-bold mb-2">Need Help?</h4>
                <p className="text-gray-600 text-sm mb-3">Contact our admission office for assistance.</p>
                <button className="bg-msu-maroon text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-msu-dark-maroon transition-all">
                  Contact Us
                </button>
              </motion.div>

              <motion.div 
                className="p-4 bg-white rounded-xl border border-msu-maroon"
                variants={itemVariants}
              >
                <h4 className="text-msu-maroon font-bold mb-2">Download Forms</h4>
                <div className="flex flex-col gap-2">
                  <a href="#" className="text-gray-700 text-sm flex items-center hover:text-msu-maroon">
                    <FiDownload className="mr-2" /> Application Form
                  </a>
                  <a href="#" className="text-gray-700 text-sm flex items-center hover:text-msu-maroon">
                    <FiDownload className="mr-2" /> Medical Form
                  </a>
                  <a href="#" className="text-gray-700 text-sm flex items-center hover:text-msu-maroon">
                    <FiDownload className="mr-2" /> Fee Structure
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="xl:w-3/4 xs:w-full p-8 bg-white">
            <AnimatePresence mode="wait">
              {/* Freshmen & Transferee Content */}
              {state.freshmenAndTransferee && (
                <motion.div
                  key="freshmenAndTransferee"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    <motion.h2 className="text-3xl font-bold text-msu-maroon mb-6" variants={itemVariants}>
                      Freshmen & Transferee Admission
                    </motion.h2>
                    
                    <motion.div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200" variants={itemVariants}>
                      <h3 className="text-xl font-semibold text-msu-maroon mb-4">Required Documents</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-3">For Freshmen:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span className="text-gray-700">Senior High School Report Card (Form 138-A)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span className="text-gray-700">MSU SASE Report of Rating (with passing score)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span className="text-gray-700">PSA/NSO-Authenticated Birth Certificate (original)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span className="text-gray-700">Certificate of Good Moral Character</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-3">For Transferees:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span className="text-gray-700">Honorable Dismissal</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span className="text-gray-700">Transcript of Records (TOR)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span className="text-gray-700">PSA/NSO-Authenticated Birth Certificate (original)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span className="text-gray-700">MSU SASE Report of Rating (with passing score)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    <motion.h3 className="text-2xl font-bold text-msu-maroon mb-6" variants={itemVariants}>
                      Admission Process Steps
                    </motion.h3>

                    <motion.div 
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={containerVariants}
                    >
                      {freshmenSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          className={`bg-white p-6 rounded-xl shadow-md cursor-pointer border border-gray-200 hover:border-msu-maroon ${hoveredStep === index ? 'ring-2 ring-msu-maroon' : ''}`}
                          variants={itemVariants}
                          whileHover="hover"
                          variants={scaleUp}
                          onMouseEnter={() => setHoveredStep(index)}
                          onMouseLeave={() => setHoveredStep(null)}
                        >
                          <div className="flex items-start">
                            <div className="bg-msu-maroon text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">
                              {step.step}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                                <span className="mr-2">{step.icon}</span>
                                {step.title}
                              </h4>
                              <p className="text-gray-600 mt-2 text-sm">{step.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Returning, Shifting & Remedial Content */}
              {state.returningShiftingAndRemedial && (
                <motion.div
                  key="returningShiftingAndRemedial"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    <motion.h2 className="text-3xl font-bold text-msu-maroon mb-6" variants={itemVariants}>
                      Returning, Shifting & Remedial Programs
                    </motion.h2>
                    
                    <motion.div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200" variants={itemVariants}>
                      <h3 className="text-xl font-semibold text-msu-maroon mb-4">For Returning and Shifting Students</h3>
                      <p className="text-gray-700 mb-4">
                        Students who wish to return after a leave of absence or shift to another program must follow these procedures.
                      </p>
                    </motion.div>

                    <motion.h3 className="text-2xl font-bold text-msu-maroon mb-6" variants={itemVariants}>
                      Process Steps
                    </motion.h3>

                    <motion.div 
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                      variants={containerVariants}
                    >
                      {returnSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          className={`bg-white p-6 rounded-xl shadow-md cursor-pointer border border-gray-200 hover:border-msu-maroon ${hoveredStep === index+6 ? 'ring-2 ring-msu-maroon' : ''}`}
                          variants={itemVariants}
                          whileHover="hover"
                          variants={scaleUp}
                          onMouseEnter={() => setHoveredStep(index+6)}
                          onMouseLeave={() => setHoveredStep(null)}
                        >
                          <div className="flex items-start">
                            <div className="bg-msu-maroon text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">
                              {step.step}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                                <span className="mr-2">{step.icon}</span>
                                {step.title}
                              </h4>
                              <p className="text-gray-600 mt-2 text-sm">{step.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div 
                      className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200"
                      variants={itemVariants}
                    >
                      <h3 className="text-xl font-semibold text-msu-maroon mb-4">Remedial Program</h3>
                      <p className="text-gray-700">
                        The MSU-Tawi-Tawi, in order to accommodate those whose scores are a little lower than the median, has been implementing the so-called Remedial Program wherein for the first semester of the student's stay on campus, he is enrolled in a 9-hour per week remedial Math and another 9-hour per week remedial English. (Only upon passing both subjects is the student deemed qualified to be treated as a regular student.)
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Student Fees Content */}
              {state.studentFees && (
                <motion.div
                  key="studentFees"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    <motion.h2 className="text-3xl font-bold text-msu-maroon mb-6" variants={itemVariants}>
                      Student Fees Structure
                    </motion.h2>
                    
                    <motion.div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200" variants={itemVariants}>
                      <h3 className="text-xl font-semibold text-msu-maroon mb-4">For Student Fees (BOR RES #50, Series 2005)</h3>
                      <p className="text-gray-700 mb-4">
                        Below is the complete breakdown of fees for all students. Fees are subject to change without prior notice.
                      </p>
                    </motion.div>

                    <motion.div 
                      className="overflow-hidden rounded-xl shadow-lg"
                      variants={itemVariants}
                    >
                      <table className="w-full">
                        <thead>
                          <tr className="bg-msu-maroon text-white">
                            <th className="py-4 px-6 text-left font-bold">Fee Description</th>
                            <th className="py-4 px-6 text-right font-bold">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {feesData.map((fee, index) => (
                            <tr 
                              key={index} 
                              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
                            >
                              <td className="py-4 px-6 text-gray-700">{fee.name}</td>
                              <td className="py-4 px-6 text-right text-msu-maroon font-medium">{fee.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>

                    <motion.div 
                      className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200"
                      variants={itemVariants}
                    >
                      <h3 className="text-xl font-semibold text-msu-maroon mb-4">Payment Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">Payment Methods:</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center">
                              <span className="bg-msu-maroon text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                              Cash payment at the Cashier's Office
                            </li>
                            <li className="flex items-center">
                              <span className="bg-msu-maroon text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                              Bank transfer (details available at the Finance Office)
                            </li>
                            <li className="flex items-center">
                              <span className="bg-msu-maroon text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                              Online payment portal (coming soon)
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">Important Notes:</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span>All fees must be paid before enrollment</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span>Late payments may incur additional charges</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon mr-2">•</span>
                              <span>Scholarship students should present their scholarship documents</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}