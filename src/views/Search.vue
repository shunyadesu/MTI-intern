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

      
      <!-- 投稿検索 -->
      <div class="search-box">
        <select class='search-select' id="selectedOption" v-model="searchSelect">
          <option value="userId">ユーザーID</option>
          <option value="genre">ジャンル</option>
        </select>
        <input type="text" name="" class="text" v-model="searchText"/>
        <button type="submit" @click="searchPosts"><i class="search icon"></i></button>
      </div>

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
  name: "Search",

  data() {
    return {
      isLoading: false,
      posts: [],
      successMsg: "",
      errorMsg: "",
      searchSelect: 'userId',
      searchText: ''
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

  methods: {
    async searchPosts() {
      this.isLoading = true;
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/posts?${this.searchSelect}=${this.searchText}`, {
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
}

.search-box {
  display: flex;
  background-color: #ffffff;
  width: 100%;
  margin-bottom: 2em;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: space-evenly;
}

.search-select {
  border: none;
  height: 2.2em;
  padding: 0 0.5em;
  border-radius: 1em;
  border: solid 1px lightgray;
}

.text {
  margin: 0;
}

button {
  width: 36px;
  height: 36px;
}

.link {
  text-decoration: none;
}
</style>
