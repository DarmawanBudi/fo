<template>
  <div class="container">
    <h3 class="mt-3">Nilai Siswa</h3>
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
              <img :src="siswa.foto" width="70" height="70" class="align-self-start rounded-circle" />
            </div>
            <div class="col-6">
              <p>{{element.nama}}</p>
              <p>{{element.email}}</p>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div v-if="element.pendaftarans.length != 0">
            <div class="mt-2" v-for="(object,k) in element.pendaftarans" :key="k">
              <div class="d-flex justify-content-between">
                <span>{{object.programkursuses.nama}}</span>
                <span>
                  <b-button
                    v-b-modal.modal="`modal-${index}-${k}`"
                    pill
                    variant="outline-info"
                    size="sm"
                  >Lihat Nilai</b-button>
                </span>
              </div>
              <b-modal :id="`modal-${index}-${k}`" :title="element.nama">
                <h5>{{object.programkursuses.nama}}</h5>
                <div v-if="object.sertifikats != null">
                  <div
                    v-for="(value,kk) in object.sertifikats.penilaians"
                    :key="kk"
                    class="d-flex justify-content-between"
                  >
                    <span>{{value.kompetensis.nama}}</span>
                    <input class="text-center" size="4" type="text" disabled :value="value.nilai" />
                  </div>
                </div>
                <div v-else>
                  <i>Belum ada nilai kompetensi</i>
                </div>
              </b-modal>
            </div>
          </div>
          <div v-else class="text-center">
            <i>Belum ada program kursus</i>
          </div>
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
      axios.get("/frontoffice/nilaisiswa").then((response) => {
        if (response.data.success == true) {
          this.siswa = response.data.data;
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style>
.card {
  border-radius: 15px;
  border: solid;
}
.button {
  border-radius: 10px;
}
img {
  border-radius: 50%;
  width: 65px;
  height: 65px;
}
</style>