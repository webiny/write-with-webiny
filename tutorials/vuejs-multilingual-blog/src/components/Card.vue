<script setup>
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { useI18n } from 'vue-i18n'
import { computed, ref, watch, watchEffect } from 'vue'
import i18n from '../plugin/i18n'
import moment from 'moment'
const { t, locale } = useI18n()

const LISTARTICLES_QUERY = computed(() =>
  locale.value === 'en'
    ? gql`
        query {
          listArticlePosts {
            data {
              id
              title
              image
              excerpt
              createdOn
              slug
            }
          }
        }
      `
    : gql`
        query {
          listMesArticles {
            data {
              id
              title
              image
              excerpt
              createdOn
              slug
            }
          }
        }
      `
)

const { result, loading, error, query } = useQuery(LISTARTICLES_QUERY.value)

function toggleLocale() {
  locale.value = i18n.global.locale.value === 'en' ? 'fr' : 'en'

  query.value.options.query = LISTARTICLES_QUERY.value

  console.log(query.value.options.query)
}
watch(error, (newvalue) => {
  console.log('error loading', error.value)
  console.log('locale value', locale.value)
})

let post = computed(() => {
  return locale.value === 'en'
    ? result.value?.listArticlePosts.data ?? []
    : result.value?.listMesArticles.data ?? []
})
</script>

<template>
  <div class="mt-8 flex justify-center">
    <button
      @click="toggleLocale"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase locale"
    >
      {{ locale }}
    </button>
  </div>

  <div v-if="loading" class="text-center text-gray-500">
    {{ t('loading') }}
  </div>
  <div v-else-if="error" class="text-center text-red-500">
    {{ t('error') }}
  </div>
  <div v-else class="grid grid-cols-3 gap-6 py-5">
    <template v-if="result?.listArticlePosts">
      <router-link
        :to="{ path: '/post/' + `${post.id}` }"
        v-for="post in result.listArticlePosts.data"
        :key="post.id"
      >
        <div class="rounded overflow-hidden shadow-lg hover:opacity-30 hover:transition-all">
          <img class="w-full" v-bind:src="post.image" alt="image thumbnail" />

          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 uppercase">{{ post.title }}</div>
            <p class="text-gray-700 text-base">
              {{ post.excerpt }}
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{
              moment(post.createdOn).format('DD/ MM /Y')
            }}</span>
          </div>
        </div>
      </router-link>
    </template>

    <template v-else-if="result?.listMesArticles">
      <router-link
        :to="{ path: '/post/' + `${post.slug}` }"
        v-for="post in result.listMesArticles.data"
        :key="post.id"
      >
        <div class="rounded overflow-hidden shadow-lg hover:opacity-30 hover:transition-all">
          <img class="w-full" v-bind:src="post.image" alt="image thumbnail" />

          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 uppercase">{{ post.title }}</div>
            <p class="text-gray-700 text-base">
              {{ post.excerpt }}
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{
              moment(post.createdOn).format('Do MMMM Y')
            }}</span>
          </div>
        </div>
      </router-link>
    </template>
  </div>
</template>
