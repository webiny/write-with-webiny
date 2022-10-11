<script setup>
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { reactive, ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useProductStore } from '../stores/products';
import { useUserStore } from '../stores/users';
const currency = "$";
let isEditing = ref(false);

const loadedProduct = reactive({})


const editProduct = (product) => {
  openEdit.value = true;
  loadedProduct.id = product.id
  loadedProduct.title = product.title
  loadedProduct.desc = product.desc;
  loadedProduct.price = product.price
  isEditing.value = true
}

const UPDATE_PRODUCT = gql`
    mutation updateProduct(
      $id: ID!
      $title: String!
      $desc: String!
      $price: Number!
    ) {
      updateProducts(
        revision: $id
        data: { title: $title, desc: $desc, price: $price }
      ) {
        data {
          title
          desc
          price
        }
      }
    }
  `;
const { mutate: updateProduct } = useMutation(UPDATE_PRODUCT, () => ({
  variables: {
    id: loadedProduct.id,
    title: loadedProduct.title,
    desc: loadedProduct.desc,
    price: loadedProduct.price,
  },
}));


const updateWebiny = () => {
  console.log(loadedProduct)
  updateProduct().then(() => {
    window.location.reload();
  });
};

const viewProduct = (product) => {
  openView.value = true;
  loadedProduct.title = product.title
  loadedProduct.desc = product.desc;
  loadedProduct.price = product.price
  loadedProduct.seller = product.seller
}
const openEdit = ref(false)
const openView = ref(false)
const store = useProductStore();
const userStore = useUserStore();
const cartStore = useCartStore();
</script>
<template>


  <div v-if="openView" class="shadow-md  rounded-lg fixed top-0 right-0 left-0  w-full md:inset-1 bg-white h-1/2">
    <button @click="openView=false"
      class="inline-flex items-center  p-2 m-1 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-black">
      <span class="material-icons">close</span></button>
    <h1 class="text-3xl font-bold m-2">{{loadedProduct.title}}</h1>
    <div class="p-2">
      <p>{{loadedProduct.desc}}</p>
      <div class="flex justify-between">
        <h2 class="font-bold text-3xl">${{loadedProduct.price.toFixed(2)}}</h2>
        <div class="flex">
          <h1 class="bg-blue-100 text-blue-800 text-lg font-medium inline-flex items-center px-2.5 py-0.5 rounded">
            <span class="material-icons">account_circle</span>
            {{loadedProduct.seller}}
          </h1>
        </div>
      </div>

    </div>

  </div>


  <div v-if="openEdit" class="shadow-md p-2 rounded-lg fixed top-0 right-0 left-0  w-4/4 md:inset-5 bg-white h-3/4">
    <button @click="openEdit=false" class="m-1 p-2 text-white bg-black hover:bg-blue-400 rounded-md"><span
        class="material-icons">
        close
      </span></button>

    <h1 class="text-3xl font-bold m-2">Edit Product</h1>
    <form @submit.prevent="updateWebiny()" class="flex flex-col mx-auto p-2">
      <input type="text" placeholder="Title" v-model="loadedProduct.title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <input type="number" placeholder="Price" step="0.01" v-model="loadedProduct.price"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <textarea v-model="loadedProduct.desc"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Description" name="" id="" cols="5" rows="5"></textarea>


      <button type="submit"
        class="items-center  p-2 m-1 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-black">
        <span class="material-icons">save</span></button>
    </form>

  </div>
  <div v-if="store.result" class="flex flex-wrap m-2">

    <div class="m-1" v-for="product in store.result.listProducts.data" :key="product.title">

      <div class="m-2 mx-auto w-60 h-60 overflow-hidden max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
        <div class="flex flex-col items-center p-2 text">
          <span
            class="material-icons text-center rounded-md bg-white p-4 shadow-md text-black text-5xl">{{product.category}}</span>
        </div>
        <div class="p-2">
          <h5 class=" text-xl text-left font-medium text-gray-900">{{product.title}}</h5>

          <h5 class="text-3xl font-medium text-gray-900">${{product.price.toFixed(2)}}</h5>
          <h5 class="text-sm font-medium text-gray-900">posted by: {{product.seller}}</h5>

          <div class="flex">
            <button @click="viewProduct(product)"
              class="inline-flex items-center  p-2 m-1 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-black">
              <span class="material-icons">description</span></button>

            <button @click="cartStore.addToCart(product)" v-if="product.seller!=userStore.user.username"
              class="inline-flex items-center text-sm p-2 m-1  font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-black">
              <span class="material-icons">add_shopping_cart</span></button>

            <div v-else> <button @click="editProduct(product)"
                class="inline-flex items-center p-2 m-1 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-black">
                <span class="material-icons">edit</span>
              </button>
              <button @click="store.removeFromWebiny(product)"
                class="inline-flex items-center p-2 m-1 text-sm font-medium text-center text-white bg-blue-300 rounded-lg hover:bg-black">
                <span class="material-icons">delete</span>
              </button>
            </div>

          </div>
        </div>
      </div>


    </div>

  </div>

  <div v-else>
    No Products
  </div>
</template>