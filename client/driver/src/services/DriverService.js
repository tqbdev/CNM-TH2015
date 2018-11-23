import Api from '@/services/Api'

export default {
  updateById (driverId, data) {
    return Api().post(`${driverId}`, data)
  }
}
