<!--
 * @Author: chenxuan
 * @Date: 2021-12-16 23:36:27
 * @LastEditTime: 2022-04-03 23:34:15
 * @LastEditors: chenxuan
-->
<template>
  <div class="vue-app1">
    <h1>这里是Vue-App2</h1>
   <router-link to="/about"> to About</router-link>
   <router-link to="/home"> to Home</router-link>
   <router-link to="/button"> to Button</router-link>
    <router-view/>
  </div>
</template>
<script>
export default {
    name:"app",
    components: {
	    Buttons: () => import("app1/Buttons"),
	  },
}


 </script>
<style>

</style>