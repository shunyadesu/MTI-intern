<template>
  <div class="ui negative message" :class='isError ? "negative" : "success"' v-if="isShow">
    <div class="header">
      {{ isError ? 'Error' : 'Success' }}
    </div>
    <p>{{ message }}</p>
  </div>
</template>
<script>
  export default {
    name: 'Message',
    props: {
      isShow: {
        type: Boolean,
        required: false,
        defualt: false
      },
      isError: {
        type: Boolean,
        required: false,
        default: false
      },
      message: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
    
</style>