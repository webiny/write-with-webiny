<template>
  <div>
    <Navbar />
    <div class="container mt-10">
      <div class="row" v-if="posts.length > 0">
        <div v-for="post in posts" :key="post.id" class="col-md-3">
          <div class="card mt-2">
            <img
              class="card-img-top"
              :src="post.productImages"
              style="height: auto"
              alt="Card image cap"
            />
            <div class="card-body">
              <p class="card-text">{{ post.name }}, USD {{ post.price }}</p>
              <div class="d-flex">
                <button @click="addToCart(post)" class="btn btn-success">
                  {{ checkIfOnCart(post) ? "View cart" : "Add Cart" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-md-12 jumbotron jumbotron-fluid mt-4">
          <div class="container">
            <h1 class="display-4">Loading...</h1>
            <p class="lead">Hold on as we get the products...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "IndexPage",
  components: { Navbar },
  data: () => ({
    posts: [],
  }),
  methods: {
    addToCart(product) {
      if (process.client) {
        if (this.checkIfOnCart(product)) {
          window.location.href = "/cart";
        } else {
          let cartItems = JSON.parse(localStorage.getItem("cartItems"));
          if (cartItems) {
            localStorage.setItem(
              "cartItems",
              JSON.stringify([
                ...cartItems,
                {
                  ...product,
                  quantity: 1,
                },
              ])
            );
          } else {
            localStorage.setItem(
              "cartItems",
              JSON.stringify([
                {
                  ...product,
                  quantity: 1,
                },
              ])
            );
          }
          window.location.reload();
        }
      }
    },
    checkIfOnCart(product) {
      if (process.client) {
        let cartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (cartItems) {
          return cartItems.find((cartItem) => cartItem.id == product.id)
            ? true
            : false;
        } else {
          return false;
        }
      }
    },
  },
  fetchOnServer: false,
  async fetch() {
    this.posts = await this.$axios
      .post(
        `${process.env.WEBINYURL}`,
        {
          query: `
          query getProducts {
            listProducts {
              data {
                id
                name
                price
                productImages
              }
            }
          }
          `,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WEBINYTOKEN}`,
          },
        }
      )
      .then((result) => result.data.data.listProducts.data);
  },
};
</script>
