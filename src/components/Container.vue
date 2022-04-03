<template>
  <div class="app">
    <el-container>
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <img src="@/assets/logo.png"
               :width="isCollapse ? '60' : '60'"
               height="60" />
        </div>
        <div>
          <!-- 我是样例菜单 -->
          <el-menu default-active="1-4-1"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">博客管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">文章管理</el-menu-item>
                <el-menu-item index="1-2">系统数据</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3"
                          disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header class="app-header">
          <div style="width: 60px; cursor: pointer;"
               @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
          </div>

          <div class="app-header-userinfo">
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <router-view/>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Container',
  data() {
    return {
      username: '',
      isCollapse: false
    }
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
    },
    logout: function () {
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
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted: function () {
    let user = localStorage.getItem('nickname');
    if (user) {
      this.username = user;
    }
  },
}
</script>

<style>
</style>

