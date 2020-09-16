<template>
  <div class="container">
    <h2 class="mt-3">Absensi</h2>
    <br />
    <br />
    <div class="d-flex justify-content-between">
      <span>
        <strong>{{new Date() | moment("dddd, Do MMMM YYYY")}}</strong>
      </span>
    </div>
    <br />

    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status" v-if="loading==true" id="loading">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div>
      <table class="table">
        <tbody  v-for="(element,index) in absensi" :key="index">
          <tr v-if="element.presensis.length == 0 ">
            <td>{{element.programkursusinstrukturs.programkursuses.nama}}</td>
            <td>{{element.waktu_mulai}}-{{element.waktu_berakhir}}</td>
            <td>{{element.materi}}</td>
            <td>{{element.programkursusinstrukturs.instrukturs.nama}}</td>
            <td><b-button
              pill
              variant="info"
              :to="{name:'absensi',params:{id_program_kursus:element.programkursusinstrukturs.programkursuses.id,id_jadwal:element.id}}"
            >absensi</b-button></td>
          </tr>
          <tr v-else>
              <td>{{element.programkursusinstrukturs.programkursuses.nama}}</td>
              <td>{{element.waktu_mulai}}-{{element.waktu_berakhir}}</td>
              <td>{{element.materi}}</td>
              <td>{{element.programkursusinstrukturs.instrukturs.nama}}</td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "@/service/axios";
export default {
  data: () => {
    return {
      absensi: [],
      loading: false,
    };
  },
  mounted() {
    this.getabsensi();
    // this.$info();
  },
  methods: {
    getabsensi() {
      this.loading = true;
      axios.get("/frontoffice/absensi").then((response) => {
        this.absensi = response.data.data;
        if (response.data.success == true) {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style>
</style>