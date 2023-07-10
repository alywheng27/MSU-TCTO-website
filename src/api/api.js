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
      }
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    publishedAt,
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
      }
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    publishedAt,
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
      }
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    publishedAt,
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
      }
    },
    mainImage{
      asset->,
      crop,
      hotspot,
    },
    college->{college},
    articleSubject->{subject},
    topic->{topic},
    publishedAt,
    _createdAt,
  }`;

  const fourLatestArticles= await useSanityClient().fetch(query);
  return fourLatestArticles;
}