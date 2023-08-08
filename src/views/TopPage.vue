<template>
  <div>
    <div class="top-page">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="button">
        <input type="button" name="新規登録" value="新規登録"/>
        <input type="button" name="ログイン" value="ログイン"/>
      </div>
      <div class = "top-image">
       <img src = "@/assets/img/Toplogo.png">
      </div>
      <div class = "top-title">
        <p>
          心と体のバランスを大切に。笑顔溢れる未来へ。<br>
        「ままのいえ」は、産後のママたちが心身の健康をサポートし、<br>幸せな母親としての旅路を歩むためのアプリです。
        </p>
      </div>
      
      <div class="main">
        <div class="box">
          <div class="box-left">
            <img src="@/assets/img/oyako.jpg" class="first-img">
          </div>
          <div class="box-right"> 
            <p>このアプリは、産後鬱の予防と心のケアを重視しています。<br>
              ユーザーは、専門的なアドバイスや情報を受けることができるだけでなく、<br>
              他のママたちとのコミュニティを通じて経験を共有し、
              支え合うことができます。<br>
              アプリは、心地よい環境でリラックスできるコンテンツやツールを提供し、<br>
              ストレスの軽減やリフレッシュメントに役立ちます。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'Template',

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
.top-page {
  margin: 0,auto
}
.button {
  text-align: right;
}
.top-image {
  text-align: center;
}
.top-title {
  background-color: #FFBBCB;
  margin: 0 auto;
  padding: 20px;
  color : #ffffff;
  text-align: center;
}
.main {
  overflow: auto;
}
.first-img {
  width:100%;
}
.box {
    position: relative;
}   
.box-left {
    width: 300px;
    height: 300px;
    padding-top: 30px;
    position: absolute;
}
    
.box-right {
    position: absolute;
    top: 150px;
    left: 110px;
    width: 350px;
    padding-bottm: 50px;
    background-color: rgba(255,187,203,0.5);
    color: #FFFFFF;
    padding: 10px 10px 10px 10px;
}
</style>
