<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <panel title="Location">
        <v-alert
          :value="!$store.state.user.coordinate"
          type="warning"
        >
          First login. Pls, update your current location.
        </v-alert>
        <here-map
          class="mt-4"
          :curCoordinate="curCoordinate"
          :newCoordinate="newCoordinate"
          v-on:changeCoordinate="onChangeCoordinate"
          width="100%"
          height="400px"/>
        <v-btn
          :loading="loading"
          dark
          class="cyan"
          @click="update">
          Update
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import config from '@/config'
import GlobalFunc from '@/functions'
import HereMap from './HereMap.vue'
import DriverService from '@/services/DriverService'
export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      curCoordinate: null,
      newCoordinate: null
    }
  },
  components: {
    HereMap
  },
  async mounted () {
    this.curCoordinate = GlobalFunc.string2Coordinate(this.$store.state.user.coordinate)
  },
  methods: {
    async update() {
      const isOK = this.checkDistance()
      if (isOK) {
        try {
          this.loading = true
          const response = await DriverService.updateById(this.$store.state.user.id, {
            coordinate: GlobalFunc.coordinate2String(this.newCoordinate)
          })
          this.$snotify.success(`Update new location successfully.`)
          this.$store.dispatch('setUser', response.data.driver)
          this.curCoordinate = GlobalFunc.string2Coordinate(response.data.driver.coordinate)
        } catch (error) {
          this.$snotify.error(error.response.data.error)
        } finally {
          this.loading = false
        }
      }
    },
    async onChangeCoordinate(payload) {
      if (!payload) return
      this.newCoordinate = payload
      this.checkDistance()
    },
    checkDistance () {
      if (this.curCoordinate) {
        if (!this.newCoordinate) {
          this.$snotify.error(`Pls, click on map to update location.`)
          return false
        }
        const distance = GlobalFunc.haversine(this.curCoordinate, this.newCoordinate)
        if (distance > config.DISTANCE) {
          this.newCoordinate = null
          this.$snotify.error(`Error last click. Distance greater than 100m.`)
          return false
        }
      }
      return true
    }
  }
}
</script>

<style>

</style>
