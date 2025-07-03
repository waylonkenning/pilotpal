import { ref } from 'vue'

export interface ErrorNotification {
  id: string
  type: 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  persistent?: boolean
}

// Global error state
const errorNotifications = ref<ErrorNotification[]>([])

// Error notification management
export const useErrorHandler = () => {
  const addError = (error: Partial<ErrorNotification>) => {
    const notification: ErrorNotification = {
      id: Date.now().toString() + Math.random().toString(36),
      type: 'error',
      title: 'Error',
      message: 'An unexpected error occurred',
      timestamp: new Date(),
      ...error
    }
    
    errorNotifications.value.push(notification)
    
    // Auto-remove non-persistent errors after 5 seconds
    if (!notification.persistent) {
      setTimeout(() => {
        removeError(notification.id)
      }, 5000)
    }
    
    return notification.id
  }
  
  const removeError = (id: string) => {
    const index = errorNotifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      errorNotifications.value.splice(index, 1)
    }
  }
  
  const clearAllErrors = () => {
    errorNotifications.value = []
  }
  
  return {
    errorNotifications,
    addError,
    removeError,
    clearAllErrors
  }
}

// Global error handling functions
export const handleAsyncError = async <T>(
  asyncFn: () => Promise<T>,
  errorMessage?: string
): Promise<T | null> => {
  try {
    return await asyncFn()
  } catch (error) {
    console.error('Async error:', error)
    
    const { addError } = useErrorHandler()
    addError({
      title: 'Operation Failed',
      message: errorMessage || 'An operation failed to complete successfully',
      type: 'error'
    })
    
    return null
  }
}

export const handleLocalStorageError = (operation: string, error: Error) => {
  console.error(`LocalStorage ${operation} error:`, error)
  
  const { addError } = useErrorHandler()
  addError({
    title: 'Storage Error',
    message: 'There was a problem saving your data. Please try again.',
    type: 'warning'
  })
}

export const handleFormValidationError = (field: string, message: string) => {
  const { addError } = useErrorHandler()
  addError({
    title: 'Validation Error',
    message: `${field}: ${message}`,
    type: 'warning'
  })
}

export const handleNetworkError = (operation: string) => {
  const { addError } = useErrorHandler()
  addError({
    title: 'Network Error',
    message: `Unable to ${operation}. Please check your internet connection and try again.`,
    type: 'error'
  })
}

// Global error handler for uncaught errors
export const setupGlobalErrorHandler = (app: any) => {
  // Vue error handler
  app.config.errorHandler = (error: Error, instance: any, info: string) => {
    console.error('Global Vue error:', error, instance, info)
    
    const { addError } = useErrorHandler()
    addError({
      title: 'Application Error',
      message: 'An unexpected error occurred in the application',
      type: 'error',
      persistent: true
    })
  }
  
  // Global promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    
    const { addError } = useErrorHandler()
    addError({
      title: 'System Error',
      message: 'An unexpected system error occurred',
      type: 'error'
    })
    
    // Prevent default browser behavior
    event.preventDefault()
  })
  
  // Global JavaScript error handler
  window.addEventListener('error', (event) => {
    console.error('Global JavaScript error:', event.error)
    
    const { addError } = useErrorHandler()
    addError({
      title: 'Script Error',
      message: 'A script error occurred in the application',
      type: 'error'
    })
  })
}