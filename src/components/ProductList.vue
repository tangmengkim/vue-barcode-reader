<template>
  <div>
    <ul>
      <li v-for="(product, index) in [...products].reverse()" :key="product.CODE" class="flex items-center justify-between py-3 border-b">
        <span class="w-50% font-bold text">{{products.length - index}}: {{ product.CODE }}</span>
        <div class="flex items-center space-x-2">
          <button @click="decreaseQuantity(products.length - 1 - index)" class="bg-red-500 px-2 py-1 w-8 text-white rounded" :disabled="product.ACTUAL_QTY <= 1" >-</button>
          <input
            type="number"
            v-model.number="product.ACTUAL_QTY"  
            @input="updateQuantity(products.length - 1 - index, product.ACTUAL_QTY)"
            min="1"  
            class="border border-gray-700 rounded px-2 py-1 w-12 text-center text-black bg-gray-300 font-bold"
          />
          <button @click="increaseQuantity(products.length - 1 - index)" class="bg-blue-500 px-2 py-1 w-8 text-white rounded">+</button>
          <button @click="deleteProduct(products.length - 1 - index)" class="bg-gray-500 px-0 py-1 text-white rounded">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    products: Array
  },
  methods: {
    updateQuantity(index, newQuantity) {
      // Emit the updated quantity if it has changed
      if (newQuantity > 0) { // Ensure quantity is valid
        this.$emit('update-quantity', index, newQuantity - this.products[index].ACTUAL_QTY); // Pass change to parent
      }
    },
    increaseQuantity(index) {
      this.$emit('update-quantity', index, 1);
    },
    decreaseQuantity(index) {
      this.$emit('update-quantity', index, -1);
    },
    deleteProduct(index) {
      this.$emit('delete-product', index);
    }
  }
};
</script>

<style scoped>
/* Optional: Add your custom styling */
/* Hide spinner controls in number input for WebKit browsers */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
