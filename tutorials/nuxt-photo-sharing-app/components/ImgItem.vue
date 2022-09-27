<!-- ./components/ImgItem.vue -->

<script setup>
const { photo, full } = defineProps(["photo", "full"]);
console.log({ photo, full });
// encode ID in order to include # in URL
const linkID = encodeURIComponent(photo.id);
</script>
<template>
  <!-- template for full page view -->
  <article class="photo full" v-if="full">
    <header class="author-details">
      <h3 class="text-lg">{{ photo.author.name }}</h3>
      <p>@{{ photo.author.username }}</p>
    </header>
    <figure>
      <div class="img-cont">
        <img :src="photo.photo" alt="image" />
        <div class="backdrop group-hover:opacity-100"></div>
      </div>
      <figcaption class="photo-caption">
        <p>{{ photo.caption }}</p>
      </figcaption>
    </figure>
  </article>

  <!-- template for gallery preview -->
  <figure class="photo group" v-else>
    <NuxtLink :to="`/photo/${linkID}`">
      <div class="img-cont">
        <img :src="photo.photo" alt="image" />
        <div class="backdrop group-hover:opacity-100"></div>
      </div>
      <figcaption class="details">
        <div class="author-details group-hover:opacity-100">
          <h3 class="text-lg">{{ photo.author.name }}</h3>
          <p>@{{ photo.author.username }}</p>
        </div>
        <p class="caption">
          {{ photo.caption }}
        </p>
      </figcaption>
    </NuxtLink>
  </figure>
</template>
