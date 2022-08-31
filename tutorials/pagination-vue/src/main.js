import App from './App.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_WEBINY_GRAPHQL_URL,
  cache,
  headers: {
    Authorization : `Bearer ${process.env.VUE_APP_WEBINY_GRAPHQL_TOKEN}`
  }
})

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})
app.mount('#app')