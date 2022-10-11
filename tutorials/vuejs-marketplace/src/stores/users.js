import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const useUserStore = defineStore("user", () => {
  const sellers = reactive([]);
  let allSellers;
  let user = ref({});
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const loadSellers = () => {
    const ALL_SELLER_QUERY = gql`
      query {
        listSelles {
          data {
            id
            name
            username
          }
        }
      }
    `;

    const { loading, result, error } = useQuery(ALL_SELLER_QUERY);
    if (result) {
      allSellers = result;
    }
  };
  const updateSellers = () => {
    sellers.value = allSellers.value.listSelles.data;
  };
  const login = (username) => {
    updateSellers();
    sellers.value.forEach((element) => {
      if (element.username === username.value) {
        let loadedUser = {
          id: element.id,
          name: element.name,
          username: element.username,
        };
        user = loadedUser;
        localStorage.setItem("user", JSON.stringify(user));
      }
    });

    window.location.reload();
  };
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return {
    user,
    login,
    logout,
    loadSellers,
  };
});