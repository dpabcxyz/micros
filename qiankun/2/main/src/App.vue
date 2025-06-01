<template>
  <div class="main-content">
    <div class="asider">
      <li v-for="item in list" :key="item.path" @click="go(item)">{{ item.name }}</li>
    </div>
    <div  class="views">
      <div class="local-view">
        <router-view/>
      </div>
      <div class="qiankun-view">
        <div id="qiankun"></div>
      </div>
    </div>
  </div>
</template>
<script lang="js">
export default {
  name: 'App',
  data() {
    return {
      list:[{
        name:"主应用Page1",path:"/",type:"local"
      },{
        name:"主应用Page2",path:"/about",type:"local"
      },{
        name:"子应用1-Page1",path:"/app1/about1",type:"qiankun"
      },{
        name:"子应用1-Page2",path:"/app1/about2", type:"qiankun"
      },{
        name:"子应用2-Page1",path:"/app2/about1",type:"qiankun"
      },{
        name:"子应用2-Page2",path:"/app2/about2",type:"qiankun"
      },{
        name:"子应用3-Page1",path:"/app3",type:"qiankun"
      },{
        name:"子应用4-Page1",path:"/app4/home",type:"qiankun"
      }]
    }
  },
  methods:{
    go(item){
      this.$router.push(item.path);
    }
  }
}
</script>
<style lang="scss" scoped>
  .main-content{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #f2f2f2;
    .asider {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 180px;
      height: 100%;
      flex-shrink: 0;
      flex-grow: 0;
      padding: 12px;
      background-color: #fff;
      >li{
        display: block;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
      }
    }
    .views{
      box-sizing: border-box;
      flex-shrink: 1;
      flex-grow: 1;
      padding-left: 12px;
      .local-view{
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid #ccc;
      }
    }
  }
 
</style>
