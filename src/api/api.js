import { useSanityClient, groq } from 'astro-sanity';
import { createImageBuilder } from 'astro-sanity';

export const imageBuilder = createImageBuilder(useSanityClient());

export function urlForImage(source) {
  return imageBuilder.image(source);
}

export async function getArticle() {
  const query = groq`*[_type == "article"]{
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
  const query = groq`*[_type == "article"] | order(_createdAt desc)[0]{
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
  const query = groq`*[_type == "article"] | order(_createdAt asc)[0]{
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
  const query = groq`*[_type == "article"] | order(_createdAt desc)[1..4]{
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
  const query = groq`*[_type == "article"] | order(_createdAt desc)[0..2]{
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

export async function get3LatestNews() {
  const query = groq`*[_type == "article" && category._ref in *[_type=="articleCategory" && category=="News"]._id] | order(_createdAt desc)[0..2]{
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
  const query = groq`*[_type == "article" && featured == true] | order(_createdAt asc)[0] {
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

export async function get3LatestGazette() {
  const query = groq`*[_type == "gazette"] | order(_createdAt desc)[0..2] {
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
  }`;

  const threeLatestGazette = await useSanityClient().fetch(query);
  return threeLatestGazette;
}

export async function get3LatestAnnualReport() {
  const query = groq`*[_type == "annualReport"] | order(_createdAt desc)[0..2] {
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
  }`;

  const threeLatestAnnualReport = await useSanityClient().fetch(query);
  return threeLatestAnnualReport;
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