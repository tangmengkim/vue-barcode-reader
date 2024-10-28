<template>
  <nav nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <RouterLink
      v-if="$route.path !== '/'"
      to="/"
      class="text-sm px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded"
      >Home</RouterLink
    >
    <RouterLink
      v-if="$route.path !== '/scan'"
      to="/scan"
      class="text-sm px-4 py-2 bg-green-500 hover:bg-green-700 rounded"
      >Scan Barcode</RouterLink
    >
    <button
      v-if="$route.path === '/'"
      @click="saveToExcel"
      class="text-sm px-4 py-2 bg-gray-500 hover:bg-yellow-700 rounded"
    >
      Save to Excel
    </button>
    <button
      v-if="$route.path === '/'"
      @click='clearItems'
      class="text-sm px-4 py-2 bg-red-500 hover:bg-red-700 rounded"
    >Clear</button>
  </nav>
</template>

<script>

export default {
  methods: {
    saveToExcel() {
      this.$emit('save-to-excel')
    },
    clearItems(){
      this.$emit('clear-item')
    }

  }
}
</script>

<style scoped>
/* Optional: Add your custom styling */
</style>
