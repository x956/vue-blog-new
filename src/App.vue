<template>
  <div id="app">

    <router-view/>
<!--    <bottom></bottom>-->
  </div>
</template>


<script>

import bottom from "@/components/bottom";

export default {
  components: {bottom}
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
