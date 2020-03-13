
<template>
    <div>
        <div class="title column-center">
            <Icon size="28" type="md-browsers" /><span class="ml-20  theme_font">我的记事库</span>
        </div>
        <Divider style="margin:0;background:#000000;height:3px" />
        <div class="allContent">
            <div class="password mr-20 mb-20 option" @click="toNote"> 
                <div >
                <Icon size="80" class="code-border" type="md-book" />
                </div>
                <div class="code-font mt-10 ">日记本</div>
            </div>
            <div class="password mr-20 mb-20 option" @click="toAddress"> 
                <div>
                <Icon size="80" class="code-border" type="md-people" />
                </div>
                <div class="code-font mt-10 ">通讯录</div>
            </div>
             <div class="password mr-20 mb-20 option" @click="toBookMarking"> 
                <div>
                <Icon size="80" class="code-border" type="md-bookmarks" />
                </div>
                <div class="code-font mt-10 ">网址收藏</div>
            </div>

        </div>
    </div>
</template>

<script>
/**
 * @记事库
 * @包含网址收藏日记联系人等
 *
 */
import {securityApi} from "@/api"
import Crypto from "@/libs/crypto"
    export default {
        name: '',
        data() {
            return {
            }
        },
        mounted(){

        },
        methods:{
            toNote(){
                this.$router.push({name:"note"})
            },
            toAddress(){
                this.$router.push({name:"address-book"})
            },
            toBookMarking(){
                this.$router.push({name:"bookmarking"})
            }


        }
    }
</script>

<style lang="less" scoped>
    .title{
        padding:12px;
        // text-align:center;
        align-items: center;
        font-weight: bolder;
        justify-content: center;
        font-size:26px;
    }
    .allContent{
        padding:20px;
    }
    .code-border{
        border: 3px solid gray;
        border-radius: 12px;
    }
    .password{
        display: inline-block;
    }
    .code-font{
        text-align: center;
    
    }
</style>