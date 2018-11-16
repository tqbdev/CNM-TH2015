import Api from '@/services/Api'

export default {
  getById (userId) {
    return Api().get(`requests/${userId}`)
  }
}
