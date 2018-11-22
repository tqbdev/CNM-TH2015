import Api from '@/services/Api'

export default {
  updateLocationById (driverId, data) {
    return Api().post(`${driverId}`, data)
  }
}
