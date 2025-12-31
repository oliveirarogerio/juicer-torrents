export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  compatibilityDate: "2024-11-24",

  runtimeConfig: {
    public: {
      pirateApiUrl: process.env.PIRATE_API_URL || 'https://thepirateapi.fly.dev/',
      siteUrl: process.env.SITE_URL || 'https://bigjuicer-torrents.com',
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap",
        },
        {
          rel: "canonical",
          href: process.env.SITE_URL || 'https://bigjuicer-torrents.com',
        },
      ],
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
          name: 'googlebot',
          content: 'index, follow',
        },
        {
          name: 'language',
          content: 'Portuguese',
        },
        {
          name: 'revisit-after',
          content: '7 days',
        },
      ],
    },
  },
});
