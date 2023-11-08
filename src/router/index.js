import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'index',
      component: Home
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('../views/sign/index.vue')
    },
    {
      path: '/square',
      name: 'square',
      component: () => import('../views/square/index.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/mine/index.vue')
    },
    {
      path: '/refill',
      name: 'refill',
      component: () => import('../views/refill/index.vue')
    },
    {
      path: '/watching/watching',
      name: 'watching',
      component: () => import('../views/watching/watching.vue')
    },
    {
      path: '/pages_mine/record/spectate',
      name: 'spectate',
      component: () => import('../views/pages_mine/record/spectate.vue')
    },
    {
      path: '/pages_mine/record/consumption',
      name: 'consumption',
      component: () => import('../views/pages_mine/record/consumption.vue')
    },
    {
      path: '/pages_mine/record/recharge',
      name: 'recharge',
      component: () => import('../views/pages_mine/record/recharge.vue')
    },
    {
      path: '/pages_square/opera/ranking',
      name: 'ranking',
      component: () => import('../views/pages_square/opera/ranking.vue')
    },
    {
      path: '/pages_square/opera/update',
      name: 'update',
      component: () => import('../views/pages_square/opera/update.vue')
    },
    {
      path: '/pages_square/opera/breaking',
      name: 'breaking',
      component: () => import('../views/pages_square/opera/breaking.vue')
    },
    {
      path: '/pages_square/recharge/recharge',
      name: 'update',
      component: () => import('../views/pages_square/recharge/recharge.vue')
    },
    {
      path: '/pages_square/screening/screening',
      name: 'breaking',
      component: () => import('../views/pages_square/screening/screening.vue')
    },
    {
      path: '/pages_square/dramaSubset/dramaSubset',
      name: 'dramaSubset',
      component: () => import('../views/pages_square/dramaSubset/dramaSubset.vue')
    }
  ]
})

export default router
