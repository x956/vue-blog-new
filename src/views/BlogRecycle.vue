<template>
  <div>
    <Header></Header>

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
              <el-button type="text" @click="blogRetrieve(blog.id)"><p style="color: green"><i class="el-icon-arrow-left"></i>取回</p></el-button>
              <el-button type="text" @click="blogRecycleDetete(blog.id)"><p style="color: red">彻底删除<i class="el-icon-arrow-right el-icon--right"></i></p></el-button>
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

import Header from "../components/Header";
export default {
  name: "Blogs",
  components: {Header},
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
    console.log(this.$route.query.search_content)
    this.search_content = this.$route.query.search_content
    this.page(this.currentPage)
  },
  methods:{
    page(currentPage){
      const _this= this
      _this.$axios.get("/blog/getRecycle",{
        headers:{
          "token":localStorage.getItem("token")
        }
      }).then(res=>{
        _this.blogs = res.data.data.records
        _this.currentPage=res.data.data.current
        _this.total=res.data.data.total
        _this.pageSize=res.data.data.size
      })
    },
    blogRecycleDetete(blogId){
      const _this= this
      this.$axios.post("/blog/delete/"+blogId,null,{
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
    },
    blogRetrieve(blogId){
      const _this= this
      this.$axios.post("/blog/retrieveBlog/"+blogId,null,{
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