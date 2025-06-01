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
    <h1>999</h1>
    <button @click="hehe">接口测试</button>
    <p>{{ text }}</p>
    <p>
      baseroute，用于设置子应用基础路由，子应用部署在服务器非根目录时需要设置。如：子应用的入口为:http://xxx.xxx.xxx:8888/app1,
      此时baseroute、路由base值、publicpath应设置为：/app1/。(如果是hash路由一般不需要配置base)
    </p>
    <p>
      单独在主应用配置baseroute，没有任何意义,子应用可以不作任何配置!
    </p>
    <div class="test1"></div>
  </div>
</template>

<script>
import { encrypt} from '@/assets/jsencrypt'
export default {
  name: 'HomeView',
  data(){
    return {
      text:{}
    }
  },
  methods: {
    hehe(){
      this.$http.post('/login',{
          username:"admin",
          password:encrypt('admin')
      }).then((res)=>{
        this.text=res.data
        // console.log(res.data)
      })
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
