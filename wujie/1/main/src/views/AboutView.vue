<!--
 * @Author: chenxuan
 * @Date: 2022-10-27 09:38:55
 * @LastEditTime: 2022-10-27 09:59:21
 * @LastEditors: chenxuan
-->
<template>
  <div class="about">
    <WujieVue
      width="100%" 
      height="100%" 
      name="xxx" 
      :url="url" 
      :sync="true" 
      :beforeLoad="beforeLoad" 
      :beforeMount="beforeMount" 
      :afterMount="afterMount" 
      :beforeUnmount="beforeUnmount" 
      :afterUnmount="afterUnmount" 
    ></WujieVue>
  </div>
</template>
<script>
export default {
  name:"",
  data(){
    return {
      url:"http://localhost:8011/"
    }
  },
  props:[],
  methods:{
    beforeLoad(){

    },
    beforeMount(){

    },
    afterMount(){

    },
    beforeUnmount(){

    },
    afterUnmount(){

    }
  }
}
</script>
