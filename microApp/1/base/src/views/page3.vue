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
       <div class="test3">
         <micro-app name='app3' url='http://app3'  baseroute='/app3/'></micro-app>
       </div>
      
    </div>
  </template>
  <script>
  import microApp from '@micro-zoe/micro-app'
  export default{
    name:"page3"
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
  