<!--
 * @Author: chenxuan
 * @Date: 2022-07-08 23:32:32
 * @LastEditTime: 2022-07-08 23:32:38
 * @LastEditors: chenxuan
-->

<!-- my-page.vue -->
<template>
    <div>
      <h1>子应用3</h1>
      <!-- 
        name(必传)：应用名称
        url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
        baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
       -->
       <button @click="hehe">加载路由</button>
       <div class="test3">
         <micro-app name='app3' url='http://app3'  baseroute='/app3/' disable-memory-router disable-patch-request></micro-app>
       </div>
      
    </div>
  </template>
  <script>
  import microApp from '@micro-zoe/micro-app'
  export default{
    name:"",
    methods:{
      hehe(){
        microApp.router.push({name: 'app3', path: '/app'})
      }
    }
  }
  </script>
  <style>
  .test3{
    box-sizing: border-box;
    margin-top: 30px;
    width: 500px;
    /* height: 600px; */
    padding: 12px;
    border: 1px solid red;
  }
  </style>
  