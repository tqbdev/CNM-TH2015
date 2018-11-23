<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <request-info :request="request"/>
      <driver-info
        class="mt-4"
        :driver="request.Driver"/>
      <here-map
        class="mt-4"
        width="100%"
        height="400px"
        :driverCoordinate="driverCoordinate"
        :requestCoordinate="requestCoordinate"/>
    </v-flex>
  </v-layout>
</template>

<script>
import GlobalFunc from '@/functions'
import HereMap from './HereMap.vue'
import RequestInfo from './RequestInfo'
import DriverInfo from './DriverInfo'
import RequestsService from '@/services/RequestsService'
export default {
  name: 'Routing',
  data () {
    return {
      request: null,
      driverCoordinate: null,
      requestCoordinate: null
    }
  },
  components: {
    HereMap,
    RequestInfo,
    DriverInfo
  },
  async mounted () {
    try {
      const requestId = this.$store.state.route.params.requestId
      this.request = (await RequestsService.getById(requestId)).data.request
      this.driverCoordinate = GlobalFunc.string2Coordinate(this.request.Driver.coordinate)
      this.requestCoordinate = GlobalFunc.string2Coordinate(this.request.locatedCoordinate)
    } catch (error) {
      this.$snotify.error(error.response.data.error)
    }
  }
}
</script>

<style>

</style>
