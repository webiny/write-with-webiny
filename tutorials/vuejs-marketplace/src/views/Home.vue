<template>
  <div
    v-if="!store.user.username"
    class="p-4 m-4 mx-auto w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md"
  >
    <form class="space-y-6" @submit.prevent="handleLogin()">
      <h5 class="text-xl font-medium text-gray-900">Markt Login</h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-300"
          >Username</label
        >
        <input
          type="text"
          v-model="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter username"
          required
        />
      </div>
      <div class="flex items-start">
        <button
          type="submit"
          class="w-full rounded-md p-2 text-white bg-blue-400 hover:bg-blue-500"
        >
          <span class="material-icons">login</span>
        </button>
      </div>
    </form>

    <p class="text-sm my-2">For testing purposes type - webinyuser</p>
  </div>

  <div v-else>
    <div
      class="m-2 mx-auto w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-m"
    >
      <div class="flex flex-col items-center pb-10">
        <span class="material-icons text-gray-900 text-5xl">person</span>
        <h5 class="mb-1 text-xl font-medium text-gray-900">
          {{ store.user.name }}
        </h5>
        <span class="text-sm text-gray-500">{{ store.user.username }}</span>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <button
            @click="handleLogout"
            class="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
    <div
      v-for="item in cartStore.purchases"
      :key="item.id"
      class="p-2 shadow-md border-black border-2 m-2"
    >
      <div v-if="item.currentUser.username === store.user.username">
        <div class="flex justify-between">
          <div>
            <span class="material-icons text-5xl">{{ item.category }}</span>
            <h2 class="font-bold">{{ item.title }}</h2>
          </div>
          <a
            :href="item.productLink"
            target="_blank"
            rel="noopener noreferrer"
            >{{ item.productLink }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useCartStore } from "../stores/cart";
import { useUserStore } from "../stores/users";
const store = useUserStore();
const cartStore = useCartStore();
const username = ref("");
const handleLogin = () => {
  store.login(username);
  username.value = "";
};
const handleLogout = () => {
  store.logout();
  router.push("/");
};
</script>
