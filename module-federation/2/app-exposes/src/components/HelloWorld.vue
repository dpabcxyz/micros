<!--
 * @Author: chenxuan
 * @Date: 2022-03-28 08:57:15
 * @LastEditTime: 2022-04-04 16:04:21
 * @LastEditors: chenxuan
-->
<template>
  <div class="hello">
    <h1>远程组件</h1>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
