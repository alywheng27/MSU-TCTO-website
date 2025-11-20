(() => {
  // tmp_script3.ts
  document.addEventListener("DOMContentLoaded", function() {
    const viewAllBtn = document.getElementById("viewAllBtn");
    const hiddenPrograms = document.querySelectorAll(".program-card.hidden");
    viewAllBtn.addEventListener("click", function() {
      hiddenPrograms.forEach((program) => {
        program.classList.toggle("hidden");
      });
      if (viewAllBtn.textContent.includes("View All")) {
        viewAllBtn.innerHTML = 'Show Less <svg class="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>';
      } else {
        viewAllBtn.innerHTML = 'View All Academic Programs <svg class="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>';
      }
    });
  });
  var getRankPrefix = (value) => {
    if (!value) return "";
    const normalized = value.toLowerCase();
    if (normalized.includes("assistant professor")) return "Assistant Prof.";
    if (normalized.includes("associate professor")) return "Associate Prof.";
    if (normalized.includes("professor")) return "Prof.";
    return "";
  };
  var stripLeadingTitles = (name) => {
    if (!name) return "";
    return name.replace(/^(?:(?:asst|assistant|assoc|associate)\.?\s+prof\.?|prof\.?|professor)\s+/i, "").trim();
  };
  var expandAbbreviatedPrefix = (name) => {
    if (!name) return "";
    return name.replace(/^Asst\.\s+Prof\.\s*/i, "Assistant Prof. ").replace(/^Asst\.\s+/i, "Assistant ").replace(/^Assoc\.\s+Prof\.\s*/i, "Associate Prof. ").replace(/^Assoc\.\s+/i, "Associate ").replace(/^Prof\.\s*/i, "Prof. ").trim();
  };
  var formatDisplayName = ({ name, rank, position }) => {
    if (!name) return "";
    const coreName = stripLeadingTitles(name);
    const rankPrefix = getRankPrefix(rank);
    if (rankPrefix) return `${rankPrefix} ${coreName}`.trim();
    const positionPrefix = getRankPrefix(position);
    if (positionPrefix) return `${positionPrefix} ${coreName}`.trim();
    const expanded = expandAbbreviatedPrefix(name);
    return expanded || name;
  };
  function openFacultyModal(facultyId) {
    console.log("Opening modal for:", facultyId);
    const modal = document.getElementById("facultyModal");
    const modalContent = document.getElementById("modalContent");
    const modalBody = document.getElementById("modalBody");
    if (!modal || !modalContent || !modalBody) {
      console.error("Modal elements not found");
      return;
    }
    const facultyData = {
      jemsy: {
        name: "Prof. Alhisan U. Jemsy, PhD",
        position: "Dean, College of Education",
        rank: "Professor V",
        image: "/images/coed/Profile/JEMSYDEAN.png",
        // To control the image height, set a fixed height in the <img> tag using a class (e.g., class="h-64") or inline style (e.g., style="height: 16rem; object-fit: cover;")
        education: [
          "Doctor of Philosophy (Ph.D.) in Education (Research and Evaluation)",
          "University of San Carlos",
          "Master of Arts in Educational Management",
          "MSU-TCTO (Topnotcher, Comprehensive Examination)",
          "Bachelor of Elementary Education",
          "MSU-TCTO (Magna Cum Laude, Student of the Year, Class Marshal/Valedictorian, Class 2009)"
        ],
        specialization: [
          "Educational Research",
          "Educational Evaluation and Assessment",
          "Professional Education"
        ],
        achievements: [
          "Professor V, MSU-TCTO",
          "Dean, College of Education, MSU-TCTO",
          "Faculty Regent, MSU System Board of Regents",
          "Langkawit Award",
          "President, MSU System Faculty Federation",
          "Union President, MSU-TCTO Faculty Association",
          "Chairperson, Elementary Education Department",
          "Published 6 research studies",
          "Extensive presentations in national and international conferences",
          "Active member, National Research Council of the Philippines"
        ],
        awards: [
          "Langkawit Award",
          "Faculty Regent, MSU System Board of Regents",
          "President, MSU System Faculty Federation",
          "Union President, MSU-TCTO Faculty Association",
          "Active member, National Research Council of the Philippines"
        ],
        publications: [
          "Alhisan, U. J, Julasmin, S. K., Sheilamar, J.J., Sharmini, I. N., Sittirapia, U. J., Assessment of Research Self-Efficacy: Implications to Building Foundation of Early-Career Researcher Motivation and Research-Based Pedagogical Practices, International Journal of Assessment and Evaluation Volume 32, Issue 2, (2025)"
        ],
        leadership: [
          "Chairperson, Committee on Accreditation",
          "Chairperson, Committee on Research",
          "Chairperson, Committee on Curriculum Development",
          "Successful signing of Collective Negotiation Agreement (CNA)",
          "Active participation in university-level decision-making bodies"
        ],
        description: "Dr. Alhisan U. Jemsy is a Professor V and the current Dean of the College of Education at Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). He also served as Faculty Regent of the MSU System Board of Regents. Dr. Jemsy holds a Ph.D. in Education, major in Research and Evaluation, from the University of San Carlos. His research interests include educational research, assessment, and teacher education. A recognized academic leader and active member of the National Research Council of the Philippines, he has conducted numerous training programs and delivered lectures on educational research, assessment, and school leadership across Mindanao."
      },
      budlong: {
        name: "Assoc. Prof. Cherry T. Budlong-Alih",
        position: "Faculty",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/cherry.png",
        education: [
          "Master ng Sining sa Edukasyon medyor sa Pagtuturo ng Wika (Filipino) - Western Mindanao State University",
          "Batsilyer ng Edukasyong Pangsekondarya medyor sa Filipino - MSU-TCTO (1999)"
        ],
        achievements: [
          "Associate Professor V, MSU-TCTO",
          "Former Director, Sentro ng Wika at Kultura (2023-2025)",
          "Adviser, Kapisanan ng mga Mag-aaral sa Filipino (KAMAFIL) (2021-2025)",
          "International Star Educator Award (Gold Awardee) - Star Literacy Association of Educators and Researchers, Inc.",
          "Finalist, 2023 Outstanding Faculty Award - College of Education, MSU-TCTO"
        ],
        specialization: [
          "Filipino"
        ],
        experience: [
          "Guro sa Filipino, Kolehiyo ng Malalayang Sining - Ateneo de Zamboanga University (1999-2007)",
          "Nagtuturo ng Filipino, Kolehiyo ng Edukasyon - MSU-TCTO (Kasalukuyan)"
        ],
        publications: [
          "Translator, Panumtuman (Anthology of 21st Century Bangsamoro Literature)",
          "Tagasuri/Contributing Editor, When Words Become Verses - Mga Katagang Naging Taludtod (International Anthology ng Kusina ng Talinghaga)"
        ],
        description: 'Si CHERRY T. BUDLONG-ALIH, may ranggong Associate Professor V, ay nagtapos ng Batsilyer ng Edukasyong Pangsekondarya medyor sa Filipino sa Mindanao State University - Tawi-Tawi College of Technology and Oceanography (MSU-TCTO) noong 1999 at Master ng Sining sa Edukasyon medyor sa Pagtuturo ng Wika (Filipino) sa Pampamahalaang Pamantasan ng Kanlurang Mindanao (WMSU) noong 2021. Naging guro sa Filipino sa Kolehiyo ng Malalayang Sining sa Ateneo de Zamboanga University mula 1999 hanggang 2007. Sa kasalukuyan ay nagtuturo siya ng Filipino sa Kolehiyo ng Edukasyon sa MSU-TCTO. Naitalaga siyang direktor ng Sentro ng Wika at Kultura (2023-2025), at tagapayo ng Kapisanan ng mga Mag-aaral sa Filipino o KAMAFIL (2021-2025). Pinarangalan ng "International Star Educator Award" (Gold Awardee) ng Star Literacy Association of Educators and Researchers, Inc., at naging finalist ng "2023 Outstanding Faculty Award" sa Kolehiyo ng Edukasyon ng MSU-TCTO. Naging translator din siya sa Panumtuman (Anthology of 21st Century Bangsamoro Literature), at tagasuri/contributing editor sa When Words Become Verses - Mga Katagang Naging Taludtod, isang International Anthology ng Kusina ng Talinghaga. Siya ang Direktor ng Rehiyon BARMM ng SAGIP-WIKA (Samahan ng mga Guro at Iba Pang Propesyonal sa WIKA), Inc. Sa kasalukuyan ay kumukuha siya ng Doctor of Philosophy in Education major in Language Education-Filipino sa Isabela State University, Cabagan, Isabela.'
      },
      colicol: {
        name: "Assoc. Prof. Fernigil L. Colicol, PhD",
        position: "Chairperson, Department of Educational Leadership and Professional Services (DELPS)",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/colicol.png",
        education: [
          "Doctor of Philosophy in Education, major in Anthropology and Sociology of Education - University of the Philippines Diliman (Academic Personnel Development Program)",
          "Master of Education, major in Administration and Supervision - MSU-TCTO",
          "Bachelor of Elementary Education - MSU-TCTO (Magna Cum Laude, LET Topnotcher - 8th place nationwide, 2010)"
        ],
        achievements: [
          "Associate Professor V, MSU-TCTO",
          "Chairperson, Department of Educational Leadership and Professional Services",
          "Coordinator, Intensive LET Review Program",
          "LET Topnotcher - 8th place nationwide (2010)",
          "Published scholarly work in reputable academic journals",
          "Presented research at local and international conferences"
        ],
        positions: [
          "Instructor I, College of Education (2011\u20132017)",
          "Teacher I, MSU Science High School (August\u2013November 2011)",
          "Preschool Teacher, Department of Education, Zamboanga del Norte (2010\u20132011)",
          "Officer-In-Charge, Office of Information, Press, and Publication (2018)",
          "Chairman, Master of Arts in Education Program (2018)",
          "BEED Program Chairperson (2014\u20132015)",
          "Coordinator, Intensive LET Review (2016\u20132017)",
          "Assistant Dormitory Manager (2011)"
        ],
        organizations: [
          "Mindanao Island Cluster Representative, Society for Strategic Education Studies",
          "Associate Member, National Research Council of the Philippines",
          "Member, Indigenous Knowledge Academy under the Comparative and International Education Society"
        ],
        description: "Assoc. Prof. Fernigil L. Colicol leads the Department of Educational Leadership and Professional Services while advancing research-driven teacher education. A licensed professional and LET topnotcher, he continues to champion strategic initiatives, international linkages, and quality assurance reforms across the College of Education."
      },
      bagalanon: {
        name: "Asst. Prof. Joselito J. Bagalanon",
        position: "Assistant Professor IV",
        image: "/images/coed/Profile/Bagalanon, J.png",
        education: [
          "Master of Arts in Education major in Administration and Supervision - Mindanao State University-Tawi-Tawi, 2018",
          "Bachelor of Secondary Education major History - Mindanao State University-Tawi-Tawi, 2003"
        ],
        achievements: [
          "Assistant Professor IV, MSU-TCTO"
        ],
        positions: [
          "Field of Specialization: Educational Administration and Supervision",
          "Subjects Taught: GED 103, GED 104, CPE 100, CPE 108"
        ],
        description: "Dedicated educator specializing in Educational Administration and Supervision, contributing to the development of future teachers."
      },
      bation: {
        name: "Asst. Prof Luz J. Bation",
        position: "Assistant Professor IV",
        image: "/images/coed/Profile/Bation.png",
        education: [
          "MAED in Administration and Supervision - Mindanao State University - Tawi-tawi, 2024",
          "Bachelor of Elementary Education Major in Early Childhood Education - Mindanao State University-Tawi-Tawi, 2014"
        ],
        achievements: [
          "Assistant Professor IV, MSU-TCTO",
          "Presented two research papers at international conferences"
        ],
        positions: [
          "Field of Specialization: Administration and Supervision",
          "Subjects Taught: ELC 101, ELC 102, ECD, CPE 100"
        ],
        description: "She has presented two research papers at international conferences and continues to champion evidenced-based education and institutional development."
      },
      derramas: {
        name: "Prof. Clarissa A. Derramas",
        position: "Professor VI",
        image: "/images/coed/Profile/Derramas.png",
        education: [
          "Doctor of Education in Early Childhood Education - Cebu Normal University Cebu City, 2019",
          "Master of Arts in Education - Early Childhood Education - Ateneo de Zamboanga University, 2002",
          "Bachelor of Secondary Education in English - Mindanao State University-Tawi-Tawi, 1998"
        ],
        achievements: [
          "Professor VI, MSU-TCTO",
          "Special Assistant to OVCAA"
        ],
        positions: [
          "Field of Specialization: Early Childhood Education",
          "Subjects Taught: MEC 200, MEC 201, ECD 114, ECD110"
        ],
        description: "Distinguished expert in Early Childhood Education with extensive research and teaching experience."
      },
      hadji: {
        name: "Assoc. Prof. Almira A. Hadji",
        position: "Director of GAD",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/Hadji, Almira.png",
        education: [
          "Master of Arts in Education major in Administration and Supervision - Mindanao State University - Tawi-Tawi",
          "Bachelor of Elementary Education - Mindanao State University - Tawi-Tawi"
        ],
        achievements: [
          "Trailblazing educational leader and first woman Dean of the College of Islamic and Arabic Studies (CIAS)",
          "Led transformative Gender and Development initiatives across MSU-TCTO and partner communities",
          "Recognized College Leadership awardee during undergraduate studies"
        ],
        positions: [
          "Leadership Roles: Director of Gender and Development (GAD)",
          "Former Dean, College of Islamic and Arabic Studies (CIAS)",
          "Former Principal, MSU-CHILDS (now ILS-SMEC)",
          "Community Madrasah Administrator, Mahad Darul Aman"
        ],
        specialization: [
          "Administration and Supervision",
          "Educational Management",
          "Gender and Development"
        ],
        publications: [
          "Influence of Parental Support and Teaching Strategies on Pupils' Academic Performance: Implications for ISAL Program Supervision (Montasir, M. A., Mastul, A. H., Abdulwahid, K. S., Tahir, K. R., Sali, F. Z. V., Abdurasid, S. C., and Hadji, A. A.). International Journal of Learning Teaching and Educational Research, Vol. 24, No. 3, pp. 409-429, March 2025."
        ],
        description: "Assoc. Prof. Almira A. Hadji is a trailblazing educational leader who made history as the first woman Dean of the College of Islamic and Arabic Studies (CIAS), a role she held for nearly six years. Her transformational and collaborative leadership advanced the college's growth while reinforcing gender-responsive and inclusive policies across MSU-TCTO. Previously, she served nine years as Principal of MSU-CHILDS (now ILS-SMEC) and continues to support Islamic education as the community Madrasah Administrator of Mahad Darul Aman. A lifelong advocate for gender and development, she actively leads extension programs and university-wide initiatives that champion inclusive, equitable learning environments and community development."
      },
      kassim: {
        name: "Asst. Prof. Julasmin Kassim",
        position: "Assistant Professor IV",
        image: "/images/coed/Profile/Julasmin S. Kassim.png",
        education: [
          "Master of Arts in Education major in Administration and Supervision - Mindanao State University-Tawi-Tawi, 2024",
          "Bachelor of Elementary Education - Mindanao State University - Tawi-Tawi, 2015"
        ],
        achievements: [
          "Assistant Professor IV, MSU-TCTO",
          "Special Assistant to OVCAA"
        ],
        positions: [
          "Field of Specialization: Educational Administration and Supervision",
          "Subjects Taught: ELC 101, ELC 102, GED 110, CPE 104"
        ],
        description: "Dedicated educator and administrator contributing to both academic excellence and institutional leadership."
      },
      mastul: {
        name: "Prof. Al-Rashiff H. Mastul, EdD",
        position: "Chairperson, DELPS",
        image: "/images/coed/Profile/Mastul, Al-Rashiff  H.png",
        education: [
          "Doctor of Education major in Educational Administration - Western Mindanao State University, Zamboanga City, 2023",
          "Master of Arts in Education major in Administration and Supervision - Mindanao State University-Tawi-Tawi, 2016",
          "Bachelor of Arts in Shariah major in Jurisprudence - Mindanao State University-Tawi-Tawi, 2005"
        ],
        achievements: [
          "Professor I, MSU-TCTO",
          "Chairperson, Department of Educational Leadership and Professional Services (DELPS)"
        ],
        positions: [
          "Field of Specialization: Educational Administration",
          "Subjects Taught: CPE 100, CPE 108, MEM 209, MEM 211"
        ],
        description: "Distinguished scholar in Educational Administration leading the Department of Educational Leadership and Professional Services (DELPS) with dedication and expertise."
      },
      nurhusin: {
        name: "Asst. Prof. Sharmini I. Nurhusin",
        position: "Assistant Professor IV",
        image: "/images/coed/Profile/Nurhusin, Sharmini.png",
        education: [
          "Master of Arts in Education major in Administration and Supervision - Mindanao State University-Tawi-Tawi, 2024",
          "Bachelor of Elementary Education Major in Early Childhood Education - Mindanao State University-Tawi-Tawi, 2017"
        ],
        achievements: [
          "Assistant Professor IV, MSU-TCTO"
        ],
        positions: [
          "Field of Specialization: Educational Administration and Supervision",
          "Subjects Taught: ECD 106, ECD111, ECD 103, CPE 100"
        ],
        description: "Passionate educator dedicated to advancing Early Childhood Education through innovative teaching methods."
      },
      judan: {
        name: "Asst. Prof. Shielamar J. Judan",
        position: "Faculty",
        rank: "Assistant Professor IV",
        image: "/images/coed/Profile/Judan.png",
        education: [
          "Master of Arts in Education, Major in Administration and Supervision - Mindanao State University - Tawi-Tawi College of Technology and Oceanography"
        ],
        achievements: [
          "Faculty Member, College of Education, MSU-TCTO"
        ],
        positions: [
          "Field of Specialization: Administration and Supervision"
        ],
        specialization: [
          "Administration and Supervision",
          "Educational Leadership"
        ],
        research: [
          "Research Self-Efficacy",
          "Research-Based Pedagogical Practices"
        ],
        publications: [
          "Alhisan, U. J., Julasmin, S. K., Sheilamar, J. J., Sharmini, I. N., Sittirapia, U. J. (2025). Assessment of Research Self-Efficacy: Implications to Building Foundation of Early-Career Researcher Motivation and Research-Based Pedagogical Practices. International Journal of Assessment and Evaluation, 32(2)."
        ],
        description: "Assistant Professor IV at the College of Education whose work centers on strengthening administration and supervision in teacher education. She champions research self-efficacy and research-based pedagogical practices to empower early-career educators at Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography."
      },
      rabor: {
        name: "Jencen T. Rabor",
        position: "Faculty",
        rank: "Instructor I",
        image: "/images/coed/Profile/RABOR, Jencen T.png",
        education: [
          "Master of Arts in Education, Major in Administration and Supervision - Mindanao State University - Tawi-Tawi, April 2013",
          "175 credits toward Master of Science in Mathematics Education - Curtin University of Technology, 2007",
          "9 units in Master of Public Administration - MSU-TCTO",
          "Bachelor in Secondary Education Major in MAPEH - Mountain View College Bukidnon, 2018"
        ],
        achievements: [
          "Instructor I, MSU-TCTO",
          "Special Assistant to the Offices of Vice Chancellor for Academic Affairs (VCAA), Secondary Education Department (SED), and Vice Chancellor for Research and Extension (VCRE), 2018-2022",
          "Author of University Research and Extension Manual, approved by MSU Board of Regents, December 2021",
          "Author of Intellectual Property and Technology Transfer Protocol Manual, approved by MSU Board of Regents, December 2021"
        ],
        positions: [
          "Field of Specialization: Administration and Supervision",
          "Subjects Taught: GED 116, GED 108, CPE 100"
        ],
        description: "She holds a Master of Arts in Education (MAED), earned in April 2013, and has completed 175 credits toward a Master of Science in Mathematics Education from Curtin University of Technology (2007). She also earned 9 units in the Master of Public Administration program at MSU-TCTO. From 2018 to 2022, she served as Special Assistant to the Offices of Vice Chancellor for Academic Affairs (VCAA), the Secondary Education Department (SED), and the Vice Chancellor for Research and Extension (VCRE). Her contributions include authoring the University Research and Extension Manual and the Intellectual Property and Technology Transfer Protocol Manual, both approved by the MSU Board of Regents in December 2021."
      },
      sali: {
        name: "Asst. Prof. Fatima Zahra V. Sali",
        position: "Assistant Professor IV",
        image: "/images/coed/Profile/SALI, FATIMA ZAHRA V.png",
        education: [
          "Master of Arts in Education Major in Administration and Supervision - Mindanao State University-Tawi-Tawi, 2023",
          "Bachelor of Elementary Education in General Education - Mindanao State University-Tawi-Tawi, 2017"
        ],
        achievements: [
          "Assistant Professor IV, MSU-TCTO"
        ],
        positions: [
          "Field of Specialization: Educational Administration and Supervision",
          "Subjects Taught: ELC 101, ELC 102, GED 105, GED 113"
        ],
        description: "Committed educator fostering excellence in Elementary Education and Educational Administration."
      },
      sulanting: {
        name: "Asst. Prof. Harimas M. Sulanting",
        position: "Faculty",
        rank: "Assistant Professor IV",
        image: "/images/coed/Profile/SULANTING.png",
        education: [
          "Master of Science in Mathematics Education - Curtin University of Technology",
          "Master of Arts in Education major in Administration and Supervision - Mindanao State University - Tawi-Tawi"
        ],
        achievements: [
          "Seasoned mathematics educator with more than two decades of teaching experience across elementary, secondary, undergraduate, and graduate levels"
        ],
        positions: [
          "Courses Taught: Undergraduate Assessment of Learning and Experiential Learning Courses"
        ],
        specialization: [
          "Mathematics",
          "Administration and Supervision"
        ],
        description: "Asst. Prof. Harimas M. Sulanting is a seasoned mathematics educator with over two decades of teaching experience across elementary, secondary, undergraduate, and graduate levels. She began her teaching career in elementary mathematics in 1999, later expanding to high school and tertiary education, including the Master of Arts in Education Program. She currently teaches undergraduate courses in assessment of learning and experiential learning, mentoring future educators with research-informed practices in mathematics and school leadership."
      },
      tahir: {
        name: "Asst. Prof. Kartini R. Tahir",
        position: "Director, Office of International Linkages (OIL)",
        rank: "Assistant Professor IV",
        image: "/images/coed/Profile/TAHIR, KARTINI.png",
        education: [
          "Doctor of Philosophy in Islamic Education Psychology - Universitas Muhammadiyah Yogyakarta, Indonesia, 2020",
          "Master of Education in Early Childhood Education (Australia Awards Scholar) - University of Canberra, 2011",
          "Bachelor of Education major in Preschool Education - Mindanao State University - Tawi-Tawi, 2008"
        ],
        achievements: [
          "Director, Office of International Linkages (OIL), MSU-TCTO",
          "Assistant Professor IV, College of Education",
          "Consultant and technical expert for BARMM education initiatives"
        ],
        positions: [
          "Field of Specialization: Early Childhood Education, Islamic Education Psychology",
          "Professional Focus: Program coordination, policy development, inclusive education, curriculum design for K-3 learners, Muslim education"
        ],
        publications: [
          "Influence of Parental Support and Teaching Strategies on Pupils' Academic Performance: Implications for ISAL Program Supervision (Montasir, M. A., Mastul, A. H., Abdulwahid, K. S., Tahir, K. R., Sali, F. Z. V., Abdurasid, S. C., and Hadji, A. A.). International Journal of Learning Teaching and Educational Research, Vol. 24, No. 3, pp. 409-429, March 2025."
        ],
        description: "Dr. Kartini R. Tahir directs the Office of International Linkages at MSU-TCTO while serving as an Assistant Professor IV in the College of Education. She finished her Bachelor of Education major in Preschool Education at MSU-TCTO in 2008, completed her Master of Education in Early Childhood Education as an Australia Awards Scholar at the University of Canberra in 2011, and earned her PhD in Islamic Education Psychology from Universitas Muhammadiyah Yogyakarta in 2020 with a dissertation on childhood development from an Islamic perspective. From 2014 to 2020 she served as Regional Program Coordinator for Kindergarten and Indigenous Peoples Education under DepEd-ARMM and continues to advise BARMM initiatives on teacher professional development, inclusive education, curriculum design for K-3 learners, and Muslim education."
      },
      pajiji: {
        name: "Asst. Prof. Jocelyn A. Pajiji, EdD",
        position: "Chairperson DELPS",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/Pajiji.png",
        education: [
          "Doctor of Education, major in Educational Management - Southwestern University PHINMA, Cebu City",
          "Master of Arts in Education, Major in Administration and Supervision - MSU-TCTO, 2004 (Academic Distinction Award)",
          "Bachelor of Secondary Education, Major in General Science - MSU-TCTO, 1998 (Cum Laude)"
        ],
        achievements: [
          "Associate Professor V, MSU-TCTO",
          "Chairperson, Department of Educational Leadership and Professional Services (DELPS)",
          "Licensed Professional Teacher",
          "27 years of service at MSU-TCTO",
          "Over 20 years of experience teaching Science Competencies"
        ],
        positions: [
          "Field of Specialization: Educational Management, General Science",
          "Chairperson, Department of Educational Leadership and Professional Services (DELPS)",
          "Subjects Taught: MEM202, MEM205, CPE101"
        ],
        publications: [
          "Langamin, K. A., Langamin, M. V. B., Tangon, E., Pajiji, J., & Abubakar, F. R. I. (2025). Phytochemical Profiling and Brine Shrimp Lethality test of the methanol Extract of Lantana camara from Simunul, Tawi-Tawi, Philippines. International Journal of Modern Pharmaceutical Research, 9(2), 28-32. ISSN: 2319-5978."
        ],
        description: "Jocelyn Agraviador-Pajiji is an Associate Professor V in the Department of Educational Leadership and Professional Services of the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography. Dr. Pajiji obtained her Doctor of Education, major in Educational Management, from Southwestern University PHINMA in Cebu City. She earned her Master's Degree, Master of Arts in Education Major in Administration and Supervision in 2004, with an Academic Distinction Award, and her Bachelor of Secondary Education Major in General Science as a Cum Laude in 1998 at MSU-Tawi-Tawi College of Technology and Oceanography. A licensed professional teacher, Dr. Pajiji has been with MSU-TCTO for 27 years. With a strong academic background in General Science, she has devoted most of her work experience to teaching Science Competencies for more than 20 years. Currently, she is designated Chairperson of the Department of Educational Leadership and Professional Services (DELPS). With an additional passion and dedication to teaching educational management, Dr. Pajiji continues to inspire future generations of scientists and educators through her teaching, mentorship, and research endeavors."
      },
      bakkang: {
        name: "Assoc. Prof. Alcyn R. Bakkang",
        position: "Vice Chancellor for Student Affairs (VCSA)",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/msufaculty.png",
        education: [
          "Doctor of Philosophy in Learning and Teaching (On-going) - North Carolina State University",
          "Master of Education in Assessment, Measurement, and Evaluation - University of Western Australia, 2011",
          "Bachelor of Science in Mathematics - Mindanao State University - Tawi-Tawi College of Technology and Oceanography, 1998"
        ],
        achievements: [
          "Vice Chancellor for Student Affairs, MSU-TCTO",
          "Associate Professor V, College of Education"
        ],
        specialization: [
          "Educational Assessment",
          "Measurement",
          "Evaluation"
        ],
        description: "Dr. Alcyn Reyes Bakkang is an Associate Professor V at the College of Education, Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography. She earned her Bachelor of Science in Mathematics from MSU-TCTO in 1998, her Master of Education in Assessment, Measurement, and Evaluation from the University of Western Australia in 2011, and is currently pursuing a Doctor of Philosophy in Learning and Teaching at North Carolina State University. Her expertise lies in educational assessment and measurement, with a strong commitment to advancing instructional practices and professional development among educators."
      },
      aripin: {
        name: "Prof. Abdurizal S. Aripin",
        position: "Faculty",
        rank: "Professor I",
        image: "/images/coed/Profile/msufaculty.png",
        education: [
          "Doctor of Education Major in Educational Management - Notre Dame University, 2010",
          "MAED - Administration & Supervision - MSU-TCTO, 2006",
          "Bachelor of Secondary Education - Gen. Science - MSU-TCTO, 1995"
        ],
        achievements: [
          "Professor I, MSU-TCTO"
        ],
        positions: [
          "Field of Specialization: Educational Management",
          "Subjects Taught: PEM304, MEM200, EDU200B, CPE101"
        ],
        description: "Expert in Educational Management with specialization in strategic planning and school management."
      },
      juhuri: {
        name: "Nasri A. Juhuri",
        position: "Instructor I",
        image: "/images/coed/Profile/Nasri Juhuri.png",
        education: [
          "Master of Arts in Education (MAED) in Educational Technology, De La Salle University-Manila (On-Going)",
          "Bachelor's Degree in Secondary Education, MSU-TCTO, 2006"
        ],
        achievements: [
          "Instructor I, MSU-TCTO"
        ],
        positions: [
          "Field of Specialization: Educational Technology",
          "Application of Artificial Intelligence in Education"
        ],
        publications: [
          "Critical reflections and using the Bourdieu-Scheerens Framework in Transformative Mixed-MethodsTeacher's Licensure Review Evaluation, International Journal of learning, Teaching and Educational Research, Vol. 24, page 542-562, January 2025"
        ],
        description: "Mr. Nasri A. Juhuri is a faculty member of the College of Education at Mindanao State University Tawi-Tawi College of Technology and Oceanography. He earned his Bachelor's Degree in Secondary Education from the same institution in 2006. He is currently pursuing a Master's Degree at De La Salle University\u2013Manila, with research interests focusing on educational technology and the application of artificial intelligence in education."
      },
      matolo: {
        name: "Prof. Mona-Allea L. Matolo",
        position: "Faculty",
        rank: "Professor VI",
        image: "/images/coed/Profile/Matolo.png",
        education: [
          "Doctor of Education in Educational Administration - Western Mindanao State University, 2015 (APDP Grant)",
          "Master of Arts in Education major in Administration and Supervision - MSU-TCTO, 2009",
          "Bachelor of Secondary Education major in English - MSU-TCTO, 2005"
        ],
        achievements: [
          "Professor VI, MSU-TCTO",
          "Licensed Professional Teacher",
          "PD 907 Eligible",
          "Department of Educational Leadership and Professional Services, MSU-TCTO"
        ],
        positions: [
          "Field of Specialization: Educational Administration",
          "Subjects Taught: CPE100, PEM306, MEM202, CPE108"
        ],
        description: "Dr. Mona-Allea L. Matolo is a Professor VI at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). She earned her Bachelor of Secondary Education major in English (2005) and Master of Arts in Education major in Administration and Supervision (2009) from the same institution. In 2015, she completed her Doctor of Education in Educational Administration at Western Mindanao State University through the APDP Grant. Currently affiliated with the Department of Educational Leadership and Professional Services, Dr. Matolo is a licensed professional teacher and PD 907 eligible. With an enduring passion for teaching and nurturing future educators, she remains committed to fostering academic excellence, leadership, and lifelong learning among her students."
      },
      castulo: {
        name: "Prof. Nilo J. Castulo, PhD",
        position: "Faculty",
        rank: "Professor I",
        image: "/images/coed/Profile/Nilo Castulo.png",
        education: [
          "Doctor of Philosophy in Comparative Education (Educational Leadership and Policy) (2022-2025) - Beijing Normal University, Beijing, China",
          "Master of Education in Comparative Education (2019-2022) - Northeast Normal University, Changchun, China",
          "Bachelor of Secondary Education major in English (2015-2018) - Far Eastern University, Manila, Philippines"
        ],
        achievements: [
          "ASEAN-China Young Leaders Scholarship (ACYLS) - ASEAN University Network, Bangkok, Thailand (Fully funded Doctoral Scholarship: Sole Filipino PhD recipient selected for the ASEAN University Network, 2022-2025)",
          "Editor's Choice Award - Journal of International Students, STAR Scholars Network (09.17.2024)",
          "Beijing Normal University's 2025 International Student Outstanding Graduates - International Students Office, Division of International Cooperation & Exchange, Beijing Normal University (06.2025)",
          "NENU Outstanding International Graduates of 2022 - International Students Office, Division of International Cooperation & Exchange, Northeast Normal University (06.2022)",
          "Excellent Volunteer Award - International Students Office, Division of International Cooperation & Exchange, Northeast Normal University (06.22.2022)",
          "First Prize of NENU International Students' Photography Contest - International Students Office, Division of International Cooperation & Exchange, Northeast Normal University (06.30.2021)",
          "Academic Leadership Award - International Students Office, Division of International Cooperation & Exchange, Northeast Normal University (06.2021)",
          "Third Prize Winner of NENU International Students' Contest - International Students Office, Division of International Cooperation & Exchange, Northeast Normal University (06.26.2021)"
        ],
        positions: [
          "Managing Editor, The TEPO Journal",
          "Internationalization Coordinator, COED",
          "PROFESSOR I, Department of Educational Leadership and Professional Services, Mindanao State University - Tawi-Tawi College of Technology and Oceanography",
          "Co-chair, Global Migration Group, Comparative and International Education Society (CIES), United States",
          "Regional Editor, Journal of Comparative & International Higher Education (JCIHE)",
          "Committee Member, Comparative Education and Students Critical Leadership Society (CESCLS), Philippine Normal University"
        ],
        research: [
          "Comparative Education",
          "Policy",
          "Higher Education",
          "Internationalization",
          "Education Science in General",
          "Indigenous Studies",
          "Migration Studies",
          "Global Education Leadership"
        ],
        publications: [
          "Aminulla, J. T., Ilahan, D. I., Bayhonan, A. W., Vallega, J. L. R., Branzuela, U., Suaib, R. P., Indasan, A. U., Tan, D. C., Castulo, N. & Marasigan, A. C. (2025). Strengthening Philippine Higher Education Through Centers of Excellence: Policy Insights From CHED Memorandum Order No. 10, S. 2025. PNU Policy Brief Series. https://www.pnuresearchportal.org/wp-content/uploads/2025/10/Policy-Brief-Vol-9-s-10_2025.pdf",
          "Buenaventura, Ma. L., De Vera, J. L., Sebial, S. C., Castulo, N., Tampus-Siena, M., Malcampo, M. C., Andrada, M. D., & Bello, A. (2024). What Does the Characterization of a Gender-Sensitive Model for Blended Teaching Say. PNU Policy Brief Series. https://doi.org/10.2139/ssrn.4977029",
          "Castulo, N. (2025). A Policy Brief on CMO 15 s. 2019: Strategies for Enhancing Educational Research Productivity in Philippine Higher Education Institutions. Journal of Education and Learning Advancements, 1(1), 151\u2013163. https://doi.org/10.2139/ssrn.5030248",
          "Castulo, N. J. (2025). Toward learning recovery: Challenges of international students in China during the COVID-19 online learning experience. Quality Education for All, 2(1), 100\u2013113. https://doi.org/10.1108/QEA-07-2024-0057",
          "Castulo, N. J., Marasigan, A. C., Buenaventura, Ma. L. D., De Vera, J. L., Bagaporo, E. C., Juan, M. P. C. S., & Dalida, N. S. (2025). Contextualizing the challenges of education graduate students in the Philippines: Translating needs analysis into strategic solutions. Discover Education, 4(1), 27. https://doi.org/10.1007/s44217-025-00416-7",
          "Castulo, N. J., Marasigan, A. C., & Xu, X. (2025). Enhancing educational research through collaboration: Insights from Philippine centers of excellence. International Journal of Evaluation and Research in Education (IJERE), 14(5), 3355~3366. https://doi.org/DOI:%252010.11591/ijere.v14i5.33403",
          "Castulo, N., Lansangan, S. M., & Marasigan, A. C. (2025). Strengthening Ethical Standards: How Can Philippine Higher Education Institutions Implement CMO 15 s.2019? PNU Policy Brief Series. https://doi.org/10.2139/ssrn.5030256",
          "Castulo, N., & Marasigan, A. C. (2025). Supporting International Students' Success: How Can we Further Enhance Policies for Facilitating the Academic Transition of International Students? PNU Policy Brief Series. https://doi.org/10.2139/ssrn.5118663",
          "De Vera, J. L., Castulo, N. J., Camacho, V. M. I., Ayuste, T. O. D., & Palomar, B. C. (2025). Teaching science, technology and society in blended learning large classes: A qualitative study of the Normale lecture model. Quality Education for All, 2(1), 341\u2013356. https://doi.org/10.1108/QEA-12-2024-0153",
          "Estapia, J. A., Castulo, N. J., & Mula, R. S. (2025). Subject-taught mismatch: Lived experiences of Filipino non-early childhood education teachers from a Lefebvrian perspective. Journal of Early Childhood Teacher Education, 1\u201325. https://doi.org/10.1080/10901027.2025.2581011",
          "Li, Y., Castulo, N. J., & Xu, X. (2025). Embracing or rejecting AI? A mixed-method study on undergraduate students' perceptions of artificial intelligence at a private university in China. Frontiers in Education, 10, 1505856. https://doi.org/10.3389/feduc.2025.1505856",
          'Marasigan, A. C., Hajan, B., Castulo, N. J., Obliopas, R., Digo, G. S., Imam, O. A., De Vera, J. L., Aquino, J. M., Anito, J. C., Colicol, F., Buenaventura, M. L., Koirala, I., & Bazer, S. C. (2025). "Dress like the Global North and eat like the Global South": Why do faculty contributions to university research productivity matter? Frontiers in Education, 10, 1576981. https://doi.org/10.3389/feduc.2025.1576981',
          "Mejia, I. P., Marasigan, A. C., De Vera, J. L., Serafico-Reyes, N. M. A., Castulo, N. J., De Pano, C. P., Sinsay-Villanueva, L. M., Tanyag, I. H., Berroya, J. D., Garcia, G. D. V., Lim, V. L., & Aquino, J. M. D. (2025, September). Reforming localization policies to improve teacher assignments in schools (PIDS Policy Notes No. 2025-16). Philippine Institute for Development Studies. https://www.pids.gov.ph/publication/policy-notes/reforming-localization-policies-to-improve-teacher-assignments-in-schools",
          "Mejia, I. P., Tenorio, A. D., Monteverde, R. P., Marasigan, A. C., De Vera, J. L., Castulo, N. J., De Pano, C. P., Sinsay-Villanueva, L. M., Tanyag, I. H., & Berroya, J. D. (2025). Review of the Localization Law and its effect on the hiring of teachers (PIDS Discussion Paper Series No. 2025-23). Philippine Institute for Development Studies. https://www.pids.gov.ph/publication/discussion-papers/review-of-the-localization-law-and-its-effect-on-the-hiring-of-teachers",
          "Mejia, I. P., Tenorio, A. D., Monteverde, R. P., Marasigan, A. C., De Vera, J. L., Castulo, N. J., De Pano, C. P., Sinsay-Villanueva, L. M., Tanyag, I. H., & Berroya, J. D. (2025, September). Taught off-guard: When specialization and teaching assignments do not match (PIDS Policy Notes No. 2025-17). Philippine Institute for Development Studies. https://www.pids.gov.ph/publication/policy-notes/taught-off-guard-when-specialization-and-teaching-assignments-do-not-match",
          "Nizeyimana, P., Manirahari, P., Castulo, N. J., & Mugabekazi, J. C. (2025). Children's Educational Status: A Mixed-Method Study on School Reenrollment and Dropout Determinants in Rwanda. Journal of Education for Students Placed at Risk (JESPAR), 1\u201324. https://doi.org/10.1080/10824669.2025.2540776",
          "Raton-Hibanada, R., Castulo, N. J., De Vera, J. L., Bituin, A. C., Barcelona, A. B., Zanoria, I. O. B., Bedural, Z. L., Bailon, J. V., Buenaventura, Ma. L. D., & Dellomos, C. O. (2025). Examining gender equality, diversity, and inclusion: A case study of the challenges and opportunities in community extension programs in a select Philippine university. Frontiers in Education, 10, 1583997. https://doi.org/10.3389/feduc.2025.1583997",
          "Shayo, H. J., Castulo, N. J., Oduro, F., Marasigan, A. C., Ly, R., & Aslam, S. (2025). Predicting commitment in university students: The role of collective trust and self-efficacy. Frontiers in Psychology, 16, 1643129. https://doi.org/10.3389/fpsyg.2025.1643129",
          "Torres-Santos, M. C., & Castulo, N. J. (2025). Lessons for K-9 administrators from high school administrators: A case study on data-Driven decision-making in New Mexico's multi-layered system of supports. Education 3-13, 1\u201315. https://doi.org/10.1080/03004279.2025.2468398",
          "Variacion, F. D., Castulo, N. J., & Marasigan, A. C. (2025). Promoting Environmental Justice: A Case Study of E\u2010Waste Management Practices in Selected Public Schools in the Philippines. European Journal of Education, 60(1), e70042. https://doi.org/10.1111/ejed.70042",
          `Xu, X., Castulo, N., & Marasigan, A. (2025). Exploring Chinese international students' experiences in the "Life and Works of Rizal" course in the Philippines: An interpretative phenomenological analysis. Journal of International Students, 15(4), 75\u201396. https://doi.org/10.32674/zj1v5398`,
          "Yifu, L., & Castulo, N. J. (2024). Strategies and Insights on Internationalisation in EU 27 Countries: A Perspective on International Ranking. European Journal of Education, 59(4), e12776. https://doi.org/10.1111/ejed.12776"
        ],
        experience: [
          "Extensive experience in curriculum evaluation with Malta Further and Higher Education Authority (MFHEA) in Europe",
          "Research projects with Save the Children Philippines",
          "Research projects with Childfund Korea",
          "Research projects with The Second Congressional Commission on Education (EDCOM 2)",
          "Research projects with Philippine Institute for Development Studies under AFFIRM Center for Research and Professional Learning, Inc",
          "Project-Based Research Grant (PBRG) from Philippine Normal University, Manila"
        ],
        description: "Dr. Nilo Jayoma Castulo is a PROFESSOR I in the Department of Educational Leadership and Professional Services at Mindanao State University - Tawi-Tawi College of Technology and Oceanography, Bongao, Philippines. He graduated with a Doctor of Philosophy in Comparative Education, with a research concentration in Educational Leadership and Policy, from the Institute of International and Comparative Education at Beijing Normal University, under the supervision of Professor Liu Baocun. He is the only Filipino PhD recipient of the prestigious ASEAN-China Young Leaders Scholarship (ACYLS), who applied through the ASEAN University Network (AUN) in 2022. He served as a co-chair of the Global Migration Group of the Comparative and International Education Society (CIES) in the United States and is a regional editor for the Journal of Comparative & International Higher Education (JCIHE). Nilo actively contributes as a committee member of the Comparative Education and Students Critical Leadership Society (CESCLS) at the Philippine Normal University. With a master's degree from Northeast Normal University, China (Master's in Education), and a bachelor's degree (Bachelor's in Secondary Education in English) from the Far Eastern University, Institute of Education-Manila, Nilo is also a licensed professional teacher in the Philippines. Nilo has extensive experience in curriculum evaluation with the Malta Further and Higher Education Authority (MFHEA) in Europe and has been involved in research projects with Save the Children Philippines, Childfund Korea, The Second Congressional Commission on Education (EDCOM 2), the Philippine Institute for Development Studies under AFFIRM Center for Research and Professional Learning, Inc and several Project-Based Research Grant (PBRG) from the Philippine Normal University, Manila. Recognized for his contributions to academic research, Nilo was awarded the Editor's Choice Award as a peer reviewer for the Q1 Journal of International Students and has reviewed several other high-impact journals, including Education and Information Technologies, International Journal of Qualitative Methods, and The Asia-Pacific Education Researcher (TAPER), among others. He has contributed scholarly works that are indexed in Scopus, Web of Science (SSCI), and locally in renowned higher education, gender studies, comparative education, and education policy journals. His teaching and research interests include indigenous studies, migration studies, comparative education, and global education leadership. For research collaboration, kindly email him via nilocastulo@msutawi-tawi.edu"
      },
      hailava: {
        name: "Prof. Wilham M. Hailaya, PhD",
        position: "Vice Chancellor for Academic Affairs",
        rank: "Professor VI",
        image: "/images/coed/Profile/Hailaya.png",
        education: [
          "Doctor of Philosophy in Education, Major in Teacher Assessment Literacy/Educational Assessment - University of Adelaide, Australia",
          "Master of Leadership and Management in Education - University of Newcastle, Australia",
          "Bachelor of Secondary Education - Gen. Science - MSU-TCTO, 1996"
        ],
        achievements: [
          "Professor VI, MSU-TCTO",
          "Vice Chancellor for Academic Affairs, MSU-TCTO",
          "Publication: Mariano, R. E., Artes Jr, R. G., & Rasid, R. A. Geodetic Bounds in the Join of Graphs. International Journal of Mathematics and Computer Science. Volume 20, Issue no. 1, (2025), 277\u2013280"
        ],
        positions: [
          "Field of Specialization: Teacher Assessment Literacy/Educational Assessment",
          "Subjects Taught: EDU201A"
        ],
        description: "Dr. Wilham Majallani Hailaya is the Vice Chancellor for Academic Affairs of Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO) and holds the rank of Professor VI in the College of Education. He earned his Doctor of Philosophy in Education, major in Teacher Assessment Literacy/Educational Assessment, from the University of Adelaide and his Master of Leadership and Management in Education from the University of Newcastle, both in Australia. With extensive experience in educational leadership and teacher assessment, Dr. Hailaya continues to advance quality assurance, instructional excellence, and professional development initiatives across the university."
      },
      puig: {
        name: "Assoc. Prof. Charmine Z. Puig",
        position: "Faculty, Associate Professor V",
        image: "/images/coed/Profile/Puig.png",
        education: [
          "Master of Educational Studies, Major in Pedagogy - University of Newcastle (UoN) Australia",
          "Bachelor of Secondary Education major in General Science - MSU-TCTO"
        ],
        achievements: [
          "Associate Professor V, MSU-TCTO",
          "Faculty, Department of Educational Leadership and Professional Services"
        ],
        positions: [
          "Field of Specialization: Professional Education",
          "Subjects Taught: General Science Education"
        ],
        description: "Assoc. Prof. Charmine Z. Puig is a faculty member of the Department of Educational Leadership and Professional Services who specializes in professional education and science pedagogy. She holds a Bachelor of Secondary Education major in General Science from MSU-TCTO and a Master of Educational Studies major in Pedagogy from the University of Newcastle in Australia. Her academic background and classroom leadership reflect her commitment to cultivating meaningful and effective science learning experiences for future teachers."
      },
      alang: {
        name: "Asst. Prof. Sitti-Rasham S. Alang",
        position: "Faculty",
        rank: "Assistant Professor IV",
        image: "/images/coed/Profile/Alang.png",
        education: [
          "Master of Education, Major in Administration and Supervision - Mindanao State University - Tawi-Tawi College of Technology and Oceanography",
          "Bachelor of Secondary Education, Major in Filipino - Mindanao State University - Tawi-Tawi College of Technology and Oceanography"
        ],
        achievements: [
          "Assistant Professor IV, MSU-TCTO",
          "Faculty Member, MSU-TCTO"
        ],
        positions: [
          "Field of Specialization: Filipino, Administration and Supervision",
          "Faculty Member, MSU-TCTO"
        ],
        research: [
          "Filipino Language Teaching",
          "Educational Administration and Supervision",
          "Instructional Leadership",
          "Language Teacher Preparation"
        ],
        publications: [
          "Hajan, B. H., Alang, S. S., Miguel, T. S., Alivio, E. R., Werble, S. J., Alih, C. B., Lakibul, M. D., & Malinao, G. O. Exploring the Possible Selves of Pre-Service English and Filipino Language Teachers: Insights into Language Teacher Preparation. Mindanao State University - Tawi-Tawi College of Technology and Oceanography."
        ],
        description: "Asst. Prof. Sitti-Rasham S. Alang is a faculty member of the Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). She earned her Master of Education major in Administration and Supervision from the same institution. Currently holding the academic rank of Assistant Professor IV, she specializes in Filipino education and educational administration and supervision. Her professional interests include advancing instructional leadership and fostering excellence in Filipino language teaching."
      },
      hajan: {
        name: "Assoc. Prof. Bonjovi H. Hajan",
        position: "Director of SAMA Studies Center and Sentro ng Wika at Kultura",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/Bonjovi Hajan.png",
        education: [
          "Master of Arts in Education - English Language Teaching - Philippine Normal University, Manila",
          "Bachelor of Secondary Education major in English - Western Mindanao State University (Cum Laude)"
        ],
        achievements: [
          "Associate Professor V, MSU-TCTO",
          "Director, SAMA Studies Center",
          "Director, Sentro ng Wika at Kultura",
          "Research Chair, College of Education, MSU-TCTO",
          "MSU-TCTO's Top Researcher (2024) - Scopus-indexed publications",
          "Global Scholar, Translinguistics Research and Publishing Summer Institute - The Pennsylvania State University, United States (2024)",
          "Led and contributed to funded projects: BARMM-MBHTE initiative on IPED framework for Sama-Bajao, USAID\u2013Education Pathways project, CHED-funded action research training, Australian Aid\u2013supported policy review on Madrasah education in BARMM"
        ],
        positions: [
          "Field of Specialization: English Language Teaching",
          "Director, SAMA Studies Center",
          "Director, Sentro ng Wika at Kultura",
          "Research Chair, College of Education, MSU-TCTO"
        ],
        research: [
          "Language and Literacy Education",
          "Culture Studies",
          "Indigenous Peoples Education (IPED)",
          "Translanguaging",
          "Educational Leadership",
          "Teacher Training and Development"
        ],
        publications: [
          "Kassim, J. S., Hajan, B. H., Judan, S. J., Hadjirul, W. H., & Julhiji, R. Z. (2025). Voices of Mothers as Teacher Leaders in Higher Education Within an Islamic Context: Pathways to Gender-Sensitive Educational Leadership in Understanding Women's Avoidance of Leadership in Higher Education. IGI Global Scientific Publishing, 93-120.",
          "Abantas, J. C., Akmad, S. E., Bonggat Jr, R. B., Abubakar, A. U., Nuruddin, N. H., Hajan, B. H. & Anito Jr, J. C. (2025). Distance Learning in Focus: A Bibliometric and Thematic Network Analysis of the Global. International Journal of Learning, Teaching and Educational Research, 24(4), 730-754.",
          "Akmad, R. A., Jackaria, P. M., Derramas, C. A., Hajan, B. H., & Mastul, A. H. (2025). Fostering School-Community Collaboration in Island Schools in the Philippines: School Heads' Challenges and Strategies in Fostering School-Community Collaboration in Island Schools in the Philippines: School Heads' Challenges and Strategies. IGI Global Scientific Publishing, 375-402.",
          "Hajan, B. H., Fortuito, M. F., Benson, K. E. T., Celeste, A. B., Almendraz, A. A., Abdurajid, A. B., & Miguel, T. S. (2025). Discontinuing Mother Tongue as Medium of Instruction: A Critical Inquiry of Language Policy From a Translanguaging Perspective in Global Perspective on Issues and Trends in Educational Translanguaging. IGI Global Scientific Publishing, 181-208."
        ],
        experience: [
          "Led BARMM-MBHTE initiative on developing an Indigenous Peoples Education (IPED) framework for the Sama-Bajao",
          "Contributed to USAID\u2013Education Pathways project on teacher training needs assessment tools",
          "Led CHED-funded program on action research training",
          "Contributed to Australian Aid\u2013supported policy review on Madrasah education in BARMM",
          "Presented research in the Philippines, Indonesia, Singapore, Hong Kong, Thailand, and the United States"
        ],
        description: "Bonjovi H. Hajan is an educator and researcher committed to advancing language and literacy education and culture studies. He currently serves as Director of the Sama Studies Center and the Sentro ng Wika at Kultura at Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), where he is also an Associate Professor and Research Chair of the College of Education. He holds a Master of Arts in Education, specializing in English Language Teaching, from the Philippine Normal University in Manila, and graduated cum laude with a Bachelor of Secondary Education major in English from Western Mindanao State University. Bonjovi has led and contributed to funded projects, including a BARMM-MBHTE initiative on developing an Indigenous Peoples Education (IPED) framework for the Sama-Bajao, a USAID\u2013Education Pathways project on teacher training needs assessment tools, a CHED-funded program on action research training, and an Australian Aid\u2013supported policy review on Madrasah education in BARMM. He has published widely and presented research in the Philippines, Indonesia, Singapore, Hong Kong, Thailand, and the United States. In 2024, he was recognized as an MSU-TCTO's top researcher for his Scopus-indexed publications. Earlier this year, he represented the Philippines as a global scholar at the Translinguistics Research and Publishing Summer Institute at The Pennsylvania State University in the US. Through his teaching, research, and leadership, Bonjovi continues to amplify voices from the Bangsamoro, bridging local knowledge with global scholarship."
      },
      wagas: {
        name: "Asst. Prof. Ronaliza M. Wagas",
        position: "College Secretary, College of Education",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/Wagas.png",
        education: [
          "Master of Education, Major in Administration and Supervision - Mindanao State University - Tawi-Tawi College of Technology and Oceanography",
          "Bachelor of Secondary Education, Major in English - Mindanao State University - Tawi-Tawi College of Technology and Oceanography"
        ],
        achievements: [
          "Associate Professor V, MSU-TCTO",
          "College Secretary, College of Education, MSU-TCTO (Effective August 2025)",
          "Faculty Member, Department of Language Education, College of Education"
        ],
        positions: [
          "Field of Specialization: English, Administration and Supervision",
          "College Secretary, College of Education, MSU-TCTO",
          "Faculty Member, Department of Language Education"
        ],
        research: [
          "English Language Teaching",
          "Educational Administration",
          "Culturally Responsive Reading Instruction"
        ],
        experience: [
          "Extensive teaching experience in English language, literature, and communication",
          "Recent involvement: Lakbay-Basa: A Culturally Responsive High School Reading Project Across Content Areas (October\u2013December 2025)"
        ],
        description: "Assoc. Prof. Ronaliza M. Wagas is a faculty member of the Department of Language Education at the College of Education, Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). She earned her Bachelor of Secondary Education major in English and Master of Education major in Administration and Supervision from the same institution. Currently serving as College Secretary of the College of Education effective August 2025, she is an educator dedicated to advancing English language education and educational leadership. Her extensive teaching experience has honed her expertise in English language, literature, and communication, enriching her pedagogical practice and student engagement. Her research interests include English language teaching, educational administration, and culturally responsive reading instruction. Her recent involvement includes the Lakbay-Basa: A Culturally Responsive High School Reading Project Across Content Areas (October\u2013December 2025)."
      },
      werble: {
        name: "Prof. Surma J. Werble, PhD",
        position: "Faculty",
        rank: "Professor VI",
        image: "/images/coed/Profile/Werble.png",
        education: [
          "Doctor of Philosophy in Education, Major in English Language Teaching"
        ],
        achievements: [
          "Professor VI, MSU-TCTO",
          "Faculty Member, Department of Language Education"
        ],
        positions: [
          "Field of Specialization: English Language Teaching",
          "Department of Language Education"
        ],
        research: [
          "Teaching English as a Second Language (TESL)",
          "Graduate Education",
          "English Language Pedagogy"
        ],
        experience: [
          "Extensive expertise in TESL and graduate education",
          "Mentors graduate students in advanced English language teaching methodologies"
        ],
        description: "Prof. Surma J. Werble is a Professor VI at the Department of Language Education of Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). She completed her Doctor of Philosophy in Education major in English Language Teaching and brings extensive expertise in TESL and graduate education. Prof. Werble is dedicated to mentoring educators and honing advanced methodologies in English language instruction, ensuring that graduate students are equipped with globally informed and context-responsive teaching practices."
      },
      jackaria: {
        name: "Assoc. Prof. Potchong M. Jackaria",
        position: "Coordinator, College Quality Assurance and Extension",
        rank: "Associate Professor III",
        image: "/images/coed/Profile/jackaria, Potchong.png",
        education: [
          "Master of Arts in Education, Major in Administration and Supervision - Mindanao State University - Tawi-Tawi College of Technology and Oceanography",
          "Master of Science Education, Major in Mathematics - Mindanao State University - Iligan Institute of Technology"
        ],
        achievements: [
          "Associate Professor III, MSU-TCTO",
          "Coordinator, College Quality Assurance and Extension",
          "Former public school mathematics teacher and school head",
          "Trainer and mentor for in-service mathematics teachers"
        ],
        positions: [
          "Field of Specialization: Mathematics Education",
          "Department of Science and Mathematics Education, College of Education",
          "College of Education, MSU-TCTO"
        ],
        specialization: [
          "Mathematics Teaching",
          "Technology Integration in Education",
          "Education Policy"
        ],
        research: [
          "Mathematics Teaching",
          "Technology Integration in Education",
          "Education Policy"
        ],
        publications: [
          "Jackaria, P. M., Al-adzran, G. S., Alvarado, H. A. L., Jiripa, R. H. M., & Al-sabrie, Y. S. (2026). Students' Learning Math With the Aid of AI and the Need of Shifting Classroom Instructions. In Generators, Bots, and Tutors: Creative Approaches to Human-AI Synergy in Classroom Instruction (pp. 31-56). IGI Global Scientific Publishing.",
          "Hatae, A. N. H., Lakibul, A. A., Jackaria, P. M., Jaudinez, A. S., & Abubakar, A. J. U. (2025). Integrating Indigenous Cultural Elements Into Mathematics Instruction: A Case From Southern Philippines. In Diversity, Equity, and Inclusion for Mathematics and Science Education: Cases and Perspectives (pp. 271-302). IGI Global Scientific Publishing.",
          "Akmad, R. A., Jackaria, P. M., Ayangco-Derramas, C., Hajan, B. H., & Mastul, A. R. H. (2025). Fostering School-Community Collaboration in Island Schools in the Philippines: School Heads' Challenges and Strategies. In Navigating Learning, Culture, and Identity in Island Education (pp. 375-402). IGI Global Scientific Publishing.",
          "Sukarno, A. A., Al-adzkhan, N. A., Bulkia, W. S. M., & Jackaria, P. M. (2026). Students Building Emotional Connections With Al: Insights Into the Future AI-Infused Classroom. In Generators, Bots, and Tutors: Creative Approaches to Human-AI Synergy in Classroom Instruction (pp. 161-184). IGI Global Scientific Publishing."
        ],
        experience: [
          "Extensive experience teaching in different public schools handling elementary level mathematics",
          "Former school head",
          "Involved in teachers' training",
          "Coordinates quality assurance and extension programs for science and mathematics education"
        ],
        description: "Potchong M. Jackaria currently holds a rank of Associate Professor 3 under the Science and Mathematics Department of the College of Education, Mindanao State University Tawi-Tawi, College of Technology and Oceanography in Tawi-Tawi, Philippines. Prior to working at MSU, he had an extensive experience teaching in different public schools handling elementary level mathematics and later as school head. Assoc. Prof. Jackaria obtained his master degree in Education in Administration and Supervision from MSU Tawi-Tawi College of Technology and Oceanography and a Master of Science Education Major in Mathematics from MSU-Iligan Institute of Technology. He was involved in teachers' training and is interested in research areas including mathematics teaching, technology integration in education, and education policy."
      },
      latif: {
        name: "Assoc. Prof. Fauzia K. Sali-Latif",
        position: "Faculty",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/FAUZIA S. LATIF.png",
        education: [
          "Doctor of Philosophy in Science Education (Currently Pursuing) - University of Malaya, Kuala Lumpur, Malaysia",
          "Master of Science in Teaching General Science - Mindanao State University-Marawi City",
          "Bachelor of Secondary Education, Major in Physics - Mindanao State University-Marawi Campus"
        ],
        achievements: [
          "Associate Professor V, MSU-TCTO",
          "College Dean (January 2022 to August 2024)",
          "College Secretary (2018 to 2021)",
          "Licensed Professional Teacher",
          "Best Presenter Award - Research presentation in Thailand",
          "Presented research papers in Malaysia and Thailand"
        ],
        positions: [
          "Field of Specialization: Science Education, Sciences",
          "Department of Science and Mathematics Education, College of Education",
          "College Dean (January 2022 to August 2024)",
          "College Secretary (2018 to 2021)"
        ],
        research: [
          "Science Pedagogy",
          "Environmental Education",
          "Intersection of Science and Religion"
        ],
        experience: [
          "Teaching science and science education courses at the university level",
          "Presented research papers in Malaysia and Thailand",
          "Received Best Presenter Award for research presentation"
        ],
        description: "FAUZIA K. SALI-LATIF is an Associate Professor V in the Department of Science and Mathematics Education at the College of Education, Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). She previously served as College Dean from January 2022 to August 2024, and as College Secretary from 2018 to 2021. She is currently pursuing her Doctor of Philosophy in Science Education at the University of Malaya in Kuala Lumpur, Malaysia. A Licensed Professional Teacher, she has been teaching science and science education courses at the university level. Assoc. Prof. Sali-Latif holds a Bachelor of Secondary Education degree, major in Physics, and a Master of Science in Teaching General Science, both from Mindanao State University \u2013 Marawi Campus. Her research interests include science pedagogy, environmental education, and the intersection of science and religion. She has presented research papers in Malaysia and Thailand, where she was honored with the Best Presenter Award."
      },
      eldani: {
        name: "Asst. Prof. Nurul-Ainie S. Eldani",
        position: "Faculty",
        rank: "Assistant Professor IV",
        image: "/images/coed/Profile/ELDANI.png",
        education: [
          "Master of Science Education in General Science (MSciEd - General Science) (Currently Pursuing)",
          "Master of Arts in Education, Major in Supervision and Administration - Mindanao State University-TCTO",
          "Bachelor of Secondary Education, Major in Physical Science/Physics - Western Mindanao State University, 2011"
        ],
        achievements: [
          "Assistant Professor IV, MSU-TCTO",
          "Licensed Professional Teacher"
        ],
        positions: [
          "Field of Specialization: Physics Education/Physical Science",
          "Handles courses in Professional Education and Science subjects"
        ],
        research: [
          "Physics Education",
          "Physical Science",
          "Science Education"
        ],
        publications: [
          "Eldani, N. A. S., Pon, M. M. R., Tangon, E., Jaudinez, I. P., Marcial, H. D., & Bonggat Jr., R. B. (2025). Zoochemicals: secondary metabolites and toxicity potential of soft coral Rumphella aggregata (Nutting, 1910) from Tandubas."
        ],
        experience: [
          "Teaching Professional Education and Science subjects at the university level"
        ],
        description: "Nurul-Ainie S. Eldani is a licensed professional teacher and a graduate of Master of Education in Supervision and Administration from Mindanao State University-TCTO. She is currently pursuing her second master's degree in Master of Science Education in General Science (MSciEd - General Science). She obtained her undergraduate degree in Bachelor of Secondary Education major in Physical Science/Physics at Western Mindanao State University in 2011. She handles courses such as Professional Education and Science subjects."
      },
      jaudinez: {
        name: "Asst. Prof. Aljemedin S. Jaudinez",
        position: "Faculty",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/Jaudinez.png",
        education: [
          "Doctor of Philosophy in Learning & Teaching in STEM (Mathematics & Statistics Education) (Currently Pursuing) - North Carolina State University, USA (Fulbright Foreign Student Program)",
          "Master of Arts in Education, Major in Mathematics Education - University of the Philippines Diliman, 2022 (Academic Excellence Award, Best Thesis Award)",
          "Bachelor of Secondary Education, Major in Mathematics - Mindanao State University Tawi-Tawi, 2015 (Summa Cum Laude, University Leadership Award)"
        ],
        achievements: [
          "Associate Professor V, MSU-TCTO",
          "Licensed Professional Teacher",
          "Civil Service Eligible",
          "Fulbright Foreign Student Program Scholar",
          "Academic Excellence Award - University of the Philippines Diliman (2022)",
          "Best Thesis Award - University of the Philippines Diliman (2022)",
          "Summa Cum Laude - MSU Tawi-Tawi (2015)",
          "University Leadership Award - MSU Tawi-Tawi (2015)",
          "Grants from MSU Tawi-Tawi and DOST-SEI for Master's program"
        ],
        positions: [
          "Field of Specialization: Mathematics and Statistics Education",
          "Director of the Sama Studies Center (Former)",
          "Chair of the Department of Science and Mathematics Education (Former)",
          "Faculty Member, MSU Tawi-Tawi (since 2015)"
        ],
        research: [
          "Inclusive and Integrated STEM Education",
          "Mathematics Education",
          "Statistics Education"
        ],
        publications: [
          "Tawi-Tawi, Philippines. AACL Bioflux 18(4):1846-1857."
        ],
        experience: [
          "Teaching content and pedagogical courses in mathematics and statistics since 2015",
          "Presented research papers in reputable journals and international conferences",
          "Resource speaker and organizer of seminars and conferences related to STEM education"
        ],
        description: "Aljemedin S. Jaudinez is an Associate Professor of Mathematics Education who is currently pursuing a PhD in Learning & Teaching in STEM (Mathematics & Statistics Education) at the North Carolina State University, USA, under the Fulbright Foreign Student Program. He earned a Master's degree in Mathematics Education from the University of the Philippines Diliman in 2022, where he received the Academic Excellence Award and Best Thesis Award. He also received grants from Mindanao State University (MSU) Tawi-Tawi and the Philippine Department of Science and Technology (DOST) Science Education Institute (SEI) for his Master's program. He completed his Bachelor of Secondary Education, Major in Mathematics, at MSU Tawi-Tawi in 2015, receiving awards including Summa Cum Laude and University Leadership Award. A licensed professional teacher and civil service eligible, he has been a faculty member at MSU Tawi-Tawi teaching content and pedagogical courses in mathematics and statistics since 2015. He has held multiple leadership roles within the university, including Director of the Sama Studies Center and Chair of the Department of Science and Mathematics Education. He is committed to championing inclusive and integrated STEM education as manifested in his research publications and presentations in reputable journals and international conferences, along with his contributions as a resource speaker and organizer of related seminars and conferences."
      },
      tangon: {
        name: "Asst. Prof. Efren Tangon, PhD",
        position: "Chairperson, Department of Science and Mathematics Education",
        rank: "Assistant Professor IV",
        image: "/images/coed/Profile/Dr. Efren Tangon, Phd.png",
        education: [
          "Doctor of Philosophy in Science Education, Major in Chemistry - University of Science and Technology of Southern Philippines, Cagayan de Oro City"
        ],
        achievements: [
          "Assistant Professor IV, MSU-TCTO",
          "Chairperson, Department of Science and Mathematics Education (DSME)",
          "Manangha Award",
          "Dedicated researcher in chemical sciences, particularly marine and environmental chemistry"
        ],
        positions: [
          "Field of Specialization: Chemistry Education",
          "Chairperson, Department of Science and Mathematics Education (DSME)",
          "College of Education, MSU-TCTO"
        ],
        research: [
          "Phytochemical Screening and Proximate Composition of Seagrasses",
          "Marine and Environmental Chemistry",
          "Bioactive Compounds and Anti-oxidant Properties",
          "Chemical Sciences"
        ],
        publications: [
          "Eldani, N. A. S., Pon, M. M. R., Tangon, E., Jaudinez, I. P., Marcial, H. D., & Bonggat Jr., R. B. (2025). Zoochemicals: secondary metabolites and toxicity potential of soft coral Rumphella aggregata (Nutting, 1910) from Tandubas, Tawi-Tawi, Philippines. AACL Bioflux 18(4):1846-1857.",
          "Langamin, K. A., Langamin, M. V. B., Tangon, E., Pajiji, J., & Abubakar, F. R. I. (2025). Phytochemical Profiling and Brine Shrimp Lethality test of the methanol Extract of Lantana camara from Simunul, Tawi-Tawi, Philippines. International Journal of Modern Pharmaceutical Research, 9(2), 28-32. ISSN: 2319-5978."
        ],
        experience: [
          "Contributing to the advancement of chemical sciences, particularly in marine and environmental chemistry",
          "Research on phytochemical screening and proximate composition of seagrasses",
          "Exploring potential of seagrasses as sources of nutrients and bioactive compounds",
          "Supporting development of marine science in the region",
          "Fostering innovation and ecological awareness through chemistry"
        ],
        description: "Dr. Efren Tangon is an Associate Professor V and dedicated researcher of the Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography, where he contributes to the advancement of chemical sciences, particularly in marine and environmental chemistry. His scholarly focus is on the phytochemical screening and proximate composition of seagrasses, exploring their potential as sources of nutrients and bioactive compounds and anti-oxidant properties. Dr. Tangon is a graduate of the Doctor of Philosophy in Science Education major in Chemistry at the University of Science and Technology of Southern Philippines in Cagayan de Oro City. He has been designated Chairperson of the Department of Science and Mathematics Education (DSME) of the College of Education. His commitment to research and education continues to support the development of marine science in the region, fostering innovation and ecological awareness through chemistry."
      },
      sala: {
        name: "Rehina U. Sala",
        position: "Faculty",
        rank: "Master Teacher II",
        image: "/images/coed/Profile/Sala.png",
        education: [
          "Doctor of Philosophy (Completed Academic Requirements), Major in Biology - MSU-Main Campus, Marawi City"
        ],
        achievements: [
          "Master Teacher II, MSU-TCTO",
          "Faculty Member, Department of Science and Mathematics Education"
        ],
        positions: [
          "Field of Specialization: Biology Education",
          "Department of Science and Mathematics Education, College of Education"
        ],
        research: [
          "Biology Education",
          "Environmental Science"
        ],
        description: "Rehina U. Sala is a faculty member of the department of science and mathematics education at Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), Sanga-Sanga, Bongao, Tawi-Tawi, Philippines, where she is currently holds the rank of master teacher-II, she is presently on the process of completing her dissertation writing leading to the degree of Doctor of Philosophy in science education major in Biology. Her academic and research interest focus on biology education and environmental science, Ms. Sala is passionate about teaching and aims to promote meaningful teaching experiences in science education."
      },
      sapal: {
        name: "Mulyadi S. Sapal, PhD",
        position: "Faculty",
        rank: "Master Teacher II",
        image: "/images/coed/Profile/Sapal.png",
        education: [
          "Doctor of Philosophy in Education, Major in Mathematics - University of Southern Mindanao"
        ],
        achievements: [
          "Master Teacher II, MSU-TCTO",
          "Faculty Member, Department of Science and Mathematics Education"
        ],
        positions: [
          "Field of Specialization: Mathematics Education",
          "Department of Science and Mathematics Education, College of Education"
        ],
        research: [
          "Mathematics Education",
          "Educational Research"
        ],
        description: "Dr. Mulyadi S. Sapal is a Master Teacher II at the Department of Science and Mathematics Education, College of Education, Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). He holds a Doctor of Philosophy in Education, Major in Mathematics from the University of Southern Mindanao. Dr. Sapal is dedicated to advancing mathematics education and fostering meaningful learning experiences for students."
      },
      dais: {
        name: "Prof. Shamira C. Dais, PhD",
        position: "Chairperson DPE",
        rank: "Professor VI",
        image: "/images/coed/Profile/msufaculty.png",
        education: [
          "Doctor of Education, Major in Physical Education (Specialization in Curriculum and Instruction) - Southwestern University, Cebu City",
          "Master of Science in Physical Education, Major in Sports - University of the Philippines Diliman",
          "Bachelor of Secondary Education, Major in PEHM - Western Mindanao State University"
        ],
        achievements: [
          "Chairperson, Department of Physical Education, College of Education",
          "Professor VI, MSU-TCTO",
          "Former Sports Director, Sports Development Office, MSU-TCTO (served nearly four years)",
          "Licensed Professional Teacher",
          "International Volleyball Referee for almost 20 years",
          "Member, Philippine National Volleyball Federation (PNVF)",
          "Gadjamina Award",
          "Dedicated sports and health advocate with over 30 years of teaching experience promoting holistic well-being"
        ],
        positions: [
          "Field of Specialization: Physical Education, Sports, Dance, Health, Fitness and Recreation",
          "Department of Physical Education, College of Education"
        ],
        research: [
          "Physical Education",
          "Sports",
          "Dance",
          "Health",
          "Fitness and Recreation"
        ],
        experience: [
          "Over 30 years of teaching experience promoting holistic well-being",
          "Former Sports Director at the MSU-TCTO Sports Development Office",
          "Active participant in trainings and seminars related to physical education and sports",
          "Member of local and international physical education and sports organizations"
        ],
        awards: [
          "Gadjamina Award"
        ],
        description: "Prof. Shamira C. Dais is 53 years old and resides in Brgy. Sanga-Sanga, Bongao, Tawi-Tawi. She is happily married and blessed with four children. She graduated with a Bachelor of Secondary Education major in PEHM at Western Mindanao State University, completed a Master of Science in Physical Education major in Sports at the University of the Philippines Diliman, and earned a Doctor of Education major in Physical Education with a specialization in Curriculum and Instruction at Southwestern University, Cebu City. A dedicated sports and health advocate with over 30 years of teaching experience at MSU-TCTO, she currently serves as Chairperson of the Department of Physical Education and holds the rank of Professor VI. Dr. Dais is a licensed professional teacher, former Sports Director of the Sports Development Office, and an international volleyball referee for almost two decades. She remains committed to promoting holistic well-being through sports, dance, health, fitness, and recreation, and maintains affiliations with the Philippine National Volleyball Federation and other professional organizations."
      },
      shajila: {
        name: "Shajila C. Ali",
        position: "Instructor I",
        image: "/images/coed/Profile/Shajilla C. Ali.png",
        education: [
          "Master of Arts in Education, Major in Physical Education (Currently Pursuing) - University of Mindanao",
          "Bachelor's degree in Physical Education - Western Mindanao State University"
        ],
        achievements: [
          "Instructor I, MSU-TCTO",
          "Licensed Professional Teacher",
          "Faculty Member, Department of Physical Education, College of Education",
          "Over nine years of teaching experience at MSU-TCTO",
          "Member of various local and international physical education organizations"
        ],
        positions: [
          "Field of Specialization: Physical Education and Sports",
          "Department of Physical Education, College of Education"
        ],
        research: [
          "Physical Education",
          "Sports",
          "Health and Fitness"
        ],
        experience: [
          "Over nine years of teaching experience at MSU-TCTO",
          "Regular attendance at professional development workshops, seminars, and training sessions",
          "Member of various local and international physical education organizations"
        ],
        description: "Ms. Shajila C. Ali is 30 years old and resides in Brgy. Sanga-Sanga, Bongao, Tawi-Tawi. She is about to embark on a new chapter in her life as she enters marriage. She graduated with a Bachelor's degree in Physical Education from Western Mindanao State University and is currently pursuing a Master of Arts in Physical Education at the University of Mindanao. She is a licensed professional teacher and a faculty member in the College of Education, specifically in the Department of Physical Education. With over nine years of teaching experience at MSU-TCTO, her area of expertise encompasses Physical Education and Sports. As a sports enthusiast, she is passionate about promoting health and fitness among her students. To stay updated with the latest trends in physical education and fitness, she regularly attends professional development workshops, seminars, and training sessions. Furthermore, she is a member of various local and international physical education organizations. Her primary goal is to empower students to reach their full potential while cultivating a sense of confidence and enjoyment in physical activity."
      },
      santos: {
        name: "Sharmina D. Santos",
        position: "Faculty",
        rank: "Instructor I",
        image: "/images/coed/Profile/Sharmina D. Santos.png",
        education: [
          "Master of Science in Physical Education - Western Mindanao State University (March 2024)",
          "Professional Diploma in Physical Education - MSU-TCTO",
          "Bachelor of Science in Nursing - Universidad de Zamboanga"
        ],
        achievements: [
          "Instructor I, MSU-TCTO",
          "Licensed Professional Teacher",
          "Faculty Member, Department of Physical Education, College of Education",
          "Wellness Coach and Advocate of Health and Fitness",
          "Member of various local and international organizations in Physical Education",
          "Presented research paper at 11th ASEAN Council of Physical Education and Sports (ACPES) International Conference at MSU-IIT, October 1-3, 2025"
        ],
        positions: [
          "Field of Specialization: Physical Education, Sports, Dance, Health, Wellness, Fitness and Recreation",
          "Department of Physical Education, College of Education"
        ],
        research: [
          "Physical Education",
          "Sports",
          "Dance",
          "Health and Wellness",
          "Fitness and Recreation",
          "Cultural Heritage in Education"
        ],
        publications: [
          'A.Gadaza, A.Manera, S.Santos, C. Alih, R.Caban, A. Tulawie, "Reviving the Past, Teaching the Future: The Role of Philippine Cultural Heritage in Curriculum Development of Teacher Education Programs", International Journal on Culture, History, and Religion, July 7, 2025, Volume 7, Special Issue 2, 18 pages'
        ],
        experience: [
          "Attended various training and seminars related to Physical Education",
          "Member of various local and international organizations in Physical Education",
          "Presented research at 11th ASEAN Council of Physical Education and Sports (ACPES) International Conference"
        ],
        description: `Ms. SHARMINA D. SANTOS is 36 years old and a resident of Brgy. Sanga-Sanga Bongao, Tawi-Tawi. She is happily married and blessed with two children. She graduated bachelor of Science in Nursing at Universidad de Zamboanga and she pursue Professional Diploma in Physical Education at MSU-TCTO. She finished Master of Science in Physical Education at Western Mindanao State University last March 2024. Ms. Santos is a licensed professional teacher. Currently she is a faculty member under College of Education, Department of physical Education. Her Field of Specialization includes Physical Education, Sports, Dance, Health, Wellness, Fitness and Recreation. She is wellness coach and an advocate of health and fitness. She attended various training and seminars related to her field. She is member of various local and international organization in Physical Education. She believes that lifelong physical activity is the practice of maintaining regular physical movement throughout one's life to support physical, mental, social and over-all well-being. Recently she presented her research paper at 11th ASEAN Council of Physical Education and Sports (ACPES) International Conference at MSU-IIT, October 1-3, 2025. She also has a Scopus publication titled: "Reviving the Past, Teaching the Future: The Role of Philippine Cultural Heritage in Curriculum Development of Teacher Education Programs", International Journal on Culture, History, and Religion, July 7, 2025, Volume 7, Special Issue 2, 18 pages.`
      },
      blanche: {
        name: "Blanche B. Matolo",
        position: "Acting Director of OSAR",
        rank: "Instructor I",
        image: "/images/coed/Profile/msufaculty.png",
        education: [
          "Master of Science in Physical Education, Major in Sports - Western Mindanao State University (2021)",
          "Bachelor of Physical Education (BPE) - Western Mindanao State University (Class of 2006)"
        ],
        achievements: [
          "Instructor I, MSU-TCTO",
          "Acting Director, Office of Sports and Recreation (OSAR) (since 2024)",
          "Former Chairperson, Sports, Physical Education and Recreation (SPEAR Department)",
          "Sports Director, Office of Sports and Recreation (OSAR)"
        ],
        positions: [
          "Field of Specialization: Dance and Sports",
          "Acting Director, Office of Sports and Recreation (OSAR)",
          "Department of Physical Education, College of Education"
        ],
        research: [
          "Physical Education",
          "Sports",
          "Dance",
          "Cultural Heritage in Education"
        ],
        publications: [
          `Blanche Belarga, Beatriz Guiqing-Clemente, Alnadzma Tulawie, Cherry Alih, Reymarie Caban, Fely Rose Manois. "From Page to Praxis: The Role of Regional Literature in Shaping Culturally Grounded Teaching Methods in HEI's". Vol. 7 No. SI2 (2025): Reclaiming Roots, Reimagining Futures: Integrating Cultural Heritage and Practical Knowledge in Education and Community Development`
        ],
        experience: [
          "Former Chairperson, Sports, Physical Education and Recreation (SPEAR Department)",
          "Actively promoted physical education programs and sports initiatives within the university",
          "Sports Director, Office of Sports and Recreation (OSAR) since 2024"
        ],
        description: "Ms. BLANCHE B. BELARGA is 40 years old and a resident of Barangay Sanga-Sanga, Bongao, Tawi-Tawi. She is happily married and blessed with three children. She is graduate of the Bachelor of Physical Education (BPE), class of 2006, from Western Mindanao State University (WMSU). In 2021, she completed the academic requirements for the Master of Science in Physical Education (MSPE) in the same institution, further strengthening her expertise in the field. She previously served as the Chairperson of the Sports, Physical Education and Recreation (SPEAR Department), where she actively promoted physical education programs and sports initiatives within the university. With her strong commitment to fostering athletic growth and student development, she currently holds the position of Sports Director of the Office of Sports and Recreation (OSAR), a role she has been fulfilling since 2024. Blanche continues to champion a culture of wellness, discipline, and excellence in sports, embodying both passion and professionalism in her service to the academic and athletic community."
      },
      mohammad: {
        name: "Al-Shadat A. Mohammad",
        position: "Director of OCAD",
        rank: "Instructor I",
        image: "/images/coed/Profile/AL-SHADAT A. MOHAMMAD.png",
        education: [
          "Master of Arts in Education, Major in Physical Education - Philippine Christian University"
        ],
        achievements: [
          "Instructor I, MSU-TCTO",
          "Director, Office of Cultural Affairs and Development (OCAD)",
          "Faculty Member, Department of Physical Education, College of Education"
        ],
        positions: [
          "Field of Specialization: Dance, Martial Arts and Sports",
          "Director, Office of Cultural Affairs and Development (OCAD)",
          "Department of Physical Education, College of Education"
        ],
        research: [
          "Sports Pedagogy",
          "Movement Education",
          "Physical Education",
          "Dance",
          "Martial Arts",
          "Sports"
        ],
        description: "Al-Shadat A. Mohammad is a faculty member of the College of Education, specializing in Physical Education. He currently serves as Director of the Office of Cultural Affairs and Development at Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), His teaching and research interests include sports pedagogy and movement education. As an educator, Mr. Mohammad is committed to promoting holistic development through physical education, emphasizing discipline, teamwork, and cultural awareness. He designs lessons that foster both physical competence and appreciation of the diverse traditions that shape Filipino identity. He continues to inspire future educators to view Physical Education not only as a subject for physical fitness but also as a platform for character formation, cultural preservation, and lifelong well-being."
      },
      salasain: {
        name: "Rubina Salasain",
        position: "Faculty",
        rank: "Instructor I",
        image: "/images/coed/Profile/Rubina J. Salasain.png",
        education: [
          "Master in Physical Education, Major in School Fitness and Sports (Currently Pursuing) - Western Mindanao State University (APDP Faculty Grantee)",
          "Certificate in Physical Education - Pamantasan Lungsod ng Maynila",
          "Bachelor of Elementary Education - MSU-TCTO"
        ],
        achievements: [
          "Instructor I, MSU-TCTO",
          "Permanent Tenure, College of Education, Department of Physical Education",
          "35 years of teaching experience",
          "Former Coach, MSU Dolphins Volleyball Women Varsity Team",
          "Member, Philippine National Volleyball Federation (PNVF)",
          "Candidate, International Referee in Volleyball"
        ],
        positions: [
          "Field of Specialization: School Fitness and Sports",
          "Department of Physical Education, College of Education"
        ],
        research: [
          "Physical Education",
          "School Fitness",
          "Sports",
          "Volleyball"
        ],
        experience: [
          "35 years of teaching experience",
          "Former Coach, MSU Dolphins Volleyball Women Varsity Team",
          "Member, Philippine National Volleyball Federation (PNVF)",
          "Candidate, International Referee in Volleyball"
        ],
        description: "MS. RUBINA SALASAIN is 56 years old, was born at Bakong, Simunul and a resident of Brgy. Sanga-Sanga Bongao, Tawi-Tawi. She is happily married and blessed with two children. She graduated Bachelor of Elementary Education at MSU-TCTO and she pursue a Certificate in Physical Education at Pamantasan Lungsod ng Maynila. Currently she is pursuing her degree in Master in Physical Education major in School Fitness and Sports at Western Mindanao State University as an APDP faculty grantee. Ms. Salasain has 35 years teaching experience, she holds a permanent tenure as Instructor I under College of Education, Department of Physical Education. Ms. Salasain is a sports enthusiast; she was the former coach of MSU Dolphins Volleyball Women varsity team. She is a member of Philippine National Volleyball Federation (PNVF) and candidate as an International Referee in Volleyball."
      },
      abdulwahab: {
        name: "Assoc. Prof. Rubia A. Abulwahab",
        position: "Faculty",
        rank: "Associate Professor V",
        image: "/images/coed/Profile/msufaculty.png",
        education: [
          "Doctor of Philosophy in Counseling, Major in School and Community Counseling (Currently Pursuing) - De La Salle University-Dasmari\xF1as (APDP Grant)",
          "Master of Arts in Education, Major in Administration and Supervision - MSU-TCTO (2015)",
          "Bachelor of Science major in Psychology - MSU-Marawi (2005, Special Muslim Grant)"
        ],
        achievements: [
          "Associate Professor V, MSU-TCTO",
          "Licensed Professional Teacher",
          "Faculty Member, College of Education"
        ],
        positions: [
          "Field of Specialization: Administration and Supervision",
          "College of Education, MSU-TCTO"
        ],
        research: [
          "Psychology",
          "Education",
          "Administration and Supervision",
          "School and Community Counseling"
        ],
        experience: [
          "Teaching and counseling experience",
          "Guiding learners toward personal growth and academic excellence"
        ],
        description: "Assoc. Prof. Rubia A. Abulwahab is an Associate Professor V at the College of Arts and Sciences, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). She earned her Bachelor of Science major in Psychology from MSU-Marawi in 2005 under the Special Muslim Grant and completed her Master of Arts in Education major in Administration and Supervision at MSU-TCTO in 2015. Currently, she is pursuing her Doctor of Philosophy in Counseling major in School and Community Counseling at De La Salle University-Dasmari\xF1as through the APDP grant. A licensed professional teacher, Assoc. Prof. Abulwahab specializes in psychology and is deeply passionate about teaching, counseling, and guiding learners toward personal growth and academic excellence."
      }
    };
    const faculty = facultyData[facultyId];
    if (!faculty) return;
    const displayName = formatDisplayName({
      name: faculty.name,
      rank: faculty.rank,
      position: faculty.position
    });
    modalBody.innerHTML = `
		<div class="relative">
			<!-- Hero Section -->
			<div class="relative bg-gradient-to-r from-msu-deep-ocean to-msu-bgc-color rounded-t-2xl">
				<div class="flex flex-col items-center justify-center py-8 px-4 md:px-8">
					<div class="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white mb-6">
						<img src="${faculty.image}" alt="${faculty.name}" class="w-full h-full object-contain" />
					</div>
					<h1 class="text-3xl md:text-4xl font-bold text-white text-center">${displayName || expandAbbreviatedPrefix(faculty.name)}</h1>
					${faculty.position || faculty.rank ? `
						<div class="mt-4 flex flex-col items-center space-y-1 text-center">
							${faculty.position ? `<p class="text-sm md:text-base text-gray-200 font-medium">${faculty.position}</p>` : ""}
							${faculty.rank ? `<p class="text-xs md:text-sm text-gray-300 uppercase tracking-wide">${faculty.rank}</p>` : ""}
						</div>
					` : ""}
				</div>
			</div>
			<!-- Content Section -->
			<div class="p-8 space-y-8">
				<!-- Description -->
				<div class="bg-gradient-to-r from-msu-deep-ocean/10 to-transparent p-6 rounded-xl border-l-4 border-msu-deep-ocean">
					<p class="text-lg text-msu-main-color dark:text-msu-bgc-color leading-relaxed">${faculty.description}</p>
				</div>
				
				<!-- Education -->
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean dark:text-msu-bgc-color mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
						</svg>
						Educational Background
					</h3>
					<div class="space-y-3">
						${faculty.education.map((edu) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${edu}</p>
							</div>
						`).join("")}
					</div>
				</div>
				
				<!-- Achievements -->
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
						</svg>
						Key Achievements
					</h3>
					                                        <div class="grid md:grid-cols-2 gap-4"> 
                                                ${faculty.achievements.map((achievement) => `                                                                     
                                                        <div class="bg-gradient-to-r from-msu-deep-ocean/10 to-transparent p-4 rounded-lg border-l-4 border-msu-deep-ocean">                                                                      
                                                                <p class="text-msu-main-color dark:text-msu-bgc-color">${achievement}</p>                       
                                                        </div>
                                                `).join("")}
                                        </div>
				</div>
				
				<!-- Specialization -->
				${faculty.specialization && faculty.specialization.length > 0 ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
						</svg>
						Areas of Specialization
					</h3>
					<div class="grid md:grid-cols-2 gap-3">
						${faculty.specialization.map((spec) => `
							<div class="bg-gradient-to-r from-msu-deep-ocean/10 to-transparent p-3 rounded-lg border-l-4 border-msu-deep-ocean">
								<p class="text-msu-main-color dark:text-msu-bgc-color font-medium">${spec}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				<!-- Awards & Recognitions -->
				${faculty.awards && faculty.awards.length > 0 ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
						</svg>
						Awards & Recognitions
					</h3>
					<div class="space-y-3">
						${faculty.awards.map((award) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${award}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				${faculty.leadership ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
						</svg>
						Leadership Roles
					</h3>
					<div class="space-y-3">
						${faculty.leadership.map((role) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${role}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				                                ${faculty.research ? `
                                <div>
                                        <h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
                                                <svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                                </svg>
                                                Research Interests
                                        </h3>
                                        <div class="space-y-3">
                                                ${faculty.research.map((research) => `
                                                        <div class="flex items-start">
                                                                <svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                                </svg>
                                                                <p class="text-msu-main-color dark:text-msu-bgc-color">${research}</p>
                                                        </div>
                                                `).join("")}
                                        </div>
                                </div>
                                ` : ""}
                                
                                ${faculty.publications && faculty.publications.length > 0 ? `
                                <div>
                                        <h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
                                                <svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                                </svg>
                                                Publications
                                        </h3>
                                        <div class="space-y-4">
                                                ${faculty.publications.map((pub, index) => `
                                                        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-l-4 border-msu-deep-ocean">
                                                                <div class="flex items-start">
                                                                        <span class="text-sm font-semibold text-msu-deep-ocean mr-3 mt-1 flex-shrink-0">${index + 1}.</span>
                                                                        <p class="text-sm text-msu-main-color dark:text-msu-bgc-color leading-relaxed">${pub}</p>
                                                                </div>
                                                        </div>
                                                `).join("")}
                                        </div>
                                </div>
                                ` : ""}
				
				${faculty.international ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						International Engagements
					</h3>
					<div class="space-y-3">
						${faculty.international.map((engagement) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${engagement}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				${faculty.positions ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
						</svg>
						Professional Experience
					</h3>
					<div class="space-y-3">
						${faculty.positions.map((position) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${position}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				${faculty.organizations ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
						</svg>
						Professional Organizations
					</h3>
					<div class="space-y-3">
						${faculty.organizations.map((org) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${org}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
			</div>
		</div>
	`;
    modal.style.display = "flex";
    modal.classList.remove("hidden");
    setTimeout(() => {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);
    document.body.style.overflow = "hidden";
  }
  function closeFacultyModal() {
    console.log("Closing modal");
    const modal = document.getElementById("facultyModal");
    const modalContent = document.getElementById("modalContent");
    if (!modal || !modalContent) {
      console.error("Modal elements not found for closing");
      return;
    }
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 300);
  }
  document.getElementById("facultyModal").addEventListener("click", function(e) {
    if (e.target === this) {
      closeFacultyModal();
    }
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closeFacultyModal();
    }
  });
  var currentPdfUrl = "";
  var currentPdfTitle = "";
  var pdfDoc = null;
  var pageNum = 1;
  var pageRendering = false;
  var pageNumPending = null;
  var scale = 1;
  var canvas = null;
  var ctx = null;
  var nextCanvas = null;
  var nextCtx = null;
  var isAnimating = false;
  var baseScale = 1;
  async function openPDFViewer(pdfUrl, title) {
    console.log("Opening professional PDF viewer:", { pdfUrl, title });
    if (!pdfUrl || pdfUrl === "" || pdfUrl === "#") {
      console.error("Invalid PDF URL:", pdfUrl);
      alert("PDF file not available for this program.");
      return;
    }
    currentPdfUrl = pdfUrl;
    currentPdfTitle = title;
    const modal = document.getElementById("pdfViewerModal");
    const titleElement = document.getElementById("modalPdfTitle");
    const loadingElement = document.getElementById("pdfLoading");
    const errorElement = document.getElementById("pdfError");
    const pdfViewerElement = document.getElementById("pdfViewer");
    if (modal && titleElement) {
      const isMobile = window.innerWidth < 640;
      const maxLength = isMobile ? 25 : 40;
      const displayTitle = title && title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
      titleElement.textContent = displayTitle || "MSU-TCTO Program Viewer";
      if (loadingElement) loadingElement.classList.remove("hidden");
      if (errorElement) errorElement.classList.add("hidden");
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      await initializePdfViewer();
    }
  }
  async function initializePdfViewer() {
    try {
      if (typeof window.pdfjsLib === "undefined") {
        await loadPdfJs();
      }
      const currentPageContainer = document.getElementById("currentPageContainer");
      const nextPageContainer = document.getElementById("nextPageContainer");
      if (!currentPageContainer || !nextPageContainer) return;
      currentPageContainer.innerHTML = "";
      nextPageContainer.innerHTML = "";
      canvas = document.createElement("canvas");
      canvas.id = "pdfCanvas";
      canvas.className = "shadow-lg border border-gray-200 rounded-lg";
      canvas.style.maxWidth = "100%";
      canvas.style.maxHeight = "100%";
      canvas.style.width = "auto";
      canvas.style.height = "auto";
      ctx = canvas.getContext("2d");
      nextCanvas = document.createElement("canvas");
      nextCanvas.id = "nextPdfCanvas";
      nextCanvas.className = "shadow-lg border border-gray-200 rounded-lg";
      nextCanvas.style.maxWidth = "100%";
      nextCanvas.style.maxHeight = "100%";
      nextCanvas.style.width = "auto";
      nextCanvas.style.height = "auto";
      nextCtx = nextCanvas.getContext("2d");
      currentPageContainer.appendChild(canvas);
      nextPageContainer.appendChild(nextCanvas);
      const loadingTask = window.pdfjsLib.getDocument(currentPdfUrl);
      pdfDoc = await loadingTask.promise;
      updatePageInfo();
      await renderPage(pageNum);
      const loadingElement = document.getElementById("pdfLoading");
      if (loadingElement) loadingElement.classList.add("hidden");
    } catch (error) {
      console.error("Error loading PDF:", error);
      showPdfError();
    }
  }
  async function loadPdfJs() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(void 0);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  function updatePageInfo() {
    const pageInfoElement = document.getElementById("pageInfo");
    if (pageInfoElement && pdfDoc) {
      pageInfoElement.textContent = `${pageNum} / ${pdfDoc.numPages}`;
      console.log("Page info updated:", `${pageNum} / ${pdfDoc.numPages}`);
    }
    updateNavigationButtons();
  }
  function updateNavigationButtons() {
    const prevButton = document.getElementById("pdfPrevPage");
    const nextButton = document.getElementById("pdfNextPage");
    if (prevButton) {
      const isDisabled = pageNum <= 1 || isAnimating;
      prevButton.disabled = isDisabled;
      if (isDisabled) {
        prevButton.classList.add("opacity-50", "cursor-not-allowed");
        prevButton.style.pointerEvents = "none";
      } else {
        prevButton.classList.remove("opacity-50", "cursor-not-allowed");
        prevButton.style.pointerEvents = "auto";
      }
      console.log("Previous button state:", { pageNum, isAnimating, disabled: isDisabled });
    }
    if (nextButton) {
      const isDisabled = pageNum >= pdfDoc?.numPages || isAnimating;
      nextButton.disabled = isDisabled;
      if (isDisabled) {
        nextButton.classList.add("opacity-50", "cursor-not-allowed");
        nextButton.style.pointerEvents = "none";
      } else {
        nextButton.classList.remove("opacity-50", "cursor-not-allowed");
        nextButton.style.pointerEvents = "auto";
      }
      console.log("Next button state:", { pageNum, totalPages: pdfDoc?.numPages, isAnimating, disabled: isDisabled });
    }
  }
  async function renderPage(num) {
    pageRendering = true;
    try {
      const page = await pdfDoc.getPage(num);
      const container = document.getElementById("pageFlipContainer");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const pageViewport = page.getViewport({ scale: 1 });
        const isMobile = window.innerWidth < 768;
        const padding = isMobile ? 20 : 40;
        const scaleX = (containerRect.width - padding) / pageViewport.width;
        const scaleY = (containerRect.height - padding) / pageViewport.height;
        const fitScale = Math.min(scaleX, scaleY, isMobile ? 2 : 3);
        if (baseScale === 1) {
          baseScale = fitScale;
        }
        const optimalScale = fitScale * scale;
        const viewport = page.getViewport({ scale: optimalScale });
        if (canvas && ctx) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: ctx,
            viewport
          };
          await page.render(renderContext).promise;
        }
      }
      pageRendering = false;
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    } catch (error) {
      console.error("Error rendering page:", error);
      pageRendering = false;
    }
  }
  async function onPrevPage() {
    console.log("onPrevPage called:", { pageNum, isAnimating, totalPages: pdfDoc?.numPages });
    if (pageNum <= 1 || isAnimating) {
      console.log("onPrevPage blocked:", { reason: pageNum <= 1 ? "first page" : "animating" });
      return;
    }
    try {
      console.log("Starting previous page animation...");
      await animatePageFlip("prev");
      console.log("Previous page animation completed");
    } catch (error) {
      console.error("Error in onPrevPage:", error);
      isAnimating = false;
      updateNavigationButtons();
    }
  }
  async function onNextPage() {
    console.log("onNextPage called:", { pageNum, isAnimating, totalPages: pdfDoc?.numPages });
    if (pageNum >= pdfDoc?.numPages || isAnimating) {
      console.log("onNextPage blocked:", { reason: pageNum >= pdfDoc?.numPages ? "last page" : "animating" });
      return;
    }
    try {
      console.log("Starting next page animation...");
      await animatePageFlip("next");
      console.log("Next page animation completed");
    } catch (error) {
      console.error("Error in onNextPage:", error);
      isAnimating = false;
      updateNavigationButtons();
    }
  }
  async function animatePageFlip(direction) {
    console.log("animatePageFlip called:", { direction, isAnimating, pageNum });
    if (isAnimating) {
      console.log("Animation already in progress, returning");
      return;
    }
    isAnimating = true;
    updateNavigationButtons();
    const pageFlipContainer = document.getElementById("pageFlipContainer");
    const nextPageContainer = document.getElementById("nextPageContainer");
    const pageTurnShadow = document.getElementById("pageTurnShadow");
    if (!pageFlipContainer || !nextPageContainer || !pageTurnShadow) {
      isAnimating = false;
      return;
    }
    const targetPage = direction === "next" ? pageNum + 1 : pageNum - 1;
    playPageTurnSound();
    await renderPageOnCanvas(targetPage, nextCanvas, nextCtx);
    addPageCurlEffect(direction);
    pageTurnShadow.classList.remove("opacity-0");
    pageTurnShadow.classList.add("opacity-100");
    nextPageContainer.classList.remove("opacity-0");
    nextPageContainer.classList.add("opacity-100");
    if (direction === "next") {
      pageFlipContainer.style.transform = "rotateY(-180deg) scale(0.95)";
    } else {
      pageFlipContainer.style.transform = "rotateY(180deg) scale(0.95)";
    }
    const animationDuration = window.innerWidth < 768 ? 500 : 700;
    await new Promise((resolve) => setTimeout(resolve, animationDuration));
    pageNum = targetPage;
    const currentPageContainer = document.getElementById("currentPageContainer");
    if (currentPageContainer && nextCanvas && canvas && ctx) {
      canvas.width = nextCanvas.width;
      canvas.height = nextCanvas.height;
      ctx.drawImage(nextCanvas, 0, 0);
    }
    isAnimating = false;
    console.log("Animation completed, isAnimating set to false");
    updatePageInfo();
    pageFlipContainer.style.transform = "rotateY(0deg)";
    nextPageContainer.classList.remove("opacity-100");
    nextPageContainer.classList.add("opacity-0");
    pageTurnShadow.classList.remove("opacity-100");
    pageTurnShadow.classList.add("opacity-0");
    setTimeout(() => {
      updateNavigationButtons();
      console.log("Navigation buttons updated after animation");
    }, 100);
    setTimeout(() => {
      if (isAnimating) {
        console.warn("Animation state stuck, forcing reset");
        isAnimating = false;
        updateNavigationButtons();
      }
    }, 1e3);
  }
  async function renderPageOnCanvas(pageNumber, targetCanvas, targetCtx) {
    if (!pdfDoc || !targetCanvas || !targetCtx) return;
    try {
      const page = await pdfDoc.getPage(pageNumber);
      const container = document.getElementById("pageFlipContainer");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const pageViewport = page.getViewport({ scale: 1 });
        const isMobile = window.innerWidth < 768;
        const padding = isMobile ? 20 : 40;
        const scaleX = (containerRect.width - padding) / pageViewport.width;
        const scaleY = (containerRect.height - padding) / pageViewport.height;
        const optimalScale = Math.min(scaleX, scaleY, isMobile ? 1.5 : 2) * scale;
        const viewport = page.getViewport({ scale: optimalScale });
        targetCanvas.height = viewport.height;
        targetCanvas.width = viewport.width;
        const renderContext = {
          canvasContext: targetCtx,
          viewport
        };
        await page.render(renderContext).promise;
      }
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  }
  function playPageTurnSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(1e-3, audioContext.currentTime + 0.1);
      oscillator.type = "sine";
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
    }
  }
  function addPageCurlEffect(direction) {
    const pdfContainer = document.getElementById("pdfContainer");
    if (!pdfContainer) return;
    pdfContainer.classList.add("page-curling");
    const duration = window.innerWidth < 768 ? 500 : 700;
    setTimeout(() => {
      pdfContainer.classList.remove("page-curling");
    }, duration);
  }
  function zoomFit() {
    if (!pdfDoc) return;
    scale = 1;
    baseScale = 1;
    renderPage(pageNum);
    updateZoomLevel();
    updateNavigationButtons();
  }
  async function zoomIn() {
    if (isAnimating) return;
    const zoomFactor = window.innerWidth < 768 ? 1.2 : 1.25;
    scale *= zoomFactor;
    await renderPage(pageNum);
    updateZoomLevel();
    updateNavigationButtons();
  }
  async function zoomOut() {
    if (isAnimating) return;
    const zoomFactor = window.innerWidth < 768 ? 1.2 : 1.25;
    scale /= zoomFactor;
    if (scale < 0.3) scale = 0.3;
    await renderPage(pageNum);
    updateZoomLevel();
    updateNavigationButtons();
  }
  function updateZoomLevel() {
    const zoomElement = document.getElementById("zoomLevel");
    if (zoomElement) {
      zoomElement.textContent = `${Math.round(scale * 100)}%`;
    }
  }
  function showPdfError() {
    const loadingElement = document.getElementById("pdfLoading");
    const errorElement = document.getElementById("pdfError");
    if (loadingElement) loadingElement.classList.add("hidden");
    if (errorElement) errorElement.classList.remove("hidden");
  }
  function closePdfViewer() {
    const modal = document.getElementById("pdfViewerModal");
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
      pdfDoc = null;
      pageNum = 1;
      pageRendering = false;
      pageNumPending = null;
      scale = 1;
      baseScale = 1;
      isAnimating = false;
    }
  }
  function openPdfInNewTab() {
    if (currentPdfUrl) {
      window.open(currentPdfUrl, "_blank");
    }
  }
  function downloadPdf() {
    if (currentPdfUrl) {
      const link = document.createElement("a");
      link.href = currentPdfUrl;
      link.download = currentPdfTitle || "document.pdf";
      link.click();
    }
  }
  function openPersonnelModal(personnelId) {
    console.log("Opening personnel modal for:", personnelId);
    const modal = document.getElementById("personnelModal");
    const modalContent = document.getElementById("personnelModalContent");
    const modalBody = document.getElementById("personnelModalBody");
    if (!modal || !modalContent || !modalBody) {
      console.error("Personnel modal elements not found");
      return;
    }
    const personnelData = {
      jemsy_dean: {
        name: "Prof. Alhisan U. Jemsy, PhD",
        position: "Dean, College of Education",
        rank: "Professor V",
        image: "/images/coed/Profile/JEMSY.png",
        education: [
          "Doctor of Philosophy (Ph.D.) in Education (Research and Evaluation)",
          "University of San Carlos",
          "Master of Arts in Educational Management",
          "MSU-TCTO (Topnotcher, Comprehensive Examination)",
          "Bachelor of Elementary Education",
          "MSU-TCTO (Magna Cum Laude, Student of the Year, Class Marshal/Valedictorian, Class 2009)"
        ],
        specialization: [
          "Educational Research",
          "Educational Evaluation and Assessment",
          "Professional Education"
        ],
        achievements: [
          "Professor V, MSU-TCTO",
          "Dean, College of Education, MSU-TCTO",
          "Faculty Regent, MSU System Board of Regents",
          "Langkawit Award",
          "President, MSU System Faculty Federation",
          "Union President, MSU-TCTO Faculty Association",
          "Chairperson, Elementary Education Department",
          "Published 6 research studies",
          "Extensive presentations in national and international conferences",
          "Active member, National Research Council of the Philippines"
        ],
        awards: [
          "Langkawit Award",
          "Faculty Regent, MSU System Board of Regents",
          "President, MSU System Faculty Federation",
          "Union President, MSU-TCTO Faculty Association",
          "Active member, National Research Council of the Philippines"
        ],
        publications: [
          "Alhisan, U. J, Julasmin, S. K., Sheilamar, J.J., Sharmini, I. N., Sittirapia, U. J., Assessment of Research Self-Efficacy: Implications to Building Foundation of Early-Career Researcher Motivation and Research-Based Pedagogical Practices, International Journal of Assessment and Evaluation Volume 32, Issue 2, (2025)"
        ],
        leadership: [
          "Chairperson, Committee on Accreditation",
          "Chairperson, Committee on Research",
          "Chairperson, Committee on Curriculum Development",
          "Successful signing of Collective Negotiation Agreement (CNA)",
          "Active participation in university-level decision-making bodies"
        ],
        description: "Dr. Alhisan U. Jemsy is a Professor V and the current Dean of the College of Education at Mindanao State University \u2013 Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). He also serves as Faculty Regent of the MSU System Board of Regents. Dr. Jemsy holds a Ph.D. in Education, major in Research and Evaluation, from the University of San Carlos. His research interests include educational research, assessment, and teacher education. A recognized academic leader and active member of the National Research Council of the Philippines, he has conducted numerous training programs and delivered lectures on educational research, assessment, and school leadership across Mindanao."
      },
      jemsy_staff: {
        name: "Sittirapia U. Jemsy",
        position: "Dean's Staff",
        rank: "Admin. Aide IV",
        image: "/images/coed/Staff/JemsyS.png",
        education: [
          "Bachelor of Elementary Education",
          "Mindanao State University TCTO"
        ],
        specialization: [
          "Elementary Education"
        ],
        awards: [
          "Co-Author Praise Award"
        ],
        publications: [
          "Alhisan, U. J, Julasmin, S. K., Sheilamar, J.J., Sharmini, I. N., Sittirapia, U. J., Assessment of Research Self-Efficacy: Implications to Building Foundation of Early-Career Researcher Motivation and Research-Based Pedagogical Practices, International Journal of Assessment and Evaluation Volume 32, Issue 2, (2025)"
        ],
        description: 'Ms. Sittirapia U. Jemsy is an Administrative Aide IV at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), under the Department of Language Education. She earned her Bachelor of Elementary Education from MSU-TCTO in 2022 as an academic scholar and is a licensed professional teacher specializing in Elementary Education and Reading. An active and passionate educator, she has participated in various local and international training programs and seminars, including the International School Leadership Summit 2024 and the Apple Education MAC Fundamentals workshop. Ms. Jemsy has also presented her research titled "Towards a Model for Integrating Disciplinary Literacy in Language Education: A Systematic Literature Review in the ASEAN Context" at De La Salle University and published a Scopus-indexed paper on research self-efficacy and pedagogical practices. Her professional interests center on literacy development, language education, and research-based teaching innovation.'
      },
      lahuddin: {
        name: "Abelina K. Lahuddin",
        position: "Staff",
        rank: "Admin. Aide VI",
        image: "/images/coed/Staff/Lahuddin.png",
        education: [
          "Bachelor of Secondary and Elementary Education",
          "Mindanao State University TCTO"
        ],
        specialization: [
          "Elementary Education"
        ],
        awards: [],
        publications: [],
        description: "Ms. Abelina K. Lahuddin is an Administrative Aide VI at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), serving in the Dean's Office. She earned her Bachelor of Secondary and Elementary Education from MSU-TCTO in 1992 and is a licensed professional teacher. With years of dedicated service to the institution, Ms. Lahuddin is known for her commitment, reliability, and efficiency in administrative work. Her professionalism and passion for education contribute greatly to the smooth operation and continued success of the College of Education."
      },
      miguel_staff: {
        name: "Sitti Raida S. Miguel",
        position: "DELPS Staff",
        rank: "Admin. Aide IV",
        image: "/images/coed/Staff/Miguel.png",
        education: [
          "Bachelor of Elementary Education\u2013General",
          "Mindanao State University TCTO"
        ],
        specialization: [
          "Elementary Education"
        ],
        awards: [],
        publications: [],
        description: "Ms. Sitti Raida S. Miguel is an Administrative Aide IV at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), under the Department of Educational Leadership and Professional Services. She earned her Bachelor of Elementary Education\u2013General from MSU-TCTO in 2018 and is a licensed professional teacher. Dedicated and service-oriented, Ms. Miguel plays an active role in supporting the academic and administrative functions of the college. Her passion for education and commitment to excellence reflect her desire to contribute meaningfully to the development of future educators and the advancement of quality education in the institution."
      },
      drilon: {
        name: "Zenneth D. Drilon",
        position: "DECEE Staff",
        rank: "Admin. Aide IV",
        image: "/images/coed/Staff/Zenneth.png",
        education: [
          "Bachelor of Elementary Education major in Early Childhood Education",
          "Mindanao State University TCTO"
        ],
        specialization: [
          "Early Childhood Education"
        ],
        awards: [],
        publications: [],
        description: "Ms. Zenneth D. Drilon is an Administrative Aide IV at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), under the Department of Curriculum and Educational Evaluation (DECEE). A dedicated and service-oriented staff member, she plays an essential role in supporting the administrative and academic operations of the college. Known for her professionalism, efficiency, and teamwork, Ms. Drilon remains committed to contributing to the institution's mission of fostering quality education and academic excellence."
      },
      ajik: {
        name: "Roseta H. Ajik",
        position: "DPE Staff",
        rank: "Admin. Aide IV",
        image: "/images/coed/Staff/msufaculty.png",
        education: [
          "Bachelor of Science in Agricultural Education",
          "Tawi-Tawi Regional Agricultural College",
          "Professional Diploma in Physical Education",
          "Mindanao State University TCTO"
        ],
        specialization: [
          "Physical Education"
        ],
        awards: [],
        publications: [],
        description: "Ms. Roseta H. Ajik is an Administrative Aide IV at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), serving under the Department of Physical Education. She earned her Bachelor of Science in Agricultural Education from Tawi-Tawi Regional Agricultural College in 2011 and completed her Professional Diploma in Physical Education at MSU-TCTO in 2019. A licensed professional teacher, Ms. Ajik is known for her dedication and efficiency in supporting the academic and administrative functions of the department. Her commitment to service and passion for education reflect her goal of contributing to the growth and success of the College of Education."
      },
      saligan: {
        name: "Musssah A. Saligan",
        position: "College Library Staff",
        rank: "Admin. Aide IV",
        image: "/images/coed/Staff/msufaculty.png",
        education: [],
        specialization: [],
        awards: [],
        publications: [],
        description: "Ms. Musssah A. Saligan is an Administrative Aide IV at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), serving as College Library Staff. She plays a vital role in supporting the library operations and ensuring that students and faculty have access to the resources they need for academic success."
      },
      vergara: {
        name: "Rey J. Vergara",
        position: "Dean's Staff",
        rank: "Admin. Aide III",
        image: "/images/coed/Staff/Vergara.png",
        education: [
          "Bachelor of Science in Computer Science",
          "Tawi-Tawi Regional Agricultural College"
        ],
        specialization: [
          "Computer Science"
        ],
        awards: [],
        publications: [],
        description: "Mr. Rey J. Vergara is an Administrative Aide III at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), serving in the Dean's Office. He earned his Bachelor of Science in Computer Science from Tawi-Tawi Regional Agricultural College. A dedicated staff member, Mr. Vergara contributes to the administrative operations of the college with his technical expertise and commitment to service."
      },
      soblechero: {
        name: "Elshel A. Soblechero",
        position: "Utility",
        rank: "Admin. Aide III",
        image: "/images/coed/Staff/Soblechero.png",
        education: [
          "Bachelor of Science in Agriculture",
          "Tawi-Tawi Regional Agricultural College"
        ],
        specialization: [
          "Agriculture"
        ],
        awards: [],
        publications: [],
        description: "Ms. Elshel A. Soblechero is an Administrative Aide III at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), assigned to the Dean's Office. She earned her Bachelor of Science in Agriculture from Tawi-Tawi Regional Agricultural College (TRAC) in 2011. A dedicated and reliable member of the college's administrative staff, Ms. Soblechero is known for her strong work ethic and commitment to efficient office service. Her professionalism and sense of responsibility contribute significantly to the smooth operations and success of the College of Education."
      },
      balle: {
        name: "Sheha I. Balle",
        position: "Utility",
        rank: "Admin. Aide I",
        image: "/images/coed/Staff/msufaculty.png",
        education: [],
        specialization: [],
        awards: [],
        publications: [],
        description: "Ms. Sheha I. Balle is an Administrative Aide I at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), serving as Utility staff. She plays an important role in maintaining the facilities and supporting the daily operations of the college."
      },
      datuhatta: {
        name: "Albar J. Datuhatta",
        position: "DSME Staff",
        rank: "Admin. Aide VI",
        image: "/images/coed/Staff/Datuhatta.png",
        education: [],
        specialization: [],
        awards: [],
        publications: [],
        description: "Mr. Albar J. Datuhatta is an Administrative Aide VI at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), serving under the Department of Secondary and Mathematics Education (DSME). A dedicated staff member, he contributes to the administrative and academic operations of the department."
      },
      gabir: {
        name: "Al-javier H. Gabir",
        position: "Staff",
        rank: "Admin. Aide IV",
        image: "/images/coed/Staff/Gabir.png",
        education: [],
        specialization: [],
        awards: [],
        publications: [],
        description: "Mr. Al-javier H. Gabir is an Administrative Aide IV at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO). A dedicated staff member, he provides valuable support to the administrative operations of the college."
      },
      ahari: {
        name: "Najir A. Ahari",
        position: "Dean's Staff",
        rank: "Admin. Aide IV",
        image: "/images/coed/Staff/Ahari.png",
        education: [
          "Bachelor of Elementary Education",
          "Mindanao State University TCTO"
        ],
        specialization: [
          "Elementary Education"
        ],
        awards: [],
        publications: [],
        description: "Mr. Najir A. Ahari is an Administrative Aide IV at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), assigned to the Dean's Office. He earned his Bachelor of Elementary Education from MSU-TCTO in 2011. Known for his reliability and dedication, Mr. Ahari provides valuable administrative support that contributes to the efficient functioning of the college. His commitment to service and teamwork reflects his strong sense of responsibility and his desire to help advance the goals of the institution."
      },
      dandon: {
        name: "Khaizar A. Dandon",
        position: "Utility",
        rank: "Admin. Aide I",
        image: "/images/coed/Staff/msufaculty.png",
        education: [],
        specialization: [],
        awards: [],
        publications: [],
        description: "Mr. Khaizar A. Dandon is an Administrative Aide I at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), serving as Utility staff. He plays an important role in maintaining the facilities and supporting the daily operations of the college."
      },
      julbarri: {
        name: "Najir H. Julbarri",
        position: "Utility",
        rank: "Admin. Aide I",
        image: "/images/coed/Staff/msufaculty.png",
        education: [],
        specialization: [],
        awards: [],
        publications: [],
        description: "Mr. Najir H. Julbarri is an Administrative Aide I at the College of Education, Mindanao State University Tawi-Tawi College of Technology and Oceanography (MSU-TCTO), serving as Utility staff. He plays an important role in maintaining the facilities and supporting the daily operations of the college."
      }
    };
    const personnel = personnelData[personnelId];
    if (!personnel) {
      console.error("Personnel data not found for:", personnelId);
      return;
    }
    modalBody.innerHTML = `
		<div class="relative">
			<!-- Hero Section -->
			<div class="relative bg-gradient-to-r from-msu-deep-ocean to-msu-bgc-color rounded-t-2xl">
				<div class="flex flex-col items-center justify-center py-8 px-4 md:px-8">
					<div class="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white mb-6">
						<img src="${personnel.image}" alt="${personnel.name}" class="w-full h-full object-contain" />
					</div>
					<h1 class="text-3xl md:text-4xl font-bold text-white mb-2 text-center">${personnel.name}</h1>
					<p class="text-xl text-gray-200 text-center">${personnel.position}</p>
					${personnel.rank ? `<p class="text-lg text-gray-300 text-center mt-2">${personnel.rank}</p>` : ""}
				</div>
			</div>
			<!-- Content Section -->
			<div class="p-8 space-y-8">
				<!-- Description -->
				<div class="bg-gradient-to-r from-msu-deep-ocean/10 to-transparent p-6 rounded-xl border-l-4 border-msu-deep-ocean">
					<p class="text-lg text-msu-main-color dark:text-msu-bgc-color leading-relaxed">${personnel.description}</p>
				</div>
				
				<!-- Education -->
				${personnel.education && personnel.education.length > 0 ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
						</svg>
						Educational Background
					</h3>
					<div class="space-y-3">
						${personnel.education.map((edu) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${edu}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				<!-- Specialization -->
				${personnel.specialization && personnel.specialization.length > 0 ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
						</svg>
						Areas of Specialization
					</h3>
					<div class="grid md:grid-cols-2 gap-3">
						${personnel.specialization.map((spec) => `
							<div class="bg-gradient-to-r from-msu-deep-ocean/10 to-transparent p-3 rounded-lg border-l-4 border-msu-deep-ocean">
								<p class="text-msu-main-color dark:text-msu-bgc-color font-medium">${spec}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				<!-- Publications -->
				${personnel.publications && personnel.publications.length > 0 ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						Publications
					</h3>
					<div class="space-y-3">
						${personnel.publications.map((pub) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${pub}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				<!-- Achievements -->
				${personnel.achievements && personnel.achievements.length > 0 ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
						</svg>
						Key Achievements
					</h3>
					<div class="grid md:grid-cols-2 gap-4">
						${personnel.achievements.map((achievement) => `
							<div class="bg-gradient-to-r from-msu-deep-ocean/10 to-transparent p-4 rounded-lg border-l-4 border-msu-deep-ocean">
								<p class="text-msu-main-color dark:text-msu-bgc-color">${achievement}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				<!-- Awards & Recognitions -->
				${personnel.awards && personnel.awards.length > 0 ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
						</svg>
						Awards & Recognitions
					</h3>
					<div class="space-y-3">
						${personnel.awards.map((award) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${award}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
				
				<!-- Leadership Roles -->
				${personnel.leadership && personnel.leadership.length > 0 ? `
				<div>
					<h3 class="text-2xl font-bold text-msu-main-color dark:text-msu-bgc-color mb-4 flex items-center">
						<svg class="w-6 h-6 text-msu-deep-ocean mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
						</svg>
						Leadership Roles
					</h3>
					<div class="space-y-3">
						${personnel.leadership.map((role) => `
							<div class="flex items-start">
								<svg class="w-5 h-5 text-msu-deep-ocean mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
								<p class="text-msu-main-color dark:text-msu-bgc-color">${role}</p>
							</div>
						`).join("")}
					</div>
				</div>
				` : ""}
			</div>
		</div>
	`;
    modal.style.display = "flex";
    modal.classList.remove("hidden");
    setTimeout(() => {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);
    document.body.style.overflow = "hidden";
  }
  function closePersonnelModal() {
    console.log("Closing personnel modal");
    const modal = document.getElementById("personnelModal");
    const modalContent = document.getElementById("personnelModalContent");
    if (!modal || !modalContent) {
      console.error("Personnel modal elements not found for closing");
      return;
    }
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 300);
  }
  document.addEventListener("DOMContentLoaded", function() {
    const personnelModal = document.getElementById("personnelModal");
    if (personnelModal) {
      personnelModal.addEventListener("click", function(e) {
        if (e.target === this) {
          closePersonnelModal();
        }
      });
    }
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      const personnelModal = document.getElementById("personnelModal");
      if (personnelModal && !personnelModal.classList.contains("hidden")) {
        closePersonnelModal();
      }
    }
  });
  window.openFacultyModal = openFacultyModal;
  window.closeFacultyModal = closeFacultyModal;
  window.openPersonnelModal = openPersonnelModal;
  window.closePersonnelModal = closePersonnelModal;
  window.openPDFViewer = openPDFViewer;
  window.closePdfViewer = closePdfViewer;
  window.openPdfInNewTab = openPdfInNewTab;
  window.downloadPdf = downloadPdf;
  window.onPrevPage = onPrevPage;
  window.onNextPage = onNextPage;
  window.zoomIn = zoomIn;
  window.zoomOut = zoomOut;
  window.zoomFit = zoomFit;
  document.addEventListener("DOMContentLoaded", function() {
    const prevPageBtn = document.getElementById("pdfPrevPage");
    const nextPageBtn = document.getElementById("pdfNextPage");
    const zoomInBtn = document.getElementById("zoomIn");
    const zoomOutBtn = document.getElementById("zoomOut");
    const zoomFitBtn = document.getElementById("zoomFit");
    if (prevPageBtn) {
      prevPageBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Previous page button clicked");
        onPrevPage();
      });
    }
    if (nextPageBtn) {
      nextPageBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Next page button clicked");
        onNextPage();
      });
    }
    if (zoomInBtn) {
      zoomInBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Zoom in button clicked");
        zoomIn();
      });
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Zoom out button clicked");
        zoomOut();
      });
    }
    if (zoomFitBtn) {
      zoomFitBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Zoom fit button clicked");
        zoomFit();
      });
    }
    const pdfModal = document.getElementById("pdfViewerModal");
    if (pdfModal) {
      pdfModal.addEventListener("click", function(e) {
        if (e.target === this) {
          closePdfViewer();
        }
      });
    }
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        const modal = document.getElementById("pdfViewerModal");
        if (modal && !modal.classList.contains("hidden")) {
          closePdfViewer();
        }
      }
    });
  });
  window.testModal = function() {
    console.log("Testing modal...");
    openFacultyModal("jemsy");
  };
  function toggleFacultyView() {
    const additionalFacultyElements = document.querySelectorAll(".additional-faculty");
    const showMoreText = document.getElementById("showMoreText");
    const showMoreIcon = document.getElementById("showMoreIcon");
    const showMoreBtn = document.getElementById("showMoreBtn");
    if (!additionalFacultyElements.length || !showMoreText || !showMoreIcon) {
      console.error("Faculty toggle elements not found");
      return;
    }
    const isHidden = additionalFacultyElements[0].classList.contains("hidden");
    if (isHidden) {
      additionalFacultyElements.forEach((faculty, index) => {
        const element = faculty;
        element.classList.remove("hidden");
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        setTimeout(() => {
          element.style.transition = "all 0.5s ease-in-out";
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }, 10 + index * 50);
      });
      showMoreText.textContent = "Show Less Faculty";
      showMoreIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>';
      showMoreBtn.classList.remove("bg-msu-deep-ocean", "hover:bg-msu-deep-ocean-dark");
      showMoreBtn.classList.add("bg-gray-600", "hover:bg-gray-700");
    } else {
      additionalFacultyElements.forEach((faculty, index) => {
        const element = faculty;
        element.style.transition = "all 0.5s ease-in-out";
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        setTimeout(() => {
          element.classList.add("hidden");
          element.style.opacity = "";
          element.style.transform = "";
        }, 500);
      });
      showMoreText.textContent = "Show More Faculty";
      showMoreIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';
      showMoreBtn.classList.remove("bg-gray-600", "hover:bg-gray-700");
      showMoreBtn.classList.add("bg-msu-deep-ocean", "hover:bg-msu-deep-ocean-dark");
    }
  }
  function hideAdditionalFacultyCards() {
    const additionalFacultyElements = document.querySelectorAll(".additional-faculty");
    additionalFacultyElements.forEach((faculty) => {
      const element = faculty;
      element.classList.add("hidden");
      element.style.opacity = "";
      element.style.transform = "";
    });
  }
  window.toggleFacultyView = toggleFacultyView;
  window.hideAdditionalFacultyCards = hideAdditionalFacultyCards;
  document.addEventListener("DOMContentLoaded", function() {
    const facultySearchInput = document.getElementById("facultySearch");
    const clearFacultySearchBtn = document.getElementById("clearFacultySearch");
    const facultySearchResults = document.getElementById("facultySearchResults");
    const facultyResultsCount = document.getElementById("facultyResultsCount");
    const facultyResultsList = document.getElementById("facultyResultsList");
    const showMoreBtn = document.getElementById("showMoreBtn");
    const facultyGrid = document.getElementById("facultyGrid");
    const departmentButtons = Array.from(document.querySelectorAll(".department-info-toggle"));
    const facultyDepartmentNotice = document.getElementById("facultyDepartmentNotice");
    const bannerProgramsData = (() => {
      const rawData = window.serverProgramsData;
      if (!rawData) return [];
      try {
        const parsed = JSON.parse(rawData);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Error parsing academic programs data for faculty banners:", error);
        return [];
      }
    })();
    if (!facultySearchInput || !facultyGrid) return;
    let activeDepartmentFilter = null;
    let activeHighlightCard = null;
    let activeHighlightTimeout = null;
    function normalizeDepartmentName(value) {
      return (value || "").toLowerCase().replace(/&/g, "and").replace(/\s+/g, " ").trim();
    }
    function programsMatchDepartment(programDepartment, targetDepartment) {
      if (!programDepartment || !targetDepartment) return false;
      const normalizedProgram = normalizeDepartmentName(programDepartment);
      const normalizedTarget = normalizeDepartmentName(targetDepartment);
      return normalizedProgram === normalizedTarget || normalizedProgram.includes(normalizedTarget) || normalizedTarget.includes(normalizedProgram);
    }
    function hideDepartmentNotice() {
      if (!facultyDepartmentNotice) return;
      facultyDepartmentNotice.classList.add("hidden");
      facultyDepartmentNotice.innerHTML = "";
    }
    function showDepartmentNotice(department, count) {
      if (!facultyDepartmentNotice) return;
      facultyDepartmentNotice.innerHTML = `Showing <span class="font-semibold">${count}</span> faculty members from <span class="font-semibold">${escapeHtml(department)}</span>`;
      facultyDepartmentNotice.classList.remove("hidden");
    }
    function updateDepartmentButtonsState() {
      if (!departmentButtons.length) return;
      departmentButtons.forEach((button) => {
        const department = button.dataset.department || "";
        const isActive = department === activeDepartmentFilter;
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
        button.classList.toggle("bg-white", isActive);
        button.classList.toggle("text-[#61063B]", isActive);
        button.classList.toggle("border-white", isActive);
        button.classList.toggle("bg-white/10", !isActive);
        button.classList.toggle("text-white", !isActive);
        button.classList.toggle("border-white/40", !isActive);
        const icon = button.querySelector(".department-button-icon");
        if (icon) {
          icon.style.transition = "transform 0.2s ease-in-out";
          icon.style.transform = isActive ? "rotate(180deg)" : "";
        }
        button.setAttribute("aria-expanded", isActive ? "true" : "false");
        const banner = button.closest(".faculty-department-banner");
        const bannerContent = banner?.querySelector(".faculty-banner-content");
        if (bannerContent) {
          const defaultDisplay = bannerContent.dataset.defaultDisplay || (bannerContent.classList.contains("grid") ? "grid" : "block");
          if (!bannerContent.dataset.defaultDisplay) {
            bannerContent.dataset.defaultDisplay = defaultDisplay;
          }
          if (isActive) {
            bannerContent.classList.remove("hidden");
            bannerContent.style.display = defaultDisplay;
          } else {
            bannerContent.classList.add("hidden");
            bannerContent.style.display = "none";
          }
        }
      });
      if (!activeDepartmentFilter) {
        hideAdditionalFacultyCards();
      }
    }
    function renderProgramsForDepartment(department, container) {
      if (!container) return;
      const defaultDisplay = container.dataset.defaultDisplay || "block";
      if (!container.dataset.defaultDisplay) {
        container.dataset.defaultDisplay = defaultDisplay;
      }
      container.innerHTML = "";
      if (!bannerProgramsData.length) {
        container.innerHTML = `
				<div class="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/80 text-sm">
					Academic programs data is currently unavailable. Please try again later.
				</div>
			`;
      } else {
        const programs = bannerProgramsData.filter(
          (program) => programsMatchDepartment(program?.department, department)
        );
        if (!programs.length) {
          container.innerHTML = `
					<div class="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/80 text-sm">
						No academic programs found for <span class="font-semibold">${escapeHtml(department)}</span>.
					</div>
				`;
        } else {
          const safeDepartment = escapeHtml(department);
          const programCountLabel = programs.length === 1 ? "program" : "programs";
          const rowsMarkup = programs.map((program) => {
            const safeProgramName = escapeHtml(program?.program || "");
            const safeDescription = program?.description ? `<p class="text-white/70 text-xs md:text-sm mt-2 leading-relaxed">${escapeHtml(program.description)}</p>` : "";
            const safeDegree = program?.degree ? escapeHtml(program.degree) : "N/A";
            const safeLevel = program?.level ? escapeHtml(program.level) : "N/A";
            const safeDuration = program?.duration ? escapeHtml(program.duration) : "N/A";
            const safeAccreditation = program?.accreditation ? escapeHtml(program.accreditation) : "";
            const safeFileUrl = program?.fileUrl ? escapeHtml(program.fileUrl) : "";
            const safeNameForViewer = escapeHtml(program?.name || program?.program || "");
            const accreditationMarkup = safeAccreditation ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/30 bg-emerald-300/20 text-emerald-100 text-xs font-medium">${safeAccreditation}</span>` : `<span class="text-white/60 text-xs">TBA</span>`;
            const actionMarkup = program?.fileUrl ? `<button type="button" onclick="openPDFViewer('${safeFileUrl}', '${safeNameForViewer}')" class="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-white/20">
								View Details
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7M21 12H3"></path>
								</svg>
							</button>` : `<span class="text-white/60 text-xs">No file</span>`;
            return `
						<tr class="hover:bg-white/10 transition-colors duration-200">
							<td class="px-5 py-4 align-top">
								<div class="font-semibold">${safeProgramName}</div>
								${safeDescription}
							</td>
							<td class="px-5 py-4 align-top text-sm">${safeDegree}</td>
							<td class="px-5 py-4 align-top text-sm">${safeLevel}</td>
							<td class="px-5 py-4 align-top text-sm">${safeDuration}</td>
							<td class="px-5 py-4 align-top">
								${accreditationMarkup}
							</td>
							<td class="px-5 py-4 align-top text-right">
								${actionMarkup}
							</td>
						</tr>
					`;
          }).join("");
          container.innerHTML = `
					<div class="bg-white/5 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg">
						<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-white/15">
							<div>
								<p class="uppercase tracking-[0.35em] text-[0.65rem] text-white/70">Academic Programs</p>
								<h4 class="text-lg font-semibold text-white mt-1">${safeDepartment}</h4>
							</div>
							<span class="text-sm text-white/80">${programs.length} ${programCountLabel}</span>
						</div>
						<div class="overflow-x-auto">
							<table class="min-w-full divide-y divide-white/10 text-left text-sm text-white">
								<thead class="bg-white/10 text-xs uppercase tracking-wider text-white/80">
									<tr>
										<th scope="col" class="px-5 py-3 font-semibold">Program</th>
										<th scope="col" class="px-5 py-3 font-semibold">Degree</th>
										<th scope="col" class="px-5 py-3 font-semibold">Level</th>
										<th scope="col" class="px-5 py-3 font-semibold">Duration</th>
										<th scope="col" class="px-5 py-3 font-semibold">Accreditation</th>
										<th scope="col" class="px-5 py-3 font-semibold text-right">Action</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-white/10">
									${rowsMarkup}
								</tbody>
							</table>
						</div>
					</div>
				`;
        }
      }
      container.classList.remove("hidden");
      container.style.display = defaultDisplay;
    }
    function updateProgramsDisplay() {
      const banners = document.querySelectorAll(".faculty-department-banner");
      banners.forEach((banner) => {
        const department = banner.getAttribute("data-department") || "";
        const programsContainer = banner.querySelector(".faculty-banner-programs");
        if (!programsContainer) return;
        const defaultDisplay = programsContainer.dataset.defaultDisplay || (programsContainer.classList.contains("grid") ? "grid" : "block");
        if (!programsContainer.dataset.defaultDisplay) {
          programsContainer.dataset.defaultDisplay = defaultDisplay;
        }
        if (!activeDepartmentFilter || department !== activeDepartmentFilter) {
          programsContainer.innerHTML = "";
          programsContainer.classList.add("hidden");
          programsContainer.style.display = "none";
          return;
        }
        renderProgramsForDepartment(department, programsContainer);
      });
    }
    function applyDepartmentFilter() {
      const departmentCards = [];
      if (!activeDepartmentFilter) {
        hideDepartmentNotice();
        facultyCardMap.forEach((card) => {
          const element = card;
          element.classList.remove("hidden");
          element.style.display = "";
        });
        hideAdditionalFacultyCards();
        updateBannerContent([]);
        updateProgramsDisplay();
        return;
      }
      clearActiveHighlight();
      let visibleCount = 0;
      facultyCardMap.forEach((card) => {
        const cardElement = card;
        const department = cardElement.dataset.department || "";
        const matchesDepartment = department === activeDepartmentFilter;
        if (matchesDepartment) {
          cardElement.classList.remove("hidden");
          cardElement.style.display = "";
          visibleCount += 1;
          departmentCards.push(cardElement);
        } else {
          cardElement.classList.add("hidden");
          cardElement.style.display = "none";
        }
      });
      if (showMoreBtn) {
        showMoreBtn.classList.add("hidden");
      }
      if (facultySearchResults) {
        facultySearchResults.classList.add("hidden");
      }
      if (facultyResultsCount) {
        facultyResultsCount.innerHTML = "";
      }
      if (facultyResultsList) {
        facultyResultsList.innerHTML = "";
      }
      if (clearFacultySearchBtn) {
        clearFacultySearchBtn.classList.add("hidden");
      }
      if (visibleCount === 0) {
        if (facultyDepartmentNotice) {
          facultyDepartmentNotice.innerHTML = `No faculty members found for <span class="font-semibold">${escapeHtml(activeDepartmentFilter)}</span>`;
          facultyDepartmentNotice.classList.remove("hidden");
        }
        return;
      }
      showDepartmentNotice(activeDepartmentFilter, visibleCount);
      updateBannerContent(departmentCards);
      updateProgramsDisplay();
      const firstVisibleCard = Array.from(facultyGrid.querySelectorAll("[data-faculty-id]")).find((card) => card.dataset.department === activeDepartmentFilter);
      if (firstVisibleCard) {
        firstVisibleCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    updateDepartmentButtonsState();
    hideDepartmentNotice();
    updateProgramsDisplay();
    if (departmentButtons.length) {
      departmentButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const department = button.dataset.department;
          if (!department) return;
          const isActive = activeDepartmentFilter === department;
          activeDepartmentFilter = isActive ? null : department;
          if (facultySearchInput) {
            facultySearchInput.value = "";
          }
          filterFaculty("");
          applyDepartmentFilter();
          updateDepartmentButtonsState();
          updateProgramsDisplay();
          const filterProgramsFn = window.filterProgramsByDepartment;
          if (typeof filterProgramsFn === "function") {
            filterProgramsFn(isActive ? "" : department);
          }
        });
      });
    }
    function clearActiveHighlight() {
      if (activeHighlightTimeout) {
        window.clearTimeout(activeHighlightTimeout);
        activeHighlightTimeout = null;
      }
      if (activeHighlightCard) {
        activeHighlightCard.classList.remove("faculty-search-highlight");
        activeHighlightCard.style.removeProperty("box-shadow");
        activeHighlightCard.style.boxShadow = "";
        activeHighlightCard = null;
      }
    }
    function highlightFacultyCard(card) {
      if (!card) return;
      clearActiveHighlight();
      activeHighlightCard = card;
      card.classList.add("faculty-search-highlight");
      card.style.boxShadow = "0 0 0 4px rgba(97, 6, 59, 0.35)";
      card.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      activeHighlightTimeout = window.setTimeout(() => {
        if (activeHighlightCard === card) {
          card.classList.remove("faculty-search-highlight");
          card.style.removeProperty("box-shadow");
          card.style.boxShadow = "";
          activeHighlightCard = null;
        }
        activeHighlightTimeout = null;
      }, 5e3);
    }
    function updateBannerContent(cards) {
      const banners = document.querySelectorAll(".faculty-department-banner");
      banners.forEach((banner) => {
        const department = banner.getAttribute("data-department") || "";
        const contentContainer = banner.querySelector(".faculty-banner-content");
        if (!contentContainer) return;
        if (!activeDepartmentFilter || department !== activeDepartmentFilter) {
          contentContainer.innerHTML = "";
          contentContainer.classList.add("hidden");
          contentContainer.style.display = "none";
          return;
        }
        const fragment = document.createDocumentFragment();
        cards.forEach((card) => {
          const name = card.querySelector("h3")?.textContent?.trim() || "";
          const designation = card.querySelector("p.text-gray-300")?.textContent?.trim() || "";
          const wrapper = document.createElement("div");
          wrapper.className = "flex items-start gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm";
          wrapper.innerHTML = `
					<svg class="w-5 h-5 text-yellow-300 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
					</svg>
					<div class="leading-tight">
						<p class="font-semibold">${escapeHtml(name)}</p>
						${designation ? `<p class="text-white/80 text-sm font-normal">${escapeHtml(designation)}</p>` : ""}
					</div>
				`;
          fragment.appendChild(wrapper);
        });
        contentContainer.innerHTML = "";
        contentContainer.appendChild(fragment);
        const defaultDisplay = contentContainer.dataset.defaultDisplay || (contentContainer.classList.contains("grid") ? "grid" : "block");
        if (!contentContainer.dataset.defaultDisplay) {
          contentContainer.dataset.defaultDisplay = defaultDisplay;
        }
        contentContainer.classList.remove("hidden");
        contentContainer.style.display = defaultDisplay;
      });
    }
    const htmlEscapeMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    function escapeHtml(value) {
      return (value == null ? "" : String(value)).replace(/[&<>"']/g, (char) => htmlEscapeMap[char] || char);
    }
    const facultySearchData = {
      "jemsy": { name: "Prof. Alhisan U. Jemsy, PhD", position: "Dean, College of Education", department: "Department of Educational Leadership and Professional Services", specialization: ["Educational Research", "Educational Evaluation and Assessment", "Professional Education"] },
      "budlong": { name: "Assoc. Prof. Cherry T. Budlong-Alih", position: "Faculty", rank: "Associate Professor V", department: "Department of Language Education", specialization: ["Filipino"] },
      "colicol": { name: "Assoc. Prof. Fernigil L. Colicol, PhD", position: "Chairperson, Department of Educational Leadership and Professional Services (DELPS)", rank: "Associate Professor V", department: "Department of Educational Leadership and Professional Services", specialization: ["Educational Research"] },
      "bagalanon": { name: "Asst. Prof. Joselito J. Bagalanon", position: "Faculty", rank: "Assistant Professor IV", department: "Department of Early Childhood and Elementary Education", specialization: ["Educational Administration"] },
      "bation": { name: "Asst. Prof. Luz J. Bation", position: "Faculty", rank: "Assistant Professor IV", department: "Department of Early Childhood and Elementary Education", specialization: ["Administration and Supervision"] },
      "derramas": { name: "Clarissa A. Derramas", position: "Special Assistant to OVCAA (Curriculum)", rank: "Professor VI", department: "Department of Early Childhood and Elementary Education", specialization: ["Early Childhood Education"] },
      "hadji": { name: "Assoc. Prof. Almira A. Hadji", position: "Director of GAD", rank: "Associate Professor V", department: "Department of Early Childhood and Elementary Education", specialization: ["Administration and Supervision", "Gender and Development"] },
      "kassim": { name: "Asst. Prof. Julasmin S. Kassim", position: "Special Assistant to OVCAA", rank: "Assistant Professor IV", department: "Department of Early Childhood and Elementary Education", specialization: ["Education"] },
      "mastul": { name: "Prof. Al-Rashiff H. Mastul, EdD", position: "Chairperson, Department of Educational Leadership and Professional Services (DELPS)", rank: "Professor I", department: "Department of Educational Leadership and Professional Services", specialization: ["Educational Leadership", "Educational Administration", "Educational Management"] },
      "nurhusin": { name: "Asst. Prof. Sharmini I. Nurhusin", position: "Faculty", rank: "Assistant Professor IV", department: "Department of Early Childhood and Elementary Education", specialization: ["Early Childhood Education"] },
      "judan": { name: "Asst. Prof. Shielamar J. Judan", position: "Faculty", rank: "Assistant Professor IV", department: "Department of Early Childhood and Elementary Education", specialization: ["Administration and Supervision", "Educational Leadership"] },
      "rabor": { name: "Jencen T. Rabor", position: "Faculty", rank: "Instructor I", department: "Department of Early Childhood and Elementary Education", specialization: ["Educational Administration"] },
      "sali": { name: "Asst. Prof. Fatima Zahra V. Sali", position: "Faculty", rank: "Assistant Professor IV", department: "Department of Early Childhood and Elementary Education", specialization: ["Educational Administration"] },
      "sulanting": { name: "Asst. Prof. Harimas M. Sulanting", position: "Faculty", rank: "Assistant Professor IV", department: "Department of Early Childhood and Elementary Education", specialization: ["Mathematics", "Administration and Supervision"] },
      "tahir": { name: "Asst. Prof. Kartini R. Tahir", position: "Director, Office of International Linkages (OIL)", department: "Department of Early Childhood and Elementary Education", specialization: ["Early Childhood Education", "Islamic Education Psychology", "Program Coordination and Policy Development"] },
      "pajiji": { name: "Asst. Prof. Jocelyn A. Pajiji, EdD", position: "Chairperson DELPS", rank: "Associate Professor V", department: "Department of Educational Leadership and Professional Services", specialization: ["Educational Management", "General Science"] },
      "bakkang": { name: "Assoc. Prof. Alcyn R. Bakkang", position: "Vice Chancellor for Student Affairs (VCSA)", rank: "Associate Professor V", department: "Department of Educational Leadership and Professional Services", specialization: ["Educational Assessment", "Measurement", "Evaluation"] },
      "aripin": { name: "Abdurizal S. Aripin", position: "Faculty", rank: "Professor I", department: "Department of Educational Leadership and Professional Services", specialization: ["Educational Management"] },
      "matolo": { name: "Prof. Mona-Allea L. Matolo", position: "Faculty", rank: "Professor VI", department: "Department of Educational Leadership and Professional Services", specialization: ["Educational Administration"] },
      "castulo": { name: "Nilo J. Castulo, PhD", position: "Faculty", rank: "Professor I", department: "Department of Educational Leadership and Professional Services", specialization: ["Comparative Education", "Educational Leadership", "Policy", "Higher Education", "Internationalization", "Migration Studies"] },
      "hailava": { name: "Prof. Wilham M. Hailaya, PhD", position: "Vice Chancellor for Academic Affairs", department: "Department of Educational Leadership and Professional Services", specialization: ["Teacher Assessment Literacy/Educational Assessment"] },
      "alang": { name: "Asst. Prof. Sitti-Rasham S. Alang", position: "Faculty", rank: "Assistant Professor IV", department: "Department of Language Education", specialization: ["Filipino", "Administration and Supervision"] },
      "hajan": { name: "Assoc. Prof. Bonjovi H. Hajan", position: "Director of SAMA Studies Center and Sentro ng Wika at Kultura", rank: "Associate Professor V", department: "Department of Language Education", specialization: ["English Language Teaching"] },
      "wagas": { name: "Asst. Prof. Ronaliza M. Wagas", position: "College Secretary, College of Education", rank: "Associate Professor V", department: "Department of Language Education", specialization: ["English", "Administration and Supervision"] },
      "werble": { name: "Prof. Surma J. Werble, PhD", position: "Faculty", rank: "Professor VI", department: "Department of Language Education", specialization: ["English Language Teaching"] },
      "juhuri": { name: "Nasri A. Juhuri", position: "Faculty", rank: "Instructor I", department: "Department of Early Childhood and Elementary Education", specialization: ["Educational Technology", "Application of Artificial Intelligence in Education"] },
      "tangon": { name: "Asst. Prof. Efren Tangon, PhD", position: "Chairperson, Department of Science and Mathematics Education", rank: "Assistant Professor IV", department: "Department of Science and Mathematics Education", specialization: ["Chemistry Education"] },
      "jaudinez": { name: "Asst. Prof. Aljemedin S. Jaudinez", position: "Faculty", rank: "Associate Professor V", department: "Department of Science and Mathematics Education", specialization: ["Mathematics and Statistics Education"] },
      "jackaria": { name: "Assoc. Prof. Potchong M. Jackaria", position: "Coordinator, College Quality Assurance and Extension", rank: "Associate Professor III", department: "Department of Science and Mathematics Education", specialization: ["Mathematics Education"] },
      "eldani": { name: "Asst. Prof. Nurul-Ainie S. Eldani", position: "Faculty", rank: "Assistant Professor IV", department: "Department of Science and Mathematics Education", specialization: ["Physics Education", "Physical Science"] },
      "sala": { name: "Rehina U. Sala", position: "Faculty", rank: "Master Teacher II", department: "Department of Science and Mathematics Education", specialization: ["Biology Education"] },
      "latif": { name: "Assoc. Prof. Fauzia K. Sali-Latif", position: "Faculty", rank: "Associate Professor V", department: "Department of Science and Mathematics Education", specialization: ["Science Education", "Sciences"] },
      "sapal": { name: "Mulyadi S. Sapal, PhD", position: "Faculty", rank: "Master Teacher II", department: "Department of Science and Mathematics Education", specialization: ["Mathematics Education"] },
      "puig": { name: "Assoc. Prof. Charmine Z. Puig", position: "Faculty, Associate Professor V", department: "Department of Educational Leadership and Professional Services", specialization: ["Professional Education", "Science Education"] },
      "dais": { name: "Prof. Shamira C. Dais, PhD", position: "Chairperson DPE", rank: "Professor VI", department: "Department of Physical Education", specialization: ["Physical Education", "Sports", "Dance", "Health", "Fitness", "Recreation"] },
      "shajila": { name: "Shajila C. Ali", position: "Faculty", rank: "Instructor I", department: "Department of Physical Education", specialization: ["Physical Education", "Sports"] },
      "santos": { name: "Sharmina D. Santos", position: "Faculty", rank: "Instructor I", department: "Department of Physical Education", specialization: ["Physical Education", "Sports", "Dance", "Health", "Fitness", "Recreation"] },
      "blanche": { name: "Blanche B. Matolo", position: "Acting Director of OSAR", rank: "Instructor I", department: "Department of Physical Education", specialization: ["Dance", "Sports", "Physical Education"] },
      "mohammad": { name: "Al-Shadat A. Mohammad", position: "Director of OCAD", rank: "Instructor I", department: "Department of Physical Education", specialization: ["Dance", "Martial Arts", "Sports", "Physical Education"] },
      "salasain": { name: "Rubina Salasain", position: "Faculty", rank: "Instructor I", department: "Department of Physical Education", specialization: ["School Fitness", "Sports", "Physical Education"] },
      "abdulwahab": { name: "Assoc. Prof. Rubia A. Abulwahab", position: "Faculty", rank: "Associate Professor V", department: "Department of Early Childhood and Elementary Education", specialization: ["Administration and Supervision", "Psychology", "Counseling"] }
    };
    const allFacultyCards = facultyGrid.querySelectorAll(".bg-white.rounded-xl.shadow-lg");
    const facultyCardMap = /* @__PURE__ */ new Map();
    allFacultyCards.forEach((card) => {
      const button = card.querySelector('button[onclick*="openFacultyModal"]');
      if (button) {
        const onclickAttr = button.getAttribute("onclick");
        const match = onclickAttr.match(/openFacultyModal\('([^']+)'\)/);
        if (match && match[1]) {
          const facultyId = match[1];
          const cardElement = card;
          facultyCardMap.set(facultyId, card);
          cardElement.dataset.facultyId = facultyId;
          const info = facultySearchData[facultyId];
          if (info && info.department) {
            cardElement.dataset.department = info.department;
          }
        }
      }
    });
    const formatFacultyCardOverlay = (facultyId, card) => {
      if (!card) return;
      const overlay = card.querySelector('div[class*="bg-gradient-to-t"][class*="from-black/70"]');
      if (!overlay) return;
      const nameEl = overlay.querySelector("h3");
      const designationEl = overlay.querySelector("p.text-gray-300");
      const searchInfo = facultySearchData[facultyId] || {};
      const cardElement = card;
      if (searchInfo.department) {
        cardElement.dataset.department = searchInfo.department;
      }
      const existingDesignation = designationEl ? designationEl.textContent?.trim() : "";
      const displayName = formatDisplayName({
        name: searchInfo.name || (nameEl ? nameEl.textContent?.trim() : ""),
        rank: searchInfo.rank || existingDesignation,
        position: searchInfo.position
      }) || expandAbbreviatedPrefix(nameEl ? nameEl.textContent?.trim() || "" : "");
      if (nameEl && displayName) {
        nameEl.textContent = displayName;
      }
      if (designationEl) {
        designationEl.classList.add("text-sm", "mt-1");
        const parts = [];
        const addParts = (value) => {
          if (!value) return;
          value.split("\u2022").map((part) => part.trim()).filter(Boolean).forEach((part) => {
            if (!parts.includes(part)) {
              parts.push(part);
            }
          });
        };
        addParts(searchInfo.position);
        addParts(searchInfo.rank);
        addParts(existingDesignation);
        const designationText = parts.join(" \u2022 ");
        designationEl.textContent = designationText || existingDesignation;
      }
    };
    const formatAllFacultyCards = () => {
      facultyCardMap.forEach((card, facultyId) => {
        formatFacultyCardOverlay(facultyId, card);
      });
    };
    formatAllFacultyCards();
    function filterFaculty(searchTerm) {
      searchTerm = searchTerm.toLowerCase().trim();
      if (searchTerm && activeDepartmentFilter) {
        activeDepartmentFilter = null;
        updateDepartmentButtonsState();
        hideDepartmentNotice();
      }
      clearActiveHighlight();
      let visibleCount = 0;
      const matchedEntries = [];
      if (!searchTerm) {
        if (!activeDepartmentFilter) {
          hideDepartmentNotice();
        }
        allFacultyCards.forEach((card, index) => {
          const cardElement = card;
          cardElement.classList.remove("hidden");
          cardElement.style.display = "";
          if (cardElement.classList.contains("additional-faculty")) {
            cardElement.classList.add("hidden");
          }
        });
        if (showMoreBtn) {
          showMoreBtn.classList.remove("hidden");
          const showMoreText = document.getElementById("showMoreText");
          const showMoreIcon = document.getElementById("showMoreIcon");
          if (showMoreText) showMoreText.textContent = "Show More Faculty";
          if (showMoreIcon) showMoreIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';
        }
        if (facultySearchResults) facultySearchResults.classList.add("hidden");
        if (facultyResultsCount) facultyResultsCount.textContent = "";
        if (facultyResultsList) facultyResultsList.innerHTML = "";
        if (clearFacultySearchBtn) clearFacultySearchBtn.classList.add("hidden");
        return;
      }
      facultyCardMap.forEach((card, facultyId) => {
        const cardElement = card;
        const facultyData = facultySearchData[facultyId];
        let matches = false;
        let entryData = facultyData;
        if (facultyData) {
          const searchableText = [
            facultyData.name,
            facultyData.position,
            facultyData.department,
            ...facultyData.specialization || []
          ].join(" ").toLowerCase();
          matches = searchableText.includes(searchTerm);
        }
        if (!matches) {
          const cardName = cardElement.querySelector("h3")?.textContent || "";
          const cardPosition = cardElement.querySelector(".text-gray-300.text-sm")?.textContent || "";
          const cardSpecialization = cardElement.querySelector(".flex.items-center.mb-4 span")?.textContent || "";
          const cardDescription = cardElement.querySelector(".text-msu-main-color.dark\\:text-msu-bgc-color.mb-4")?.textContent || "";
          const searchableText = [
            cardName,
            cardPosition,
            cardSpecialization,
            cardDescription
          ].join(" ").toLowerCase();
          if (searchableText.includes(searchTerm)) {
            matches = true;
            entryData = {
              name: cardName.trim(),
              position: cardPosition.trim(),
              department: cardElement.dataset.department || "College of Education",
              specialization: cardSpecialization ? [cardSpecialization.trim()] : []
            };
          }
        }
        if (matches) {
          cardElement.classList.remove("hidden");
          cardElement.style.display = "";
          visibleCount += 1;
          matchedEntries.push({
            id: facultyId,
            card: cardElement,
            data: entryData
          });
        } else {
          cardElement.classList.add("hidden");
          cardElement.style.display = "none";
        }
      });
      if (facultyResultsCount) {
        facultyResultsCount.innerHTML = "";
      }
      if (facultyResultsList) {
        facultyResultsList.innerHTML = "";
      }
      if (facultySearchResults && facultyResultsCount) {
        if (visibleCount === 0) {
          facultyResultsCount.innerHTML = '<span class="text-red-500">No faculty members found</span>';
          facultySearchResults.classList.remove("hidden");
        } else if (visibleCount === allFacultyCards.length) {
          facultySearchResults.classList.add("hidden");
        } else {
          facultyResultsCount.innerHTML = `Showing <span class="font-semibold text-msu-main-color dark:text-yellow-400">${visibleCount}</span> of <span class="font-semibold">${allFacultyCards.length}</span> faculty members`;
          facultySearchResults.classList.remove("hidden");
        }
      }
      if (facultyResultsList && matchedEntries.length && visibleCount !== allFacultyCards.length) {
        const groupedEntries = /* @__PURE__ */ new Map();
        matchedEntries.forEach((entry) => {
          const department = entry.data && entry.data.department || entry.card.dataset.department || "College of Education";
          if (!groupedEntries.has(department)) {
            groupedEntries.set(department, []);
          }
          groupedEntries.get(department)?.push(entry);
        });
        let resultsHtml = "";
        groupedEntries.forEach((entries, department) => {
          const sortedEntries = entries.slice().sort((a, b) => {
            const nameA = (a.data && a.data.name || a.card.querySelector("h3")?.textContent || "").toLowerCase();
            const nameB = (b.data && b.data.name || b.card.querySelector("h3")?.textContent || "").toLowerCase();
            return nameA.localeCompare(nameB);
          });
          const chipsHtml = sortedEntries.map((entry) => {
            const name = escapeHtml(entry.data && entry.data.name || entry.card.querySelector("h3")?.textContent || "Faculty Member");
            const position = escapeHtml(entry.data && entry.data.position || entry.card.querySelector(".text-gray-300.text-sm")?.textContent || "");
            const positionHtml = position ? `<span class="text-xs text-gray-500 dark:text-gray-400 sm:ml-1">${position}</span>` : "";
            return `<button type="button" class="inline-flex flex-col sm:flex-row sm:items-center sm:gap-1 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm text-msu-deep-ocean dark:text-yellow-300 bg-white dark:bg-gray-800 hover:bg-msu-deep-ocean hover:text-white transition-colors duration-200" data-faculty-id="${entry.id}"><span class="font-semibold">${name}</span>${positionHtml}</button>`;
          }).join("");
          resultsHtml += `<div class="bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm">
					<p class="text-xs font-semibold uppercase tracking-wide text-msu-deep-ocean dark:text-yellow-300">${escapeHtml(department)}</p>
					<div class="mt-2 flex flex-wrap gap-2">${chipsHtml}</div>
				</div>`;
        });
        facultyResultsList.innerHTML = resultsHtml;
      }
      if (showMoreBtn) {
        if (searchTerm) {
          showMoreBtn.classList.add("hidden");
        } else {
          showMoreBtn.classList.remove("hidden");
        }
      }
      if (clearFacultySearchBtn) {
        clearFacultySearchBtn.classList.remove("hidden");
      }
    }
    facultySearchInput.addEventListener("input", function(e) {
      if (activeDepartmentFilter) {
        activeDepartmentFilter = null;
        updateDepartmentButtonsState();
        hideDepartmentNotice();
      }
      filterFaculty(e.target.value);
    });
    if (clearFacultySearchBtn) {
      clearFacultySearchBtn.addEventListener("click", function() {
        facultySearchInput.value = "";
        if (activeDepartmentFilter) {
          activeDepartmentFilter = null;
          updateDepartmentButtonsState();
        }
        hideDepartmentNotice();
        filterFaculty("");
        facultySearchInput.focus();
      });
    }
    facultySearchInput.addEventListener("input", function() {
      if (clearFacultySearchBtn) {
        if (this.value.trim()) {
          clearFacultySearchBtn.classList.remove("hidden");
        } else {
          clearFacultySearchBtn.classList.add("hidden");
        }
      }
    });
    if (facultyResultsList) {
      facultyResultsList.addEventListener("click", function(event) {
        const target = event.target.closest("button[data-faculty-id]");
        if (!target) return;
        event.preventDefault();
        const facultyId = target.getAttribute("data-faculty-id");
        if (!facultyId) return;
        const card = facultyCardMap.get(facultyId);
        if (!card) return;
        const cardElement = card;
        cardElement.classList.remove("hidden");
        cardElement.style.display = "";
        highlightFacultyCard(cardElement);
      });
    }
  });
  var currentAlumniSlide = 0;
  var alumniAutoPlay = true;
  var alumniInterval;
  function initAlumniCarousel() {
    const carousel = document.getElementById("alumniCarousel");
    const dots = document.querySelectorAll(".alumni-dot");
    const prevBtn = document.getElementById("prevAlumni");
    const nextBtn = document.getElementById("nextAlumni");
    if (!carousel || !dots.length || !prevBtn || !nextBtn) {
      console.error("Alumni carousel elements not found");
      return;
    }
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentAlumniSlide * 100}%)`;
      dots.forEach((dot, index) => {
        if (index === currentAlumniSlide) {
          dot.classList.remove("bg-white/50");
          dot.classList.add("bg-white");
        } else {
          dot.classList.remove("bg-white");
          dot.classList.add("bg-white/50");
        }
      });
    }
    function nextSlide() {
      currentAlumniSlide = (currentAlumniSlide + 1) % 4;
      updateCarousel();
    }
    function prevSlide() {
      currentAlumniSlide = (currentAlumniSlide - 1 + 4) % 4;
      updateCarousel();
    }
    function goToSlide(slideIndex) {
      currentAlumniSlide = slideIndex;
      updateCarousel();
    }
    function startAutoPlay() {
      if (alumniAutoPlay) {
        alumniInterval = setInterval(nextSlide, 5e3);
      }
    }
    function stopAutoPlay() {
      clearInterval(alumniInterval);
    }
    nextBtn.addEventListener("click", () => {
      nextSlide();
      if (alumniAutoPlay) {
        stopAutoPlay();
        startAutoPlay();
      }
    });
    prevBtn.addEventListener("click", () => {
      prevSlide();
      if (alumniAutoPlay) {
        stopAutoPlay();
        startAutoPlay();
      }
    });
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        if (alumniAutoPlay) {
          stopAutoPlay();
          startAutoPlay();
        }
      });
    });
    let startX = 0;
    let endX = 0;
    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
    carousel.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });
    function handleSwipe() {
      const threshold = 50;
      const diff = startX - endX;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        if (alumniAutoPlay) {
          stopAutoPlay();
          startAutoPlay();
        }
      }
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        if (alumniAutoPlay) {
          stopAutoPlay();
          startAutoPlay();
        }
      } else if (e.key === "ArrowRight") {
        nextSlide();
        if (alumniAutoPlay) {
          stopAutoPlay();
          startAutoPlay();
        }
      }
    });
    updateCarousel();
    startAutoPlay();
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoPlay();
      } else if (alumniAutoPlay) {
        startAutoPlay();
      }
    });
  }
  document.addEventListener("DOMContentLoaded", initAlumniCarousel);
  window.initAlumniCarousel = initAlumniCarousel;
  var programsData = [];
  var currentPage = 1;
  var rowsPerPage = 25;
  var currentSort = { column: "program", direction: "asc" };
  var filteredData = [];
  function initializeProgramsData() {
    try {
      console.log("=== CLIENT-SIDE INITIALIZATION ===");
      console.log("Initializing programs data...");
      console.log("window.serverProgramsData exists:", !!window.serverProgramsData);
      console.log("window.serverProgramsData value:", window.serverProgramsData);
      if (window.serverProgramsData) {
        console.log("Parsing server data...");
        programsData = JSON.parse(window.serverProgramsData);
        console.log("Loaded server-side programsData:", programsData);
        console.log("ProgramsData length:", programsData.length);
        console.log("ProgramsData type:", typeof programsData);
        console.log("First program:", programsData[0]);
      } else {
        console.log("No server-side data found, using empty array");
        programsData = [];
      }
      if (programsData.length === 0) {
        console.log("No programs data found - will show empty state");
      }
      filteredData = [...programsData];
      console.log("Filtered data initialized:", filteredData);
      return true;
    } catch (error) {
      console.error("Error initializing programs data:", error);
      programsData = [];
      filteredData = [];
      return false;
    }
  }
  function initProgramsTable() {
    const tableBody = document.getElementById("programsTableBody");
    const mobileContainer = document.getElementById("mobileProgramsContainer");
    const globalSearch = document.getElementById("globalSearch");
    const degreeFilter = document.getElementById("degreeFilter");
    const levelFilter = document.getElementById("levelFilter");
    const clearFilters = document.getElementById("clearFilters");
    const rowsPerPageSelect = document.getElementById("rowsPerPage");
    const resultsCount = document.getElementById("resultsCount");
    const noResults = document.getElementById("noResults");
    function renderTable() {
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const pageData = filteredData.slice(startIndex, endIndex);
      if (pageData.length === 0) {
        tableBody.innerHTML = "";
        mobileContainer.innerHTML = "";
        noResults.classList.remove("hidden");
        return;
      }
      noResults.classList.add("hidden");
      tableBody.innerHTML = pageData.map((program) => `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${program.program}</div>
                    <div class="text-sm text-gray-500">${program.description}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-msu-main-color/10 text-msu-main-color">
                        ${program.degree}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${program.level}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${program.duration}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ${program.accreditation}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    ${program.fileUrl ? `<button onclick="openPDFViewer('${program.fileUrl}', '${program.name}')" class="text-msu-main-color hover:text-msu-deep-ocean transition-colors duration-200 cursor-pointer">
                            View Details
                        </button>` : `<span class="text-gray-400">No file available</span>`}
                </td>
            </tr>
        `).join("");
      mobileContainer.innerHTML = pageData.map((program) => `
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="p-6">
                    <!-- Program Header -->
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-bold text-msu-main-color leading-tight">${program.program}</h3>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-msu-main-color/10 text-msu-main-color ml-2 flex-shrink-0">
                            ${program.degree}
                        </span>
                    </div>
                    
                    <!-- Description -->
                    <p class="text-gray-600 text-sm mb-4 leading-relaxed">${program.description}</p>
                    
                    <!-- Program Details Grid -->
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Level</div>
                            <div class="text-sm font-semibold text-gray-900">${program.level}</div>
                        </div>
                        <div class="bg-gray-50 rounded-lg p-3">
                            <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Duration</div>
                            <div class="text-sm font-semibold text-gray-900">${program.duration}</div>
                        </div>
                    </div>
                    
                    <!-- Accreditation -->
                    <div class="mb-4">
                        <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            ${program.accreditation}
                        </div>
                    </div>
                    
                    <!-- Action Button -->
                    <div class="flex justify-end">
                        ${program.fileUrl ? `<button onclick="openPDFViewer('${program.fileUrl}', '${program.name}')" class="inline-flex items-center px-4 py-2 bg-msu-main-color text-white text-sm font-medium rounded-lg hover:bg-msu-deep-ocean transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer">
                                View Details
                                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </button>` : `<span class="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed">
                                No file available
                            </span>`}
                    </div>
                </div>
            </div>
        `).join("");
      resultsCount.textContent = `Showing ${startIndex + 1}-${Math.min(endIndex, filteredData.length)} of ${filteredData.length} programs`;
    }
    function filterData() {
      const searchTerm = globalSearch.value.toLowerCase();
      const degreeFilterValue = degreeFilter.value;
      const levelFilterValue = levelFilter.value;
      filteredData = programsData.filter((program) => {
        const matchesSearch = !searchTerm || [program.program, program.description, program.degree, program.level, program.department].some((value) => {
          if (!value) return false;
          return value.toString().toLowerCase().includes(searchTerm);
        });
        const matchesDegree = !degreeFilterValue || program.degree === degreeFilterValue;
        const matchesLevel = !levelFilterValue || program.level === levelFilterValue;
        return matchesSearch && matchesDegree && matchesLevel;
      });
      currentPage = 1;
      renderTable();
      renderPagination();
    }
    function sortData(column) {
      if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === "asc" ? "desc" : "asc";
      } else {
        currentSort.column = column;
        currentSort.direction = "asc";
      }
      filteredData.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        if (currentSort.direction === "asc") {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
      renderTable();
    }
    function renderPagination() {
      const totalPages = Math.ceil(filteredData.length / rowsPerPage);
      const pagination = document.getElementById("pagination");
      if (totalPages <= 1) {
        pagination.innerHTML = "";
        return;
      }
      let paginationHTML = '<nav class="flex items-center space-x-1">';
      paginationHTML += `
            <button onclick="changePage(${currentPage - 1})" 
                    ${currentPage === 1 ? "disabled" : ""} 
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
            </button>
        `;
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      if (startPage > 1) {
        paginationHTML += `<button onclick="changePage(1)" class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50">1</button>`;
        if (startPage > 2) {
          paginationHTML += '<span class="px-3 py-2 text-sm font-medium text-gray-500">...</span>';
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
                <button onclick="changePage(${i})" 
                        class="px-3 py-2 text-sm font-medium ${i === currentPage ? "text-white bg-msu-main-color border-msu-main-color" : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"} border">
                    ${i}
                </button>
            `;
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          paginationHTML += '<span class="px-3 py-2 text-sm font-medium text-gray-500">...</span>';
        }
        paginationHTML += `<button onclick="changePage(${totalPages})" class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50">${totalPages}</button>`;
      }
      paginationHTML += `
            <button onclick="changePage(${currentPage + 1})" 
                    ${currentPage === totalPages ? "disabled" : ""} 
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
            </button>
        `;
      paginationHTML += "</nav>";
      pagination.innerHTML = paginationHTML;
    }
    window.changePage = function(page) {
      const totalPages = Math.ceil(filteredData.length / rowsPerPage);
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
        renderPagination();
      }
    };
    globalSearch.addEventListener("input", filterData);
    degreeFilter.addEventListener("change", filterData);
    levelFilter.addEventListener("change", filterData);
    rowsPerPageSelect.addEventListener("change", (e) => {
      rowsPerPage = parseInt(e.target.value);
      currentPage = 1;
      renderTable();
      renderPagination();
    });
    clearFilters.addEventListener("click", () => {
      globalSearch.value = "";
      degreeFilter.value = "";
      levelFilter.value = "";
      filterData();
    });
    window.filterProgramsByDepartment = function(department) {
      if (globalSearch) {
        globalSearch.value = department || "";
      }
      if (degreeFilter) {
        degreeFilter.value = "";
      }
      if (levelFilter) {
        levelFilter.value = "";
      }
      filterData();
      if (department) {
        const programsSection = document.getElementById("programs");
        if (programsSection) {
          programsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.querySelectorAll("[data-sort]").forEach((header) => {
      header.addEventListener("click", () => {
        sortData(header.dataset.sort);
      });
    });
    renderTable();
    renderPagination();
  }
  document.addEventListener("DOMContentLoaded", function() {
    const success = initializeProgramsData();
    if (success) {
      initProgramsTable();
    } else {
      console.error("Failed to load programs data");
      const tableBody = document.getElementById("programsTableBody");
      const mobileContainer = document.getElementById("mobileProgramsContainer");
      const noResults = document.getElementById("noResults");
      if (tableBody) tableBody.innerHTML = "";
      if (mobileContainer) mobileContainer.innerHTML = "";
      if (noResults) {
        noResults.classList.remove("hidden");
        noResults.innerHTML = `
                <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Failed to load programs</h3>
                <p class="mt-1 text-sm text-gray-500">Please refresh the page to try again.</p>
            `;
      }
    }
  });
})();
