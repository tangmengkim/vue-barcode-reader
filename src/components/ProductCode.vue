<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300"
  >
    <div
      class="bg-slate-400 p-8 rounded shadow-md max-w-md transform transition-transform duration-300"
    >
      <h1 class="text-2xl font-semibold mb-4">Add Product Code</h1>
      <div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="p-code">Code</label>
          <input
            class="w-full border border-gray-300 bg-gray-800 rounded px-3 py-2"
            type="text"
            name="p-code"
            v-model="productCode"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="p-num">Qty</label>
          <input
            class="w-full border border-gray-300 bg-gray-800 rounded px-3 py-2"
            type="number"
            min="1"
            v-model="this.productQty"
          />
        </div>
      </div>
      <div class=" space-x-5">
        <button
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          @click="addProduct(productCode, productQty)"
        >
          Submit
        </button>
        <button
          class="bg-purple-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          @click="this.$emit('close-add-product')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productCode: '',
      productQty: 1
    }
  },
  methods: {
    addProduct() {
      console.log(this.productCode, this.productQty)
      const code = this.productCode
      const qty = this.productQty
      if (code !== '' && qty > 0) {
        this.$emit('add-product', { code, quantity: qty })
        this.$emit('close-add-product')
      }
    }
  }
}
</script>
<style></style>
