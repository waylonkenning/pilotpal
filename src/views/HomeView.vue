<template>
  <div class="min-h-screen gradient-sky flex items-center justify-center">
    <div class="container">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-6 text-gradient-sky">
          ✈️ PPL Quest NZ
        </h1>
        <p class="text-xl mb-8">
          Gamify your journey to becoming a licensed pilot in New Zealand
        </p>
        
        <div class="card max-w-md mx-auto">
          <h2 class="text-2xl font-semibold mb-4">Ready to Start Your Aviation Adventure?</h2>
          <p class="mb-6">
            Track your flight hours, earn achievements, and navigate the path to your Private Pilot License
          </p>
          
          <div class="flex flex-col gap-4">
            <router-link to="/dashboard" class="btn btn-primary">
              🚀 Start Your Journey
            </router-link>
            <router-link to="/journey" class="btn btn-secondary">
              📈 View Progress Path
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this view
</script>