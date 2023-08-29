import {createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routerOptions = {
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/proposal',
      name: 'proposal',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProposalView.vue')
    }
  ]
} as any;

const router = createRouter(routerOptions)

export default router
