import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import WelcomePageView from '../views/WelcomePageView.vue'
 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes :[ 
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/theme',
      name: 'theme',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/theme/ThemeView.vue')
    },
    {
      path: '/settings',
      name: 'settings', 
      component: () => import('../views/settings/SettingsView.vue')
    },
    {
      path: '/settings/pre-call',
      name: 'pre-call', 
      component: () => import('../views/settings/subfeatures/PreCallView.vue')
    },
    {
      path: '/settings/system',
      name: 'sound', 
      component: () => import('../views/settings/subfeatures/SystemSettingsView.vue')
    },
    {
      path: '/',
      name: 'welcome', 
      component: () => import('../views/WelcomePageView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: WelcomePageView },
    // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
    { path: '/:pathMatch(.*)', name: 'bad-not-found', component: WelcomePageView },
  ] 
})

export default router 