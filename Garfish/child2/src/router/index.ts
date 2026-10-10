import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/test1',
    name: 'test1',
    component: () => import('../views/test1.vue'),
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('../views/test2.vue'),
  },
]

export default routes
