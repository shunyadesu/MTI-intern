<template>
  <form @submit.prevent="postDiagnose">
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="question">
        <p>1, 笑うことができたし、物事のおかしい面もわかった。</p>
        <label><input type="radio" name="q1" class="radio" v-model="questions.q1" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q1" class="radio" v-model="questions.q1" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q1" class="radio" v-model="questions.q1" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q1" class="radio" v-model="questions.q1" value="3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>2, 物事を楽しみにして待った。</p>
        <label><input type="radio" name="q2" class="radio" v-model="questions.q2" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q2" class="radio" v-model="questions.q2" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q2" class="radio" v-model="questions.q2" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q2" class="radio" v-model="questions.q2" value="3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>3, 物事が悪くいった時、自分を不必要に責めた。</p>
        <label><input type="radio" name="q3" class="radio" v-model="questions.q3" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q3" class="radio" v-model="questions.q3" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q3" class="radio" v-model="questions.q3" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q3" class="radio" v-model="questions.q3" value="3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>4, はっきりした理由もないのに不安になったり、心配した。</p>
        <label><input type="radio" name="q4" class="radio" v-model="questions.q4" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q4" class="radio" v-model="questions.q4" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q4" class="radio" v-model="questions.q4" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q4" class="radio" v-model="questions.q4" value="3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>5, はっきりした理由もないのに恐怖に襲われた。</p>
        <label><input type="radio" name="q5" class="radio" v-model="questions.q5" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q5" class="radio" v-model="questions.q5" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q5" class="radio" v-model="questions.q5" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q5" class="radio" v-model="questions.q5" value="3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>6, することがたくさんあって大変だった。</p>
        <label><input type="radio" name="q6" class="radio" v-model="questions.q6" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q6" class="radio" v-model="questions.q6" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q6" class="radio" v-model="questions.q6" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q6" class="radio" v-model="questions.q6" value="3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>7, 不幸せなので、眠りにくかった。</p>
        <label><input type="radio" name="q7" class="radio" v-model="questions.q7" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q7" class="radio" v-model="questions.q7" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q7" class="radio" v-model="questions.q7" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q7" class="radio" v-model="questions.q7" value="3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>8, 悲しくなったり、惨めになった。</p>
        <label><input type="radio" name="q8" class="radio" v-model="questions.q8" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q8" class="radio" v-model="questions.q8" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q8" class="radio" v-model="questions.q8" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q8" class="radio" v-model="questions.q8" value="3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>9, 不幸せなので、泣けてきた。</p>
        <label><input type="radio" name="q9" class="radio" v-model="questions.q9" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q9" class="radio" v-model="questions.q9" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q9" class="radio" v-model="questions.q9" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q9" class="radio" v-model="questions.q9" value="3">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>10, 自分自身を傷つけるという考えが浮かんできた。</p>
        <label><input type="radio" name="q10" class="radio" v-model="questions.q10" value="0">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q10" class="radio" v-model="questions.q10" value="1">あまりできなかった。</label><br/>
        <label><input type="radio" name="q10" class="radio" v-model="questions.q10" value="2">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q10" class="radio" v-model="questions.q10" value="3">まったくできなかった。</label><br/>
      </div>
      
    </div>
    <div class="bt">
      <button type="submit" class="result">結果を見る</button>
    </div>
  </form>
</template>

<script>
import { baseUrl } from "@/assets/config.js";

export default {
  name: 'Diagnose',

  data() {
    return {
      userId : window.localStorage.getItem('userId'),
      questions:{
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
        q6: null,
        q7: null,
        q8: null,
        q9: null,
        q10: null
      }
    };
  },

  methods: {
    async postDiagnose(){
      try {
        /* global fetch */
        const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = this.questions;
        const userId = this.userId;
        const requestBody = { 
          userId: userId,
          questions: {
            q1: q1,
            q2: q2,
            q3: q3,
            q4: q4,
            q5: q5,
            q6: q6,
            q7: q7,
            q8: q8,
            q9: q9,
            q10: q10
          }
        }
        const res = await fetch(baseUrl + '/epsd', {
          method: 'POST',
          body: JSON.stringify(requestBody),
        })
        
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}
        
        if(!res.ok){
          const errorMessage = jsonData.message ?? 'エラーメッセージなし';
          throw new Error(errorMessage);
        }
        
        if(jsonData.isEpsd){
          this.$router.push("/negative")
        }else{
          this.$router.push("/positive")
        }
        
      } catch(e) {
        
      }
      return
    },
  },
}
</script>

<style scoped>
.ui.main.container {
    background-color: #fff;
    padding:0 20px 20px 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.21);
}

.question p{
    margin-top: 10px;
    padding-top: 14px;
    font-size: 15px;
}

input[type="radio"] {
    margin:5px;
}

.bt {
    margin: 40px;
    padding-bottom:20px;
    text-align: center;
}

.result {
    font-size: 18px;
}

</style>
