<template>
    <div class="chat">
        <div class="left-chat">
            <div class="picture"></div>
            <div class="message"></div>
        </div>
        <div class="right-chat">
            <div class="message"></div>
            <div class="picture"></div>
        </div>
        
    </div>

    <template v-for="(item, index) in this.post" :key="index">
      <li class="column">
      <div class="ui card fluid">
        <div class="content">
          <h2 class="header">
            {{item.texts}}
          </h2>
        </div>
      </div>
    </li>
    </template>

    <form class="form-chat">
        <input class="text" v-model="post.context">
        <div class="send">
            <i class="paper plane icon" @click="postMessage"></i>
        </div>
    </form>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';

const headers = {'Authorization' : 'mtiToken'};

export default {
  name: 'Chat',

  components: {
   // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      texts: [],
      post: {
      // userId: null,
      userId: window.localStorage.getItem('userId'),
      context: null,
    },
      // search: {
      //   userId: null,
      //   category: null,
      //   start: null,
      //   end: null,
      // },
      // articles: [],
      // iam: null,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },

  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // 記事を作成する
      const headers = { 'Authorization': 'mtiToken' }
        console.log("ゲット")
        
        try {
        /* global fetch */
        /* global baseUrl */
          const res = await fetch(baseUrl + '/message',
          {
            method: 'GET',
            headers
          });
          
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {};
          
          if(!res.ok){
            const errorMessage = jsonData.message ?? 'エラーメッセージなし';
            throw new Error(errorMessage);
          }

          // window.localStorage.setItem('token', jsonData.token);
          // window.localStorage.setItem('userId', this.user.userId);
          
          // this.$router.push({name :'Home'});
          this.texts = jsonData.texts ?? [];
          // console.log(jsonData);
        }catch(e){
          
        }
    // apiからarticleを取得する
    // this.$router.push({ name: 'Login' })
    // this.$router.push({ name: 'Profile' })
    // this.$router.push({ name: 'Chat' })
  },

  methods: {
  //   // Vue.jsで使う関数はここで記述する
  //   // isMyArticle(id) {}, // 自分の記事かどうかを判定する
  //   // async getArticles() {}, // 記事一覧を取得する
    // async getSearchedArticles() {}, // 記事を検索する
    // async deleteArticle(article) {}, // 記事を削除する
    // convertToLocaleString(timestamp) {} // timestampをLocaleDateStringに変換する
  
    async getMessage() {
      const headers = { 'Authorization': 'mtiToken' }
        console.log("ゲット")
        
        try {
        /* global fetch */
        /* global baseUrl */
          const res = await fetch(baseUrl + '/message',
          {
            method: 'GET',
            headers
          });
          
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {};
          
          if(!res.ok){
            const errorMessage = jsonData.message ?? 'エラーメッセージなし';
            throw new Error(errorMessage);
          }

          // window.localStorage.setItem('token', jsonData.token);
          // window.localStorage.setItem('userId', this.user.userId);
          
          // this.$router.push({name :'Home'});

          // console.log(jsonData);
        }catch(e){
          
        }
        
    }, 
  
    async postMessage() {
      const headers = { 'Authorization': 'mtiToken' }
        console.log("クリック")
        
        const reqBody = {
          userId : window.localStorage.userId,
          context : this.post.context,
        }
        
        try {
        /* global fetch */
        /* global baseUrl */
          const res = await fetch(baseUrl + '/message',
          {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers
          });
          
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {};
          
          if(!res.ok){
            const errorMessage = jsonData.message ?? 'エラーメッセージなし';
            throw new Error(errorMessage);
          }

          // window.localStorage.setItem('token', jsonData.token);
          // window.localStorage.setItem('userId', this.user.userId);
          
          // this.$router.push({name :'Home'});

          console.log(jsonData);
        }catch(e){
          
        } 
    },
  }

}
</script>
<style scoped>
    .chat{
        height: calc(100vh - 110px);
        overflow-y: auto;
    }    

    .left-chat{
        text-align: left;
        margin-top: 40px;
        display: flex;
    }
  
    .left-chat .picture{
        height: 7vh;
        width: 7vh;
        border-radius: 100%;
        background-color: white;
    }
  
    .left-chat .message{
        height: 14vh;
        width: 60%;
        background-color: white;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        margin-left: 20px;
        border-radius: 10px;
    }
  
    .right-chat{
        text-align: right;
        margin-top: 40px;
        display: flex;
        width: calc(60% + 7vh);
        float: right;
        
    }
  
    .right-chat .picture{
        height: 7vh;
        width: 7vh;
        border-radius: 100%;
        background-color: white;
        text-align: right;
    }
  
    .right-chat .message{
        height: 14vh;
        width: calc(100% - 7vh);
        background-color: white;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        margin-right: 20px;
        border-radius: 10px;
    }
  
    .form-chat{
        display: flex;
        justify-content: center;
    }
    
    .form-chat .text{
        width: 80%;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    }
    
    .form-chat .send{
      background-color: #FFBBCB;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 5px;
      border-radius: 10px;
      height: 30px;
      width: 30px;
      margin-top: 8px;
      margin-left: 7px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    }
    
    .form-chat .send i{
      color: white;
    }
</style>