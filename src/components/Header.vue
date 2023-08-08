<template>
  <div class="header">
    <Slidebar />
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
  align-items: center;
  justify-content: flex-start;
  padding-left: 2em;
}
</style>