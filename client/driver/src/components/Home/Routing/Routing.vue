<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <panel title="Received Request" class="mt-2">
        <request-info :request="request"/>
        <here-map
          v-if="request.status === config.REQUEST.RECEIVED"
          class="mt-4"
          width="100%"
          height="400px"
          :driverCoordinate="driverCoordinate"
          :requestCoordinate="requestCoordinate"/>
        <v-layout col>
          <v-flex>
        <v-btn
          :loading="loading"
          v-if="request.status === config.REQUEST.RECEIVED"
          color="error"
          @click="startRequest()">
          START
        </v-btn>
        <v-btn
          :loading="loading"
          v-if="request.status === config.REQUEST.MOVING"
          color="success"
          @click="doneRequest()">
          DONE
        </v-btn>
          </v-flex>
        </v-layout>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import GlobalFunc from '@/functions'
import HereMap from './HereMap.vue'
import RequestInfo from './RequestInfo'
import config from '../../../config'
export default {
  name: 'Routing',
  data () {
    return {
      config: config
    }
  },
  props: {
    request: Object,
    loading: Boolean
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    requestCoordinate: function () {
      return GlobalFunc.string2Coordinate(this.request.locatedCoordinate)
    },
    driverCoordinate: function () {
      return GlobalFunc.string2Coordinate(this.user.coordinate)
    }
  },
  components: {
    HereMap,
    RequestInfo
  },
  methods: {
    startRequest() {
      this.$emit('start')
    },
    doneRequest() {
      this.$emit('done')
    }
  }
}
</script>

<style>

</style>
