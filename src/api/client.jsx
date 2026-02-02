import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'w8lfrsa6', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name
  apiVersion: '2021-03-25', // Use the latest API version
  useCdn: true, // Enable CDN for faster responses
});

export { client };