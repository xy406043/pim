
<template>
  <div>
    <quill-editor
      class="editor"
      :value="content"
      ref="myTextEditor"
      @change="onEditorChange"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>
    <!-- <div class="output code">
      <code class="hljs" v-html="contentCode"></code>
    </div>
    <div class="output ql-snow">
      <div class="ql-editor" v-html="content"></div>
    </div> -->
  </div>
</template>

<script>
/**
 * @配置起来优点复杂了还是不用了吧
 * @分了多个主题
 * @此主题用的是snow
 */
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "highlight.js/styles/tomorrow.css";
import dedent from "dedent";  //语法解析器
import hljs from "highlight.js"; //代码高亮
import debounce from "lodash/debounce"; //防抖函数
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      name: "quill-example-snow",
      title: "Theme: snow",
      /**
       * content里视频播放不出是因为用的是YouTube的源
       */
        content: dedent`
            <h1 class="ql-align-center"><span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am snow example! </span></h1><p><br></p><p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p><p><br></p><p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p><p><br></p><p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p><p><br></p><p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p><p><br></p><pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">10</span>;
            <span class="hljs-keyword">const</span> editorOption = { <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> hljs.highlightAuto(text).value };</pre><p><br></p><p><span class="ql-font-serif">Every flight begins with a fall.</span></p><p><br></p><p><a href="https://surmon.me/" rel="noopener noreferrer" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe><p><br></p><p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p><p><br></p><p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p><p><br></p><p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
          `,
    //   content: "sasasas",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  mounted() {
    // console.log("this is Quill instance:", this.editor);
  },
  methods: {
    onEditorChange: debounce(function(value) {
      this.content = value.html;
      this.$emit("showContent",this.content)
      console.log("内容",this.content)
    }, 466),
    // onEditorChange(value) {
    //   console.log("?????", value);
    //   this.content = value.html;
    //   console.log("内容", this.content);
    // },
    onEditorBlur(editor) {
    //   console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
    //   console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
    //   console.log("editor ready!", editor);
    },
    setText(val){
        this.$refs.myTextEditor.quill.setText(val)
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  }
};
</script>
<style lang="less" scoped>
.example {
  display: flex;
  flex-direction: column;
  .editor {
    height: 40rem;
    overflow: hidden;
  }
  .output {
    width: 100%;
    height: 20rem;
    margin: 0;
    border: 1px solid #ccc;
    overflow-y: auto;
    resize: vertical;
    &.code {
      padding: 1rem;
      height: 16rem;
    }
    &.ql-snow {
      border-top: none;
      height: 24rem;
    }
  }
}
</style>