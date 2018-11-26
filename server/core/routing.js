const axios = require('axios')
const config = require('../config/config')

module.exports = {
  routing (fromCoordinate, toCoordinate) {
    return axios.get(`https://route.api.here.com/routing/7.2/calculateroute.json?app_id=cbKK71GntW15znfrL7e5&app_code=emeXZBrv-p2KVxbAGrUisQ&waypoint0=geo!${fromCoordinate.lat},${fromCoordinate.lng}&waypoint1=geo!${toCoordinate.lat},${toCoordinate.lng}&mode=fastest;car;traffic:disabled`)
  } 
}