import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/about1',
    name: 'about1',
    component: () => import('../views/AboutView1.vue')
  },
  {
    path: '/about2',
    name: 'about2',
    component: () => import('../views/AboutView2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: window.__POWERED_BY_QIANKUN__ ? '/app1/' : '/child/app1/',
  routes
})

export default router
