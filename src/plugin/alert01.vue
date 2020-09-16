<template>
  <div>
    <div v-if="show" class="alert alert-primary" role="alert">This is a primary alert—check it out!</div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data: () => {
    return {
      show: false,
    };
  },
  beforeCreate() {
    Vue.prototype.$info = () => {
      this.showAlert();
      console.log("sd");
    };
  },
  methods: {
    showAlert() {
      this.show = true;
     
      setTimeout( function() {
        this.show = false;
      }, 5000);
    },
  },
};
</script>

<style>
</style>