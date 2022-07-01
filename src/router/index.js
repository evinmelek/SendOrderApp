import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/theme',
    name: 'theme',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ThemeView.vue')
  },
  {
    path: '/settings',
    name: 'settings', 
    component: () => import('../views/SettingsView.vue')
  },
  {
    path: '/settings/pre-call',
    name: 'pre-call', 
    component: () => import('../views/settings/PreCallView.vue')
  },
  {
    path: '/settings/system',
    name: 'sound', 
    component: () => import('../views/settings/SystemSettingsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: []
})

export default router
