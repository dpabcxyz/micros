/*
 * @Author: chenxuan
 * @Date: 2021-12-04 12:52:30
 * @LastEditTime: 2021-12-04 21:42:16
 * @LastEditors: chenxuan
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  base: window.__POWERED_BY_QIANKUN__ ? '/layout/vueApp/' : '/child/vue-app/',
  routes
})

export default router
