<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'
import i18n from '@/plugin/i18n'
import LangSelector from './LangSelector.vue'

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local'
})

watchEffect(() => {
  console.log('header currentLanguage 2', i18n.global.locale.value)
})
</script>

<template>
  <header class="w-full p-6 bg-white">
    <nav>
      <ul class="text-center uppercase mb-4">
        <li>
          <router-link to="/"
            ><h1 class="text-3xl text-gray-500 font-bold">My Noodles Blog</h1></router-link
          >
        </li>
      </ul>
      <ul class="flex justify-center text-lg">
        <li class="hover:text-blue-500 cursor-pointer px-4 te uppercase text-gray-300">
          <router-link to="/">{{ t('home') }}</router-link>
        </li>
        <li class="hover:text-blue-500 cursor-pointer px-4 uppercase text-gray-300">
          <router-link to="/blog">{{ t('blog') }}</router-link>
        </li>
        <li><LangSelector /></li>
      </ul>
    </nav>
  </header>
</template>
