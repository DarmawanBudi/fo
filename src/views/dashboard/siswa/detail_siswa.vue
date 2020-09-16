<template>
  <div class="container">
    <h2 class="mt-3">Profile Siswa</h2>
    <div class="mt-4">

      <div class="d-flex justify-content-between">
        <h3>{{siswa.nama}}</h3>
        <h5 @click="bt" class="mt-3 nm">
          <b-icon icon="pencil"></b-icon>edit
        </h5>
      </div>

      <div class="row mt-2">
        <div class="col-3 text-center">
          <b-img id="foto" thumbnail :src="preview" alt="Responsive image"></b-img>
            <b-form-file @change="uploadImage" :disabled="show" plain></b-form-file>
        </div>
        <div class="col-9">

          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="person-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" v-model="siswa.nama" :disabled="show"></b-form-input>
          </b-input-group>

          <b-input-group class="mb-3" v-for="(element,index) in siswa.pendaftarans" :key="index">
            <b-input-group-prepend is-text>
              <b-icon icon="file-earmark-text-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input disabled v-model="element.programkursuses.nama"></b-form-input>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="envelope-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="email" v-model="siswa.email" :disabled="show"></b-form-input>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="telephone-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="number" v-model="siswa.no_telp" :disabled="show"></b-form-input>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="geo-alt"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" v-model="siswa.provinsi" :disabled="show"></b-form-input>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="geo-alt"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" v-model="siswa.kota" :disabled="show"></b-form-input>
          </b-input-group>

          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="geo-alt"></b-icon>
            </b-input-group-prepend>
            <b-textarea cols="50" rows="4" v-model="siswa.alamat_lengkap" :disabled="show"></b-textarea>
          </b-input-group>

          <div class="text-center">
            <b-button class="mr-5 mt-2" @click="editSiswa">Simpan</b-button>
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
      preview: require("@/assets/default.png"),
      siswa: [],
      loading: false,
      show: true,
      nama: null,
      programkursus: null,
      email: null,
      no_telp: null,
      foto: null,
      alamat_lengkap: null,
      kota: null,
      provinsi: null,
      options: [{ value: null, text: "Please select an option" }],
    };
  },
  mounted() {
    this.getsiswa();
    this.getProgramKursus();
  },
  methods: {
    uploadImage(event) {
      this.foto = event.target.files[0];
      this.preview = URL.createObjectURL(event.target.files[0]);
    },
    getProgramKursus() {
      axios.get("/frontoffice/programkursus").then((response) => {
        if (response.data.success == true) {
          this.options = response.data.data;
          this.loading = false;
          let program = [];
          this.options.forEach((element) => {
            program.push({
              value: element.id,
              text: element.nama,
            });
          });
          this.options = program;
        }
      });
    },
    getsiswa() {
      this.loading = true;
      let id = this.$route.params.id_siswa;
      axios.get("/frontoffice/siswa/" + id).then((response) => {
        if (response.data.success == true) {
          this.siswa = response.data.data;
          this.loading = false;
          this.preview = this.siswa.foto
        }
      });
    },
    editSiswa() {
      let form = new FormData();
      // new FormData(); adalah bawaan dari javascript yg digunakan untuk membuat form agar sesuai dgn body request yg di minta
      let id = this.$route.params.id_siswa;

      form.append("nama", this.siswa.nama);
      form.append("email", this.siswa.email);
      form.append("no_telp", this.siswa.no_telp);
      form.append("foto", this.foto);
      form.append("alamat_lengkap", this.siswa.alamat_lengkap);
      form.append("kota", this.siswa.kota);
      form.append("provinsi", this.siswa.provinsi);
      // form.append("programkursus[][id_program_kursus]", this.siswa.programkursus);
      form.append("_method", "put");

      //cara conlose log pada form
      // console.log(form.getAll("programkursus[][id_program_kursus]"));

      axios.post("/frontoffice/siswa/update/" + id, form).then((response) => {
        if (response.data.success == true) {
          // console.log(response.data.success);
        }
      });
    },

    bt() {
      this.show = !this.show;
    },
  },
};
</script>

<style>
#foto {
  height: 47.5vh;
  width: 100%;
}
.nm:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>