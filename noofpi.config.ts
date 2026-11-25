import { defineNoofpiConfig } from 'noofpi';
import { noofpiUi } from 'noofpi-ui/vite';

export default defineNoofpiConfig({
  ssr: false,
  tailwind: true,
  css: ['app/assets/css/main.css'],
  head: {
    title: 'Color Theme Studio',
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/color-theme-studio/favicon.svg' }]
  },
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weight: '100 900',
        subsets: ['latin'],
        alias: 'sans'
      }
    ]
  },
  build: { preset: 'github-pages' },
  // The static preset needs a non-local fetch mode even though the app calls no API
  doofpi: { fetch: 'dfetch', url: 'https://liorcodev.github.io/color-theme-studio' },
  vite: {
    base: '/color-theme-studio/',
    plugins: [noofpiUi()]
  }
});
