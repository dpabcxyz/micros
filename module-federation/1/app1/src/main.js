/*
 * @Author: chenxuan
 * @Date: 2021-12-16 23:30:02
 * @LastEditTime: 2021-12-20 22:35:02
 * @LastEditors: chenxuan
 */
import Vue from "vue";
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
  }).$mount('#app')