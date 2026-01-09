import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from "astro-sanity";
import netlify from "@astrojs/netlify";
import vercel from "@astrojs/vercel";
import { loadEnv } from 'vite';

// Determine adapter based on environment variable or default to Netlify
const adapter = process.env.VERCEL ? vercel() : netlify();

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
  adapter: adapter,
  vite: {
    build: {
      // Disable source maps in production to hide file structure completely
      sourcemap: process.env.NODE_ENV === 'production' ? false : 'hidden',
      // Minify code to make it harder to read and reverse engineer
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // Exclude source content from source maps (only line mappings)
          sourcemapExcludeSources: true,
          // Obfuscate API paths in source maps when they do appear
          sourcemapPathTransform: (relativeSourcePath) => {
            // Hide API folder structure - replace with generic obfuscated path
            if (relativeSourcePath && (relativeSourcePath.includes('/api/') || relativeSourcePath.includes('\\api\\'))) {
              // Return obfuscated path instead of actual API path
              const fileName = relativeSourcePath.split('/').pop() || relativeSourcePath.split('\\').pop();
              return `internal://[hidden]/${fileName}`;
            }
            return relativeSourcePath;
          }
        }
      }
    }
  }
});