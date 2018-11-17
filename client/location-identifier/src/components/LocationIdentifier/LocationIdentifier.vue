<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <request-info :request="request"/>
      <geocoder-reverse
        class="mt-4"
        :curPoint="curPoint"
        :newPoint="newPoint"
        v-on:submit="onSubmit"
        :loading="loading"/>
      <here-map
        class="mt-4"
        :requestCoordinate="curPoint.coordinate"
        v-on:changeCoordinate="onChangeCoordinate"
        width="100%"
        height="400px"/>
    </v-flex>
  </v-layout>
</template>

<script>
import * as _ from 'lodash'
import HereMap from './HereMap.vue'
import RequestInfo from './RequestInfo'
import GeocoderReverse from './GeocoderReverse'
import RequestsService from '@/services/RequestsService'
import HereMapService from '@/services/HereMapService'
export default {
  name: 'LocationIdentifier',
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
      },
      loading: false
    }
  },
  components: {
    HereMap,
    RequestInfo,
    GeocoderReverse
  },
  async mounted () {
    try {
      const requestId = this.$store.state.route.params.requestId
      this.request = (await RequestsService.getById(requestId)).data.request
      const geocoder = (await HereMapService.geocoder(this.request.address)).data.Response
      this.curPoint.coordinate = {
        lat: _.get(geocoder, 'View[0].Result[0].Location.DisplayPosition.Latitude'),
        lng: _.get(geocoder, 'View[0].Result[0].Location.DisplayPosition.Longitude')
      }
      this.curPoint.address = _.get(geocoder, 'View[0].Result[0].Location.Address.Label')
    } catch (error) {
      this.$snotify.error(error.response.data.error)
    }
  },
  methods: {
    async onChangeCoordinate(payload) {
      if (!payload) return
      this.newPoint.coordinate = payload
      const reverse = (await HereMapService.reverse(payload)).data.Response
      this.newPoint.address = _.get(reverse, 'View[0].Result[0].Location.Address.Label')
    },
    async onSubmit() {
      try {
        this.loading = true
        if (this.newPoint.address && this.newPoint.coordinate) {
          await RequestsService.updateById(this.request.id, {
            locatedAddress: this.newPoint.address,
            locatedCoordinate: `${this.newPoint.coordinate.lat},${this.newPoint.coordinate.lng}`
          })
          this.$snotify.success(`Submit with new address successfully.`)
          this.$router.push({
            name: 'requestList'
          })
        } else {
          if (this.curPoint.address && this.curPoint.coordinate) {
            await RequestsService.updateById(this.request.id, {
              locatedAddress: this.curPoint.address,
              locatedCoordinate: `${this.curPoint.coordinate.lat},${this.curPoint.coordinate.lng}`
            })
            this.$snotify.success(`Submit with current address successfully.`)
            this.$router.push({
              name: 'requestList'
            })
          } else {
            this.$snotify.error(`Can't submit when current address and new address undefined.`)
          }
        }
      } catch (error) {
        this.$snotify.error(error.response.data.error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
