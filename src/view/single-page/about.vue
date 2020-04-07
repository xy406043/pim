<template>
  <div class="show_detail">
    <div class="column-center thisTitle flex-row">
      <!-- 顶部 -->
      <div class="flex-all-center">
        <div class="title flex-all-center">关于</div>
      </div>
    </div>
    <Divider />
    <!-- 关于 -->
    <div class="about-content">
      <div class="about-title theme_font">什么是个人信息</div>
      <div
        class="main-about theme_font"
      >个人信息,是指以电子或者其他方式记录的能够单独或者与其他信息结合识别自然人个人身份的各种信息,包括但不限于自然人的姓名、出生日期、身份证件号码、个人生物识别信息、住址、电话号码等</div>
      <div class="show-content">
        个人信息主要包括以下类别：
        <br />1. 基本信息。为了完成大部分网络行为，消费者会根据服务商要求提交包括姓名、性别、年龄、身份证号码 、电话号码 、Email地址及家庭住址等在内的个人基本信息，有时甚至会包括婚姻、信仰、职业、工作单位、收入等相对隐私的个人基本信息。
        <br />2. 设备信息。主要是指消费者所使用的各种计算机终端设备（包括移动和固定终端）的基本信息，如位置信息、Wifi列表信息、Mac地址、CPU信息、内存信息、SD卡信息、操作系统版本等。
        <br />3. 账户信息。主要包括网银帐号、第三方支付帐号，社交帐号和重要邮箱帐号等。
        <br />4. 隐私信息。主要包括通讯录信息、通话记录、短信记录、IM应用软件聊天记录、个人视频、照片等。
        <br />5. 社会关系信息。这主要包括好友关系、家庭成员信息、工作单位信息等。
        <br />6. 网络行为信息。主要是指上网行为记录，消费者在网络上的各种活动行为，如上网时间、上网地点、输入记录、聊天交友、网站访问行为、网络游戏行为等个人信息。
        <br />
      </div>
      <div>
        <div class="about-title theme_font">本系统相关</div>
        <b class="font-bolder theme_font font-16">为学生毕业设计作品，对于安全性并没有什么保障，请注意不要在此存储重要信息，仅作为日常使用即可!!!!</b>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @此文件位于右上角
 * @标明对于此项目的一些介绍以及相关的其它信息
 * 使用方面的解释
 */
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.show_detail {
  .ivu-divider {
    margin: 0;
  }
}
.thisTitle {
  height: 50px;
  padding: 5px 20px;
  background: rgba(168, 204, 204, 0.13);
}
.title {
  font-size: 26px;
  font-weight: bolder;
  text-align: center;
}
.about-content {
  padding: 16px 24px;
}
.about-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.show-content {
  // text-indent: 25px;
  padding: 0 24px;
  font-weight: bold;
  font-kerning: unset;
  font-size: 18px;
}
.main-about {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 0 24px;
  text-indent: 40px;
  font-size: 20px;
  font-weight: bolder;
}
</style>