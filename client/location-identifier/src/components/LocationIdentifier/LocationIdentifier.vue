<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <request-info :user="userRequest"/>
      <here-map
        v-if="userRequestCoordinate.lat && userRequestCoordinate.lng"
        class="mt-4"
        :lat="userRequestCoordinate.lat"
        :lng="userRequestCoordinate.lng"
        width="100%"
        height="400px"/>
    </v-flex>
  </v-layout>
</template>

<script>
import HereMap from './HereMap.vue'
import RequestInfo from './RequestInfo'
import RequestsService from '@/services/RequestsService'
import HereMapService from '@/services/HereMapService'
export default {
  name: 'LocationIdentifier',
  data () {
    return {
      userRequest: null,
      userRequestCoordinate: {
        lat: null,
        lng: null
      }
    }
  },
  components: {
    HereMap,
    RequestInfo
  },
  async mounted () {
    try {
      const userId = this.$store.state.route.params.userId
      this.userRequest = (await RequestsService.getById(userId)).data.user
      const test = (await HereMapService.geocoder('333 Nguyen Trai, Thanh pho Ho chi Minh')).data.Response
      this.userRequestCoordinate.lat = test.View[0].Result[0].Location.DisplayPosition.Latitude
      this.userRequestCoordinate.lng = test.View[0].Result[0].Location.DisplayPosition.Longitude
      console.log(this.userRequestCoordinate)
    } catch (err) {
    }
  }
}
</script>

<style>

</style>
