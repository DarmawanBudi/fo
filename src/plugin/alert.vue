<template>
  <div v-if="showAlert">
    <div v-for="(alert,i) in arrayOfAlert" :key="i">
      <div :class="`alert-${alert.type} border-${alert.type}`" class="alert alert-position">
        <!-- icons -->
        <i v-if="alert.loading" class="fa fa-circle-o-notch loading" aria-hidden="true"></i>
        <i v-else class="fa fa-bell-o" aria-hidden="true"></i>

        <strong class="ml-2" v-text="alert.content"></strong>
        <!-- close button -->
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      showAlert: false,
      arrayOfAlert: [],
    };
  },
  methods: {
    alertFactory(text, info, isLoading = false) {
      this.arrayOfAlert.push({
        content: text,
        type: info,
        loading: isLoading,
      });
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
        this.arrayOfAlert = [];
      }, 5000);
    },
  },
  mounted() {
    Vue.prototype.$info = (text) => this.alertFactory(text, "info");
    Vue.prototype.$success = (text) => this.alertFactory(text, "success");
    Vue.prototype.$warning = (text) => this.alertFactory(text, "warning");
    Vue.prototype.$error = (text) => this.alertFactory(text, "danger");
    Vue.prototype.$loading = (text) =>
      this.alertFactory("loading...", "info", true);
  },
};
</script>

<style scoped>
.border-loading {
  border-left-color: aqua;
  border-left-width: 4px;
}

.border-info {
  border-left-color: aqua;
  border-left-width: 4px;
}
.border-success {
  border-left-color: rgb(38, 255, 0);
  border-left-width: 4px;
}
.border-danger {
  border-left-color: rgb(255, 81, 0);
  border-left-width: 4px;
}
.border-warning {
  border-left-color: rgb(255, 230, 0);
  border-left-width: 4px;
}
.alert-position {
  width: 20%;
  right: 0;
  bottom: 0;
  position: fixed;
  animation-name: fadeInRight;
  animation-duration: 0.25s;
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.loading {
  animation: spin 1s linear infinite;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
