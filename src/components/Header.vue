<template>
  <div>

    <div class="search_blog_input">
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-input class="content_for_search"
                 placeholder="请输入内容"
                 prefix-icon="el-icon-search"
                 v-model="search_content">
      </el-input></div></el-col>
      <el-col :span="12"><div class="grid-content ">
        <el-button class="search_button" type="primary" icon="el-icon-search" @click="submitSearch()">搜索</el-button>
      </div></el-col>
    </el-row>
    </div>

    <div class="m-content">
      <h3>欢迎来到xyy的博客</h3>
      <div>{{ user.nickname }}</div>
      <div v-if="hasLogin" class="maction">
        <span> <el-link href="/blogs">主页</el-link></span>
        <el-divider direction="vertical"></el-divider>
        <span> <el-link type="success" href="/blog/add">发表博客</el-link></span>
        <el-divider direction="vertical"></el-divider>
        <span v-show="!hasLogin"> <el-link type="primary" href="/login">登录</el-link></span>
        <span v-show="hasLogin"> <el-link type="warning" @click="logout">退出</el-link></span>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "Header",
  data(){
    return{
      user: {
        nickname : ''
      },
      hasLogin : false,
      search_content : ''
    }
  },

  //这里有个问题，再次刷新额时候并没有调用
  created() {
    if(this.$store.getters.getNickName){
      this.hasLogin=true
      this.user.nickname=this.$store.getters.getNickName
    }
  },
  methods:{
    logout(){
      const _this = this
      this.$axios.get("/user/logout",{
        headers:{
          "token":localStorage.getItem("token")
        }
      }).then(res =>{
        _this.$store.commit('REMOVE_INFO')
        _this.$router.push('/login')
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

.search_blog_input{
  width: 300px;

}

.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


</style>