<template>
  <div class="container">
    <h2 class="mt-3">Jadwal</h2>
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status" v-if="loading==true" id="loading">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <table class="my-5 table table-striped" v-for="(element,index) of jadwal" :key="index">
      <thead class="bg bg-info text-white">
        <th colspan="4"><h5>{{index | moment("dddd, Do MMMM YYYY")}}</h5></th>
      </thead>
      <tbody>
          <tr v-for="(object,k) in element" :key="k">
              <td>{{object.programkursusinstrukturs.programkursuses.nama}}</td>
              <td>{{new Date(object.tanggal + " " + object.waktu_mulai) | moment("hh:mm")}} - {{new Date(object.tanggal + " " + object.waktu_berakhir) | moment("hh:mm")}}</td>
              <td>{{object.materi}}</td>
              <td>{{object.programkursusinstrukturs.instrukturs.nama}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "@/service/axios";
export default {
  data: () => {
    return {
      jadwal: [],
      loading: false,
    };
  },
  mounted() {
    this.getjadwal();
  },
  methods: {
    getjadwal() {
      this.loading = true;
      axios.get("/frontoffice/jadwal").then((response) => {
        if (response.data.success == true) {
          this.jadwal = response.data.data;
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style>
#warna {color: white;}
</style>