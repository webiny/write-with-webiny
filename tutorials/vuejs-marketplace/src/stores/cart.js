import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useCartStore = defineStore("useCartStore", () => {
  const cart = reactive([]);
  const purchases = reactive([]);
  /* If there any purchases push them to the purchases array* */
  if (localStorage.getItem("purchases")) {
    let savedPurchases = JSON.parse(localStorage.getItem("purchases"));
    savedPurchases.forEach((element) => {
      purchases.push(element);
    });
  }
  let currentUser;
  if (localStorage.getItem("user")) {
    currentUser = JSON.parse(localStorage.getItem("user"));
  }

  /* If there any items stored in the cart push them to the cart array* */
  if (localStorage.getItem("cart")) {
    let savedCart = JSON.parse(localStorage.getItem("cart"));
    savedCart.forEach((element) => {
      cart.push(element);
    });
  }
  const addToCart = (product) => {
    if (cart.length == 0) {
      cart.push(product);
    } else {
      let hasProduct = cart.some((item) => item["id"] === product.id);
      if (hasProduct) {
        alert("This product is already in your cart");
      } else {
        cart.push(product);
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const removeFromCart = (id) => {
    let newCart = cart.filter((product) => {
      return product.id != id;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload();
  };
  const savePurchases = (product) => {
    purchases.push({
      currentUser,
      ...product,
    });
    localStorage.setItem("purchases", JSON.stringify(purchases));
    removeFromCart(product.id);
  };
  const total = computed(() => {
    let temp = 0;
    cart.forEach((element) => {
      temp += parseFloat(element.price);
    });
    return temp;
  });
  return { cart, addToCart, total, removeFromCart, purchases, savePurchases };
});
