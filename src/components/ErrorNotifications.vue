<template>
  <Teleport to="body">
    <div data-testid="notifications-container">
      <TransitionGroup name="notification" tag="div">
        <div
          v-for="notification in errorNotifications"
          :key="notification.id"
          :class="getNotificationClass(notification.type)"
          data-testid="error-notification"
        >
          <div>
            <div>{{ getNotificationIcon(notification.type) }}</div>
            <div>
              <h4>{{ notification.title }}</h4>
              <p>{{ notification.message }}</p>
            </div>
            <button
              @click="removeError(notification.id)"
              data-testid="dismiss-notification"
            >
              ✕
            </button>
          </div>
          
          <!-- Progress bar for auto-dismiss -->
          <div
            v-if="!notification.persistent"
            data-testid="progress-bar"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useErrorHandler } from '../utils/errorHandler'

const { errorNotifications, removeError } = useErrorHandler()

const getNotificationClass = (type: string) => {
  switch (type) {
    case 'error':
      return 'bg-red-50 border-red-200 text-red-800'
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800'
    case 'info':
      return 'bg-blue-50 border-blue-200 text-blue-800'
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800'
  }
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'error':
      return '🚨'
    case 'warning':
      return '⚠️'
    case 'info':
      return 'ℹ️'
    default:
      return '📢'
  }
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}

.animate-shrink {
  animation: shrink 5s linear;
}
</style>