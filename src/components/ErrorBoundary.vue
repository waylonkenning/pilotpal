<template>
  <div v-if="hasError" data-testid="error-boundary">
    <div>
      <div>
        <div>🚨</div>
        <h2>Something went wrong</h2>
        <p>
          We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
        </p>
        
        <div>
          <button 
            @click="retry" 
            data-testid="error-retry-button"
          >
            🔄 Try Again
          </button>
          <button 
            @click="goHome" 
            data-testid="error-home-button"
          >
            🏠 Go Home
          </button>
        </div>
        
        <details v-if="errorDetails">
          <summary>
            Technical Details
          </summary>
          <pre>{{ errorDetails }}</pre>
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