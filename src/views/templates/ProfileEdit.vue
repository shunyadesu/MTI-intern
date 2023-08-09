<template>
  <form class="profile-edit">
    <Loading :isShow='isLoading' />
    <Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>
    <div class="picture"></div>
    <div class='input-wrapper'>
      <div class="wrapper">
          <label class="label">ニックネーム</label>
          <input class="input" v-model="user.nickname">
      </div>
      <div class="wrapper">
          <label class="label">自己紹介</label>
          <textarea class="textarea" v-model="user.introduction"></textarea>
      </div>
      <div class="wrapper">
          <label class="label">誕生日</label>
          <input class="input" v-model="user.birthday">
      </div>
      <div class="wrapper">
          <label class="label">性別</label>
          <select class="select" v-model="user.gender">
              <option>男性</option>
              <option>女性</option>
              <option>どちらでもない</option>
          </select>
      </div>
      <div class="wrapper">
          <label class="label">都道府県</label>
          <input class="input" v-model="user.prefecture">
      </div>
      <div class="btn-wrapper">
        <router-link class="btn" to="/profile">
          戻る
        </router-link>
        <span class="btn" :class="isValid ? '' : 'disabled'" @click="submit">
          完了
        </span>
      </div>
    </div>
  </form>
</template>

<script>
import { baseUrl } from '@/assets/config.js'
import Message from '@/components/Message.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'ProfileEdit',
  components: {
    Message,
    Loading
  },
  data() {
    return {
      user: {
        userId: null,
        email: null,
        introduction: null,
        birthday: null,
        nickname: null,
        gender: null,
        prefecture: null
      },
      isLoading: false,
      message: {
        isShow: false,
        isError: true,
        text: ''
      }
    };
  },
  computed: {
    isValid: function() {
      return (
        !!this.user.nickname
      )
    }
  },
  created: async function() {
    this.isLoading = true
    try {
      /* global fetch */
      const res = await fetch(`${baseUrl}/user?userId=${window.localStorage.getItem("userId")}`, {
        method: 'GET'
      })
      
      const text = await res.text()
      const resJson = text ? JSON.parse(text) : {}
      
      if (!res.ok) {
        throw new Error(resJson.message ?? 'エラーメッセージがありません')
      }
      
      this.user = resJson
      console.log(this.user)
    } catch(e) {
      this.message.isShow = true
      this.message.text = e.message ?? 'エラーメッセージがありません';
    }
    this.isLoading = false
    return
  },
  methods: {
    async submit() {
      if (!this.isValid) {
        return
      }
      
      this.isLoading = true
      try {
        const requestBody = {
          userId: this.user.userId,
          password: window.localStorage.getItem('password'),
          introduction: this.user.introduction ?? "",
          birthday: this.user.birthday ?? "",
          nickname: this.user.nickname ?? "",
          gender: this.user.gender ?? "",
          prefecture: this.user.prefecture ?? ""
        }
        
        console.log(requestBody)
        
        const res = await fetch(`${baseUrl}/user`, {
          method: 'PUT',
          body: JSON.stringify(requestBody),
        })
        
        const text = await res.text();
        const resJson = text ? JSON.parse(text) : {}
        
        if (!res.ok) {
          throw new Error(resJson.message ?? 'エラーメッセージがありません')
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
    }
  },
}
</script>

<style scoped>
.profile-edit{
    margin: 2em 1.5em;
}

.profile-edit .picture{
    background-color: #e7e7e7;
    border-radius: 100%;
    width: 20vh;
    height: 20vh;
    margin: 0 auto;
}

.input-wrapper {
  margin: 3em auto 0 auto;
  width: 350px;
}

@media screen and (max-width: 450px) {
  .input-wrapper {
    width: 100%;
  }
}

.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 1em 0;
}

.label {
  font-weight: 600;
}

.profile-edit .wrapper .input{
    width: 60%;
    height: 2.5em;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    margin: 0;
    padding: 0 1em;
    border:none;
}

.profile-edit .wrapper .textarea{
    width: 60%;
    height: 5em;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    margin: 0;
    padding: 0.5em 1em;
    resize: none;
    border: none;
}

.profile-edit .wrapper .select{
    width: 60%;
    height: 2.5em;
    border-radius: 10px;
    border: none;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    margin: 0;
    padding: 0 1em;
}
    
.btn-wrapper{
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
}

.btn {
  width: 25%;
  color: #ffffff;
  border: 1px solid lightgrey;
  border-radius: 10px;
  background-color: #FFBBCB;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.disabled {
  background-color: #cbcbcb;
}
</style>