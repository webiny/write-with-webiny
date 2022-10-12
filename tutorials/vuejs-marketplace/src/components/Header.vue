<template>
  <header class="bg-black p-2 flex flex-wrap justify-between">
    <h1 class="font-bold text-3xl text-white">{} Markt</h1>

    <ul class="flex font-bold">
      <router-link
        to="/"
        class="p-2 text-blue-400 uppercase hover:text-white"
        active-class="text-white"
      >
        {{ userStore.user.username ? "Profile" : "Home" }}</router-link
      >
      <router-link
        to="/new"
        class="p-2 text-blue-400 uppercase hover:text-white"
        active-class="text-white"
      >
        Sell
      </router-link>
      <router-link
        to="/products"
        class="p-2 text-blue-400 uppercase hover:text-white"
        active-class="text-white"
      >
        Shop
      </router-link>
      <router-link
        to="/cart"
        class="p-2 text-blue-400 hover:text-white uppercase"
        active-class="text-white"
      >
        <span class="material-icons"> shopping_cart </span>
        <span
          class="inline-flex absolute -top-0 -right-0 justify-center items-center w-6 h-6 text-xs font-bold text-black bg-white rounded-full border-2 border-white dark:border-gray-900 text-center"
          >{{ cartStore.cart.length }}</span
        >
      </router-link>
    </ul>
  </header>
</template>

<script setup>
import router from "../router";
import { useUserStore } from "../stores/users";
import { useCartStore } from "../stores/cart";
const userStore = useUserStore();
const cartStore = useCartStore();
</script>
