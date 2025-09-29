import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from "astro-sanity";
<<<<<<< HEAD
import netlify from "@astrojs/netlify";
=======
import netlify from "@astrojs/netlify";  // ✅ Correct import

>>>>>>> upstream/master

// https://astro.build/config
export default defineConfig({
  site: 'https://msutcto.edu.ph',
  integrations: [react(), tailwind(), sanity({
    projectId: 'w8lfrsa6',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true
  })],
  output: "server",
  adapter: netlify(),
});