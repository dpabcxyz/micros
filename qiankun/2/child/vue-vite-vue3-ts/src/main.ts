import { createApp } from 'vue'
import { renderWithQiankun, qiankunWindow } from "vite-plugin-qiankun/dist/helper"
import App from './App.vue'
import router from './router'



let app: any;
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    app = createApp(App);
    app.use(router)
    app.mount('#app')
}
else {
    renderWithQiankun({
        mount(props) {
            app = createApp(App);
            app.use(router)
            app.mount(
                props.container
                  ? props.container.querySelector("#app")
                  : document.getElementById("app")
              );
        },
        bootstrap() {
            console.log("--bootstrap");
          },
          update(props) {
            console.log("--update", props);
          },
          unmount() {
            console.log("--unmount");
            app?.unmount();
          }
    })
}
