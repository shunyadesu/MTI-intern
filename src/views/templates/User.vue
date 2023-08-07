<template>
  <div>
    <Loading :isShow='isLoading' />
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>
      <div class="ui segment">
        <form class="ui form">
          <div class="field">
            <label>ユーザー名</label>
            <input v-model="nickname" type="text" placeholder="Nickname">
          </div>
          <div class="field">
            <label>年齢</label>
            <div class="inline fields">
              <div class="field">
                <input v-model.number="start" type="text" name="agestart">
                <label for="agestart">歳から</label>
              </div>
              
              <div class="field">
                <input v-model.number="end" type="text" name="ageend">
                <label for="ageend">歳まで</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ul class="ui three column grid" v-for="user in filteredUsers" :key="user.index">
        <li class="column">
          <div class="ui card fluid">
            <div class="content">
              <h2 class="header">
                {{ user.nickname }}
                <span class="ui green label">{{ user.age }}</span>
              </h2>
              <span class="meta">{{ user.userId }}</span>
            </div>
          </div>
        </li>
      </ul>
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
  name: 'User',
  components: {
    // 読み込んだコンポーネント名をここに記述する
    Message,
    Loading
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      users: [],
      nickname: '',
      start: 0,
      end: 100,
      isLoading: false,
      message: {
        isShow: false,
        isError: true,
        text: ''
      }
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    filteredUsers() {
      let result = this.users;
      if (this.nickname) {
        result = result.filter(target => {
          return target.nickname.match(this.nickname)
        })
      }
      
      if (this.start) {
        result = result.filter(target => {
          return target.age >= this.start
        })
      }
      
      if (this.end) {
        result = result.filter(target => {
          return target.age <= this.end
        })
      }
      
      return result
    },
    
    filteredUsers() {
      return this.users.filter(e => 
        e.nickname?.match(this.nickname)
        && e.age >= this.start
        && e.age <= this.end
      )
    }
  },
  
  created: async function() {
    this.isLoading = true
    try {
      const headers = {'Authorization': window.localStorage.getItem('token')}
      /* global fetch */
      const res = await fetch(baseUrl + '/users', {
        method: 'GET',
        headers
      })
      
      const text = await res.text()
      const jsonData = text ? JSON.parse(text) : {}
      
      if (!res.ok) {
        throw new Error(jsonData.message ?? 'エラーメッセージがありません')
      }
      
      this.users = jsonData
    } catch(e) {
      this.message.isShow = true
      this.message.text = e.message ?? 'エラーメッセージがありません';
    }
    this.isLoading = false
    return
  },
}
</script>
