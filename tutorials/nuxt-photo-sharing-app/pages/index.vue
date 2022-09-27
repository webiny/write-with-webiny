<!-- ./pages/index.vue -->

<script setup>
useHead({
  title: "All photos",
});
const { data } = await useFetch("/api/getAllPhotos");
</script>
<template>
  <main class="site-main photos-page">
    <div class="wrapper">
      <section class="gallery-section">
        <div class="wrapper">
          <header>
            <h1 class="text-xl">All photos</h1>
          </header>

          <ul v-if="data && data?.listPhotos?.data" class="gallery">
            <li
              v-for="photo in data.listPhotos.data"
              :key="photo.id"
              class="gallery-item"
            >
              <ImgItem :photo="photo" />
            </li>
          </ul>
          <div v-else class="gallery-error">
            <p>Oops.. No photos to display</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
