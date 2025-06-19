import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.MODE==='production' ? '/child/app2/' : '/' ),  // 部署在非根目录
  routes: [
    {
      path: '/',
      name: 'page1',
      component: () => import('../views/page1.vue'),
    },
    {
      path: '/page2',
      name: 'page2',
      component: () => import('../views/page2.vue'),
    },
    {
      path: '/page3',
      name: 'page3',
      component: () => import('../views/page3.vue'),
    },
  ],
})

export default router
