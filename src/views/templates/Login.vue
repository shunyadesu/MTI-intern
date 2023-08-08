<template>
  <div>
    <Loading :isShow='isLoading' />
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>
      
      <div class="ui segment">
        <form class="ui large form" @submit.prevent="submit">
          <div class="field">
            <div class="ui left icon input ">
              <i class="user icon"></i>
              <input type="text" placeholder="ID" v-model="user.userId">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input ">
              <i class="lock icon"></i>
              <input type="text" placeholder="Password" v-model="user.password">
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input ">
              <i class="tag icon"></i>
              <input type="text" placeholder="Nickname" v-model="user.nickname">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input " v-if="!isLogin">
              <i class="calendar icon"></i>
              <input type="text" placeholder="Age" v-model="user.age">
            </div>
          </div>
          <button type="submit" :disabled='formValid' class="login">
            {{ submitText }}
          </button>
        </form>
      </div>
      <button type="submit" @click="toggleMode" class="signup">
        {{ toggleText }}
      </button>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
import { baseUrl } from '@/assets/config.js'
import Message from '@/components/Message.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Login',

  components: {
    // 読み込んだコンポーネント名をここに記述する
    Message,
    Loading
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      isLogin: true,
      isLoading: false,
      user: {
        userId: null,
        password: null,
        nickname: null,
        age: null
      },
      message: {
        isShow: false,
        isError: true,
        text: ''
      }
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    submitText() {
      return this.isLogin ? 'ログイン' : '新規登録'
    },
    toggleText() {
      return this.isLogin ? '新規登録' : 'ログイン'
    },
    formValid() {
      if (this.isLogin) {
        return !(this.user.userId && this.user.password)
      } else {
        return !(this.user.userId && this.user.password && this.user.nickname && this.user.age)
      }
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    toggleMode() {
      this.isLogin = !this.isLogin
    },
    async submit() {
      const { userId, password, nickname, age } = this.user
      
      this.isLoading = true
      if (!this.isLogin) {
        // リクエストボディを指定する
        const requestBody = { userId, password, nickname, age }
  
        try {
          /* global fetch */
          const res = await fetch(baseUrl + '/user/signup',  {
            method: 'POST',
            body: JSON.stringify(requestBody),
          });
  
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {}
  
          // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
          if (!res.ok) {
            throw new Error(jsonData.message ?? 'エラーメッセージがありません');
          }
          
          // 成功時の処理
        } catch (e) {
          // エラー時の処理
          this.message.isShow = true
          this.message.text = e.message ?? 'エラーメッセージがありません';
          this.isLoading = false
          return
        }
      }
      
      // リクエストボディを指定する
      const requestBody = { userId, password }
      try {
        /* global fetch */
        const res = await fetch(baseUrl + '/user/login',  {
          method: 'POST',
          body: JSON.stringify(requestBody),
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          throw new Error(
            jsonData.message ?? 'エラーメッセージがありません'
          );
        }
        
        // 成功時の処理
        console.log(jsonData);
        window.localStorage.setItem('token', jsonData.token)
        window.localStorage.setItem('userId', this.user.userId)
        this.$router.push({name: 'Home'})
      } catch (e) {
        // エラー時の処理
        this.message.isShow = true
        this.message.text = e.message ?? 'エラーメッセージがありません';
        this.isLoading = false
      }
      this.isLoading = false
      return
    }
  },
}
</script>

<style scoped>
  .login,.signup {
    width: 25%;
    margin: 5px auto 5px;
    font-size: 15px;
  }
  
  .ui.main.container {
    text-align: center;
  }
  
  .ui.segment {
    padding: 20px;
    padding-top: 30px;
  }
  
  input {
    margin: 10px;
  }
</style>