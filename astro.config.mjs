import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from "astro-sanity";
import netlify from "@astrojs/netlify";  // ✅ Correct import
import { loadEnv } from 'vite';


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
  vite: {
    define: {
      'process.env.GMAIL_USER': JSON.stringify(process.env.GMAIL_USER),
      'process.env.GMAIL_APP_PASSWORD': JSON.stringify(process.env.GMAIL_APP_PASSWORD)
    }
  }
});