// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  ssr: false,
  nitro: {
    preset: 'github_pages'
  },
  app: {
    baseURL: '/color-theme-studio/',
    buildAssetsDir: 'assets',
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/color-theme-studio/favicon.svg' }]
    }
  },
  css: ['~/assets/css/main.css', 'highlight.js/styles/github-dark.min.css'],
  vite: {
    assetsInclude: ['**/*.md']
  }
});
