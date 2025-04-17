import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Page1 from './pages/Page1.vue'
import Page2 from './pages/Page2.vue'
import Page3 from './pages/Page3.vue'
import InfoPage from './pages/Info.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/page1', component: Page1 },
  { path: '/page2', component: Page2 },
  { path: '/page3', component: Page3 },
  { path: '/info', component: InfoPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 