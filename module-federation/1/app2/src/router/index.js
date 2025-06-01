/*
 * @Author: chenxuan
 * @Date: 2021-12-19 23:34:18
 * @LastEditTime: 2022-04-03 23:33:16
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
   },
   {
		path: '/button', 
		name: 'Button',
		component:()=>import("app1/Buttons"),
   }
  ]
})
export default router