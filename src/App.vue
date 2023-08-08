<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
  <Footer />
</template>
<script>

import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  computed: {
    isMenuShow() {
      const notShowList = ['Login']
      return !notShowList.includes(this.$route.name)
    }
  }
}

</script>