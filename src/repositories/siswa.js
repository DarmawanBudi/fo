/**
 * ================================
 * siswa REPOSITORY
 * 
 * ================================
 */
// change if you doesnt have api interface
import API from '../api'


export default {
    /**
    * GET POST PUT DELETE TO REST API
    * @param {object} body  ,  
    * @param {int} id or anyting else
    * @return {Promise}
    */

    get() {
        return API.get('/siswa/')
    },
    find(id) {
        return API.get('/siswa/' + id)
    },
    post(body) {
        return API.post('/frontoffice/siswa/tambah/store', body)
    },
    put(id, body = {}) {
        return API.put('/siswa/update/' + id, body)
    },
    delete(id) {
        return API.delete('/siswa/delete/' + id)
    }
}