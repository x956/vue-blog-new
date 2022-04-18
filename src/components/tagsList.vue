<template>

  <el-card id="tagsList">
    <!--<hr />-->
    <p>
      <span style="color:#67C23A" class="el-icon-document">文章分类</span>
    </p>
    <hr />
    <div v-for="tags in tagsList">
      <el-link type="info" style="margin: 5px 0" :underline="false"  @click="submitCategoryId(tags.id)">
        《{{tags.category}}》
      </el-link>
    </div>
    <br/>
  </el-card>

</template>

<script>
export default {
  name: "tagsList",
  data(){
    return{
      tagsList:[]
    }
  },
  created() {
    this.$axios.get("/tagsList").then(res=>{
      this.tagsList=res.data.data
    })
  },
  methods:{
    submitCategoryId(categoryId){
      this.$emit("submitCategoryId",categoryId)
    }
  }
}
</script>

<style scoped>
#tagsList {
  /*-moz-box-shadow: 0px 6px 0px #333333;*/
  /*-webkit-box-shadow: 0px 6px 0px #333333;*/
  /*box-shadow: 0px 3px 10px #333333;*/
  text-align: left;
  width: 300px;
  /*margin: 0px 0;*/
}
</style>