<template>
  <div class="container">
    <h2 class="mt-3">Siswa</h2>
    <div class="text-right">
      <router-link :to='{name:"tambah_siswa"}'>
        <strong>
          <b-icon icon="person-plus-fill"></b-icon> Pendaftaran Siswa
        </strong>
      </router-link>
    </div>

    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status" v-if="loading==true" id="loading">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="card-columns">
      <div class="card mt-3" v-for="(element,index) in siswa" :key="index">
        <div class="card-header">
          <div class="row">
            <div class="col-4 text-center">
              <img
                :src="element.foto"
                width="70"
                height="70"
                class="align-self-start rounded-circle"
              />
            </div>
            <div class="col-6">
              <p>{{element.nama}}</p>
              <p>{{element.email}}</p>
            </div>
            <div class="col-1 ml-4">
              <h5>
                <router-link class="dtl" :to='{name:"detail_siswa",params:{id_siswa:element.id}}'>
                  <b-icon icon="three-dots-vertical"></b-icon>
                </router-link>
              </h5>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="mt-2" v-for="(object,k) in element.pendaftarans" :key="k">
            <div class="d-flex justify-content-between">
              <span>{{object.programkursuses.nama}}</span>
              <span>
                <b-badge pill variant="info">{{object.status}}</b-badge>
              </span>
            </div>
          </div>

          <!-- <div class="d-flex justify-content-between">
            <span>Desain Grafis</span>
            <span class="badge badge-success badge-pill">Tidak Aktif</span>
          </div>-->
        </div>
      </div>

      <!-- <div class="col">
        <div class="card mt-3">
          <div class="media">
            <img src="kucing.jpg" width="75" height="65" class="align-self-start mr-3" alt />
            <div class="media-body">
              <h5 class="mt-0">Prince Budy</h5>
              <p>Prince_budy@gmail.com</p>
            </div>
          </div>
          <hr />
          <div>
            <span>Profesional Programmer</span>
            <button class="float-right">Aktif</button>
          </div>
          <div>
            <span>Desain Grafis</span>
            <button class="float-right">Tidak Aktif</button>
          </div>
        </div>
      </div>-->
    </div>

    <!-- <div class="row">
      <div class="col">
        <div class="card mt-3">
          <div class="media">
            <img src="kucing.jpg" width="75" height="65" class="align-self-start mr-3" alt />
            <div class="media-body">
              <h5 class="mt-0">Prince Budy</h5>
              <p>Prince_budy@gmail.com</p>
            </div>
          </div>
          <hr />
          <div>
            <span>Profesional Programmer</span>
            <button class="float-right">Aktif</button>
          </div>
          <div>
            <span>Desain Grafis</span>
            <button class="float-right">Tidak Aktif</button>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card mt-3">
          <div class="media">
            <img src="kucing.jpg" width="75" height="65" class="align-self-start mr-3" alt />
            <div class="media-body">
              <h5 class="mt-0">Prince Budy</h5>
              <p>Prince_budy@gmail.com</p>
            </div>
          </div>
          <hr />
          <div>
            <span>Profesional Programmer</span>
            <button class="float-right">Aktif</button>
          </div>
          <div>
            <span>Desain Grafis</span>
            <button class="float-right">Tidak Aktif</button>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import axios from "@/service/axios";
export default {
  data: () => {
    return {
      siswa: [],
      loading: false,
    };
  },
  mounted() {
    this.getsiswa();
  },
  methods: {
    getsiswa() {
      this.loading = true;
      axios.get("/frontoffice/siswa").then((response) => {
        this.siswa = response.data.data;
        if (response.data.success == true) {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style>
.dtl {
  color: black;
}
</style>