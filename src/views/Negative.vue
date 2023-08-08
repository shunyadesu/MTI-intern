<template>
  <div>
      
    <div class="ui main container">
      <img src="@/assets/img/red.png">
      <h1>陽性の可能性あり</h1>
    </div>
    
    <div class="button-container">
        <button type="submit">専門家に相談</button>
        <button type="submit">Topページに戻る</button>
    </div>

  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'Negative',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
  },
}
</script>

<style scoped>
.ui.main.container {
    height: 400px;
    width: 65%;
    
    background-color: #fff;
    text-align: center;
    
    margin: 30px;
    border-radius: 15px;
    
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.21);
}

h1 {
    font-size: 30px;
}

img {
    width: 180px;
    margin-top: 40px;
    margin-bottom: 40px;
}

.button-container {
    text-align: center;
}

button {
    margin: 0 20px 30px 20px;
}

/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
