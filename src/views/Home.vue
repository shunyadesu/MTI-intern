<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <!-- loading表示用 -->
      <div class="ui active inverted page dimmer" v-if="isCallingApi">
        <div class="ui text loader">Loading</div>
      </div>

      <!-- エラーメッセージ用-->
      <p class="ui negative message" v-if="errorMsg">
        <i class="close icon" @click="clearMsg('error')"></i>
        <span class="header">エラーが発生しました！</span>
        {{ errorMsg }}
      </p>

      <!-- 成功メッセージ用-->
      <p class="ui positive message" v-if="successMsg">
        <i class="close icon" @click="clearMsg"></i>
        <span class="header">成功！</span>
        {{ successMsg }}
      </p>

      <!-- 投稿一覧 -->
      <div class="ui segment">
        <ul class="ui comments divided article-list">
          <template v-for="(article, index) in articles" :key="index">
            <li class="comment">
              
              <div class="content">
              <div>
                <span class="author">{{ article.userId }}</span>
                
                <div class="metadata">
                  <span class="date">{{
                    convertToLocaleString(article.timestamp)
                  }}</span>
                </div>
                
                <p class="text">{{ article.text }}</p>
              </div>
                
                <div class="two-button">
                <button>
                  <i class="large comment icon"></i>
                </button>
                <button type="submit">
                  <i class="large heart icon"></i>
                </button>
                </div>
                
                <div class="ui divider"></div>
                
                
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from "@/assets/config.js";

const headers = { Authorization: "mtiToken" };

export default {
  name: "Home",

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
      search: {
        userId: null,
        category: null,
        start: null,
        end: null,
      },
      articles: [],
      iam: null,
      successMsg: "",
      errorMsg: "",
      isCallingApi: false,
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    isPostButtonDisabled() {
      return !this.post.text;
    },

    isSearchButtonDisabled() {
      return !this.search.userId;
    },
  },

  created: async function () {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する

    if (
      window.localStorage.getItem("userId") &&
      window.localStorage.getItem("token")
    ) {
      this.iam = window.localStorage.getItem("userId");
      await this.getArticles();
    } else {
      window.localStorage.clear();
      this.$router.push({ name: "Login" });
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    clearMsg(target) {
      if (target === "error") {
        this.errorMsg = "";
      } else {
        this.successMsg = "";
      }
    },

    isMyArticle(id) {
      return this.iam === id;
    },

    async getArticles() {
      this.isCallingApi = true;

      try {
        /* global fetch */
        const res = await fetch(baseUrl + "/articles", {
          method: "GET",
          headers,
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        // 記事がなかった場合undefinedとなり、記事追加時のunshiftでエラーとなるため、空のarrayを代入
        this.articles = jsonData.articles ?? [];
      } catch (e) {
        this.errorMsg = `記事一覧取得時にエラーが発生しました: ${e}`;
      } finally {
        this.isCallingApi = false;
      }
    },

    async postArticle() {
      if (this.isCallingApi) {
        return;
      }
      this.isCallingApi = true;

      const reqBody = {
        userId: this.iam,
        text: this.post.text,
        category: this.post.category,
      };
      try {
        /* global fetch */
        const res = await fetch(baseUrl + "/article", {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers,
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        this.articles.unshift({ ...reqBody, timestamp: Date.now() });
        this.successMsg = "記事が投稿されました！";
        this.post.text = "";
        this.post.category = "";
      } catch (e) {
        console.error(e);
        this.errorMsg = e;
      } finally {
        this.isCallingApi = false;
      }
    },


    convertToLocaleString(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
  },
};
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
html {
    height: auto;
}

.ui.segment {
 margin-bottom: 0 20px 30px 20px; 
}

.content {
  margin: 0 20px 30px 20px;
}

.article-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 100%;
}

.right-align {
  text-align: rignt;
}

.ui.divider {
  margin: 0;
}

.two-button {
  dispay: flex;
  margin: 10px;
  justify-content: space-between;
}

button {
  background-color: #FFB7C8;
  border: none;
  margin: 0 20px 0 20px;
}

i {
  color:#fff;
  padding:0;
}

</style>
