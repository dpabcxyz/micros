/*
 * @Author: chenxuan
 * @Date: 2022-07-08 23:30:25
 * @LastEditTime: 2022-07-09 00:40:08
 * @LastEditors: chenxuan
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
   {
    path: '/test',
    name: 'Test',
    component: ()=>import('../views/test.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: window.__MICRO_APP_BASE_ROUTE__ || '/',
  routes
})

export default router
