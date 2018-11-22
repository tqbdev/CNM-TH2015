import Api from '@/services/Api'

export default {
  getById (requestId) {
    return Api().get(`requests/${requestId}`)
  },
  updateById (requestId, request) {
    return Api().post(`requests/${requestId}`, request)
  }
}
