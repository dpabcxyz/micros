<script setup lang="ts">
  import {RouterView } from 'vue-router'
</script>
<template>
  <div class="container">
    <div class="nav">
      <li class="title">Mf-vite-2</li>
      <RouterLink to="/">本地组件1</RouterLink>
      <RouterLink to="/page2">本地组件2</RouterLink>
      <RouterLink to="/page3">模块联邦组件</RouterLink>
    </div>
    <div class="view">
      <RouterView />
    </div>
  </div>
 
</template>
<style lang="scss">
  *{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  
  .container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100vh;
  }
  .nav {
    box-sizing: border-box;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 0;
    flex-shrink: 0;
    width: 180px;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #eee;
    .title{
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid #eee;
    }
    >a{
      height: 40px;
      line-height: 40px;
      color: #555;
      text-decoration: none;
    }
    >.router-link-active{
      font-weight: bold;
      color: rgb(14, 131, 233);
    }
  }
  .view {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1px;
    height: 100%;
  }

</style>
