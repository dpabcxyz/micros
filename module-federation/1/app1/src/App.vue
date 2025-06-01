<!--
 * @Author: chenxuan
 * @Date: 2021-12-18 20:54:34
 * @LastEditTime: 2021-12-20 22:34:44
 * @LastEditors: chenxuan
-->
<!--
 * @Author: chenxuan
 * @Date: 2021-12-16 23:36:27
 * @LastEditTime: 2021-12-16 23:42:54
 * @LastEditors: chenxuan
-->
<template>
  <div class="vue-app1">
    <h1>这里是Vue-App1</h1>
    <router-view/>
  </div>
</template>
<script>
import qs from 'qs'
export default {
    name:"app",
    data(){
        return{
            data:{
                name:"陈轩",
                age:18
            }
        }
    },
    mounted() {
        console.log(qs.stringify(this.data))
    },
}


 </script>
<style>

</style>