<template>
  <section class="container">
    <div class="quill-editor"
         :content="content"
         @change="onEditorChange($event)"
         @blur="onEditorBlur($event)"
         @focus="onEditorFocus($event)"
         @ready="onEditorReady($event)"
         v-quill:myQuillEditor="editorOption">
    </div>
  </section>
</template>

<script>
  export default {
    name: 'vue-editor',
    props: {
      value: String
    },
    data () {
      return {
        content: '',
        editorOption: {
          // some quill options
          modules: {
            toolbar: true
            // [
            //   ['bold', 'italic', 'underline', 'strike'],
            //   ['blockquote', 'code-block'],
            //   ['header', 'indent', 'list', 'align']
            // ]
          }
        }
      }
    },
    watch: {
      value(val) {
        this.content = val
        this.myQuillEditor.pasteHTML(val)
      },
      content(val) {
        this.$emit("input", val)
      }
    },
    mounted() {
      // console.log('---------app init, my quill insrance object is:', this.myQuillEditor)
      if (this.value) this.myQuillEditor.pasteHTML(this.value)
    },
    methods: {
      onEditorBlur(editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        // console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        this.content = html
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    max-height: 464px;
    margin: 0 auto;
    padding: 20px 0 0 0;
  }
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
