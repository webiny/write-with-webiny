<script setup>
import { useQuery } from '@vue/apollo-composable'

import { useProductStore } from "../stores/products"
import gql from 'graphql-tag'
import { onBeforeUpdate, reactive } from 'vue';
import { useUserStore } from '../stores/users';
const currency = "$";
const products = reactive([])
const store = useProductStore();
const userStore = useUserStore();
store.loadAllProducts();
</script>
<template>
    <button @click="store.updateProducts">View my Products</button>
    {{userInfo}}
    <div class="flex flex-wrap w-full" v-if="store.products">
        <div class="flex flex-row mx-2 p-2" v-for="product in store.products" :key="product.title">
            <div class="left">
                <span class="material-icons">
                    {{product.icon}}
                </span>
            </div>
            <div class="p-1">
                <h1 class="font-bold text-left">{{product.title}}</h1>
                <p>{{product.desc}}</p>
                <p class="my-2"> {{currency}} {{product.price.toFixed(2)}}</p>
                <hr />
                <router-link :to="`/product/${product.title}`" class="my-4 bg-red-400 p-2">
                    View
                </router-link>
            </div>

        </div>

    </div>

    <div v-else>
        No Products
    </div>
</template>