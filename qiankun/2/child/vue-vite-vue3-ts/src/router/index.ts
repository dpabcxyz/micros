import { createRouter, createWebHistory } from 'vue-router'
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper"
const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__? '/app2/' : '/child/app2/'),
  routes: [
    {
      path: '/about1',
      name: 'home',
      component: () => import('../views/AboutView1.vue'),
    },
    {
      path: '/about2',
      name: 'about',
      component: () => import('../views/AboutView2.vue'),
    },
  ],
})
console.log(qiankunWindow.__POWERED_BY_QIANKUN__)
export default router
