<template>
  <div class="profile">
    <Loading :isShow='isLoading' />
    <Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>
    <div class="wrapper">
      <div class="picture"></div>
      <router-link to="/profile/edit" class="edit">編集</router-link>
    </div>
    <div class="text">{{ user.nickname }}</div>
    <div class="text">{{ user.introduction }}</div>
    <div class="panel">
      <div class="select">
        <div class="select-btn" :class="panel == 'posts' ? 'active':''" @click="panel = 'posts'">投稿</div>
        <!--<div class="select-btn" :class="panel == 'likes' ? 'active':''" @click="panel = 'likes'">いいね</div>-->
        <div class="select-btn" :class="panel == 'likes' ? 'active':''"><s>いいね</s></div>
      </div>
      <div v-if='panel == "posts"' class="panel-content">
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
          </div>
        </template>
      </div>
      <div v-if='panel == "likes"' class="panel-content">
        <template v-for="(post, index) in likes" :key="index">
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
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { baseUrl } from '@/assets/config.js'
import Message from '@/components/Message.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Profile',
  components: {
    Message,
    Loading
  },
  data() {
    return {
      user: {
        nickname: null,
        introduction: null,
      },
      posts: [],
      likes: [],
      panel: 'posts',
      isLoading: false,
      message: {
        isShow: false,
        isError: true,
        text: ''
      }
    };
  },
  created: async function() {
    this.isLoading = true
    await this.getUser()
    await this.getPosts()
    this.isLoading = false
    return
  },
  methods: {
    async getUser() {
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/user?userId=${window.localStorage.getItem('userId')}`, {
          method: 'GET'
        })
        
        const text = await res.text()
        const resJson = text ? JSON.parse(text) : {}
        
        if (!res.ok) {
          throw new Error(resJson.message ?? 'エラーメッセージがありません')
        }
        
        this.user.nickname = resJson.nickname
        this.user.introduction = resJson.introduction
      } catch(e) {
        this.message.isShow = true
        this.message.text = e.message ?? 'エラーメッセージがありません';
      }
    },
    async getPosts() {
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/posts?userId=${window.localStorage.getItem('userId')}`, {
          method: 'GET'
        })
        
        const text = await res.text()
        const resJson = text ? JSON.parse(text) : {}
        
        if (!res.ok) {
          throw new Error(resJson.message ?? 'エラーメッセージがありません')
        }
        
        this.posts = resJson.posts
        console.log(this.posts)
      } catch(e) {
        this.message.isShow = true
        this.message.text = e.message ?? 'エラーメッセージがありません';
      }
    },
    async getLikes() {
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/posts?userId=${this.user.userId}`, {
          method: 'GET'
        })
        
        const text = await res.text()
        const resJson = text ? JSON.parse(text) : {}
        
        if (!res.ok) {
          throw new Error(resJson.message ?? 'エラーメッセージがありません')
        }
        
        this.likes = resJson.posts
      } catch(e) {
        this.message.isShow = true
        this.message.text = e.message ?? 'エラーメッセージがありません';
      }
    },
    convertToLocaleString(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
  },
}
</script>

<style scoped>
.profile{
  margin-top: 20px;
  padding: 20px;
  height: calc(100vh - 110px);
}

.profile .wrapper{
  display: flex;
  justify-content: space-between;
  padding-left: 70px;
  margin-bottom: 20px;
}
  
.profile .wrapper .picture{
  background-color: #e7e7e7;
  border-radius: 100%;
  width: 20vh;
  height: 20vh;
  margin: 0 auto;
}

.profile .wrapper .edit{
  background-color: #FFBBCB;
  width: 70px;
  height: 30px;
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.profile .text{
  display: flex;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 10px;
}

.panel {
  background-color: white;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  margin-top: 30px;
}
.card {
  width: 100%;
}

.select {
  width: 100%;
  height: 3em;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 1px #e7e7e7;
  cursor: pointer;
}

.select-btn {
  padding: 0.3em 1em;
  border-radius: 3em;
  font-weight: bold;
}

.profile .index .text{
  border-bottom: 1px solid lightgrey;
  height: 30px;
  width: 50%;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items:center;
}

.panel-content {
  margin: 1em 0;
}

.active {
  background-color: #FFB7C8;
}
</style>