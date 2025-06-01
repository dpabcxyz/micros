import React from 'react';
import ReactDOM from 'react-dom/client';
import "./public-path";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
let root = null;
// let root = ReactDOM.createRoot(document.getElementById('root'));
function render(props) {
  const { container } = props;
  root =
  root ||
  ReactDOM.createRoot(
    container
      ? container.querySelector("#root")
      : document.getElementById("root")
  );
  root.render(
    <BrowserRouter
      basename={window.__POWERED_BY_QIANKUN__ ? "/app4/" : "/child/app4/"}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log("[react16] react app bootstraped");
}

export async function mount(props) {
  console.log("[react18] props from main framework", props);
  render(props);
}
export async function unmount(props) {
  root.unmount();
  root = null;
}
reportWebVitals();
