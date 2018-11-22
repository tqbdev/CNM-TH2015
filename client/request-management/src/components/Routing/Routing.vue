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
        height="400px"/>
    </v-flex>
  </v-layout>
</template>

<script>
import * as _ from 'lodash'
import HereMap from './HereMap.vue'
import RequestInfo from './RequestInfo'
import DriverInfo from './DriverInfo'
import RequestsService from '@/services/RequestsService'
export default {
  name: 'Routing',
  data () {
    return {
      request: null,
      curPoint: {
        address: null,
        coordinate: null
      },
      newPoint: {
        address: null,
        coordinate: null
      }
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
    } catch (error) {
      this.$snotify.error(error.response.data.error)
    }
  }
}
</script>

<style>

</style>
