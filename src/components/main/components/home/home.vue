<template>
<div>
   <font class="option font-m ml-20" @click="toHome">首页</font>
</div>
    
</template>

<script>
/**
 * 左上角角色位置待定
 */

    export default {
        name: 'game',
        data() {
            return {
                
            }
        },
        methods:{
            toHome(){
                this.$router.push({
                    name:"home"
                })
            }
        }
    }
</script>

<style  scoped>
    
</style>