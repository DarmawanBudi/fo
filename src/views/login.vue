<!-- login view -->
<template>
  <div class="container-fluid">
    <div class="row">
      <!-- kolom kiri -->
      <div class="col-md-6 bg">
        <img src="LOGO1.png" alt />
        <div class="text-white">
          <h4>Welcome Back!</h4><hr>
          <i>"Bekerjalah 2 atau 3 kali banyak dari orang lain ,karena usaha tidak pernah membohongi hasil."</i>
        </div>
      </div>

      <!-- kolom kanan -->
      <div class="col-md-6 bg2 d-flex justify-content-center align-items-center">
        <form @submit.prevent="postLogin">
          <!--menggunakan .prevent supaya ketika di submit tidak merefresh-->
          <!--jika merefresh maka data akan di set seperti semula sehingga akan akan dikirim null-->
          <div class="form-group">
            <h3>Sign in to dashboard Front Office</h3>
            <br />
            <div class="card" >
              <input required v-model="login.email" type="email" class="form-control" id placeholder="email" />
              <input required v-model="login.password" type="password" class="form-control" id placeholder="password" />
            </div>
          </div>
          <input type="submit" value="login" class="btn btn-danger radiusku" />
          <!-- <b-button
          pill
          variant="danger"
          :to="{name:'dashboard'}"
        >Login</b-button> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/service/axios";
export default {
  mounted() {
    
  },
  data: () => {

    return {
          login: {
      email: null,
      password: null,
      }
    };
  },
  methods: {
    postLogin() {
      // console.log(this.login);
      axios.post("/frontoffice/login",this.login).then((response) => {

        if (response.data.success == true) {
          this.login = response.data.data;
          // console.log(response);
          this.loading = false;
          this.$router.push({name:'dashboard'})
          localStorage.setItem("token",response.data.data.token)
          localStorage.setItem("nama",response.data.data.nama)
          localStorage.setItem("foto",response.data.data.foto)
          localStorage.setItem("sukses",response.data.success)
        }
      })
    },
  },
  computed: {},
};
</script>

<style>
.content {
  justify-content: unset;
}
.bg {
  height: 100vh;
  background-color: brown;
}

.bg2 {
  height: 100vh;
  background-color: cadetblue;
}

.bg img {
  max-width: 50%;
}

.radiusku {
  border-radius: 30px;
}

input {
  margin-top: 10px;
}
</style>