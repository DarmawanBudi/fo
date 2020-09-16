<template>
  <div class="container">
    <h2 class="mt-3">Program Kursus</h2>
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status" v-if="loading==true" id="loading">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="card-columns">
      <div class="my-2 card border-primary" v-for="(element,index) in ProgramKursus" :key="index">
        <div class="bg-primary card-header text-white text-center">
          <strong>{{element.nama}}</strong>
        </div>
        <div class="mt-2 card-body text-center">
          <p>
            <b-icon icon="people-fill"></b-icon>
            {{element.pendaftarans_count}} Siswa | {{element.kuota}} Kuota
          </p>
        </div>
        <div class="card-footer d-flex justify-content-between">
          <span>{{element.total_pertemuan}} Pertemuan</span>
          <span>Rp {{element.harga.toLocaleString()}}</span>
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
      ProgramKursus: [],
      loading: false,
    };
  },
  mounted() {
    this.getProgramKursus();
  },
  methods: {
    getProgramKursus() {
      this.loading = true;
      axios.get("/frontoffice/programkursus").then((response) => {
        this.ProgramKursus = response.data.data;
        if (response.data.success == true) {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style>
#loading {
  width: 5rem;
  height: 5rem;
}
</style>