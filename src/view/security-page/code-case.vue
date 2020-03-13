
<template>
    <div>
        <div class="title column-center">
            <Icon size="28" type="md-briefcase" /><span class="mr-20 ">我的保险箱</span>
        </div>
        <Divider style="margin:0;background:#000000;height:3px" />
        <div class="allContent">
            <div class="password mr-20 mb-20 option" @click="toCodeBook"> 
                <div >
                <Icon size="80" class="code-border" type="md-key" />
                </div>
                <div class="code-font mt-10 ">密码本</div>
            </div>
            <div class="password mr-20 mb-20 option" @click="toFolder"> 
                <div>
                <Icon size="80" class="code-border" type="ios-folder" />
                </div>
                <div class="code-font mt-10 ">文件夹</div>
            </div>
             <div class="password mr-20 mb-20 option-disabled" > 
                <div>
                <Icon size="80" class="code-border" type="md-images" />
                </div>
                <div class="code-font mt-10 ">相册</div>
            </div>
            <div class="password mr-20 mb-20 option-disabled"> 
                <div>
                <Icon size="80" class="code-border" type="md-bookmarks" />
                </div>
                <div class="code-font mt-10 ">书签</div>
            </div>
             <div class="password mr-20 mb-20 option-disabled"> 
                <div>
                <Icon size="80" class="code-border" type="md-infinite" />
                </div>
                <div class="code-font mt-10 ">外置</div>
            </div>
            <div class="password mr-20 mb-20 option-disabled"> 
                <div>
                <Icon size="80" class="code-border" type="logo-snapchat" />
                </div>
                <div class="code-font mt-10 ">百鬼</div>
            </div>
            <div class="password mr-20 mb-20 option-disabled"> 
                <div>
                <Icon size="80" class="code-border" type="md-analytics" />
                </div>
                <div class="code-font mt-10 ">资金</div>
            </div>
            <div class="password mr-20 mb-20 option-disabled"> 
                <div>
                <Icon size="80" class="code-border" type="logo-freebsd-devil" />
                </div>
                <div class="code-font mt-10 ">魔鬼</div>
            </div>
            <div class="password mr-20 mb-20 option-disabled"> 
                <div>
                <Icon size="80" class="code-border" type="md-paw" />
                </div>
                <div class="code-font mt-10 ">动物世界</div>
            </div>
            <div class="password mr-20 mb-20 option-disabled"> 
                <div>
                <Icon size="80" class="code-border" type="logo-playstation" />
                </div>
                <div class="code-font mt-10 ">小破站</div>
            </div>
            <div class="password mr-20 mb-20 option-disabled"> 
                <div>
                <Icon size="80" class="code-border" type="md-ribbon" />
                </div>
                <div class="code-font mt-10 ">奖章</div>
            </div>
            <div class="password mr-20 mb-20 option-disabled"> 
                <div>
                <Icon size="80" class="code-border" type="md-switch" />
                </div>
                <div class="code-font mt-10 ">轮转</div>
            </div>
            

        </div>


        <Modal  v-model="verifyModal" footer-hide transfer :styles="{top: '300px'}" :closable="false" :mask-closable="false">
           <div class="column-center">
               <div class="middle-width">
                   请输入密码:
               </div>
               <div class="form-width">
                 <Input type="password" v-model="secondCode" placeholder="请输入二次密码"></Input>
               </div>
           </div>
           <div class="mt-10 ml-20">
               <Button type="primary" @click="verifyCode">确认</Button>
           </div>
        </Modal>
    </div>
</template>

<script>
/**
 * @密码箱
 * @重要文件放置处
 */
import {securityApi} from "@/api"
import Crypto from "@/libs/crypto"
    export default {
        name: '',
        data() {
            return {
                sCode:true,
                secondCode:"",
                verifyModal: false, // 输入二级密码进行校验
            }
        },
        mounted(){
            this.getSecondCode()
            let sCode= localStorage.getItem("sCode")
            if(sCode){
                this.verifyModal=false
            }else{
                this.verifyModal=true
            }
        },
        methods:{
            getSecondCode(){
                securityApi.getSecondCode().then(res => {
                    if(res.result.sCode===false){
                        this.$router.push({name:"add-second"})
                    }
                })

            },
            verifyCode(){
                let p ={
                    password : Crypto.encode(this.secondCode)
                }
                securityApi.verifyCode(p).then(res => {
                    if(res.code===0){
                        localStorage.setItem("sCode",true)
                        this.$Message.success("校验成功")
                        this.verifyModal=false
                    }else{
                        this.$Message.error(res.errMsg)
                    }
                })
            },
            toCodeBook(){
                this.$router.push({name:"code-book"})
            },
            toFolder(){
                this.$router.push({name:"folder"})
            },
            toPhoto(){
                this.$router.push({name:"photo"})
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