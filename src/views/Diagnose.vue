<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="question">
        <p>1, 笑うことができたし、物事のおかしい面もわかった。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">あまりできなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">明らかにできなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>2, 物事を楽しみにして待った。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">あまりできなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">明らかにできなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">ほとんどできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>3, 物事が悪くいった時、自分を不必要に責めた。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">はい、たいていそうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">はい、時々そうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、あまり度々ではない。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、そうではなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>4, はっきりした理由もないのに不安になったり、心配した。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">いいえ、そうではなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">ほとんどそうではなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">はい、時々あった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">はい、しょっちゅうあった。</label><br/>
      </div>
      
      <div class="question">
        <p>5, はっきりした理由もないのに恐怖に襲われた。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">はい、しょっちゅうあった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">はい、時々あった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、めったになかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、まったくなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>6, することがたくさんあって大変だった。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">はい、たいてい対処できなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">はい、いつものようにはうまく対処しなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、たいていうまく対処した。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、普段通りに対処した。</label><br/>
      </div>
      
      <div class="question">
        <p>7, 不幸せなので、眠りにくかった。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">はい、ほとんどいつもそうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">はい、ときどきそうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、あまり度々ではなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、まったくなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>8, 悲しくなったり、惨めになった。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">はい、たいていそうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">はい、かなりしばしばそうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、あまり度々ではなかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、まったくそうではなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>9, 不幸せなので、泣けてきた。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">はい、たいていそうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">はい、かなりしばしばそうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">ほんの時々あった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">いいえ、まったくそうではなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>10, 自分自身を傷つけるという考えが浮かんできた。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１">はい、かなりしばしばそうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2">時々そうだった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">めったになかった。</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3">まったくなかった。</label><br/>
      </div>
      
    </div>
    <div class="bt">
    <button type="submit" class="result">結果を見る</button>
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
    background-color: #fff;
    padding:0 20px 20px 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.21);
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
    margin: 40px;
    padding-bottom:20px;
    text-align: center;
}

.result {
    font-size: 18px;
}

</style>
