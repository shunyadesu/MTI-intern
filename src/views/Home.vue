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
            <template v-for="(pPost, index) in post.pPosts" :key="index">
              <div class="content post-comment">
                <div class="header">
                  {{ pPost.nickname }}
                </div>
                <div class="meta">
                  {{ convertToLocaleString(pPost.createdAt) }}
                </div>
                <div class="description">
                  {{ pPost.context }}
                </div>
              </div>
            </template>
            <div class="extra content">
              <span class="right floated">
                <i class="heart outline like icon"></i>
              </span>
              <router-link :to="'/post/'+post.postId" class="link">
                <i class="comment icon"></i>
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/assets/config.js";

export default {
  name: "Home",

  data() {
    return {
      isLoading: false,
      posts: [],
      successMsg: "",
      errorMsg: "",
    };
  },

  computed: {
    isPostButtonDisabled() {
      return !this.post.text;
    },

    isSearchButtonDisabled() {
      return !this.search.userId;
    },
  },

  created: async function () {
    await this.getPosts();
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
.ui.main.container {
  margin-bottom: 30px;
}

.card {
  width: 100%;
  border-radius: 15px;
}
.post-comment {
  margin-left: 2em;
}
.link {
  text-decoration: none;
}
</style>
