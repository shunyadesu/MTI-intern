<template>
  <div>
    <div class="ui main container">
    <h3>セルフチェック</h3>
    <p>ご出産おめでとうございます。ご出産から今までのあいだにどのようにお感じになったかをお知らせください。<br />
    今日だけでなく、過去 7 日間にあなたが感じたことに最も近い答えに○をつけてください。必ず 10 項目全部に答えてください。</p> 
    
    <div class="question">
        <p>例) 幸せだと感じた。</p>
        <label><input type="radio" name="radio" class="radio" value="チェック１" disabled>はい、常にそうだった</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック2" disabled>はい、たいていそうだった</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3" disabled>いいえ、あまり度々ではなかった</label><br/>
        <label><input type="radio" name="radio" class="radio" value="チェック3" disabled>いいえ、まったくそうではなかった</label><br/>
    </div>
    
    </div>
    <div class="bt">
    <button type="submit" class="result"><router-link active-class="active" class="item" to="/diagnose">始める</router-link></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Diagnose',
}
</script>

<style scoped>
.ui.main.container {
    margin-top:50px;
    background-color: #fff;
    padding:0 20px 20px 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.21);
}

h3 {
    padding: 20px;
    text-align:center;
}

h5 {
    text-align:center;
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
    text-align: center;
    margin-top: 30px;
    margin-bottom: -30px;
}

.result {
    font-size: 18px;
}

</style>
