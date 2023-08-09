<template>
  <div id="app">
    <Header v-if="$route.name !== 'Lp'"/>
    <main>
      <router-view />
    </main>
  </div>
  <Plus class='plus-box' v-if="!['Lp', 'Login', 'Diagnosehome', 'Diagnose', 'Negative', 'Positive'].includes($route.name)"/>
  <Footer />
</template>
<script>

import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Plus from '@/components/Plus.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Plus
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
  .plus-box {
    position: fixed;
    bottom: 5em;
    width: 500px;
  }
  @media screen and (max-width: 500px) {
    .plus-box {
      width: 100%;
    }
  }
</style>