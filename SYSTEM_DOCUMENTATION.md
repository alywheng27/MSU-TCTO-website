# MSU-TCTO Website System Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Key Features](#key-features)
5. [Content Management System](#content-management-system)
6. [API & Data Layer](#api--data-layer)
7. [Components Architecture](#components-architecture)
8. [Pages & Routing](#pages--routing)
9. [Deployment](#deployment)
10. [Development Guide](#development-guide)
11. [Configuration](#configuration)
12. [Maintenance & Updates](#maintenance--updates)

---

## System Overview

### Purpose
The MSU-TCTO (Mindanao State University - Tawi-Tawi College of Technology and Oceanography) website is a comprehensive institutional website designed to serve as the digital gateway for the university. It provides information about academic programs, admissions, publications, events, faculty, and administrative services.

### Mission
The website supports the university's mission of "Creating Opportunities and Transforming Lives" by providing:
- Easy access to academic information and programs
- Transparent admission procedures and requirements
- Publication and research dissemination
- Event and calendar management
- Faculty and staff directory
- Administrative transparency

### Target Audience
- Prospective students and parents
- Current students
- Faculty and staff
- Researchers and academics
- General public and stakeholders

---

## Architecture & Technology Stack

### Core Framework
- **Astro 5.4.2** - Modern static site generator with server-side rendering capabilities
- **React 18.3.1** - For interactive components
- **TypeScript 5.8.2** - Type safety and better developer experience

### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Bootstrap 5.3.3** - Additional UI components
- **Animate.css 4.1.1** - Animation library
- **AOS (Animate On Scroll) 2.3.4** - Scroll animations
- **Framer Motion 12.4.10** - Advanced animations

### Content Management
- **Sanity CMS** - Headless CMS for content management
  - Project ID: `w8lfrsa6`
  - Dataset: `production`
  - API Version: `2021-03-25`
  - CDN Enabled: Yes

### Build & Deployment
- **Netlify** - Primary hosting platform (default)
- **Vercel** - Alternative hosting platform (optional)
- **Server-Side Rendering (SSR)** - Enabled for dynamic content

### Additional Libraries
- **PDF.js** - PDF viewing and rendering
- **Swiper** - Touch slider/carousel
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **React Table** - Data table component
- **Nodemailer** - Email functionality

---

## Project Structure

```
MSU-TCTO-website/
├── public/                    # Static assets (images, videos, PDFs, etc.)
│   ├── images/               # Image assets
│   ├── audio/                # Audio files (hymns, motivational)
│   ├── video/                # Video files
│   ├── transparency/         # Transparency seal documents
│   ├── InterAgencies/        # Partner organization logos
│   ├── InternationalPartnership/  # International partner logos
│   └── LocalPartnership/     # Local partner logos
│
├── src/
│   ├── api/                  # API functions and Sanity queries
│   │   ├── api.jsx           # Main API functions (1500+ lines)
│   │   ├── client.jsx        # Sanity client configuration
│   │   └── [other API files]
│   │
│   ├── components/           # Reusable components
│   │   ├── Navbar.jsx        # Main navigation bar
│   │   ├── Footer.astro      # Footer component
│   │   ├── PDFViewer.jsx     # PDF viewing component
│   │   ├── CarouselMain.jsx  # Main carousel/slider
│   │   └── [40+ components]
│   │
│   ├── config/               # Configuration files
│   │   └── navigation.js     # Navigation structure
│   │
│   ├── layouts/              # Page layouts
│   │   ├── Layout.astro      # Main layout
│   │   └── introloader.astro # Landing page layout
│   │
│   ├── pages/                # Route pages (file-based routing)
│   │   ├── index.astro       # Homepage
│   │   ├── about/            # About pages
│   │   ├── admissions/       # Admission pages
│   │   ├── programs/         # Academic program pages
│   │   ├── publications/     # Publication pages
│   │   ├── offices/          # Office pages
│   │   └── api/              # API endpoints
│   │
│   ├── styles/               # Global styles
│   │   ├── css/
│   │   │   ├── global.css    # Main stylesheet
│   │   │   └── globalanimate.css  # Animation styles
│   │   └── [fonts]
│   │
│   └── js/                   # JavaScript utilities
│       └── [utility scripts]
│
├── astro.config.mjs          # Astro configuration
├── tailwind.config.cjs       # Tailwind configuration
├── package.json              # Dependencies and scripts
└── netlify.toml              # Netlify deployment config
```

---

## Key Features

### 1. Academic Programs
- **7 Colleges/Institutes:**
  - College of Arts and Sciences (CAS)
  - College of Islamic & Arabic Studies (CIAS)
  - College of Education (COED)
  - College of Fisheries (COF)
  - College of Computer Studies (CCS)
  - Institute of Oceanography and Environmental Science (IOES)
  - College of Law (COL)

- **Program Features:**
  - Program descriptions and details
  - Degree information (Bachelor's, Master's, Doctorate)
  - Duration and accreditation status
  - PDF curriculum downloads
  - Filterable program listings by degree, level, and department

### 2. Admissions
- **Admission Types:**
  - Freshmen admissions
  - Transferee admissions
  - Returning/Shifting students
  - Remedial programs
  - Student fees information
  - Scholarships & Grants

### 3. Publications
- **Content Types:**
  - Articles (with categories, topics, subjects)
  - Gazette publications
  - Annual Reports
  - Sulimbang publications
  - KAWASA publications
  - Scopus research publications

### 4. Academic Calendar
- Event management system
- Semester-based organization
- Holiday tracking
- Upcoming events display
- Calendar dropdown navigation

### 5. Faculty & Staff Directory
- Faculty listings by college/department
- Staff directory
- Contact information
- Office assignments

### 6. Transparency Seal
- Document repository
- PDF downloads
- Compliance documents
- Public access to institutional information

### 7. Graduation Photos
- Photo gallery system
- Search functionality
- Commencement photo management

### 8. Careers
- Job postings
- Open positions table
- Application information

### 9. Partnerships
- International partnerships display
- Local partnerships
- Partner organization logos and information

### 10. Search Functionality
- Site-wide search
- Article search with category filtering
- Pagination support

### 11. Contact Forms
- Multiple contact forms for different offices
- Email integration
- Form validation

### 12. Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Touch-friendly interfaces

---

## Content Management System

### Sanity CMS Integration

The website uses Sanity CMS as its headless content management system. All dynamic content is managed through Sanity Studio and fetched via API.

#### Configuration
- **Project ID:** `w8lfrsa6`
- **Dataset:** `production`
- **API Version:** `2021-03-25`
- **CDN:** Enabled for faster content delivery

#### Content Types (Document Types)

1. **Article** - News articles and blog posts
   - Title, slug, author
   - Body content (rich text)
   - Main image with crop/hotspot
   - Categories, topics, subjects
   - Featured flag
   - Published date

2. **Program** - Academic programs
   - Title, description
   - Degree, level, duration
   - Accreditation status
   - Department reference
   - Curriculum PDF file

3. **Calendar** - Academic calendar events
   - Title, date
   - Body content
   - Semester reference
   - Holiday flag

4. **Gazette** - Gazette publications
   - Title, content
   - Publication date
   - PDF files

5. **Annual Report** - Annual reports
   - Title, year
   - Content and PDF files

6. **Sulimbang** - Sulimbang publications
   - Title, content
   - Publication information

7. **Commencement** - Graduation photos
   - Photo metadata
   - Year, batch information

8. **Faculty/Staff** - Personnel information
   - Name, position
   - Department/office
   - Contact information

9. **Reference Types:**
   - Department
   - Degree
   - Level
   - Category
   - Topic
   - Subject
   - Semester
   - Holiday

#### Image Handling
- Images are stored in Sanity's asset system
- Automatic CDN delivery
- Image optimization and transformation
- Support for crop and hotspot for responsive images

#### PDF Handling
- PDF files stored as Sanity assets
- CDN URL generation
- PDF viewer component integration

---

## API & Data Layer

### API Structure (`src/api/api.jsx`)

The main API file contains 1500+ lines of functions for fetching data from Sanity CMS.

#### Key API Functions

**Article Functions:**
- `getArticle()` - Get all articles
- `get3LatestArticle()` - Get 3 latest articles
- `getLatestFeaturedArticle()` - Get featured article
- `getSingleLatestArticle()` - Get single latest article
- `getSearchArticle(search, category, page)` - Search articles with pagination
- `getSearchArticleCount(search, category)` - Get search result count

**Program Functions:**
- `getCOEDPrograms()` - Get COED programs
- `getCASPrograms()` - Get CAS programs
- `getCIASPrograms()` - Get CIAS programs
- `getCOFPrograms()` - Get COF programs
- `getCCSPrograms()` - Get CCS programs
- `getIOESPrograms()` - Get IOES programs
- `getCOLPrograms()` - Get COL programs

**Calendar Functions:**
- `get4UpcomingEvents()` - Get 4 upcoming events
- `getAllCalendarEvents()` - Get all calendar events
- `testCalendarData()` - Test calendar data retrieval

**Publication Functions:**
- `get3LatestGazette()` - Get 3 latest gazettes
- `get3LatestAnnualReport()` - Get 3 latest annual reports
- `sulimbanglatestshown()` - Get latest Sulimbang

**Utility Functions:**
- `urlForImage(source)` - Generate optimized image URLs
- `urlForPDF(source)` - Generate PDF CDN URLs
- `testSanityConnection()` - Test Sanity connectivity

### Query Language (GROQ)

All queries use GROQ (Graph-Relational Object Queries), Sanity's query language:

```groq
*[_type == "article"] | order(publishedAt desc){
  title,
  slug{current},
  author->{name},
  mainImage{asset->},
  publishedAt
}
```

### Data Fetching Pattern

1. **Server-Side Fetching:** Data is fetched at build time or request time using Astro's server-side capabilities
2. **Static Generation:** Most pages use static generation for performance
3. **ISR (Incremental Static Regeneration):** Some pages support ISR for dynamic content
4. **Client-Side Fetching:** Interactive components use React hooks for client-side data fetching

---

## Components Architecture

### Component Types

#### 1. Layout Components
- **Layout.astro** - Main page layout wrapper
- **introloader.astro** - Landing page with intro animation

#### 2. Navigation Components
- **Navbar.jsx** - Main navigation bar with dropdowns
- **Footer.astro** - Footer with links and information
- **FooterNav.astro** - Footer navigation section
- **CoedNavbar.jsx** - College-specific navigation

#### 3. Content Components
- **ChancellorMessage.astro** - Chancellor's welcome message
- **CarouselMain.jsx** - Main homepage carousel
- **HeroMainHeading.jsx** - Hero section component
- **Hero[College]Heading.jsx** - College-specific hero sections
- **MainVideo.astro** - Video background component

#### 4. Publication Components
- **GazetteCard.astro** - Gazette card display
- **GazetteTab.jsx** - Gazette tab interface
- **ResearchHighlights.astro** - Research highlights section

#### 5. Academic Components
- **AcademicCalendar.astro** - Calendar display
- **FirstSemester.astro** - First semester calendar
- **SecondSemester.astro** - Second semester calendar
- **AdmissionProcedure/** - Admission procedure components

#### 6. Interactive Components
- **PDFViewer.jsx** - PDF viewing component
- **PDFViewerWrapper.jsx** - PDF viewer wrapper
- **modal.jsx** - Modal dialog component
- **ReactTable.jsx** - Data table component
- **MySwiper.jsx** - Swiper carousel wrapper

#### 7. Search Components
- **SearchForm.jsx** - Search form component
- **PageSearch.jsx** - Page search functionality

#### 8. Display Components
- **FacultyAndStaff.jsx** - Faculty/staff directory
- **InternationalPartners.astro** - Partner display
- **StatsCounter.astro** - Statistics counter
- **Testimonials.astro** - Testimonials section
- **OpenPositionsTable.jsx** - Job listings table

### Component Patterns

1. **Astro Components** - Server-side components for static content
2. **React Components** - Client-side interactive components
3. **Hybrid Approach** - Astro for structure, React for interactivity

---

## Pages & Routing

### File-Based Routing

Astro uses file-based routing where each file in `src/pages/` becomes a route.

### Main Routes

#### Home & Landing
- `/` - Homepage (`index.astro`)
- `/launch_page` - Website launch page

#### About
- `/about/campus` - Campus history
- `/about/mission-vision` - Mission and vision
- `/about/university-hymn` - University hymn

#### Admissions
- `/admissions/admissions` - Admission procedures
- `/admissions/scholarship-and-grants` - Scholarships

#### Programs
- `/programs` - Programs overview
- `/programs/cas` - College of Arts and Sciences
- `/programs/cias` - College of Islamic & Arabic Studies
- `/programs/coed` - College of Education
- `/programs/cof` - College of Fisheries
- `/programs/ccs` - College of Computer Studies
- `/programs/ioes` - Institute of Oceanography and Environmental Science
- `/programs/col` - College of Law

#### Offices
- `/offices/offices` - Administrative offices
- `/offices/academic-offices` - Academic offices
- `/offices/faculty-staff` - Faculty and staff directory

#### Publications
- `/publications/articles` - Articles listing
- `/publications/gazette` - Gazette publications
- `/publications/annual-reports` - Annual reports
- `/publications/sulimbang` - Sulimbang publications
- `/publications/offices` - Office resources
- `/publications/msutctoscopus` - Scopus publications

#### Other Pages
- `/academic-calendar` - Academic calendar
- `/careers` - Job openings
- `/graduationphoto` - Graduation photos
- `/partners` - Partnerships
- `/transparency-seal` - Transparency seal
- `/bidding` - Bidding information
- `/iciie2025` - ICIIE 2025 conference
- `/search/[...search]` - Search results
- `/404` - 404 error page

### Dynamic Routes

- `[...slug].astro` - Catch-all route for dynamic content
- `/search/[...search].astro` - Dynamic search routes

### API Routes

API endpoints in `src/pages/api/`:
- Contact form endpoints
- Email sending endpoints
- Debug endpoints
- File upload endpoints
- QR code generation
- Scopus search integration

---

## Deployment

### Deployment Platforms

#### Netlify (Primary)
- Configuration: `netlify.toml`
- Build command: `npm run build`
- Output directory: `dist`
- Serverless functions support
- Form handling
- Redirects configuration

#### Vercel (Alternative)
- Configuration: `vercel.json`
- Automatic detection
- Serverless functions
- Edge functions support

### Build Process

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Build for Production:**
   ```bash
   npm run build
   ```
   - Generates static files in `dist/`
   - Optimizes assets
   - Generates sitemap
   - Creates serverless functions

3. **Preview Build:**
   ```bash
   npm run preview
   ```
   - Tests production build locally

### Environment Variables

Required environment variables (if using):
- Sanity project credentials (configured in code)
- Email service credentials (for contact forms)
- API keys (if applicable)

### Deployment Checklist

- [ ] Run build locally to verify
- [ ] Check for TypeScript errors
- [ ] Verify all API endpoints
- [ ] Test responsive design
- [ ] Check image optimization
- [ ] Verify PDF links
- [ ] Test form submissions
- [ ] Check redirects
- [ ] Verify analytics (if applicable)

---

## Development Guide

### Prerequisites

- **Node.js** 18+ (recommended: LTS version)
- **npm** or **yarn** package manager
- **Git** for version control

### Setup Instructions

1. **Clone Repository:**
   ```bash
   git clone [repository-url]
   cd MSU-TCTO-website
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   - Server runs at `http://localhost:4321` (default Astro port)

4. **Build for Production:**
   ```bash
   npm run build
   ```

### Development Workflow

1. **Create Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes:**
   - Edit files in `src/`
   - Test locally with `npm run dev`

3. **Test Build:**
   ```bash
   npm run build
   npm run preview
   ```

4. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- **Astro Files:** Use `.astro` extension for page and layout components
- **React Components:** Use `.jsx` for interactive components
- **TypeScript:** Use `.ts` or `.tsx` for typed files
- **Styling:** Prefer Tailwind CSS utility classes
- **Naming:** Use PascalCase for components, camelCase for functions

### File Organization

- **Pages:** One file per route in `src/pages/`
- **Components:** Reusable components in `src/components/`
- **API Functions:** All in `src/api/api.jsx` or separate files
- **Styles:** Global styles in `src/styles/css/`
- **Config:** Configuration in `src/config/`

### Testing

- Manual testing in development server
- Browser DevTools for responsive testing
- Test on multiple devices/browsers
- Verify Sanity data fetching
- Test form submissions
- Check PDF viewing

---

## Configuration

### Astro Configuration (`astro.config.mjs`)

```javascript
export default defineConfig({
  site: 'https://msutcto.edu.ph',
  integrations: [
    react(),           // React support
    tailwind(),        // Tailwind CSS
    sanity({           // Sanity CMS
      projectId: 'w8lfrsa6',
      dataset: 'production',
      apiVersion: '2021-03-25',
      useCdn: true
    })
  ],
  output: "server",   // Server-side rendering
  adapter: adapter,   // Netlify or Vercel
});
```

### Navigation Configuration (`src/config/navigation.js`)

Centralized navigation structure:
- **University** section
- **Admissions** section
- **Programs** section
- **Offices** section
- **Publications** section
- **Careers** section
- **Graduation** section
- **Conference** section
- **Journal** section

Update navigation by editing this file - changes reflect in both Navbar and Footer.

### Tailwind Configuration (`tailwind.config.cjs`)

Custom theme configuration:
- MSU brand colors
- Custom typography
- Responsive breakpoints
- Custom utilities

### Sanity Client Configuration

Configured in:
- `astro.config.mjs` (Astro integration)
- `src/api/client.jsx` (Direct client)
- `src/api/api.jsx` (Main API functions)

---

## Maintenance & Updates

### Regular Maintenance Tasks

1. **Content Updates:**
   - Update articles, events, and publications in Sanity CMS
   - Add new programs or update existing ones
   - Update faculty/staff information

2. **Dependency Updates:**
   ```bash
   npm outdated
   npm update
   ```
   - Review breaking changes
   - Test after updates

3. **Performance Monitoring:**
   - Check page load times
   - Optimize images
   - Review bundle sizes

4. **Security Updates:**
   - Keep dependencies updated
   - Review security advisories
   - Update API keys if compromised

### Content Management

All content is managed through Sanity CMS:
1. Access Sanity Studio (usually at `/studio` or separate URL)
2. Edit content types
3. Publish changes
4. Changes reflect on website (may require rebuild)

### Adding New Features

1. **New Page:**
   - Create file in `src/pages/`
   - Add route to navigation if needed
   - Create components if required

2. **New Component:**
   - Create in `src/components/`
   - Use appropriate framework (Astro/React)
   - Add to pages as needed

3. **New API Function:**
   - Add to `src/api/api.jsx` or create new file
   - Use GROQ queries for Sanity
   - Export function for use in pages

4. **New Content Type:**
   - Define schema in Sanity Studio
   - Create API functions to fetch data
   - Build pages/components to display

### Troubleshooting

**Common Issues:**

1. **Build Errors:**
   - Check TypeScript errors
   - Verify all imports
   - Check environment variables

2. **Sanity Connection Issues:**
   - Verify project ID and dataset
   - Check API version
   - Verify CDN status

3. **Styling Issues:**
   - Clear Tailwind cache
   - Rebuild CSS
   - Check responsive breakpoints

4. **PDF Viewing Issues:**
   - Verify PDF URLs
   - Check PDF.js version
   - Verify CORS settings

---

## Additional Resources

### Documentation Files in Repository

- `README.md` - Basic project information
- `DARK_MODE_IMPLEMENTATION.md` - Dark mode feature documentation
- `MOBILE_IMPROVEMENTS_SUMMARY.md` - Mobile optimization details
- `MOBILE_OPTIMIZATION_COMPLETE.md` - Mobile optimization completion
- `MOBILE_QUICK_REFERENCE.md` - Mobile development quick reference
- `MOBILE_RESPONSIVE_COL.md` - College of Law mobile responsiveness
- `MOBILE_TESTING_CHECKLIST.md` - Mobile testing guidelines
- `RESPONSIVE_BREAKPOINTS_GUIDE.md` - Responsive design guide

### External Resources

- [Astro Documentation](https://docs.astro.build)
- [Sanity CMS Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

## Support & Contact

### Development Team
- **Micho A. Robledo** - Web Developer
- **Aly Mama** - Web Developer

### Getting Help

1. Check existing documentation
2. Review code comments
3. Check Sanity CMS documentation
4. Review Astro/React documentation
5. Contact development team

---

## Version History

- **Version 0.0.1** - Initial release
- Current version as of documentation creation

---

## License & Copyright

© Mindanao State University - Tawi-Tawi College of Technology and Oceanography

All rights reserved. This documentation is for internal use and system maintenance purposes.

---

*Last Updated: [Current Date]*
*Documentation Version: 1.0*


