<!-- ./pages/new.vue -->
<script setup>
// add page meta
useHead({
  title: "Add new",
});
</script>
<template>
  <main class="site-main new">
    <div class="wrapper">
      <PhotoForm>
        <template v-slot:header>
          <h1>Create a Photo</h1>
        </template>
      </PhotoForm>
    </div>
  </main>
</template>
