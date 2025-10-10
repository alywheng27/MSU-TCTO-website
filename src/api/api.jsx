import { useSanityClient, groq } from 'astro-sanity';
import { createImageBuilder } from 'astro-sanity';
// import sanityClient from '@sanity/client'
import { createClient } from "@sanity/client";
const client = createClient({
  projectId: "w8lfrsa6",
  dataset: "production",
  apiVersion: '2021-03-25',
  useCdn: true
});

export const imageBuilder = createImageBuilder(useSanityClient());


export function urlForImage(source) {
  return imageBuilder.image(source);
}

export function urlForPDF(source) {
  console.log('urlForPDF input:', source);
  
  if (!source) {
    console.log('urlForPDF: No source provided');
    return null;
  }
  
  if (!source.asset) {
    console.log('urlForPDF: No asset in source');
    return null;
  }
  
  if (!source.asset.url) {
    console.log('urlForPDF: No URL in asset');
    return null;
  }
  
  const url = source.asset.url;
  console.log('urlForPDF: Original URL:', url);
  
  // Check if it's already a CDN URL
  if (url.includes('cdn.sanity.io')) {
    console.log('urlForPDF: Already a CDN URL, returning as is');
    return url;
  }
  
  // For Sanity URLs, we need to handle different formats
  // Example: https://cdn.sanity.io/files/w8lfrsa6/production/filename.pdf
  if (url.includes('sanity.io')) {
    // If it's a Sanity URL but not CDN, try to convert it
    if (url.includes('/files/')) {
      console.log('urlForPDF: Converting Sanity URL to CDN');
      return url;
    }
  }
  
  // Extract the file ID from the Sanity URL
  // Handle different URL formats
  let fileId;
  if (url.includes('/files/')) {
    // URL format: https://cdn.sanity.io/files/w8lfrsa6/production/filename.pdf
    const parts = url.split('/');
    fileId = parts[parts.length - 1];
  } else if (url.includes('?')) {
    // URL format: https://cdn.sanity.io/files/w8lfrsa6/production/filename.pdf?dl=...
    fileId = url.split('/').pop().split('?')[0];
  } else {
    // Fallback: just get the last part
    fileId = url.split('/').pop();
  }
  
  console.log('urlForPDF: Extracted file ID:', fileId);
  
  // Construct the CDN URL
  const cdnUrl = `https://cdn.sanity.io/files/w8lfrsa6/production/${fileId}`;
  console.log('urlForPDF: Generated CDN URL:', cdnUrl);
  
  return cdnUrl;
}

