<template>
  <div>
      
    <div class="ui main container">
      <img src="@/assets/img/blue.png">
      <h1>陰性</h1>
    </div>
    
    <div class="button-container">
        <button type="submit" @click='$router.push("/")'>Topページに戻る</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Positive',
}
</script>

<style scoped>
.ui.main.container {
    height: 400px;
    width: 65%;
    
    background-color: #fff;
    text-align: center;
    
    margin: 30px;
    border-radius: 15px;
    
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.21);
}

h1 {
    font-size: 30px;
}

img {
    width: 180px;
    margin-top: 40px;
    margin-bottom: 40px;
}

.button-container {
    text-align: center;
}

button {
    margin: 0 20px 30px 20px;
}

/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
