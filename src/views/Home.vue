<template>
  <div>
    <div class="ui main container">
      <div class="ui active inverted page dimmer" v-if="isLoading">
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
      <div>
        <template v-for="(post, index) in posts" :key="index">
          <div class="ui card">
            <div class="content">
              <div class="header">
                {{ post.nickname }}
                <a class="ui tag label mini right floated">{{ post.genre }}</a>
              </div>
              <div class="meta">
                {{ convertToLocaleString(post.createdAt) }}
              </div>
              <div class="description">
                {{ post.context }}
              </div>
            </div>
            <div class="extra content">
              <span class="right floated">
                <i class="heart outline like icon"></i>
              </span>
              <i class="comment icon"></i>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from "@/assets/config.js";

export default {
  name: "Home",

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      isLoading: false,
      posts: [],
      // post: {
      //   text: null,
      //   category: null,
      // },
      // search: {
      //   userId: null,
      //   category: null,
      //   start: null,
      //   end: null,
      // },
      // iam: null,
      successMsg: "",
      errorMsg: "",
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
    if (
      window.localStorage.getItem("userId") &&
      window.localStorage.getItem("token")
    ) {
      this.iam = window.localStorage.getItem("userId");
      await this.getPosts();
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

    async getPosts() {
      this.isLoading = true;
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/posts`, {
          method: "GET",
        });

        const text = await res.text();
        const resJson = text ? JSON.parse(text) : [];

        if (!res.ok) {
          throw new Error(resJson.message ?? "エラーメッセージがありません");
        }

        this.posts = resJson.posts ?? [];
        
      } catch (e) {
        this.errorMsg = `記事一覧取得時にエラーが発生しました: ${e}`;
      } finally {
        this.isLoading = false;
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
.card {
  width: 100%;
}
/*html {*/
/*    height: auto;*/
/*}*/

/*.ui.segment {*/
/* margin-bottom: 0 20px 30px 20px; */
/*}*/

/*.content {*/
/*  margin: 0 20px 30px 20px;*/
/*}*/

/*.article-list {*/
/*  list-style: none;*/
/*  margin: 0;*/
/*  padding: 0;*/
/*  max-width: 100%;*/
/*}*/

/*.right-align {*/
/*  text-align: rignt;*/
/*}*/

/*.ui.divider {*/
/*  margin: 0;*/
/*}*/

/*.two-button {*/
/*  dispay: flex;*/
/*  margin: 10px;*/
/*  justify-content: space-between;*/
/*}*/

/*button {*/
/*  background-color: #FFB7C8;*/
/*  border: none;*/
/*  margin: 0 20px 0 20px;*/
/*}*/

/*i {*/
/*  color:#fff;*/
/*  padding:0;*/
/*}*/

</style>
