<template>
  <div>
    <Loading :isShow='isLoading' />
    <Message :isShow='message.isShow' :isError='message.isError' :message='message.text'/>
    <!--<div class="chat">-->
    <!--  <div class="left-chat">-->
    <!--    <div class="picture"></div>-->
    <!--    <div class="message"></div>-->
    <!--  </div>-->
    <!--  <div class="right-chat">-->
    <!--    <div class="message"></div>-->
    <!--    <div class="picture"></div>-->
    <!--  </div>-->
    <!--</div>-->
    <div class="chat">
      <template v-for="(message) in messages" :key="index">
        <li class="column">
          <div class="right-chat">
            <div class="message">
              {{ message.context }}
            </div>
            <div class="picture"></div>
          </div>
        </li>
      </template>
    </div>

    <form class="form-chat">
      <input class="text" v-model="post.context">
      <div class="send">
        <i class="paper plane icon" @click="postMessage"></i>
      </div>
    </form>
  </div>
</template>

<script>
import { baseUrl } from '@/assets/config.js';

export default {
  name: 'Chat',

  data() {
    return {
      messages: [],
      texts: [],
      post: {
        userId: window.localStorage.getItem('userId'),
        context: null,
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
        !!this.post.userId &&
        !!this.post.context
      )
    }
  },

  created: async function() {
    await this.getMessage()
  },

  methods: {
    async getMessage() {
      this.isLoading = true
      
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/message?userId=${window.localStorage.getItem('userId')}`,
        {
          method: 'GET'
        });
        
        const text = await res.text();
        const resJson = text ? JSON.parse(text) : {};
        
        if(!res.ok){
          throw new Error(resJson.message ?? 'エラーメッセージなし');
        }
        this.messages = resJson.messages
        
        this.isLoading = false
      } catch(e) {
      }
    }, 
  
    async postMessage() {
      if (!this.isValid) {
        return
      }
      this.isLoading = true
      
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/message`,
        {
          method: 'POST',
          body: JSON.stringify(this.post)
        });
        
        const text = await res.text();
        const resJson = text ? JSON.parse(text) : {};
        
        if(!res.ok){
          throw new Error(resJson.message ?? 'エラーメッセージなし');
        }

        await this.getMessage();
        
        this.post.context = ''
        
        this.isLoading = false
      } catch(e) {
      } 
    },
  }

}
</script>
<style scoped>
.chat {
    height: calc(100vh - 110px);
    overflow-y: auto;
}    

.left-chat {
    text-align: left;
    margin-top: 40px;
    display: flex;
}

.left-chat .picture {
    height: 7vh;
    width: 7vh;
    border-radius: 100%;
    background-color: white;
}

.left-chat .message {
    height: 14vh;
    width: 60%;
    background-color: white;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    margin-left: 20px;
    border-radius: 10px;
}

.right-chat {
    text-align: right;
    margin-top: 40px;
    display: flex;
    width: calc(60% + 7vh);
    float: right;
    
}

.right-chat .picture {
    height: 7vh;
    width: 7vh;
    border-radius: 100%;
    background-color: white;
    text-align: right;
}

.right-chat .message {
    width: calc(100% - 7vh);
    background-color: white;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
    margin-right: 20px;
    border-radius: 10px;
    padding: 1em;
    text-align: left;
}

.form-chat {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2em;
}

.form-chat .text {
    width: 80%;
    border: none;
    padding: 0.3em 1em;
    border-radius: 1em;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.form-chat .send {
  background-color: #FFBBCB;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
  border-radius: 10px;
  height: 30px;
  width: 30px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.form-chat .send i{
  color: white;
}
</style>