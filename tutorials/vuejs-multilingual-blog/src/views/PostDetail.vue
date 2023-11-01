<script setup>
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import moment from 'moment'
import gql from 'graphql-tag'
import i18n from '../plugin/i18n'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const ONE_ARTICLE_QUERY = computed(() =>
  locale.value === 'en'
    ? gql`
        query getSinglePost($slug: String) {
          getArticlePost(where: { slug: $slug }) {
            data {
              id
              image
              title
              createdOn
              slug
              articleContent
            }
          }
        }
      `
    : gql`
        query getSinglePost($slug: String) {
          getMonArticle(where: { slug: $slug }) {
            data {
              id
              image
              title
              createdOn
              slug
              articleContent
            }
          }
        }
      `
)

const { result, loading, error, query } = useQuery(ONE_ARTICLE_QUERY.value)

function toggleLocale() {
  locale.value = i18n.global.locale.value === 'en' ? 'fr' : 'en'
  query.value.options.query = ONE_ARTICLE_QUERY.value
  console.log(query.value.options.query)
}

let post = computed(() => {
  return locale.value === 'en'
    ? result.value?.getArticlePost?.data ?? []
    : result.value?.getMonArticle?.data ?? []
})
</script>

<template>
  <div class="mt-8 flex justify-center">
    <button
      @click="toggleLocale"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded locale uppercase"
    >
      {{ locale }}
    </button>
  </div>

  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto py-8">
      <div v-if="loading" class="text-center text-gray-500">
        {{ t('loading') }}
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        {{ t('error') }}
      </div>
      <div v-else class="">
        <template v-if="post.id" :key="post.id">
          <img class="w-3/4 mx-auto" v-bind:src="post.image" alt="image thumbnail" />
          <div>
            <div class="flex justify-center">
              <div>
                <h1 class="uppercase w-3/4 mx-auto text-gray-400 text-[2rem] mt-6 text-center">
                  {{ post.title }}
                </h1>
                <p class="text-gray-300 my-6 text-center py-6">
                  {{ moment(post.createdOn).format('DD/ MM /Y') }}
                </p>
              </div>
            </div>

            <div class="flex justify-center">
              <div class="max-w-4xl">
                <div class="text-[1.2rem] text-gray-500">{{ post.articleContent }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
