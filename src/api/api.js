import { useSanityClient, groq } from 'astro-sanity';
import { createImageBuilder } from 'astro-sanity';
import sanityClient from "@sanity/client"
const client = sanityClient ({
  projectId: "w8lfrsa6",
  dataset: "production",
  useCdn: true
});

export const imageBuilder = createImageBuilder(useSanityClient());


export function urlForImage(source) {
  return imageBuilder.image(source);
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

export async function getSearchArticle(search, category) {
  let hold = "";
  if(category != null) {
    hold = ` && category._ref in *[_type=="articleCategory" && category=="${category}"]._id`;
  }
  const query = groq`*[_type == "article" && title match "*${search}*"${hold}] | order(publishedAt desc)[0..10]{
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
  const query = groq`*[_type == "article" && featured == true] | order(publishedAt desc)[0] {
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
  const query = groq`*[_type == "calendar" && date >= now()] | order(date asc)[0..2] {
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
  const query = groq`*[_type == "calendar" && date >= now()] | order(date asc)[0..3] {
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
  return fourUpcomingEvents;
}

export async function get8UpcomingEvents() {
  const query = groq`*[_type == "calendar" && date >= now()] | order(date asc)[0..7] {
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
  const query = groq`*[_type == "calendar" && date >= now()] | order(date asc)[0..15] {
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
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="1st Semester"]._id && date >= now()] | order(date asc)[0..15] {
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
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="2nd Semester"]._id && date >= now()] | order(date asc)[0..15] {
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
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="Summer"]._id && date >= now()] | order(date asc)[0..15] {
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
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="Second Summer"]._id && date >= now()] | order(date asc)[0..15] {
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
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="1st Semester"]._id && date >= now()] | order(date asc)[0..15] {
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
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="2nd Semester"]._id && date >= now()] | order(date asc)[0..15] {
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
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="Summer"]._id && date >= now()] | order(date asc)[0..15] {
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
  const query = groq`*[_type == "calendar" && semester._ref in *[_type=="semester" && semester=="Second Summer"]._id && date >= now()] | order(date asc)[0..15] {
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
    yearStarted,
    image{
      asset->,
    },
    college->{college},
  }`;

  const gazette = await client.fetch(query);
  return gazette;
}

export async function getBidding() {
  const query = groq`*[_type == "bidding"] | order(dateOfPublication desc, title desc){
    title,
    file{asset->{url}},
    dateOfPublication,
  }`;

  const articles = await useSanityClient().fetch(query);
  return articles;
}