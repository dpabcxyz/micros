import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let instance = null;
function render(props = {}){
  const { container } = props;
  instance=new Vue({
    router,
    render: function (h) { return h(App)}
  }).$mount(container ? container.querySelector('#app') : '#app');
}
/* eslint-disable */
// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
// 作为微应用在基座应用中运行
if (window.__POWERED_BY_QIANKUN__) {
  console.log(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__);
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
// 协议接入钩子函数 基座应用会自动调用
export async function bootstrap() {

}
export async function mount(props) {
  render();
}
export async function update(props) {
  // renderPatch(props);
}
export async function unmount() {
  instance.$destroy();
}
/* eslint-disable */
