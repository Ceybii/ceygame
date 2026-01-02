import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ceygame.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/videos/') || page === 'https://ceygame.com/videos/',
      customPages: [
        'https://ceygame.com/',
        'https://ceygame.com/videos/',
        'https://ceygame.com/forum/',
        'https://ceygame.com/about/',
        'https://ceygame.com/contact/',
        'https://ceygame.com/privacy/',
        'https://ceygame.com/terms/'
      ]
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  }
});

