<!-- ./app.vue -->
<script setup>
// add page meta
useHead({
  titleTemplate: (title) => `${title} - Photo Gallery App`,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [
    {
      name: "description",
      content: "Photo gallery app with Nuxt.js powered by Webiny",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});
</script>
<template>
  <SiteHeader />
  <NuxtPage />
  <Toast />
</template>
