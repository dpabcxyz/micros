/*
 * @Author: chenxuan
 * @Date: 2021-12-04 12:52:59
 * @LastEditTime: 2021-12-05 11:00:48
 * @LastEditors: chenxuan
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start } from "qiankun";
Vue.config.productionTip = false
const app=[
  {
    name: "vueApp",
    entry:process.env.NODE_ENV == "production" ? "/child/vue-app/" : "http://localhost:8001/",
    container: "#app1",
    activeRule: "/layout/vueApp",
    props: {baseRouter: router},
  },
  {
    name: 'purehtml',
    entry: '//localhost:8002',
    container: '#app2',
    activeRule: "/purehtml"
  }
]
registerMicroApps(app);
start('all');
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
