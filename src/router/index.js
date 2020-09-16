import Vue from 'vue'
import VueRouter from 'vue-router'
import panel from '../views/dashboard/panel.vue'
import login from '../views/login.vue'
import program_kursus from '../views/dashboard/program_kursus.vue'
import instruktur from '../views/dashboard/instruktur.vue'
import dashboard from '../views/dashboard/dashboard.vue'
import jadwal from '../views/dashboard/jadwal.vue'
import daftar_absensi from '../views/dashboard/absensi/daftar_absensi.vue'
import absensi from '../views/dashboard/absensi/absensi.vue'
import detail_siswa from '../views/dashboard/siswa/detail_siswa.vue'
import profile_fo from '../views/dashboard/profile_fo.vue'
import siswa from '../views/dashboard/siswa/siswa.vue'
import nilai_siswa from '../views/dashboard/siswa/nilai_siswa.vue'
import tambah_siswa from '../views/dashboard/siswa/tambah_siswa.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'login',
      component: login
    },  
  {
    path: '/panel',
    name: 'panel',
    component: panel,
    children: [
    {
      path: 'program_kursus',
      name: 'program_kursus',
      component: program_kursus
    },
    {
      path: 'instruktur',
      name: 'instruktur',
      component: instruktur
    },
    {
      path: 'dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: 'jadwal',
      name: 'jadwal',
      component: jadwal
    },
    {
      path: 'daftar_absensi',
      name: 'daftar_absensi',
      component: daftar_absensi
    },
    {
      path: 'absensi/:id_program_kursus/:id_jadwal',
      name: 'absensi',
      component: absensi
    },
    {
      path: 'detail_siswa/:id_siswa',
      name: 'detail_siswa',
      component: detail_siswa
    },
    {
      path: 'profile_fo',
      name: 'profile_fo',
      component: profile_fo
    },
    {
      path: 'siswa',
      name: 'siswa',
      component: siswa
    },
    {
      path: 'nilai_siswa',
      name: 'nilai_siswa',
      component: nilai_siswa
    },
    {
      path: 'tambah_siswa',
      name: 'tambah_siswa',
      component: tambah_siswa
    },]
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
