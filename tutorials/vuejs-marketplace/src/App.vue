
<script setup>

import { onBeforeMount } from "@vue/runtime-core";

import Header from './components/Header.vue';
import { useProductStore } from "./stores/products";

import { useUserStore } from "./stores/users";
const products = useProductStore();
const store = useUserStore();
onBeforeMount(() => {
  store.loadSellers()
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <router-view></router-view>
    <div class="flex-1"></div> <!-- here -->
  </div>

</template>


