<template>
  <div id="app" class="metro-style">
    <ErrorBoundary>
      <RouterView />
    </ErrorBoundary>
    <ErrorNotifications />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ErrorBoundary from './components/ErrorBoundary.vue'
import ErrorNotifications from './components/ErrorNotifications.vue'
</script>