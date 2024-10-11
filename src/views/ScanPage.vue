<template>
  <div>
    <Navbar @save-to-excel="handleSaveToExcel" />
    <!-- <ScanBarcode @add-product="addProduct" /> -->
    <StreamBarcodeReader v-if="!isStart" @add-product="addProduct" />
    <div class="text-center p-2">
      <button
        class="w-20 h-10 text-center"
        :class="isStart ? 'bg-green-600' : 'bg-red-700'"
        @click="isStart = !isStart"
      >
        {{ isStart ? 'Start' : 'Stop' }}
      </button>
      <button class="w-20 h-10 text-center bg-cyan-600" @click="isAddProduct = true">Add</button>
    </div>
    <ProductList
      :products="products"
      @update-quantity="updateQuantity"
      @delete-product="deleteProduct"
    />
    <ProductCode
      v-if="isAddProduct"
      @add-product="addProduct"
      @close-add-product="closeAddProductPopup"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import StreamBarcodeReader from '@/components/StreamBarcodeReader.vue'
import ProductList from '@/components/ProductList.vue'
import ProductCode from '@/components/ProductCode.vue'
// import ScanBarcode from '@/components/ScanBarcode.vue';

// Reactive state for products
const products = ref(JSON.parse(localStorage.getItem('products')) || [])
const isStart = ref(true)
const isAddProduct = ref(true)

const closeAddProductPopup = () => {
  isAddProduct.value = false
}
const addProduct = (newProduct) => {
  // Check if the product already exists in the list
  const existingProduct = products.value.find((product) => product.code === newProduct.code)

  if (existingProduct) {
    // If the product exists, update its quantity
    existingProduct.quantity += newProduct.quantity
  } else {
    // If it doesn't exist, add it as a new product
    products.value.push(newProduct)
  }

  updateLocalStorage()
}

const updateQuantity = (index, change) => {
  products.value[index].quantity += change
  updateLocalStorage()
}

const deleteProduct = (index) => {
  products.value.splice(index, 1)
  updateLocalStorage()
}

const handleSaveToExcel = () => {
  // Implement the save to Excel functionality
}

const updateLocalStorage = () => {
  localStorage.setItem('products', JSON.stringify(products.value))
  products.value = JSON.parse(localStorage.getItem('products')) || []
}

// Sync localStorage with products when the component is mounted
onMounted(() => {
  products.value = JSON.parse(localStorage.getItem('products')) || []
})
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
