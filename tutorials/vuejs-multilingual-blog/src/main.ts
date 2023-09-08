import './assets/main.css'
import router from './routes'
import App from './App.vue'
import i18n from './plugin/i18n'
import { createApp, provide } from 'vue'

import { DefaultApolloClient } from '@vue/apollo-composable'
import client from './client.js'

const app = createApp(App).provide(DefaultApolloClient, client)

app.use(router)
app.use(i18n)
app.mount('#app')
