import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import urql from "@urql/vue";
const app = createApp(App);
app.use(urql, {
  url: import.meta.env.VITE_WEBINY_API,
  fetchOptions: () => {
    const token = import.meta.env.VITE_TOKEN;
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});
app.mount("#app");
