// host
// 加载js标签
function loadScript(src){
  return new Promise((res, rej) =>{
      const srcirpt = document.createElement('script')
      script.src = src;
      script.onload = res;
      script.onfaild = rej
      document.body.appendChild(script);
  })
}

// 连接容器
function loadComponent(scope, module) {
    return async () => {
      // 初始化共享作用域（shared scope）用提供的已知此构建和所有远程的模块填充它
      await __webpack_init_sharing__('default');
      const container = window[scope]; // 或从其他地方获取容器
      // 初始化容器 它可能提供共享模块
      await container.init(__webpack_share_scopes__.default);
      const factory = await window[scope].get(module);
      const Module = factory();
      return Module;
    };
}

// 加载远程模块的入口文件并并连接
loadScript('http://localhost:3001/remote-entry.js').then(() => {
  loadComponent('app', 'button').then(module => {
      console.log(module)
  });    
})

// remote
module.exports = {
  plugins: [new ModuleFederationPlugin({
      name: "app",
      filename: 'remote-entry.js',
      exposes: {
          "button": "./src/button.js"
      },
  })]
}
