<template>
  <div class="container">
    <h2 class="mt-3">Absensi</h2>
    <br />
    <br />
    <div class="text-center">
      <h3>program</h3>
    </div>

    <div class="row">
      <div class="col-2" id="ab">
        <label for>Waktu Mulai</label>
        <b-form-timepicker v-model="waktu_mulai" locale="en"></b-form-timepicker>
      </div>
      <div class="col-2" id="ab">
        <label for>Waktu Berakhir</label>
        <b-form-timepicker v-model="waktu_berakhir" locale="en"></b-form-timepicker>
      </div>
      <div class="col-6" id="ab">
        <label for>Materi yang disampaikan</label>
        <textarea v-model="materi_tersampaikan" name id cols="95" rows="10"></textarea>
      </div>
    </div>
    <div class="row">
      <div class="col-9 ">
        <b-form-group label="Siswa yang hadir">
          <b-form-checkbox-group
            v-model="pendaftaran"
            class="mr-5 my-2"
            v-for="(element,index) in absensi"
            :key="index"
          >
            <b-form-checkbox
            class=" d-flex align-content-start flex-wrap"
              :value="object.siswas.id"
              v-for="(object,k) in element.pendaftarans"
              :key="k"
            >{{object.siswas.nama}}</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <div class="text-center">
          <button class="btn btn-primary" @click="postAbsensi">kirim</button>
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
      absensi: [],
      loading: false,
      pendaftaran: [],
      input: [],
      waktu_mulai: null,
      waktu_berakhir: null,
      materi_tersampaikan: null,
    };
  },
  mounted() {
    this.getabsensi();
    // this.poshabsensi();
  },
  methods: {
    postAbsensi() {
      let format_pendaftaran =[];
      this.pendaftaran.forEach (Element => {
        format_pendaftaran.push ( {
          id_pendaftaran: Element
        })
      });

      let object = {
        waktu_mulai: this.waktu_mulai,
        waktu_berakhir: this.waktu_berakhir,
        materi_tersampaikan: this.materi_tersampaikan,
        pendaftaran: format_pendaftaran,
        
        id_jadwal: parseInt(this.$route.params.id_jadwal)
      };
      axios.post("/frontoffice/absensi/store",object).then((response) => {
        if (response.data.success == true) {
          alert ("aaaaaaa");
          this.$router.push("/daftar_absensi")

        }
      })
      
    },
    getabsensi() {
      let id = this.$route.params.id_program_kursus;
      this.loading = true;
      axios.get("/frontoffice/absensi/programkursus/" + id).then((response) => {
        this.absensi = response.data.data;
        if (response.data.success == true) {
          this.loading = false;
        }
      });
    },
    // postabsensi() {
    //   axios.post("/frontoffice/absensi/store").then((response) => {
    //     if (response.data.success == true) {
    //       this.input = response.data.data
    //     }
    //   });
    // },
  },
};
</script>

<style>
#ab {
  height: 50vh;
}
</style>