/*
 * @Author: chenxuan
 * @Date: 2021-12-19 23:34:18
 * @LastEditTime: 2021-12-19 23:45:33
 * @LastEditors: chenxuan
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Aboout from '../views/about.vue'
import Home from '../views/home.vue'
const router = new VueRouter({
  routes:[
   {
		path: '/about', 
		name: 'Aboout',
		component:Aboout,
   },
   {
		path: '/home', 
		name: 'Home',
		component:Home,
   }
  ]
})
export default router