import Api from '@/services/Api'

export default {
  getById (requestId) {
    return Api().get(`requests/${requestId}`)
  },
  updateById (requestId, data) {
    return Api().post(`request/${requestId}`, data)
  }
}
