import Api from '@/services/Api'

export default {
  sendRequest (request) {
    return Api().post('requests', request)
  }
}
