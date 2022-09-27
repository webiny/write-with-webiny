<!-- ./pages/photo/[id].vue -->

<script setup>
let {
  params: { id },
} = useRoute();

// encode ID again in order to include # in URL
id = encodeURIComponent(id);
console.log("encoded", { id });

const { data: photo } = await useAsyncData(id, () => {
  return $fetch(`/api/getPhotoById?id=${id}`);
});

console.log({ photo });

useHead({
  title: photo?.value?.getPhoto?.data?.caption,
});
</script>
<template>
  <main class="site-main">
    <div class="wrapper">
      <section class="site-section">
        <div v-if="photo?.getPhoto" class="wrapper">
          <ImgItem :photo="photo?.getPhoto?.data" :full="true" />
        </div>
        <div v-else class="wrapper">
          <div class="gallery-error">
            <p>Oops.. It seems an error occured</p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
