<!--<template>-->
<!--  <div>-->
<!--    <Loading :isShow='isLoading' />-->
<!--    <div class="ui main container">-->
      <!-- 基本的なコンテンツはここに記載する -->
<!--      <Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>-->
<!--      <div class="ui segment">-->
<!--        <form class="ui large form" @submit.prevent="submit">-->
<!--          <div class="field">-->
<!--            <div class="ui left icon input">-->
<!--              <i class="user icon"></i>-->
<!--              <input type="text" placeholder="ID" v-model="user.userId" required disabled>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="field">-->
<!--            <div class="ui left icon input">-->
<!--              <i class="lock icon"></i>-->
<!--              <input type="text" placeholder="Password" v-model="user.password">-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="field">-->
<!--            <div class="ui left icon input">-->
<!--              <i class="tag icon"></i>-->
<!--              <input type="text" placeholder="Nickname" v-model="user.nickname">-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="field">-->
<!--            <div class="ui left icon input">-->
<!--              <i class="calendar icon"></i>-->
<!--              <input type="text" placeholder="Age" v-model="user.age">-->
<!--            </div>-->
<!--          </div>-->
<!--          <button class="ui button huge green fluid" type="submit">-->
<!--            更新-->
<!--          </button>-->
<!--        </form>-->
<!--      </div>-->
<!--      <button class="ui button large gray fluid" type="submit" @click="deleteUser">-->
<!--        退会-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="profile">
    <div class="wrapper">
      <div class="picture"></div>
      <router-link to="/profile/edit" class="edit">編集</router-link>
    </div>
    <div class="text">ニックネーム</div>
    <div class="text">自己紹介</div>
    <div class="index">
      <div class="text">投稿</div>
      <div class="text">いいね</div>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js'
import Message from '@/components/Message.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Profile',
  components: {
    // 読み込んだコンポーネント名をここに記述する
    Message,
    Loading
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user: {
        userId: window.localStorage.getItem('userId'),
        password: null,
        nickname: null,
        age: null,
      },
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
    try {
      const headers = {'Authorization': window.localStorage.getItem('token')}
      /* global fetch */
      const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`, {
        method: 'GET',
        headers
      })

      
      const text = await res.text()
      const jsonData = text ? JSON.parse(text) : {}
      
      if (!res.ok) {
        throw new Error(jsonData.message ?? 'エラーメッセージがありません')
      }
      
      this.user.nickname = jsonData.nickname
      this.user.age = jsonData.age
    } catch(e) {
      this.message.isShow = true
      this.message.text = e.message ?? 'エラーメッセージがありません';
    }
    this.isLoading = false
    return
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    async submit() {
      this.isLoading = true
      try {
        const headers = {'Authorization': window.localStorage.getItem('token')};
        
        const { userId, password, nickname, age } = this.user;
        const requestBody = { userId, password, nickname, age }
        const res = await fetch(baseUrl + '/user', {
          method: 'PUT',
          headers,
          body: JSON.stringify(requestBody),
        })
        
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}
        
        if (!res.ok) {
          throw new Error(jsonData.message ?? 'エラーメッセージがありません')
        }
        
        
        this.message.isShow = true
        this.message.isError = false
        this.message.text = 'プロフィールを更新しました';
      } catch(e) {
        this.message.isShow = true
        this.message.isError = true
        this.message.text = e.message ?? 'エラーメッセージがありません';
      }
      this.isLoading = false
      return
    },
    async deleteUser() {
      this.isLoading = true
      try {
        const headers = {'Authorization': window.localStorage.getItem('token')};
        const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`, {
          method: 'DELETE',
          headers
        })
        
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}
        
        if (!res.ok) {
          throw new Error(jsonData.message ?? 'エラーメッセージがありません')
        }
        
        window.localStorage.clear();
        this.$router.push({ name: 'Login'})
      } catch(e) {
        this.message.isShow = true
        this.message.text = e.message ?? 'エラーメッセージがありません';
      }
      this.isLoading = false
    }
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
    background-color: white;
    border-radius: 100%;
    width: 150px;
    height: 150px;
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
  
  .profile .index{
    width: 100%;
    height: 40%;
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