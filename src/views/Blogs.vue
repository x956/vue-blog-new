<template>
  <div>
    <div class="search_blog_input">
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">
          <el-input class="content_for_search"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="search_content">
          </el-input></div></el-col>
        <el-col :span="5"><div class="grid-content ">
          <el-button class="search_button" type="primary" icon="el-icon-search" @click="submitSearch()">搜索</el-button>
        </div></el-col>
      </el-row>
    </div>


    <div class="block">
      <el-timeline class="m_bloglist">
        <el-timeline-item :timestamp=blog.updateTime placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
            <router-link :underline="false" :to="{name :'BlogDetail', params :{blogId:blog.id}}">
              {{ blog.title }}
            </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
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


</template>

<script>

export default {
  name: "Blogs",
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
}
/*.search_blog_input{*/
/*  */
/*}*/

</style>