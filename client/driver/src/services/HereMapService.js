import axios from 'axios'
import config from '../config'

export default {
  geocoder (searchText) {
    return axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=${config.HereMap.appId}&app_code=${config.HereMap.appCode}&searchtext=${searchText}`)
  },
  reverse (coordinate) {
    return axios.get(`https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=${config.HereMap.appId}&app_code=${config.HereMap.appCode}&mode=retrieveAddresses&prox=${coordinate.lat},${coordinate.lng}`)
  }
}
