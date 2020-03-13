<template>
    <div class="myAdd">
        <div class="title">
            您没有二级密码，请先注册二级密码才能使用密码箱功能
        </div>
        <div class="mt-20">
            <div class="column-center mb-20">
                 <div class="middle-width">请输入二级密码:</div>
                 <div class="form-width"><Input type="password" v-model="pass1" placeholder="密码"></Input></div>
            </div>
             <div class="column-center">
                 <div class="middle-width">请再次输入:</div>
                 <div class="form-width"><Input type="password" v-model="pass2" placeholder="密码"></Input></div>
            </div>
        </div>
        <div class="mt-10">
            <Button type="primary" @click="handleAdd">确认</Button>
        </div>

    </div>
</template>

<script>
import Crypto from "@/libs/crypto"
import {securityApi} from "@/api"
    export default {
        name: 'add-second',
        data() {
            return {
                pass1:"",
                pass2:""
                
            }
        },
        mounted(){},
        methods:{
            handleAdd(){
                let  p ={
                    password:Crypto.encode(this.pass1)
                }
                if(this.pass1==='' || this.pass2===''){
                    this.$Message.waiting("请输入密码")
                    return
                }
                if(this.pass1!==this.pass2){
                    this.$Message.waiting("两次输入不一致")
                    return
                }
                securityApi.addSecondCode(p).then(res =>{
                    if(res.code===0){
                        this.$Message.success("输入成功")
                        this.$router.push({name:"security-page"})
                    }else{
                        this.$Message.error(res.errMsg)
                    }
                })


            }
        }
    }
</script>

<style lang="less" scoped>
    .title{
        font-size:20px;
        font-weight:bolder;
    }
    .myAdd{
        padding:30px
    }
</style>