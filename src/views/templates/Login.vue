<template>
  <div class="login-wrapper">
    <Loading :isShow='isLoading' />
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>
      
      <div class="ui segment">
        <form class="ui large form" @submit.prevent="submit">
          <div class="field">
            <div class="ui left icon input">
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
          <div class="field">
            <div class="ui left icon input " v-if="!isLogin">
              <i class="envelope outline icon"></i>
              <input type="text" placeholder="Email" v-model="user.email">
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input ">
              <i class="tag icon"></i>
              <input type="text" placeholder="Nickname" v-model="user.nickname">
            </div>
          </div>
          <button type="submit" :class="formValid ? '' : 'disabled'" class="login">
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
        email: null,
        password: null,
        nickname: null,
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
        return (this.user.userId && this.user.password)
      } else {
        return (this.user.userId && this.user.password && this.user.nickname && this.user.email)
      }
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    toggleMode() {
      this.isLogin = !this.isLogin
    },
    async submit() {
      if (!this.formValid) {
        return
      }
      
      const { userId, password, nickname, email} = this.user
      
      this.isLoading = true
      if (!this.isLogin) {
        // リクエストボディを指定する
        const requestBody = { userId, password, nickname, email}
  
        try {
          /* global fetch */
          const res = await fetch(baseUrl + '/user',  {
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
      
      // ログイン
      const requestBody = {
        userId: this.user.userId,
        password: this.user.password
      }
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/login`,  {
          method: 'POST',
          body: JSON.stringify(requestBody),
        });

        const text = await res.text();
        const resJson = text ? JSON.parse(text) : {}

        if (!res.ok) {
          throw new Error(resJson.message ?? 'エラーメッセージがありません');
        }
        
        // 成功時の処理
        if (resJson.isLogin) {
          window.localStorage.setItem('userId', this.user.userId)
          window.localStorage.setItem('password', this.user.password)
          console.log('ok')
          this.$router.push('/')
        } else {
          throw new Error('ユーザー名またはパスワードが間違っています');
        }
        
      } catch (e) {
        // エラー時の処理
        this.message.isShow = true
        this.message.text = e.message ?? 'エラーメッセージがありません';
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
.login-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}

.disabled {
  background-color: #cbcbcb;
}
</style>