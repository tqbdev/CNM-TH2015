import axios from 'axios'
import config from '../config'

export default {
  geocoder (searchText) {
    return axios.get(`https://geocoder.api.here.com/6.2/geocode.json?app_id=${config.HereMap.appId}&app_code=${config.HereMap.appCode}&searchtext=${searchText}`)
  }
}
