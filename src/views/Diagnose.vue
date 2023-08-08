<template>
  <form @submit.prevent="postDiagnose">
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="question">
        <p>1, 笑うことができたし、物事のおかしい面もわかった。</p>
        <label><input type="radio" name="q1" class="radio" @input="handleInput(1, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q1" class="radio" @input="handleInput(1, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q1" class="radio" @input="handleInput(1, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q1" class="radio" @input="handleInput(1, 3)">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>2, 物事を楽しみにして待った。</p>
        <label><input type="radio" name="q2" class="radio" @input="handleInput(2, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q2" class="radio" @input="handleInput(2, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q2" class="radio" @input="handleInput(2, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q2" class="radio" @input="handleInput(2, 3)">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>3, 物事が悪くいった時、自分を不必要に責めた。</p>
        <label><input type="radio" name="q3" class="radio" @input="handleInput(3, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q3" class="radio" @input="handleInput(3, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q3" class="radio" @input="handleInput(3, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q3" class="radio" @input="handleInput(3, 3)">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>4, はっきりした理由もないのに不安になったり、心配した。</p>
        <label><input type="radio" name="q4" class="radio" @input="handleInput(4, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q4" class="radio" @input="handleInput(4, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q4" class="radio" @input="handleInput(4, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q4" class="radio" @input="handleInput(4, 3)">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>5, はっきりした理由もないのに恐怖に襲われた。</p>
        <label><input type="radio" name="q5" class="radio" @input="handleInput(5, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q5" class="radio" @input="handleInput(5, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q5" class="radio" @input="handleInput(5, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q5" class="radio" @input="handleInput(5, 3)">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>6, することがたくさんあって大変だった。</p>
        <label><input type="radio" name="q6" class="radio" @input="handleInput(6, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q6" class="radio" @input="handleInput(6, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q6" class="radio" @input="handleInput(6, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q6" class="radio" @input="handleInput(6, 3)">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>7, 不幸せなので、眠りにくかった。</p>
        <label><input type="radio" name="q7" class="radio" @input="handleInput(7, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q7" class="radio" @input="handleInput(7, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q7" class="radio" @input="handleInput(7, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q7" class="radio" @input="handleInput(7, 3)">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>8, 悲しくなったり、惨めになった。</p>
        <label><input type="radio" name="q8" class="radio" @input="handleInput(8, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q8" class="radio" @input="handleInput(8, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q8" class="radio" @input="handleInput(8, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q8" class="radio" @input="handleInput(8, 3)">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>9, 不幸せなので、泣けてきた。</p>
        <label><input type="radio" name="q9" class="radio" @input="handleInput(9, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q9" class="radio" @input="handleInput(9, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q9" class="radio" @input="handleInput(9, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q9" class="radio" @input="handleInput(9, 3)">まったくできなかった。</label><br/>
      </div>
      
      <div class="question">
        <p>10, 自分自身を傷つけるという考えが浮かんできた。</p>
        <label><input type="radio" name="q10" class="radio" @input="handleInput(10, 0)">いつもと同様にできた。</label><br/>
        <label><input type="radio" name="q10" class="radio" @input="handleInput(10, 1)">あまりできなかった。</label><br/>
        <label><input type="radio" name="q10" class="radio" @input="handleInput(10, 2)">明らかにできなかった。</label><br/>
        <label><input type="radio" name="q10" class="radio" @input="handleInput(10, 3)">まったくできなかった。</label><br/>
      </div>
      
    </div>
    <div class="bt">
      <button type="submit" class="result">結果を見る</button>
    </div>
  </form>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'Diagnose',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      userId : window.localStorage.getItem('userId'),
      questions:{
        q1 : null,
        q2 : null,
        q3 : null,
        q4 : null,
        q5 : null,
        q6 : null,
        q7 : null,
        q8 : null,
        q9 : null,
        q10 : null
      }
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    handleInput0(question_index, value) {
      if(question_index == 0){
        this.q0 = value
      }else if(question_index == 1){
        this.q1 = value
      }else if(question_index == 2){
        this.q2 = value
      }else if(question_index == 3){
        this.q3 = value
      }else if(question_index == 4){
        this.q4 = value
      }else if(question_index == 5){
        this.q5 = value
      }else if(question_index == 6){
        this.q6 = value
      }else if(question_index == 7){
        this.q7 = value
      }else if(question_index == 8){
        this.q8 = value
      }else if(question_index == 9){
        this.q9 = value
      }else if(question_index == 10){
        this.q10 = value
      }
    },
    
    async postDiagnose(){
      try {
        const { q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = this.questions;
        const userId = this.userId;
        const requestBody = { userId, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 }
        const res = await fetch(baseUrl + '/epsd', {
          method: 'POST',
          body: JSON.stringify(requestBody),
        })
        
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}
        
        if (!res.ok) {
          throw new Error(jsonData.message ?? 'エラーメッセージがありません')
        }
      } catch(e) {
        this.message.text = e.message ?? 'エラーメッセージがありません';
      }
      return
    },
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
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
