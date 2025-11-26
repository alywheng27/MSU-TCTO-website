// Shared Navigation Configuration
// This file contains all navigation links used by both Navbar and Footer
// Update this file to automatically update both components

export const navigationConfig = {
  // University section - appears in footer
  university: {
    title: "University",
    links: [
      { label: "History", href: "/about/campus" },
      { label: "Mission / Vision", href: "/about/mission-vision" },
      { label: "University Hymn", href: "/about/university-hymn" },
      { label: "Articles", href: "/publications/articles" },
      { label: "Gazette", href: "/publications/gazette" },
      { label: "Events", href: "/academic-calendar" },
      { label: "Annual Report", href: "/publications/annual-reports" },
    ]
  },

  // Admissions section - appears in both navbar and footer
  admissions: {
    title: "Admissions",
    links: [
      // Footer-only links (shown first in footer)
      { label: "Freshmen", href: "/admissions/admissions#freshmen", footerOnly: true },
      { label: "Transferee", href: "/admissions/admissions#transferee", footerOnly: true },
      { label: "Returning / Shifting", href: "/admissions/admissions#shifting", footerOnly: true },
      { label: "Remedial Program", href: "/admissions/admissions#remedial", footerOnly: true },
      { label: "Student Fees", href: "/admissions/admissions#fees", footerOnly: true },
      { label: "Scholarships & Grants", href: "/admissions/scholarship-and-grants", footerOnly: true },
      // Navbar links
      { label: "Admission Procedures", href: "/admissions/admissions" },
      { label: "Scholarship and Grants", href: "/admissions/scholarship-and-grants" },
    ]
  },

  // Programs section - appears in both navbar and footer
  programs: {
    title: "Programs",
    links: [
      { label: "College of Arts and Sciences", href: "/programs/cas", footerLabel: "College of Arts and Sciences (CAS)", footerHref: "/programs/cas" },
      { label: "College of Islamic & Arabic Studies", href: "/programs/cias", footerLabel: "College of Islamic and Arabic Studies (CIAS)", footerHref: "/programs/cias" },
      { label: "College of Education", href: "/programs/coed", footerLabel: "College of Education (COED)", footerHref: "/programs/coed" },
      { label: "College of Fisheries", href: "/programs/cof", footerLabel: "College of Fisheries (COF)", footerHref: "/programs/cof" },
      { label: "College of Computer Studies (CCS)", href: "/programs/ccs", footerLabel: "College of Computer Studies (CCS)", footerHref: "/programs/ccs" },
      { label: "Institute of Oceanography and Environmental Science", href: "/programs/ioes", footerLabel: "Institute of Oceanography and Environmental Sciences (IOES)", footerHref: "/programs/ioes" },
      { label: "College of Law", href: "/programs/col", footerLabel: "College of Law (COL)", footerHref: "/programs/col" },
    ]
  },

  // Offices section - appears in both navbar and footer
  offices: {
    title: "Offices",
    links: [
      { label: "Administrative Offices", href: "/offices/offices", footerLabel: "Administrative Offices", footerHref: "/offices/offices#administrative" },
      { label: "Academic Offices", href: "/offices/academic-offices", footerLabel: "Academic Offices" },
      { label: "Faculty & Staff", href: "/offices/faculty-staff", footerLabel: "Faculty and Staff" },
    ]
  },

  // Home section - appears in navbar only
  home: {
    title: "Home",
    links: [
      { label: "Overview", href: "/" },
      { label: "Office & Student Survey", href: "/officefeedback" },
      { label: "Local and International Partners", href: "/partners" }
    ]
  },

  // Publications section - appears in navbar only
  publications: {
    title: "Publications",
    links: [
      { label: "Offices & Resources", href: "/publications/offices" },
      { label: "Articles", href: "/publications/articles" },
      { label: "Sulimbang", href: "/publications/sulimbang" },
      { label: "Gazettes", href: "/publications/gazette" },
      { label: "Bidding", href: "/bidding" },
      { label: "Annual Reports", href: "/publications/annual-reports" },
      { label: "KAWASA Publications", href: "/underprocess" },
    ]
  },

  // Careers section - appears in navbar only
  careers: {
    title: "Careers",
    links: [
      { label: "Open Positions", href: "/careers" },
    ]
  },

  // Graduation section - appears in navbar only
  graduation: {
    title: "Graduation",
    links: [
      { label: "Graduation Photos", href: "/graduationphoto" },
    ]
  },

  // Conference section - appears in navbar only
  conference: {
    title: "Conference",
    links: [
      { label: "ICIIE 2025", href: "/iciie2025" },
      { label: "TEPO Journal", href: "https://thetepojournal.org/ojs/index.php/TEPO/index" },
    ]
  }
};

// Helper function to get navbar items (for Navbar.jsx)
export function getNavbarItems() {
  return [
    navigationConfig.home,
    navigationConfig.university, // Note: footer uses "University" but navbar uses "About"
    navigationConfig.admissions,
    navigationConfig.programs,
    navigationConfig.offices,
    navigationConfig.publications,
    navigationConfig.careers,
    navigationConfig.graduation,
    navigationConfig.conference,
  ];
}

// Helper function to get footer sections (for Footer.astro)
export function getFooterSections() {
  return {
    university: navigationConfig.university,
    admissions: navigationConfig.admissions,
    programs: navigationConfig.programs,
    offices: navigationConfig.offices,
  };
}

