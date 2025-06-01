<!--
 * @Author: chenxuan
 * @Date: 2021-12-04 12:52:59
 * @LastEditTime: 2021-12-05 11:00:37
 * @LastEditors: chenxuan
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">主应用</router-link> |
      <router-link to="/layout/vueApp/home">Vue微应用</router-link> |
      <router-link to="/purehtml" >点击跳转子应用app-jquery的首页</router-link>
    </div>
    <div id="app1"></div>
    <div id="app2"></div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name:"",
  methods: {
    push(subapp){
      history.pushState(null, subapp, subapp) 
    }
  },
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
