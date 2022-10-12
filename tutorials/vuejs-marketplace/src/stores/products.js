import { defineStore } from "pinia";
import { reactive, ref } from "vue";

import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export const useProductStore = defineStore("products", () => {
  const products = reactive([]);
  let allProducts;

  const user = JSON.parse(localStorage.getItem("user"));

  const ALL_PRODUCTS_QUERY = gql`
    query {
      listProducts {
        data {
          id
          title
          desc
          seller
          category
          productLink
          price
        }
      }
    }
  `;

  const { loading, result, error } = useQuery(ALL_PRODUCTS_QUERY);
  allProducts = result;
  
  const updateProducts = () => {
    allProducts.value.listProducts.data.forEach((element) => {
      products.push(element);
    });
  };
  
  const DELETE_PRODUCT = gql`
    mutation ($id: ID!) {
      deleteProducts(revision: $id) {
        data
      }
    }
  `;

  const { mutate: deleteProduct } = useMutation(DELETE_PRODUCT, (product) => ({
    variables: {
      id: product,
    },
  }));
  const removeFromWebiny = (product) => {
    deleteProduct(product).then(() => {
      window.location.reload();
    });
  };
  return {
    result,
    updateProducts,
    allProducts,
    products,
    removeFromWebiny,
  };
});
/*             this.users = this.users.filter(user=>user.id!==id)
 */
