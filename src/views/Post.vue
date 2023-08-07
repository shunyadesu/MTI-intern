<template>
  <div>
    <!--<Loading :isShow='isLoading' />-->
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <!--<Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>-->
      <div class="ui segment">
        <form class="ui large form" @submit.prevent="postArticle">
          <div class="field">
            <div class="ui left icon input">
                <!--投稿文章-->
                <input v-model="post.text" type="text" placeholder="あなたの投稿を発信しましょう！">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
                <!--カテゴリー  -->
                <label for="category">カテゴリー</label>
                <input v-model="post.category" type="text" id="category">
            </div>
          </div>
          <button class="ui button huge green fluid" type="submit">
            投稿
          </button>
        </form>
      </div>
    </div>
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
      text: null,
      category: null,
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
          userId : window.localStorage.userId,
          text : this.post.text,
        }
        
        if (this.post.category) {
          reqBody.category = this.post.category;
        }
        
        try {
        /* global fetch */
        /* global baseUrl */
          const res = await fetch(baseUrl + '/article',
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
          
          this.$router.push({name :'Home'});

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