import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.MODE==='production' ? '/child/app1/' : '/' ),  // 部署在非根目录
  routes: [
    {
      path: '/',
      name: 'Page1',
      component: () => import('../views/page1.vue'),
    },
    {
      path: '/page2',
      name: 'Page2',
      component: () => import('../views/page2.vue'),
    },
    {
      path: '/page3',
      name: 'Page3',
      component: () => import('../views/page3.vue'),
    },
  ],
})
console.log(import.meta.env.MODE)
export default router
