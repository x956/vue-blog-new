<template>
  <div>

    <div class="mblog">
      <h2> {{ blog.title }} </h2>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>

    </div>

  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
export default {
  name: "BlogDetail",
  data(){
    return{
      blog:{
        id: '',
        title: '',
        content: ''
      },
    }
  },
  created() {
    const blogId=this.$route.params.blogId
    const _this = this
    this.$axios.get("/blogs/"+blogId).then(res =>{
      const blog = res.data.data
      _this.blog.id = blog.id
      _this.blog.title = blog.title

      //渲染获得的markdown类型
      var MarkdownIt = require("markdown-it")
      var md = new MarkdownIt()
      var result=md.render(blog.content)

      _this.blog.content = result

      // _this.ownBlog = (blog.userId == _this.$store.getters.getUser.id)

    })
  }

}
</script>

<style scoped>
.mblog{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  text-align: left;
  padding: 20px 20px;
}
</style>