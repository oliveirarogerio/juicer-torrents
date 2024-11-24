export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  compatibilityDate: "2024-11-24",

  nitro: {
    devProxy: {
      "/api/": {
        target: "https://thepirateapi.fly.dev/",
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap",
        },
      ],
    },
  },
});
