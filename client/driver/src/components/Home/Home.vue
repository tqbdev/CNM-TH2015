<template>
  <div>
    <update-location></update-location>
    <request-info-dialog
      :isOpen="isOpen"
      :request="request"
      v-on:accept="onAccept"
      v-on:reject="onReject"></request-info-dialog>
    <routing
      v-if="request"
      :request="request"
      :loading="loading"
      v-on:start="onStartRequest"
      v-on:done="onDoneRequest"></routing>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import io from 'socket.io-client'
import UpdateLocation from './UpdateLocation'
import RequestInfoDialog from './RequestInfoDialog'
import Routing from './Routing/Routing'
import DriverService from '@/services/DriverService'
import RequestsService from '@/services/RequestsService'
import config from '../../config'
export default {
  name: 'Home',
  data () {
    return {
      socket: null,
      request: null,
      isOpen: false,
      timeout: null,
      loading: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  mounted () {
    this.socket = io('localhost:8081/drivers', {
      forceNew: true,
      query: `id=${this.user.id}`
    })

    this.socket.on('SEND-REQUEST', (data) => {
      // console.log(data)
      this.request = data
      this.isOpen = true
      this.timeout = setTimeout(() => {
        this.onReject()
      }, 10000)
    });
  },
  methods: {
    async onAccept () {
      this.isOpen = false
      this.socket.emit('ACCEPT', {
        requestId: this.request.id
      })

      this.request.status = config.REQUEST.RECEIVED
      
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }

      const response = await DriverService.updateById(this.user.id, {
          ready: false
        })
      this.$store.dispatch('setUser', response.data.driver)
    },
    onReject () {
      this.isOpen = false
      this.socket.emit('REJECT', {
        requestId: this.request.id
      })
      this.request = null
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
    },
    async onStartRequest () {
      try {
        this.loading = true
        const response = await RequestsService.updateById(this.request.id, {
          status: config.REQUEST.MOVING
        })
        this.$snotify.success(`Start request successfully.`)
        this.request = response.data.request
      } catch (error) {
        this.$snotify.error(error.response.data.error)
      } finally {
        this.loading = false
      }
    },
    async onDoneRequest () {
      try {
        this.loading = true
        const response = await RequestsService.updateById(this.request.id, {
          status: config.REQUEST.COMPLETED
        })
        this.$snotify.success(`Done request successfully.`)
        this.request = null
      } catch (error) {
        this.$snotify.error(error.response.data.error)
      } finally {
        this.loading = false
      }
    }
  },
  components: {
    UpdateLocation,
    RequestInfoDialog,
    Routing
  }
}
</script>

<style>

</style>
