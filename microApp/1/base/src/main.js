/*
 * @Author: chenxuan
 * @Date: 2022-07-08 23:30:09
 * @LastEditTime: 2022-07-08 23:32:04
 * @LastEditors: chenxuan
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import microApp from '@micro-zoe/micro-app'
Vue.config.productionTip = false
microApp.start({
  fetch (url, options, appName) {
    const url_= new URL(url);
    const pathname=url_.pathname;
    let newUrl=`/${appName}`+pathname
    return window.fetch(newUrl, options).then((res) => {
      return res.text()
    })
  }
})
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
