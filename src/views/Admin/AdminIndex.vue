<template>
  <div class="indexPage">
    <div class="containerWrapper">
      <div class="sidebarWrapper">
        <el-menu default-active="/articleList" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="collapseStatus">
          <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">工作平台</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">博客管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/articleList" @click="goTo('/articleList')">文章管理</el-menu-item>
              <el-menu-item index="/articleRecycle" @click="goTo('/articleRecycle')">回收站管理</el-menu-item>
              <el-menu-item index="/tagsList" @click="goTo('/tagsList')">标签管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
<!--          <el-menu-item index="/demo" @click="goTo('/articleList')">-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span slot="title">文章管理</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="/demo2" @click="goTo('/demo2')">-->
<!--            <i class="el-icon-document"></i>-->
<!--            <span slot="title">导航三</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="4">-->
<!--            <i class="el-icon-setting"></i>-->
<!--            <span slot="title">导航四</span>-->
<!--          </el-menu-item>-->
        </el-menu>
      </div>
      <div class="contentWrapper">
        <div class="mainHeader">
          <!--侧边导航栏控制按钮-->
          <span><i class="el-icon-s-fold" @click="handleFold()"></i></span>
          <div class="userCenter">
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <div class="userCenter">
                <el-avatar :size="30" :src="avaUrl"></el-avatar>
                <span class="el-dropdown-link">
                  {{ username }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="mainContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminIndex',
  data () {
    return {
      isCollapse: false,
      collapseStatus: false,
      avaUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      username: localStorage.getItem('nickname')
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleFold () {
      this.collapseStatus = !this.collapseStatus
    },
    goTo (path) {
      this.$router.replace(path)
    },
    logout(){
      this.$confirm('确认退出?', '提示', {})
          .then(() => {
            const _this = this
            this.$axios.get("/user/logout",{
              headers:{
                "token":localStorage.getItem("token")
              }
            }).then(res =>{
              _this.$store.commit('REMOVE_INFO')
              _this.$router.push('/login')
            })
          })
          .catch(() => { });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.containerWrapper{
  display: flex;
  flex-direction: row;
}
.sidebarWrapper{/*设置侧边栏导航高度*/
  min-height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {/*设置侧边栏不折叠的宽度*/
  width: 250px;
  height: 100%;
}
.el-menu--collapse{/*设置侧边栏折叠后的高度*/
  height: 100%;
}
.indexPage .el-aside{
  width: 300px;/*设置侧边导航栏宽度*/
  overflow-x: hidden;
  overflow-y: hidden;
}
.contentWrapper{/*设置内容区包裹样式*/
  flex: 1;
  min-height: 100vh;
}
.mainHeader{/*头部样式设置*/
  height: 50px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.mainContent{/*内容区样式设置*/
  padding: 0 10px;
  background: #F0F2F5;
  height: 100%;
}
.userCenter{/*头部右侧个人中心*/
  display: flex;
  align-items: center;
}
.userCenter .username{
  margin-right: 15px;
}
</style>