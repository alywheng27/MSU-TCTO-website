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
      // Completely disable source maps to hide file structure
      sourcemap: false,
      // Minify code aggressively to make it harder to read
      minify: 'esbuild',
      // Increase compression
      cssMinify: true,
      rollupOptions: {
        output: {
          // Don't include source maps at all
          sourcemap: false,
          // Obfuscate file names in output
          entryFileNames: 'assets/[hash].js',
          chunkFileNames: 'assets/[hash].js',
          assetFileNames: 'assets/[hash].[ext]'
        }
      }
    },
    // Disable source maps in dev server too
    server: {
      sourcemapIgnoreList: (sourcePath) => {
        // Hide all API routes from source maps
        return sourcePath.includes('/api/') || 
               sourcePath.includes('\\api\\') ||
               sourcePath.includes('pages/api');
      }
    }
  }
});