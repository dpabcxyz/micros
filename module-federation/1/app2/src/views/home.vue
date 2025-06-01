<!--
 * @Author: chenxuan
 * @Date: 2021-12-19 23:44:14
 * @LastEditTime: 2022-05-07 23:44:01
 * @LastEditors: chenxuan
-->
<template>
    <div>
        <h1>HOME</h1>
        <!-- <Buttons/> -->
        <component  :is="step" />
        <button @click="hehe">加载远程组件</button>
              
    </div>
</template>
<script>
export default {
    name:"home",
    data(){
        return{
            step:"step1",
            data:{
                name:"陈轩",
                age:18,
                
            }
        }
    },
    components:{
        step1:()=> import('./hehe.vue'),
        // Buttons: () => import("app1/Buttons")
    },
    mounted() {
        // console.log(qs.stringify(this.data))
        this.loadScript('http://localhost:3001/app1.js')
        
    },
    methods: {
        loadScript(src){
            return new Promise((res, rej) =>{
                const script = document.createElement('script')
                script.src = src;
                script.onload = res;
                script.onfaild = rej
                document.body.appendChild(script);
            })
            .then(()=>{
                this.hehe()
            })
        },
        hehe(){
            this.step=this.loadComponent('app1','Buttons')
        },
        loadComponent(scope, module){
            return async () => {
                await __webpack_init_sharing__('default');
                const container = window[scope]; 
                await container.init(__webpack_share_scopes__.default);
                const factory = await window[scope].get(module);
                const Module = factory();
                return Module;
            };
        }
    },
}
</script>