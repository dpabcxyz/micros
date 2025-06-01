<template>
  <div class="page-remote">
    <!-- 引用mf-vite-2的组件 -->
    <Page1></Page1>
    <Page2></Page2>
  </div>
</template>
<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';
  const Page1=defineAsyncComponent(() => import('app2/Page1'))
  const Page2=defineAsyncComponent(() => import('app2/Page2'))
</script>
<style lang="scss" scoped>
  .page-remote {
    width: 100%;
    margin-top: 24px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 600px;
      height: 220px;
      text-align: center;
      color: rgb(61, 61, 239);
      border: 1px solid rgb(61, 61, 239);
    }
  }
</style>
