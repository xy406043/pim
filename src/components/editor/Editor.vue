<template>
  <div class="editor-wrapper">
    <div id="editorElem"></div>
  </div>
</template>

<script>
import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
import { oneOf } from "@/libs/tools";
export default {
  name: "Editor",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      customMenus: [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "list", // 列表
        "justify", // 对齐方式
        "table", // 表格
        "image", // 插入图片
        "undo", // 撤销
        "redo", // 重复
        "link" //插入链接
        // "video", //插入视频
        // "code", //插入代码
        // "emoticon" //表情
      ]
    };
  },
  methods: {
    clearEditor() {
      // this.editor.destroy()
    },
    //两种输出形式
    setHtml(val) {
      this.editor.txt.html(val);
    },
    setText(val) {
      this.editor.txt.text(val);
    }
  },
  mounted() {
    //   设置Editor
    if (!this.editor) {
      this.editor = new Editor(`#editorElem`);
    }
    this.editor.customConfig.onchange = html => {
      /**
       * @html已经定义好了
       */
      let text = this.editor.txt.text();
      this.$emit("on-change", html);
    };
    this.editor.customConfig.zIndex = 100
    // this.editor.customConfig.zIndex = 999999999
    if (this.customMenu && this.customMenu.length > 0) {
      this.editor.customConfig.menus = this.customMenu;
    }
    this.editor.create();
  }
};
</script>

<style lang="less">
.editor-wrapper {
  overflow: scroll;
  flex-wrap: wrap !important;
  // max-width: 400px;
}
</style>
