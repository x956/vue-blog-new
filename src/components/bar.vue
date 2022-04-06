<template>

  <el-card id="bar">
    <div>
      <el-row>
        <el-menu :default-active="activeIndex" class="el-menu-demo" :router="true" mode="horizontal"
                 @select="handleSelect">


          <el-menu-item index="1" route="/">首页</el-menu-item>
          <el-menu-item index="2" style="margin-left: 2%" route="/message">留言板</el-menu-item>
          <el-menu-item index="3" style="margin-left: 2%" route="/announcement">本站公告</el-menu-item>


          <div style="width: 20%;float: left;margin: 10px 10% 0px 30px" class="hidden-xs-only">
            <el-input placeholder="搜索博客" v-model="search_content" suffix-icon="el-icon-search"
                      @keyup.enter.native="submitSearch"/>
          </div>

        </el-menu>
      </el-row>

    </div>

  </el-card>


</template>

<script>
export default {
  name: "bar",
  data(){
    return{
      search_content : '',
      activeIndex: '1',//默认选中第一项->首页
    }
  },
  methods:{
    handleSelect(key, keyPath) {
//        console.log(key, keyPath);
      if (key != null && key !== '')
        this.activeIndex = key
    },
    submitSearch(){
      this.$router.push({path:'/blogs', query:{search_content: this.search_content}})
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>