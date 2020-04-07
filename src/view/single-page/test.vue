<template>
  <div>
    <h1>Markdown编辑器：mavon-editor</h1>
    <MavonEditor></MavonEditor>
    <h1>富文本编辑器: <a class="theme_font" href="https://github.surmon.me/vue-quill-editor/" _target="blank"> quill-editor</a></h1>
    <div class="quillEditor">
      <QuillEditor></QuillEditor>
    </div>
  </div>
</template>

<script>
/**
 * @测试页面
 * @可以搭载不同组件
 */
import MavonEditor from "_c/editor/mavon-editor.vue";
import QuillEditor from "_c/editor/quill-editor.vue";
export default {
  name: "test",
  components: {
    MavonEditor,
    QuillEditor
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
// .quillEditor {
//   height: 300px;
//   .ql-container {
//     height: 250px;
//   }
// }
</style>