import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import { setupGlobalErrorHandler } from './utils/errorHandler'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Setup global error handling
setupGlobalErrorHandler(app)

app.mount('#app')