<template>
  <div>

    <div class="search_blog_input">
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">
          <el-input class="content_for_search"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="search_content">
          </el-input></div>
        </el-col>
        <el-col :span="5"><div class="grid-content ">
          <el-button class="search_button" type="primary" icon="el-icon-search" @click="submitSearch()">搜索</el-button>
          <el-button class="reset_button" type="info"  @click="resetSearch()">重置</el-button>
        </div></el-col>
      </el-row>
    </div>

    <div class="edit_button">
      <el-button type="primary" icon="el-icon-edit" @click="addBlog">新增</el-button>
    </div>




    <template>
      <el-table
          :data=this.blogs
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="id"
            label="ID"
            width="50">
        </el-table-column>
        <el-table-column
            fixed
            prop="category"
            label="类别"
            width="50">
        </el-table-column>
        <el-table-column
            fixed
            prop="readNumbers"
            label="阅读量"
            width="70">
        </el-table-column>
        <el-table-column
            prop="userId"
            label="创建者"
            width="70">
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            width="300">
        </el-table-column>
        <el-table-column
            prop="description"
            label="描述"
            width="300">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="50">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="更新时间"
            width="180">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="250">
          <template slot-scope="scope">
            <el-button @click="selectBlog(scope.row.id)" type="primary" size="small">查看</el-button>
            <el-button @click="editBlog(scope.row.id)" type="warning" size="small">编辑</el-button>
            <el-button @click="blogRecycle(scope.row.id)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

<!--    <div class="block">-->
<!--      <el-timeline class="m_bloglist">-->
<!--        <el-timeline-item :timestamp=blog.updateTime placement="top" v-for="blog in blogs">-->
<!--          <el-card>-->
<!--            <h4>-->
<!--              <router-link :underline="false" :to="{name :'BlogDetail', params :{blogId:blog.id}}">-->
<!--                {{ blog.title }}-->
<!--              </router-link>-->
<!--            </h4>-->
<!--            <p>{{ blog.description }}</p>-->
<!--            <el-button type="text" @click="blogRecycle(blog.id)">删除</el-button>-->
<!--          </el-card>-->
<!--        </el-timeline-item>-->
<!--      </el-timeline>-->
<!--    </div>-->

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
  name: "ArticleList",
  data(){
    return {
      blogs: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      search_content: ''
    }
  },
  created() {
    console.log(this.$route.query.search_content)
    this.search_content = this.$route.query.search_content
    this.page(this.currentPage)
  },
  methods:{
    page(currentPage){
      const _this= this
      console.log("/blogs?currentPage="+currentPage+"&searchContent="+this.search_content)
      _this.$axios.get("/blogs?currentPage="+currentPage+"&searchContent="+this.search_content).then(res=>{
        _this.blogs = res.data.data.records
        _this.currentPage=res.data.data.current
        _this.total=res.data.data.total
        _this.pageSize=res.data.data.size
      })
    },
    handleClick(row) {
      console.log(row);
    },
    submitSearch(){
      this.page(1);
    },
    resetSearch(){
      this.search_content='';
      this.page(1);
    },
    selectBlog(blogId){
      this.$router.push({name:'ArticleDetail',params:{blogId:blogId}})
    },
    editBlog(blogId){
      this.$router.push({name:'ArticleEdit',params:{blogId:blogId}})
    },
    addBlog(){
      this.$router.push('/articleEdit')
    },
    blogRecycle(blogId){
      const _this= this
      this.$axios.post("/blog/recycle/"+blogId,null,{
        headers:{
          "token": localStorage.getItem("token")
        }
      }).then(res =>{
        console.log(res)
        const code = res.data.code
        const msg =res.data.msg
        if(code == 200){
          _this.$message({
            showClose: true,
            message: msg,
            type: 'success'
          });
          _this.$router.go(0)
        }
        else{
          _this.$message({
            showClose: true,
            message:msg,
            type: 'error'
          })
        }

      })
    }
  }
}
</script>

<style scoped>


.mpage{
  text-align: center;
}

.edit_button{
  text-align: left;
  margin-bottom: 10px;
  margin-top: 10px;
}

</style>