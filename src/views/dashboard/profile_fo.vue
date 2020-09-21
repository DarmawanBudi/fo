<template>
  <div class="container">
    <h2 class="mt-3">Profile Front Office</h2>
    <div class="row mt-4">
      <div class="col-3 text-center">
          <b-img id="foto" thumbnail :src="preview" alt="Responsive image"></b-img>
            <b-form-file @change="uploadImage" plain></b-form-file>
        </div>
      <div class="col-4 my-3">
        <div>
          <b-input-group class="mb-4 mt-5">
            <b-input-group-prepend is-text>
              <b-icon icon="person-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="text" v-model="fo.nama"></b-form-input>
          </b-input-group>
          <b-input-group class="mb-4">
            <b-input-group-prepend is-text>
              <b-icon icon="envelope-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="email" v-model="fo.email"></b-form-input>
          </b-input-group>
          <b-input-group class="mb-4">
            <b-input-group-prepend is-text>
              <b-icon icon="telephone-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="tel" v-model="fo.no_telp"></b-form-input>
          </b-input-group>
          <b-button @click="editFo()">Simpan</b-button>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-5 mt-3">
        <h3>Change Password</h3>
        <b-form-group label="Password Lama">
          <b-form-input placeholder="Password Lama"></b-form-input>
          <b-form-group label="Password Baru">
            <b-form-input placeholder="Password Baru"></b-form-input>
            <b-form-group label="Konfirmasi Password Baru">
              <b-form-input placeholder="Password Baru"></b-form-input>
            </b-form-group>
          </b-form-group>
        </b-form-group>
        <b-button >Simpan</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/service/axios";
export default {
  data: () => {
    return {
      fo: [],
      loading: false,
      preview: require("@/assets/default.png"),
      nama: null,
      email: null,
      no_telp: null,
      foto: null,
    };
  },
  mounted() {
    this.getfo();
  },
  methods: {
    uploadImage(event) {
      this.foto = event.target.files[0];
      this.preview = URL.createObjectURL(event.target.files[0]);
    },
    getfo() {
      axios
        .get("/frontoffice/profile", {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.success == true) {
            this.fo = response.data.data;
            this.preview = response.data.data.foto;
          }
        });
    },
    editFo() {
      alert ('hay')
      let form = new FormData();
      let t = this
      // new FormData(); adalah bawaan dari javascript yg digunakan untuk membuat form agar sesuai dgn body request yg di minta
      form.append("nama", t.fo.nama);
      form.append("email", t.fo.email);
      form.append("no_telp", t.fo.no_telp);
      form.append("foto", t.foto);
      form.append("_method", "put");
      axios.post("/frontoffice/profile/update",form, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },}).then((response) => {
        if (response.data.success == true) {
          this.$router.push({name:'login'})
        }
      });
    }
  },
};
</script>

<style>
</style>