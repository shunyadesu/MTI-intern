<template>
  <div id="app">
    <Menu v-if='isMenuShow' />
    <router-view />
  </div>
</template>
<script>
import { RouterView } from 'vue-router'
import Menu from '@/components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  },
  computed: {
    isMenuShow() {
      const notShowList = ['Login']
      return !notShowList.includes(this.$route.name)
    }
  }
}

</script>