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
