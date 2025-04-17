import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PortalVue from 'portal-vue'

const app = createApp(App)
app.use(router)
app.use(PortalVue)
app.mount('#app')
