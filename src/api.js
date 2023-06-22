import { useSanityClient, groq } from 'astro-sanity';

export async function getHero() {
  const query = groq`*[_type == "hero"]{
    title,
    "imageUrl": mainImage.asset->url,
    mainImage{
      asset->
    },
  }`;

  const posts = await useSanityClient().fetch(query);
  return posts;
}