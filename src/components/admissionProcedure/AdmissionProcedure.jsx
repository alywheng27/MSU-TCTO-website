import React, { useState, useReducer } from 'react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiDownload, FiExternalLink, FiInfo, FiMail, FiPhone } from 'react-icons/fi';

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
  const [activeAccordion, setActiveAccordion] = useState(null);

  const AdmissionProcedureTab = [
    { tabId: 1, label: 'Freshmen & Transferee' },
    { tabId: 2, label: 'Returning, Shifting & Remedial' },
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
    my_swiper?.slideNext?.();
  };

  const handlePrevSlide = () => {
    if (state.freshmenAndTransferee) {
      dispatch({ type: 'studentFees' });
    } else if (state.returningShiftingAndRemedial) {
      dispatch({ type: 'freshmenAndTransferee' });
    } else if (state.studentFees) {
      dispatch({ type: 'returningShiftingAndRemedial' });
    }
    my_swiper?.slidePrev?.();
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
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      borderColor: "#8B1D1D"
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Step details
  const freshmenSteps = [
    {
      step: '01',
      title: 'Document Submission',
      description: 'Present the documents above to the attending admission personnel. Secure an Application for Admission form. There is an express lane for persons with disabilities in all the steps enumerated for the admission process.',
      icon: '📄',
      details: [
        'Original and photocopy of required documents',
        'Express lane available for PWDs',
        'Application forms available on-site'
      ]
    },
    {
      step: '02',
      title: 'Medical Examination',
      description: 'See the college physician at the College Infirmary for medical examination and from whom you secure a medical clearance to be presented to the admissions personnel.',
      icon: '🏥',
      details: [
        'Complete physical examination',
        'Medical clearance required',
        'Infirmary located in Faculty Center'
      ]
    },
    {
      step: '03',
      title: 'Career Guidance',
      description: 'Proceed to the Guidance Counselor for career guidance and psychometric test.',
      icon: '🧠',
      details: [
        'Mandatory psychometric test',
        'Career counseling session',
        'Results valid for one academic year'
      ]
    },
    {
      step: '04',
      title: 'Application Completion',
      description: 'Accomplish Application for Admission, making sure all solicited information is filled up as completely and accurately as possible. Incompletely filled up or unsigned forms will be returned.',
      icon: '✍️',
      details: [
        'Complete all fields accurately',
        'Parent/guardian signature required',
        'Forms available in multiple languages'
      ]
    },
    {
      step: '05',
      title: 'Admission Notice',
      description: 'Secure Notice of Admission. You may now proceed and present your Notice of Admission to the registration adviser for the course you intend to enroll in.',
      icon: '📝',
      details: [
        'Official admission letter',
        'Valid for 30 days',
        'Required for enrollment'
      ]
    },
    {
      step: '06',
      title: 'Final Registration',
      description: 'Complete your registration with the assigned adviser and submit all required documents.',
      icon: '🎓',
      details: [
        'Meet with department adviser',
        'Submit all original documents',
        'Receive class schedule'
      ]
    },
  ];

  const returnSteps = [
    {
      step: '01',
      title: 'Grade Submission',
      description: 'Present your official copy of grades (with photocopy) for the latest semester to the admission personnel.',
      icon: '📊',
      details: [
        'Official transcript required',
        'Minimum CGPA requirements apply',
        'Photocopy for department records'
      ]
    },
    {
      step: '02',
      title: 'Application Form',
      description: 'Secure and fill-up an Application for Shifting/Re-admission form.',
      icon: '📑',
      details: [
        'Available at Admissions Office',
        'Complete personal information',
        'Indicate new program choice'
      ]
    },
    {
      step: '03',
      title: 'Guidance Session',
      description: 'Proceed to the Guidance Counselor for career guidance and psychometric test.',
      icon: '🧑‍🏫',
      details: [
        'Mandatory counseling session',
        'Program suitability assessment',
        'Career path evaluation'
      ]
    },
    {
      step: '04',
      title: 'Adviser Approval',
      description: 'Bring the endorsed Application for Shifting/Re-admission to the appropriate registration adviser for action. (Your application will either be approved or disapproved depending on whether you are able to meet the required CGPA for the concerned program)',
      icon: '✅',
      details: [
        'Department head approval',
        'CGPA requirements vary by program',
        'Decision within 3-5 working days'
      ]
    },
    {
      step: '05',
      title: 'Final Submission',
      description: 'Bring back the approved Application for Shifting/Re-admission to the Admissions Office.',
      icon: '📤',
      details: [
        'Final verification process',
        'Official records update',
        'Receive confirmation letter'
      ]
    },
    {
      step: '06',
      title: 'Department Processing',
      description: 'Proceed to the respective department for final processing and enrollment.',
      icon: '🏛️',
      details: [
        'Meet new department adviser',
        'Complete enrollment forms',
        'Receive new curriculum guide'
      ]
    },
  ];

  const feesData = [
    { name: 'Tuition Fees', amount: 'Php 50.00 / unit', description: 'Per unit charge for all academic courses' },
    { name: 'Athletic Fees', amount: 'Php 50.00', description: 'Annual fee for sports facilities maintenance' },
    { name: 'CDF', amount: 'Php 20.00', description: 'Cultural Development Fund for campus events' },
    { name: 'SPEAR', amount: 'Php 50.00', description: 'Student Program for Enhancement and Advancement' },
    { name: 'ROTC / CWTS', amount: 'Php 100.00', description: 'Mandatory for all undergraduate students' },
    { name: 'Speech Laboratory', amount: 'Php 150.00', description: 'For communication courses and language labs' },
    // { name: 'Science Laboratory', amount: 'Php 200.00', description: 'Per course with laboratory component' },
    // { name: 'Library Fee', amount: 'Php 100.00', description: 'Annual access fee for library resources' },
    // { name: 'Medical Fee', amount: 'Php 150.00', description: 'Campus health services coverage' },
    // { name: 'ID Fee', amount: 'Php 100.00', description: 'For student identification card (initial issue)' },
    // { name: 'Registration Fee', amount: 'Php 200.00', description: 'Per semester enrollment processing fee' },
    // { name: 'Development Fee', amount: 'Php 300.00', description: 'Campus infrastructure and facilities' },
  ];

  return (
    <div className="min-h-screen xl:pt-[80px] xs:pt-[60px] pb-20">
      {/* Hero Section - Enhanced */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 relative"
      >
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-msu-deep-ocean/10 rounded-full filter blur-3xl" aria-hidden="true"></div>
        <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-msu-maroon/10 rounded-full filter blur-3xl" aria-hidden="true"></div>
        
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-2 text-sm font-semibold tracking-wide uppercase text-msu-deep-ocean dark:text-msu-gold bg-msu-deep-ocean/10 dark:bg-msu-gold/10 rounded-full border border-msu-deep-ocean/20 dark:border-msu-gold/30"
        >
          How to Apply
        </motion.span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-msu-deep-ocean dark:text-gray-100 mb-4 relative z-10 tracking-tight">
          Admission <span className="text-msu-maroon dark:text-msu-gold">Procedures</span>
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-msu-deep-ocean to-msu-maroon dark:from-msu-gold dark:to-msu-deep-ocean mx-auto mb-6 rounded-full" aria-hidden="true"></div>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto relative z-10 leading-relaxed">
          Your journey to academic excellence starts here. Explore our streamlined admission process for freshmen, transferees, and returning students.
        </p>
      </motion.div>

      {/* Main Content Container - Enhanced */}
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden border border-gray-200/80 dark:border-gray-700 relative ring-1 ring-black/5 dark:ring-white/5">
        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-msu-deep-ocean via-msu-maroon to-msu-gold dark:from-msu-gold dark:via-msu-maroon dark:to-msu-deep-ocean"></div>
        
        {/* Swiper for Mobile - solid tab pill and slide effect to prevent text ghosting */}
        <div className="xl:hidden xs:block py-6 px-4 relative overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            onInit={(ev) => set_my_swiper(ev)}
            allowTouchMove={false}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              nextEl: '.admission-swiper-next',
              prevEl: '.admission-swiper-prev',
            }}
            className="admission-tab-swiper"
          >
            {AdmissionProcedureTab.map((tab, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center min-h-[52px] overflow-hidden">
                  <div
                    className="bg-msu-deep-ocean text-white rounded-full px-6 py-3 font-semibold shadow-md text-center max-w-[90%]"
                    style={{ isolation: 'isolate' }}
                  >
                    <span className="relative z-10 block">{tab.label}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" onClick={handlePrevSlide} className="admission-swiper-prev swiper-button-prev !text-msu-deep-ocean dark:!text-msu-gold hover:!opacity-80 after:!text-2xl" aria-label="Previous tab" />
          <button type="button" onClick={handleNextSlide} className="admission-swiper-next swiper-button-next !text-msu-deep-ocean dark:!text-msu-gold hover:!opacity-80 after:!text-2xl" aria-label="Next tab" />
        </div>

        {/* Desktop Layout */}
        <div className="flex flex-col xl:flex-row">
          {/* Sidebar for Desktop - Enhanced */}
          <div className="xl:w-1/4 xs:w-full bg-gradient-to-b from-gray-50/80 dark:from-gray-800/80 to-gray-50 dark:to-gray-800/50 p-6 lg:p-8 border-r border-gray-200 dark:border-gray-700 relative">
            <div className="sticky top-24">
              <motion.div 
                className="flex flex-col gap-3"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.button
                  onClick={() => dispatch({ type: 'freshmenAndTransferee' })}
                  className={`text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-4 ${state.freshmenAndTransferee ? 
                    'bg-gradient-to-r from-msu-deep-ocean to-msu-dark-pink text-white font-bold shadow-lg ring-2 ring-msu-deep-ocean/30' : 
                    'bg-white dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md hover:border-msu-deep-ocean/30'}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/20 dark:bg-white/10 flex items-center justify-center text-xl">🎓</span>
                  <div className="min-w-0">
                    <div className="font-semibold">Freshmen & Transferee</div>
                    <div className="text-xs opacity-90 mt-0.5">New student enrollment</div>
                  </div>
                </motion.button>
                
                <motion.button
                  onClick={() => dispatch({ type: 'returningShiftingAndRemedial' })}
                  className={`text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-4 ${state.returningShiftingAndRemedial ? 
                    'bg-gradient-to-r from-msu-deep-ocean to-msu-dark-pink text-white font-bold shadow-lg ring-2 ring-msu-deep-ocean/30' : 
                    'bg-white dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md hover:border-msu-deep-ocean/30'}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/20 dark:bg-white/10 flex items-center justify-center text-xl">🔄</span>
                  <div className="min-w-0">
                    <div className="font-semibold">Returning & Shifting</div>
                    <div className="text-xs opacity-90 mt-0.5">Continuing students</div>
                  </div>
                </motion.button>
                
                <motion.button
                  onClick={() => dispatch({ type: 'studentFees' })}
                  className={`text-left p-4 rounded-xl transition-all duration-200 flex items-center gap-4 ${state.studentFees ? 
                    'bg-gradient-to-r from-msu-deep-ocean to-msu-dark-pink text-white font-bold shadow-lg ring-2 ring-msu-deep-ocean/30' : 
                    'bg-white dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md hover:border-msu-deep-ocean/30'}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/20 dark:bg-white/10 flex items-center justify-center text-xl">💲</span>
                  <div className="min-w-0">
                    <div className="font-semibold">Student Fees</div>
                    <div className="text-xs opacity-90 mt-0.5">Tuition & other charges</div>
                  </div>
                </motion.button>

                <motion.div 
                  className="mt-6 p-5 bg-white dark:bg-gray-700/90 rounded-xl border border-msu-deep-ocean/15 dark:border-msu-gold/20 shadow-md"
                  variants={itemVariants}
                >
                  <h4 className="text-msu-deep-ocean dark:text-msu-gold font-bold mb-3 flex items-center gap-2">
                    <FiInfo className="w-5 h-5 flex-shrink-0" /> Need Help?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">Our admission team is ready to assist you with any questions about the application process.</p>
                  <div className="space-y-2.5">
                    <a href="mailto:admissions@msutcto.edu.ph" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-msu-deep-ocean dark:hover:text-msu-gold transition-colors">
                      <FiMail className="w-4 h-4 flex-shrink-0" /> admissions@msutcto.edu.ph
                    </a>
                    <a href="tel:+639517171690" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-msu-deep-ocean dark:hover:text-msu-gold transition-colors">
                      <FiPhone className="w-4 h-4 flex-shrink-0" /> 0951 717 1690
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  className="p-5 bg-white dark:bg-gray-700/90 rounded-xl border border-msu-deep-ocean/15 dark:border-msu-gold/20 shadow-md"
                  variants={itemVariants}
                >
                  <h4 className="text-msu-deep-ocean dark:text-msu-gold font-bold mb-3 flex items-center gap-2">
                    <FiDownload className="w-5 h-5 flex-shrink-0" /> Download Forms
                  </h4>
                  <div className="flex flex-col gap-1">
                    <a href="#" className="text-gray-700 dark:text-gray-300 text-sm flex items-center justify-between gap-2 py-2.5 px-3 hover:text-msu-deep-ocean dark:hover:text-msu-gold hover:bg-msu-deep-ocean/5 dark:hover:bg-msu-gold/10 rounded-lg transition-colors">
                      <span>Application Form</span>
                      <FiExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                    <a href="#" className="text-gray-700 dark:text-gray-300 text-sm flex items-center justify-between gap-2 py-2.5 px-3 hover:text-msu-deep-ocean dark:hover:text-msu-gold hover:bg-msu-deep-ocean/5 dark:hover:bg-msu-gold/10 rounded-lg transition-colors">
                      <span>Medical Form</span>
                      <FiExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                    <a href="#" className="text-gray-700 dark:text-gray-300 text-sm flex items-center justify-between gap-2 py-2.5 px-3 hover:text-msu-deep-ocean dark:hover:text-msu-gold hover:bg-msu-deep-ocean/5 dark:hover:bg-msu-gold/10 rounded-lg transition-colors">
                      <span>Fee Structure</span>
                      <FiExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                    <a href="#" className="text-gray-700 dark:text-gray-300 text-sm flex items-center justify-between gap-2 py-2.5 px-3 hover:text-msu-deep-ocean dark:hover:text-msu-gold hover:bg-msu-deep-ocean/5 dark:hover:bg-msu-gold/10 rounded-lg transition-colors">
                      <span>Scholarship Forms</span>
                      <FiExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Content Area */}
          <div className="xl:w-3/4 xs:w-full p-8 bg-white dark:bg-gray-800 relative" id="process">
            <div className="absolute -top-20 right-0 w-64 h-64 bg-msu-deep-ocean/5 rounded-full filter blur-3xl" aria-hidden="true"></div>
            
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
                    <motion.h2 className="text-3xl font-bold text-msu-deep-ocean dark:text-gray-100 mb-6 flex items-center" variants={itemVariants}>
                      <span className="bg-msu-deep-ocean text-white rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4">🎓</span>
                      Freshmen & Transferee Admission
                    </motion.h2>
                    
                    <motion.div className="bg-gradient-to-r from-msu-deep-ocean/5 to-msu-maroon/5 dark:from-msu-deep-ocean/10 dark:to-msu-maroon/10 p-6 rounded-xl mb-8 border border-gray-200 dark:border-gray-600 shadow-sm" variants={itemVariants}>
                      <h3 className="text-xl font-semibold text-msu-deep-ocean dark:text-gray-100 mb-4 flex items-center gap-2">
                        <FiInfo className="w-5 h-5 text-msu-deep-ocean dark:text-msu-gold" /> Required Documents
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-700/80 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
                          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 border-b border-msu-deep-ocean/20 dark:border-msu-gold/30 pb-2">For Freshmen:</h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Senior High School Report Card (Form 138-A)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">MSU SASE Report of Rating (with passing score)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">PSA/NSO-Authenticated Birth Certificate (original)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Certificate of Good Moral Character</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">2x2 ID photos (white background)</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-700/80 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
                          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 border-b border-msu-deep-ocean/20 dark:border-msu-gold/30 pb-2">For Transferees:</h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Honorable Dismissal</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Transcript of Records (TOR)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">PSA/NSO-Authenticated Birth Certificate (original)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">MSU SASE Report of Rating (with passing score)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Certificate of Good Moral Character</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    <motion.h3 className="text-2xl font-bold text-msu-deep-ocean dark:text-gray-100 mb-6 flex items-center" variants={itemVariants}>
                      <span className="bg-msu-deep-ocean text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1-6</span>
                      Admission Process Steps
                    </motion.h3>

                    <motion.div 
                      className="grid md:grid-cols-2 gap-6"
                      variants={containerVariants}
                    >
                      {freshmenSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          className={`relative overflow-hidden bg-white dark:bg-gray-700/80 p-6 rounded-xl shadow-sm cursor-pointer border border-gray-200 dark:border-gray-600 hover:border-msu-deep-ocean/50 dark:hover:border-msu-gold/50 transition-all duration-200 ${hoveredStep === index ? 'ring-2 ring-msu-deep-ocean/40 dark:ring-msu-gold/40 shadow-md' : ''}`}
                          variants={itemVariants}
                          whileHover={{ y: -2, boxShadow: '0 12px 28px rgba(97,6,59,0.12)' }}
                          onMouseEnter={() => setHoveredStep(index)}
                          onMouseLeave={() => setHoveredStep(null)}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-msu-deep-ocean to-msu-maroon dark:from-msu-gold dark:to-msu-deep-ocean rounded-l" aria-hidden="true"></div>
                          <div className="flex items-start pl-1">
                            <div className="bg-gradient-to-br from-msu-deep-ocean to-msu-dark-pink text-white rounded-xl w-12 h-12 flex items-center justify-center text-lg font-bold mr-4 shadow-md flex-shrink-0">
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="mr-2 text-xl">{step.icon}</span>
                                {step.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{step.description}</p>
                              
                              <button 
                                className="mt-3 text-msu-maroon dark:text-yellow-400 text-sm font-medium flex items-center"
                                onClick={() => toggleAccordion(index)}
                              >
                                {activeAccordion === index ? 'Hide details' : 'View details'}
                                <FiChevronRight className={`ml-1 transition-transform ${activeAccordion === index ? 'transform rotate-90' : ''}`} />
                              </button>
                              
                              {activeAccordion === index && (
                                <motion.div 
                                  className="mt-3 pl-4 border-l-2 border-msu-maroon/30"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                >
                                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                                    {step.details.map((detail, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="text-msu-deep-ocean dark:text-msu-gold mt-1 text-xs">▪</span>
                                        <span>{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div 
                      className="mt-8 bg-gradient-to-r from-msu-deep-ocean/5 to-msu-maroon/5 dark:from-msu-deep-ocean/10 dark:to-msu-maroon/10 p-6 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm"
                      variants={itemVariants}
                    >
                      {/* <h3 className="text-xl font-semibold text-msu-maroon dark:text-yellow-400 mb-4">Important Dates</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="text-sm text-msu-green font-medium">Application Period</div>
                          <div className="text-gray-700 dark:text-gray-300">April 1 - June 15, 2023</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="text-sm text-msu-green font-medium">Entrance Exam</div>
                          <div className="text-gray-700 dark:text-gray-300">June 20-25, 2023</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="text-sm text-msu-green font-medium">Enrollment</div>
                          <div className="text-gray-700 dark:text-gray-300">July 10-15, 2023</div>
                        </div>
                      </div> */}
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
                    <motion.h2 className="text-3xl font-bold text-msu-deep-ocean dark:text-gray-100 mb-6 flex items-center" variants={itemVariants}>
                      <span className="bg-msu-deep-ocean text-white rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4">🔄</span>
                      Returning, Shifting & Remedial Programs
                    </motion.h2>
                    
                    <motion.div className="bg-gradient-to-r from-msu-deep-ocean/5 to-msu-maroon/5 dark:from-msu-deep-ocean/10 dark:to-msu-maroon/10 p-6 rounded-xl mb-8 border border-gray-200 dark:border-gray-600 shadow-sm" variants={itemVariants}>
                      <h3 className="text-xl font-semibold text-msu-deep-ocean dark:text-gray-100 mb-4 flex items-center gap-2">
                        <FiInfo className="w-5 h-5 text-msu-deep-ocean dark:text-msu-gold" /> For Returning and Shifting Students
                      </h3>
                      <div className="grid md:grid-cols-1 gap-12">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Students who wish to return after a leave of absence or shift to another program must follow these procedures.
                          </p>
                          <div className="text-sm bg-msu-maroon/10 text-msu-maroon dark:text-yellow-400 p-3 rounded-lg">
                            <strong>Note:</strong> Minimum CGPA requirements vary by program. Please check with your department.
                          </div>
                        </div>
                        {/* <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 border-b pb-2 border-gray-200">Required Documents:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Official Transcript of Records</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Letter of Intent</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Approval from both departments</span>
                            </li>
                          </ul>
                        </div> */}
                      </div>
                    </motion.div>

                    <motion.h3 className="text-2xl font-bold text-msu-deep-ocean dark:text-gray-100 mb-6 flex items-center" variants={itemVariants}>
                      <span className="bg-msu-deep-ocean text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1-6</span>
                      Process Steps
                    </motion.h3>

                    <motion.div 
                      className="grid md:grid-cols-2 gap-6"
                      variants={containerVariants}
                    >
                      {returnSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          className={`relative overflow-hidden bg-white dark:bg-gray-700/80 p-6 rounded-xl shadow-sm cursor-pointer border border-gray-200 dark:border-gray-600 hover:border-msu-deep-ocean/50 dark:hover:border-msu-gold/50 transition-all duration-200 ${hoveredStep === index+6 ? 'ring-2 ring-msu-deep-ocean/40 dark:ring-msu-gold/40 shadow-md' : ''}`}
                          variants={itemVariants}
                          whileHover={{ y: -2, boxShadow: '0 12px 28px rgba(97,6,59,0.12)' }}
                          onMouseEnter={() => setHoveredStep(index+6)}
                          onMouseLeave={() => setHoveredStep(null)}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-msu-deep-ocean to-msu-maroon dark:from-msu-gold dark:to-msu-deep-ocean rounded-l" aria-hidden="true"></div>
                          <div className="flex items-start pl-1">
                            <div className="bg-gradient-to-br from-msu-deep-ocean to-msu-dark-pink text-white rounded-xl w-12 h-12 flex items-center justify-center text-lg font-bold mr-4 shadow-md flex-shrink-0">
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="mr-2 text-xl">{step.icon}</span>
                                {step.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{step.description}</p>
                              
                              <button 
                                className="mt-3 text-msu-deep-ocean dark:text-msu-gold text-sm font-medium flex items-center hover:underline"
                                onClick={() => toggleAccordion(index)}
                              >
                                {activeAccordion === index ? 'Hide details' : 'View details'}
                                <FiChevronRight className={`ml-1 transition-transform duration-200 ${activeAccordion === index ? 'rotate-90' : ''}`} />
                              </button>
                              
                              {activeAccordion === index && (
                                <motion.div 
                                  className="mt-3 pl-4 border-l-2 border-msu-deep-ocean/30 dark:border-msu-gold/30"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                >
                                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                                    {step.details.map((detail, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="text-msu-deep-ocean dark:text-msu-gold mt-1 text-xs">▪</span>
                                        <span>{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div 
                      className="mt-8 bg-gradient-to-r from-msu-deep-ocean/5 to-msu-maroon/5 dark:from-msu-deep-ocean/10 dark:to-msu-maroon/10 p-6 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm"
                      variants={itemVariants}
                    >
                      <h3 className="text-xl font-semibold text-msu-deep-ocean dark:text-gray-100 mb-4">Remedial Program</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                          <p className="text-gray-700 dark:text-gray-300">
                            The MSU-Tawi-Tawi, in order to accommodate those whose scores are a little lower than the median, has been implementing the so-called Remedial Program wherein for the first semester of the student's stay on campus, he is enrolled in a 9-hour per week remedial Math and another 9-hour per week remedial English. (Only upon passing both subjects is the student deemed qualified to be treated as a regular student.)
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 border-b pb-2 border-gray-200">Remedial Program Details:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">9 hours/week remedial Math</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">9 hours/week remedial English</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Must pass both to become regular</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Limited slots available</span>
                            </li>
                          </ul>
                        </div>
                      </div>
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
                    <motion.h2 className="text-3xl font-bold text-msu-deep-ocean dark:text-gray-100 mb-6 flex items-center" variants={itemVariants}>
                      <span className="bg-msu-deep-ocean text-white rounded-full w-10 h-10 flex items-center justify-center text-lg mr-4">💲</span>
                      Student Fees Structure
                    </motion.h2>
                    
                    <motion.div className="bg-gradient-to-r from-msu-deep-ocean/5 to-msu-maroon/5 dark:from-msu-deep-ocean/10 dark:to-msu-maroon/10 p-6 md:p-8 rounded-xl mb-8 border border-gray-200 dark:border-gray-600 shadow-sm" variants={itemVariants}>
                      <h3 className="text-xl font-semibold text-msu-deep-ocean dark:text-msu-gold mb-4 flex items-center gap-2">
                        <FiInfo className="w-5 h-5" /> For Student Fees (BOR RES #50, Series 2005)
                      </h3>
                      <div className="grid md:grid-cols-1 gap-6">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Below is the complete breakdown of fees for all students. Fees are subject to change without prior notice.
                          </p>
                          <div className="text-sm bg-msu-maroon/10 text-msu-maroon dark:text-yellow-400 p-3 rounded-lg">
                            <strong>Note:</strong> All fees are per semester unless otherwise specified.
                          </div>
                        </div>
                        {/* <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 border-b pb-2 border-gray-200">Payment Deadlines:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">First Semester: July 15 - August 15</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Second Semester: December 1 - January 15</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-msu-maroon dark:text-yellow-400 mr-2 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">Summer: April 1 - May 1</span>
                            </li>
                          </ul>
                        </div> */}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="mb-8"
                      variants={itemVariants}
                    >
                      {/* Desktop: table */}
                      <div className="hidden md:block overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gradient-to-r from-msu-deep-ocean to-msu-dark-pink text-white">
                              <th className="py-4 px-6 text-left font-bold rounded-tl-xl">Fee Description</th>
                              <th className="py-4 px-6 text-right font-bold">Amount</th>
                              <th className="py-4 px-6 text-left font-bold rounded-tr-xl">Description</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-700/50">
                            {feesData.map((fee, index) => (
                              <tr 
                                key={index} 
                                className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-700/50' : 'bg-gray-50/80 dark:bg-gray-600/50'} hover:bg-msu-deep-ocean/5 dark:hover:bg-msu-gold/5 transition-colors`}
                              >
                                <td className="py-4 px-6 text-gray-700 dark:text-gray-300 font-medium">{fee.name}</td>
                                <td className="py-4 px-6 text-right text-msu-deep-ocean dark:text-msu-gold font-semibold whitespace-nowrap">{fee.amount}</td>
                                <td className="py-4 px-6 text-gray-600 dark:text-gray-300 text-sm">{fee.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Mobile: cards */}
                      <div className="md:hidden space-y-3">
                        {feesData.map((fee, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-gray-700/80 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm"
                          >
                            <div className="flex justify-between items-start gap-3">
                              <span className="font-medium text-gray-800 dark:text-gray-200">{fee.name}</span>
                              <span className="text-msu-deep-ocean dark:text-msu-gold font-semibold whitespace-nowrap text-sm">{fee.amount}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{fee.description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="mt-8 bg-gradient-to-r from-msu-deep-ocean/5 to-msu-maroon/5 dark:from-msu-deep-ocean/10 dark:to-msu-maroon/10 p-6 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm"
                      variants={itemVariants}
                    >
                      <h3 className="text-xl font-semibold text-msu-deep-ocean dark:text-gray-100 mb-4">Payment Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 border-b pb-2 border-gray-200">Payment Methods:</h4>
                          <ul className="space-y-3">
                            <motion.li 
                              className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                              whileHover={{ x: 5 }}
                            >
                              <div className="bg-msu-deep-ocean text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</div>
                              <div>
                                <div className="font-medium text-gray-800 dark:text-gray-200">Cash payment</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm">At the Cashier's Office, Admin Building</div>
                              </div>
                            </motion.li>
                            <motion.li 
                              className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                              whileHover={{ x: 5 }}
                            >
                              <div className="bg-msu-deep-ocean text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</div>
                              <div>
                                <div className="font-medium text-gray-800 dark:text-gray-200">Bank transfer</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm">Account details available at Finance Office</div>
                              </div>
                            </motion.li>
                            <motion.li 
                              className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                              whileHover={{ x: 5 }}
                            >
                              <div className="bg-msu-deep-ocean text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</div>
                              <div>
                                <div className="font-medium text-gray-800 dark:text-gray-200">Online payment</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm">Through MSU Payment Portal (coming soon)</div>
                              </div>
                            </motion.li>
                          </ul>
                        </div>
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 border-b pb-2 border-gray-200">Important Notes:</h4>
                          <ul className="space-y-3">
                            <li className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                              <div className="bg-msu-maroon/10 text-msu-maroon dark:text-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">!</div>
                              <div>
                                <div className="font-medium text-gray-800 dark:text-gray-200">All fees must be paid before enrollment</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm">Unpaid fees will prevent course registration</div>
                              </div>
                            </li>
                            <li className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                              <div className="bg-msu-maroon/10 text-msu-maroon dark:text-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">!</div>
                              <div>
                                <div className="font-medium text-gray-800 dark:text-gray-200">Late payments may incur additional charges</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm">Php 50/day penalty after deadline</div>
                              </div>
                            </li>
                            <li className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                              <div className="bg-msu-maroon/10 text-msu-maroon dark:text-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">!</div>
                              <div>
                                <div className="font-medium text-gray-800 dark:text-gray-200">Scholarship students</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm">Must present scholarship documents to qualify for exemptions</div>
                              </div>
                            </li>
                            {/* <li className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                              <div className="bg-msu-maroon/10 text-msu-maroon dark:text-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">!</div>
                              <div>
                                <div className="font-medium text-gray-800 dark:text-gray-200">Installment plans available</div>
                                <div className="text-gray-600 dark:text-gray-300 text-sm">Approval required from Finance Office</div>
                              </div>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 dark:border-gray-600 shadow-sm mt-8"
                      variants={itemVariants}
                    >
                      {/* <h3 className="text-xl font-semibold text-msu-maroon dark:text-yellow-400 mb-4">Estimated Cost Calculator</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Number of Units</label>
                          <input 
                            type="number" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-msu-maroon/50" 
                            placeholder="e.g. 18"
                            min="1"
                            max="24"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Laboratory Courses</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-msu-maroon/50">
                            <option>0 courses</option>
                            <option>1 course</option>
                            <option>2 courses</option>
                            <option>3 courses</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Special Fees</label>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="checkbox" className="form-checkbox text-msu-maroon dark:text-yellow-400 rounded" />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">ROTC/CWTS</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="form-checkbox text-msu-maroon dark:text-yellow-400 rounded" />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">Athletic Fee</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-msu-maroon/5 rounded-lg border border-msu-maroon/20">
                        <div className="flex justify-between items-center">
                          <div className="text-gray-700 dark:text-gray-300 font-medium">Estimated Total:</div>
                          <div className="text-2xl font-bold text-msu-maroon dark:text-yellow-400">Php 2,450.00</div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">* This is an estimate. Actual fees may vary.</div>
                      </div>
                      <button className="mt-4 w-full bg-msu-maroon text-white px-4 py-3 rounded-lg font-semibold hover:bg-msu-dark-maroon transition-all shadow-md">
                        Generate Detailed Breakdown
                      </button> */}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      
          </div>
 
  );
}