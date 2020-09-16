<template>
  <div class="container">
    <h2 class="mt-3">Dashboard</h2>
    
    <div class="card-deck">
      <div class="card">
        <div class="card-body program text-white">
          <h5 class="card-title">Program Kursus</h5>
          <h2 class="text-center">
            <b-icon icon="book"></b-icon>
            {{dashboard.program_kursus}}
          </h2>
          <h4 class="text-right">
            <router-link class="link" :to='{name:"program_kursus"}'>
              <b-icon icon="arrow-right-circle-fill"></b-icon>
            </router-link>
          </h4>
        </div>
      </div>
      <div class="card">
        <div class="card-body instruktur text-white">
          <h5 class="card-title">Instruktur</h5>
          <h2 class="text-center">
            <b-icon icon="person-lines-fill"></b-icon>
            {{dashboard.instruktur}}
          </h2>
          <h4 class="text-right">
            <router-link class="link" :to='{name:"instruktur"}'>
              <b-icon icon="arrow-right-circle-fill"></b-icon>
            </router-link>
          </h4>
        </div>
      </div>
      <div class="card">
        <div class="card-body nilai text-white">
          <h5 class="card-title">Nilai Siswa</h5>
          <h2 class="text-center">
            <b-icon icon="file-earmark-medical"></b-icon> Nilai
          </h2>
          <h4 class="text-right">
            <router-link class="link" :to='{name:"nilai_siswa"}'>
              <b-icon icon="arrow-right-circle-fill"></b-icon>
            </router-link>
          </h4>
        </div>
      </div>
    </div>

    <div class="card mt-5">
      <table class="table table-striped">
        <thead>
          <th>
            <h5 class="mt-3">{{new Date() | moment("dddd, Do MMMM YYYY")}}</h5>
          </th>
          <th colspan="3" class="text-right">
            <router-link :to='{name:"jadwal"}'>
              <i>
                Read More
                <b-icon icon="chevron-double-right"></b-icon>
              </i>
            </router-link>
          </th>
        </thead>
        <tbody>
          <tr v-for="(element,index) in dashboard.jadwal_hari_ini" :key="index">
            <td>{{element.programkursusinstrukturs.programkursuses.nama}}</td>
            <td>{{new Date(element.tanggal + " " + element.waktu_mulai) | moment("hh:mm")}} - {{new Date(element.tanggal + " " + element.waktu_berakhir) | moment("hh:mm")}}</td>
            <td>{{element.materi}}</td>
            <td>{{element.programkursusinstrukturs.instrukturs.nama}}</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status" v-if="loading==true" id="loading">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "@/service/axios";
export default {
  data: () => {
    return {
      dashboard: [],
      loading: false,
    };
  },
  mounted() {
    this.getdashboard();
    // this.$info();
    // console.log(this);
  },
  methods: {
    getdashboard() {
      this.loading = true;
      axios.get("/frontoffice").then((response) => {
        if (response.data.success == true) {
          this.dashboard = response.data.data;
          // console.log(response);
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style>
.link {
  color: white;
}
.program {
  background-color: #C7B4C6;
}
.instruktur {
  background-color: #D09D59;
}
.nilai {
  background-color: #6F9552;
}
</style>