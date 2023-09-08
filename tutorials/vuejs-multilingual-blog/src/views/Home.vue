<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})
</script>

<template>
  <div class="container mx-auto">
    <img class="w-3/4 mx-auto" src="/steaknoodles.webp" alt="image thumbnail" />
    <h1 class="text-center text-2xl font-bold py-6">{{ t('welcome') }}</h1>
    <div class="text-gray-500 text-center w-3/4 text-[1.2rem] mx-auto py-6">
      <p>{{ t('homeDescription') }}</p>
    </div>
  </div>
</template>
