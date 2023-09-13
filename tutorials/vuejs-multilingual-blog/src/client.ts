import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { computed, ref, watch } from 'vue'
import i18n from './plugin/i18n'
let httpLink = ref()

const apilink = computed(() =>
  i18n.global.locale.value === 'fr'
    ? import.meta.env.VITE_WEBINY_API_FR
    : import.meta.env.VITE_WEBINY_API_EN
)
const client = new ApolloClient({
  link: httpLink.value,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

watch(
  apilink,
  () => {
    console.log('apilink Value', apilink.value)
    httpLink.value = new HttpLink({
      uri: apilink.value,
      headers: {
        Authorization: 'Bearer ' + import.meta.env.VITE_TOKEN,
        'x-tenant': 'root'
      }
    })

    client.setLink(httpLink.value)

    console.log('currentLang', i18n.global.locale.value)
    client.onClearStore(httpLink.value)
    client.resetStore()
  },
  { immediate: true }
)

export default client
