<script setup>
import i18n from '../plugin/i18n'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
function toggleLocale() {
  locale.value = i18n.global.locale.value === 'en' ? 'fr' : 'en'
}
</script>
<template>
  <div class="mt-8 flex justify-center">
    <button
      @click="toggleLocale"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded locale uppercase text-[0.9rem]"
    >
      {{ locale }}
    </button>
  </div>
</template>

<style>
.locale {
  position: absolute;
  right: 15.3%;
  top: 8%;
}
</style>
