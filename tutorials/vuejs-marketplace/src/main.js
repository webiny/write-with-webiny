import { createApp } from "vue";
import "./index.css";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createPinia } from "pinia";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import App from "./App.vue";
import router from "./router/index.js";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_CMSAPI,
  headers: {
    Authorization: "Bearer " + import.meta.env.VITE_TOKEN,
  },
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(router)
  .use(createPinia())
  .mount("#app");
