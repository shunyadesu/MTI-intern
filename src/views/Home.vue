<template>
  <div>
    <Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
      </div>
    </div>
  </div>
  <!--投稿一覧-->
  <h3 clss="ui dividing header">投稿一覧</h3>
  <div class="ui segment">
    <ul class="ui components divided article-list">
      <template v-for="(article, index) in articles" :key = "index">
        <li class="comment">
          <div class="content">
            <span class="author">{{ article.userId }}</span>
            <div>
              <span class="data">{{ article.text }}</span>
            </div>
            <div class="metadata">
              <span class="data">{{ convertToLocaleString(article.timestamp) }}</span>
            </div>
            <button
                  v-if="isMyArticle(article.userId)"
                  class="ui negative mini button right floated"
                  @click="deleteArticle(article)"
                >
                  削除
                </button>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import Message from '@/components/Message.vue'
import { baseUrl } from '@/assets/config.js';
const headers = {'Authorization' : 'mtiToken'};

export default {
  name: 'Home',

  components: {
    // 読み込んだコンポーネント名をここに記述する
    Message
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post: {
        text: null,
        category: null,
      },
      search: {
        userId: null,
        category: null,
        start: null,
        end: null,
      },
      articles: [],
      iam: null,
      message: {
        isShow: false,
        isError: true,
        text: ''
      }
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },

  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    if (
      window.localStorage.getItem("userId") &&
      window.localStorage.getItem("token")
    ) {
      this.iam = window.localStorage.getItem("userId");
      await this.getSearchedArticles();
    } else {
      window.localStorage.clear();
      this.$router.push({ name: "Login" });
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    isMyArticle(id) {
      if(window.localStorage.getItem("userId") == id){
        return true;
      }else{
        return false;
      }
    }, // 自分の記事かどうかを判定する
    // async getArticles() {}, // 記事一覧を取得する
    async getSearchedArticles() {
      if (this.isCallingApi) {
        return;
      }
      this.isCallingApi = true;

      const { userId, category, start, end } = this.search;
      const startTS = start ? new Date(start).getTime() : null;
      const endTS = end ? new Date(end).getTime() : null;
      const params = [];
      if (userId) {
        params.push(`userId=${userId}`);
      }
      if (category) {
        params.push(`category=${category}`);
      }
      if (startTS !== null) {
        params.push(`start=${startTS}`);
      }
      if (endTS !== null) {
        params.push(`end=${endTS}`);
      }
      
      const qs = params.length > 0 ? params.join("&") : "";
    
      try {
        /* global fetch */
        const res = await fetch(baseUrl + `/articles?${qs}`, {
          method: "GET",
          headers,
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          throw new Error(jsonData.message ?? "エラーメッセージがありません");
        }

        this.articles = jsonData.articles;
      } catch (e) {
        this.isError = true
        this.text = e.message
        this.isShow = true
      } finally {
        this.isCallingApi = false;
      }
    },
    
    // async postArticle() {}, // 記事を作成する
    // async getSearchedArticles() {}, // 記事を検索する
    async deleteArticle(article) {
      if (this.isCallingApi) {
        return;
      }
      this.isCallingApi = true;

      const { userId, timestamp } = article;
      try {
        /* global fetch */
        const res = await fetch(
          `${baseUrl}/article?userId=${userId}&timestamp=${timestamp}`,
          {
            method: "DELETE",
            headers,
          }
        );

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          throw new Error(jsonData.message ?? "エラーメッセージがありません");
        }

        const deleted = this.articles.findIndex(
          (a) => a.userId === userId && a.timestamp === timestamp
        );
        this.articles.splice(deleted, 1);
        
        this.isError = false
        this.text = "記事が削除されました！";
        this.isShow = true
      } catch (e) {
        this.isError = true
        this.text = e.message
      } finally {
        this.isCallingApi = false;
        this.isShow = true
      }
    },
    // convertToLocaleString(timestamp) {} // timestampをLocaleDateStringに変換する
    convertToLocaleString(timestamp) {
      const localeData = (new Date(timestamp)).toLocaleString('ja-JP')
      return localeData
    },
  }
}
</script>

<style scoped>
</style>
