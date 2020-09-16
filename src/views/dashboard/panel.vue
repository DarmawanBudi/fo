<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-2">
        <div class=" position-fixed sidenav">
          <marquee class="my-2 mr-3" behavior direction="left" scrolamount="3">
            <i>Welcome...</i>
          </marquee>
          <div class="mb-5 media">
            <b-avatar size="5rem" :src="foto"></b-avatar>
            <div class="media-body ml-3">
              <h5 class="mt-4">{{nama}}</h5>
              <router-link :to='{name:"profile_fo"}'>
                <span id="clr">
                  <i></i> Profile
                </span>
              </router-link>
            </div>
          </div>
          <h5>
            <router-link :to='{name:"dashboard"}'>
              <p id="clr">
                <b-icon icon="bookmark-dash"></b-icon> Dashboard
              </p>
            </router-link>
          </h5>
          <h5>
            <router-link :to='{name:"daftar_absensi"}'>
              <p id="clr">
                <b-icon icon="card-checklist"></b-icon> Absensi
              </p>
            </router-link>
          </h5>
          <h5>
            <router-link :to='{name:"siswa"}'>
              <p id="clr">
                <b-icon icon="people-fill"></b-icon> Siswa
              </p>
            </router-link>
          </h5>
          <h5>
            <router-link to="/">
              <p id="clr" class="ml-3 mb-4 fixed-bottom">
                <b-icon icon="box-arrow-right"></b-icon> Log Out
              </p>
            </router-link>
          </h5>
        </div>
      </div>
      <div class="col-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
return {
  nama:null,
  foto:null
}
  },
  mounted() {
    let nama = localStorage.getItem("nama");
    let foto = localStorage.getItem("foto");
    // console.log(nama);
    // console.log(foto);
    // console.log(this);
    this.nama = nama,
    this.foto = foto
  }
}
</script>

<style>
#na {
  height: 100%;
}
#clr {
  color: black;
}

#clrf {
  color: black;
}
#hi {
  height: 100vh;
}
.sidenav {
  height: 100%;
  width: 35vh;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #81AFD3;
  overflow-x: hidden;
  padding-top: 20px;
  padding-left: 3vh;
}
</style>
