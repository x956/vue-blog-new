<template>
  <div>

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
            <el-button @click="handleClick(scope.row)" type="warning" size="small">编辑</el-button>
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
    selectBlog(blogId){
      this.$router.push({name:'ArticleDetail',params:{blogId:blogId}})
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


</style>