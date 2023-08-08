<template>
  <div class="header">
    <Slidebar />
    <input type="text" name="search"/>
    <img src="@/assets/img/search.png" class="search">
  </div>
</template>

<script>
  import Slidebar from '@/components/Slidebar.vue'
  
  export default {
  name: 'App',
  components: {
    Slidebar
  },
}
</script>

<style scoped>
.header {
  background-color: #FFB7C8;
  height: 60px;
  box-shadow: 0 2px 4px #DEDEDE;
  display: flex;
  justify-content: flex-end; /* 横方向に右寄せ */
  align-items: center; /* 縦方向に中央寄せ */
}

.header input {
  height: 30px;
  width: 40%;
}
</style>