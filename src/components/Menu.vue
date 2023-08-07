<template>
  <div class="ui secondary pointing green inverted massive menu">
    <router-link active-class="active" class="item" exact to="/">Home</router-link>
    <router-link active-class="active" class="item" to="/User">User</router-link>
    <router-link active-class="active" class="item" to="/Profile">Profile</router-link>
    <div class="right menu">
      <button class="item" @click="logout" style="cursor: pointer;">Logout</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Menu',
    computed: {
      
    },
    methods: {
      logout() {
        window.localStorage.clear();
        this.$router.push({name: "Login"})
      }
    }
  }
</script>

<style scoped>
    
</style>