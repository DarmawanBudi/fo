<template>
  <div class="container">
    <h2 class="mt-3">Profile Siswa</h2>
    <div class="mt-5">
      <h3 class>Tambah Siswa</h3>
      <div class="row mt-2">
        <div class="col-3 text-center">
          <b-img class="im" thumbnail :src="preview" alt="Upload Foto"></b-img>
          <b-form-file @change="uploadImage" plain></b-form-file>
        </div>
        <div class="col-9">
          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="person-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" v-model="nama" placeholder="Masukkan Nama Lengkap"></b-form-input>
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="file-earmark-text-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-select v-model="programkursus" :options="options">
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>Masukkan Program Kursus</b-form-select-option>
              </template>
            </b-form-select>
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="envelope-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="email" v-model="email" placeholder="Masukkan Email"></b-form-input>
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="telephone-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="number" v-model="no_telp" placeholder="Masukkan No Telepon"></b-form-input>
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="geo-alt"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" v-model="provinsi" placeholder="Masukkan Propinsi"></b-form-input>
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="geo-alt"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" v-model="kota" placeholder="Masukkan Kabupaten"></b-form-input>
          </b-input-group>
          <b-input-group class="mb-3">
            <b-input-group-prepend is-text>
              <b-icon icon="geo-alt"></b-icon>
            </b-input-group-prepend>
            <b-textarea
              type="text"
              cols="50"
              rows="4"
              placeholder="Masukkan Alamat Lengkap"
              v-model="alamat_lengkap"
            ></b-textarea>
          </b-input-group>

          <div class="text-center">
            <b-button class="mr-5 mt-2" @click="postSiswa">Simpan</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/service/axios";
// import {siswa} from "@/repositories"
export default {
  data: () => {
    return {
      preview: require("@/assets/default.png"),
      siswa: [],
      loading: false,
      nama: null,
      programkursus: null,
      email: null,
      no_telp: null,
      foto: null,
      alamat_lengkap: null,
      kota: null,
      provinsi: null,
      options: [{ value: null, text: "Please select an option" }],
      file: null,
      file2: null,
    };
  },
  mounted() {
    // this.postSiswa();
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
    postSiswa() {
      let form = new FormData();
      form.append("nama", this.nama);
      form.append("email", this.email);
      form.append("no_telp", this.no_telp);
      form.append("foto", this.foto);
      form.append("alamat_lengkap", this.alamat_lengkap);
      form.append("kota", this.kota);
      form.append("provinsi", this.provinsi);
      form.append("programkursus[][id_program_kursus]", this.programkursus);
      // siswa.post(form)
      // let value = {
      //   nama: this.nama,
      //   programkursus: this.programkursus,
      //   email: this.email,
      //   no_telp: this.no_telp,
      //   foto: this.foto,
      //   alamat_lengkap: this.alamat_lengkap,
      //   kota: this.kota,
      //   provinsi: this.provinsi,
      // };

      axios.post("/frontoffice/siswa/tambah/store", form).then((response) => {
        if (response.data.success == true) {
          // console.log(response.data.success);
        }
      });
      // console.log(this.postSiswa);
    },
  },
};
</script>

<style>
.im {
  height: 47.5vh;
  width: 100%;
}
</style>