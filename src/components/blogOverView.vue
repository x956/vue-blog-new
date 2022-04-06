<template>

  <el-card id="blogOverView">

    <div>
      <el-button type="text" style="height: 20px" @click="toblogDetail(id)">
        <h3>{{ title }}</h3>
      </el-button>
    </div>
    <div style="margin-top: 20px">
      <p>{{ description }}</p>
    </div>
    <div id="blog-info" style="margin-top: 30px">
      <p style="overflow: hidden;text-overflow:ellipsis; white-space: nowrap;">
        <span class="el-icon-time hidden-xs-only" style="width: 25%" >&nbsp;{{time}}</span>
        <span class="el-icon-view hidden-xs-only" style="width: 20%">&nbsp;{{readNumbers}}</span>
        <span class="el-icon-chat-line-square hidden-xs-only" style="width: 20%">&nbsp;{{ discussCount }}</span>
        <el-tag size="small" style="width: 10%">{{tags}}</el-tag>
        <span class="el-icon-user-solid hidden-xs-only" style="width: 20%;text-align: center;">
          &nbsp;{{createBy}}
        </span>
      </p>
    </div>
  </el-card>

</template>

<script>
export default {
  name: "blogOverView",
  props: ["id","title","description","time","readNumbers","discussCount","tags","createBy"],
  methods:{
    toblogDetail(blogId){
      this.$router.push({name:'BlogDetail',params:{blogId:blogId}})
    }
  }
}
</script>

<style scoped>
#blogOverView {
  text-align: left;
  -moz-box-shadow: 0px 6px 0px #333333;
  /*-webkit-box-shadow: 0px 6px 0px #333333;*/
  /*box-shadow: 0px 3px 10px #333333;*/
  /*padding: 5px 10px;*/

  margin: 20px auto;
  /*box-shadow: 0px 3px 10px #333333;*/

}

</style>