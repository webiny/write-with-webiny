<template>
  <h2 class="text-3xl font-bold text-center uppercase">Sell</h2>
  <span class="material-icons text-5xl p-2 text-center">
    {{category}}
  </span>
  <form @submit.prevent="uploadProduct" class=" mx-auto p-2 w-full shadow-md">
    <input type="text" placeholder="Title" v-model="product.title"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    <input type="number" placeholder="Price" step="0.01" v-model="product.price"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    <textarea v-model="product.desc"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Description" name="" id="" cols="5" rows="5"></textarea>
    <select name="" id="" v-model="category" v-if="result"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option :value="cat.iconName" v-for="cat in result.listCategories.data" :key="cat.id">
        {{cat.title}}
      </option>
    </select>
    <input type="text" placeholder="URL link to Product" v-model="product.link"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

    <button type="submit"
      class="text-white bg-blue-400 hover:bg-black font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center w-full"><span
        class="material-icons">upload</span></button>

  </form>
</template>

<script setup>
import { useMutation, useQuery } from '@vue/apollo-composable';
import { useUserStore } from "../stores/users";

import gql from 'graphql-tag';
import { reactive, ref } from 'vue';
import router from '../router';
const store = useUserStore();
const product = ref({
  title: 'Product Name',
  price: 0.00,
  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dolore omnis deserunt unde sapiente quasi delectus magni? Placeat consequuntur veritatis nobis. Ad nobis iste repellat voluptatum quam eveniet libero ullam!',
  link: "hhtp://www.webiny.com"
})
const category = ref('devices')
const categories = reactive([])
const GET_CATEGORIES = gql`
query {  
  listCategories
  {
    data{
      id
      title
    iconName   }
  }
}`

const { result, error } = useQuery(GET_CATEGORIES);
if (result) {
  categories.push(result)
} else {
  console.log("No Categoies")
}
const ADD_PRODUCT_MUTATION = gql`
mutation createProducts(
  $seller: String!
  $title: String!
  $desc: String!
  $price: Number!
  $category: String!
  $link: String!
) {
  createProducts(
    data: {
      title: $title
      desc: $desc
      price: $price
      productLink: $link
      seller: $seller
      category: $category
    }
  ) {
    data {
      title
      desc
      price
      productLink
      seller
      category
    }
  }
}

`
const { mutate: createProducts } = useMutation(ADD_PRODUCT_MUTATION, () => ({
  variables: {
    title: product.value.title,
    desc: product.value.desc,
    category: category.value,
    price: product.value.price,
    link: product.value.link,
    seller: store.user.username
  },
}))
function uploadProduct() {
  createProducts().then(() => {
    console.log(product.value)
    alert("You have successfully added a new product")
    router.push("/products")
  })
}

</script>