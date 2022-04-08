<template>
  <div>
    <bar v-on:submitSearch="getSearchContent"></bar>
<!--    <div class="mblog">-->
<!--      <h2> {{ blog.title }} </h2>-->
<!--&lt;!&ndash;      <el-divider></el-divider>&ndash;&gt;-->
<!--      <div class="markdown-body" v-html="blog.content"></div>-->

<!--    </div>-->
    <el-card id="blog">
      <el-link :underline="false" @click="back()"><i class="el-icon-back">Back</i></el-link>
      <!--为了blogId值改变事件会被watch到-->
      <p style="display: none">{{blog.id = this.$route.params.blogId}}</p>

      <div id="title">
        <h2 style="text-align: center">{{blog.title}}</h2>
      </div>
      <div style="text-align: center">
        <p>
          <span class="el-icon-time hidden-xs-only">&nbsp;{{blog.updateTime}}</span>

          <span class="el-icon-view hidden-xs-only" style="margin-left: 100px">&nbsp;{{blog.readNumbers}}</span>

          <span class="el-icon-user-solid hidden-xs-only" style="margin-left: 150px">&nbsp;{{blog.createBy}}</span>

          <el-tag type="success" style="margin-left: 150px">{{blog.category}}</el-tag>
        </p>

<!--        多标签写法-->
<!--        <p>-->
<!--          <span>-->
<!--            <span v-for="tag in catchTagName(tags)">-->
<!--              <el-tag type="success" style="margin-left: 5px">{{tag}}</el-tag>-->
<!--            </span>-->
<!--          </span>-->
<!--        </p>-->
      </div>


      <mavon-editor v-model="blog.content" id="editor" :toolbarsFlag="false" :subfield="false" defaultOpen="preview"/>
      <!-- 以下是预览模式配置 -->
      <!--:toolbarsFlag="false"  :subfield="false" defaultOpen="preview"-->
    </el-card>

  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import bar from "@/components/bar";
export default {
  name: "BlogDetail",
  components:{bar},
  data(){
    return{
      blog:{
        id: '',
        title: '',
        content: '',
        category: '',
        updateTime: '',
        createBy:'',
        readNumbers:''
      },
      search_content: ''
    }
  },
  created() {
    const blogId=this.$route.params.blogId
    const _this = this
    this.$axios.get("/blogs/"+blogId).then(res =>{
      const blog = res.data.data
      _this.blog.id = blog.id
      _this.blog.title = blog.title
      _this.blog.category=blog.category
      _this.blog.createBy=blog.createBy
      _this.blog.updateTime = blog.updateTime
      _this.blog.readNumbers = blog.readNumbers
      //渲染获得的markdown类型
      var MarkdownIt = require("markdown-it")
      var md = new MarkdownIt()
      var result=md.render(blog.content)
      _this.blog.content = result

      // _this.ownBlog = (blog.userId == _this.$store.getters.getUser.id)

    })
  },
  methods:{
    back() {
      history.back()
    },
    getSearchContent(search_content){
      console.log("这里是getSearchContent",search_content)
      this.search_content=search_content
      this.$router.push({name:'Blogs',params: {searchContent:search_content}})
    }
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
#blog {
  margin: 20px 5% 0 5%;
  padding: 20px;
  text-align: left;
}
</style>