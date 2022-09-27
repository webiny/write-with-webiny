// ./nuxt.config.ts

import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  css: [
    '@/assets/css/main.css',
  ],

  // https://v3.nuxtjs.org/guide/features/runtime-config#exposing-runtime-config
  // Expose runtime config to the rest of the app
  runtimeConfig: {
    mainToken: process.env.WEBINY_MANAGE_TOKEN,
    mainAPIURL: "https://dfroq05ygtypu.cloudfront.net/graphql",
    manageAPIURL: "https://dfroq05ygtypu.cloudfront.net/cms/manage/en-US",
    public: {
      readToken: process.env.WEBINY_VIEW_TOKEN,
      readAPIURL: "https://dfroq05ygtypu.cloudfront.net/cms/read/en-US"
    }
  }
})
