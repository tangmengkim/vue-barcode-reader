<template>
  <div>
    <Navbar @save-to-excel="handleSaveToExcel" />
    <div class="p-4">
      <ProductList :products="products" @update-quantity="updateQuantity" @delete-product="deleteProduct" />

    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import ProductList from '../components/ProductList.vue';
import { exportToExcel } from '../utils/excelUtils'; // Adjust the path according to your project structure

export default {
  components: {
    Navbar,
    ProductList
  },
  data() {
    return {
      products: JSON.parse(localStorage.getItem('products')) || []
    };
  },
  methods: {
    updateQuantity(index, change) {
      this.products[index].quantity += change;
      this.updateLocalStorage();
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      this.updateLocalStorage();
    },
    handleSaveToExcel() {
      exportToExcel(this.products)
      localStorage.removeItem('products'); // Clear local storage only if export is successful
      // Implement the save to Excel functionality
      this.products = []
    },
    updateLocalStorage() {
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }
};
</script>
