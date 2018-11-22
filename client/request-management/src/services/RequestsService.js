import Api from '@/services/Api'

export default {
  getById (requestId) {
    return Api().get(`requests/${requestId}`)
  }
}
