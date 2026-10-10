import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
const EmptyShell = { render: () => null }
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/child1/:pathMatch(.*)*',
    name: 'child1',
    component: EmptyShell,
    meta: { microApp: 'child1' },
  },
  {
    path: '/child2/:pathMatch(.*)*',
    name: 'child2',
    component: EmptyShell,
    meta: { microApp: 'child2' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
