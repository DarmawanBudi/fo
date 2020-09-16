import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globalAlert from '@/plugin/alert.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.component('global-alert',globalAlert)
//globalAlert adalah untuk memberi nama dari componen
//alert diambil dari folder plugin

const moment = require('moment')
require('moment/locale/id')
 
Vue.use(require('vue-moment'), {
    moment
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
