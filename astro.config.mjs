import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://costaxanthos.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
