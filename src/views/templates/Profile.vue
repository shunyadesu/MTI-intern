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
    <div class="box">
      <div class="select">
        <div class="text">投稿</div>
        <div class="text">いいね</div>
      </div>
      <div>
        <div class="ui card">
          <div class="content">
            <div class="header">
              テスト
              <a class="ui tag label mini right floated">ジャンル</a>
            </div>
            <div class="meta">
              {{ convertToLocaleString("2023/02/02") }}
            </div>
            <div class="description">
              テスト
            </div>
          </div>
        </div>
      </div>
      <div>
        
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

.select{
  width: 100%;
  height: 3em;
  background-color: white;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
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
</style>