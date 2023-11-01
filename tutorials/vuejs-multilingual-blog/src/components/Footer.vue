<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
</script>

<template>
  <footer class="w-full shadow-md bg-white footer">
    <div class="text-center uppercase bg-black py-6 mt-6 text-white">
      Webiny + {{ t('multilingual') }} &copy; 2023
    </div>
  </footer>
</template>
<style>
.footer {
  position: relative;
  bottom: 0;
}
</style>
