import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from "astro-sanity";
import netlify from "@astrojs/netlify";
import vercel from "@astrojs/vercel";

// Netlify sets `NETLIFY=true` on CI; Vercel sets `VERCEL`. Prefer Netlify when both are set so a
// stray `VERCEL` env on Netlify does not ship the wrong adapter (breaks `/api/*` on Netlify).
const onNetlifyCi = String(process.env.NETLIFY || "").toLowerCase() === "true";
const onVercelCi = String(process.env.VERCEL || "").toLowerCase() === "true";
const adapter = onNetlifyCi ? netlify() : onVercelCi ? vercel() : netlify();

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
    // Pre-bundle heavy client deps so dev server does not hit 504 "Outdated Optimize Dep"
    // after lockfile edits, dependency updates, or interrupted first-run optimize.
    optimizeDeps: {
      include: [
        'framer-motion',
        'react-dom/client',
        'swiper/react',
        'swiper/modules',
        'react-icons/fi',
      ],
    },
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