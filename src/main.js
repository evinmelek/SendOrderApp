import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker' 

const app = createApp(App)

app
.use(router) 
// router.isReady().then(() => app.mount('#app')) ***use this for async navigations 
.mount('#app') 
