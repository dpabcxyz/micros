/*
 * @Author: chenxuan
 * @Date: 2022-10-27 09:38:55
 * @LastEditTime: 2022-10-27 09:41:20
 * @LastEditors: chenxuan
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WujieVue from "wujie-vue2";
Vue.config.productionTip = false
Vue.use(WujieVue);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
