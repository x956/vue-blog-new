<template>

  <el-card id="hotBlog">
    <!--<hr />-->
    <p>
      <span style="color:#67C23A" class="el-icon-document">热门文章</span>
    </p>
    <hr />
    <div v-for="blog in hotBlog">
      <el-link type="info" style="margin: 5px 0" :underline="false"  @click="toblogDetail(blog.id)">
        《{{blog.title}}》 浏览量: {{blog.readNumbers}}
      </el-link>
    </div>
    <br/>
  </el-card>

</template>

<script>
export default {
  name: "hotBlog",
  data(){
    return{
      hotBlog:[]
    }
  },
  created() {
    const _this = this
    this.$axios.get("/blogs/hotBlogs").then(res=>{
      this.hotBlog=res.data.data
    })
  },
  methods:{
    toblogDetail(blogId){
      this.$router.push({name:'BlogDetail',params:{blogId:blogId}})
    }
  }
}
</script>

<style scoped>
#hotBlog {
  /*-moz-box-shadow: 0px 6px 0px #333333;*/
  /*-webkit-box-shadow: 0px 6px 0px #333333;*/
  /*box-shadow: 0px 3px 10px #333333;*/
  text-align: left;
  width: 300px;
  /*margin: 0px 0;*/
}
</style>