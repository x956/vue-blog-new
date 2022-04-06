<template>
  <div>
    <el-container style="margin: 0 auto">
      <bar></bar>
      <el-main>
        <el-container style="margin-left: 20px">
          <el-aside>
            <el-scrollbar style="width: 100%">
              <hot-blog></hot-blog>
            </el-scrollbar>
          </el-aside>
          <el-main class="main-blog">
            <div id="myBlogList">
              <div v-for="blog in blogs">
                <blogOverView :id="blog.id" :title="blog.title" :description="blog.description" :time="blog.updateTime"
                              :readNumbers="blog.readNumbers"
                              :discussCount="0" :tags="blog.categoryId"
                              :createBy="blog.userId"/>
              </div>

              <el-pagination class="mpage"
                             background
                             layout="prev, pager, next"
                             :current-page="currentPage"
                             :page-size="pageSize"
                             :total="total"
                             @current-change="page"
              >
              </el-pagination>
            </div>
          </el-main>
          <el-aside style="margin-right: 20px">
              <el-scrollbar style="width: 100%">
                <hot-blog></hot-blog>
              </el-scrollbar>
          </el-aside>
        </el-container>
      </el-main>
      <el-footer>
        <div class="line"></div>
          <p id="txt">
            <el-link :underline="false" type="info">© 2022 喜羊羊的博客&nbsp;&nbsp;</el-link>
         </p>
        <div class="line"/>
      </el-footer>
    </el-container>
  </div>

</template>

<script>

import blogOverView from "@/components/blogOverView";
import bar from "@/components/bar";
import HotBlog from "@/components/hotBlog";
import bottom from "@/components/bottom";

export default {
  name: "Blogs",
  components:{HotBlog, blogOverView,bar,bottom},
  data(){
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
      search_content: ''
    }
  },
  created() {
    this.search_content = this.$route.query.search_content
    this.page(this.currentPage)
  },
  methods:{
    page(currentPage){
      const _this= this
      console.log("/blogs?currentPage="+currentPage+"&searchContent="+this.search_content)
      _this.$axios.get("/blogs?currentPage="+currentPage+"&searchContent="+this.search_content).then(res=>{
        console.log(res)
        _this.blogs = res.data.data.records
        _this.currentPage=res.data.data.current
        _this.total=res.data.data.total
        _this.pageSize=res.data.data.size
      })
    },
    submitSearch(){
      this.$router.push({path:'/blogs', query:{search_content: this.search_content}})
      this.$router.go(0);
    },
    toblogDetail(blogId){
      this.$router.push({name:'BlogDetail',params:{blogId:blogId}})
    },
    getTime(time) {//将时间戳转化为几分钟前，几小时前
      return date.timeago(time);
    },
  }
}
</script>

<style scoped>

.block{
  margin: 0 auto;
  text-align: left;
  min-height: 700px;
  width: 700px;
  align-self: center;

}

.mpage{
  text-align: center;
  margin-top: 20px;
}
/*.search_blog_input{*/
/*  */
/*}*/
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  /*position: relative;*/
}
.el-aside {
  background-color: #E9EEF3;
  color: #333;
  /*display: block;*/
  /*position: absolute;*/
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  /*overflow-y: scroll;*/
  /*position: absolute;*/
}
.main-blog{
  /*overflow-y: scroll;*/
  /*position: absolute;*/
}
</style>