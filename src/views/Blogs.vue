<template>
  <div>
    <el-container style="margin: 0 auto">
      <bar   v-on:submitSearch="getSearchContent"></bar>
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
                <blogOverView :id="blog.id" :title="blog.title" :description="blog.description|ellipsis" :time="blog.updateTime"
                              :readNumbers="blog.readNumbers"
                              :discussCount="0" :tags="blog.category"
                              :createBy="blog.createBy"/>
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
                <tagsList v-on:submitCategoryId="getCategoryId"></tagsList>
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
import tagsList from "@/components/tagsList";

export default {
  name: "Blogs",
  components:{HotBlog, blogOverView,bar,bottom,tagsList},
  data(){
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
      search_content: '',
      categoryId: ''
    }
  },
  filters: {
    /**
     * 文件名超出24个字符后显示省略号
     */
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 100) {
        return value.slice(0, 100) + '...'
      }
      return value
    }
  },
  created() {
    this.search_content=''
    this.categoryId = ''
    this.page(this.currentPage)
  },
  methods:{
    page(currentPage){
      const _this= this
      console.log("/blogs?currentPage="+currentPage+"&searchContent="+this.search_content+"&categoryId="+this.categoryId)
      _this.$axios.get("/blogs/blogVO?currentPage="+currentPage+"&searchContent="+this.search_content+"&categoryId="+this.categoryId).then(res=>{
        console.log(res)
        if(res.data.data !=null) {
          _this.blogs = res.data.data.records
          _this.currentPage = res.data.data.current
          _this.total = res.data.data.total
          _this.pageSize = res.data.data.size
        }else{
          _this.$message({
            showClose: true,
            message: "未查询到相关信息",
            type: 'error'
          });
        }
      })
    },
    // submitSearch(){
    //   this.$router.push({path:'/blogs', query:{search_content: this.search_content}})
    //   this.$router.go(0);
    // },
    toblogDetail(blogId){
      this.$router.push({name:'BlogDetail',params:{blogId:blogId}})
    },
    getTime(time) {//将时间戳转化为几分钟前，几小时前
      return date.timeago(time);
    },
    getSearchContent(search_content){
      console.log("这里是getSearchContent",search_content)
      this.categoryId=''
      this.search_content=search_content
      this.page(this.currentPage)
      // this.$router.go(0)
    },
    getCategoryId(categoryId){
      this.search_content = ''
      this.categoryId = categoryId
      this.page(this.currentPage)
    }
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