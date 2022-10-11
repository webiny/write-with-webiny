<template>
    <div class="flex justify-between">
        <h3 class="p-2 text-3xl font-bold">Cart Total: {{store.cart.length}}</h3>
        <h3 class="p-2 text-3xl font-bold">{{store.total.toFixed(2)}}</h3>
    </div>
    <div v-for="item in store.cart" :key="item.id" class="p-2 shadow-md border-black border-2 m-2">
        <div class="flex justify-between">
            <div>

                <span class="material-icons text-5xl">{{item.category}}</span>
                <h2 class="font-bold">{{item.title}} - {{item.price}}</h2>
            </div>
            
            <button class="text-blue-400 p-2 rounded-sm" @click="store.savePurchases(item)"><span
                    class="material-icons p-2 text-center">
                    money
                </span></button>
            <button class="text-blue-400 p-2 rounded-sm" @click="store.removeFromCart(item.id)"><span
                    class="material-icons p-2 text-center">
                    remove_circle
                </span></button>
        </div>

    </div>
</template>
<script setup>
import { useCartStore } from '../stores/cart';

const store = useCartStore();

</script>