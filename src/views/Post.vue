<template>
  <div>
    <Loading :isShow='isLoading' />
    <Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>
    <div class="ui card parent" v-if="Object.keys(parentPost).length">
      <div class="content">
        <div class="header">
          {{ parentPost.nickname }}
          <a class="ui tag label mini right floated">{{ parentPost.genre }}</a>
        </div>
        <div class="meta">
          {{ convertToLocaleString(parentPost.createdAt) }}
        </div>
        <div class="description">
          {{ parentPost.context }}
        </div>
      </div>
    </div>
    <div class='post'>
      <div class="btn-wrapper">
          <div class="btn" :class="isValid ? '' : 'disabled'" @click="sendPost">送信</div>
      </div>
      <form>
        <div>
          <textarea class="textarea" v-model="post.context">
          </textarea>
        </div>
        <div class='genre'>
          <label class="label">ジャンル</label>
          <select class="select" name="genre" v-model="post.genre">
            <option class="option" value="食事">食事</option>
            <option class="option" value="叱り方">叱り方</option>
            <option class="option" value="睡眠">睡眠</option>
            <option class="option" value="愛情">愛情</option>
            <option class="option" value="愚痴">愚痴</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { baseUrl } from '@/assets/config.js';
import Message from '@/components/Message.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Post',

  components: {
    Message,
    Loading
  },
  data() {
    return {
      post: {
        userId: window.localStorage.getItem('userId'),
        password: window.localStorage.getItem('password'),
        genre: null,
        context: null,
      },
      parentPost: {},
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
        !!this.post.userId &&
        !!this.post.password &&
        !!this.post.genre &&
        !!this.post.context
      )
    }
  },
  created: async function() {
    if (this.$route.params.pid) {
      this.isLoading = true
      await this.getPost(this.$route.params.pid)
      this.isLoading = false
    }
  },
  methods: {
    async getPost(pid) {
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/post?postId=${pid}`,
        {
          method: 'GET',
        });
        
        const text = await res.text();
        const resJson = text ? JSON.parse(text) : {};
        
        if(!res.ok){
          throw new Error(resJson.message ?? 'エラーメッセージなし');
        }
        
        this.parentPost = resJson
      }catch(e){
        this.message.isShow = true
        this.message.text = e.message ?? 'エラーメッセージがありません';
      }
    },
    async sendPost() {
      if (!this.isValid) {
        return
      }
      this.isLoading = true
      
      let reqBody = {
        userId: this.post.userId,
        nickname: this.post.nickname,
        genre: this.post.genre,
        context: this.post.context,
      }
      
      if (this.$route.params.pid) {
        reqBody.postId = this.$route.params.pid
      }
        
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/post`,
        {
          method: 'POST',
          body: JSON.stringify(reqBody)
        });
        
        const text = await res.text();
        const resJson = text ? JSON.parse(text) : {};
        
        if(!res.ok){
          throw new Error(resJson.message ?? 'エラーメッセージなし');
        }
        
        this.$router.push('/')
      }catch(e){
        this.message.isShow = true
        this.message.text = e.message ?? 'エラーメッセージがありません';
      }
    },
    convertToLocaleString(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
  }
}
</script>
<style scoped>
.post {
  background-color: #ffffff;
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.card {
  width: 90%;
  margin: 0 auto;
  text-align: left;
}
.parent.card {
  margin-top: 20px;
}

.btn-wrapper{
  text-align: right;
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

.textarea {
  resize: none;
  width: 100%;
  height: 10em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 1em;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
}

.genre {
  margin-top: 1.5em;
  text-align: right;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  margin-right: 1em;
}
.select {
  width: 40%;
  height: 2em;
  padding: 0.3em 1em;
  border: none;
  border-radius: 1em;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}
.option{
  text-align: center;
}
</style>
