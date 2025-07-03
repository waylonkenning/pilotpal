<template>
  <div v-if="hasError" class="error-boundary min-h-screen flex items-center justify-center bg-red-50">
    <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg border border-red-200">
      <div class="text-center">
        <div class="text-6xl mb-4">🚨</div>
        <h2 class="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p class="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
        </p>
        
        <div class="flex gap-3 justify-center">
          <button 
            @click="retry" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            data-testid="error-retry-button"
          >
            🔄 Try Again
          </button>
          <button 
            @click="goHome" 
            class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
            data-testid="error-home-button"
          >
            🏠 Go Home
          </button>
        </div>
        
        <details v-if="errorDetails" class="mt-6 text-left">
          <summary class="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
            Technical Details
          </summary>
          <pre class="mt-2 text-xs text-gray-600 bg-gray-100 p-3 rounded overflow-auto max-h-32">{{ errorDetails }}</pre>
        </details>
      </div>
    </div>
  </div>
  
  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const hasError = ref(false)
const errorDetails = ref<string>('')

onErrorCaptured((error: Error, instance, info) => {
  hasError.value = true
  errorDetails.value = `Error: ${error.message}\n\nStack: ${error.stack}\n\nComponent: ${info}`
  
  // Log error for debugging
  console.error('Error boundary caught:', error, instance, info)
  
  // Prevent error from propagating
  return false
})

const retry = async () => {
  hasError.value = false
  errorDetails.value = ''
  await nextTick()
  
  // Force re-render by navigating to current route
  const currentRoute = router.currentRoute.value
  await router.push({ path: '/temp' })
  await router.push(currentRoute)
}

const goHome = () => {
  hasError.value = false
  errorDetails.value = ''
  router.push('/')
}
</script>

<style scoped>
.error-boundary {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>