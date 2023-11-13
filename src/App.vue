<template>
  <div>
    <Navbar />
    <RouterView id="master-page" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default{
  name:'AppPage',
  components:{Navbar},
  data() {
    return{}
  }
}
</script>
<style>
ul {
  display: flex;
  list-style: none;
}
ul > li {
  margin: 0 15px;
}
#master-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
