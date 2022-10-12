import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Products from "../views/Products.vue";
import Create from "../views/Create.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/new",
    name: "Create",
    component: Create,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/* Check that the user is logged in if not show alert and redirect to the home page */
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("user")) {
      next();
    } else {
      alert("You must have an account to see this page");
      next("/");
    }
  } else {
    next();
  }
});
export default router;
