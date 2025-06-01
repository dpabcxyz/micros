/*
 * @Author: chenxuan
 * @Date: 2022-07-08 23:30:09
 * @LastEditTime: 2022-07-09 00:43:38
 * @LastEditors: chenxuan
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'hehe',
    component: ()=>import('../views/page1.vue')
  },
  {
    path: '/page1',
    name: 'page1',
    component: ()=>import('../views/page1.vue')
  },
  {
    path: '/page2',
    name: 'page2',
    component: ()=>import('../views/page2.vue')
  },
  {
    path: '/page3',
    name: 'page3',
    component: ()=>import('../views/page3.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
