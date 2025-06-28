<!--
 * @Author: chenxuan
 * @Date: 2022-07-08 23:32:32
 * @LastEditTime: 2022-07-08 23:32:38
 * @LastEditors: chenxuan
-->

<!-- my-page.vue -->
<template>
  <div>
    <h1>子应用1</h1>
     <button @click="hehe">加载指定路由</button>
     <div class="test">
        <micro-app name='app1' url='http://app1'  baseroute='/app1/'></micro-app>
     </div>
   
  </div>
</template>
<script>
import microApp from '@micro-zoe/micro-app'
export default{
  name:"",
  methods:{
    hehe(){
      microApp.router.push({name: 'app1', path: '/test'})
    }
  }
}
</script>
<style>
.test{
  box-sizing: border-box;
  margin-top: 30px;
  width: 500px;
  height: 250px;
  padding: 12px;
  border: 1px solid red;
}
</style>
