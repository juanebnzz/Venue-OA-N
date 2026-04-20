import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://venueoaon.co.za',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      customPages: [
        'https://venueoaon.co.za/',
        'https://venueoaon.co.za/about/',
        'https://venueoaon.co.za/packages/',
        'https://venueoaon.co.za/gallery/',
        'https://venueoaon.co.za/contact/',
      ],
      filter: (page) => !page.includes('privacy-policy') && !page.includes('terms-of-service') && !page.includes('404'),
    }),
  ],
});
