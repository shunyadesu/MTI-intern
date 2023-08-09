<template>
  <div id="app">
    <Header v-if="$route.name !== 'Lp'"/>
    <main>
      <router-view />
    </main>
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

<style>
  #app {
    width: 100%;
    min-height: calc(100vh - 80px);
  }
  main {
    margin: 0 15px;
    min-height: calc(100vh - 80px - 60px);
  }
</style>