<template>
    <div class="short_router">
        
    </div>
</template>

<script>
import {changeTheme} from "@/libs/theme"
    export default {
        name: '',
        data() {
            return {
                
            }
        },
        methods:{
            /**
             * 改变颜色主题 函数
             * theme_中所有主题均为全局配置
             */
            changeV(item){
            changeTheme(item)
               
            }
        }
    }
</script>logi

<style lang="less">
    
</style>