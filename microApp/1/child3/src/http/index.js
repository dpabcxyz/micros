import axios from 'axios';
axios.defaults.baseURL='/apiUcac';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/json; charset=utf-8'; 
axios.defaults.headers.delete['Content-Type'] = 'application/json; charset=utf-8';
export default axios;