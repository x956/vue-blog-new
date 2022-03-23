<template>

  <div class="m-content">
    <h3>欢迎来到xyy的博客</h3>
    <div>{{ user.nickname }}</div>
  </div>

</template>
<script>
export default {
  name: "Header",
  data(){
    return{
      user: {
        nickname : ''
      }
    }
  },

  //这里有个问题，再次刷新额时候并没有调用
  created() {
    if(this.$store.getters.getNickName){
      this.user.nickname=this.$store.getters.getNickName
      console.log(this.user.nickname)
    }
  }
}
</script>

<style scoped>

</style>