<template>
  <router-link to="/products" class="w-full bg-red-400 p-2 rounded-md">Back</router-link>
  <div class="p-1">
    <span class="material-icons text-5xl p-2 text-center">
      {{product.category}}
    </span>
    <h2>{{product.title}}</h2>

    <p>{{product.desc}}</p>
    <button class="bg-gray-400 p-2 rounded-md" @click="addToCart(product)">Add to
      Cart</button>
    <div class="manage buttons" v-if="product.seller===store.user.username">
      <button class="bg-orange-500 p-2 rounded-md" @click="isEditing=!isEditing">Edit</button>
      <button class="bg-red-600 p-2 rounded-md" @click="deleteP()">Delete</button>

    </div>

  </div>
  <div v-if="isEditing">

    <form @submit.prevent="editProduct" class="flex flex-col mx-auto p-2 w-full">
      <input type="text" placeholder="Title" v-model="theProduct.title" class="w-full shadow-md bg-gray-300 p-2" />
      <input type="number" placeholder="Price" step="0.01" v-model="theProduct.price"
        class="w-full shadow-md bg-gray-300 p-2" />
      <textarea v-model="theProduct.desc" class="w-full bg-red-300 p-2" placeholder="Description" name="" id="" cols="5"
        rows="5"></textarea>
      <input type="submit" value="Update" class="rounded-md p-2 w-full bg-red-400 text-white font-bold">
    </form>
  </div>
</template>

<script setup>
import { useQuery, useMutation } from "@vue/apollo-composable"
import { reactive, ref } from "@vue/reactivity"
import { computed } from "@vue/runtime-core";
import gql from "graphql-tag"
import router from "../router";
import { useUserStore } from "../stores/users";
const products = reactive([])
const theProduct = reactive({
  title: "",
  price: 0.00,
  desc: ""

})
const isEditing = ref(false);
const UPDATE_PRODUCT = gql`
mutation updateProduct($id:ID!, $title:String!, $desc:String!, $price:Number!){
  updateProducts(revision:$id, data:{
    title:$title
    desc:$desc
    price:$price
  })
  {
    data{
      title
      desc
      price
    }
  }
}`

const DELETE_PRODUCT = gql`
mutation($id:ID!){
  deleteProducts(revision:$id)
  {
    data
  }
}
`
const ALL_PRODUCTS_QUERY = gql`
query{
  listProducts{
    data
    {
      id
      title
      desc
      category
      quantity
      price
      seller
    }
  }
}`
const store = useUserStore();
const product = computed(() => products.find(product => product.title === router.currentRoute.value.params.title))

const { result, error } = useQuery(ALL_PRODUCTS_QUERY)
if (result) {
  let allProducts = result.value.listProducts.data;
  allProducts.forEach(element => {
    products.push(element)
  });
  theProduct.title = product.value.title;
  theProduct.desc = product.value.desc;
  theProduct.price = product.value.price;
}
const { mutate: deleteProduct } = useMutation(DELETE_PRODUCT, () => ({
  variables: {
    id: product.value.id
  },
}))
const { mutate: updateProduct } = useMutation(UPDATE_PRODUCT, () => ({
  variables: {
    id: product.value.id,
    title: theProduct.title,
    desc: theProduct.desc,
    price: theProduct.price
  },
}))
const notInCart = () => {
  let theCart = JSON.parse(localStorage.getItem("cart"))
  theCart.filter((id) => {
    if (id == id)
      return true
  })
  return false
}
function deleteP() {
  deleteProduct().then(() => {
    router.push('/products')
  })
}
function editProduct() {
  console.log(theProduct)
  updateProduct().then(() => {

   router.push("/")
  })
}
</script>