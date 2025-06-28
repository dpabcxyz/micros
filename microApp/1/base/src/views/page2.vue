<!--
 * @Author: chenxuan
 * @Date: 2022-07-08 23:32:32
 * @LastEditTime: 2022-07-08 23:32:38
 * @LastEditors: chenxuan
-->

<!-- my-page.vue -->
<template>
  <div>
    <h1>子应用2</h1>
     <div class="test">
       <micro-app name='app2' url='http://app2' baseroute='/app2/'></micro-app>
     </div>
    
  </div>
</template>
<script>
import microApp from '@micro-zoe/micro-app'
export default{
  name:"",
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
