<template>
  <div class="top ui negative message" :class='isError ? "negative" : "success"' v-if="isShow">
    <div class="ui active inline loader"></div>
    <p>Loading ...</p>
  </div>
</template>
<script>
  export default {
    name: 'Loading',
    props: {
      isShow: {
        type: Boolean,
        required: false,
        defualt: false
      },
    }
  }
</script>

<style scoped>
.top {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.3;
}
</style>