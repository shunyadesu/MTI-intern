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
    <form class="profile-edit">
        <div class="picture"></div>
        <div class="wrapper">
            <label class="label">ニックネーム</label>
            <input class="input">
        </div>
        <div class="wrapper">
            <label class="label">自己紹介</label>
            <input class="textarea" type="textarea">
        </div>
        <div class="wrapper">
            <label class="label">誕生日</label>
            <input class="input">
        </div>
        <div class="wrapper">
            <label class="select-label">性別</label>
            <select class="select">
                <option>男性</option>
                <option>女性</option>
                <option>どちらでもない</option>
            </select>
        </div>
        <div class="wrapper">
            <label class="label">都道府県</label>
            <input class="input">
        </div>
        <div class="button">
            <button class="complete">
                完了
            </button>
        </div>
    </form>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js'
import Message from '@/components/Message.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'ProfileEdit',
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
    .profile-edit{
        padding: 20px;
    }
    
    .profile-edit .picture{
        background-color: white;
        border-radius: 100%;
        width: 20vh;
        height: 20vh;
        margin: 0 auto;
    }
    
    .profile-edit .wrapper{
        text-align: right;
        margin-top: 20px;
    }
    
    .profile-edit .wrapper .label{
        margin-right: 20px;
        font-weight: 600;
    }
    
    .profile-edit .wrapper .input{
        width: 60%;
        height: 3vh;
        border-radius: 10px;
        text-align: right;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    }
    
    .profile-edit .wrapper .textarea{
        width: 60%;
        height: 9vh;
        border-radius: 10px;
        text-align: right;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    }
    
    .profile-edit .wrapper .select-label{
        font-weight: 600;
    }
    
    .profile-edit .wrapper .select{
        width: 59%;
        height: 3vh;
        border-radius: 10px;
        text-align: right;
        border: none;
        margin-left: 30px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    }
    
    .profile-edit .button{
        display: flex;
        justify-content: center;
    }
    
    .profile-edit .button .complete{
        margin-top: 20px;
        width: 20%;
        color: white;
        border: 1px solid lightgrey;
        border-radius: 10px;
        background-color: #FFBBCB;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    }
</style>