import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { registerMicroApps, start } from 'qiankun';
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

registerMicroApps([
  {
    name: 'app1', 
    entry: process.env.NODE_ENV === 'production' ? '/child/app1/': 'http://localhost:4001',
    container: '#qiankun',
    activeRule: '/app1',
  },
  {
    name: 'app2',
    entry: process.env.NODE_ENV === 'production' ? '/child/app2/': 'http://localhost:4002',
    container: '#qiankun',
    activeRule: '/app2',
  },
  {
    name: 'app3',
    entry: process.env.NODE_ENV === 'production' ? '/child/app3/': 'http://localhost:4003',
    container: '#qiankun',
    activeRule: '/app3',
  },
  {
    name: 'app4',
    entry: process.env.NODE_ENV === 'production' ? '/child/app4/': 'http://localhost:4004',
    container: '#qiankun',
    activeRule: '/app4',
  },
]);
start();