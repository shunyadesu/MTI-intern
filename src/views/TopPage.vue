<template>
  <div>
    <div class="top-page">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="button">
        <input type="button" name="新規登録" value="新規登録" class="button1" @click='this.$router.push("/login")'/>
        <input type="button" name="ログイン" value="ログイン" class="button1" @click='this.$router.push("/login")'/>
      </div>
      <div class = "top-image">
       <img src = "@/assets/img/Toplogo.png">
      </div>
      <div class = "top-title">
        <p>
          心と体のバランスを大切に。笑顔溢れる未来へ。<br>
        「ままのいえ」は、産後のママたちが心身の健康をサポートし、<br>
         幸せな母親としての旅路を歩むためのアプリです。
        </p>
      </div>
      
      <div class="main">

        <div class="box">
            <div class="box-item img left">
              <img src="@/assets/img/oyako.jpg" class="first-img">
            </div>
            <div class="box-item text"> 
              <p>このアプリは、産後鬱の予防と心のケアを重視しています。
                ユーザーは、専門的なアドバイスや情報を受けることができるだけでなく、
                他のママたちとのコミュニティを通じて経験を共有し、
                支え合うことができます。<br>
                アプリは、心地よい環境でリラックスできるコンテンツやツールを提供し
                ストレスの軽減やリフレッシュメントに役立ちます。</p>
            </div>
          
        </div>
        <div class="box">
            <div class="box-item img right">
              <img src="@/assets/img/oyako2.jpg" class="first-img">
            </div>
            <div class="box-item text left"> 
              <p>「ままのいえ」は、新たな段階を迎えるママたちに、<br>
               育児と自己ケアのバランスを取る手助けを提供します。
               笑顔と希望に満ちた未来を築くために、<br>
               心と体の健やかさを大切にする場所として、<br>
               ユーザーの母親としての旅を支える存在となることを目指しています。</p>
            </div>
          
        </div>
         <div class="box">
            <div class="box-item img left">
              <img src="@/assets/img/oyako3.jpg" class="first-img">
            </div>
            <div class="box-item text"> 
              <p>「ままのいえ」は、新しいママたちにとって心強く、いつでも頼れる、味方となることを目指しています。
              幸せな母親としてのステップを踏み出す際に、
              情報、サポート、共感、そして心の健康を提供し、
              ユーザーの産後の旅路を穏やかで幸福なものにすることを使命としています。</p>
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
.button {
  text-align: right;
  padding: 1em 0;
}
.button1 {
  padding: 0.5em 1em;
  background-color: #FFBBCB;
  color: #FFFFFF;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 0.5em;
  border: none;
  margin: 0 0.5em;
}
.button1:hover {
  opacity: 0.5;
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

.first-img {
  width:100%;
}
.box {
    position: relative;
    height: 350px;
}   

.box {
  margin: 2em 0;
  position: relative;
}
.box-item {
  width: 70%;
}
.box-item.img {
  position: absolute;
  top: 0;
}
.box-item.img.right {
  right: 0;
}
.box-item.img.left {
  left: 0;
}

.box-item.text {
  background-color: #FFBBCB;
  padding: 1.5em;
  font-weight: bold;
  color: white;
  position: absolute;
  right: 0;
  bottom: 0;
}
.box-item.text.right {
  right: 0;
}
.box-item.text.left {
  left: 0;
}
</style>