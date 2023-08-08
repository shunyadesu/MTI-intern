<!--<template>-->
<!--  <div>-->
    <!--<Loading :isShow='isLoading' />-->
<!--    <div class="ui main container">-->
      <!-- 基本的なコンテンツはここに記載する -->
      <!--<Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>-->
<!--      <div class="ui segment">-->
<!--        <form class="ui large form" @submit.prevent="postArticle">-->
<!--          <div class="field">-->
<!--            <div class="ui left icon input">-->
                <!--投稿文章-->
<!--                <input v-model="post.text" type="text" placeholder="あなたの投稿を発信しましょう！">-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="field">-->
<!--            <div class="ui left icon input">-->
                <!--カテゴリー  -->
<!--                <label for="category">カテゴリー</label>-->
<!--                <input v-model="post.category" type="text" id="category">-->
<!--            </div>-->
<!--          </div>-->
<!--          <button class="ui button huge green fluid" type="submit">-->
<!--            投稿-->
<!--          </button>-->
<!--        </form>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div class="post">
    <form>
      <div>
        <label class="label">種類</label>
        <select class="select">
          <option class="option" value="question">質問</option>
          <option class="option" value="post">投稿</option>
        </select>
      </div>
      <div>
        <input class="textarea" type="textarea" v-model="post.context">
      </div>
      <div>
        <label class="label">カテゴリ</label>
        <select class="select" name="genre" v-model="post.genre">
          <option class="option" value="meal">食事</option>
          <option class="option" value="scold">叱り方</option>
          <option class="option" value="sleep">睡眠</option>
          <option class="option" value="love">愛情</option>
          <option class="option" value="complaints">愚痴</option>
        </select>
      </div>
      <div class="div-send">
        <input class="send" type="submit" value="送信" @click="postArticle">
      </div>
    </form>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';

const headers = {'Authorization' : 'mtiToken'};

export default {
  name: 'Post',

  components: {
   // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post: {
      userId: window.localStorage.getItem('userId'),
      nickname: window.localStorage.getItem('nickname'),
      genre: null,
      context: null,
    },
      // search: {
      //   userId: null,
      //   category: null,
      //   start: null,
      //   end: null,
      // },
      // articles: [],
      // iam: null,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },

  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    // this.$router.push({ name: 'Login' })
    // this.$router.push({ name: 'Profile' })
    this.$router.push({ name: 'Post' })
  },

  methods: {
  //   // Vue.jsで使う関数はここで記述する
  //   // isMyArticle(id) {}, // 自分の記事かどうかを判定する
  //   // async getArticles() {}, // 記事一覧を取得する
    async postArticle() {
      const headers = { 'Authorization': 'mtiToken' }
        console.log("クリック")
        
        const reqBody = {
          userId: this.post.userId,
          nickname: this.post.nickname,
          genre: this.post.genre,
          context: this.post.context,
          // postId: this.postId,
          // kind : this.post.kind,
          // userId : window.localStorage.userId,
          // text : this.post.text,
          // category : this.post.category,
        }
        
        try {
        /* global fetch */
        /* global baseUrl */
          const res = await fetch(baseUrl + `/post?userId=${this.post.userId}&nickname=${this.post.nicknam}`,
          {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers
          });
          
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {};
          
          if(!res.ok){
            const errorMessage = jsonData.message ?? 'エラーメッセージなし';
            throw new Error(errorMessage);
          }

          // window.localStorage.setItem('token', jsonData.token);
          // window.localStorage.setItem('userId', this.user.userId);
          
          // this.$router.push({name :'Home'});

          console.log(jsonData);
        }catch(e){
          
        }
        
    }, // 記事を作成する
    // async getSearchedArticles() {}, // 記事を検索する
    // async deleteArticle(article) {}, // 記事を削除する
    // convertToLocaleString(timestamp) {} // timestampをLocaleDateStringに変換する
  }
}
</script>
<style scoped>
  .post{
    background-color: white;
    width: 90%;
    margin: 0 auto;
    text-align: right;
    padding: 20px;
    margin-top: 40px;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
  
  .post .label{
    margin-right: 10%;
    font-weight: bold;
  }
  
  .post .select{
    width: 60%;
    height: 5vh;
    border: 1px solid black;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
  
  .post .option{
    text-align: center;
  }
  
  .post .textarea{
    width: 100%;
    height: 30vh;
    margin: 10px 0;
    border: 1px solid black;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
  
  .post .div-send{
    display: flex;
    justify-content: center;
  }
  
  .post .send{
    margin-top: 20px;
    width: 40%;
    color: white;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #FFBBCB;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
</style>