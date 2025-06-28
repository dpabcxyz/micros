<!--
 * @Author: chenxuan
 * @Date: 2022-07-08 23:30:25
 * @LastEditTime: 2022-07-08 23:42:32
 * @LastEditors: chenxuan
-->
<template>
  <div class="home">
    <h1>这是子组件3</h1>
    <h1>3003端口</h1>
    <div class="test1"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data(){
    return {
      text:{}
    }
  },

}
</script>
<style>
.test1{
  width: 250px;
  height: 333px;
  background: url(../assets/logo.png) center/100% 100% no-repeat;
}
p{
  text-wrap: wrap;
}
</style>
