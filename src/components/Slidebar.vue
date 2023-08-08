<template>
  <div>
    <button type="button" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-expanded="false" aria-controls="offcanvasExample">
      <i class="large angle double right icon"></i>
    </button>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div class="offcanvas-header">
        <img src="@/assets/img/logo.png">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="閉じる"></button>   
      </div>
      <div class="offcanvas-body">
        <ul>
          <li><router-link to='/'>ホーム</router-link></li>
          <li><router-link to='/search'>検索</router-link></li>
          <li><router-link to='/profile'>プロフィール</router-link></li>
          <li><router-link to='/diagnosehome'>セルフ診断</router-link></li>
          <li><router-link to='/chat'>専門家に相談</router-link></li>
        </ul>
      </div>
      <div class="key-menu">
        <ul class="icon-list">
          <li><a class="dropdown-item" @click="logout"><i class="big sign out alternate icon"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slidebar',
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push({ name: 'Login' });
    }
  },
}
</script>

<style scoped>
img {
  height: 70px;
}

.offcanvas.offcanvas-start {
  background-color: #FFB7C8;
}

button {
  background-color: #fff;
  border: none;
}

.offcanvas-body li {
  font-size: 25px;
  color: #fff;
  margin: 10px 0 10px 0;
}

.btn-close {
  margin-right: 10px;
  height:20px;
  width:20px;
}

.btn.btn-primary {
  background-color: #FFB7C8;
}

.btn.btn-primary:hover {
  background-color: #E2E2E2;
  cursor: pointer;
  cursor: hand;
}  

.icon-list {
  display: flex;
}

.icon-list li {
  color: #fff;
}

.icon-list {
  display: flex;
  justify-content: flex-end;
}

.icon-list i {
  margin: 0 25px 10px 0;
}

a {
  color: #ffffff;
  font-weight: bold;
  text-decoration: none;
}
</style>
