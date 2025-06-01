<!--
 * @Author: chenxuan
 * @Date: 2022-07-08 23:30:09
 * @LastEditTime: 2022-07-08 23:39:14
 * @LastEditors: chenxuan
-->
<template>
  <div id="app">
    <router-link to="/">子应用1</router-link> | 
    <router-link to="/page2">子应用2</router-link> |
    <router-link to="/page3">子应用3</router-link>
    <router-view/>
  </div>
</template>