export async function getArticle() {
  const query = groq`*[_type == "article"] | order(publishedAt desc){
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const articles = await useSanityClient().fetch(query);
  return articles;
}

export async function getSearchArticleCount(search, category) {
  let hold = "";
  if(category != undefined && category != "All") {
    hold = ` && category._ref in *[_type=="articleCategory" && category=="${category}"]._id`;
  }
  const query = groq`*[_type == "article" && title match "*${search}*"${hold}] | order(publishedAt desc){}`;

  const articles = await useSanityClient().fetch(query);
  return articles;
}

export async function getSearchArticle(search, category, page) {
  if(page === undefined) {
    page = 1;
  }
  const end = (page * 10) - 1 ;
  const start = (end - 10) + 1;

  let hold = "";
  if(category != undefined && category != "All") {
    hold = ` && category._ref in *[_type=="articleCategory" && category=="${category}"]._id`;
  }
  const query = groq`*[_type == "article" && title match "*${search}*"${hold}] | order(publishedAt desc)[${start}..${end}]{
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const articles = await useSanityClient().fetch(query);
  return articles;
}

// the single, latest document
export async function getSingleLatestArticle() {
  const query = groq`*[_type == "article"] | order(publishedAt desc)[0]{
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const singleLatestArticle= await useSanityClient().fetch(query);
  return singleLatestArticle;
}



// the single, oldest document
export async function getSingleOldestArticle() {
  const query = groq`*[_type == "article"] | order(publishedAt asc)[0]{
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const singleOldestArticle= await useSanityClient().fetch(query);
  return singleOldestArticle;
}

// latest 4 documents
export async function get4LatestArticles() {
  const query = groq`*[_type == "article"] | order(publishedAt desc){
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const fourLatestArticles= await useSanityClient().fetch(query);
  return fourLatestArticles;
}

export async function get3LatestArticle() {
  const query = groq`*[_type == "article"] | order(publishedAt desc)[1..3]{
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const threeLatestArticles = await useSanityClient().fetch(query);
  return threeLatestArticles;
}

export async function get5LatestArticle() {
  const query = groq`*[_type == "article"] | order(publishedAt desc)[1..5]{
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const get5LatestArticle = await useSanityClient().fetch(query);
  return get5LatestArticle;
}

export async function get3_5LatestArticle() {
  const query = groq`*[_type == "article"] | order(publishedAt desc)[4..6]{
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const three_5LatestArticles = await useSanityClient().fetch(query);
  return three_5LatestArticles;
}

export async function get3LatestNews() {
  const query = groq`*[_type == "article" && category._ref in *[_type=="articleCategory" && category=="News"]._id] | order(publishedAt desc)[0..2]{
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const threeLatestNews = await useSanityClient().fetch(query);
  return threeLatestNews;
}

export async function getLatestFeaturedArticle() {
  const query = groq`
    *[_type == "article"] 
    | order(publishedAt desc)[0] {
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const latestFeaturedArticle = await useSanityClient().fetch(query);
  return latestFeaturedArticle;
}

export async function get3LatestFeaturedArticle() {
  const query = groq`*[_type == "article" && featured == true] | order(publishedAt desc)[0..2] {
    title,
    slug{
      current
    },
    author->{name},
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    category->{category},
    publishedAt,
    featured,
    _createdAt,
  }`;

  const threeLatestFeaturedArticle = await useSanityClient().fetch(query);
  return threeLatestFeaturedArticle;
}

export async function get3UpcomingEvents() {
  const query = groq`*[_type == "calendar"] | order(date desc)[0..2] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const threeUpcomingEvents = await useSanityClient().fetch(query);
  return threeUpcomingEvents;
}

export async function get4UpcomingEvents() {
  try {
    console.log('=== DEBUG: get4UpcomingEvents ===');
    
    // Get all calendar events without date filtering
    const query = groq`*[_type == "calendar"] | order(date desc)[0..3] {
      title,
      date,
      body[]{
        children[]{
          text
        },
        asset->{url},
      },
      semester->{semester},
      holiday->{holiday},
    }`;
    
    const fourUpcomingEvents = await useSanityClient().fetch(query);
    console.log('All calendar events (first 4):', fourUpcomingEvents);
    console.log('Total events found:', fourUpcomingEvents?.length);
    
    return fourUpcomingEvents || [];
  } catch (error) {
    console.error('Error in get4UpcomingEvents:', error);
    return [];
  }
}

export async function get8UpcomingEvents() {
  const query = groq`*[_type == "calendar"] | order(date desc)[0..7] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const eightUpcomingEvents = await useSanityClient().fetch(query);
  return eightUpcomingEvents;
}

export async function get16UpcomingEvents() {
  const query = groq`*[_type == "calendar"] | order(date desc)[0..15] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const sixteenUpcomingEvents = await useSanityClient().fetch(query);
  return sixteenUpcomingEvents;
}

export async function get16FirstSemesterUpcomingEvents() {
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="1st Semester"]._id && date >= now()] | order(date desc)[0..15] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const sixteenFirstSemesterUpcomingEvents = await useSanityClient().fetch(query);
  return sixteenFirstSemesterUpcomingEvents;
}

export async function get16SecondSemesterUpcomingEvents() {
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="2nd Semester"]._id && date >= now()] | order(date desc)[0..15] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const sixteenSecondSemesterUpcomingEvents = await useSanityClient().fetch(query);
  return sixteenSecondSemesterUpcomingEvents;
}

export async function get16SummerUpcomingEvents() {
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="Summer"]._id && date >= now()] | order(date desc)[0..15] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const sixteenSummerUpcomingEvents = await useSanityClient().fetch(query);
  return sixteenSummerUpcomingEvents;
}

export async function get16SecondSummerUpcomingEvents() {
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="Second Summer"]._id && date >= now()] | order(date desc)[0..15] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const sixteenSecondSummerUpcomingEvents = await useSanityClient().fetch(query);
  return sixteenSecondSummerUpcomingEvents;
}

export async function get6FirstSemesterUpcomingEvents() {
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="1st Semester"]._id && date >= now()] | order(date desc)[0..15] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const sixFirstSemesterUpcomingEvents = await useSanityClient().fetch(query);
  return sixFirstSemesterUpcomingEvents;
}

export async function get6SecondSemesterUpcomingEvents() {
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="2nd Semester"]._id && date >= now()] | order(date desc)[0..15] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const sixSecondSemesterUpcomingEvents = await useSanityClient().fetch(query);
  return sixSecondSemesterUpcomingEvents;
}

export async function get6SummerUpcomingEvents() {
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="Summer"]._id && date >= now()] | order(date desc)[0..15] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const sixSummerUpcomingEvents = await useSanityClient().fetch(query);
  return sixSummerUpcomingEvents;
}

export async function get6SecondSummerUpcomingEvents() {
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="Second Summer"]._id && date >= now()] | order(date desc)[0..15] {
    title,
    date,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    semester->{semester},
    holiday->{holiday},
  }`;

  const sixSecondSummerUpcomingEvents = await useSanityClient().fetch(query);
  return sixSecondSummerUpcomingEvents;
}

//Gazette
export async function getLatestGazette() {
  const query = groq`*[_type == "gazette"] | order(publishedAt desc)[0] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
    gazetteQuarter->{gazetteQuarter},
  }`;

  const latestGazette = await useSanityClient().fetch(query);
  return latestGazette;
}

export async function getAllGazette() {
  const query = groq`*[_type == "gazette"] | order(publishedAt desc) {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
    gazetteQuarter->{gazetteQuarter},
  }`;

  const allGazette = await useSanityClient().fetch(query);
  return allGazette;
}

//Sulimbang
export async function getallSulimbang() {
  const query = groq`*[_type == "sulimbang"] | order(publishedAt desc) {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url}, 
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
    sulimbangQuarter->{sulimbangQuarter},
  }`;

  const allsulimbang = await useSanityClient().fetch(query);
  return allsulimbang;
}


export async function getLatestSulimbang() {
 const query = groq`*[_type == "sulimbang"] | order(publishedAt desc)[0] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
  }`;

  const latestsulimbang = await useSanityClient().fetch(query);
  return latestsulimbang;
}



export async function sulimbanglatestshown() {
 const query = groq`*[_type == "sulimbang"] | order(publishedAt desc)[0..2] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
  }`;

  const newsulimbang = await useSanityClient().fetch(query);
  return newsulimbang;
}


export async function getYearSulimbang() {
  const query = groq`*[_type == "sulimbang"] | order(publishedAt desc) {
    publishedAt,
  }`;

}







export async function get3LatestGazette() {
  const query = groq`*[_type == "gazette"] | order(publishedAt desc)[0..2] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
    gazetteQuarter->{gazetteQuarter},
  }`;

  const threeLatestGazette = await useSanityClient().fetch(query);
  return threeLatestGazette;
}

export async function get1_3LatestGazette() {
  const query = groq`*[_type == "gazette"] | order(publishedAt desc)[1..3] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url}, 
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
    gazetteQuarter->{gazetteQuarter},
  }`;

  const one_threeLatestGazette = await useSanityClient().fetch(query);
  return one_threeLatestGazette;
}

export async function getYearGazette() {
  const query = groq`*[_type == "gazette"] | order(publishedAt desc) {
    publishedAt,
  }`;

  const yearGazette = await client.fetch(query);
  return yearGazette;
}

export async function getGazette(year) {
  const query = groq`*[_type == "gazette" && publishedAt match "${year}"] | order(publishedAt desc) {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url}, 
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
    gazetteQuarter->{gazetteQuarter},
  }`;

  const gazette = await client.fetch(query);
  return gazette;
}


export async function getLatestAnnualReport() {
  const query = groq`*[_type == "annualReport"] | order(publishedAt desc)[0] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
  }`;

  const latestAnnualReport = await useSanityClient().fetch(query);
  return latestAnnualReport;
}

export async function get3LatestAnnualReport() {
  const query = groq`*[_type == "annualReport"] | order(publishedAt desc)[0..2] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
  }`;

  const threeLatestAnnualReport = await useSanityClient().fetch(query);
  return threeLatestAnnualReport;
}

export async function get1_3LatestAnnualReport() {
  const query = groq`*[_type == "annualReport"] | order(publishedAt desc)[1..3] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
  }`;

  const one_threeLatestAnnualReport = await useSanityClient().fetch(query);
  return one_threeLatestAnnualReport;
}

export async function get1_4LatestAnnualReport() {
  const query = groq`*[_type == "annualReport"] | order(publishedAt desc)[1..4] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
  }`;

  const one_fourLatestAnnualReport = await useSanityClient().fetch(query);
  return one_fourLatestAnnualReport;
}

export async function get1_6LatestAnnualReport() {
  const query = groq`*[_type == "annualReport"] | order(publishedAt desc)[1..6] {
    title,
    body[]{
      children[]{
        text
      },
      asset->{url},
    },
    mainImage{
      asset->,
    },
    file{asset->{url}},
    publishedAt,
  }`;

  const one_sixLatestAnnualReport = await useSanityClient().fetch(query);
  return one_sixLatestAnnualReport;
}


export async function getFacultyAndStaff(college) {
  const query = groq`*[_type == "facultyAndStaff" && college._ref in *[_type=="college" && college=="${college}"]._id] | order(name asc) {
    name,
    teachingLevel,
    advisory,
    educations[]->{title}, // Fetch nested fields if educations is an array of objects
    yearStarted,
    image{
      asset->,
    },
    college->{college},
    researchLink,

  }`;

  const gazette = await client.fetch(query);
  return gazette;
}

export async function getBidding() {
  const query = groq`*[_type == "bidding"] | order(dateOfPublication desc, title desc){
    title,
    file{asset->{url}},
    price,
    email,
    contactPerson,
    number,
    dateOfPublication,
  }`;

  const articles = await useSanityClient().fetch(query);
  return articles;
}


export const getBanner = async () => {
  const query = `*[_type == "banner"] | order(title desc) {
    title,
    link, // Add this line to include the link field
    mainImage {
      asset->
    }
  }`;
  const data = await client.fetch(query);
  return data;
};


// api/api.js
export async function getRelatedArticles(currentArticleId, subjectId, limit = 3) {
  // Ensure required parameters are provided
  if (!currentArticleId || !subjectId) {
    console.error('Missing required parameters for getRelatedArticles');
    return [];
  }

  const query = `
    *[_type == "article" && 
     _id != $currentArticleId && 
     references($subjectId)] | 
    order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      body,
      "articleSubject": articleSubject->subject
    }
  `;
  
  const params = { 
    currentArticleId, 
    subjectId, 
    limit 
  };
  
  return await client.fetch(query, params);
}

export async function getCommencementPhotos(name, birthDate) {
  const query = groq`*[_type == "commencement"] {
    _id,
    graduate->,
    mainImage{
      asset->{
        url
      }
    },
    birthDate
  }`;

  try {
    console.log('Fetching all commencement photos from Sanity...');
    // Try using the direct client first
    const photos = await client.fetch(query);
    console.log('All photos from Sanity:', photos);
    console.log('Number of photos found:', photos ? photos.length : 0);
    
    if (!photos || photos.length === 0) {
      console.log('No photos found in Sanity');
      return [];
    }

    // Helper to normalize names: handle symbols, lowercase, trim, collapse spaces
    const normalizeName = (str) => {
      if (!str) return '';
      return str
        .toLowerCase()
        // Replace common symbols with spaces, but preserve them for matching
        .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    };

    // Helper to extract name parts for flexible matching
    const extractNameParts = (name) => {
      if (!name) return [];
      
      // First normalize the name
      const normalized = normalizeName(name);
      
      // Split by spaces and filter out empty parts
      const parts = normalized.split(' ').filter(part => part.length > 0);
      
      // Identify different types of name parts
      const nameParts = {
        familyName: '',
        givenName: '',
        middleName: '',
        initials: [],
        allParts: parts
      };
      
      if (parts.length >= 1) {
        // Last part is typically family name
        nameParts.familyName = parts[parts.length - 1];
      }
      
      if (parts.length >= 2) {
        // First part is typically given name
        nameParts.givenName = parts[0];
        
        // Middle parts (if any)
        if (parts.length > 2) {
          nameParts.middleName = parts.slice(1, -1).join(' ');
        }
      }
      
      // Extract initials (single letters)
      nameParts.initials = parts.filter(part => part.length === 1);
      
      return nameParts;
    };

    // Helper to check if names match (more flexible)
    const namesMatch = (searchName, graduateName) => {
      if (!searchName || !graduateName) return false;
      
      // Extract name parts for both search and graduate names
      const searchParts = extractNameParts(searchName);
      const graduateParts = extractNameParts(graduateName);
      
      // If search has only one word, check if it appears anywhere in graduate name
      if (searchParts.allParts.length === 1) {
        const searchWord = searchParts.allParts[0];
        return graduateParts.allParts.some(word => 
          word.includes(searchWord) || searchWord.includes(word)
        );
      }
      
      // Handle different name formats with enhanced matching
      if (searchParts.allParts.length > 1) {
        // Check for exact word matches (case insensitive)
        const exactMatches = searchParts.allParts.filter(searchWord => 
          graduateParts.allParts.some(graduateWord => graduateWord === searchWord)
        );
        
        // Check for partial matches (one word contains another)
        const partialMatches = searchParts.allParts.filter(searchWord => 
          graduateParts.allParts.some(graduateWord => 
            graduateWord.includes(searchWord) || searchWord.includes(graduateWord)
          )
        );
        
        // Check for initial matches (single letters)
        const initialMatches = searchParts.allParts.filter(searchWord => 
          searchWord.length === 1 && graduateParts.allParts.some(graduateWord => 
            graduateWord.startsWith(searchWord)
          )
        );
        
        // Enhanced name format matching with family name priority
        const checkNameOrderPatterns = () => {
          // Pattern 1: "FamilyName, GivenName" vs "GivenName FamilyName"
          if (searchParts.familyName && graduateParts.familyName) {
            const familyMatch = searchParts.familyName === graduateParts.familyName ||
                              graduateParts.familyName.includes(searchParts.familyName) ||
                              searchParts.familyName.includes(graduateParts.familyName);
            
            if (familyMatch && searchParts.givenName && graduateParts.givenName) {
              const givenMatch = searchParts.givenName === graduateParts.givenName ||
                               graduateParts.givenName.includes(searchParts.givenName) ||
                               searchParts.givenName.includes(graduateParts.givenName);
              if (givenMatch) return true;
            }
            
            // If only family name matches and search has no given name, still match
            if (familyMatch && !searchParts.givenName) return true;
          }
          
          // Pattern 2: "GivenName FamilyName" vs "FamilyName GivenName" (reversed order)
          if (searchParts.allParts.length === 2 && graduateParts.allParts.length === 2) {
            const searchReversed = [searchParts.allParts[1], searchParts.allParts[0]];
            const matchesReversed = searchReversed.every((word, index) => 
              graduateParts.allParts[index] === word || 
              graduateParts.allParts[index].includes(word) || 
              word.includes(graduateParts.allParts[index])
            );
            if (matchesReversed) return true;
          }
          
          // Pattern 3: Initial matching (e.g., "J Smith" vs "John Smith")
          if (searchParts.initials.length > 0 && searchParts.familyName) {
            const initialMatch = searchParts.initials.some(initial => 
              graduateParts.givenName && graduateParts.givenName.startsWith(initial)
            );
            
            if (initialMatch) {
              const familyMatch = graduateParts.allParts.some(word => 
                word === searchParts.familyName || 
                word.includes(searchParts.familyName) || 
                searchParts.familyName.includes(word)
              );
              if (familyMatch) return true;
            }
          }
          
          // Pattern 4: "FamilyName, GivenName Initial" vs "GivenName Initial FamilyName"
          if (searchParts.familyName && searchParts.givenName && searchParts.initials.length > 0) {
            const familyMatch = searchParts.familyName === graduateParts.familyName ||
                              graduateParts.familyName.includes(searchParts.familyName) ||
                              searchParts.familyName.includes(graduateParts.familyName);
            
            if (familyMatch) {
              const givenMatch = searchParts.givenName === graduateParts.givenName ||
                               graduateParts.givenName.includes(searchParts.givenName) ||
                               searchParts.givenName.includes(graduateParts.givenName);
              
              const initialMatch = searchParts.initials.some(initial => 
                graduateParts.allParts.some(word => word.startsWith(initial))
              );
              
              if (givenMatch || initialMatch) return true;
            }
          }
          
          // Pattern 5: Complete name with middle name/initial
          if (searchParts.allParts.length >= 3 && graduateParts.allParts.length >= 3) {
            // Check if family names match
            const familyMatch = searchParts.familyName === graduateParts.familyName ||
                              graduateParts.familyName.includes(searchParts.familyName) ||
                              searchParts.familyName.includes(graduateParts.familyName);
            
            if (familyMatch) {
              // Check if given names match
              const givenMatch = searchParts.givenName === graduateParts.givenName ||
                               graduateParts.givenName.includes(searchParts.givenName) ||
                               searchParts.givenName.includes(graduateParts.givenName);
              
              // Check if middle parts match (initials or full names)
              const middleMatch = searchParts.middleName === graduateParts.middleName ||
                                graduateParts.middleName.includes(searchParts.middleName) ||
                                searchParts.middleName.includes(graduateParts.middleName);
              
              if (givenMatch && middleMatch) return true;
            }
          }
          
          return false;
        };
        
        // Check name order patterns
        if (checkNameOrderPatterns()) {
          return true;
        }
        
        // Combine all types of matches
        const allMatches = [...new Set([...exactMatches, ...partialMatches, ...initialMatches])];
        
        // If we have multiple search words, require at least 2 matches
        if (searchParts.allParts.length >= 2) {
          return allMatches.length >= Math.min(2, searchParts.allParts.length);
        }
        
        // For single word searches, any match is good
        return allMatches.length > 0;
      }
      
      // Fallback to simple includes check
      const normalizedSearch = normalizeName(searchName);
      const normalizedGraduate = normalizeName(graduateName);
      return normalizedGraduate.includes(normalizedSearch) || normalizedSearch.includes(normalizedGraduate);
    };

    // Helper to check if dates match (more flexible)
    const datesMatch = (searchDate, photoDate) => {
      if (!searchDate || !photoDate) return false;
      
      // If search date is empty, return all photos
      if (searchDate === '') return true;
      
      // Try exact match first
      if (searchDate === photoDate) return true;
      
      // Handle multiple date formats
      const parseDate = (dateStr) => {
        if (!dateStr) return null;
        
        // Check if it's in MM-DD-YYYY format (user input)
        const mmddyyyyMatch = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
        if (mmddyyyyMatch) {
          const [, month, day, year] = mmddyyyyMatch;
          return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
        
        // Check if it's in MM/DD/YY format (user input)
        const mmddyyMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
        if (mmddyyMatch) {
          const [, month, day, year] = mmddyyMatch;
          // Convert 2-digit year to 4-digit year
          const fullYear = parseInt(year) < 50 ? 2000 + parseInt(year) : 1900 + parseInt(year);
          return new Date(fullYear, parseInt(month) - 1, parseInt(day));
        }
        
        // Check if it's in "Month Day, Year" format (Sanity format like "December 2, 2004")
        const monthDayYearMatch = dateStr.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
        if (monthDayYearMatch) {
          const [, monthName, day, year] = monthDayYearMatch;
          const monthNames = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
          ];
          const monthIndex = monthNames.indexOf(monthName.toLowerCase());
          if (monthIndex !== -1) {
            return new Date(parseInt(year), monthIndex, parseInt(day));
          }
        }
        
        // Check if it's in "Month Day Year" format (without comma)
        const monthDayYearNoCommaMatch = dateStr.match(/^([A-Za-z]+)\s+(\d{1,2})\s+(\d{4})$/);
        if (monthDayYearNoCommaMatch) {
          const [, monthName, day, year] = monthDayYearNoCommaMatch;
          const monthNames = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
          ];
          const monthIndex = monthNames.indexOf(monthName.toLowerCase());
          if (monthIndex !== -1) {
            return new Date(parseInt(year), monthIndex, parseInt(day));
          }
        }
        
        // Try other formats
        const dateObj = new Date(dateStr);
        return isNaN(dateObj.getTime()) ? null : dateObj;
      };
      
      const searchDateObj = parseDate(searchDate);
      const photoDateObj = parseDate(photoDate);
      
      // Check if dates are valid and match
      if (searchDateObj && photoDateObj) {
        return searchDateObj.toISOString().split('T')[0] === photoDateObj.toISOString().split('T')[0];
      }
      
      return false;
    };

    // Helper to check for exact name matches (for duplicate detection)
    const exactNameMatch = (searchName, graduateName) => {
      if (!searchName || !graduateName) return false;
      
      // Extract name parts for both search and graduate names
      const searchParts = extractNameParts(searchName);
      const graduateParts = extractNameParts(graduateName);
      
      // For exact matching, we need more strict criteria
      const searchWords = searchParts.allParts;
      const graduateWords = graduateParts.allParts;
      
      // Check if all search words are present in graduate name (in any order)
      const allSearchWordsFound = searchWords.every(searchWord => 
        graduateWords.some(graduateWord => 
          graduateWord === searchWord || 
          (searchWord.length > 1 && graduateWord.includes(searchWord)) ||
          (searchWord.length === 1 && graduateWord.startsWith(searchWord))
        )
      );
      
      // Check if all graduate words are present in search (for exact matches)
      const allGraduateWordsFound = graduateWords.every(graduateWord => 
        searchWords.some(searchWord => 
          searchWord === graduateWord || 
          (graduateWord.length > 1 && searchWord.includes(graduateWord)) ||
          (graduateWord.length === 1 && searchWord.startsWith(graduateWord))
        )
      );
      
      return allSearchWordsFound && allGraduateWordsFound;
    };

    // Filter photos by normalized name and birthDate
    const filteredPhotos = photos.filter(photo => {
      const graduateName = photo.graduate?.name || '';
      const photoBirthDate = photo.birthDate;
      
      const nameMatch = namesMatch(name, graduateName);
      const dateMatch = datesMatch(birthDate, photoBirthDate);
      
      console.log('Comparing photo:', {
        photoId: photo._id,
        searchName: name,
        graduateName: graduateName,
        searchBirthDate: birthDate,
        photoBirthDate: photoBirthDate,
        nameMatch,
        dateMatch
      });
      
      // If no birth date provided, only check name
      if (!birthDate || birthDate === '') {
        return nameMatch;
      }
      
      // If no name provided, only check date
      if (!name || name === '') {
        return dateMatch;
      }
      
      // Both name and date must match
      return nameMatch && dateMatch;
    });

    // Check for potential duplicates
    if (filteredPhotos.length > 1 && name) {
      // Check if there are multiple people with similar names
      const nameGroups = {};
      filteredPhotos.forEach(photo => {
        const graduateName = photo.graduate?.name || '';
        const normalizedName = normalizeName(graduateName);
        if (!nameGroups[normalizedName]) {
          nameGroups[normalizedName] = [];
        }
        nameGroups[normalizedName].push(photo);
      });

      // If we have multiple different people with similar names, require more specific search
      const uniqueNames = Object.keys(nameGroups);
      if (uniqueNames.length > 1) {
        console.log('Multiple people found with similar names:', uniqueNames);
        
        // Check if the search is specific enough (exact match)
        const exactMatches = filteredPhotos.filter(photo => {
          const graduateName = photo.graduate?.name || '';
          return exactNameMatch(name, graduateName);
        });

        if (exactMatches.length > 0) {
          console.log('Found exact matches, returning those only');
          return exactMatches;
        } else {
          console.log('No exact matches found, requiring more specific search');
          // Return empty array to force user to be more specific
          return [];
        }
      }
    }
    
    console.log('Filtered photos:', filteredPhotos);
    console.log('Number of filtered photos:', filteredPhotos.length);
    return filteredPhotos || [];
  } catch (error) {
    console.error('Error fetching commencement photos:', error);
    return [];
  }
}

// Test function to check Sanity connection
export async function testSanityConnection() {
  try {
    const query = groq`*[_type == "commencement"] | order(_createdAt desc)[0]{
      _id,
      _type
    }`;
    
    const result = await client.fetch(query);
    console.log('Sanity connection test result:', result);
    return result;
  } catch (error) {
    console.error('Sanity connection test failed:', error);
    return null;
  }
}

export async function testCalendarData() {
  try {
    const testQuery = groq`*[_type == "calendar"] | order(date desc) {
      _id,
      title,
      date,
      body[]{
        children[]{
          text
        },
        asset->{url},
      },
      semester->{semester},
      holiday->{holiday},
    }`;
    
    console.log('=== TEST: Getting all calendar data ===');
    const allCalendarData = await useSanityClient().fetch(testQuery);
    console.log('All calendar data:', allCalendarData);
    console.log('Total calendar events:', allCalendarData?.length);
    
    if (allCalendarData && allCalendarData.length > 0) {
      console.log('First event:', allCalendarData[0]);
      console.log('First event date:', allCalendarData[0].date);
      console.log('First event date type:', typeof allCalendarData[0].date);
    }
    
    return allCalendarData;
  } catch (error) {
    console.error('Error in testCalendarData:', error);
    return [];
  }
}

// New function to get all calendar events for the complete calendar dropdown
export async function getAllCalendarEvents() {
  try {
    const query = groq`*[_type == "calendar"] | order(date desc) {
      title,
      date,
      body[]{
        children[]{
          text
        },
        asset->{url},
      },
      semester->{semester},
      holiday->{holiday},
    }`;
    
    const allEvents = await useSanityClient().fetch(query);
    console.log('=== DEBUG: getAllCalendarEvents ===');
    console.log('Total events found:', allEvents?.length);
    
    return allEvents || [];
  } catch (error) {
    console.error('Error in getAllCalendarEvents:', error);
    return [];
  }
}

export async function getCOEDPrograms() {
  try {
    const query = groq`*[_type == "program" && department->department == "College of Education"]{ 
      _id,
      title,
      description,
      accreditation,
      file {
        asset->{
          url,
          originalFilename
        }
      },
      department->{department},
      degree->{degree},
      level->{level},
      duration->{duration}
    }`;
    
    const programs = await useSanityClient().fetch(query);
    console.log('=== DEBUG: getCOEDPrograms ===');
    console.log('Total COED programs found:', programs?.length);
    
    return programs || [];
  } catch (error) {
    console.error('Error in getCOEDPrograms:', error);
    return [];
  }
}



export async function getCOLPrograms() {
  try {
    const query = groq`*[_type == "program" && department->department == "College of Law"]{ 
      _id,
      title,
      description,
      accreditation,
      file {
        asset->{
          url,
          originalFilename
        }
      },
      department->{department},
      degree->{degree},
      level->{level},
      duration->{duration}
    }`;
    
    const programs = await useSanityClient().fetch(query);
    console.log('=== DEBUG: getCOLPrograms ===');
    console.log('Total COED programs found:', programs?.length);
    
    return programs || [];
  } catch (error) {
    console.error('Error in getCOLPrograms:', error);
    return [];
  }
}



export async function getIICTPrograms() {
  try {
    const query = groq`*[_type == "program" && department->department == "College of Computer Studies"]{ 
      _id,
      title,
      description,
      accreditation,
      file {
        asset->{
          url,
          originalFilename
        }
      },
      department->{department},
      degree->{degree},
      level->{level},
      duration->{duration}
    }`;
    
    const programs = await useSanityClient().fetch(query);
    console.log('=== DEBUG: getIICTPrograms ===');
    console.log('Total COED programs found:', programs?.length);
    
    return programs || [];
  } catch (error) {
    console.error('Error in getIICTPrograms:', error);
    return [];
  }
}