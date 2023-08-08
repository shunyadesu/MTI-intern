<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
    <h3>セルフチェック</h3>
    <p>ご出産おめでとうございます。ご出産から今までのあいだにどのようにお感じになったかをお知らせください。<br />
    今日だけでなく、過去 7 日間にあなたが感じたことに最も近い答えに○をつけてください。必ず 10 項目全部に答えてください。</p> 
    
    <div class="question">
        <p>例) 幸せだと感じた。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１" disabled>はい、常にそうだった</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2" disabled>はい、たいていそうだった</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3" disabled>いいえ、あまり度々ではなかった</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3" disabled>いいえ、まったくそうではなかった</label><br/>
    </div>
    
    </div>
    <div class="bt">
    <button type="submit" class="result"><router-link active-class="active" class="item" to="/diagnose">始める</router-link></button>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'Diagnose',

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
/* このコンポーネントだけに適用するCSSはここに記述する */
.ui.main.container {
    margin-top:50px;
    background-color: #fff;
    padding:0 20px 20px 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.21);
}

h3 {
    padding: 20px;
    text-align:center;
}

h5 {
    text-align:center;
}

.question p{
    margin-top: 10px;
    padding-top: 14px;
    font-size: 15px;
}

input[type="radio"] {
    margin:5px;
}

.bt {
    text-align: center;
    margin-top: 30px;
    margin-bottom: -30px;
}

.result {
    font-size: 18px;
}

</style>
