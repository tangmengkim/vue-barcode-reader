<template>
  <div class="scanner-container">
    <StreamBarcodeReader @decode="handleDecode" ></StreamBarcodeReader>
    <audio ref="beepSound" src="/audio/scanbeep.wav"></audio>
  </div>
</template>

<script>
import { StreamBarcodeReader } from 'vue-barcode-reader'

export default {
  components: {
    StreamBarcodeReader
  },
  data() {
    return {
      products: JSON.parse(localStorage.getItem('products')) || [],
      isPaused: false, // State to control the scanning
      onLoaded: true
    }
  },
  methods: {
    handleDecode(result) {
      if(!this.isPaused){
        const code = result
        this.$refs.beepSound.play() // Play the beep sound
        // Emit the updated product to the parent component
        this.$emit('add-product', { code, quantity: 1 })
        // this.onLoaded = false
        // Pause the scanner for 2 seconds before continuing
        this.isPaused = true
        setTimeout(() => {
          this.isPaused = false // Re-enable the scanner
        }, 2000)
      }
    },

    handleInit() {
      console.log('QR reader initialized')
    },

    checkMediaStreamSupport() {
      if (!navigator.mediaDevices) {
        alert('Your browser does not support the Media Stream API. Please use a different browser.')
        return false
      }
      return true
    }
  },
  mounted() {
    // Check for Media Stream API support on component mount
    if(this.checkMediaStreamSupport){
      navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        console.log('Camera access granted')
      })
      .catch((error) => {
        console.error('Error accessing the camera: ', error)
        alert('Unable to access the camera. Please check your browser settings.' + error)
      })
    }
  }
}
</script>

<style scoped>
.scanner-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
